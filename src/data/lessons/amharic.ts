import { Lesson } from '../../types';

export const amharicLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'am-vocab-1-1',
    stageId: 'amharic-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'am-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Amharic?',
        questionFr: 'Comment dit-on "Bonjour" en Amharique?',
        correctAnswer: 'Selam',
        correctAnswerFr: 'Selam',
        options: ['Selam', 'Dehna hun', 'Ameseginalehu', 'Ebakeh']
      },
      {
        id: 'am-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Selam" mean?',
        questionFr: 'Que signifie "Selam"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'am-v1-1-3',
        type: 'type-answer',
        question: 'Type the Amharic word for "Goodbye"',
        questionFr: 'Tapez le mot Amharique pour "Au revoir"',
        correctAnswer: 'Dehna hun',
        correctAnswerFr: 'Dehna hun'
      },
      {
        id: 'am-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Amharic?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Amharique?',
        correctAnswer: 'Endemin aderu',
        correctAnswerFr: 'Endemin aderu',
        options: ['Endemin aderu', 'Endemin amesh', 'Endemin adersh', 'Selam']
      },
      {
        id: 'am-v1-1-5',
        type: 'multiple-choice',
        question: '"Endemin neh?" means:',
        questionFr: '"Endemin neh?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'am-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Amharic',
        questionFr: 'Tapez "Merci" en Amharique',
        correctAnswer: 'Ameseginalehu',
        correctAnswerFr: 'Ameseginalehu'
      },
      {
        id: 'am-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Amharic?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Amharique?',
        correctAnswer: 'Ebakeh',
        correctAnswerFr: 'Ebakeh',
        options: ['Ebakeh', 'Ameseginalehu', 'Dehna hun', 'Selam']
      },
      {
        id: 'am-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Endemin neh?"?',
        questionFr: 'Comment répondez-vous à "Endemin neh?"?',
        correctAnswer: 'Dehna neh',
        correctAnswerFr: 'Dehna neh',
        options: ['Dehna neh', 'Selam', 'Dehna hun', 'Ameseginalehu']
      },
      {
        id: 'am-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Amharic',
        questionFr: 'Tapez "Excusez-moi" en Amharique',
        correctAnswer: 'Aznallo',
        correctAnswerFr: 'Aznallo'
      },
      {
        id: 'am-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Amharic?',
        questionFr: 'Comment dit-on "Désolé" en Amharique?',
        correctAnswer: 'Aznallo',
        correctAnswerFr: 'Aznallo',
        options: ['Aznallo', 'Ameseginalehu', 'Ebakeh', 'Dehna hun']
      },
      {
        id: 'am-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Amharic?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Amharique?',
        correctAnswer: 'Ameseginalehu',
        correctAnswerFr: 'Ameseginalehu',
        options: ['Ameseginalehu', 'Endemin neh?', 'Selam', 'Dehna hun']
      },
      {
        id: 'am-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Amharic',
        questionFr: 'Tapez "À bientôt" en Amharique',
        correctAnswer: 'Yihun',
        correctAnswerFr: 'Yihun'
      },
      {
        id: 'am-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Amharic?',
        questionFr: 'Comment dit-on "De rien" en Amharique?',
        correctAnswer: 'Ameseginalehu',
        correctAnswerFr: 'Ameseginalehu',
        options: ['Ameseginalehu', 'Ebakeh', 'Aznallo', 'Selam']
      },
      {
        id: 'am-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Amharic?',
        questionFr: 'Comment dit-on "Bonsoir" en Amharique?',
        correctAnswer: 'Endemin amesh',
        correctAnswerFr: 'Endemin amesh',
        options: ['Endemin amesh', 'Endemin aderu', 'Endemin adersh', 'Selam']
      },
      {
        id: 'am-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Amharic',
        questionFr: 'Tapez "Bonne nuit" en Amharique',
        correctAnswer: 'Endemin aderu',
        correctAnswerFr: 'Endemin aderu'
      },
      {
        id: 'am-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Amharic?',
        questionFr: 'Comment dit-on "Oui" en Amharique?',
        correctAnswer: 'Awo',
        correctAnswerFr: 'Awo',
        options: ['Awo', 'Ay', 'Ameseginalehu', 'Selam']
      },
      {
        id: 'am-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Amharic?',
        questionFr: 'Comment dit-on "Non" en Amharique?',
        correctAnswer: 'Ay',
        correctAnswerFr: 'Ay',
        options: ['Ay', 'Awo', 'Dehna hun', 'Ebakeh']
      },
      {
        id: 'am-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Amharic',
        questionFr: 'Tapez "Peut-être" en Amharique',
        correctAnswer: 'Yihun',
        correctAnswerFr: 'Yihun'
      },
      {
        id: 'am-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Amharic?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Amharique?',
        correctAnswer: 'Algebagn',
        correctAnswerFr: 'Algebagn',
        options: ['Algebagn', 'Ameseginalehu', 'Dehna hun', 'Aznallo']
      },
      {
        id: 'am-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Amharic?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Amharique?',
        correctAnswer: 'Algebagn',
        correctAnswerFr: 'Algebagn',
        options: ['Algebagn', 'Ameseginalehu', 'Dehna hun', 'Aznallo']
      }
    ]
  },
  // Stage 1, Lesson 2: Common Phrases
  {
    id: 'am-vocab-1-2',
    stageId: 'amharic-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'am-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Amharic?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Amharique?',
        correctAnswer: 'Simeh man naw?',
        correctAnswerFr: 'Simeh man naw?',
        options: ['Simeh man naw?', 'Ameseginalehu man?', 'Dehna hun man?', 'Ebakeh man?']
      },
      {
        id: 'am-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Amharic',
        questionFr: 'Tapez "Je m\'appelle..." en Amharique',
        correctAnswer: 'Simeh... naw',
        correctAnswerFr: 'Simeh... naw'
      },
      {
        id: 'am-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Amharic?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Amharique?',
        correctAnswer: 'Ke man naw?',
        correctAnswerFr: 'Ke man naw?',
        options: ['Ke man naw?', 'Ameseginalehu man?', 'Dehna hun man?', 'Ebakeh man?']
      },
      {
        id: 'am-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Amharic',
        questionFr: 'Tapez "Je viens de..." en Amharique',
        correctAnswer: 'Ke... naw',
        correctAnswerFr: 'Ke... naw'
      },
      {
        id: 'am-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Amharic?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Amharique?',
        correctAnswer: 'Ante temen naw?',
        correctAnswerFr: 'Ante temen naw?',
        options: ['Ante temen naw?', 'Ameseginalehu temen?', 'Dehna hun temen?', 'Ebakeh temen?']
      },
      {
        id: 'am-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Amharic',
        questionFr: 'Tapez "J\'ai ... ans" en Amharique',
        correctAnswer: 'Ene... temen naw',
        correctAnswerFr: 'Ene... temen naw'
      },
      {
        id: 'am-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Amharic?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Amharique?',
        correctAnswer: 'Ke man naw?',
        correctAnswerFr: 'Ke man naw?',
        options: ['Ke man naw?', 'Ameseginalehu man?', 'Dehna hun man?', 'Ebakeh man?']
      },
      {
        id: 'am-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Amharic',
        questionFr: 'Tapez "J\'habite à..." en Amharique',
        correctAnswer: 'Ene... naw',
        correctAnswerFr: 'Ene... naw'
      },
      {
        id: 'am-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Amharic?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Amharique?',
        correctAnswer: 'Ante min naw?',
        correctAnswerFr: 'Ante min naw?',
        options: ['Ante min naw?', 'Ameseginalehu min?', 'Dehna hun min?', 'Ebakeh min?']
      },
      {
        id: 'am-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Amharic',
        questionFr: 'Tapez "Je suis étudiant" en Amharique',
        correctAnswer: 'Ene temari naw',
        correctAnswerFr: 'Ene temari naw'
      },
      {
        id: 'am-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Amharic" in Amharic?',
        questionFr: 'Comment dit-on "J\'apprends l\'Amharique" en Amharique?',
        correctAnswer: 'Ene Amharic temari naw',
        correctAnswerFr: 'Ene Amharic temari naw',
        options: ['Ene Amharic temari naw', 'Ameseginalehu Amharic', 'Dehna hun Amharic', 'Ebakeh Amharic']
      },
      {
        id: 'am-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Amharic" in Amharic',
        questionFr: 'Tapez "Je parle un peu Amharique" en Amharique',
        correctAnswer: 'Ene Amharic tichil naw',
        correctAnswerFr: 'Ene Amharic tichil naw'
      },
      {
        id: 'am-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Amharic well" in Amharic?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Amharique" en Amharique?',
        correctAnswer: 'Ene Amharic tichil naw',
        correctAnswerFr: 'Ene Amharic tichil naw',
        options: ['Ene Amharic tichil naw', 'Ameseginalehu Amharic', 'Dehna hun Amharic', 'Ebakeh Amharic']
      },
      {
        id: 'am-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Amharic',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Amharique',
        correctAnswer: 'Ante lege naw?',
        correctAnswerFr: 'Ante lege naw?'
      },
      {
        id: 'am-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Amharic?',
        questionFr: 'Comment dit-on "Bien sûr" en Amharique?',
        correctAnswer: 'Awo',
        correctAnswerFr: 'Awo',
        options: ['Awo', 'Ay', 'Ameseginalehu', 'Ebakeh']
      },
      {
        id: 'am-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Amharic?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Amharique?',
        correctAnswer: 'Ene lege naw',
        correctAnswerFr: 'Ene lege naw',
        options: ['Ene lege naw', 'Ameseginalehu lege', 'Dehna hun lege', 'Ebakeh lege']
      },
      {
        id: 'am-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Amharic',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Amharique',
        correctAnswer: 'Ante asan naw?',
        correctAnswerFr: 'Ante asan naw?'
      },
      {
        id: 'am-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Amharic?',
        questionFr: 'Comment dit-on "Parlez lentement" en Amharique?',
        correctAnswer: 'Tichil naw',
        correctAnswerFr: 'Tichil naw',
        options: ['Tichil naw', 'Tichil ameseginalehu', 'Tichil dehna hun', 'Tichil ebakeh']
      },
      {
        id: 'am-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Amharic',
        questionFr: 'Tapez "Je comprends" en Amharique',
        correctAnswer: 'Ene gebagn naw',
        correctAnswerFr: 'Ene gebagn naw'
      },
      {
        id: 'am-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Amharic?',
        questionFr: 'Comment dit-on "C\'est correct" en Amharique?',
        correctAnswer: 'Awo',
        correctAnswerFr: 'Awo',
        options: ['Awo', 'Ay', 'Ameseginalehu', 'Ebakeh']
      }
    ]
  }
];
