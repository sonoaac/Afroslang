import { Lesson } from '../../types';

export const lingalaLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'li-vocab-1-1',
    stageId: 'lingala-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'li-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Lingala?',
        questionFr: 'Comment dit-on "Bonjour" en Lingala?',
        correctAnswer: 'Mbote',
        correctAnswerFr: 'Mbote',
        options: ['Mbote', 'Tosepeli', 'Tokomonana', 'Nakosepela']
      },
      {
        id: 'li-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Mbote" mean?',
        questionFr: 'Que signifie "Mbote"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'li-v1-1-3',
        type: 'type-answer',
        question: 'Type the Lingala word for "Goodbye"',
        questionFr: 'Tapez le mot Lingala pour "Au revoir"',
        correctAnswer: 'Tokomonana',
        correctAnswerFr: 'Tokomonana'
      },
      {
        id: 'li-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Lingala?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Lingala?',
        correctAnswer: 'Mbote',
        correctAnswerFr: 'Mbote',
        options: ['Mbote', 'Tosepeli', 'Tokomonana', 'Nakosepela']
      },
      {
        id: 'li-v1-1-5',
        type: 'multiple-choice',
        question: '"Tosepeli" means:',
        questionFr: '"Tosepeli" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'li-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Lingala',
        questionFr: 'Tapez "Merci" en Lingala',
        correctAnswer: 'Nakosepela',
        correctAnswerFr: 'Nakosepela'
      },
      {
        id: 'li-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Lingala?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Lingala?',
        correctAnswer: 'Palado',
        correctAnswerFr: 'Palado',
        options: ['Palado', 'Nakosepela', 'Tokomonana', 'Mbote']
      },
      {
        id: 'li-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Tosepeli"?',
        questionFr: 'Comment répondez-vous à "Tosepeli"?',
        correctAnswer: 'Nazali malamu',
        correctAnswerFr: 'Nazali malamu',
        options: ['Nazali malamu', 'Mbote', 'Tokomonana', 'Nakosepela']
      },
      {
        id: 'li-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Lingala',
        questionFr: 'Tapez "Excusez-moi" en Lingala',
        correctAnswer: 'Limbolo',
        correctAnswerFr: 'Limbolo'
      },
      {
        id: 'li-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Lingala?',
        questionFr: 'Comment dit-on "Désolé" en Lingala?',
        correctAnswer: 'Limbolo',
        correctAnswerFr: 'Limbolo',
        options: ['Limbolo', 'Nakosepela', 'Palado', 'Tokomonana']
      },
      {
        id: 'li-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Lingala?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Lingala?',
        correctAnswer: 'Nakosepela',
        correctAnswerFr: 'Nakosepela',
        options: ['Nakosepela', 'Tosepeli', 'Mbote', 'Tokomonana']
      },
      {
        id: 'li-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Lingala',
        questionFr: 'Tapez "À bientôt" en Lingala',
        correctAnswer: 'Tokomonana',
        correctAnswerFr: 'Tokomonana'
      },
      {
        id: 'li-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Lingala?',
        questionFr: 'Comment dit-on "De rien" en Lingala?',
        correctAnswer: 'Nakosepela',
        correctAnswerFr: 'Nakosepela',
        options: ['Nakosepela', 'Palado', 'Limbolo', 'Mbote']
      },
      {
        id: 'li-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Lingala?',
        questionFr: 'Comment dit-on "Bonsoir" en Lingala?',
        correctAnswer: 'Mbote',
        correctAnswerFr: 'Mbote',
        options: ['Mbote', 'Tosepeli', 'Tokomonana', 'Nakosepela']
      },
      {
        id: 'li-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Lingala',
        questionFr: 'Tapez "Bonne nuit" en Lingala',
        correctAnswer: 'Tokomonana',
        correctAnswerFr: 'Tokomonana'
      },
      {
        id: 'li-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Lingala?',
        questionFr: 'Comment dit-on "Oui" en Lingala?',
        correctAnswer: 'Iyo',
        correctAnswerFr: 'Iyo',
        options: ['Iyo', 'Te', 'Nakosepela', 'Mbote']
      },
      {
        id: 'li-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Lingala?',
        questionFr: 'Comment dit-on "Non" en Lingala?',
        correctAnswer: 'Te',
        correctAnswerFr: 'Te',
        options: ['Te', 'Iyo', 'Tokomonana', 'Palado']
      },
      {
        id: 'li-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Lingala',
        questionFr: 'Tapez "Peut-être" en Lingala',
        correctAnswer: 'Mbala',
        correctAnswerFr: 'Mbala'
      },
      {
        id: 'li-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Lingala?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Lingala?',
        correctAnswer: 'Nakokutana te',
        correctAnswerFr: 'Nakokutana te',
        options: ['Nakokutana te', 'Nakosepela te', 'Tokomonana te', 'Limbolo te']
      },
      {
        id: 'li-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Lingala?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Lingala?',
        correctAnswer: 'Nayebi te',
        correctAnswerFr: 'Nayebi te',
        options: ['Nayebi te', 'Nakosepela te', 'Tokomonana te', 'Limbolo te']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'li-vocab-1-2',
    stageId: 'lingala-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'li-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Lingala?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Lingala?',
        correctAnswer: 'Nkombo na yo nani?',
        correctAnswerFr: 'Nkombo na yo nani?',
        options: ['Nkombo na yo nani?', 'Nakosepela nani?', 'Tokomonana nani?', 'Palado nani?']
      },
      {
        id: 'li-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Lingala',
        questionFr: 'Tapez "Je m\'appelle..." en Lingala',
        correctAnswer: 'Nkombo na ngai...',
        correctAnswerFr: 'Nkombo na ngai...'
      },
      {
        id: 'li-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Lingala?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Lingala?',
        correctAnswer: 'Outi wapi?',
        correctAnswerFr: 'Outi wapi?',
        options: ['Outi wapi?', 'Nakosepela wapi?', 'Tokomonana wapi?', 'Palado wapi?']
      },
      {
        id: 'li-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Lingala',
        questionFr: 'Tapez "Je viens de..." en Lingala',
        correctAnswer: 'Nazali uti...',
        correctAnswerFr: 'Nazali uti...'
      },
      {
        id: 'li-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Lingala?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Lingala?',
        correctAnswer: 'Ozali na mbula boni?',
        correctAnswerFr: 'Ozali na mbula boni?',
        options: ['Ozali na mbula boni?', 'Nakosepela boni?', 'Tokomonana boni?', 'Palado boni?']
      },
      {
        id: 'li-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Lingala',
        questionFr: 'Tapez "J\'ai ... ans" en Lingala',
        correctAnswer: 'Nazali na mbula...',
        correctAnswerFr: 'Nazali na mbula...'
      },
      {
        id: 'li-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Lingala?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Lingala?',
        correctAnswer: 'Ofandaka wapi?',
        correctAnswerFr: 'Ofandaka wapi?',
        options: ['Ofandaka wapi?', 'Nakosepela wapi?', 'Tokomonana wapi?', 'Palado wapi?']
      },
      {
        id: 'li-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Lingala',
        questionFr: 'Tapez "J\'habite à..." en Lingala',
        correctAnswer: 'Nafandaka na...',
        correctAnswerFr: 'Nafandaka na...'
      },
      {
        id: 'li-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Lingala?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Lingala?',
        correctAnswer: 'Osalaka nini?',
        correctAnswerFr: 'Osalaka nini?',
        options: ['Osalaka nini?', 'Nakosepela nini?', 'Tokomonana nini?', 'Palado nini?']
      },
      {
        id: 'li-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Lingala',
        questionFr: 'Tapez "Je suis étudiant" en Lingala',
        correctAnswer: 'Nazali mwana ya kelasi',
        correctAnswerFr: 'Nazali mwana ya kelasi'
      },
      {
        id: 'li-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Lingala" in Lingala?',
        questionFr: 'Comment dit-on "J\'apprends le Lingala" en Lingala?',
        correctAnswer: 'Nakoyekola Lingala',
        correctAnswerFr: 'Nakoyekola Lingala',
        options: ['Nakoyekola Lingala', 'Nakosepela Lingala', 'Tokomonana Lingala', 'Palado Lingala']
      },
      {
        id: 'li-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Lingala" in Lingala',
        questionFr: 'Tapez "Je parle un peu Lingala" en Lingala',
        correctAnswer: 'Nalobaka Lingala moke',
        correctAnswerFr: 'Nalobaka Lingala moke'
      },
      {
        id: 'li-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Lingala well" in Lingala?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Lingala" en Lingala?',
        correctAnswer: 'Nalobaka Lingala malamu te',
        correctAnswerFr: 'Nalobaka Lingala malamu te',
        options: ['Nalobaka Lingala malamu te', 'Nakosepela Lingala te', 'Tokomonana Lingala te', 'Palado Lingala te']
      },
      {
        id: 'li-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Lingala',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Lingala',
        correctAnswer: 'Okoki kosalisa ngai?',
        correctAnswerFr: 'Okoki kosalisa ngai?'
      },
      {
        id: 'li-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Lingala?',
        questionFr: 'Comment dit-on "Bien sûr" en Lingala?',
        correctAnswer: 'Iyo',
        correctAnswerFr: 'Iyo',
        options: ['Iyo', 'Te', 'Nakosepela', 'Palado']
      },
      {
        id: 'li-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Lingala?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Lingala?',
        correctAnswer: 'Nazali na bosalisi',
        correctAnswerFr: 'Nazali na bosalisi',
        options: ['Nazali na bosalisi', 'Nakosepela bosalisi', 'Tokomonana bosalisi', 'Palado bosalisi']
      },
      {
        id: 'li-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Lingala',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Lingala',
        correctAnswer: 'Okoki koloba lisusu?',
        correctAnswerFr: 'Okoki koloba lisusu?'
      },
      {
        id: 'li-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Lingala?',
        questionFr: 'Comment dit-on "Parlez lentement" en Lingala?',
        correctAnswer: 'Loba malembe',
        correctAnswerFr: 'Loba malembe',
        options: ['Loba malembe', 'Loba nakosepela', 'Loba tokomonana', 'Loba palado']
      },
      {
        id: 'li-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Lingala',
        questionFr: 'Tapez "Je comprends" en Lingala',
        correctAnswer: 'Nakokutana',
        correctAnswerFr: 'Nakokutana'
      },
      {
        id: 'li-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Lingala?',
        questionFr: 'Comment dit-on "C\'est correct" en Lingala?',
        correctAnswer: 'Iyo',
        correctAnswerFr: 'Iyo',
        options: ['Iyo', 'Te', 'Nakosepela', 'Palado']
      }
    ]
  }
];
