import { useState, useEffect, useCallback, useRef } from 'react';

// ── Bilingual UI strings ──────────────────────────────────────────────────────

const UI = {
  en: {
    langToggle: '🇫🇷 Je parle français',
    tagline: 'Relive and share memories',
    newUser: 'New to Afroslang?',
    getStarted: 'GET STARTED',
    signIn: 'Already have an account? SIGN IN',
    hiThere: "👋 Hi there! I'm ",
    mascotName: 'Afro!',
    guide: 'Your African slang guide',
    continue: 'CONTINUE',
    questionsHeading: 'Just answer a few questions for me',
    questionsSub: "I'll use your answers to build your perfect Afroslang course",
    letsGo: "LET'S GO 🔥",
    whatLearn: 'What would you like to learn?',
    courseBuilding: 'COURSE BUILDING...',
    joinFriends: 'Get ready to join your friends learning African slang!',
    personalizing: 'Personalizing your experience...',
    howHeard: 'How did you hear about Afroslang?',
    howMuchSlang: 'How much slang do you know?',
    affirm: "Ayy, that's what I'm talking about! 🔥",
    settingUp: 'Setting things up...',
    whyLearning: 'Why are you learning?',
    selectAll: 'Select all that apply',
    routineTitle: "Let's set up a vibe routine!",
    routineSub: "A daily habit is the secret to mastering African slang. We'll help you stay consistent.",
    soundsGood: 'SOUNDS GOOD 🙌',
    dailyGoalQ: "What's your daily goal?",
    lockedIn: "I'M LOCKED IN 🔒",
    howStart: 'How do you want to get started?',
    recommended: '⭐ RECOMMENDED',
    plusTagline: 'Faster progress · no ads · unlimited hearts',
    startPlus: 'START AFROPLUS',
    learnFree: 'Learn for free',
    freeTagline: 'Core features, with ads',
    continueFree: 'CONTINUE FOR FREE',
    placementLabel: 'Placement check',
    createAccount: 'CREATE ACCOUNT & SAVE PROGRESS',
    saveProg: 'Create a free account to save your progress and start learning!',
    afroplusHint: "You'll be set up with AfroPlus after signing up",
    startAt: "You'll start at",
    levelWord: 'level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    affirmAdv: "You're lowkey fluent! 🔥",
    affirmMid: "You've got a solid base! 💪",
    affirmBeg: 'Ready to start from the roots! 🌱',
  },
  fr: {
    langToggle: '🇬🇧 I speak English',
    tagline: 'Revivre et partager des souvenirs',
    newUser: 'Nouveau sur Afroslang ?',
    getStarted: 'COMMENCER',
    signIn: 'Déjà un compte ? SE CONNECTER',
    hiThere: '👋 Salut ! Je suis ',
    mascotName: 'Afro !',
    guide: 'Ton guide du slang africain',
    continue: 'CONTINUER',
    questionsHeading: 'Réponds juste à quelques questions',
    questionsSub: "J'utiliserai tes réponses pour créer ton cours Afroslang parfait",
    letsGo: "C'EST PARTI 🔥",
    whatLearn: "Qu'est-ce que tu voudrais apprendre ?",
    courseBuilding: 'COURS EN COURS...',
    joinFriends: "Prépare-toi à rejoindre tes amis qui apprennent le slang africain !",
    personalizing: 'Personnalisation de ton expérience...',
    howHeard: "Comment as-tu entendu parler d'Afroslang ?",
    howMuchSlang: 'Combien de slang connais-tu ?',
    affirm: "Voilà, c'est ce que je voulais entendre ! 🔥",
    settingUp: 'On prépare tout...',
    whyLearning: 'Pourquoi tu apprends ?',
    selectAll: 'Sélectionne tout ce qui s\'applique',
    routineTitle: 'Mettons en place une routine !',
    routineSub: "Une habitude quotidienne est le secret pour maîtriser le slang africain. On t'aidera à rester constant(e).",
    soundsGood: 'SUPER ! 🙌',
    dailyGoalQ: 'Quel est ton objectif quotidien ?',
    lockedIn: "C'EST PARTI ! 🔒",
    howStart: 'Comment veux-tu commencer ?',
    recommended: '⭐ RECOMMANDÉ',
    plusTagline: 'Progrès plus rapide · sans pubs · cœurs illimités',
    startPlus: 'DÉMARRER AFROPLUS',
    learnFree: 'Apprendre gratuitement',
    freeTagline: 'Fonctionnalités de base, avec pubs',
    continueFree: 'CONTINUER GRATUITEMENT',
    placementLabel: 'Évaluation de niveau',
    createAccount: 'CRÉER UN COMPTE & SAUVEGARDER',
    saveProg: "Crée un compte gratuit pour sauvegarder ta progression et commencer à apprendre !",
    afroplusHint: "Tu seras configuré avec AfroPlus après ton inscription",
    startAt: 'Tu commenceras au niveau',
    levelWord: '',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    affirmAdv: 'Tu es carrément à l\'aise ! 🔥',
    affirmMid: 'Tu as une bonne base ! 💪',
    affirmBeg: 'Prêt(e) à commencer depuis les bases ! 🌱',
  },
} as const;

// ── Static data ───────────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: 'swahili',  label: 'Swahili',  flag: '🇰🇪', region: 'East Africa',  regionFr: "Afrique de l'Est" },
  { id: 'yoruba',   label: 'Yoruba',   flag: '🇳🇬', region: 'West Africa',  regionFr: "Afrique de l'Ouest" },
  { id: 'hausa',    label: 'Hausa',    flag: '🇳🇬', region: 'West Africa',  regionFr: "Afrique de l'Ouest" },
  { id: 'igbo',     label: 'Igbo',     flag: '🇳🇬', region: 'Nigeria',      regionFr: 'Nigeria' },
  { id: 'zulu',     label: 'Zulu',     flag: '🇿🇦', region: 'South Africa', regionFr: 'Afrique du Sud' },
  { id: 'amharic',  label: 'Amharic',  flag: '🇪🇹', region: 'East Africa',  regionFr: "Afrique de l'Est" },
  { id: 'arabic',   label: 'Arabic',   flag: '🇪🇬', region: 'North Africa', regionFr: 'Afrique du Nord' },
];

const SOURCES = [
  { id: 'tiktok',    label: 'TikTok',     labelFr: 'TikTok' },
  { id: 'instagram', label: 'Instagram',  labelFr: 'Instagram' },
  { id: 'facebook',  label: 'Facebook',   labelFr: 'Facebook' },
  { id: 'twitter',   label: 'Twitter/X',  labelFr: 'Twitter/X' },
  { id: 'friend',    label: 'A Friend',   labelFr: 'Un ami' },
  { id: 'appstore',  label: 'App Store',  labelFr: 'App Store' },
  { id: 'youtube',   label: 'YouTube',    labelFr: 'YouTube' },
  { id: 'google',    label: 'Google',     labelFr: 'Google' },
  { id: 'other',     label: 'Other',      labelFr: 'Autre' },
];

type PlacementQ = { q: string; qFr: string; opts: string[]; ans: string };

