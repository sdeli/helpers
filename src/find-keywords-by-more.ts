import puppeteer, { Browser, Page } from 'puppeteer';
import { config } from './libs/config';
import { downloadKeywordsList, listenAndRenameFileOnDownload, openPage } from './libs/utils';
import { readFileSync } from 'fs';
import { KeywordResListExtractor, KeywordResListExtractorEvents } from './libs/scrapers/keyword-res-list-extractor';
import { EventEmitter } from 'events';

const KEYWORDS_COUNT_AT_ONE_SCRAPE = 20;
const PARALLEL_SCRAPERS_COUNT = 6;
const KEYWORD_TOOL_IMPORT_KEYWORDS_URL = 'https://app.kwfinder.com/import';
const keywordsList = readFileSync(config.keywordsListFilePath, { encoding: 'utf-8' }) + '\n';
const keywordsBy700 = getKeywordsArrOf700s(keywordsList);

// var x = document.querySelector('html')
// x.innerText.includes('Sorry, no SERP results for this keyword')
enum ScrapeExecutorEvents {
  EXTRACTION_FINISHED = 'extraction-finished',
  SUBSCRIPTION_EXCEEDED = 'subscription-exceeded',
}

class ScrapeExecutor {
  scrapeFinished = false;
  events = new EventEmitter();
  page: Page | undefined;
  constructor(public readonly scraperId: number) {}

  public async scrape(browser: Browser, currentMax700keywords: string) {
    console.log(`scraper: ${this.scraperId} - Scraper with the id of ${this.scraperId} started scrape session.`);

    try {
      if (!this.page) {
        // eslint-disable-next-line no-var
        var { page } = await openPage(KEYWORD_TOOL_IMPORT_KEYWORDS_URL, browser);
        this.page = page;
      } else {
        // eslint-disable-next-line no-var
        var page = this.page;
        await this.page.goto(KEYWORD_TOOL_IMPORT_KEYWORDS_URL);
        console.log(`scraper: ${this.scraperId} - gone to`);
        // await this.page.waitForNavigation();
        // console.log(`scraper: ${this.scraperId} - Waited for nav`);
      }

      await page.waitForSelector(config.selectors.importKeywordsInput);
      console.log(`scraper: ${this.scraperId} - waited for selector`);
      await typeKeywordsAndMoveToKWResPage(page, currentMax700keywords);

      const keywordResListExtractor = new KeywordResListExtractor();
      keywordResListExtractor.events.on(KeywordResListExtractorEvents.SUBSCRIPTION_EXCEEDED, () => {
        this.events.emit(ScrapeExecutorEvents.SUBSCRIPTION_EXCEEDED);
      });

      await keywordResListExtractor.extract(page, this.scraperId);
    } catch (error) {
      console.log(`scraper: ${this.scraperId} - error:`);
      console.log(error);
    }

    try {
      await downloadKeywordsList(page, this.scraperId);
    } catch (error) {
      console.log(`scraper: ${this.scraperId} - error:`);
      console.log(error);
    }

    this.events.emit(ScrapeExecutorEvents.EXTRACTION_FINISHED);
  }
}

async function typeKeywordsAndMoveToKWResPage(page: Page, currentMax700keywords: string) {
  await page.type(config.selectors.importKeywordsInput, currentMax700keywords, {
    delay: 0,
  });
  await page.waitForSelector(config.selectors.keywordTags);
  await page.waitForTimeout(1000);
  await page.click(config.selectors.processKeywordsBtn);
  await page.waitForSelector(config.selectors.keywordsTable);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: config.userDataDir,
  });
  listenAndRenameFileOnDownload(config.downloadsFolderPath, 'void', false);
  for (let i = 0; i < PARALLEL_SCRAPERS_COUNT; i++) {
    initAndExecuteScraper(browser, i);
  }
})();

function initAndExecuteScraper(browser: Browser, scraperId: number) {
  let isSubscriptionExceeded = false;

  const currentMax700keywords = keywordsBy700.shift();
  if (!currentMax700keywords) return;

  const scraper = new ScrapeExecutor(scraperId);

  scraper.events.on(ScrapeExecutorEvents.EXTRACTION_FINISHED, () => {
    if (isSubscriptionExceeded) {
      console.log(`scraper: ${scraperId} - Shutting off. In scraper: ${scraper.scraperId}. Subscription exceeded!`);
      return;
    }

    const currentMax700keywords = keywordsBy700.shift();
    if (!currentMax700keywords) {
      console.log(`scraper: ${scraperId} - Shutting off. No more tasks for scraper: ${scraper.scraperId}.`);
      return;
    }

    scraper.scrape(browser, currentMax700keywords);
  });

  scraper.events.on(ScrapeExecutorEvents.SUBSCRIPTION_EXCEEDED, () => {
    isSubscriptionExceeded = true;
    console.log(`scraper: ${scraperId} - Subscription exceeded in scraper: ${scraper.scraperId}`);
  });

  scraper.scrape(browser, currentMax700keywords);
}

function getKeywordsArrOf700s(keywordsList: string) {
  const keywordsBy700 = [];
  const keywordsArr = keywordsList.split('\n');
  console.log(`There are ${keywordsArr.length} keywords to scrape`);

  while (keywordsArr.length) {
    const currentMax700Keywords = keywordsArr.splice(0, KEYWORDS_COUNT_AT_ONE_SCRAPE).join('\n');
    keywordsBy700.push(currentMax700Keywords);
  }

  console.log(`${keywordsBy700.length} scrape session are needed.`);
  return keywordsBy700;
}
