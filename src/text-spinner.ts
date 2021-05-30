import { getSquirtArticleBodySentences, getSquirtArticleTeaserSentences } from './libs/spin-assets/squirt-article';
import random from 'random';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spin = require('@bob6664569/content-spinner');

function getRandomSentence(sentences: string[]) {
  return sentences[random.int(0, sentences.length - 1)];
}

function mixUpSentences(sentences: string[]) {
  let currentIndex = sentences.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = sentences[currentIndex];
    sentences[currentIndex] = sentences[randomIndex];
    sentences[randomIndex] = temporaryValue;
  }

  return sentences;
}

function spinAllSentences(sentences: string[]) {
  return sentences.map((sentence) => spin(sentence));
}

function capitalizeSentences(sentences: string[]) {
  return sentences.map((sentence) => capitalizeSentence(sentence));
}

function capitalizeSentence(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

for (let i = 0; i < 10; i++) {
  const squirtArticleTeaserSentences = getSquirtArticleTeaserSentences();
  const teaserSentence = getRandomSentence(squirtArticleTeaserSentences);
  const spinedTeaserSentence = capitalizeSentence(spin(teaserSentence));

  const squirtArticleBodySentences = getSquirtArticleBodySentences();
  const mixedSentences = mixUpSentences(squirtArticleBodySentences);
  let spinedSentences = spinAllSentences(mixedSentences);
  spinedSentences = capitalizeSentences(spinedSentences);

  const article = [spinedTeaserSentence, ...spinedSentences].join(' ');
  // const article = [...spinedSentences].join(' ');
  console.log('=====================');
  console.log(article);
}

// for (let i = 0; i < 20; i++) {
// const squirtArticleTeaserSentences = getSquirtArticleTeaserSentences();
// const squirtArticleTeaserSentences = getSquirtArticleBodySentences();
// const teaserSentence = getRandomSentence(squirtArticleTeaserSentences);
// const spinedTeaserSentence = spin(teaserSentence);
// console.log(spinedTeaserSentence);
// console.log('=========');
// const majom = random.int(0, 3);
// console.log(majom);
// }
