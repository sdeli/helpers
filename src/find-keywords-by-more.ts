import puppeteer, { Browser, Page } from 'puppeteer';
import { config } from './libs/config';
import { downloadKeywordsList, openPage } from './libs/utils';
import { readFileSync } from 'fs';
import { KeywordResListExtractor, KeywordResListExtractorEvents } from './libs/scrapers/keyword-res-list-extractor';
import { EventEmitter } from 'events';

const PARALLEL_SCRAPERS_COUNT = 4;
const KEYWORD_TOOL_IMPORT_KEYWORDS_URL = 'https://app.kwfinder.com/import';
const keywordsList = readFileSync(config.keywordsListFilePath, { encoding: 'utf-8' }) + '\n';
const keywordsBy700 = getKeywordsArrOf700s(keywordsList);

enum ScrapeExecutorEvents {
  EXTRACTION_FINISHED = 'extraction-finished',
  SUBSCRIPTION_EXCEEDED = 'subscription-exceeded',
}

class ScrapeExecutor {
  scrapeFinished = false;
  events = new EventEmitter();

  constructor(public readonly scraperId: number) {}

  public async scrape(browser: Browser, currentMax700keywords: string) {
    console.log(`Scraper with the id of ${this.scraperId} started scrape session.`);

    try {
      // eslint-disable-next-line no-var
      var { page } = await openPage(KEYWORD_TOOL_IMPORT_KEYWORDS_URL, browser);
      await page.waitForSelector(config.selectors.importKeywordsInput);
      await typeKeywordsAndMoveToKWResPage(page, currentMax700keywords);

      const keywordResListExtractor = new KeywordResListExtractor();
      keywordResListExtractor.events.on(KeywordResListExtractorEvents.SUBSCRIPTION_EXCEEDED, () => {
        this.events.emit(ScrapeExecutorEvents.SUBSCRIPTION_EXCEEDED);
      });

      await keywordResListExtractor.extract(page);
    } catch (error) {
      console.log('error:');
      console.log(error);
    }

    try {
      await downloadKeywordsList(page);
    } catch (error) {
      console.log('error:');
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
      console.log(`Shutting off. In scraper: ${scraper.scraperId}. Subscription exceeded!`);
      return;
    }

    const currentMax700keywords = keywordsBy700.shift();
    if (!currentMax700keywords) {
      console.log(`Shutting off. No more tasks for scraper: ${scraper.scraperId}.`);
      return;
    }

    scraper.scrape(browser, currentMax700keywords);
  });

  scraper.events.on(ScrapeExecutorEvents.SUBSCRIPTION_EXCEEDED, () => {
    isSubscriptionExceeded = true;
    console.log(`Subscription exceeded in scraper: ${scraper.scraperId}`);
  });

  scraper.scrape(browser, currentMax700keywords);
}

function getKeywordsArrOf700s(keywordsList: string) {
  const keywordsBy700 = [];
  const keywordsArr = keywordsList.split('\n');
  console.log(`There are ${keywordsArr.length} keywords to scrape`);

  while (keywordsArr.length) {
    const currentMax700Keywords = keywordsArr.splice(0, 700).join('\n');
    keywordsBy700.push(currentMax700Keywords);
  }

  console.log(`${keywordsBy700.length} scrape session are needed.`);
  return keywordsBy700;
}