// French translations for option words used in placement answers
const OPTION_FR: Record<string, string> = {
  'Hello / How are you': 'Bonjour / Comment vas-tu',
  'Goodbye': 'Au revoir',
  'Thank you': 'Merci',
  'Please': "S'il te plaît",
  'Sorry': 'Désolé(e)',
  'Yes': 'Oui',
  'No': 'Non',
  'Maybe': 'Peut-être',
  'Later': 'Plus tard',
  'Never': 'Jamais',
  'Water': 'Eau',
  'Food': 'Nourriture',
  'Food/Eating': 'Nourriture/Manger',
  'Fire': 'Feu',
  'Earth': 'Terre',
  'Wind': 'Vent',
  'House': 'Maison',
  'House/Home': 'Maison/Foyer',
  'Home/Homestead': 'Foyer',
  'Mother': 'Mère',
  'Father': 'Père',
  'Sister': 'Sœur',
  'Brother': 'Frère',
  'Aunt': 'Tante',
  'Grandmother': 'Grand-mère',
  'Friend': 'Ami(e)',
  'Younger sibling': 'Cadet(te)',
  'Child': 'Enfant',
  'Children': 'Enfants',
  'Elders': 'Anciens',
  'Elder': 'Ancien',
  'Baby': 'Bébé',
  'Boy': 'Garçon',
  'Girl': 'Fille',
  'One': 'Un',
  'Two': 'Deux',
  'Three': 'Trois',
  'Four': 'Quatre',
  'Ten': 'Dix',
  'Work': 'Travail',
  'Play': 'Jouer',
  'Sleep': 'Dormir',
  'Eat': 'Manger',
  'Market': 'Marché',
  'School': 'École',
  'Farm': 'Ferme',
  'Road': 'Route',
  'River': 'Rivière',
  'Money': 'Argent',
  'Clothes': 'Vêtements',
  'Book': 'Livre',
  'Person': 'Personne',
  'Animal': 'Animal',
  'Animals': 'Animaux',
  'God/Lord/King': 'Dieu/Seigneur/Roi',
  'Teacher': 'Professeur',
  'Enemy': 'Ennemi',
  'Stranger': 'Étranger',
  'Chief': 'Chef',
  'Good morning': 'Bonjour (matin)',
  'Good night': 'Bonne nuit',
  'Welcome': 'Bienvenue',
  'Be careful': 'Fais attention',
  'Hurry up': 'Dépêche-toi',
  'Hurry': 'Se dépêcher',
  'Wait': 'Attends',
  "Let's go / Come on": 'Allons-y / Allez',
  'Stop': 'Arrête',
  'Look': 'Regarde',
  'No problem / It is fine': 'Pas de problème / Ça va',
  'I am angry': 'Je suis en colère',
  'Help me': 'Aide-moi',
  'Happiness': 'Bonheur',
  'Anger': 'Colère',
  'Love/Compassion': 'Amour/Compassion',
  'Sadness': 'Tristesse',
  'What color': 'Quelle couleur',
  'How many days': 'Combien de jours',
  'Where to go': 'Où aller',
  'Who is it': 'Qui est-ce',
  'Sickness': 'Maladie',
  'Joy': 'Joie',
  'Journey': 'Voyage',
  'Elephant': 'Éléphant',
  'Cheetah': 'Guépard',
  'Lion': 'Lion',
  'Snake': 'Serpent',
  'Little': 'Peu',
  'Always': 'Toujours',
  'Very much': 'Beaucoup',
  'OK / Alright': "OK / D'accord",
  'Strong': 'Fort',
  'Clever/Skilled': 'Intelligent/Habile',
  'Rich': 'Riche',
  'Tall': 'Grand',
  'And/Plus': 'Et/Plus',
  'But': 'Mais',
  'Or': 'Ou',
  'So': 'Donc',
  'Moon': 'Lune',
  'Star': 'Étoile',
  'Sun/Day': 'Soleil/Jour',
  'Rain': 'Pluie',
  'Traders': 'Commerçants',
  'Sorry / Peace': 'Désolé / Paix',
  'Go well / Goodbye': 'Bonne route / Au revoir',
  'I love you': "Je t'aime",
  'My love/dear': 'Mon amour/chéri(e)',
  'God willing / Hopefully': 'Si Dieu le veut',
  'I promise': 'Je promets',
  'Right now': 'Maintenant',
};

