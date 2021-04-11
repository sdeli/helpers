import { readFileSync } from 'fs';
import { config } from './libs/config';
import { downloadKeywordsList, openPage } from './libs/utils';

const keywordsStrList = readFileSync(config.keywordsListFilePath, { encoding: 'utf-8' }) + '\n';

(async () => {
  const keywords = keywordsStrList.trim().split('\n');
  for (let i = 0; i < keywords.length; i++) {
    const keywordsQuery = keywords[i].trim().replace(/\s/g, '+');
    console.log(`Current iteration: ${i}, all keywords count: ${keywords.length}`);
    console.log('keywordsQuery: ' + keywordsQuery);

    const kwToolUrl = `https://app.kwfinder.com/dashboard?language_id=0&location_id=0&query=${keywordsQuery}&source_id=0&sub_source_id=0`;
    const { page, browser } = await openPage(kwToolUrl);
    await page.waitForSelector(config.selectors.keywordsTable);

    await downloadKeywordsList(page, 1);
    await browser.close();
  }
})();
