import { Lesson } from '../../types';

export const mooreLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'mo-vocab-1-1',
    stageId: 'moore-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'mo-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Moore?',
        questionFr: 'Comment dit-on "Bonjour" en Moore?',
        correctAnswer: 'Ne y yibeogo',
        correctAnswerFr: 'Ne y yibeogo',
        options: ['Ne y yibeogo', 'Laafi beeme', 'Wend na', 'Barka']
      },
      {
        id: 'mo-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Ne y yibeogo" mean?',
        questionFr: 'Que signifie "Ne y yibeogo"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'mo-v1-1-3',
        type: 'type-answer',
        question: 'Type the Moore word for "Goodbye"',
        questionFr: 'Tapez le mot Moore pour "Au revoir"',
        correctAnswer: 'Wend na',
        correctAnswerFr: 'Wend na'
      },
      {
        id: 'mo-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Moore?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Moore?',
        correctAnswer: 'Ne y yibeogo',
        correctAnswerFr: 'Ne y yibeogo',
        options: ['Ne y yibeogo', 'Laafi beeme', 'Wend na', 'Barka']
      },
      {
        id: 'mo-v1-1-5',
        type: 'multiple-choice',
        question: '"Laafi beeme" means:',
        questionFr: '"Laafi beeme" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'mo-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Moore',
        questionFr: 'Tapez "Merci" en Moore',
        correctAnswer: 'Barka',
        correctAnswerFr: 'Barka'
      },
      {
        id: 'mo-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Moore?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Moore?',
        correctAnswer: 'Tõnd na',
        correctAnswerFr: 'Tõnd na',
        options: ['Tõnd na', 'Barka', 'Wend na', 'Ne y yibeogo']
      },
      {
        id: 'mo-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Laafi beeme"?',
        questionFr: 'Comment répondez-vous à "Laafi beeme"?',
        correctAnswer: 'Laafi bala',
        correctAnswerFr: 'Laafi bala',
        options: ['Laafi bala', 'Ne y yibeogo', 'Wend na', 'Barka']
      },
      {
        id: 'mo-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Moore',
        questionFr: 'Tapez "Excusez-moi" en Moore',
        correctAnswer: 'Yãnga',
        correctAnswerFr: 'Yãnga'
      },
      {
        id: 'mo-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Moore?',
        questionFr: 'Comment dit-on "Désolé" en Moore?',
        correctAnswer: 'Yãnga',
        correctAnswerFr: 'Yãnga',
        options: ['Yãnga', 'Barka', 'Tõnd na', 'Wend na']
      },
      {
        id: 'mo-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Moore?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Moore?',
        correctAnswer: 'Ne y yibeogo',
        correctAnswerFr: 'Ne y yibeogo',
        options: ['Ne y yibeogo', 'Laafi beeme', 'Barka', 'Wend na']
      },
      {
        id: 'mo-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Moore',
        questionFr: 'Tapez "À bientôt" en Moore',
        correctAnswer: 'Wend na',
        correctAnswerFr: 'Wend na'
      },
      {
        id: 'mo-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Moore?',
        questionFr: 'Comment dit-on "De rien" en Moore?',
        correctAnswer: 'Barka',
        correctAnswerFr: 'Barka',
        options: ['Barka', 'Tõnd na', 'Yãnga', 'Ne y yibeogo']
      },
      {
        id: 'mo-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Moore?',
        questionFr: 'Comment dit-on "Bonsoir" en Moore?',
        correctAnswer: 'Ne y yibeogo',
        correctAnswerFr: 'Ne y yibeogo',
        options: ['Ne y yibeogo', 'Laafi beeme', 'Wend na', 'Barka']
      },
      {
        id: 'mo-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Moore',
        questionFr: 'Tapez "Bonne nuit" en Moore',
        correctAnswer: 'Wend na',
        correctAnswerFr: 'Wend na'
      },
      {
        id: 'mo-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Moore?',
        questionFr: 'Comment dit-on "Oui" en Moore?',
        correctAnswer: 'Ayo',
        correctAnswerFr: 'Ayo',
        options: ['Ayo', 'Ayi', 'Barka', 'Ne y yibeogo']
      },
      {
        id: 'mo-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Moore?',
        questionFr: 'Comment dit-on "Non" en Moore?',
        correctAnswer: 'Ayi',
        correctAnswerFr: 'Ayi',
        options: ['Ayi', 'Ayo', 'Wend na', 'Tõnd na']
      },
      {
        id: 'mo-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Moore',
        questionFr: 'Tapez "Peut-être" en Moore',
        correctAnswer: 'Bãnga',
        correctAnswerFr: 'Bãnga'
      },
      {
        id: 'mo-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Moore?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Moore?',
        correctAnswer: 'Mam tõnd na',
        correctAnswerFr: 'Mam tõnd na',
        options: ['Mam tõnd na', 'Mam barka', 'Mam wend na', 'Mam yãnga']
      },
      {
        id: 'mo-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Moore?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Moore?',
        correctAnswer: 'Mam tõnd na',
        correctAnswerFr: 'Mam tõnd na',
        options: ['Mam tõnd na', 'Mam barka', 'Mam wend na', 'Mam yãnga']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'mo-vocab-1-2',
    stageId: 'moore-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'mo-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Moore?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Moore?',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?',
        options: ['Fõ yãnga?', 'Fõ barka?', 'Fõ wend na?', 'Fõ tõnd na?']
      },
      {
        id: 'mo-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Moore',
        questionFr: 'Tapez "Je m\'appelle..." en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Moore?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Moore?',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?',
        options: ['Fõ yãnga?', 'Fõ barka?', 'Fõ wend na?', 'Fõ tõnd na?']
      },
      {
        id: 'mo-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Moore',
        questionFr: 'Tapez "Je viens de..." en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Moore?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Moore?',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?',
        options: ['Fõ yãnga?', 'Fõ barka?', 'Fõ wend na?', 'Fõ tõnd na?']
      },
      {
        id: 'mo-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Moore',
        questionFr: 'Tapez "J\'ai ... ans" en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Moore?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Moore?',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?',
        options: ['Fõ yãnga?', 'Fõ barka?', 'Fõ wend na?', 'Fõ tõnd na?']
      },
      {
        id: 'mo-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Moore',
        questionFr: 'Tapez "J\'habite à..." en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Moore?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Moore?',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?',
        options: ['Fõ yãnga?', 'Fõ barka?', 'Fõ wend na?', 'Fõ tõnd na?']
      },
      {
        id: 'mo-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Moore',
        questionFr: 'Tapez "Je suis étudiant" en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Moore" in Moore?',
        questionFr: 'Comment dit-on "J\'apprends le Moore" en Moore?',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...',
        options: ['M yãnga...', 'M barka...', 'M wend na...', 'M tõnd na...']
      },
      {
        id: 'mo-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Moore" in Moore',
        questionFr: 'Tapez "Je parle un peu Moore" en Moore',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...'
      },
      {
        id: 'mo-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Moore well" in Moore?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Moore" en Moore?',
        correctAnswer: 'Mam tõnd na',
        correctAnswerFr: 'Mam tõnd na',
        options: ['Mam tõnd na', 'Mam barka', 'Mam wend na', 'Mam yãnga']
      },
      {
        id: 'mo-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Moore',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Moore',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?'
      },
      {
        id: 'mo-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Moore?',
        questionFr: 'Comment dit-on "Bien sûr" en Moore?',
        correctAnswer: 'Ayo',
        correctAnswerFr: 'Ayo',
        options: ['Ayo', 'Ayi', 'Barka', 'Tõnd na']
      },
      {
        id: 'mo-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Moore?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Moore?',
        correctAnswer: 'M yãnga...',
        correctAnswerFr: 'M yãnga...',
        options: ['M yãnga...', 'M barka...', 'M wend na...', 'M tõnd na...']
      },
      {
        id: 'mo-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Moore',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Moore',
        correctAnswer: 'Fõ yãnga?',
        correctAnswerFr: 'Fõ yãnga?'
      },
      {
        id: 'mo-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Moore?',
        questionFr: 'Comment dit-on "Parlez lentement" en Moore?',
        correctAnswer: 'Fõ yãnga',
        correctAnswerFr: 'Fõ yãnga',
        options: ['Fõ yãnga', 'Fõ barka', 'Fõ wend na', 'Fõ tõnd na']
      },
      {
        id: 'mo-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Moore',
        questionFr: 'Tapez "Je comprends" en Moore',
        correctAnswer: 'M tõnd na',
        correctAnswerFr: 'M tõnd na'
      },
      {
        id: 'mo-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Moore?',
        questionFr: 'Comment dit-on "C\'est correct" en Moore?',
        correctAnswer: 'Ayo',
        correctAnswerFr: 'Ayo',
        options: ['Ayo', 'Ayi', 'Barka', 'Tõnd na']
      }
    ]
  }
];