const PLACEMENT_QUESTIONS: Record<string, PlacementQ[]> = {
  swahili: [
    { q: 'What does "Habari" mean?',           qFr: 'Que signifie « Habari » ?',               opts: ['Hello / How are you','Goodbye','Thank you','Water'],       ans: 'Hello / How are you' },
    { q: 'How do you say "one" in Swahili?',   qFr: 'Comment dit-on "un" en swahili ?',         opts: ['Mbili','Moja','Tatu','Nne'],                               ans: 'Moja' },
    { q: 'What does "Asante" mean?',           qFr: 'Que signifie « Asante » ?',               opts: ['Please','Sorry','Thank you','Yes'],                        ans: 'Thank you' },
    { q: '"Chakula" means?',                   qFr: '« Chakula » signifie ?',                  opts: ['Water','Food','House','Book'],                             ans: 'Food' },
    { q: 'What does "Ndio" mean?',             qFr: 'Que signifie « Ndio » ?',                 opts: ['No','Maybe','Yes','Later'],                                ans: 'Yes' },
    { q: '"Mama" in Swahili means?',           qFr: '« Mama » en swahili signifie ?',          opts: ['Sister','Mother','Aunt','Friend'],                         ans: 'Mother' },
    { q: 'What does "Simba" mean?',            qFr: 'Que signifie « Simba » ?',                opts: ['Elephant','Cheetah','Lion','Snake'],                       ans: 'Lion' },
    { q: 'How do you say "water" in Swahili?', qFr: 'Comment dit-on "eau" en swahili ?',       opts: ['Mto','Maji','Chai','Maziwa'],                              ans: 'Maji' },
    { q: '"Karibu" means?',                    qFr: '« Karibu » signifie ?',                   opts: ['Be careful','Welcome','Hurry up','Wait'],                  ans: 'Welcome' },
    { q: 'What does "Kwaheri" mean?',          qFr: 'Que signifie « Kwaheri » ?',              opts: ['Good morning','Goodbye','Good night','Hello / How are you'], ans: 'Goodbye' },
  ],
  yoruba: [
    { q: 'How do you say "Good morning" in Yoruba?', qFr: 'Comment dit-on "Bonjour" en yoruba ?',     opts: ['Bawo ni','E kaaro','E kaasan','Ẹ ku irole'],             ans: 'E kaaro' },
    { q: 'What does "Ese" mean in Yoruba?',          qFr: 'Que signifie « Ese » en yoruba ?',          opts: ['Hello / How are you','Goodbye','Thank you','Please'],   ans: 'Thank you' },
    { q: '"Omi" in Yoruba means?',                   qFr: '« Omi » en yoruba signifie ?',              opts: ['Food','Water','Fire','Wind'],                           ans: 'Water' },
    { q: 'What does "Bẹẹni" mean?',                  qFr: 'Que signifie « Bẹẹni » ?',                  opts: ['No','Yes','Maybe','Never'],                             ans: 'Yes' },
    { q: '"Ounjẹ" means?',                           qFr: '« Ounjẹ » signifie ?',                      opts: ['Water','House','Food','Money'],                         ans: 'Food' },
    { q: 'How do you say "one" in Yoruba?',          qFr: 'Comment dit-on "un" en yoruba ?',           opts: ['Èjì','Ọ̀kan','Ẹ̀ta','Ẹ̀rin'],                           ans: 'Ọ̀kan' },
    { q: 'What does "Aburo" mean?',                  qFr: 'Que signifie « Aburo » ?',                  opts: ['Mother','Younger sibling','Friend','Father'],           ans: 'Younger sibling' },
    { q: '"Ilé" in Yoruba means?',                   qFr: '« Ilé » en yoruba signifie ?',              opts: ['Road','Market','House/Home','School'],                  ans: 'House/Home' },
    { q: 'What does "Àánú" mean?',                   qFr: 'Que signifie « Àánú » ?',                   opts: ['Happiness','Anger','Love/Compassion','Sadness'],        ans: 'Love/Compassion' },
    { q: '"Ọjọ melo" asks about?',                   qFr: '« Ọjọ melo » pose une question sur ?',      opts: ['What color','How many days','Where to go','Who is it'], ans: 'How many days' },
  ],
  hausa: [
    { q: 'How do you say "Hello" in Hausa?',   qFr: 'Comment dit-on "Bonjour" en haoussa ?',   opts: ['Nagode','Sannu','Barka','Lafiya'],                          ans: 'Sannu' },
    { q: 'What does "Nagode" mean?',           qFr: 'Que signifie « Nagode » ?',               opts: ['Hello / How are you','Goodbye','Thank you','Please'],      ans: 'Thank you' },
    { q: '"Ruwa" in Hausa means?',             qFr: '« Ruwa » en haoussa signifie ?',          opts: ['Fire','Water','Food','Earth'],                             ans: 'Water' },
    { q: 'What does "Ɗaya" mean?',             qFr: 'Que signifie « Ɗaya » ?',                 opts: ['Two','Three','One','Four'],                                ans: 'One' },
    { q: '"Gida" means?',                      qFr: '« Gida » signifie ?',                     opts: ['School','Market','House/Home','Farm'],                     ans: 'House/Home' },
    { q: 'What does "Abinci" mean?',           qFr: 'Que signifie « Abinci » ?',               opts: ['Water','Food','Money','Clothes'],                          ans: 'Food' },
    { q: '"Yaro" means?',                      qFr: '« Yaro » signifie ?',                     opts: ['Girl','Boy','Elder','Baby'],                               ans: 'Boy' },
    { q: 'How do you say "Yes" in Hausa?',     qFr: 'Comment dit-on "Oui" en haoussa ?',       opts: ["A'a",'Haka ne','Kwai','Ee'],                               ans: 'Ee' },
    { q: 'What does "Aiki" mean?',             qFr: 'Que signifie « Aiki » ?',                 opts: ['Play','Work','Sleep','Eat'],                               ans: 'Work' },
    { q: '"Rana" in Hausa means?',             qFr: '« Rana » en haoussa signifie ?',          opts: ['Moon','Star','Sun/Day','Rain'],                            ans: 'Sun/Day' },
  ],
  igbo: [
    { q: 'How do you greet in Igbo?',          qFr: 'Comment salue-t-on en igbo ?',            opts: ['Ndewo','Daalu','Biko','Ọ dị mma'],                         ans: 'Ndewo' },
    { q: 'What does "Daalu" mean?',            qFr: 'Que signifie « Daalu » ?',                opts: ['Please','Thank you','Goodbye','Sorry'],                    ans: 'Thank you' },
    { q: '"Mmiri" in Igbo means?',             qFr: '« Mmiri » en igbo signifie ?',            opts: ['Food','Water','Fire','Earth'],                             ans: 'Water' },
    { q: 'What does "Ọ dị mma" mean?',         qFr: 'Que signifie « Ọ dị mma » ?',             opts: ['No problem / It is fine','I am angry','Goodbye','Help me'], ans: 'No problem / It is fine' },
    { q: 'What does "Nnę" mean?',              qFr: 'Que signifie « Nnę » ?',                  opts: ['Father','Mother','Sister','Grandmother'],                  ans: 'Mother' },
    { q: '"Otu" in Igbo means?',               qFr: '« Otu » en igbo signifie ?',              opts: ['One','Two','Friend','Road'],                               ans: 'One' },
    { q: 'What does "Ulo" mean?',              qFr: 'Que signifie « Ulo » ?',                  opts: ['Road','House','Market','Farm'],                            ans: 'House' },
    { q: '"Biko" means?',                      qFr: '« Biko » signifie ?',                     opts: ['Thank you','Please','Yes','No'],                           ans: 'Please' },
    { q: 'What does "Ụmụ" mean?',              qFr: 'Que signifie « Ụmụ » ?',                  opts: ['Elders','Children','Animals','Traders'],                   ans: 'Children' },
    { q: '"Ọrịa" means?',                      qFr: '« Ọrịa » signifie ?',                     opts: ['Market','Sickness','Joy','Journey'],                       ans: 'Sickness' },
  ],
  zulu: [
    { q: 'How do you say "Hello" in Zulu?',    qFr: 'Comment dit-on "Bonjour" en zoulou ?',    opts: ['Sawubona','Ngiyabonga','Hamba kahle','Yebo'],               ans: 'Sawubona' },
    { q: 'What does "Ngiyabonga" mean?',       qFr: 'Que signifie « Ngiyabonga » ?',           opts: ['Please','I love you','Thank you','Sorry'],                 ans: 'Thank you' },
    { q: '"Amanzi" means?',                    qFr: '« Amanzi » signifie ?',                   opts: ['Food','Fire','Water','Earth'],                             ans: 'Water' },
    { q: 'What does "Yebo" mean?',             qFr: 'Que signifie « Yebo » ?',                 opts: ['No','Yes','Maybe','Later'],                                ans: 'Yes' },
    { q: '"Ukudla" in Zulu means?',            qFr: '« Ukudla » en zoulou signifie ?',         opts: ['Water','Clothes','Food','Money'],                          ans: 'Food' },
    { q: 'What does "Hamba kahle" mean?',      qFr: 'Que signifie « Hamba kahle » ?',          opts: ['Good morning','Welcome','Go well / Goodbye','Hurry'],      ans: 'Go well / Goodbye' },
    { q: '"Umuntu" means?',                    qFr: '« Umuntu » signifie ?',                   opts: ['Animal','Person','Chief','Elder'],                         ans: 'Person' },
    { q: 'What does "Nkosi" mean?',            qFr: 'Que signifie « Nkosi » ?',               opts: ['Friend','Enemy','God/Lord/King','Teacher'],                ans: 'God/Lord/King' },
    { q: '"Umuzi" means?',                     qFr: '« Umuzi » signifie ?',                    opts: ['School','Market','Home/Homestead','River'],                ans: 'Home/Homestead' },
    { q: 'What does "Uxolo" mean?',            qFr: 'Que signifie « Uxolo » ?',               opts: ['Thank you','Sorry / Peace','Goodbye','Welcome'],           ans: 'Sorry / Peace' },
  ],
  amharic: [
    { q: 'How do you say "Hello" in Amharic?', qFr: 'Comment dit-on "Bonjour" en amharique ?', opts: ['Ameseginalehu','Selam','Betam','Gobez'],                    ans: 'Selam' },
    { q: 'What does "Ameseginalehu" mean?',    qFr: 'Que signifie « Ameseginalehu » ?',        opts: ['Hello / How are you','Goodbye','Thank you','Please'],      ans: 'Thank you' },
    { q: '"Wuha" means?',                      qFr: '« Wuha » signifie ?',                     opts: ['Food','Water','Fire','Earth'],                             ans: 'Water' },
    { q: 'What does "Awo" mean?',              qFr: 'Que signifie « Awo » ?',                  opts: ['No','Yes','Maybe','Good'],                                 ans: 'Yes' },
    { q: '"Migib" in Amharic means?',          qFr: '« Migib » en amharique signifie ?',       opts: ['Water','House','Food','School'],                           ans: 'Food' },
    { q: 'What does "Ishi" mean?',             qFr: 'Que signifie « Ishi » ?',                 opts: ['No','Never','OK / Alright','Goodbye'],                     ans: 'OK / Alright' },
    { q: '"Lij" means?',                       qFr: '« Lij » signifie ?',                      opts: ['Elder','Child','God/Lord/King','Friend'],                  ans: 'Child' },
    { q: 'What does "Betam" mean?',            qFr: 'Que signifie « Betam » ?',                opts: ['Little','Never','Very much','Always'],                     ans: 'Very much' },
    { q: '"Gobez" means?',                     qFr: '« Gobez » signifie ?',                    opts: ['Strong','Clever/Skilled','Rich','Tall'],                   ans: 'Clever/Skilled' },
    { q: 'What does "Lijoch" mean?',           qFr: 'Que signifie « Lijoch » ?',               opts: ['Elders','Children','Friends','Animals'],                   ans: 'Children' },
  ],
  arabic: [
    { q: 'How do you say "Hello" in Arabic?',  qFr: 'Comment dit-on "Bonjour" en arabe ?',     opts: ['Shukran','Ahlan wa sahlan',"Ma'a salama",'Aywa'],          ans: 'Ahlan wa sahlan' },
    { q: 'What does "Shukran" mean?',          qFr: 'Que signifie « Shukran » ?',              opts: ['Please','Goodbye','Thank you','Sorry'],                    ans: 'Thank you' },
    { q: '"Moya" in Arabic means?',            qFr: '« Moya » en arabe signifie ?',            opts: ['Fire','Earth','Water','Wind'],                             ans: 'Water' },
    { q: 'What does "Aywa" mean?',             qFr: 'Que signifie « Aywa » ?',                 opts: ['No','Yes','Maybe','Later'],                                ans: 'Yes' },
    { q: '"Akl" means?',                       qFr: '« Akl » signifie ?',                      opts: ['Water','Money','Food/Eating','House'],                     ans: 'Food/Eating' },
    { q: "What does \"Ma'a salama\" mean?",    qFr: "Que signifie « Ma'a salama » ?",           opts: ['Good morning','Welcome','Goodbye','Good night'],           ans: 'Goodbye' },
    { q: '"Wahid" in Arabic means?',           qFr: '« Wahid » en arabe signifie ?',           opts: ['Two','One','Three','Ten'],                                 ans: 'One' },
    { q: 'What does "Yalla" mean?',            qFr: 'Que signifie « Yalla » ?',                opts: ['Wait',"Let's go / Come on",'Stop','Look'],                 ans: "Let's go / Come on" },
    { q: '"Habibi" means?',                    qFr: '« Habibi » signifie ?',                   opts: ['Enemy','My love/dear','Teacher','Stranger'],               ans: 'My love/dear' },
    { q: 'What does "Inshallah" mean?',        qFr: 'Que signifie « Inshallah » ?',            opts: ['Never','God willing / Hopefully','I promise','Right now'], ans: 'God willing / Hopefully' },
  ],
};

