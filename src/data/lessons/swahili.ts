import { Lesson } from '../../types';

export const swahiliLessons: Lesson[] = [
  // VOCABULARY LESSONS (40 questions)
  {
    id: 'sw-vocab-1',
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Swahili?',
        questionFr: 'Comment dit-on "Bonjour" en Swahili?',
        correctAnswer: 'Jambo',
        options: ['Jambo', 'Habari', 'Asante', 'Kwaheri']
      },
      {
        id: 'sw-v2',
        type: 'multiple-choice',
        question: 'What does "Asante" mean?',
        questionFr: 'Que signifie "Asante"?',
        correctAnswer: 'Thank you',
        options: ['Hello', 'Thank you', 'Goodbye', 'Please']
      },
      {
        id: 'sw-v3',
        type: 'type-answer',
        question: 'Type the Swahili word for "Goodbye"',
        questionFr: 'Tapez le mot Swahili pour "Au revoir"',
        correctAnswer: 'Kwaheri'
      },
      {
        id: 'sw-v4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Swahili?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Swahili?',
        correctAnswer: 'Habari za asubuhi',
        options: ['Habari za asubuhi', 'Habari za jioni', 'Usiku mwema', 'Asante sana']
      },
      {
        id: 'sw-v5',
        type: 'multiple-choice',
        question: '"Karibu" means:',
        questionFr: '"Karibu" signifie:',
        correctAnswer: 'Welcome',
        options: ['Goodbye', 'Welcome', 'Sorry', 'Excuse me']
      }
    ]
  },
  {
    id: 'sw-vocab-2',
    type: 'vocabulary',
    title: 'Numbers 1-10',
    titleFr: 'Numéros 1-10',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v6',
        type: 'multiple-choice',
        question: 'What is "One" in Swahili?',
        questionFr: 'Comment dit-on "Un" en Swahili?',
        correctAnswer: 'Moja',
        options: ['Moja', 'Mbili', 'Tatu', 'Nne']
      },
      {
        id: 'sw-v7',
        type: 'type-answer',
        question: 'Type the number "Five" in Swahili',
        questionFr: 'Tapez le nombre "Cinq" en Swahili',
        correctAnswer: 'Tano'
      },
      {
        id: 'sw-v8',
        type: 'multiple-choice',
        question: '"Kumi" means:',
        questionFr: '"Kumi" signifie:',
        correctAnswer: 'Ten',
        options: ['Five', 'Eight', 'Ten', 'Seven']
      },
      {
        id: 'sw-v9',
        type: 'multiple-choice',
        question: 'What is "Three" in Swahili?',
        questionFr: 'Comment dit-on "Trois" en Swahili?',
        correctAnswer: 'Tatu',
        options: ['Mbili', 'Tatu', 'Nne', 'Tano']
      },
      {
        id: 'sw-v10',
        type: 'type-answer',
        question: 'Type "Seven" in Swahili',
        questionFr: 'Tapez "Sept" en Swahili',
        correctAnswer: 'Saba'
      }
    ]
  },
  {
    id: 'sw-vocab-3',
    type: 'vocabulary',
    title: 'Family Members',
    titleFr: 'Membres de la famille',
    level: 2,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v11',
        type: 'multiple-choice',
        question: 'What is "Mother" in Swahili?',
        questionFr: 'Comment dit-on "Mère" en Swahili?',
        correctAnswer: 'Mama',
        options: ['Mama', 'Baba', 'Dada', 'Kaka']
      },
      {
        id: 'sw-v12',
        type: 'multiple-choice',
        question: '"Baba" means:',
        questionFr: '"Baba" signifie:',
        correctAnswer: 'Father',
        options: ['Mother', 'Father', 'Sister', 'Brother']
      },
      {
        id: 'sw-v13',
        type: 'type-answer',
        question: 'Type the Swahili word for "Sister"',
        questionFr: 'Tapez le mot Swahili pour "Sœur"',
        correctAnswer: 'Dada'
      },
      {
        id: 'sw-v14',
        type: 'multiple-choice',
        question: 'What is "Brother" in Swahili?',
        questionFr: 'Comment dit-on "Frère" en Swahili?',
        correctAnswer: 'Kaka',
        options: ['Kaka', 'Dada', 'Mama', 'Mtoto']
      },
      {
        id: 'sw-v15',
        type: 'type-answer',
        question: 'Type "Child" in Swahili',
        questionFr: 'Tapez "Enfant" en Swahili',
        correctAnswer: 'Mtoto'
      }
    ]
  },
  {
    id: 'sw-vocab-4',
    type: 'vocabulary',
    title: 'Common Foods',
    titleFr: 'Aliments courants',
    level: 2,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v16',
        type: 'multiple-choice',
        question: 'What is "Water" in Swahili?',
        questionFr: 'Comment dit-on "Eau" en Swahili?',
        correctAnswer: 'Maji',
        options: ['Maji', 'Chai', 'Maziwa', 'Chakula']
      },
      {
        id: 'sw-v17',
        type: 'multiple-choice',
        question: '"Chakula" means:',
        questionFr: '"Chakula" signifie:',
        correctAnswer: 'Food',
        options: ['Water', 'Food', 'Tea', 'Milk']
      },
      {
        id: 'sw-v18',
        type: 'type-answer',
        question: 'Type the Swahili word for "Bread"',
        questionFr: 'Tapez le mot Swahili pour "Pain"',
        correctAnswer: 'Mkate'
      },
      {
        id: 'sw-v19',
        type: 'multiple-choice',
        question: 'What is "Rice" in Swahili?',
        questionFr: 'Comment dit-on "Riz" en Swahili?',
        correctAnswer: 'Wali',
        options: ['Wali', 'Mkate', 'Nyama', 'Samaki']
      },
      {
        id: 'sw-v20',
        type: 'type-answer',
        question: 'Type "Fruit" in Swahili',
        questionFr: 'Tapez "Fruit" en Swahili',
        correctAnswer: 'Matunda'
      }
    ]
  },
  {
    id: 'sw-vocab-5',
    type: 'vocabulary',
    title: 'Colors',
    titleFr: 'Couleurs',
    level: 3,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v21',
        type: 'multiple-choice',
        question: 'What is "Red" in Swahili?',
        questionFr: 'Comment dit-on "Rouge" en Swahili?',
        correctAnswer: 'Nyekundu',
        options: ['Nyekundu', 'Bluu', 'Kijani', 'Manjano']
      },
      {
        id: 'sw-v22',
        type: 'multiple-choice',
        question: '"Kijani" means:',
        questionFr: '"Kijani" signifie:',
        correctAnswer: 'Green',
        options: ['Red', 'Blue', 'Green', 'Yellow']
      },
      {
        id: 'sw-v23',
        type: 'type-answer',
        question: 'Type "White" in Swahili',
        questionFr: 'Tapez "Blanc" en Swahili',
        correctAnswer: 'Nyeupe'
      },
      {
        id: 'sw-v24',
        type: 'multiple-choice',
        question: 'What is "Black" in Swahili?',
        questionFr: 'Comment dit-on "Noir" en Swahili?',
        correctAnswer: 'Nyeusi',
        options: ['Nyeusi', 'Nyeupe', 'Kijani', 'Bluu']
      },
      {
        id: 'sw-v25',
        type: 'type-answer',
        question: 'Type "Yellow" in Swahili',
        questionFr: 'Tapez "Jaune" en Swahili',
        correctAnswer: 'Manjano'
      }
    ]
  },
  {
    id: 'sw-vocab-6',
    type: 'vocabulary',
    title: 'Animals',
    titleFr: 'Animaux',
    level: 3,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v26',
        type: 'multiple-choice',
        question: 'What is "Lion" in Swahili?',
        questionFr: 'Comment dit-on "Lion" en Swahili?',
        correctAnswer: 'Simba',
        options: ['Simba', 'Tembo', 'Paka', 'Mbwa']
      },
      {
        id: 'sw-v27',
        type: 'multiple-choice',
        question: '"Tembo" means:',
        questionFr: '"Tembo" signifie:',
        correctAnswer: 'Elephant',
        options: ['Lion', 'Elephant', 'Cat', 'Dog']
      },
      {
        id: 'sw-v28',
        type: 'type-answer',
        question: 'Type "Dog" in Swahili',
        questionFr: 'Tapez "Chien" en Swahili',
        correctAnswer: 'Mbwa'
      },
      {
        id: 'sw-v29',
        type: 'multiple-choice',
        question: 'What is "Bird" in Swahili?',
        questionFr: 'Comment dit-on "Oiseau" en Swahili?',
        correctAnswer: 'Ndege',
        options: ['Ndege', 'Paka', 'Simba', 'Kuku']
      },
      {
        id: 'sw-v30',
        type: 'type-answer',
        question: 'Type "Cat" in Swahili',
        questionFr: 'Tapez "Chat" en Swahili',
        correctAnswer: 'Paka'
      }
    ]
  },
  {
    id: 'sw-vocab-7',
    type: 'vocabulary',
    title: 'Body Parts',
    titleFr: 'Parties du corps',
    level: 4,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v31',
        type: 'multiple-choice',
        question: 'What is "Head" in Swahili?',
        questionFr: 'Comment dit-on "Tête" en Swahili?',
        correctAnswer: 'Kichwa',
        options: ['Kichwa', 'Mkono', 'Mguu', 'Jicho']
      },
      {
        id: 'sw-v32',
        type: 'multiple-choice',
        question: '"Jicho" means:',
        questionFr: '"Jicho" signifie:',
        correctAnswer: 'Eye',
        options: ['Head', 'Hand', 'Eye', 'Foot']
      },
      {
        id: 'sw-v33',
        type: 'type-answer',
        question: 'Type "Hand" in Swahili',
        questionFr: 'Tapez "Main" en Swahili',
        correctAnswer: 'Mkono'
      },
      {
        id: 'sw-v34',
        type: 'multiple-choice',
        question: 'What is "Foot" in Swahili?',
        questionFr: 'Comment dit-on "Pied" en Swahili?',
        correctAnswer: 'Mguu',
        options: ['Mguu', 'Mkono', 'Kichwa', 'Masikio']
      },
      {
        id: 'sw-v35',
        type: 'type-answer',
        question: 'Type "Mouth" in Swahili',
        questionFr: 'Tapez "Bouche" en Swahili',
        correctAnswer: 'Mdomo'
      }
    ]
  },
  {
    id: 'sw-vocab-8',
    type: 'vocabulary',
    title: 'Daily Activities',
    titleFr: 'Activités quotidiennes',
    level: 4,
    xpReward: 10,
    exercises: [
      {
        id: 'sw-v36',
        type: 'multiple-choice',
        question: '"Kula" means:',
        questionFr: '"Kula" signifie:',
        correctAnswer: 'To eat',
        options: ['To eat', 'To drink', 'To sleep', 'To walk']
      },
      {
        id: 'sw-v37',
        type: 'type-answer',
        question: 'Type "To sleep" in Swahili',
        questionFr: 'Tapez "Dormir" en Swahili',
        correctAnswer: 'Kulala'
      },
      {
        id: 'sw-v38',
        type: 'multiple-choice',
        question: 'What is "To drink" in Swahili?',
        questionFr: 'Comment dit-on "Boire" en Swahili?',
        correctAnswer: 'Kunywa',
        options: ['Kunywa', 'Kula', 'Kulala', 'Kusoma']
      },
      {
        id: 'sw-v39',
        type: 'type-answer',
        question: 'Type "To read" in Swahili',
        questionFr: 'Tapez "Lire" en Swahili',
        correctAnswer: 'Kusoma'
      },
      {
        id: 'sw-v40',
        type: 'multiple-choice',
        question: '"Kuandika" means:',
        questionFr: '"Kuandika" signifie:',
        correctAnswer: 'To write',
        options: ['To read', 'To write', 'To speak', 'To listen']
      }
    ]
  },

  // GRAMMAR LESSONS (30 questions)
  {
    id: 'sw-grammar-1',
    type: 'grammar',
    title: 'Personal Pronouns',
    titleFr: 'Pronoms personnels',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g1',
        type: 'multiple-choice',
        question: 'What is "I" in Swahili?',
        questionFr: 'Comment dit-on "Je" en Swahili?',
        correctAnswer: 'Mimi',
        options: ['Mimi', 'Wewe', 'Yeye', 'Sisi']
      },
      {
        id: 'sw-g2',
        type: 'multiple-choice',
        question: '"Wewe" means:',
        questionFr: '"Wewe" signifie:',
        correctAnswer: 'You',
        options: ['I', 'You', 'He/She', 'We']
      },
      {
        id: 'sw-g3',
        type: 'fill-blank',
        question: 'Complete: ____ ni mwalimu (I am a teacher)',
        questionFr: 'Compléter: ____ ni mwalimu (Je suis enseignant)',
        correctAnswer: 'Mimi',
        hint: 'First person pronoun'
      },
      {
        id: 'sw-g4',
        type: 'multiple-choice',
        question: 'What is "We" in Swahili?',
        questionFr: 'Comment dit-on "Nous" en Swahili?',
        correctAnswer: 'Sisi',
        options: ['Sisi', 'Nyinyi', 'Wao', 'Mimi']
      },
      {
        id: 'sw-g5',
        type: 'type-answer',
        question: 'Type "They" in Swahili',
        questionFr: 'Tapez "Ils/Elles" en Swahili',
        correctAnswer: 'Wao'
      }
    ]
  },
  {
    id: 'sw-grammar-2',
    type: 'grammar',
    title: 'Present Tense Verbs',
    titleFr: 'Verbes au présent',
    level: 3,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g6',
        type: 'fill-blank',
        question: 'Complete: Mimi ____ chakula (I eat food)',
        questionFr: 'Compléter: Mimi ____ chakula (Je mange de la nourriture)',
        correctAnswer: 'ninakula',
        hint: 'Present tense of "kula"'
      },
      {
        id: 'sw-g7',
        type: 'multiple-choice',
        question: '"Ninasoma" means:',
        questionFr: '"Ninasoma" signifie:',
        correctAnswer: 'I am reading',
        options: ['I am eating', 'I am reading', 'I am writing', 'I am sleeping']
      },
      {
        id: 'sw-g8',
        type: 'fill-blank',
        question: 'Complete: Wewe ____ maji (You drink water)',
        questionFr: 'Compléter: Wewe ____ maji (Tu bois de l\'eau)',
        correctAnswer: 'unakunywa',
        hint: 'Present tense of "kunywa"'
      },
      {
        id: 'sw-g9',
        type: 'type-answer',
        question: 'Type "He/She is sleeping" in Swahili',
        questionFr: 'Tapez "Il/Elle dort" en Swahili',
        correctAnswer: 'Analala'
      },
      {
        id: 'sw-g10',
        type: 'multiple-choice',
        question: 'What is "We are going" in Swahili?',
        questionFr: 'Comment dit-on "Nous allons" en Swahili?',
        correctAnswer: 'Tunaenda',
        options: ['Ninaenda', 'Unaenda', 'Tunaenda', 'Wanaenda']
      }
    ]
  },
  {
    id: 'sw-grammar-3',
    type: 'grammar',
    title: 'Noun Classes',
    titleFr: 'Classes de noms',
    level: 4,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g11',
        type: 'multiple-choice',
        question: 'Which is the correct plural of "Mtoto" (child)?',
        questionFr: 'Quel est le pluriel correct de "Mtoto" (enfant)?',
        correctAnswer: 'Watoto',
        options: ['Watoto', 'Mitoto', 'Matoto', 'Vitoto']
      },
      {
        id: 'sw-g12',
        type: 'fill-blank',
        question: 'Complete: Mti (tree) → ____ (trees)',
        questionFr: 'Compléter: Mti (arbre) → ____ (arbres)',
        correctAnswer: 'Miti',
        hint: 'M-/Mi- class'
      },
      {
        id: 'sw-g13',
        type: 'multiple-choice',
        question: 'What is the plural of "Kiti" (chair)?',
        questionFr: 'Quel est le pluriel de "Kiti" (chaise)?',
        correctAnswer: 'Viti',
        options: ['Viti', 'Miti', 'Biti', 'Witi']
      },
      {
        id: 'sw-g14',
        type: 'type-answer',
        question: 'Type the plural of "Mwalimu" (teacher)',
        questionFr: 'Tapez le pluriel de "Mwalimu" (enseignant)',
        correctAnswer: 'Walimu'
      },
      {
        id: 'sw-g15',
        type: 'multiple-choice',
        question: 'Which class do most animals belong to?',
        questionFr: 'À quelle classe appartiennent la plupart des animaux?',
        correctAnswer: 'N-/N- class',
        options: ['M-/Wa- class', 'N-/N- class', 'Ki-/Vi- class', 'U-/N- class']
      }
    ]
  },
  {
    id: 'sw-grammar-4',
    type: 'grammar',
    title: 'Questions',
    titleFr: 'Questions',
    level: 3,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g16',
        type: 'multiple-choice',
        question: '"Nani" means:',
        questionFr: '"Nani" signifie:',
        correctAnswer: 'Who',
        options: ['What', 'Who', 'Where', 'When']
      },
      {
        id: 'sw-g17',
        type: 'type-answer',
        question: 'Type "What" in Swahili',
        questionFr: 'Tapez "Quoi" en Swahili',
        correctAnswer: 'Nini'
      },
      {
        id: 'sw-g18',
        type: 'multiple-choice',
        question: 'What is "Where" in Swahili?',
        questionFr: 'Comment dit-on "Où" en Swahili?',
        correctAnswer: 'Wapi',
        options: ['Wapi', 'Nini', 'Lini', 'Vipi']
      },
      {
        id: 'sw-g19',
        type: 'fill-blank',
        question: 'Complete: ____ unakwenda? (Where are you going?)',
        questionFr: 'Compléter: ____ unakwenda? (Où vas-tu?)',
        correctAnswer: 'Wapi',
        hint: 'Question word for location'
      },
      {
        id: 'sw-g20',
        type: 'type-answer',
        question: 'Type "How" in Swahili',
        questionFr: 'Tapez "Comment" en Swahili',
        correctAnswer: 'Vipi'
      }
    ]
  },
  {
    id: 'sw-grammar-5',
    type: 'grammar',
    title: 'Adjectives',
    titleFr: 'Adjectifs',
    level: 4,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g21',
        type: 'multiple-choice',
        question: 'What is "Big" in Swahili?',
        questionFr: 'Comment dit-on "Grand" en Swahili?',
        correctAnswer: 'Kubwa',
        options: ['Kubwa', 'Ndogo', 'Nzuri', 'Mbaya']
      },
      {
        id: 'sw-g22',
        type: 'fill-blank',
        question: 'Complete: Nyumba ____ (A good house)',
        questionFr: 'Compléter: Nyumba ____ (Une bonne maison)',
        correctAnswer: 'nzuri',
        hint: 'Adjective for "good"'
      },
      {
        id: 'sw-g23',
        type: 'type-answer',
        question: 'Type "Small" in Swahili',
        questionFr: 'Tapez "Petit" en Swahili',
        correctAnswer: 'Ndogo'
      },
      {
        id: 'sw-g24',
        type: 'multiple-choice',
        question: '"Refu" means:',
        questionFr: '"Refu" signifie:',
        correctAnswer: 'Long/Tall',
        options: ['Short', 'Long/Tall', 'Fat', 'Thin']
      },
      {
        id: 'sw-g25',
        type: 'fill-blank',
        question: 'Complete: Watoto ____ (Beautiful children)',
        questionFr: 'Compléter: Watoto ____ (Beaux enfants)',
        correctAnswer: 'wazuri',
        hint: 'Plural agreement'
      }
    ]
  },
  {
    id: 'sw-grammar-6',
    type: 'grammar',
    title: 'Past Tense',
    titleFr: 'Temps passé',
    level: 5,
    xpReward: 15,
    exercises: [
      {
        id: 'sw-g26',
        type: 'fill-blank',
        question: 'Complete: Mimi ____ chakula (I ate food)',
        questionFr: 'Compléter: Mimi ____ chakula (J\'ai mangé de la nourriture)',
        correctAnswer: 'nilikula',
        hint: 'Past tense marker "li"'
      },
      {
        id: 'sw-g27',
        type: 'multiple-choice',
        question: '"Nilisoma" means:',
        questionFr: '"Nilisoma" signifie:',
        correctAnswer: 'I read (past)',
        options: ['I read (present)', 'I read (past)', 'I will read', 'I am reading']
      },
      {
        id: 'sw-g28',
        type: 'type-answer',
        question: 'Type "He/She went" in Swahili',
        questionFr: 'Tapez "Il/Elle est allé(e)" en Swahili',
        correctAnswer: 'Alienda'
      },
      {
        id: 'sw-g29',
        type: 'fill-blank',
        question: 'Complete: Wao ____ nyumbani (They arrived home)',
        questionFr: 'Compléter: Wao ____ nyumbani (Ils sont arrivés à la maison)',
        correctAnswer: 'walifika',
        hint: 'Past tense of "kufika"'
      },
      {
        id: 'sw-g30',
        type: 'multiple-choice',
        question: 'What is the past tense marker?',
        questionFr: 'Quel est le marqueur du temps passé?',
        correctAnswer: '-li-',
        options: ['-na-', '-li-', '-ta-', '-me-']
      }
    ]
  },

  // WRITING LESSONS (20 questions)
  {
    id: 'sw-writing-1',
    type: 'writing',
    title: 'Simple Sentences',
    titleFr: 'Phrases simples',
    level: 2,
    xpReward: 12,
    exercises: [
      {
        id: 'sw-w1',
        type: 'type-answer',
        question: 'Translate: "I am a student"',
        questionFr: 'Traduire: "Je suis étudiant"',
        correctAnswer: 'Mimi ni mwanafunzi'
      },
      {
        id: 'sw-w2',
        type: 'type-answer',
        question: 'Translate: "You are welcome"',
        questionFr: 'Traduire: "Bienvenue"',
        correctAnswer: 'Karibu'
      },
      {
        id: 'sw-w3',
        type: 'type-answer',
        question: 'Type: "I want water"',
        questionFr: 'Tapez: "Je veux de l\'eau"',
        correctAnswer: 'Ninataka maji'
      },
      {
        id: 'sw-w4',
        type: 'type-answer',
        question: 'Translate: "The house is big"',
        questionFr: 'Traduire: "La maison est grande"',
        correctAnswer: 'Nyumba ni kubwa'
      },
      {
        id: 'sw-w5',
        type: 'type-answer',
        question: 'Type: "Good night"',
        questionFr: 'Tapez: "Bonne nuit"',
        correctAnswer: 'Usiku mwema'
      }
    ]
  },
  {
    id: 'sw-writing-2',
    type: 'writing',
    title: 'Questions',
    titleFr: 'Questions',
    level: 3,
    xpReward: 12,
    exercises: [
      {
        id: 'sw-w6',
        type: 'type-answer',
        question: 'Translate: "How are you?"',
        questionFr: 'Traduire: "Comment allez-vous?"',
        correctAnswer: 'Habari yako'
      },
      {
        id: 'sw-w7',
        type: 'type-answer',
        question: 'Type: "What is your name?"',
        questionFr: 'Tapez: "Comment vous appelez-vous?"',
        correctAnswer: 'Jina lako ni nani'
      },
      {
        id: 'sw-w8',
        type: 'type-answer',
        question: 'Translate: "Where do you live?"',
        questionFr: 'Traduire: "Où habitez-vous?"',
        correctAnswer: 'Unaishi wapi'
      },
      {
        id: 'sw-w9',
        type: 'type-answer',
        question: 'Type: "How much is this?"',
        questionFr: 'Tapez: "Combien coûte ceci?"',
        correctAnswer: 'Hii ni bei gani'
      },
      {
        id: 'sw-w10',
        type: 'type-answer',
        question: 'Translate: "When are you coming?"',
        questionFr: 'Traduire: "Quand venez-vous?"',
        correctAnswer: 'Unakuja lini'
      }
    ]
  },
  {
    id: 'sw-writing-3',
    type: 'writing',
    title: 'Daily Conversations',
    titleFr: 'Conversations quotidiennes',
    level: 4,
    xpReward: 12,
    exercises: [
      {
        id: 'sw-w11',
        type: 'type-answer',
        question: 'Translate: "I am going to school"',
        questionFr: 'Traduire: "Je vais à l\'école"',
        correctAnswer: 'Ninaenda shuleni'
      },
      {
        id: 'sw-w12',
        type: 'type-answer',
        question: 'Type: "She likes to read"',
        questionFr: 'Tapez: "Elle aime lire"',
        correctAnswer: 'Anapenda kusoma'
      },
      {
        id: 'sw-w13',
        type: 'type-answer',
        question: 'Translate: "We are eating food"',
        questionFr: 'Traduire: "Nous mangeons de la nourriture"',
        correctAnswer: 'Tunakula chakula'
      },
      {
        id: 'sw-w14',
        type: 'type-answer',
        question: 'Type: "They are playing football"',
        questionFr: 'Tapez: "Ils jouent au football"',
        correctAnswer: 'Wanacheza mpira'
      },
      {
        id: 'sw-w15',
        type: 'type-answer',
        question: 'Translate: "I need help"',
        questionFr: 'Traduire: "J\'ai besoin d\'aide"',
        correctAnswer: 'Ninahitaji msaada'
      }
    ]
  },
  {
    id: 'sw-writing-4',
    type: 'writing',
    title: 'Advanced Sentences',
    titleFr: 'Phrases avancées',
    level: 5,
    xpReward: 12,
    exercises: [
      {
        id: 'sw-w16',
        type: 'type-answer',
        question: 'Translate: "I have been to Dar es Salaam"',
        questionFr: 'Traduire: "J\'ai été à Dar es Salaam"',
        correctAnswer: 'Nimekwisha kwenda Dar es Salaam'
      },
      {
        id: 'sw-w17',
        type: 'type-answer',
        question: 'Type: "She will come tomorrow"',
        questionFr: 'Tapez: "Elle viendra demain"',
        correctAnswer: 'Atakuja kesho'
      },
      {
        id: 'sw-w18',
        type: 'type-answer',
        question: 'Translate: "I can speak Swahili"',
        questionFr: 'Traduire: "Je peux parler swahili"',
        correctAnswer: 'Ninaweza kusema Kiswahili'
      },
      {
        id: 'sw-w19',
        type: 'type-answer',
        question: 'Type: "The weather is good today"',
        questionFr: 'Tapez: "Le temps est bon aujourd\'hui"',
        correctAnswer: 'Hali ya hewa ni nzuri leo'
      },
      {
        id: 'sw-w20',
        type: 'type-answer',
        question: 'Translate: "I love my country"',
        questionFr: 'Traduire: "J\'aime mon pays"',
        correctAnswer: 'Ninapenda nchi yangu'
      }
    ]
  },

  // CULTURE LESSONS (10 questions)
  {
    id: 'sw-culture-1',
    type: 'culture',
    title: 'Swahili Proverbs',
    titleFr: 'Proverbes swahilis',
    level: 5,
    xpReward: 20,
    exercises: [
      {
        id: 'sw-c1',
        type: 'multiple-choice',
        question: 'What does "Haraka haraka haina baraka" mean?',
        questionFr: 'Que signifie "Haraka haraka haina baraka"?',
        correctAnswer: 'Haste has no blessing',
        options: ['Haste has no blessing', 'Time is money', 'Practice makes perfect', 'United we stand']
      },
      {
        id: 'sw-c2',
        type: 'multiple-choice',
        question: '"Kidole kimoja hakivunji chawa" means:',
        questionFr: '"Kidole kimoja hakivunji chawa" signifie:',
        correctAnswer: 'One finger cannot kill a louse (Unity is strength)',
        options: [
          'One finger cannot kill a louse (Unity is strength)',
          'Time flies',
          'Knowledge is power',
          'Actions speak louder than words'
        ]
      },
      {
        id: 'sw-c3',
        type: 'multiple-choice',
        question: 'What does "Asiyefunzwa na mamaye hufunzwa na ulimwengu" mean?',
        questionFr: 'Que signifie "Asiyefunzwa na mamaye hufunzwa na ulimwengu"?',
        correctAnswer: 'He who is not taught by his mother will be taught by the world',
        options: [
          'He who is not taught by his mother will be taught by the world',
          'A friend in need is a friend indeed',
          'Better late than never',
          'Where there is smoke, there is fire'
        ]
      },
      {
        id: 'sw-c4',
        type: 'multiple-choice',
        question: '"Mchagua jembe si mkulima" means:',
        questionFr: '"Mchagua jembe si mkulima" signifie:',
        correctAnswer: 'He who chooses the hoe is not a farmer (Don\'t be too picky)',
        options: [
          'He who chooses the hoe is not a farmer (Don\'t be too picky)',
          'Early bird catches the worm',
          'Strike while the iron is hot',
          'All that glitters is not gold'
        ]
      },
      {
        id: 'sw-c5',
        type: 'multiple-choice',
        question: 'What does "Umoja ni nguvu" mean?',
        questionFr: 'Que signifie "Umoja ni nguvu"?',
        correctAnswer: 'Unity is strength',
        options: ['Unity is strength', 'Knowledge is power', 'Time is money', 'Practice makes perfect']
      },
      {
        id: 'sw-c6',
        type: 'multiple-choice',
        question: 'The traditional greeting "Shikamoo" is used when:',
        questionFr: 'La salutation traditionnelle "Shikamoo" est utilisée quand:',
        correctAnswer: 'A younger person greets an elder',
        options: [
          'A younger person greets an elder',
          'Friends greet each other',
          'Saying goodbye',
          'Meeting someone for the first time'
        ]
      },
      {
        id: 'sw-c7',
        type: 'multiple-choice',
        question: 'What is the response to "Shikamoo"?',
        questionFr: 'Quelle est la réponse à "Shikamoo"?',
        correctAnswer: 'Marahaba',
        options: ['Marahaba', 'Asante', 'Karibu', 'Kwaheri']
      },
      {
        id: 'sw-c8',
        type: 'multiple-choice',
        question: '"Pole pole" is used to mean:',
        questionFr: '"Pole pole" est utilisé pour signifier:',
        correctAnswer: 'Slowly, take it easy',
        options: ['Slowly, take it easy', 'Very fast', 'Right now', 'Maybe later']
      },
      {
        id: 'sw-c9',
        type: 'multiple-choice',
        question: 'What is "Ugali"?',
        questionFr: 'Qu\'est-ce que "Ugali"?',
        correctAnswer: 'A staple food made from maize flour',
        options: [
          'A staple food made from maize flour',
          'A traditional dance',
          'A type of drum',
          'A greeting ceremony'
        ]
      },
      {
        id: 'sw-c10',
        type: 'multiple-choice',
        question: 'The Swahili Coast is known for its blend of:',
        questionFr: 'La côte swahilie est connue pour son mélange de:',
        correctAnswer: 'African, Arab, and Asian cultures',
        options: [
          'African, Arab, and Asian cultures',
          'Only African cultures',
          'European and African cultures',
          'Asian and European cultures'
        ]
      }
    ]
  }
];
