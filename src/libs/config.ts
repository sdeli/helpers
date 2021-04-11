import * as path from 'path';

const ROOT_FOLDER = path.join(__dirname, '../..');
const ASSETS_FOLDER = ROOT_FOLDER + '/assets';
export interface Config {
  root: string;
  userDataDir: string;
  keywordsListFilePath: string;
  downloadsFolderPath: string;
  downloadFilesDefaultName: string;
  assetsFolder: string;
  profiles: {
    default: string;
  };
  selectors: {
    keywordsTable: string;
    keywordsTableMasterToggle: string;
    searchIcons: string;
    searchIconSvg: string;
    keywordsCount: string;
    keywordContainers: string;
    importKeywordsInput: string;
    processKeywordsBtn: string;
    keywordTags: string;
    exportSvg: string;
    downloadCsvBtn: string;
  };
}

export const config: Config = Object.freeze({
  root: ROOT_FOLDER,
  assetsFolder: ASSETS_FOLDER,
  userDataDir: ASSETS_FOLDER + '/profiles',
  keywordsListFilePath: ASSETS_FOLDER + '/keywords-list.txt',
  downloadsFolderPath: ASSETS_FOLDER + '/downloads',
  downloadFilesDefaultName: 'kwfinder_import_export.csv',
  profiles: {
    default: 'profile-1',
  },
  selectors: {
    keywordsTable: '.mg-results.is-fixed.kw-left-table.animated-once.fade-in',
    keywordsTableMasterToggle: '.mg-results.is-fixed.kw-left-table.animated-once.fade-in .mg-results-th-inner input',
    searchIcons: '.mg-results-td .mg-rank.mg-no-rank',
    searchIconSvg: 'path',
    keywordsCount: '.uk-flex-item-1-1.font-12.mg-margin-r-10.uk-flex.uk-flex-center .color-blue',
    keywordContainers: '.mg-results-td.is-kw.uk-flex-item-auto.uk-flex-inline.uk-flex-middle',
    importKeywordsInput: '.react-tagsinput-input',
    processKeywordsBtn: '.mg-btn.is-green.uk-width-1-1',
    keywordTags: '.react-tagsinput-tag',
    exportSvg: 'button [data-icon="download"]',
    downloadCsvBtn: '.mg-listnav > li:nth-child(2) > button',
  },
});
