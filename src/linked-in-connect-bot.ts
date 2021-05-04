import { writeFileSync, readFileSync } from 'fs';
import { Page } from 'puppeteer';
import { openPage } from './libs/utils';

const MAX_MESSAGES_A_DAY = 100;
// it recruiter uk, malta, netherlands, belgium
// it talent aquisition

// const LINKED_IN_RECRUITERS_FEED = 'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22100961908%22%5D&keywords=recruiter%20front%20end&origin=GLOBAL_SEARCH_HEADER&page=';
const LINKED_IN_RECRUITERS_FEED =
  'https://www.linkedin.com/search/results/people/?geoUrn=%5B%22102257491%22%2C%22100961908%22%2C%22106774002%22%5D&keywords=it%20recruiter&origin=FACETED_SEARCH&page=';

const PERSON_CARDS_SEL = '.reusable-search__result-container';
const PERSON_CARD_BTNS_SEL = '.reusable-search__result-container .artdeco-button';
const PERSON_NAMES_SEL = '.app-aware-link [aria-hidden="true"]';
const ADD_MESSAGE_BTN_SEL = '.mr1.artdeco-button.artdeco-button--muted.artdeco-button--3.artdeco-button--secondary.ember-view';
const MESSAGE_AREA_SEL = '.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3';
const SEND_MESSAGE_BTN_SEL = '.ml1.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view';

const currentPageIndexStr = readFileSync('assets/linkedin/current-page-index.txt', 'utf-8');
console.log('currentPageIndexStr');
console.log(currentPageIndexStr);
let currentPageIndex = parseInt(currentPageIndexStr);

const currentSentConnectionCountStr = readFileSync('assets/linkedin/current-sent-connection-count.txt', 'utf-8');
let currentSentConnectionCount = parseInt(currentSentConnectionCountStr);
console.log('starter sent connection count ' + currentSentConnectionCount);

(async () => {
  console.log(LINKED_IN_RECRUITERS_FEED + currentPageIndex);
  const { page } = await openPage(LINKED_IN_RECRUITERS_FEED + currentPageIndex);
  await page.waitForSelector(PERSON_CARD_BTNS_SEL);

  do {
    await sendMessageToAllOnPage(page);
    const nextPageUrl = LINKED_IN_RECRUITERS_FEED + currentPageIndex;
    console.log('nextPageUrl');
    console.log(nextPageUrl);
    await page.goto(nextPageUrl);
    await page.waitForSelector(PERSON_CARD_BTNS_SEL);
    currentPageIndex++;
    writeFileSync('assets/linkedin/current-page-index.txt', currentPageIndex.toString());
  } while (currentSentConnectionCount < MAX_MESSAGES_A_DAY);

  console.log('finished');
})();

async function sendMessageToAllOnPage(page: Page) {
  const personCards = await page.$$(PERSON_CARDS_SEL);

  for (let i = 0; i < personCards.length; i++) {
    if (currentSentConnectionCount >= MAX_MESSAGES_A_DAY) return;

    console.log('current: ' + i + ' ============');

    let hadConnectBtn = false;
    const currentCard = personCards[i];

    try {
      hadConnectBtn = await currentCard.$eval('button', (button) => {
        console.log('button');
        console.log(button);
        // console.log((button as any).includes('Connect'));
        if (!(button as any).innerText.includes('Connect')) {
          return (button as any).innerText.includes('Connect');
        }
        (button as any).click();
        return true;
      });
    } catch (error) {
      console.log('error');
      console.log(error);
      continue;
    }

    await page.waitForTimeout(1000);

    if (!hadConnectBtn) {
      continue;
    }
    try {
      const nameOfpersonCard = await personCards[i].$eval(PERSON_NAMES_SEL, (nameContainer) => (nameContainer as any).innerText.match(/\w*\s/)[0].trim());
      const message = getMessage(nameOfpersonCard);
      console.log('message');
      console.log(message);
      await page.waitForSelector(ADD_MESSAGE_BTN_SEL);
      await page.click(ADD_MESSAGE_BTN_SEL);
      await page.waitForSelector(MESSAGE_AREA_SEL);
      await page.type(MESSAGE_AREA_SEL, message);
      await page.click(SEND_MESSAGE_BTN_SEL);
      currentSentConnectionCount++;
      console.log('message sent ' + currentSentConnectionCount);
      writeFileSync('assets/linkedin/current-sent-connection-count.txt', currentSentConnectionCount.toString());
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log(error);
      continue;
    }
  }
}

function getMessage(name: string) {
  return `Hy ${name}, I am Sandor an Angular and node.js full stack developer and looking for front end or full stack role, if you have one of these roles please check my profile, if I am fitting it and please let me know, I have now 2 weeks notice, Thank you.`;
}
