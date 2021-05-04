/* eslint-disable quotes */
import { ASSHOLE_ADJ, LUSTFUL_WOMAN_ADJ, SQUIRT, SQUIRT_ADJ, stroke, THATS_WHY } from './synonyms';
import random from 'random';
import {
  AFTER,
  ASS,
  ASSHOLE,
  ASS_ADJ,
  BEAUTIFUL,
  BREASTS,
  BREASTS_ADJ,
  CLIT,
  continues,
  DILDO,
  DILDO_ADJ,
  HAS,
  HORNY,
  moan,
  ORGASM,
  PENIS,
  PENIS_ADJ,
  VAGINA,
  PUSSY,
  PUSSY_ADJ,
  rub,
  RUB_ADJ,
  SEX_POSES,
  squirt,
  SQUIRT_BEAM,
  SQUIRT_BEAM_ADJ,
  STRONG_ORGASM_ADJ,
  Tense,
  WOMAN,
  YOUNG_WOMAN,
} from './synonyms';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const spin = require('@bob6664569/content-spinner');

export function getSquirtArticleTeaserSentences() {
  const squirtArticleTeaserSentences = [
    // sentence 1
    `${YOUNG_WOMAN} is {spreading|opening|putting apart} her {nice|sexy|shapeful|shaped|sporty} legs on the {sofa|couch|armchair|chair} to ` +
      '{' +
      '{' +
      'give a ride to|' +
      'enjoy|' +
      'treat herself with|' +
      'tickle herself with|' +
      'give a masturbation shot for|' +
      'enjoy herself with|' +
      '}|{' +
      'have a {nice|wet} {masturbation|squirting orgasm} with' +
      '}' +
      `} her{dearest| favorite| beloved| new|} {${CLIT}|pussy} {massaging|fondling|rubbing|tickling|grinding} ${DILDO}`,
    // sentence 2
    `{squirting|wet|sloppy|creamy} {masturbation|orgasm|ejaculation} by {${BREASTS_ADJ} ${BREASTS}, ${HORNY} ${WOMAN}|${HORNY} ${WOMAN} with ${BREASTS_ADJ} ${BREASTS}}.`,
    `{${BREASTS_ADJ} ${BREASTS}, ${HORNY} ${WOMAN}|${HORNY} ${WOMAN} with ${BREASTS_ADJ} ${BREASTS}} has {squirting|wet|sloppy|creamy} {masturbation|orgasm|ejaculation}.`,
    // sentence 3
    `${repeat(
      BEAUTIFUL,
      1,
      2
    )} ${YOUNG_WOMAN} {dildo creampies herself|${HAS} {wet|intense|orgasmic|sloppy} dildo creampie|${HAS} {wet|intense|orgasmic|sloppy} {masturbation|ejaculation}}.`,
  ];

  return squirtArticleTeaserSentences;
}

