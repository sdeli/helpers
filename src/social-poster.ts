import puppeteer, { Page, Browser } from 'puppeteer';
import { openPage } from './libs/utils';

const userDataDir = '/Users/sdeli/Projects/helpers/assets/profiles';

const FACEBOOK_LOGIN_URL = 'https://www.facebook.com/';
const ALLOW_ESSENTIAL_COOKIES = '[title="Allow essential and optional cookies"]';
const EMAIL_INPUT = '[name="email"]';
const PASSWORD_INPUT = '[name="pass"]';
const LOGIN_BTN = '[name="login"]';
const SEARCH_ON_FACEBOOK = '[placeholder="Keresés a Facebookon"]';
const TEL_NUM = '+36706106958';
const PASS_NUM = 'Bgfkszm1234_';
const NESTJS_COMMUNITY_URL = 'https://www.facebook.com/groups/1689626331169452';
const CREATE_A_POST_MODAL_APPEARED_SEL = '[aria-label="Bezárás"]';
const TYPE_SOMETHING_JS_PATH = '[style="white-space: pre-wrap;"]';
const POST_CONTENT_JS_PATH = '[aria-label="Nyilvános bejegyzés létrehozása..."]';

const SEND_BTN_JS_PATH =
  '#mount_0_0_NK > div > div:nth-child(1) > div > div:nth-child(9) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x9f619.x1ja2u2z.x1k90msu.x6o7n8i.x1qfuztq.x10l6tqk.x17qophe.x13vifvy.x1hc1fzr.x71s49j > form > div > div.x9f619.x1ja2u2z.x1k90msu.x6o7n8i.x1qfuztq.x10l6tqk.x17qophe.x13vifvy.x1hc1fzr.x71s49j > div > div > div.x78zum5.x1q0g3np.xqui1pq.x1pl0jk3.x1plvlek.xryxfnj.x14ocpvf.x5oemz9.x1lck2f0.xlgs127 > div > div.x1l90r2v.xyamay9.x1n2onr6 > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.x1qughib.x1qjc9v5.xozqiw3.x1q0g3np.x1pi30zi.x1swvt13.xyamay9.xykv574.xbmpl8g.x4cne27.xifccgj > div > div > div > div.x6s0dn4.x78zum5.xl56j7k.x1608yet.xljgi0e.x1e0frkt';
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: userDataDir,
  });

  console.log('');
  const shouldRelatedKywdsOfOne = true;
  if (shouldRelatedKywdsOfOne) {
    initAndExecuteScraper(browser);
  }
})();

async function initAndExecuteScraper(browser: Browser) {
  console.log('initAndExecuteScraper');
  const { page } = await openPage(FACEBOOK_LOGIN_URL, browser);
  console.log('waiting');
  // await page.waitForSelector(ALLOW_ESSENTIAL_COOKIES);
  // console.log('selector is there');
  // await page.click(ALLOW_ESSENTIAL_COOKIES);
  // console.log('click');
  // await page.waitForTimeout(2000);
  // console.log('waitng');
  // await page.waitForSelector(EMAIL_INPUT);
  // console.log('waited');
  // await page.type(EMAIL_INPUT, TEL_NUM, {
  //   delay: 0,
  // });
  // console.log('email tiping');
  // await page.waitForTimeout(1000);
  // await page.type(PASSWORD_INPUT, PASS_NUM, {
  //   delay: 0,
  // });
  // console.log('pass tiping');

  // await page.click(LOGIN_BTN);
  await page.waitForSelector(SEARCH_ON_FACEBOOK);
  await page.waitForTimeout(1000);
  await page.goto(NESTJS_COMMUNITY_URL);
  await page.waitForTimeout(1000);
  // "//button[contains(., 'Írj valamit...')]"
  const [button] = await page.$x("//span[contains(., 'Írj valamit...')]");
  if (button) {
    await button.evaluateHandle((element) => {
      console.log('1111');
      console.log(element);
      element?.parentElement?.click();
      console.log(element?.parentElement);
      element?.parentElement?.parentElement?.click();
      console.log(element?.parentElement?.parentElement);
    });
  }
  console.log('waiting 111');
  await page.waitForSelector(TYPE_SOMETHING_JS_PATH);
  await page.click(TYPE_SOMETHING_JS_PATH);
  await page.type(TYPE_SOMETHING_JS_PATH, 'this is a cool post', {
    delay: 0,
  });
  // await page.keyboard.type('THIS IS A GREAT POST');
  // await page.type(POST_CONTENT_JS_PATH, 'THIS IS A GREAT POST', {
  //   delay: 0,
  // });
  console.log('typed');
  // await page.click(POST_CONTENT_JS_PATH);

  // await page.waitForSelector(POST_CONTENT_JS_PATH);
}
