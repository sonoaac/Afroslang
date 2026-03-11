import { Lesson } from '../types';

export const wolofLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'wo-vocab-1-1',
    stageId: 'wolof-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'wo-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Wolof?',
        questionFr: 'Comment dit-on "Bonjour" en Wolof?',
        correctAnswer: 'Salaam aleekum',
        correctAnswerFr: 'Salaam aleekum',
        options: ['Salaam aleekum', 'Mangi dem', 'Jërejëf', 'Baal ma']
      },
      {
        id: 'wo-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Salaam aleekum" mean?',
        questionFr: 'Que signifie "Salaam aleekum"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'wo-v1-1-3',
        type: 'type-answer',
        question: 'Type the Wolof word for "Goodbye"',
        questionFr: 'Tapez le mot Wolof pour "Au revoir"',
        correctAnswer: 'Mangi dem',
        correctAnswerFr: 'Mangi dem'
      },
      {
        id: 'wo-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Wolof?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Wolof?',
        correctAnswer: 'Subaka',
        correctAnswerFr: 'Subaka',
        options: ['Subaka', 'Ngoon', 'Guddi', 'Salaam aleekum']
      },
      {
        id: 'wo-v1-1-5',
        type: 'multiple-choice',
        question: '"Nanga def?" means:',
        questionFr: '"Nanga def?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'wo-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Wolof',
        questionFr: 'Tapez "Merci" en Wolof',
        correctAnswer: 'Jërejëf',
        correctAnswerFr: 'Jërejëf'
      },
      {
        id: 'wo-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Wolof?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Wolof?',
        correctAnswer: 'Baal ma',
        correctAnswerFr: 'Baal ma',
        options: ['Baal ma', 'Jërejëf', 'Mangi dem', 'Salaam aleekum']
      },
      {
        id: 'wo-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Nanga def?"?',
        questionFr: 'Comment répondez-vous à "Nanga def?"?',
        correctAnswer: 'Maa ngi fi',
        correctAnswerFr: 'Maa ngi fi',
        options: ['Maa ngi fi', 'Salaam aleekum', 'Mangi dem', 'Jërejëf']
      },
      {
        id: 'wo-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Wolof',
        questionFr: 'Tapez "Excusez-moi" en Wolof',
        correctAnswer: 'Baal ma',
        correctAnswerFr: 'Baal ma'
      },
      {
        id: 'wo-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Wolof?',
        questionFr: 'Comment dit-on "Désolé" en Wolof?',
        correctAnswer: 'Baal ma',
        correctAnswerFr: 'Baal ma',
        options: ['Baal ma', 'Jërejëf', 'Waaw', 'Mangi dem']
      },
      {
        id: 'wo-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Wolof?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Wolof?',
        correctAnswer: 'Jërejëf',
        correctAnswerFr: 'Jërejëf',
        options: ['Jërejëf', 'Nanga def?', 'Salaam aleekum', 'Mangi dem']
      },
      {
        id: 'wo-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Wolof',
        questionFr: 'Tapez "À bientôt" en Wolof',
        correctAnswer: 'Ci kanam',
        correctAnswerFr: 'Ci kanam'
      },
      {
        id: 'wo-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Wolof?',
        questionFr: 'Comment dit-on "De rien" en Wolof?',
        correctAnswer: 'Jërejëf',
        correctAnswerFr: 'Jërejëf',
        options: ['Jërejëf', 'Baal ma', 'Waaw', 'Salaam aleekum']
      },
      {
        id: 'wo-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Wolof?',
        questionFr: 'Comment dit-on "Bonsoir" en Wolof?',
        correctAnswer: 'Ngoon',
        correctAnswerFr: 'Ngoon',
        options: ['Ngoon', 'Subaka', 'Guddi', 'Salaam aleekum']
      },
      {
        id: 'wo-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Wolof',
        questionFr: 'Tapez "Bonne nuit" en Wolof',
        correctAnswer: 'Guddi',
        correctAnswerFr: 'Guddi'
      },
      {
        id: 'wo-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Wolof?',
        questionFr: 'Comment dit-on "Oui" en Wolof?',
        correctAnswer: 'Waaw',
        correctAnswerFr: 'Waaw',
        options: ['Waaw', 'Déedéet', 'Jërejëf', 'Salaam aleekum']
      },
      {
        id: 'wo-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Wolof?',
        questionFr: 'Comment dit-on "Non" en Wolof?',
        correctAnswer: 'Déedéet',
        correctAnswerFr: 'Déedéet',
        options: ['Déedéet', 'Waaw', 'Mangi dem', 'Baal ma']
      },
      {
        id: 'wo-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Wolof',
        questionFr: 'Tapez "Peut-être" en Wolof',
        correctAnswer: 'Moom',
        correctAnswerFr: 'Moom'
      },
      {
        id: 'wo-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Wolof?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Wolof?',
        correctAnswer: 'Dama xamul',
        correctAnswerFr: 'Dama xamul',
        options: ['Dama xamul', 'Jërejëf', 'Mangi dem', 'Baal ma']
      },
      {
        id: 'wo-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Wolof?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Wolof?',
        correctAnswer: 'Dama xamul',
        correctAnswerFr: 'Dama xamul',
        options: ['Dama xamul', 'Jërejëf', 'Mangi dem', 'Baal ma']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'wo-vocab-1-2',
    stageId: 'wolof-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'wo-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Wolof?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Wolof?',
        correctAnswer: 'Naka sa tur?',
        correctAnswerFr: 'Naka sa tur?',
        options: ['Naka sa tur?', 'Jërejëf tur?', 'Mangi dem tur?', 'Baal ma tur?']
      },
      {
        id: 'wo-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Wolof',
        questionFr: 'Tapez "Je m\'appelle..." en Wolof',
        correctAnswer: 'Sama tur...',
        correctAnswerFr: 'Sama tur...'
      },
      {
        id: 'wo-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Wolof?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Wolof?',
        correctAnswer: 'Fan nga jóge?',
        correctAnswerFr: 'Fan nga jóge?',
        options: ['Fan nga jóge?', 'Jërejëf jóge?', 'Mangi dem jóge?', 'Baal ma jóge?']
      },
      {
        id: 'wo-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Wolof',
        questionFr: 'Tapez "Je viens de..." en Wolof',
        correctAnswer: 'Maa jóge...',
        correctAnswerFr: 'Maa jóge...'
      },
      {
        id: 'wo-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Wolof?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Wolof?',
        correctAnswer: 'Naka sa at?',
        correctAnswerFr: 'Naka sa at?',
        options: ['Naka sa at?', 'Jërejëf at?', 'Mangi dem at?', 'Baal ma at?']
      },
      {
        id: 'wo-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Wolof',
        questionFr: 'Tapez "J\'ai ... ans" en Wolof',
        correctAnswer: 'Maa am... at',
        correctAnswerFr: 'Maa am... at'
      },
      {
        id: 'wo-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Wolof?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Wolof?',
        correctAnswer: 'Fan nga dëkk?',
        correctAnswerFr: 'Fan nga dëkk?',
        options: ['Fan nga dëkk?', 'Jërejëf dëkk?', 'Mangi dem dëkk?', 'Baal ma dëkk?']
      },
      {
        id: 'wo-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Wolof',
        questionFr: 'Tapez "J\'habite à..." en Wolof',
        correctAnswer: 'Maa dëkk...',
        correctAnswerFr: 'Maa dëkk...'
      },
      {
        id: 'wo-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Wolof?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Wolof?',
        correctAnswer: 'Lu nga def?',
        correctAnswerFr: 'Lu nga def?',
        options: ['Lu nga def?', 'Jërejëf def?', 'Mangi dem def?', 'Baal ma def?']
      },
      {
        id: 'wo-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Wolof',
        questionFr: 'Tapez "Je suis étudiant" en Wolof',
        correctAnswer: 'Maa jàngalekat',
        correctAnswerFr: 'Maa jàngalekat'
      },
      {
        id: 'wo-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Wolof" in Wolof?',
        questionFr: 'Comment dit-on "J\'apprends le Wolof" en Wolof?',
        correctAnswer: 'Maa jàng Wolof',
        correctAnswerFr: 'Maa jàng Wolof',
        options: ['Maa jàng Wolof', 'Jërejëf Wolof', 'Mangi dem Wolof', 'Baal ma Wolof']
      },
      {
        id: 'wo-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Wolof" in Wolof',
        questionFr: 'Tapez "Je parle un peu Wolof" en Wolof',
        correctAnswer: 'Maa wax Wolof tuuti',
        correctAnswerFr: 'Maa wax Wolof tuuti'
      },
      {
        id: 'wo-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Wolof well" in Wolof?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Wolof" en Wolof?',
        correctAnswer: 'Dama waxul Wolof bu baax',
        correctAnswerFr: 'Dama waxul Wolof bu baax',
        options: ['Dama waxul Wolof bu baax', 'Jërejëf Wolof', 'Mangi dem Wolof', 'Baal ma Wolof']
      },
      {
        id: 'wo-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Wolof',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Wolof',
        correctAnswer: 'Danga ma jëkkal?',
        correctAnswerFr: 'Danga ma jëkkal?'
      },
      {
        id: 'wo-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Wolof?',
        questionFr: 'Comment dit-on "Bien sûr" en Wolof?',
        correctAnswer: 'Waaw',
        correctAnswerFr: 'Waaw',
        options: ['Waaw', 'Déedéet', 'Jërejëf', 'Baal ma']
      },
      {
        id: 'wo-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Wolof?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Wolof?',
        correctAnswer: 'Maa soxla jëkkal',
        correctAnswerFr: 'Maa soxla jëkkal',
        options: ['Maa soxla jëkkal', 'Jërejëf jëkkal', 'Mangi dem jëkkal', 'Baal ma jëkkal']
      },
      {
        id: 'wo-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Wolof',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Wolof',
        correctAnswer: 'Danga ko jëkkal?',
        correctAnswerFr: 'Danga ko jëkkal?'
      },
      {
        id: 'wo-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Wolof?',
        questionFr: 'Comment dit-on "Parlez lentement" en Wolof?',
        correctAnswer: 'Wax tuuti',
        correctAnswerFr: 'Wax tuuti',
        options: ['Wax tuuti', 'Wax jërejëf', 'Wax mangi dem', 'Wax baal ma']
      },
      {
        id: 'wo-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Wolof',
        questionFr: 'Tapez "Je comprends" en Wolof',
        correctAnswer: 'Dama xam',
        correctAnswerFr: 'Dama xam'
      },
      {
        id: 'wo-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Wolof?',
        questionFr: 'Comment dit-on "C\'est correct" en Wolof?',
        correctAnswer: 'Dëgg la',
        correctAnswerFr: 'Dëgg la',
        options: ['Dëgg la', 'Genn la', 'Jërejëf', 'Baal ma']
      }
    ]
  }
];