// ── Social media SVG icons ────────────────────────────────────────────────────

function IconTikTok() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="#69C9D0"/>
      <path d="M34.1 14.5a8.7 8.7 0 01-5.4-5.5h-4.5v20.6a4.1 4.1 0 01-4.1 3.7 4.1 4.1 0 01-4.1-4.1 4.1 4.1 0 014.1-4.1c.4 0 .8.06 1.1.15V20.7a8.7 8.7 0 00-1.1-.07 8.7 8.7 0 00-8.7 8.7 8.7 8.7 0 008.7 8.7 8.7 8.7 0 008.7-8.7V19.6a13.4 13.4 0 007.8 2.5v-4.5a8.7 8.7 0 01-2.5-.6z" fill="white" opacity="0.55"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <img src="/instagrampng.jpg" width={28} height={28}
      style={{ borderRadius: 8, objectFit: 'cover', display: 'block', flexShrink: 0 }}
      alt="Instagram" />
  );
}

function IconFacebook() {
  return (
    <img src="/facebookimg.jpg" width={28} height={28}
      style={{ borderRadius: '50%', objectFit: 'cover', display: 'block', flexShrink: 0 }}
      alt="Facebook" />
  );
}

function IconFriend() {
  return (
    <div style={{ width: 28, height: 28, background: '#2a2a2a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <img src="/familyiconsimg.jpg" width={22} height={22}
        style={{ objectFit: 'contain', display: 'block', filter: 'invert(1)' }}
        alt="A Friend" />
    </div>
  );
}

function IconTwitterX() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M28.4 21.5L38.3 10h-2.4L27.4 20l-7.2-10H11l10.4 14.5L11 38h2.4l9.1-10.1 7.3 10.1H39L28.4 21.5zm-3.2 3.6l-1-1.5L14.3 12h3.6l6.9 9.5 1 1.5 9 12.5h-3.6l-5.9-8.4z" fill="white"/>
    </svg>
  );
}

function IconAppStore() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="asg" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22CCFF"/>
          <stop offset="1" stopColor="#0066FF"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#asg)"/>
      <line x1="24" y1="10" x2="11"  y2="37" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="24" y1="10" x2="37"  y2="37" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="15.5" y1="28" x2="32.5" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function IconOther() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#444"/>
      <circle cx="15" cy="24" r="3.5" fill="white"/>
      <circle cx="24" cy="24" r="3.5" fill="white"/>
      <circle cx="33" cy="24" r="3.5" fill="white"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#FF0000"/>
      <rect x="8" y="14" width="32" height="20" rx="5" fill="#FF0000" stroke="white" strokeWidth="2"/>
      <path d="M21 19l12 5-12 5V19z" fill="white"/>
    </svg>
  );
}

function IconGoogle() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="white"/>
      <path d="M43.6 24.5c0-1.4-.12-2.8-.35-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.7 6.1-14.7z" fill="#4285F4"/>
      <path d="M24 44c5.4 0 10-1.8 13.3-4.8l-6.5-5c-1.8 1.2-4.1 1.9-6.8 1.9-5.2 0-9.7-3.5-11.3-8.3H5v5.2C8.3 39.4 15.6 44 24 44z" fill="#34A853"/>
      <path d="M12.7 27.8a12 12 0 010-7.6V15H5A19.8 19.8 0 005 33l7.7-5.2z" fill="#FBBC05"/>
      <path d="M24 12.1c2.9 0 5.5 1 7.5 2.9l5.6-5.6C33.9 6.3 29.3 4.2 24 4.2c-8.4 0-15.7 4.6-19 11.4l7.7 5.2C14.3 15.6 18.8 12.1 24 12.1z" fill="#EA4335"/>
    </svg>
  );
}

const SOURCE_ICONS: Record<string, () => React.ReactElement> = {
  tiktok:    IconTikTok,
  instagram: IconInstagram,
  facebook:  IconFacebook,
  twitter:   IconTwitterX,
  friend:    IconFriend,
  appstore:  IconAppStore,
  youtube:   IconYouTube,
  google:    IconGoogle,
  other:     IconOther,
};

const LEVELS = [
  { id: 'zero',   label: "I'm brand new",          labelFr: 'Je suis débutant(e)',              bars: 0 },
  { id: 'some',   label: 'I know some words',       labelFr: 'Je connais quelques mots',         bars: 1 },
  { id: 'convo',  label: 'I can hold a convo',      labelFr: 'Je peux tenir une conversation',   bars: 2 },
  { id: 'fluent', label: "I'm lowkey fluent",        labelFr: "Je suis plutôt à l'aise",          bars: 3 },
  { id: 'native', label: "I'm basically a native",   labelFr: 'Je parle presque comme un natif',  bars: 4 },
];

