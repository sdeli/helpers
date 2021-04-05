import { readFileSync, readdirSync, appendFileSync } from 'fs';
import { config } from '../libs/config';

const fileNames = readdirSync(config.downloadsFolderPath);
fileNames.shift(); // => remove .gitkeep
// const fileNames = fileNamesList.console.log('fileNames');

for (let i = 0; i < fileNames.length; i++) {
  // for (let i = 0; i < 3; i++) {
  const downloadedFilesPath = config.downloadsFolderPath + '/' + fileNames[i];
  const keywordsCsvList = readFileSync(downloadedFilesPath, { encoding: 'utf-8' }) + '\n';
  const keywordsCsvArr = keywordsCsvList.split('\n');
  keywordsCsvArr.shift();
  const keywordsCsvListWithoutColumnNames = keywordsCsvArr.join('\n');
  console.log(`appending: ${downloadedFilesPath}`);
  appendFileSync(config.joinedCsvFilePath, keywordsCsvListWithoutColumnNames!, 'utf-8');
}

console.log('check: ' + config.joinedCsvFilePath);
