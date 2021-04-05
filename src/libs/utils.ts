import puppeteer, { Page } from 'puppeteer';
import { config } from './config';
import { renameSync, watch } from 'fs';
import { Browser } from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

export async function openPage(url: string, browser?: Browser) {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      userDataDir: config.userDataDir,
    });
  }

  const page = await browser.newPage();

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: config.downloadsFolderPath,
  });
  console.log('downlaods: ' + config.downloadsFolderPath);

  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(url);

  return { page, browser };
}

export async function deleteElementFromDOM(page: Page, sel: string): Promise<string | void> {
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

export async function downloadKeywordsList(page: Page) {
  await page.waitForSelector(config.selectors.keywordsTableMasterToggle);
  await page.click(config.selectors.keywordsTableMasterToggle);

  await page.waitForTimeout(1000);

  const exportOptionsButton = (await (await page.$(config.selectors.exportSvg))?.getProperty('parentElement'))?.asElement();
  if (!exportOptionsButton) {
    console.log('no export options button found');
    return;
  }

  await exportOptionsButton?.click();
  await page.waitForTimeout(1000);

  await page.waitForSelector(config.selectors.downloadCsvBtn);
  await page.click(config.selectors.downloadCsvBtn);

  await waitToDownloadFile(config.downloadsFolderPath);
  console.log('download finished');
}

async function waitToDownloadFile(folderAbsPath: string) {
  console.log(`download folders absolut path: ${folderAbsPath}`);
  let firstFolderActionHappened = false;

  return new Promise((resolve, reject) => {
    const watcher = watch(folderAbsPath);

    watcher.on('change', (eventType, currFilesName) => {
      console.log(`this file should be already downloaded: ${currFilesName}`);
      if (!firstFolderActionHappened) {
        firstFolderActionHappened = true;
        setTimeout(() => {
          watcher.close();
          resolve('');
          console.log('cancel');
        }, 3000);
      }

      const shouldPreventToBeOverwrittenByNextDownload = currFilesName === config.downloadFilesDefaultName;
      if (shouldPreventToBeOverwrittenByNextDownload) {
        const oldPath = `${folderAbsPath}/${currFilesName}`;
        const newPath = `${folderAbsPath}/${(currFilesName as string).replace('.csv', '')}_${uuidv4()}.csv`;
        try {
          renameSync(oldPath, newPath);
          console.log(`the file: ${currFilesName} has been overwritten to: ${currFilesName}_${uuidv4()}`);
        } catch (error) {}
      }
    });

    watcher.on('error', (error) => {
      console.log(error);
      watcher.close();
      reject();
    });

    setTimeout(() => {
      reject('download was unsuccessful');
    }, 30000);
  });
}

export function isSubscriptionExceeded(page: Page) {
  return page.evaluate(() => {
    const allHtml = document.querySelector('html');
    return !!allHtml?.innerHTML.match(/You're doing too much/);
  });
}