export function getSquirtArticleBodySentences() {
  return [
    // sentence 1
    '{' +
      `${AFTER} {the ${YOUNG_WOMAN}|the ${YOUNG_WOMAN}|she}|` +
      `{the ${YOUNG_WOMAN}|the ${YOUNG_WOMAN}} ${AFTER}` +
      '} ' +
      '{' +
      `{continues|carries on} by {slapping|${rub(Tense.cont)}}|is ${rub(Tense.cont)}|` +
      `${rub(Tense.third)}` +
      '} ' +
      `her ${PUSSY} in ${SEX_POSES} position {and|then} {showing|revealing} {{nice|beautiful|wet|pink} ${ASSHOLE}|${ASS_ADJ} ${ASS}}` +
      `{ while ${moan(Tense.cont)}|. She is ${moan(Tense.cont)}|. She ${moan(Tense.third)}| while she is ${moan(Tense.cont)}} ` +
      'from{ strong|} {orgasm|orgasmic ejaculation}{, {having|enjoying} {pussy|puss} contractions|} and ' +
      `${squirt(Tense.cont)} in ${SQUIRT_BEAM_ADJ} {${SQUIRT_BEAM}} {flowing {through|over}|covering up|making wet} her {pretty|nice|contracting|beautiful} ${ASSHOLE}.`,
    // sentence 2
    `{${AFTER} our ${HORNY} ${YOUNG_WOMAN}|our ${HORNY} ${YOUNG_WOMAN} ${AFTER}} ${continues(Tense.third)} ` +
      `${rub(Tense.cont)} her ${PUSSY} with her ${DILDO_ADJ} ${DILDO}, {from what|so|and so|getting high and} she` +
      ` ${squirt(Tense.third)} {from|out of} her ${PUSSY_ADJ} ${PUSSY}.`,
    `${AFTER} she {rides|pushes|fucks|rocks} her ${repeat(DILDO_ADJ, 0, 1)} ${DILDO} in ${SEX_POSES} position, {revealing|showing} her ${repeat(ASS_ADJ, 1, 2)} ${ASS} with ` +
      `{{amazing|incredible|unbelievable|beautiful|gorgeous|naughty|pretty} {pussy ass|ass and pussy|asshole pussy} {combo|combination}|${repeat(BREASTS_ADJ, 1, 2)} ${BREASTS}}.`,
    // sentence 3
    `She {{just |}${moan(Tense.third)}|is {just |}${moan(Tense.cont)}} for a ${repeat(PENIS_ADJ, 1, 3)} ${PENIS} ` +
      `{in|into|to fill{ up|}|filling{ out|}|to bang|banging|to ream|reaming|to fuck{ hard|}|{banging|moving} back and forth in} her ${repeat(PUSSY_ADJ, 0, 2)} ${PUSSY}, ` +
      `{${THATS_WHY} to {feel|bring herself into|}|so to experience|so to finally get} ${repeat(STRONG_ORGASM_ADJ, 1, 2)} ${ORGASM} ` +
      `she {{can't stop|can not stop} fingering|${RUB_ADJ} fingers|fingers with {fast|firm|diligent} repetitions} her {pussy|vagina|slit|hole|honey pot} ` +
      '{' +
      '{getting|intruding} deeper and deeper|' +
      '{getting|intruding} so deep as she{ just|} can|' +
      `to {feel being fucked{| hard}|have the feeling of {hard fuck|${PENIS_ADJ} ${PENIS}|${PENIS_ADJ} ${PENIS}}}` +
      '}.',
    // sentence 4
    `she {${rub(Tense.third)} ${RUB_ADJ}|${RUB_ADJ} ${rub(Tense.third)}} her ${repeat(PUSSY_ADJ, 1, 3)} ` +
      ` pussy with her ${repeat(DILDO_ADJ, 1, 2)} ${DILDO}, ${THATS_WHY} her ${PUSSY_ADJ} pussy {can't stop|is just|is just {diligently|eagerly}|starts {diligently|eagerly}} ` +
      `{flowing|gushing|pouring|spilling|flooding} ${repeat(SQUIRT_ADJ, 1, 2)} ${SQUIRT}.`,
    // sentence 5
    `{{{this|that} is|You see now|so|so see here}|{{this|that} is|You see now|so|so see here}|that's}{{| exactly} {the way|how}| the {perfect|ideal} way how}` +
      ` her ${PUSSY_ADJ} {pussy|hole} {likes{| it}|loves{| it}|{gets to be|will be|becomes{| to be}} a ${PUSSY_ADJ} fountain|{gets to be|will be} ${PUSSY_ADJ} a geyser}.`,
    // sentence 6
    `{orgasm {follows|after} orgasm|one orgasm after an other|} and this ${LUSTFUL_WOMAN_ADJ} ${YOUNG_WOMAN} {can't stop|can not stop|keeps on|} ${moan(Tense.cont)}, ` +
      `{touching and pushing|pushing and touching} her ,${repeat(BREASTS_ADJ, 1, 2)} ${BREASTS} {where|${THATS_WHY}|${THATS_WHY}} ` +
      `her nipples {are staying {like the eiffel tower|sky high|to the sky}|{demanding {more and more|more}|want|wish for|crave for} {treat|care|pleasure|attention}}.`,
    // sentence 7
    '{' +
      `her ${repeat(ASSHOLE_ADJ, 0, 2)} ${ASSHOLE} {is getting|gets} {fully|entirely|completely|totally|perfectly} ` +
      `{flown|covered up|wet|sloppy} by her {vaginal creampie {fluid|juice}|${SQUIRT}|${SQUIRT}}|` +
      `her {vaginal creampie fluid|${SQUIRT}|${SQUIRT}} {fully|entirely|completely|totally|perfectly} {flows through|covers up} her ${repeat(ASSHOLE_ADJ, 0, 2)} ${ASSHOLE}|` +
      `her {vaginal creampie fluid|${SQUIRT}|${SQUIRT}} makes {fully|entirely|completely|totally|perfectly} {wet|sloppy|creamy} her ${repeat(ASSHOLE_ADJ, 0, 2)} ${ASSHOLE}` +
      '}' +
      ` and{| as you see| as seen| so| by the way} {as it gets{| continuously| constantly| more| increasingly| endlessly| continually| steadily} ` +
      `{deeper and deeper|deeper down|further down|towards down}} {in|on|through}` +
      ` her {${ASSHOLE}|${repeat(ASS_ADJ, 0, 1)} ${ASS}}, it {gets|becomes} ` +
      ` {thicker and thicker|{{| much}more|increasingly} thicker|{{|much }more|increasingly} creamy|{{|much }more|increasingly} greasy}.`,
    // sentence 8
    `{Cleanly apparent|` +
      `{it is|it's{| totally}} clear|` +
      `{it is} no{|t a} secret|` +
      `it isn't a secret}, ` +
      `that this ${YOUNG_WOMAN} with her ${BREASTS_ADJ} ${BREASTS}, {likes|loves|enjoys} ` +
      `{what she is doing|her job|to be {camed|recorded|caught on picture} {while|during} {|enjoying} {masturbating|her masturbation|pussy ${rub(Tense.cont)}}}.`,
    // `${YOUNG_WOMAN} cant stop her body shaking while stroking her tight, wet, warm pussy up and down with that vibrating dildo which is then, got shiny from her beautiful pussy juice.`,
    // `As ${YOUNG_WOMAN} moans for moan orgasmic pleasure spread her legs wider and wider and ${YOUNG_WOMAN} grabs her ass to pull apart her butt to have her pussy get more space to dick substituting clit massager, while ${YOUNG_WOMAN} is licking her nipples with her nice tongue, which missis a cock like Paris Hilton her monday morning sohpping.`,
    // `Pussy rubbing, dildo creampies, tattooed bitch nice big boobs, contracting pussy webcam all what a chaturbate ${YOUNG_WOMAN} needs:)`,
    // sentence 8
    `${AFTER} this ${HORNY}, ${BEAUTIFUL} ${YOUNG_WOMAN} ${stroke(Tense.third)} her ${repeat(ASS_ADJ, 1, 2)} ${ASS}, ` +
      `{and|while} {showing|turning} {it|her ${BREASTS}} {to|into} the {camera|cam}, then again she touches her shaved {white|brown|caramel} ${PUSSY}, ` +
      `{stimulating|patting|treating|arousing} her ${PUSSY_ADJ} ${CLIT}, {while|at the same time|meanwhile|as|during} ` +
      `she is {reaching|fingering|pushing her {fingers|fingertips}|diving} {deep|deeply|long way} inside her ${repeat(PUSSY_ADJ, 1, 2)} ${VAGINA}, ` +
      'with {{nice|sensually} slow|sensual|fast} {turnarounds|movements|motions|repetitions}, ' +
      `{while|at the same time|meanwhile|as|during} she is {endlessly|desperately|continuously|steadily} ${moan(Tense.cont)} from {orgasmic|intense|body shaking|unforgettable} ` +
      `{pleasure|feeling|experience|sensation} in her {${repeat(ASS_ADJ, 1, 2)} {${PUSSY}|${VAGINA}} and ${CLIT}|${CLIT} and ${repeat(PUSSY_ADJ, 1, 2)} {${PUSSY}|${VAGINA}}}.`,
    // sentence 8
    `{{inbetween|meanwhile|in the meantime}|{inbetween|meanwhile|in the meantime}|${AFTER}} ` +
      '{' +
      `she {gets up|reaches|moves} to {fix|set|adjust} the {camera{s|}|cam{s|}} {position|angle}|` +
      `she {moves|adjusts|turns} the {camera|cam} {into the|to {the|a}} {correct|proper|nice} {position|angle}|` +
      `she {moves|adjusts|turns} the {position|angle} of the {camera|cam}` +
      '}, ' +
      `{so that|so|for the sake of|in order to,} her ` +
      `{${repeat(PUSSY_ADJ, 1, 2)} ${PUSSY}{| and{| ${repeat(ASSHOLE_ADJ, 1)}} ${ASSHOLE}}} ` +
      `{is {properly |nicely |well }in the {picture|view|middle}|can be {looked at|watched}|is {visible|in{| a}{ good| proper} sight}}`,
  ];
}

export function repeat(spinSyntaxWords: string, count: number, max?: number): string {
  const words: string[] = [];
  max = max || count;

  const iterationsCount = random.int(count, max);
  if (!iterationsCount) return '';

  for (let i = 0; i < iterationsCount; ) {
    const currentRandomWord = spin(spinSyntaxWords);
    const isNotDuplicate = !words.includes(currentRandomWord);
    if (isNotDuplicate) {
      words.push(currentRandomWord);
      i++;
    } else {
      continue;
    }
  }
  return words.join(', ');
}
