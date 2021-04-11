import { Page } from 'puppeteer';
import { uniq as _uniq } from 'lodash';
import { config } from '../config';
import { deleteElementFromDOM, isSubscriptionExceeded } from '../utils';
import { EventEmitter } from 'events';
export enum KeywordResListExtractorEvents {
  SUBSCRIPTION_EXCEEDED = 'subscription-exceeded',
}

export class KeywordResListExtractor {
  keywordsPassedOnPage: string[] = [];
  events = new EventEmitter();
  subscriptionExceeded = false;

  public async extract(page: Page, scraperId: number) {
    const keywordsAmount = await this.getKeywordsAmount(page);
    this.keywordsPassedOnPage = await this.getCurrentKeywordsInTable(page);

    console.log(`Keywords amount: ${keywordsAmount}`);

    let isAtBottom = this.keywordsPassedOnPage.length < keywordsAmount;
    while (isAtBottom && !this.subscriptionExceeded) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      await this.clickAllSearchIcons(page, keywordsAmount, scraperId);

      this.updateKeywordsPassedOnPage(page);
      console.log(`scraper: ${scraperId} - keywords passed: ${this.keywordsPassedOnPage.length}, all keywords amount: ${keywordsAmount}`);

      isAtBottom = this.keywordsPassedOnPage.length < keywordsAmount;
    }
  }

  private async getKeywordsAmount(page: Page) {
    const keywordsCountElem = await page.$(config.selectors.keywordsCount);
    return parseInt((await page.evaluate((el) => el.textContent, keywordsCountElem)).replace(/.*\/\s(\d*)/, '$1'));
  }

  private async getCurrentKeywordsInTable(page: Page) {
    const currentKeywordsOnPage = await page.evaluate((keywordContainersSel) => {
      const keywordContainersNodeList = document.querySelectorAll(keywordContainersSel);
      const keywordContainers = Array.prototype.slice.call(keywordContainersNodeList);
      return keywordContainers.map((keywordContainers) => keywordContainers.innerText);
    }, config.selectors.keywordContainers);

    return currentKeywordsOnPage;
  }

  private async updateKeywordsPassedOnPage(page: Page) {
    const currentKeywordsInTable = await this.getCurrentKeywordsInTable(page);
    this.keywordsPassedOnPage.push(...currentKeywordsInTable);
    this.keywordsPassedOnPage = _uniq(this.keywordsPassedOnPage);
  }

  private async clickAllSearchIcons(page: Page, keywordsAmount: number, scraperId: number) {
    let searchTermIcon = await page.$(config.selectors.searchIcons);
    while (searchTermIcon) {
      try {
        await page.click(config.selectors.searchIcons);
      } catch (error) {
        console.log(`scraper: ${scraperId} - error while clicking:`);
        console.log(error);
        const message = await deleteElementFromDOM(page, config.selectors.searchIcons, scraperId);
        console.log(`deletion message: ${message || 'none'}`);
      }

      if (await isSubscriptionExceeded(page)) {
        this.subscriptionExceeded = true;
        this.events.emit(KeywordResListExtractorEvents.SUBSCRIPTION_EXCEEDED);
        break;
      }

      this.updateKeywordsPassedOnPage(page);
      console.log(`scraper: ${scraperId} - keywords passed: ${this.keywordsPassedOnPage.length}, all keywords amount: ${keywordsAmount}`);

      await page.waitForTimeout(1500);

      searchTermIcon = await page.$(config.selectors.searchIcons);
    }
  }
}
