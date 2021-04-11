import { readFileSync, readdirSync, appendFileSync } from 'fs';
import { config } from '../libs/config';

const fileNames = readdirSync(config.downloadsFolderPath);
const csvFileNames = fileNames.filter((fileName) => fileName.match(/.*\.csv/));
const joinedFilePath = `${config.assetsFolder}/joined_${getFormattedDate()}.csv`;

for (let i = 0; i < csvFileNames.length; i++) {
  // for (let i = 0; i < 3; i++) {
  console.log('csvFileNames');
  console.log(csvFileNames[i]);
  const downloadedFilesPath = config.downloadsFolderPath + '/' + csvFileNames[i];
  const keywordsCsvList = readFileSync(downloadedFilesPath, { encoding: 'utf-8' }) + '\n';
  const keywordsCsvArr = keywordsCsvList.split('\n');
  if (i !== 1) {
    keywordsCsvArr.shift();
  }
  const keywordsCsvListWithoutColumnNames = keywordsCsvArr.join('\n');
  console.log(`appending: ${downloadedFilesPath}`);
  appendFileSync(joinedFilePath, keywordsCsvListWithoutColumnNames!, 'utf-8');
}

console.log('check: ' + joinedFilePath);

function getFormattedDate() {
  var date = new Date();
  var str =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '_' +
    date.getHours() +
    '-' +
    date.getMinutes() +
    '-' +
    date.getSeconds();

  return str;
}