const GOALS = [
  { id: 'roots',   label: 'Stay connected to roots', labelFr: 'Rester connecté à mes racines', emoji: '🌍' },
  { id: 'culture', label: 'Support my culture',       labelFr: 'Soutenir ma culture',            emoji: '✊' },
  { id: 'fun',     label: 'Just for fun',             labelFr: 'Juste pour le fun',              emoji: '😄' },
  { id: 'travel',  label: 'Travel',                   labelFr: 'Voyager',                        emoji: '✈️' },
  { id: 'career',  label: 'Career',                   labelFr: 'Carrière',                       emoji: '💼' },
  { id: 'fam',     label: 'Connect with fam',         labelFr: 'Se connecter avec la famille',   emoji: '👨‍👩‍👧‍👦' },
  { id: 'other',   label: 'Other',                    labelFr: 'Autre',                          emoji: '💡' },
];

const DAILY = [
  { id: '5',  label: '5 min',   subtitle: 'Chill',   subtitleFr: 'Tranquille' },
  { id: '10', label: '10 min',  subtitle: 'Regular', subtitleFr: 'Régulier'   },
  { id: '15', label: '15 min',  subtitle: 'Serious', subtitleFr: 'Sérieux'    },
  { id: '20', label: '20+ min', subtitle: 'Extreme', subtitleFr: 'Extrême'    },
];

const GREEN = '#4CAF50';
const RED   = '#b00020';
const BLACK = '#000000';
const DARK  = '#0d0d0d';
const FONT   = "'Roboto Condensed', sans-serif";
const TRENCH = "'Trench Slab', sans-serif";

