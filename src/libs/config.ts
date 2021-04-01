import * as path from 'path';

const ROOT_FOLDER = path.join(__dirname, '../..');
export interface Config {
  root: string;
  userDataDir: string;
  profiles: {
    default: string;
  };
  selectors: {
    keywordsTable: string;
    searchIcons: string;
    searchIconSvg: string;
    keywordsCount: string;
  };
}

export const config: Config = Object.freeze({
  root: ROOT_FOLDER,
  userDataDir: ROOT_FOLDER + '/assets/profiles',
  profiles: {
    default: 'profile-1',
  },
  selectors: {
    keywordsTable: '.mg-results.is-fixed.kw-left-table.animated-once.fade-in',
    searchIcons: '.mg-results-td .mg-rank.mg-no-rank',
    searchIconSvg: 'path',
    keywordsCount: '.uk-flex-item-1-1.font-12.mg-margin-r-10.uk-flex.uk-flex-center .color-blue',
  },
});
