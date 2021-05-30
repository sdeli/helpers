export enum Tense {
  cont = 'cont',
  third = 'third',
  norm = 'normal',
}

export const MAN = '{guy|male|dude|men}';
export const YOUNG_MALE = '{Young|Youthful|Youngish|Handsome} male';

export const PENIS = '{dick|penis|fat stuff|cock}';
export const PENIS_ADJ = '{huge|enormous|muscular|thick|big|hard}';

export const SPERM = 'sperm: {sperm|semen}';
export const SHOOT_SPERM = '{ends up {in her {boobs|mouth}|on her tits}|pours|covers up her {boobs|face}}';

export const LICK = '{devour|lick|eat|taste} with {lips|tongue}';

export const WOMAN = '{woman|lady|maiden|beauty|mistress|baby|babe|chick}';
export const MATURE_WOMAN = '{milf|mature|ripe|mom|gilf|stepmother}';

export const YOUNG_WOMAN = '{girl|maiden|stepsister|babe|baby|angel|beauty}';
export const PROSTITUTE = '{slut|cunt|whore|hooker}';

export const LUSTFUL_WOMAN_ADJ = '{passionate|sexy|nice titted|juicy ass|horny|lustful|hot|debaucher|tempting|temptress|slutty|naughty}';
export const HORNY = '{horny|lustful|hot|roused|alluring|naughty}';
export const BEAUTIFUL = '{super hot|perfect body|gorgeous|cute|sweet|delightful|pretty|naughty|tight pussy|flawless|gorgeous shapes}';
export function mature(womanSyn?: string): string {
  if (!womanSyn) return '{mature|ripe}';

  return `{mature ${womanSyn}|ripe ${womanSyn}|mother}`;
}

export const BREASTS = '{tits|breasts|boobs|shapes|jugs|melons}';
export const BREASTS_ADJ = '{soft|nice|sexy|superb|flawless|amazing}';
export const BIG_BREASTS_ADJ = '{huge|superb|flawless|big|great|nice large|nelon shaped|massive}';

export const SUCK = '{sucks|blows|gives head|sucked him off|swallows {dick|penis}|gives {|sloppy} blow job|empties his balls}';
export const LUBRICATE = '{slopes it|spits the dick|slopes her finger and massage the dick}';
export const SPEARM_LANDS_TO = '{in her mouth|on her face|on her tits}';

export function squirt(tense: Tense) {
  if (tense === Tense.cont) {
    return `{squirting|gushing|erasing ${SQUIRT_ADJ} juice}`;
  }

  if (tense === Tense.third) {
    return `{squirts|gushes|erases ${SQUIRT_ADJ} juice}`;
  }
}
export const SQUIRT = '{her fluid|pussy juice|gush|spurt}';
export const SQUIRT_ADJ = '{creamy|nice|sexy|sweet|wet|thick|greasy}';
export const SQUIRT_BEAM = '{beam|flow}';
export const SQUIRT_BEAM_ADJ = '{nice|sexy|sprinkling}';

export const PUSSY = '{pussy|pussy|puss|muff|cunt|twat}';
export const PUSSY_ADJ = '{juicy|flowing|waterfall|cuming|wet|nice|puffy|tight|perfect|warm|shaved|tasty|orgasmic}';

export const VAGINA = '{vagina|hole|pussy hole|honey pot|cunt|vagina|slit}';

export const CLIT = '{clit|clitoris}';
export function rub(tense: Tense) {
  if (tense === Tense.cont) {
    return '{fondling|rubbing|tickling|grinding|gliding|making circles on|grazing|stimulating}';
  }

  if (tense === Tense.third) {
    return '{fondles|rubs|tickles|grindes|glides|makes circles on|grazes|stimulates}';
  }

  if (tense === Tense.norm) {
    return '{fondle|rub|tickle|grinde|glide|make circles on|graze|stimulate}';
  }
}
export const RUB_ADJ = '{diligently|firmly|severely|gently|eagerly}';

export const FUCK = '{pound|bang|pump|fuck|screw|having sex with}';
export const MOAN = '{scream|moan|whimper|sigh}';
export function moan(tense: Tense) {
  if (tense === Tense.cont) {
    return '{screaming|moaning|whimpering|sighing}';
  }

  if (tense === Tense.third) {
    return '{screams|moans|whimpers|sighs}';
  }
}

export const ORGASM = '{orgasm|orgasmic pleasure|orgasmic joy|ejaculation}';
export const STRONG_ORGASM_ADJ = '{unforgettable|incredible|juicy|pussy shaking|strong}';

export const SEX_POSES = '{doggy|doggystyle|missionary|corkscrew|face off}';

export const ASS = '{ass|butt|bum|booty}';
export const ASS_ADJ = '{nice|juicy|bubble|round|hard}';
export const SLAPS_ASS = '{slaps|blow|spank}';

export const ASSHOLE = '{hole|asshole|butt hole|anus}';
export const ASSHOLE_ADJ = '{nice|pink|wet|soft|tight|perfect|warm}';
export const DILDO = '{dildo|vibrator|toy}';
export const DILDO_ADJ = '{favorite|beloved|new|hard|big|vibrating}';

export const SEX = '{sex|fuck}';
export const SEX_ADJ = '{hot|lustful|sensual|hard}';

export const LIKE_TO_DO = '{likes|loves}';
export const AFTER = '{then|{straight|right} after|{straight|right} afterward|{next}|followingly|in the {next|coming} {scene|shot}|a minute later|thereafter}';
export const AS_SOON_AS = '{As|As soon as|While|Right away}';

export const SOON = 'soon: {soon|shortly|in a minute|in no time}';
export const START_TO_DO = '{starts|begin|goes on}';
export const HAS = '{awards herself with|has|treats herself with}';
export function stroke(tense: Tense) {
  if (tense === Tense.cont) {
    return '{patting|stroking|fondling|caressing}';
  }

  if (tense === Tense.third) {
    return '{pats|strokes|fondles|caresses}';
  }

  if (tense === Tense.norm) {
    return '{pat|stroke|fondle|caress}';
  }
}

export function continues(tense: Tense) {
  if (tense === Tense.cont) {
    return '{continuing|carrying on|keeping on}';
  }

  if (tense === Tense.third) {
    return '{continues|carries on|keeps on}';
  }
}
export function sheGetsExcited(womanSynonym: string) {
  return `{
    ${womanSynonym} {got|gets} {|really |real |enormously }really exited|
    her {|entire |whole } skin was {covered with|conquered by} goosebumps|
    ${womanSynonym} {got|gets|becomes} {|really |real |enormously } passionate|
    ${womanSynonym} {got|gets|becomes} {|really |real |enormously } lustful|
    ${womanSynonym} {got|gets|becomes} {|really |real |enormously }libidinous
  }`;
}

export const THATS_WHY = '{so|thence|thus|therefore}';

// pussy ass combo
// pussy and clit constellation
// flush, splash
// orgasm adj: intense, well deserved, strong, pussy shaking, body shaking, whole body
// https://xhamster.com/videos/wet-amateur-orgasms-12306525&from=player_related
