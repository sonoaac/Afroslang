import { Lesson } from '../../types';

export const twiLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'tw-vocab-1-1',
    stageId: 'twi-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'tw-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Twi?',
        questionFr: 'Comment dit-on "Bonjour" en Twi?',
        correctAnswer: 'Akwaaba',
        correctAnswerFr: 'Akwaaba',
        options: ['Akwaaba', 'Nante yie', 'Medaase', 'Mepa wo kyɛw']
      },
      {
        id: 'tw-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Akwaaba" mean?',
        questionFr: 'Que signifie "Akwaaba"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'tw-v1-1-3',
        type: 'type-answer',
        question: 'Type the Twi word for "Goodbye"',
        questionFr: 'Tapez le mot Twi pour "Au revoir"',
        correctAnswer: 'Nante yie',
        correctAnswerFr: 'Nante yie'
      },
      {
        id: 'tw-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Twi?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Twi?',
        correctAnswer: 'Mema wo akye',
        correctAnswerFr: 'Mema wo akye',
        options: ['Mema wo akye', 'Mema wo awia', 'Mema wo anwuma', 'Akwaaba']
      },
      {
        id: 'tw-v1-1-5',
        type: 'multiple-choice',
        question: '"Ɛte sɛn?" means:',
        questionFr: '"Ɛte sɛn?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'tw-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Twi',
        questionFr: 'Tapez "Merci" en Twi',
        correctAnswer: 'Medaase',
        correctAnswerFr: 'Medaase'
      },
      {
        id: 'tw-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Twi?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Twi?',
        correctAnswer: 'Mepa wo kyɛw',
        correctAnswerFr: 'Mepa wo kyɛw',
        options: ['Mepa wo kyɛw', 'Medaase', 'Nante yie', 'Akwaaba']
      },
      {
        id: 'tw-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Ɛte sɛn?"?',
        questionFr: 'Comment répondez-vous à "Ɛte sɛn?"?',
        correctAnswer: 'Ɛyɛ',
        correctAnswerFr: 'Ɛyɛ',
        options: ['Ɛyɛ', 'Akwaaba', 'Nante yie', 'Medaase']
      },
      {
        id: 'tw-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Twi',
        questionFr: 'Tapez "Excusez-moi" en Twi',
        correctAnswer: 'Kafra',
        correctAnswerFr: 'Kafra'
      },
      {
        id: 'tw-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Twi?',
        questionFr: 'Comment dit-on "Désolé" en Twi?',
        correctAnswer: 'Kafra',
        correctAnswerFr: 'Kafra',
        options: ['Kafra', 'Medaase', 'Mepa wo kyɛw', 'Nante yie']
      },
      {
        id: 'tw-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Twi?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Twi?',
        correctAnswer: 'Medaase',
        correctAnswerFr: 'Medaase',
        options: ['Medaase', 'Ɛte sɛn?', 'Akwaaba', 'Nante yie']
      },
      {
        id: 'tw-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Twi',
        questionFr: 'Tapez "À bientôt" en Twi',
        correctAnswer: 'Yɛbɛhyia bio',
        correctAnswerFr: 'Yɛbɛhyia bio'
      },
      {
        id: 'tw-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Twi?',
        questionFr: 'Comment dit-on "De rien" en Twi?',
        correctAnswer: 'Medaase',
        correctAnswerFr: 'Medaase',
        options: ['Medaase', 'Mepa wo kyɛw', 'Kafra', 'Akwaaba']
      },
      {
        id: 'tw-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Twi?',
        questionFr: 'Comment dit-on "Bonsoir" en Twi?',
        correctAnswer: 'Mema wo awia',
        correctAnswerFr: 'Mema wo awia',
        options: ['Mema wo awia', 'Mema wo akye', 'Mema wo anwuma', 'Akwaaba']
      },
      {
        id: 'tw-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Twi',
        questionFr: 'Tapez "Bonne nuit" en Twi',
        correctAnswer: 'Mema wo anwuma',
        correctAnswerFr: 'Mema wo anwuma'
      },
      {
        id: 'tw-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Twi?',
        questionFr: 'Comment dit-on "Oui" en Twi?',
        correctAnswer: 'Aane',
        correctAnswerFr: 'Aane',
        options: ['Aane', 'Daabi', 'Medaase', 'Akwaaba']
      },
      {
        id: 'tw-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Twi?',
        questionFr: 'Comment dit-on "Non" en Twi?',
        correctAnswer: 'Daabi',
        correctAnswerFr: 'Daabi',
        options: ['Daabi', 'Aane', 'Nante yie', 'Mepa wo kyɛw']
      },
      {
        id: 'tw-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Twi',
        questionFr: 'Tapez "Peut-être" en Twi',
        correctAnswer: 'Ɛbia',
        correctAnswerFr: 'Ɛbia'
      },
      {
        id: 'tw-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Twi?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Twi?',
        correctAnswer: 'Mente ase',
        correctAnswerFr: 'Mente ase',
        options: ['Mente ase', 'Medaase', 'Nante yie', 'Kafra']
      },
      {
        id: 'tw-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Twi?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Twi?',
        correctAnswer: 'Mennim',
        correctAnswerFr: 'Mennim',
        options: ['Mennim', 'Medaase', 'Nante yie', 'Kafra']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'tw-vocab-1-2',
    stageId: 'twi-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'tw-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Twi?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Twi?',
        correctAnswer: 'Wo din de sɛn?',
        correctAnswerFr: 'Wo din de sɛn?',
        options: ['Wo din de sɛn?', 'Medaase din?', 'Nante yie din?', 'Mepa wo kyɛw din?']
      },
      {
        id: 'tw-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Twi',
        questionFr: 'Tapez "Je m\'appelle..." en Twi',
        correctAnswer: 'Me din de...',
        correctAnswerFr: 'Me din de...'
      },
      {
        id: 'tw-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Twi?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Twi?',
        correctAnswer: 'Wofiri he?',
        correctAnswerFr: 'Wofiri he?',
        options: ['Wofiri he?', 'Medaase he?', 'Nante yie he?', 'Mepa wo kyɛw he?']
      },
      {
        id: 'tw-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Twi',
        questionFr: 'Tapez "Je viens de..." en Twi',
        correctAnswer: 'Mefiri...',
        correctAnswerFr: 'Mefiri...'
      },
      {
        id: 'tw-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Twi?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Twi?',
        correctAnswer: 'Wo mfeɛ bɛn?',
        correctAnswerFr: 'Wo mfeɛ bɛn?',
        options: ['Wo mfeɛ bɛn?', 'Medaase mfeɛ?', 'Nante yie mfeɛ?', 'Mepa wo kyɛw mfeɛ?']
      },
      {
        id: 'tw-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Twi',
        questionFr: 'Tapez "J\'ai ... ans" en Twi',
        correctAnswer: 'Me mfeɛ...',
        correctAnswerFr: 'Me mfeɛ...'
      },
      {
        id: 'tw-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Twi?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Twi?',
        correctAnswer: 'Wote he?',
        correctAnswerFr: 'Wote he?',
        options: ['Wote he?', 'Medaase he?', 'Nante yie he?', 'Mepa wo kyɛw he?']
      },
      {
        id: 'tw-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Twi',
        questionFr: 'Tapez "J\'habite à..." en Twi',
        correctAnswer: 'Mete...',
        correctAnswerFr: 'Mete...'
      },
      {
        id: 'tw-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Twi?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Twi?',
        correctAnswer: 'Woyɛ adeɛ bɛn?',
        correctAnswerFr: 'Woyɛ adeɛ bɛn?',
        options: ['Woyɛ adeɛ bɛn?', 'Medaase adeɛ?', 'Nante yie adeɛ?', 'Mepa wo kyɛw adeɛ?']
      },
      {
        id: 'tw-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Twi',
        questionFr: 'Tapez "Je suis étudiant" en Twi',
        correctAnswer: 'Meyɛ suani',
        correctAnswerFr: 'Meyɛ suani'
      },
      {
        id: 'tw-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Twi" in Twi?',
        questionFr: 'Comment dit-on "J\'apprends le Twi" en Twi?',
        correctAnswer: 'Merekyerɛ Twi',
        correctAnswerFr: 'Merekyerɛ Twi',
        options: ['Merekyerɛ Twi', 'Medaase Twi', 'Nante yie Twi', 'Mepa wo kyɛw Twi']
      },
      {
        id: 'tw-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Twi" in Twi',
        questionFr: 'Tapez "Je parle un peu Twi" en Twi',
        correctAnswer: 'Meka Twi kakra',
        correctAnswerFr: 'Meka Twi kakra'
      },
      {
        id: 'tw-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Twi well" in Twi?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Twi" en Twi?',
        correctAnswer: 'Mennka Twi yiye',
        correctAnswerFr: 'Mennka Twi yiye',
        options: ['Mennka Twi yiye', 'Medaase Twi', 'Nante yie Twi', 'Mepa wo kyɛw Twi']
      },
      {
        id: 'tw-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Twi',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Twi',
        correctAnswer: 'Wobetumi aboa me?',
        correctAnswerFr: 'Wobetumi aboa me?'
      },
      {
        id: 'tw-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Twi?',
        questionFr: 'Comment dit-on "Bien sûr" en Twi?',
        correctAnswer: 'Aane',
        correctAnswerFr: 'Aane',
        options: ['Aane', 'Daabi', 'Medaase', 'Mepa wo kyɛw']
      },
      {
        id: 'tw-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Twi?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Twi?',
        correctAnswer: 'Mehia mmoa',
        correctAnswerFr: 'Mehia mmoa',
        options: ['Mehia mmoa', 'Medaase mmoa', 'Nante yie mmoa', 'Mepa wo kyɛw mmoa']
      },
      {
        id: 'tw-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Twi',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Twi',
        correctAnswer: 'Wobetumi asan aka?',
        correctAnswerFr: 'Wobetumi asan aka?'
      },
      {
        id: 'tw-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Twi?',
        questionFr: 'Comment dit-on "Parlez lentement" en Twi?',
        correctAnswer: 'Kasa kakra',
        correctAnswerFr: 'Kasa kakra',
        options: ['Kasa kakra', 'Kasa medaase', 'Kasa nante yie', 'Kasa mepa wo kyɛw']
      },
      {
        id: 'tw-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Twi',
        questionFr: 'Tapez "Je comprends" en Twi',
        correctAnswer: 'Mete ase',
        correctAnswerFr: 'Mete ase'
      },
      {
        id: 'tw-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Twi?',
        questionFr: 'Comment dit-on "C\'est correct" en Twi?',
        correctAnswer: 'Ɛyɛ',
        correctAnswerFr: 'Ɛyɛ',
        options: ['Ɛyɛ', 'Ɛnyɛ', 'Medaase', 'Mepa wo kyɛw']
      }
    ]
  }
];
