export interface CulturalFact {
  text: string;
  textFr: string;
  emoji: string;
}

// Languages where rain bg is shown (tropical / high-rainfall regions)
export const RAIN_LANGUAGES = new Set([
  'igbo', 'yoruba', 'hausa', 'twi', 'lingala',
  'swahili', 'chichewa', 'zulu', 'shona', 'wolof',
]);

export const culturalFacts: Record<string, CulturalFact[]> = {
  igbo: [
    {
      text: "In Nigeria, when the first heavy rain of April hits the hot red earth, it releases a smell so deep and earthy it feels like the land exhaling. Children pour outside — not because they had to, but because the rain called them.",
      textFr: "Au Nigeria, quand la première forte pluie d'avril touche la terre rouge brûlante, elle libère une odeur si profonde que la terre semble souffler. Les enfants sortent en courant — pas par obligation, mais parce que la pluie les appelle.",
      emoji: '🌧️',
    },
    {
      text: "'Onye wetara oji wetara ndu' — he who brings kola nut brings life. Every Igbo gathering begins with this ceremony, connecting the living to their ancestors.",
      textFr: "'Onye wetara oji wetara ndu' — celui qui apporte la noix de kola apporte la vie. Chaque rassemblement igbo commence par cette cérémonie.",
      emoji: '🌿',
    },
  ],
  yoruba: [
    {
      text: "Sango, the Yoruba god of thunder, is said to walk through the skies of Nigeria during the rainy season. When lightning strikes, elders say 'Kabiyesi!' — all hail the king.",
      textFr: "Sango, le dieu yoruba du tonnerre, parcourt les cieux du Nigeria pendant la saison des pluies. Quand la foudre frappe, les anciens disent 'Kabiyesi !' — vive le roi.",
      emoji: '⚡',
    },
    {
      text: "In Lagos and Ibadan, mango trees line every street. The first heavy rain shakes the branches and children scramble barefoot to collect them — this is freedom.",
      textFr: "À Lagos et Ibadan, les manguiers bordent chaque rue. La première pluie secoue les branches et les enfants pieds nus se précipitent pour les ramasser — c'est la liberté.",
      emoji: '🥭',
    },
  ],
  hausa: [
    {
      text: "Hausa poets call the smell of rain hitting dry earth 'turaren kasa' — the perfume of the land. In Kano, people step outside just to breathe it in.",
      textFr: "Les poètes haoussa appellent l'odeur de la pluie sur la terre sèche 'turaren kasa' — le parfum de la terre. À Kano, les gens sortent juste pour le respirer.",
      emoji: '🌧️',
    },
    {
      text: "'Ruwa' means both rain and water in Hausa — a single word for life itself. In the Sahel, rain is not weather. It is a promise kept.",
      textFr: "'Ruwa' signifie à la fois pluie et eau en haoussa — un seul mot pour la vie. Dans le Sahel, la pluie n'est pas de la météo. C'est une promesse tenue.",
      emoji: '💧',
    },
  ],
  swahili: [
    {
      text: "The Swahili coast has two rainy seasons — 'masika' (long rains, March–May) and 'vuli' (short rains, Oct–Nov). In Mombasa and Zanzibar, the rains bring music: rooftop drumming and the smell of coconut rice cooking.",
      textFr: "La côte swahilie a deux saisons des pluies — 'masika' et 'vuli'. À Mombasa et Zanzibar, les pluies apportent de la musique : des tambours sur les toits et l'odeur du riz à la noix de coco.",
      emoji: '🌊',
    },
    {
      text: "'Haraka haraka haina baraka' — hurry hurry has no blessing. Swahili wisdom teaches that patience, like the long rains, arrives in its own time.",
      textFr: "'Haraka haraka haina baraka' — la précipitation n'apporte pas de bénédiction. La sagesse swahilie enseigne que la patience, comme les grandes pluies, arrive en son temps.",
      emoji: '🕊️',
    },
  ],
  twi: [
    {
      text: "In Ghana, the sound of rain on a tin roof is the original lullaby. Grandmothers tell stories by lamplight while the rain keeps time outside.",
      textFr: "Au Ghana, le son de la pluie sur un toit en tôle est la berceuse originale. Les grands-mères racontent des histoires à la lumière d'une lampe pendant que la pluie rythme l'extérieur.",
      emoji: '🌧️',
    },
    {
      text: "'Obra ye brafoo' — life is like a stream, always moving. The Akan people see rivers as living ancestors. When the rains come, the rivers remember.",
      textFr: "'Obra ye brafoo' — la vie est comme un ruisseau, toujours en mouvement. Le peuple Akan voit les rivières comme des ancêtres vivants.",
      emoji: '🌿',
    },
  ],
  zulu: [
    {
      text: "In KwaZulu-Natal, summer storms build fast over the Drakensberg mountains. The Zulu say 'Imvula yeza' — the rain is coming — and everyone stops to watch the sky turn purple.",
      textFr: "Au KwaZulu-Natal, les orages d'été se forment rapidement au-dessus des monts Drakensberg. Les Zoulous disent 'Imvula yeza' — la pluie arrive — et tout le monde s'arrête pour regarder le ciel virer au violet.",
      emoji: '⛈️',
    },
  ],
  shona: [
    {
      text: "In Zimbabwe, the first spring rains of October are called 'mvura yekutanga' — the first water. Families plant maize seeds within hours, following a tradition thousands of years old.",
      textFr: "Au Zimbabwe, les premières pluies de printemps d'octobre sont appelées 'mvura yekutanga' — la première eau. Les familles plantent des graines de maïs en quelques heures.",
      emoji: '🌱',
    },
  ],
  chichewa: [
    {
      text: "In Malawi, Lake Malawi — called 'the Calendar Lake' — fills the horizon like a sea. The rainy season is called 'nyengo yambewu' — the season of seeds, of planting hope.",
      textFr: "Au Malawi, le lac Malawi — appelé 'le lac Calendrier' — remplit l'horizon comme une mer. La saison des pluies s'appelle 'nyengo yambewu' — la saison des semences.",
      emoji: '🌊',
    },
  ],
  lingala: [
    {
      text: "The Congo Basin is the second-largest rainforest on earth. In Kinshasa, rain falls on average 190 days a year — the forest breathes rain, and the city breathes with it.",
      textFr: "Le bassin du Congo est la deuxième plus grande forêt tropicale de la Terre. À Kinshasa, il pleut en moyenne 190 jours par an — la forêt respire la pluie.",
      emoji: '🌴',
    },
  ],
  wolof: [
    {
      text: "In Dakar, the 'hivernage' rainy season transforms the dry Sahel into green. Wolof fishermen read the skies to know when the rains will come — they have been doing this for centuries.",
      textFr: "À Dakar, la saison des pluies 'hivernage' transforme le Sahel sec en vert. Les pêcheurs wolofs lisent le ciel pour savoir quand les pluies arriveront.",
      emoji: '⛵',
    },
  ],
  arabic: [
    {
      text: "In North African deserts, rain is so rare it has sacred names. The Moroccan Amazigh word for rain — 'aghanim' — is whispered like a prayer.",
      textFr: "Dans les déserts d'Afrique du Nord, la pluie est si rare qu'elle porte des noms sacrés. Le mot amazigh marocain pour pluie — 'aghanim' — se murmure comme une prière.",
      emoji: '🌵',
    },
  ],
  berber: [
    {
      text: "The Amazigh people of the Atlas Mountains have herded sheep in the same high valleys for 3,000 years. When snow melts in spring, the rivers run green — the only 'rain' most know for months.",
      textFr: "Le peuple Amazigh des montagnes de l'Atlas élève des moutons dans les mêmes hautes vallées depuis 3 000 ans. Quand la neige fond au printemps, les rivières coulent vert.",
      emoji: '🏔️',
    },
  ],
  somali: [
    {
      text: "Somalia's 'Deyr' rains (October–November) are brief, intense, and life-giving. Nomadic families track the rains across thousands of kilometers, following the green.",
      textFr: "Les pluies 'Deyr' de Somalie (octobre–novembre) sont brèves, intenses et vitales. Les familles nomades suivent les pluies sur des milliers de kilomètres, suivant le vert.",
      emoji: '🐫',
    },
  ],
  amharic: [
    {
      text: "Ethiopia's highlands receive 'kiremt' rains from June to September. Addis Ababa sits at 2,400m — when clouds roll in off the mountains, the city vanishes in green mist.",
      textFr: "Les hautes terres d'Éthiopie reçoivent les pluies 'kiremt' de juin à septembre. Addis-Abeba est à 2 400 m — quand les nuages arrivent des montagnes, la ville disparaît dans un brouillard vert.",
      emoji: '🏔️',
    },
  ],
  moore: [
    {
      text: "In Burkina Faso, the rains arrive in June after months of harmattan dust. Mossi farmers call the first rain 'kibse' — the blessing. Children run to the courtyard and wash their faces in the first drops.",
      textFr: "Au Burkina Faso, les pluies arrivent en juin après des mois de poussière d'harmattan. Les agriculteurs Mossi appellent la première pluie 'kibse' — la bénédiction.",
      emoji: '🌧️',
    },
  ],
};

export function getRandomFact(languageId: string, isEnglish: boolean): string {
  const facts = culturalFacts[languageId];
  if (!facts || facts.length === 0) return '';
  const fact = facts[Math.floor(Math.random() * facts.length)];
  return isEnglish ? fact.text : fact.textFr;
}

export function getFactEmoji(languageId: string): string {
  const facts = culturalFacts[languageId];
  if (!facts || facts.length === 0) return '🌍';
  return facts[0].emoji;
}