const OB_BGS = [
  '/onboardingbg/onboarding1.png',
  '/onboardingbg/onboarding1A.png',
  '/onboardingbg/onboarding1C.png',
  '/onboardingbg/onboarding1E.png',
];
const cardBg = (s: number): React.CSSProperties => ({
  backgroundImage: `linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)), url(${OB_BGS[s % OB_BGS.length]})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundColor: DARK,
});

const TOTAL_Q = 11;

// ── Sub-components ────────────────────────────────────────────────────────────

function Wave() {
  return (
    <svg viewBox="0 0 390 28" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', flexShrink: 0, marginBottom: -1 }}>
      <path d="M0,14 Q65,0 130,14 Q195,28 260,14 Q325,0 390,14 L390,28 L0,28 Z" fill={RED} />
    </svg>
  );
}

function SignalBars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22, flexShrink: 0 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 5, height: 7 + i * 3, borderRadius: 2,
          background: i <= count ? GREEN : 'rgba(255,255,255,0.18)',
        }} />
      ))}
    </div>
  );
}

// ── Typing greeting component (Step 1) ───────────────────────────────────────

function TypingGreeting({ hiThere, mascotName, guide }: { hiThere: string; mascotName: string; guide: string }) {
  const fullText = hiThere + mascotName;
  const [phase, setPhase] = useState<'dots' | 'typing' | 'done'>('dots');
  const [displayed, setDisplayed] = useState('');
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('typing');
      let idx = 0;
      ivRef.current = setInterval(() => {
        idx++;
        setDisplayed(fullText.slice(0, idx));
        if (idx >= fullText.length) {
          clearInterval(ivRef.current!);
          setPhase('done');
        }
      }, 48);
    }, 1300);
    return () => {
      clearTimeout(t1);
      if (ivRef.current) clearInterval(ivRef.current);
    };
  }, [fullText]);

  if (phase === 'dots') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingTop: '0.8rem', minHeight: '2.2rem' }}>
        <div className="ob-dot-1" style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
        <div className="ob-dot-2" style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
        <div className="ob-dot-3" style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.5rem' }}>
      <p style={{ color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: '1.3rem', margin: 0, lineHeight: 1.3 }}>
        {displayed}
        {phase === 'typing' && (
          <span style={{ color: RED, display: 'inline-block', animation: 'ob-pulse 0.6s ease-in-out infinite', marginLeft: 1 }}>|</span>
        )}
      </p>
      {phase === 'done' && (
        <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: FONT, fontSize: '0.85rem', margin: 0, animation: 'ob-fadein 0.4s ease both' }}>
          {guide}
        </p>
      )}
    </div>
  );
}

// ── Step content loader: dots → assembled content ────────────────────────────

function StepContent({ top = false, style, children, stepKey }: {
  top?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  stepKey: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 660);
    return () => clearTimeout(t);
  }, [stepKey]);

  const cls = top ? 'ob-content-top' : 'ob-content';

  if (!visible) {
    return (
      <div className={cls} style={{ justifyContent: 'center', ...style }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="ob-dot-1" style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'inline-block' }} />
          <span className="ob-dot-2" style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'inline-block' }} />
          <span className="ob-dot-3" style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'inline-block' }} />
        </div>
      </div>
    );
  }

  return <div className={cls} style={style}>{children}</div>;
}

// ── Main component ────────────────────────────────────────────────────────────

interface OnboardingFlowProps {
  onSignIn: () => void;
  onComplete: (selectedLanguage: string, plan: 'plus' | 'free', placementScore: number) => void;
}

export function OnboardingFlow({ onSignIn, onComplete }: OnboardingFlowProps) {
  const [step, setStep]           = useState(0);
  const [animKey, setAnimKey]     = useState(0);
  const [iface, setIface]         = useState<'en' | 'fr'>('en');
  const [selectedLang, setSelectedLang]         = useState('');
  const [discovery, setDiscovery]               = useState('');
  const [level, setLevel]                       = useState('');
  const [goals, setGoals]                       = useState<string[]>([]);
  const [dailyGoal, setDailyGoal]               = useState('');
  const [selectedPlan, setSelectedPlan]         = useState<'plus' | 'free'>('free');
  const [placementQ, setPlacementQ]             = useState(0);
  const [placementAnswers, setPlacementAnswers] = useState<string[]>([]);

  const t = (key: keyof typeof UI['en']) => UI[iface][key];

  const toggleIface = () => {
    const next = iface === 'en' ? 'fr' : 'en';
    setIface(next);
    localStorage.setItem('afroslang_interface', next);
  };

  const go = useCallback((n: number) => {
    setStep(n);
    setAnimKey(k => k + 1);
  }, []);

  const next = useCallback(() => go(step + 1), [step, go]);

  useEffect(() => {
    if (step === 4) { const t2 = setTimeout(() => go(5), 2800); return () => clearTimeout(t2); }
    if (step === 7) { const t2 = setTimeout(() => go(8), 2200); return () => clearTimeout(t2); }
  }, [step, go]);

  const progress = step < 1 ? 0 : Math.min(100, Math.round((step / TOTAL_Q) * 100));

  const toggleGoal = (id: string) =>
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  const handlePlacementAnswer = (opt: string) => {
    const questions = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const newAnswers = [...placementAnswers, opt];
    setPlacementAnswers(newAnswers);
    if (placementQ + 1 >= questions.length) {
      go(13);
    } else {
      setPlacementQ(q => q + 1);
    }
  };

  const optDisplay = (opt: string) => iface === 'fr' ? (OPTION_FR[opt] ?? opt) : opt;

  // ── Shared CSS ──────────────────────────────────────────────────────────────

  const css = `
    @keyframes ob-fadein    { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes ob-bounce    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes ob-pulse     { 0%,100% { opacity:1; } 50% { opacity:0.45; } }
    @keyframes ob-barfill   { from { width:0; } to { width:72%; } }
    @keyframes ob-dot       { 0%,60%,100% { transform:translateY(0); opacity:0.4; } 30% { transform:translateY(-5px); opacity:1; } }
    @keyframes ob-assemble  {
      0%   { opacity:0; transform:translateY(-28px) scale(0.72) rotate(-6deg); filter:blur(5px); }
      55%  { filter:blur(0); }
      100% { opacity:1; transform:translateY(0) scale(1) rotate(0deg); }
    }
    @keyframes ob-assemble2 {
      0%   { opacity:0; transform:translateX(22px) scale(0.8) rotate(4deg); filter:blur(4px); }
      55%  { filter:blur(0); }
      100% { opacity:1; transform:translateX(0) scale(1) rotate(0deg); }
    }
    .ob-anim   { animation: ob-fadein 0.32s ease both; }
    .ob-dot-1  { animation: ob-dot 1.1s ease-in-out infinite; }
    .ob-dot-2  { animation: ob-dot 1.1s ease-in-out 0.18s infinite; }
    .ob-dot-3  { animation: ob-dot 1.1s ease-in-out 0.36s infinite; }
    .ob-text-h { animation: ob-assemble  0.55s cubic-bezier(0.22,1,0.36,1) both; }
    .ob-text-s { animation: ob-assemble2 0.5s  cubic-bezier(0.22,1,0.36,1) 0.12s both; }
    .ob-text-l { animation: ob-assemble  0.45s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
    .ob-card {
      width:100%; max-width:390px;
      height:100dvh;
      display:flex; flex-direction:column;
      background:${DARK}; position:relative; overflow:hidden;
      background-size:cover; background-position:center top;
    }
    .ob-progress { height:3px; background:rgba(255,255,255,0.08); flex-shrink:0; }
    .ob-progress-fill { height:100%; background:${RED}; transition:width 0.4s ease; }
    .ob-content {
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      padding:1.4rem 1.2rem; overflow-y:auto; gap:1.1rem;
    }
    .ob-content-top {
      flex:1; display:flex; flex-direction:column;
      align-items:center; justify-content:flex-start;
      padding:1.1rem 1.2rem 0; overflow-y:auto; gap:0.7rem;
    }
    .ob-bottom { background:${RED}; padding:1.2rem 1.2rem 2.2rem; display:flex; flex-direction:column; gap:0.7rem; flex-shrink:0; }
    .ob-btn-primary {
      background:${BLACK}; color:#fff; border:none; border-radius:30px;
      padding:1rem; font-size:0.97rem; font-weight:800; font-family:${FONT};
      cursor:pointer; width:100%; letter-spacing:0.6px; transition:opacity 0.15s;
    }
    .ob-btn-primary:disabled { opacity:0.45; cursor:not-allowed; }
    .ob-btn-primary:not(:disabled):active { opacity:0.8; }
    .ob-btn-outline {
      background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.7); border-radius:30px;
      padding:0.85rem; font-size:0.92rem; font-weight:700; font-family:${FONT};
      cursor:pointer; width:100%; letter-spacing:0.5px;
    }
    .ob-row-btn {
      background:rgba(0,0,0,0.32); backdrop-filter:blur(8px);
      border:1.5px solid rgba(255,255,255,0.18); border-radius:13px;
      padding:0.75rem 0.9rem; display:flex; align-items:center; gap:0.7rem;
      cursor:pointer; width:100%; font-family:${FONT}; font-weight:700;
      transition:border-color 0.15s, background 0.15s; text-align:left;
    }
    .ob-row-btn:hover { border-color:rgba(255,255,255,0.42); background:rgba(0,0,0,0.48); }
    .ob-row-btn.sel   { border-color:${GREEN}; background:rgba(76,175,80,0.18); }
    .ob-row-btn-plain { border-color:rgba(255,255,255,0.12) !important; background:rgba(0,0,0,0.28) !important; }
    .ob-row-btn-plain:active { background:rgba(176,0,32,0.18) !important; border-color:${RED} !important; }
    .ob-check { width:20px; height:20px; border-radius:6px; border:2px solid rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.15s, border-color 0.15s; }
    .ob-check.on { background:${GREEN}; border-color:${GREEN}; }
    .ob-bubble { display:flex; align-items:center; gap:6px; padding:0.5rem 0; }
    .ob-bubble-speech {
      background:none; border:none; padding:0.25rem 0;
      color:#fff; font-family:${FONT}; font-size:1.05rem; font-weight:900;
      text-align:center; max-width:270px; line-height:1.45;
      text-shadow: 0 1px 0 rgba(0,0,0,0.95), 0 2px 5px rgba(0,0,0,0.8), 0 5px 14px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3);
    }
    .ob-mascot { width:90px; height:90px; object-fit:contain; filter:drop-shadow(0 4px 18px rgba(176,0,32,0.45)); }
    .ob-heading {
      color:#fff; font-family:${FONT}; font-weight:800; font-size:1.25rem;
      text-align:center; line-height:1.2; margin:0;
      text-shadow: 0 1px 0 rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.8), 0 5px 16px rgba(0,0,0,0.55), 0 0 32px rgba(0,0,0,0.3);
    }
    .ob-sub {
      color:rgba(255,255,255,0.75); font-family:${FONT}; font-size:0.85rem;
      text-align:center; line-height:1.5; margin:0;
      text-shadow: 0 1px 0 rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.65), 0 4px 14px rgba(0,0,0,0.4);
    }
    .ob-lang-toggle {
      position:absolute; top:12px; right:12px; z-index:10;
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
      border-radius:20px; padding:0.35rem 0.75rem;
      color:rgba(255,255,255,0.75); font-family:${FONT}; font-size:0.72rem;
      font-weight:700; cursor:pointer; letter-spacing:0.3px;
      transition:background 0.15s, border-color 0.15s;
    }
    .ob-lang-toggle:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.3); }
  `;

  const ProgressBar = () => (
    <div className="ob-progress">
      <div className="ob-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );

  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{css}</style>
      {children}
    </div>
  );

  // ── STEP 0: Welcome ─────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <Overlay>
        <div className="ob-card" style={{ position: 'relative', ...cardBg(step) }}>
          <button className="ob-lang-toggle" onClick={toggleIface}>{t('langToggle')}</button>
          <StepContent stepKey={0} style={{ gap: '1.2rem', padding: '2rem 1.5rem' }}>
            <img src="/Afroslang.png" alt="Afroslang" className="ob-mascot"
              style={{ width: 100, height: 100, animation: 'ob-bounce 2.4s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p className="ob-text-h" style={{ color: '#fff', fontFamily: TRENCH, fontWeight: 700, fontSize: '2.4rem', margin: '0 0 0.3rem', letterSpacing: 2, textShadow: '0 1px 0 rgba(0,0,0,0.95), 0 3px 8px rgba(0,0,0,0.7), 0 6px 20px rgba(0,0,0,0.4)' }}>
                Afro<span style={{ color: RED }}>slang</span>
              </p>
              <p className="ob-text-s ob-sub" style={{ margin: 0, letterSpacing: 0.5 }}>
                {t('tagline')}
              </p>
            </div>
            <div className="ob-text-l" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {['🇳🇬','🇰🇪','🇿🇦','🇪🇹','🌍'].map((f, i) => (
                <span key={i} style={{ fontSize: '1.3em', opacity: 0.7 + i * 0.06 }}>{f}</span>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div style={{ background: RED, padding: '1.4rem 1.25rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', margin: 0, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.75 }}>
              {t('newUser')}
            </p>
            <button className="ob-btn-primary" onClick={() => go(1)}>{t('getStarted')}</button>
            <button className="ob-btn-outline" onClick={onSignIn}>{t('signIn')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 1: Mascot intro ────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          {/* Top-left mascot + typing greeting */}
          <div style={{ padding: '1.5rem 1.4rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }} className="ob-anim">
            <img
              src="/Afroslang.png"
              alt="Afro"
              style={{
                width: 68, height: 68, objectFit: 'contain', flexShrink: 0,
                animation: 'ob-bounce 1.8s ease-in-out infinite',
                filter: 'drop-shadow(0 4px 18px rgba(176,0,32,0.45))',
              }}
            />
            <TypingGreeting hiThere={t('hiThere')} mascotName={t('mascotName')} guide={t('guide')} />
          </div>
          {/* Spacer so background fills the middle */}
          <div style={{ flex: 1 }} />
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 2: Questions intro (chat layout) ───────────────────────────────────
  if (step === 2) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ alignItems: 'flex-start', justifyContent: 'center', gap: '1.6rem', padding: '2rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
              <img src="/Afroslang.png" alt="Afro" style={{
                width: 44, height: 44, borderRadius: '50%', objectFit: 'contain',
                border: '2px solid rgba(176,0,32,0.5)', flexShrink: 0,
                filter: 'drop-shadow(0 2px 8px rgba(176,0,32,0.35))',
              }} />
            </div>
            <div>
              <p className="ob-heading ob-text-h" style={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: 1.2 }}>
                {t('questionsHeading')}
              </p>
              <p className="ob-sub ob-text-s" style={{ textAlign: 'left', marginTop: '0.55rem' }}>
                {t('questionsSub')}
              </p>
            </div>
            <div className="ob-text-l" style={{ display: 'flex', gap: '0.45em' }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ width: 30, height: 7, borderRadius: 4, background: 'rgba(176,0,32,0.2)', border: '1px solid rgba(176,0,32,0.4)' }} />
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>{t('letsGo')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 3: Language select ─────────────────────────────────────────────────
  if (step === 3) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent top stepKey={animKey} style={{ paddingTop: '1.25rem' }}>
            <p className="ob-heading ob-text-h" style={{ width: '100%', marginBottom: '0.4rem' }}>{t('whatLearn')}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LANGUAGES.map(lang => (
                <button key={lang.id}
                  className={`ob-row-btn${selectedLang === lang.id ? ' sel' : ''}`}
                  onClick={() => setSelectedLang(lang.id)}>
                  <span style={{ fontSize: '1.55em', minWidth: 28, textAlign: 'center' }}>{lang.flag}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.94em' }}>{lang.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.38)', margin: 0, fontSize: '0.73em' }}>
                      {iface === 'fr' ? lang.regionFr : lang.region}
                    </p>
                  </div>
                  {selectedLang === lang.id && <span style={{ color: GREEN, fontSize: '1em', fontWeight: 900 }}>✓</span>}
                </button>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!selectedLang} onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 4: Course building (auto-advance 2.8s) ─────────────────────────────
  if (step === 4) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ gap: '1.6rem' }}>
            <img src="/Afroslang.png" alt="Building" className="ob-mascot"
              style={{ animation: 'ob-bounce 0.75s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p className="ob-heading ob-text-h" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{t('courseBuilding')}</p>
              <p className="ob-sub ob-text-s">{t('joinFriends')}</p>
            </div>
            <div className="ob-text-l" style={{ width: '100%', background: 'rgba(255,255,255,0.07)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: RED, borderRadius: 8, animation: 'ob-barfill 2.5s ease-out both' }} />
            </div>
          </StepContent>
          <Wave />
          <div style={{ background: RED, padding: '1.1rem 1.2rem 1.9rem' }}>
            <p style={{ color: '#fff', fontWeight: 700, textAlign: 'center', fontFamily: FONT, margin: 0, fontSize: '0.88rem', animation: 'ob-pulse 1.1s ease-in-out infinite' }}>
              {t('personalizing')}
            </p>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 5: Discovery source ────────────────────────────────────────────────
  if (step === 5) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent top stepKey={animKey} style={{ paddingTop: '1.25rem' }}>
            <p className="ob-heading ob-text-h" style={{ width: '100%', marginBottom: '0.35rem' }}>{t('howHeard')}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SOURCES.map(src => (
                <button key={src.id}
                  className={`ob-row-btn${discovery === src.id ? ' sel' : ''}`}
                  onClick={() => setDiscovery(src.id)}>
                  <span style={{ minWidth: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {SOURCE_ICONS[src.id]?.()}
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92em' }}>
                    {iface === 'fr' ? src.labelFr : src.label}
                  </span>
                  {discovery === src.id && <span style={{ color: GREEN, marginLeft: 'auto', fontWeight: 900 }}>✓</span>}
                </button>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!discovery} onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 6: Level check ─────────────────────────────────────────────────────
  if (step === 6) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ justifyContent: 'flex-start', paddingTop: '1.5rem', gap: '0.9rem' }}>
            <p className="ob-heading ob-text-h" style={{ width: '100%' }}>{t('howMuchSlang')}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {LEVELS.map(lvl => (
                <button key={lvl.id}
                  className={`ob-row-btn${level === lvl.id ? ' sel' : ''}`}
                  onClick={() => setLevel(lvl.id)}>
                  <SignalBars count={lvl.bars} />
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92em', flex: 1 }}>
                    {iface === 'fr' ? lvl.labelFr : lvl.label}
                  </span>
                  {level === lvl.id && <span style={{ color: GREEN, fontWeight: 900 }}>✓</span>}
                </button>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!level} onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 7: Affirm (auto-advance 2.2s) ─────────────────────────────────────
  if (step === 7) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ gap: '1.5rem' }}>
            <img src="/Afroslang.png" alt="Excited" className="ob-mascot"
              style={{ width: 110, height: 110, animation: 'ob-bounce 0.65s ease-in-out infinite' }} />
            <p className="ob-bubble-speech ob-text-h" style={{ fontSize: '1.05rem' }}>
              {t('affirm')}
            </p>
            <p className="ob-sub ob-text-s" style={{ animation: 'ob-pulse 1.4s ease-in-out infinite' }}>
              {t('settingUp')}
            </p>
          </StepContent>
          <Wave />
          <div style={{ background: RED, padding: '1.1rem 1.2rem 1.9rem' }}>
            <button className="ob-btn-primary" onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 8: Learning goal ───────────────────────────────────────────────────
  if (step === 8) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent top stepKey={animKey} style={{ paddingTop: '1.1rem' }}>
            <p className="ob-heading ob-text-h" style={{ width: '100%' }}>{t('whyLearning')}</p>
            <p className="ob-sub ob-text-s" style={{ width: '100%', textAlign: 'left', marginBottom: '0.1rem' }}>{t('selectAll')}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.48rem' }}>
              {GOALS.map(g => (
                <button key={g.id}
                  className={`ob-row-btn${goals.includes(g.id) ? ' sel' : ''}`}
                  onClick={() => toggleGoal(g.id)}>
                  <span style={{ fontSize: '1.2em', minWidth: 26, textAlign: 'center' }}>{g.emoji}</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9em', flex: 1 }}>
                    {iface === 'fr' ? g.labelFr : g.label}
                  </span>
                  <div className={`ob-check${goals.includes(g.id) ? ' on' : ''}`}>
                    {goals.includes(g.id) && <span style={{ color: '#fff', fontSize: '0.68em', fontWeight: 900, lineHeight: 1 }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={goals.length === 0} onClick={next}>{t('continue')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 9: Routine setup ───────────────────────────────────────────────────
  if (step === 9) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ gap: '1.4rem' }}>
            <div style={{ fontSize: '3.4em', animation: 'ob-bounce 1.7s ease-in-out infinite' }}>⏰</div>
            <p className="ob-heading ob-text-h">{t('routineTitle')}</p>
            <p className="ob-sub ob-text-s" style={{ maxWidth: 275 }}>{t('routineSub')}</p>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={next}>{t('soundsGood')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 10: Daily goal ─────────────────────────────────────────────────────
  if (step === 10) {
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ justifyContent: 'flex-start', paddingTop: '1.5rem', gap: '0.9rem' }}>
            <p className="ob-heading ob-text-h" style={{ width: '100%' }}>{t('dailyGoalQ')}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {DAILY.map(d => (
                <button key={d.id}
                  className={`ob-row-btn${dailyGoal === d.id ? ' sel' : ''}`}
                  onClick={() => setDailyGoal(d.id)}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.94em' }}>{d.label}</p>
                    <p style={{ color: 'rgba(255,255,255,0.38)', margin: 0, fontSize: '0.73em' }}>
                      {iface === 'fr' ? d.subtitleFr : d.subtitle}
                    </p>
                  </div>
                  {dailyGoal === d.id && <span style={{ color: GREEN, fontWeight: 900 }}>✓</span>}
                </button>
              ))}
            </div>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" disabled={!dailyGoal} onClick={next}>{t('lockedIn')}</button>
          </div>
        </div>
      </Overlay>
    );
  }

  // ── STEP 11: Plan select ────────────────────────────────────────────────────
  if (step === 11) {
    const startPlan = (plan: 'plus' | 'free') => {
      setSelectedPlan(plan);
      setPlacementQ(0);
      setPlacementAnswers([]);
      go(12);
    };
    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ gap: '1.2rem' }}>
            <p className="ob-heading ob-text-h" style={{ fontSize: '1.2rem' }}>{t('howStart')}</p>

            <div style={{
              width: '100%', background: 'linear-gradient(145deg,#071407,#0d200d)',
              border: `2px solid ${GREEN}`, borderRadius: 18, padding: '1.25rem',
              position: 'relative', cursor: 'pointer',
            }} onClick={() => startPlan('plus')}>
              <div style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                background: GREEN, color: BLACK, fontWeight: 900, fontSize: '0.68em',
                padding: '0.28em 0.9em', borderRadius: 20, letterSpacing: 1,
                fontFamily: FONT, whiteSpace: 'nowrap', textTransform: 'uppercase',
              }}>
                {t('recommended')}
              </div>
              <p style={{ color: GREEN, fontWeight: 700, fontSize: '1.2rem', margin: '0.5rem 0 0.2rem', fontFamily: TRENCH, letterSpacing: 1 }}>
                AfroPlus ⚡
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8em', margin: '0 0 0.9rem', fontFamily: FONT }}>
                {t('plusTagline')}
              </p>
              <button className="ob-btn-primary" style={{ background: GREEN, color: BLACK, padding: '0.8em' }}>
                {t('startPlus')}
              </button>
            </div>

            <div style={{
              width: '100%', background: '#181818', border: '1.5px solid #2a2a2a',
              borderRadius: 18, padding: '1.1rem', cursor: 'pointer',
            }} onClick={() => startPlan('free')}>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.97rem', margin: '0 0 0.2rem', fontFamily: FONT }}>
                {t('learnFree')}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78em', margin: '0 0 0.8rem', fontFamily: FONT }}>
                {t('freeTagline')}
              </p>
              <button className="ob-btn-outline" style={{ borderColor: '#333', color: 'rgba(255,255,255,0.55)', padding: '0.65em' }}>
                {t('continueFree')}
              </button>
            </div>
          </StepContent>
          <div style={{ height: '1.5rem', background: DARK, flexShrink: 0 }} />
        </div>
      </Overlay>
    );
  }

  // ── STEP 12: Placement test ─────────────────────────────────────────────────
  if (step === 12) {
    const questions = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const currentQ  = questions[placementQ];
    if (!currentQ) { go(13); return null; }
    const qProgress = Math.round((placementQ / questions.length) * 100);

    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent top stepKey={animKey} style={{ paddingTop: '1.3rem', gap: '1rem' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: FONT, fontSize: '0.78rem', margin: 0 }}>
                {t('placementLabel')}
              </p>
              <p style={{ color: RED, fontFamily: FONT, fontSize: '0.78rem', margin: 0, fontWeight: 700 }}>
                {placementQ + 1} / {questions.length}
              </p>
            </div>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
              <div style={{ height: '100%', background: RED, borderRadius: 4, width: `${qProgress}%`, transition: 'width 0.3s' }} />
            </div>

            <div key={`pq-${placementQ}`} className="ob-anim" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p className="ob-heading ob-text-h" style={{ textAlign: 'left', fontSize: '1.05rem', lineHeight: 1.35 }}>
                {iface === 'fr' ? currentQ.qFr : currentQ.q}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentQ.opts.map(opt => (
                  <button key={opt}
                    className="ob-row-btn ob-row-btn-plain"
                    onClick={() => handlePlacementAnswer(opt)}
                    style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9em' }}>{optDisplay(opt)}</span>
                  </button>
                ))}
              </div>
            </div>
          </StepContent>
          <div style={{ height: '1rem', flexShrink: 0 }} />
        </div>
      </Overlay>
    );
  }

  // ── STEP 13: Results + account creation ────────────────────────────────────
  if (step === 13) {
    const questions   = PLACEMENT_QUESTIONS[selectedLang] ?? [];
    const score       = placementAnswers.filter((a, i) => a === questions[i]?.ans).length;
    const total       = questions.length;
    const scoreFrac   = total > 0 ? score / total : 0;
    const pct         = Math.round(scoreFrac * 100);
    // Map score to starting stage (only 70%+ gets placed ahead)
    const startStage  = scoreFrac >= 1.0 ? 5 : scoreFrac >= 0.90 ? 4 : scoreFrac >= 0.80 ? 3 : scoreFrac >= 0.70 ? 2 : 1;
    const stageLabel  = startStage === 1 ? t('beginner') : startStage <= 3 ? t('intermediate') : t('advanced');
    const msg         = startStage >= 4 ? t('affirmAdv') : startStage >= 2 ? t('affirmMid') : t('affirmBeg');

    return (
      <Overlay>
        <div className="ob-card" key={animKey} style={cardBg(step)}>
          <ProgressBar />
          <StepContent stepKey={animKey} style={{ gap: '1.3rem' }}>
            <img src="/Afroslang.png" alt="Mascot" className="ob-mascot"
              style={{ width: 100, height: 100, animation: 'ob-bounce 1.8s ease-in-out infinite' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: RED, fontWeight: 900, fontSize: '2.5rem', fontFamily: FONT, margin: 0, lineHeight: 1 }} className="ob-text-h">
                {pct}%
              </p>
              <p className="ob-heading ob-text-h" style={{ marginTop: '0.3rem', fontSize: '1.1rem' }}>{msg}</p>
              <p className="ob-sub ob-text-s" style={{ marginTop: '0.35rem' }}>
                {t('startAt')}{' '}<strong style={{ color: '#fff' }}>
                  {iface === 'fr' ? `Étape ${startStage}` : `Stage ${startStage}`}
                </strong>{' — '}<span style={{ opacity: 0.75 }}>{stageLabel}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 230 }} className="ob-text-l">
              {questions.map((q, i) => (
                <div key={i} style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: placementAnswers[i] === q.ans ? GREEN : '#e53935',
                  flexShrink: 0,
                }} />
              ))}
            </div>
            <p className="ob-sub ob-text-s" style={{ fontSize: '0.8em', maxWidth: 260 }}>{t('saveProg')}</p>
          </StepContent>
          <Wave />
          <div className="ob-bottom">
            <button className="ob-btn-primary" onClick={() => onComplete(selectedLang, selectedPlan, scoreFrac)}>
              {t('createAccount')}
            </button>
            {selectedPlan === 'plus' && (
              <p style={{ color: '#fff', fontFamily: FONT, fontSize: '0.74em', textAlign: 'center', margin: 0, opacity: 0.8 }}>
                {t('afroplusHint')}
              </p>
            )}
          </div>
        </div>
      </Overlay>
    );
  }

  return null;
}
