import { Lesson } from '../../types';

export const shonaLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'sn-vocab-1-1',
    stageId: 'shona-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'sn-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Shona?',
        questionFr: 'Comment dit-on "Bonjour" en Shona?',
        correctAnswer: 'Mhoro',
        correctAnswerFr: 'Mhoro',
        options: ['Mhoro', 'Chisarai zvakanaka', 'Ndatenda', 'Ndapota']
      },
      {
        id: 'sn-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Mhoro" mean?',
        questionFr: 'Que signifie "Mhoro"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'sn-v1-1-3',
        type: 'type-answer',
        question: 'Type the Shona word for "Goodbye"',
        questionFr: 'Tapez le mot Shona pour "Au revoir"',
        correctAnswer: 'Chisarai zvakanaka',
        correctAnswerFr: 'Chisarai zvakanaka'
      },
      {
        id: 'sn-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Shona?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Shona?',
        correctAnswer: 'Mangwanani',
        correctAnswerFr: 'Mangwanani',
        options: ['Mangwanani', 'Masikati', 'Manheru', 'Mhoro']
      },
      {
        id: 'sn-v1-1-5',
        type: 'multiple-choice',
        question: '"Makadii?" means:',
        questionFr: '"Makadii?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'sn-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Shona',
        questionFr: 'Tapez "Merci" en Shona',
        correctAnswer: 'Ndatenda',
        correctAnswerFr: 'Ndatenda'
      },
      {
        id: 'sn-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Shona?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Shona?',
        correctAnswer: 'Ndapota',
        correctAnswerFr: 'Ndapota',
        options: ['Ndapota', 'Ndatenda', 'Chisarai zvakanaka', 'Mhoro']
      },
      {
        id: 'sn-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Makadii?"?',
        questionFr: 'Comment répondez-vous à "Makadii?"?',
        correctAnswer: 'Ndiripo',
        correctAnswerFr: 'Ndiripo',
        options: ['Ndiripo', 'Mhoro', 'Chisarai zvakanaka', 'Ndatenda']
      },
      {
        id: 'sn-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Shona',
        questionFr: 'Tapez "Excusez-moi" en Shona',
        correctAnswer: 'Ndine urombo',
        correctAnswerFr: 'Ndine urombo'
      },
      {
        id: 'sn-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Shona?',
        questionFr: 'Comment dit-on "Désolé" en Shona?',
        correctAnswer: 'Ndine urombo',
        correctAnswerFr: 'Ndine urombo',
        options: ['Ndine urombo', 'Ndatenda', 'Ndapota', 'Chisarai zvakanaka']
      },
      {
        id: 'sn-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Shona?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Shona?',
        correctAnswer: 'Ndatenda',
        correctAnswerFr: 'Ndatenda',
        options: ['Ndatenda', 'Makadii?', 'Mhoro', 'Chisarai zvakanaka']
      },
      {
        id: 'sn-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Shona',
        questionFr: 'Tapez "À bientôt" en Shona',
        correctAnswer: 'Tichaonana',
        correctAnswerFr: 'Tichaonana'
      },
      {
        id: 'sn-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Shona?',
        questionFr: 'Comment dit-on "De rien" en Shona?',
        correctAnswer: 'Ndatenda',
        correctAnswerFr: 'Ndatenda',
        options: ['Ndatenda', 'Ndapota', 'Ndine urombo', 'Mhoro']
      },
      {
        id: 'sn-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Shona?',
        questionFr: 'Comment dit-on "Bonsoir" en Shona?',
        correctAnswer: 'Manheru',
        correctAnswerFr: 'Manheru',
        options: ['Manheru', 'Mangwanani', 'Masikati', 'Mhoro']
      },
      {
        id: 'sn-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Shona',
        questionFr: 'Tapez "Bonne nuit" en Shona',
        correctAnswer: 'Rara zvakanaka',
        correctAnswerFr: 'Rara zvakanaka'
      },
      {
        id: 'sn-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Shona?',
        questionFr: 'Comment dit-on "Oui" en Shona?',
        correctAnswer: 'Hongu',
        correctAnswerFr: 'Hongu',
        options: ['Hongu', 'Kwete', 'Ndatenda', 'Mhoro']
      },
      {
        id: 'sn-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Shona?',
        questionFr: 'Comment dit-on "Non" en Shona?',
        correctAnswer: 'Kwete',
        correctAnswerFr: 'Kwete',
        options: ['Kwete', 'Hongu', 'Chisarai zvakanaka', 'Ndapota']
      },
      {
        id: 'sn-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Shona',
        questionFr: 'Tapez "Peut-être" en Shona',
        correctAnswer: 'Pamwe',
        correctAnswerFr: 'Pamwe'
      },
      {
        id: 'sn-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Shona?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Shona?',
        correctAnswer: 'Handinzwisise',
        correctAnswerFr: 'Handinzwisise',
        options: ['Handinzwisise', 'Ndatenda', 'Chisarai zvakanaka', 'Ndine urombo']
      },
      {
        id: 'sn-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Shona?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Shona?',
        correctAnswer: 'Handizivi',
        correctAnswerFr: 'Handizivi',
        options: ['Handizivi', 'Ndatenda', 'Chisarai zvakanaka', 'Ndine urombo']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'sn-vocab-1-2',
    stageId: 'shona-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'sn-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Shona?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Shona?',
        correctAnswer: 'Zita rako ndiani?',
        correctAnswerFr: 'Zita rako ndiani?',
        options: ['Zita rako ndiani?', 'Ndatenda ndiani?', 'Chisarai zvakanaka ndiani?', 'Ndapota ndiani?']
      },
      {
        id: 'sn-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Shona',
        questionFr: 'Tapez "Je m\'appelle..." en Shona',
        correctAnswer: 'Zita rangu ndi...',
        correctAnswerFr: 'Zita rangu ndi...'
      },
      {
        id: 'sn-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Shona?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Shona?',
        correctAnswer: 'Unobva kupi?',
        correctAnswerFr: 'Unobva kupi?',
        options: ['Unobva kupi?', 'Ndatenda kupi?', 'Chisarai zvakanaka kupi?', 'Ndapota kupi?']
      },
      {
        id: 'sn-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Shona',
        questionFr: 'Tapez "Je viens de..." en Shona',
        correctAnswer: 'Ndinobva...',
        correctAnswerFr: 'Ndinobva...'
      },
      {
        id: 'sn-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Shona?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Shona?',
        correctAnswer: 'Une makore mangani?',
        correctAnswerFr: 'Une makore mangani?',
        options: ['Une makore mangani?', 'Ndatenda makore?', 'Chisarai zvakanaka makore?', 'Ndapota makore?']
      },
      {
        id: 'sn-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Shona',
        questionFr: 'Tapez "J\'ai ... ans" en Shona',
        correctAnswer: 'Ndine makore...',
        correctAnswerFr: 'Ndine makore...'
      },
      {
        id: 'sn-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Shona?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Shona?',
        correctAnswer: 'Unogara kupi?',
        correctAnswerFr: 'Unogara kupi?',
        options: ['Unogara kupi?', 'Ndatenda kupi?', 'Chisarai zvakanaka kupi?', 'Ndapota kupi?']
      },
      {
        id: 'sn-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Shona',
        questionFr: 'Tapez "J\'habite à..." en Shona',
        correctAnswer: 'Ndinogara...',
        correctAnswerFr: 'Ndinogara...'
      },
      {
        id: 'sn-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Shona?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Shona?',
        correctAnswer: 'Unoita sei?',
        correctAnswerFr: 'Unoita sei?',
        options: ['Unoita sei?', 'Ndatenda sei?', 'Chisarai zvakanaka sei?', 'Ndapota sei?']
      },
      {
        id: 'sn-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Shona',
        questionFr: 'Tapez "Je suis étudiant" en Shona',
        correctAnswer: 'Ndiri mudzidzi',
        correctAnswerFr: 'Ndiri mudzidzi'
      },
      {
        id: 'sn-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Shona" in Shona?',
        questionFr: 'Comment dit-on "J\'apprends le Shona" en Shona?',
        correctAnswer: 'Ndiri kudzidza ChiShona',
        correctAnswerFr: 'Ndiri kudzidza ChiShona',
        options: ['Ndiri kudzidza ChiShona', 'Ndatenda ChiShona', 'Chisarai zvakanaka ChiShona', 'Ndapota ChiShona']
      },
      {
        id: 'sn-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Shona" in Shona',
        questionFr: 'Tapez "Je parle un peu Shona" en Shona',
        correctAnswer: 'Ndinotaura ChiShona zvishoma',
        correctAnswerFr: 'Ndinotaura ChiShona zvishoma'
      },
      {
        id: 'sn-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Shona well" in Shona?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Shona" en Shona?',
        correctAnswer: 'Handitauri ChiShona zvakanaka',
        correctAnswerFr: 'Handitauri ChiShona zvakanaka',
        options: ['Handitauri ChiShona zvakanaka', 'Ndatenda ChiShona', 'Chisarai zvakanaka ChiShona', 'Ndapota ChiShona']
      },
      {
        id: 'sn-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Shona',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Shona',
        correctAnswer: 'Unogona kundibatsira here?',
        correctAnswerFr: 'Unogona kundibatsira here?'
      },
      {
        id: 'sn-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Shona?',
        questionFr: 'Comment dit-on "Bien sûr" en Shona?',
        correctAnswer: 'Hongu',
        correctAnswerFr: 'Hongu',
        options: ['Hongu', 'Kwete', 'Ndatenda', 'Ndapota']
      },
      {
        id: 'sn-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Shona?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Shona?',
        correctAnswer: 'Ndiri kuda rubatsiro',
        correctAnswerFr: 'Ndiri kuda rubatsiro',
        options: ['Ndiri kuda rubatsiro', 'Ndatenda rubatsiro', 'Chisarai zvakanaka rubatsiro', 'Ndapota rubatsiro']
      },
      {
        id: 'sn-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Shona',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Shona',
        correctAnswer: 'Unogona kuzvidzokorora here?',
        correctAnswerFr: 'Unogona kuzvidzokorora here?'
      },
      {
        id: 'sn-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Shona?',
        questionFr: 'Comment dit-on "Parlez lentement" en Shona?',
        correctAnswer: 'Taura zvishoma',
        correctAnswerFr: 'Taura zvishoma',
        options: ['Taura zvishoma', 'Taura ndatenda', 'Taura chisarai zvakanaka', 'Taura ndapota']
      },
      {
        id: 'sn-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Shona',
        questionFr: 'Tapez "Je comprends" en Shona',
        correctAnswer: 'Ndinzwisisa',
        correctAnswerFr: 'Ndinzwisisa'
      },
      {
        id: 'sn-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Shona?',
        questionFr: 'Comment dit-on "C\'est correct" en Shona?',
        correctAnswer: 'Ndizvo',
        correctAnswerFr: 'Ndizvo',
        options: ['Ndizvo', 'Kwete', 'Ndatenda', 'Ndapota']
      }
    ]
  }
];
