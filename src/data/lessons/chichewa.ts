import { Lesson } from '../../types';

export const chichewaLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'ny-vocab-1-1',
    stageId: 'chichewa-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'ny-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Chichewa?',
        questionFr: 'Comment dit-on "Bonjour" en Chichewa?',
        correctAnswer: 'Moni',
        correctAnswerFr: 'Moni',
        options: ['Moni', 'Pitani bwino', 'Zikomo', 'Chonde']
      },
      {
        id: 'ny-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Moni" mean?',
        questionFr: 'Que signifie "Moni"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'ny-v1-1-3',
        type: 'type-answer',
        question: 'Type the Chichewa word for "Goodbye"',
        questionFr: 'Tapez le mot Chichewa pour "Au revoir"',
        correctAnswer: 'Pitani bwino',
        correctAnswerFr: 'Pitani bwino'
      },
      {
        id: 'ny-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Chichewa?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Chichewa?',
        correctAnswer: 'Moni',
        correctAnswerFr: 'Moni',
        options: ['Moni', 'Mwaswera bwanji', 'Pitani bwino', 'Zikomo']
      },
      {
        id: 'ny-v1-1-5',
        type: 'multiple-choice',
        question: '"Muli bwanji?" means:',
        questionFr: '"Muli bwanji?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'ny-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Chichewa',
        questionFr: 'Tapez "Merci" en Chichewa',
        correctAnswer: 'Zikomo',
        correctAnswerFr: 'Zikomo'
      },
      {
        id: 'ny-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Chichewa?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Chichewa?',
        correctAnswer: 'Chonde',
        correctAnswerFr: 'Chonde',
        options: ['Chonde', 'Zikomo', 'Pitani bwino', 'Moni']
      },
      {
        id: 'ny-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Muli bwanji?"?',
        questionFr: 'Comment répondez-vous à "Muli bwanji?"?',
        correctAnswer: 'Ndili bwino',
        correctAnswerFr: 'Ndili bwino',
        options: ['Ndili bwino', 'Moni', 'Pitani bwino', 'Zikomo']
      },
      {
        id: 'ny-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Chichewa',
        questionFr: 'Tapez "Excusez-moi" en Chichewa',
        correctAnswer: 'Pepani',
        correctAnswerFr: 'Pepani'
      },
      {
        id: 'ny-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Chichewa?',
        questionFr: 'Comment dit-on "Désolé" en Chichewa?',
        correctAnswer: 'Pepani',
        correctAnswerFr: 'Pepani',
        options: ['Pepani', 'Zikomo', 'Chonde', 'Pitani bwino']
      },
      {
        id: 'ny-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Chichewa?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Chichewa?',
        correctAnswer: 'Zikomo',
        correctAnswerFr: 'Zikomo',
        options: ['Zikomo', 'Muli bwanji?', 'Moni', 'Pitani bwino']
      },
      {
        id: 'ny-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Chichewa',
        questionFr: 'Tapez "À bientôt" en Chichewa',
        correctAnswer: 'Tiwonana',
        correctAnswerFr: 'Tiwonana'
      },
      {
        id: 'ny-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Chichewa?',
        questionFr: 'Comment dit-on "De rien" en Chichewa?',
        correctAnswer: 'Zikomo',
        correctAnswerFr: 'Zikomo',
        options: ['Zikomo', 'Chonde', 'Pepani', 'Moni']
      },
      {
        id: 'ny-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Chichewa?',
        questionFr: 'Comment dit-on "Bonsoir" en Chichewa?',
        correctAnswer: 'Moni',
        correctAnswerFr: 'Moni',
        options: ['Moni', 'Mwaswera bwanji', 'Pitani bwino', 'Zikomo']
      },
      {
        id: 'ny-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Chichewa',
        questionFr: 'Tapez "Bonne nuit" en Chichewa',
        correctAnswer: 'Pitani bwino',
        correctAnswerFr: 'Pitani bwino'
      },
      {
        id: 'ny-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Chichewa?',
        questionFr: 'Comment dit-on "Oui" en Chichewa?',
        correctAnswer: 'Inde',
        correctAnswerFr: 'Inde',
        options: ['Inde', 'Ayi', 'Zikomo', 'Moni']
      },
      {
        id: 'ny-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Chichewa?',
        questionFr: 'Comment dit-on "Non" en Chichewa?',
        correctAnswer: 'Ayi',
        correctAnswerFr: 'Ayi',
        options: ['Ayi', 'Inde', 'Pitani bwino', 'Chonde']
      },
      {
        id: 'ny-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Chichewa',
        questionFr: 'Tapez "Peut-être" en Chichewa',
        correctAnswer: 'Mwina',
        correctAnswerFr: 'Mwina'
      },
      {
        id: 'ny-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Chichewa?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Chichewa?',
        correctAnswer: 'Sindimvetsa',
        correctAnswerFr: 'Sindimvetsa',
        options: ['Sindimvetsa', 'Zikomo', 'Pitani bwino', 'Pepani']
      },
      {
        id: 'ny-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Chichewa?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Chichewa?',
        correctAnswer: 'Sindikudziwa',
        correctAnswerFr: 'Sindikudziwa',
        options: ['Sindikudziwa', 'Zikomo', 'Pitani bwino', 'Pepani']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'ny-vocab-1-2',
    stageId: 'chichewa-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'ny-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Chichewa?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Chichewa?',
        correctAnswer: 'Dzina lako ndani?',
        correctAnswerFr: 'Dzina lako ndani?',
        options: ['Dzina lako ndani?', 'Zikomo ndani?', 'Pitani bwino ndani?', 'Chonde ndani?']
      },
      {
        id: 'ny-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Chichewa',
        questionFr: 'Tapez "Je m\'appelle..." en Chichewa',
        correctAnswer: 'Dzina langa ndi...',
        correctAnswerFr: 'Dzina langa ndi...'
      },
      {
        id: 'ny-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Chichewa?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Chichewa?',
        correctAnswer: 'Mumachokera kuti?',
        correctAnswerFr: 'Mumachokera kuti?',
        options: ['Mumachokera kuti?', 'Zikomo kuti?', 'Pitani bwino kuti?', 'Chonde kuti?']
      },
      {
        id: 'ny-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Chichewa',
        questionFr: 'Tapez "Je viens de..." en Chichewa',
        correctAnswer: 'Ndachokera...',
        correctAnswerFr: 'Ndachokera...'
      },
      {
        id: 'ny-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Chichewa?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Chichewa?',
        correctAnswer: 'Muli ndi zaka zingati?',
        correctAnswerFr: 'Muli ndi zaka zingati?',
        options: ['Muli ndi zaka zingati?', 'Zikomo zaka?', 'Pitani bwino zaka?', 'Chonde zaka?']
      },
      {
        id: 'ny-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Chichewa',
        questionFr: 'Tapez "J\'ai ... ans" en Chichewa',
        correctAnswer: 'Ndili ndi zaka...',
        correctAnswerFr: 'Ndili ndi zaka...'
      },
      {
        id: 'ny-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Chichewa?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Chichewa?',
        correctAnswer: 'Mumakhala kuti?',
        correctAnswerFr: 'Mumakhala kuti?',
        options: ['Mumakhala kuti?', 'Zikomo kuti?', 'Pitani bwino kuti?', 'Chonde kuti?']
      },
      {
        id: 'ny-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Chichewa',
        questionFr: 'Tapez "J\'habite à..." en Chichewa',
        correctAnswer: 'Ndimakhala...',
        correctAnswerFr: 'Ndimakhala...'
      },
      {
        id: 'ny-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Chichewa?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Chichewa?',
        correctAnswer: 'Mumachita chiyani?',
        correctAnswerFr: 'Mumachita chiyani?',
        options: ['Mumachita chiyani?', 'Zikomo chiyani?', 'Pitani bwino chiyani?', 'Chonde chiyani?']
      },
      {
        id: 'ny-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Chichewa',
        questionFr: 'Tapez "Je suis étudiant" en Chichewa',
        correctAnswer: 'Ndili wophunzira',
        correctAnswerFr: 'Ndili wophunzira'
      },
      {
        id: 'ny-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Chichewa" in Chichewa?',
        questionFr: 'Comment dit-on "J\'apprends le Chichewa" en Chichewa?',
        correctAnswer: 'Ndikupanga kuphunzira Chichewa',
        correctAnswerFr: 'Ndikupanga kuphunzira Chichewa',
        options: ['Ndikupanga kuphunzira Chichewa', 'Zikomo Chichewa', 'Pitani bwino Chichewa', 'Chonde Chichewa']
      },
      {
        id: 'ny-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Chichewa" in Chichewa',
        questionFr: 'Tapez "Je parle un peu Chichewa" en Chichewa',
        correctAnswer: 'Ndimayankhula Chichewa pang\'ono',
        correctAnswerFr: 'Ndimayankhula Chichewa pang\'ono'
      },
      {
        id: 'ny-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Chichewa well" in Chichewa?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Chichewa" en Chichewa?',
        correctAnswer: 'Sindimayankhula Chichewa bwino',
        correctAnswerFr: 'Sindimayankhula Chichewa bwino',
        options: ['Sindimayankhula Chichewa bwino', 'Zikomo Chichewa', 'Pitani bwino Chichewa', 'Chonde Chichewa']
      },
      {
        id: 'ny-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Chichewa',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Chichewa',
        correctAnswer: 'Mungandithandize?',
        correctAnswerFr: 'Mungandithandize?'
      },
      {
        id: 'ny-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Chichewa?',
        questionFr: 'Comment dit-on "Bien sûr" en Chichewa?',
        correctAnswer: 'Inde',
        correctAnswerFr: 'Inde',
        options: ['Inde', 'Ayi', 'Zikomo', 'Chonde']
      },
      {
        id: 'ny-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Chichewa?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Chichewa?',
        correctAnswer: 'Ndikufuna thandizo',
        correctAnswerFr: 'Ndikufuna thandizo',
        options: ['Ndikufuna thandizo', 'Zikomo thandizo', 'Pitani bwino thandizo', 'Chonde thandizo']
      },
      {
        id: 'ny-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Chichewa',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Chichewa',
        correctAnswer: 'Mungachitenso?',
        correctAnswerFr: 'Mungachitenso?'
      },
      {
        id: 'ny-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Chichewa?',
        questionFr: 'Comment dit-on "Parlez lentement" en Chichewa?',
        correctAnswer: 'Yankhula pang\'ono',
        correctAnswerFr: 'Yankhula pang\'ono',
        options: ['Yankhula pang\'ono', 'Yankhula zikomo', 'Yankhula pitani bwino', 'Yankhula chonde']
      },
      {
        id: 'ny-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Chichewa',
        questionFr: 'Tapez "Je comprends" en Chichewa',
        correctAnswer: 'Ndimvetsa',
        correctAnswerFr: 'Ndimvetsa'
      },
      {
        id: 'ny-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Chichewa?',
        questionFr: 'Comment dit-on "C\'est correct" en Chichewa?',
        correctAnswer: 'Ndizolondola',
        correctAnswerFr: 'Ndizolondola',
        options: ['Ndizolondola', 'Sizolondola', 'Zikomo', 'Chonde']
      }
    ]
  }
];
