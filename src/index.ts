import { config } from './libs/config';
import puppeteer, { Page } from 'puppeteer';

(async () => {
  const page = await openKWPage();
  await page.waitForTimeout(1000);

  const keywordsAmount = await getKeywordsAmount(page);
  console.log(`Keywords amount: ${keywordsAmount}`);

  for (let index = 0; index <= keywordsAmount; index++) {
    console.log(index);

    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);

    let searchTermIcon = await page.$(config.selectors.searchIcons);
    while (searchTermIcon) {
      try {
        await page.click(config.selectors.searchIcons);
      } catch (error) {
        console.log('error while clicking:');
        console.log(error);
        const message = await deleteElementFromDOM(page, config.selectors.searchIcons);
        console.log(`deletion message: ${message || 'none'}`);
      }

      await page.waitForTimeout(1500);
      searchTermIcon = await page.$(config.selectors.searchIcons);
    }
  }
})();

async function openKWPage() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--user-data-dir=${config.userDataDir}`,
      // `--profile-directory=/${config.profiles.default}`,
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('https://app.kwfinder.com/dashboard?language_id=0&location_id=0&query=squirt&source_id=0&sub_source_id=0');
  await page.waitForSelector(config.selectors.keywordsTable);

  return page;
}
async function getKeywordsAmount(page: Page) {
  const keywordsCountElem = await page.$(config.selectors.keywordsCount);
  return parseInt((await page.evaluate((el) => el.textContent, keywordsCountElem)).replace(/.*\/\s(\d*)/, '$1'));
}

async function deleteElementFromDOM(page: Page, sel: string): Promise<string | void> {
  try {
    const message = await page.$eval(sel, (elemToDelete) => {
      if (elemToDelete?.parentNode) {
        elemToDelete?.parentNode.removeChild(elemToDelete);
        return 'element deleted';
      }

      return 'element couldnt be deleted';
    });
    return message;
  } catch (error) {
    console.log('error while deleting element from DOM');
    console.log(error);
  }
}
