import { config } from './libs/config';
import { downloadKeywordsList, openPage } from './libs/utils';
import { KeywordResListExtractor } from './libs/scrapers/keyword-res-list-extractor';

const KEYWORDS_QUERY = 'anal+squirt';
const KW_TOOL_URL = `https://app.kwfinder.com/dashboard?language_id=0&location_id=0&query=${KEYWORDS_QUERY}&source_id=0&sub_source_id=0`;

(async () => {
  const { page } = await openPage(KW_TOOL_URL);
  await page.waitForSelector(config.selectors.keywordsTable);

  const keywordResListExtractor = new KeywordResListExtractor();
  await keywordResListExtractor.extract(page);
  await downloadKeywordsList(page);
})();
