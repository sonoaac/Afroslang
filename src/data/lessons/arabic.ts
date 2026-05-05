import { Lesson } from '../../types';

export const arabicLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'ar-vocab-1-1',
    stageId: 'arabic-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Arabic?',
        questionFr: 'Comment dit-on "Bonjour" en Arabe?',
        correctAnswer: 'Marhaba',
        correctAnswerFr: 'Marhaba',
        options: ['Marhaba', 'Ma\'a salama', 'Shukran', 'Min fadlak']
      },
      {
        id: 'ar-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Marhaba" mean?',
        questionFr: 'Que signifie "Marhaba"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'ar-v1-1-3',
        type: 'type-answer',
        question: 'Type the Arabic word for "Goodbye"',
        questionFr: 'Tapez le mot Arabe pour "Au revoir"',
        correctAnswer: 'Ma\'a salama',
        correctAnswerFr: 'Ma\'a salama'
      },
      {
        id: 'ar-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Arabic?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Arabe?',
        correctAnswer: 'Sabah al-khair',
        correctAnswerFr: 'Sabah al-khair',
        options: ['Sabah al-khair', 'Masa\' al-khair', 'Layla sa\'ida', 'Marhaba']
      },
      {
        id: 'ar-v1-1-5',
        type: 'multiple-choice',
        question: '"Kayf halak?" means:',
        questionFr: '"Kayf halak?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'ar-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Arabic',
        questionFr: 'Tapez "Merci" en Arabe',
        correctAnswer: 'Shukran',
        correctAnswerFr: 'Shukran'
      },
      {
        id: 'ar-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Arabic?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Arabe?',
        correctAnswer: 'Min fadlak',
        correctAnswerFr: 'Min fadlak',
        options: ['Min fadlak', 'Shukran', 'Ma\'a salama', 'Marhaba']
      },
      {
        id: 'ar-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Kayf halak?"?',
        questionFr: 'Comment répondez-vous à "Kayf halak?"?',
        correctAnswer: 'Ana bikhair',
        correctAnswerFr: 'Ana bikhair',
        options: ['Ana bikhair', 'Marhaba', 'Ma\'a salama', 'Shukran']
      },
      {
        id: 'ar-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Arabic',
        questionFr: 'Tapez "Excusez-moi" en Arabe',
        correctAnswer: 'Aasif',
        correctAnswerFr: 'Aasif'
      },
      {
        id: 'ar-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Arabic?',
        questionFr: 'Comment dit-on "Désolé" en Arabe?',
        correctAnswer: 'Aasif',
        correctAnswerFr: 'Aasif',
        options: ['Aasif', 'Shukran', 'Min fadlak', 'Ma\'a salama']
      },
      {
        id: 'ar-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Arabic?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Arabe?',
        correctAnswer: 'Tasharrafna',
        correctAnswerFr: 'Tasharrafna',
        options: ['Tasharrafna', 'Kayf halak?', 'Marhaba', 'Ma\'a salama']
      },
      {
        id: 'ar-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Arabic',
        questionFr: 'Tapez "À bientôt" en Arabe',
        correctAnswer: 'Araka laqiya',
        correctAnswerFr: 'Araka laqiya'
      },
      {
        id: 'ar-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Arabic?',
        questionFr: 'Comment dit-on "De rien" en Arabe?',
        correctAnswer: 'Afwan',
        correctAnswerFr: 'Afwan',
        options: ['Afwan', 'Min fadlak', 'Aasif', 'Marhaba']
      },
      {
        id: 'ar-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Arabic?',
        questionFr: 'Comment dit-on "Bonsoir" en Arabe?',
        correctAnswer: 'Masa\' al-khair',
        correctAnswerFr: 'Masa\' al-khair',
        options: ['Masa\' al-khair', 'Sabah al-khair', 'Layla sa\'ida', 'Marhaba']
      },
      {
        id: 'ar-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Arabic',
        questionFr: 'Tapez "Bonne nuit" en Arabe',
        correctAnswer: 'Layla sa\'ida',
        correctAnswerFr: 'Layla sa\'ida'
      },
      {
        id: 'ar-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Arabic?',
        questionFr: 'Comment dit-on "Oui" en Arabe?',
        correctAnswer: 'Na\'am',
        correctAnswerFr: 'Na\'am',
        options: ['Na\'am', 'La', 'Shukran', 'Marhaba']
      },
      {
        id: 'ar-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Arabic?',
        questionFr: 'Comment dit-on "Non" en Arabe?',
        correctAnswer: 'La',
        correctAnswerFr: 'La',
        options: ['La', 'Na\'am', 'Ma\'a salama', 'Min fadlak']
      },
      {
        id: 'ar-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Arabic',
        questionFr: 'Tapez "Peut-être" en Arabe',
        correctAnswer: 'Yumkin',
        correctAnswerFr: 'Yumkin'
      },
      {
        id: 'ar-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Arabic?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Arabe?',
        correctAnswer: 'La afham',
        correctAnswerFr: 'La afham',
        options: ['La afham', 'Shukran', 'Ma\'a salama', 'Aasif']
      },
      {
        id: 'ar-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Arabic?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Arabe?',
        correctAnswer: 'La a\'rif',
        correctAnswerFr: 'La a\'rif',
        options: ['La a\'rif', 'Shukran', 'Ma\'a salama', 'Aasif']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'ar-vocab-1-2',
    stageId: 'arabic-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Arabic?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Arabe?',
        correctAnswer: 'Ma ismuka?',
        correctAnswerFr: 'Ma ismuka?',
        options: ['Ma ismuka?', 'Shukran ismuka?', 'Ma\'a salama ismuka?', 'Min fadlak ismuka?']
      },
      {
        id: 'ar-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Arabic',
        questionFr: 'Tapez "Je m\'appelle..." en Arabe',
        correctAnswer: 'Ismi...',
        correctAnswerFr: 'Ismi...'
      },
      {
        id: 'ar-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Arabic?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Arabe?',
        correctAnswer: 'Min ayna anta?',
        correctAnswerFr: 'Min ayna anta?',
        options: ['Min ayna anta?', 'Shukran ayna?', 'Ma\'a salama ayna?', 'Min fadlak ayna?']
      },
      {
        id: 'ar-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Arabic',
        questionFr: 'Tapez "Je viens de..." en Arabe',
        correctAnswer: 'Ana min...',
        correctAnswerFr: 'Ana min...'
      },
      {
        id: 'ar-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Arabic?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Arabe?',
        correctAnswer: 'Kam umruka?',
        correctAnswerFr: 'Kam umruka?',
        options: ['Kam umruka?', 'Shukran umruka?', 'Ma\'a salama umruka?', 'Min fadlak umruka?']
      },
      {
        id: 'ar-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Arabic',
        questionFr: 'Tapez "J\'ai ... ans" en Arabe',
        correctAnswer: 'Umri ... sana',
        correctAnswerFr: 'Umri ... sana'
      },
      {
        id: 'ar-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Arabic?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Arabe?',
        correctAnswer: 'Ayna taskun?',
        correctAnswerFr: 'Ayna taskun?',
        options: ['Ayna taskun?', 'Shukran taskun?', 'Ma\'a salama taskun?', 'Min fadlak taskun?']
      },
      {
        id: 'ar-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Arabic',
        questionFr: 'Tapez "J\'habite à..." en Arabe',
        correctAnswer: 'Askun fi...',
        correctAnswerFr: 'Askun fi...'
      },
      {
        id: 'ar-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Arabic?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Arabe?',
        correctAnswer: 'Ma ta\'mal?',
        correctAnswerFr: 'Ma ta\'mal?',
        options: ['Ma ta\'mal?', 'Shukran ta\'mal?', 'Ma\'a salama ta\'mal?', 'Min fadlak ta\'mal?']
      },
      {
        id: 'ar-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Arabic',
        questionFr: 'Tapez "Je suis étudiant" en Arabe',
        correctAnswer: 'Ana talib',
        correctAnswerFr: 'Ana talib'
      },
      {
        id: 'ar-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Arabic" in Arabic?',
        questionFr: 'Comment dit-on "J\'apprends l\'Arabe" en Arabe?',
        correctAnswer: 'Ana atakallam al-arabiya',
        correctAnswerFr: 'Ana atakallam al-arabiya',
        options: ['Ana atakallam al-arabiya', 'Shukran al-arabiya', 'Ma\'a salama al-arabiya', 'Min fadlak al-arabiya']
      },
      {
        id: 'ar-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Arabic" in Arabic',
        questionFr: 'Tapez "Je parle un peu Arabe" en Arabe',
        correctAnswer: 'Atakallam al-arabiya qalilan',
        correctAnswerFr: 'Atakallam al-arabiya qalilan'
      },
      {
        id: 'ar-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Arabic well" in Arabic?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Arabe" en Arabe?',
        correctAnswer: 'La atakallam al-arabiya jayyidan',
        correctAnswerFr: 'La atakallam al-arabiya jayyidan',
        options: ['La atakallam al-arabiya jayyidan', 'Shukran al-arabiya', 'Ma\'a salama al-arabiya', 'Min fadlak al-arabiya']
      },
      {
        id: 'ar-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Arabic',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Arabe',
        correctAnswer: 'Hal yumkinuka musa\'adati?',
        correctAnswerFr: 'Hal yumkinuka musa\'adati?'
      },
      {
        id: 'ar-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Arabic?',
        questionFr: 'Comment dit-on "Bien sûr" en Arabe?',
        correctAnswer: 'Tab\'an',
        correctAnswerFr: 'Tab\'an',
        options: ['Tab\'an', 'La', 'Shukran', 'Min fadlak']
      },
      {
        id: 'ar-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Arabic?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Arabe?',
        correctAnswer: 'Ahtaju musa\'ada',
        correctAnswerFr: 'Ahtaju musa\'ada',
        options: ['Ahtaju musa\'ada', 'Shukran musa\'ada', 'Ma\'a salama musa\'ada', 'Min fadlak musa\'ada']
      },
      {
        id: 'ar-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Arabic',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Arabe',
        correctAnswer: 'Hal yumkinuka i\'ada dhalik?',
        correctAnswerFr: 'Hal yumkinuka i\'ada dhalik?'
      },
      {
        id: 'ar-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Arabic?',
        questionFr: 'Comment dit-on "Parlez lentement" en Arabe?',
        correctAnswer: 'Takallam bi-bu\'t',
        correctAnswerFr: 'Takallam bi-bu\'t',
        options: ['Takallam bi-bu\'t', 'Takallam shukran', 'Takallam ma\'a salama', 'Takallam min fadlak']
      },
      {
        id: 'ar-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Arabic',
        questionFr: 'Tapez "Je comprends" en Arabe',
        correctAnswer: 'Afham',
        correctAnswerFr: 'Afham'
      },
      {
        id: 'ar-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Arabic?',
        questionFr: 'Comment dit-on "C\'est correct" en Arabe?',
        correctAnswer: 'Sahih',
        correctAnswerFr: 'Sahih',
        options: ['Sahih', 'Khati\'', 'Shukran', 'Min fadlak']
      }
    ]
  },
  // Stage 1, Mission 3: Basic Words
  {
    id: 'ar-vocab-1-3',
    stageId: 'arabic-stage-1',
    lessonNumber: 3,
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-v1-3-1',
        type: 'multiple-choice',
        question: 'What is "water" in Arabic?',
        questionFr: 'Comment dit-on "eau" en Arabe?',
        correctAnswer: 'Maa',
        correctAnswerFr: 'Maa',
        options: ['Maa', 'Ta\'aam', 'Bayt', 'Kitab']
      },
      {
        id: 'ar-v1-3-2',
        type: 'multiple-choice',
        question: 'What is "food" in Arabic?',
        questionFr: 'Comment dit-on "nourriture" en Arabe?',
        correctAnswer: 'Ta\'aam',
        correctAnswerFr: 'Ta\'aam',
        options: ['Ta\'aam', 'Maa', 'Bayt', 'Kitab']
      },
      {
        id: 'ar-v1-3-3',
        type: 'type-answer',
        question: 'Type "house" in Arabic',
        questionFr: 'Tapez "maison" en Arabe',
        correctAnswer: 'Bayt',
        correctAnswerFr: 'Bayt'
      },
      {
        id: 'ar-v1-3-4',
        type: 'multiple-choice',
        question: 'What is "book" in Arabic?',
        questionFr: 'Comment dit-on "livre" en Arabe?',
        correctAnswer: 'Kitab',
        correctAnswerFr: 'Kitab',
        options: ['Kitab', 'Qalam', 'Bayt', 'Maa']
      },
      {
        id: 'ar-v1-3-5',
        type: 'multiple-choice',
        question: 'What is "pen" in Arabic?',
        questionFr: 'Comment dit-on "stylo" en Arabe?',
        correctAnswer: 'Qalam',
        correctAnswerFr: 'Qalam',
        options: ['Qalam', 'Kitab', 'Bayt', 'Maa']
      },
      {
        id: 'ar-v1-3-6',
        type: 'type-answer',
        question: 'Type "car" in Arabic',
        questionFr: 'Tapez "voiture" en Arabe',
        correctAnswer: 'Sayyara',
        correctAnswerFr: 'Sayyara'
      },
      {
        id: 'ar-v1-3-7',
        type: 'multiple-choice',
        question: 'What is "money" in Arabic?',
        questionFr: 'Comment dit-on "argent" en Arabe?',
        correctAnswer: 'Mal',
        correctAnswerFr: 'Mal',
        options: ['Mal', 'Sayyara', 'Bayt', 'Maa']
      },
      {
        id: 'ar-v1-3-8',
        type: 'multiple-choice',
        question: 'What is "time" in Arabic?',
        questionFr: 'Comment dit-on "temps" en Arabe?',
        correctAnswer: 'Waqt',
        correctAnswerFr: 'Waqt',
        options: ['Waqt', 'Mal', 'Sayyara', 'Bayt']
      },
      {
        id: 'ar-v1-3-9',
        type: 'type-answer',
        question: 'Type "day" in Arabic',
        questionFr: 'Tapez "jour" en Arabe',
        correctAnswer: 'Yawm',
        correctAnswerFr: 'Yawm'
      },
      {
        id: 'ar-v1-3-10',
        type: 'multiple-choice',
        question: 'What is "night" in Arabic?',
        questionFr: 'Comment dit-on "nuit" en Arabe?',
        correctAnswer: 'Layl',
        correctAnswerFr: 'Layl',
        options: ['Layl', 'Yawm', 'Waqt', 'Mal']
      },
      {
        id: 'ar-v1-3-11',
        type: 'multiple-choice',
        question: 'What is "family" in Arabic?',
        questionFr: 'Comment dit-on "famille" en Arabe?',
        correctAnswer: 'Aila',
        correctAnswerFr: 'Aila',
        options: ['Aila', 'Layl', 'Yawm', 'Waqt']
      },
      {
        id: 'ar-v1-3-12',
        type: 'type-answer',
        question: 'Type "mother" in Arabic',
        questionFr: 'Tapez "mère" en Arabe',
        correctAnswer: 'Umm',
        correctAnswerFr: 'Umm'
      },
      {
        id: 'ar-v1-3-13',
        type: 'multiple-choice',
        question: 'What is "father" in Arabic?',
        questionFr: 'Comment dit-on "père" en Arabe?',
        correctAnswer: 'Ab',
        correctAnswerFr: 'Ab',
        options: ['Ab', 'Umm', 'Aila', 'Layl']
      },
      {
        id: 'ar-v1-3-14',
        type: 'multiple-choice',
        question: 'What is "brother" in Arabic?',
        questionFr: 'Comment dit-on "frère" en Arabe?',
        correctAnswer: 'Akh',
        correctAnswerFr: 'Akh',
        options: ['Akh', 'Ab', 'Umm', 'Aila']
      },
      {
        id: 'ar-v1-3-15',
        type: 'type-answer',
        question: 'Type "sister" in Arabic',
        questionFr: 'Tapez "sœur" en Arabe',
        correctAnswer: 'Ukht',
        correctAnswerFr: 'Ukht'
      },
      {
        id: 'ar-v1-3-16',
        type: 'multiple-choice',
        question: 'What is "friend" in Arabic?',
        questionFr: 'Comment dit-on "ami" en Arabe?',
        correctAnswer: 'Sadiq',
        correctAnswerFr: 'Sadiq',
        options: ['Sadiq', 'Ukht', 'Akh', 'Ab']
      },
      {
        id: 'ar-v1-3-17',
        type: 'multiple-choice',
        question: 'What is "school" in Arabic?',
        questionFr: 'Comment dit-on "école" en Arabe?',
        correctAnswer: 'Madrasa',
        correctAnswerFr: 'Madrasa',
        options: ['Madrasa', 'Sadiq', 'Ukht', 'Akh']
      },
      {
        id: 'ar-v1-3-18',
        type: 'type-answer',
        question: 'Type "teacher" in Arabic',
        questionFr: 'Tapez "enseignant" en Arabe',
        correctAnswer: 'Mu\'allim',
        correctAnswerFr: 'Mu\'allim'
      },
      {
        id: 'ar-v1-3-19',
        type: 'multiple-choice',
        question: 'What is "student" in Arabic?',
        questionFr: 'Comment dit-on "étudiant" en Arabe?',
        correctAnswer: 'Talib',
        correctAnswerFr: 'Talib',
        options: ['Talib', 'Mu\'allim', 'Madrasa', 'Sadiq']
      },
      {
        id: 'ar-v1-3-20',
        type: 'multiple-choice',
        question: 'What is "work" in Arabic?',
        questionFr: 'Comment dit-on "travail" en Arabe?',
        correctAnswer: 'Amal',
        correctAnswerFr: 'Amal',
        options: ['Amal', 'Talib', 'Mu\'allim', 'Madrasa']
      }
    ]
  },
  // Stage 1, Mission 4: Essential Vocabulary
  {
    id: 'ar-vocab-1-4',
    stageId: 'arabic-stage-1',
    lessonNumber: 4,
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-v1-4-1',
        type: 'multiple-choice',
        question: 'What is "big" in Arabic?',
        questionFr: 'Comment dit-on "grand" en Arabe?',
        correctAnswer: 'Kabir',
        correctAnswerFr: 'Kabir',
        options: ['Kabir', 'Saghir', 'Jadid', 'Qadim']
      },
      {
        id: 'ar-v1-4-2',
        type: 'multiple-choice',
        question: 'What is "small" in Arabic?',
        questionFr: 'Comment dit-on "petit" en Arabe?',
        correctAnswer: 'Saghir',
        correctAnswerFr: 'Saghir',
        options: ['Saghir', 'Kabir', 'Jadid', 'Qadim']
      },
      {
        id: 'ar-v1-4-3',
        type: 'type-answer',
        question: 'Type "good" in Arabic',
        questionFr: 'Tapez "bon" en Arabe',
        correctAnswer: 'Jayyid',
        correctAnswerFr: 'Jayyid'
      },
      {
        id: 'ar-v1-4-4',
        type: 'multiple-choice',
        question: 'What is "bad" in Arabic?',
        questionFr: 'Comment dit-on "mauvais" en Arabe?',
        correctAnswer: 'Sayyi',
        correctAnswerFr: 'Sayyi',
        options: ['Sayyi', 'Jayyid', 'Saghir', 'Kabir']
      },
      {
        id: 'ar-v1-4-5',
        type: 'multiple-choice',
        question: 'What is "new" in Arabic?',
        questionFr: 'Comment dit-on "nouveau" en Arabe?',
        correctAnswer: 'Jadid',
        correctAnswerFr: 'Jadid',
        options: ['Jadid', 'Qadim', 'Sayyi', 'Jayyid']
      },
      {
        id: 'ar-v1-4-6',
        type: 'type-answer',
        question: 'Type "old" in Arabic',
        questionFr: 'Tapez "vieux" en Arabe',
        correctAnswer: 'Qadim',
        correctAnswerFr: 'Qadim'
      },
      {
        id: 'ar-v1-4-7',
        type: 'multiple-choice',
        question: 'What is "hot" in Arabic?',
        questionFr: 'Comment dit-on "chaud" en Arabe?',
        correctAnswer: 'Harr',
        correctAnswerFr: 'Harr',
        options: ['Harr', 'Barid', 'Jadid', 'Qadim']
      },
      {
        id: 'ar-v1-4-8',
        type: 'multiple-choice',
        question: 'What is "cold" in Arabic?',
        questionFr: 'Comment dit-on "froid" en Arabe?',
        correctAnswer: 'Barid',
        correctAnswerFr: 'Barid',
        options: ['Barid', 'Harr', 'Jadid', 'Qadim']
      },
      {
        id: 'ar-v1-4-9',
        type: 'type-answer',
        question: 'Type "fast" in Arabic',
        questionFr: 'Tapez "rapide" en Arabe',
        correctAnswer: 'Sari\'',
        correctAnswerFr: 'Sari\''
      },
      {
        id: 'ar-v1-4-10',
        type: 'multiple-choice',
        question: 'What is "slow" in Arabic?',
        questionFr: 'Comment dit-on "lent" en Arabe?',
        correctAnswer: 'Bati\'',
        correctAnswerFr: 'Bati\'',
        options: ['Bati\'', 'Sari\'', 'Barid', 'Harr']
      },
      {
        id: 'ar-v1-4-11',
        type: 'multiple-choice',
        question: 'What is "beautiful" in Arabic?',
        questionFr: 'Comment dit-on "beau" en Arabe?',
        correctAnswer: 'Jamil',
        correctAnswerFr: 'Jamil',
        options: ['Jamil', 'Bati\'', 'Sari\'', 'Barid']
      },
      {
        id: 'ar-v1-4-12',
        type: 'type-answer',
        question: 'Type "ugly" in Arabic',
        questionFr: 'Tapez "laid" en Arabe',
        correctAnswer: 'Qabih',
        correctAnswerFr: 'Qabih'
      },
      {
        id: 'ar-v1-4-13',
        type: 'multiple-choice',
        question: 'What is "easy" in Arabic?',
        questionFr: 'Comment dit-on "facile" en Arabe?',
        correctAnswer: 'Sahl',
        correctAnswerFr: 'Sahl',
        options: ['Sahl', 'Sa\'b', 'Qabih', 'Jamil']
      },
      {
        id: 'ar-v1-4-14',
        type: 'multiple-choice',
        question: 'What is "difficult" in Arabic?',
        questionFr: 'Comment dit-on "difficile" en Arabe?',
        correctAnswer: 'Sa\'b',
        correctAnswerFr: 'Sa\'b',
        options: ['Sa\'b', 'Sahl', 'Qabih', 'Jamil']
      },
      {
        id: 'ar-v1-4-15',
        type: 'type-answer',
        question: 'Type "expensive" in Arabic',
        questionFr: 'Tapez "cher" en Arabe',
        correctAnswer: 'Ghalin',
        correctAnswerFr: 'Ghalin'
      },
      {
        id: 'ar-v1-4-16',
        type: 'multiple-choice',
        question: 'What is "cheap" in Arabic?',
        questionFr: 'Comment dit-on "bon marché" en Arabe?',
        correctAnswer: 'Rakhis',
        correctAnswerFr: 'Rakhis',
        options: ['Rakhis', 'Ghalin', 'Sa\'b', 'Sahl']
      },
      {
        id: 'ar-v1-4-17',
        type: 'multiple-choice',
        question: 'What is "clean" in Arabic?',
        questionFr: 'Comment dit-on "propre" en Arabe?',
        correctAnswer: 'Nadif',
        correctAnswerFr: 'Nadif',
        options: ['Nadif', 'Wasikh', 'Rakhis', 'Ghalin']
      },
      {
        id: 'ar-v1-4-18',
        type: 'type-answer',
        question: 'Type "dirty" in Arabic',
        questionFr: 'Tapez "sale" en Arabe',
        correctAnswer: 'Wasikh',
        correctAnswerFr: 'Wasikh'
      },
      {
        id: 'ar-v1-4-19',
        type: 'multiple-choice',
        question: 'What is "full" in Arabic?',
        questionFr: 'Comment dit-on "plein" en Arabe?',
        correctAnswer: 'Mal\'un',
        correctAnswerFr: 'Mal\'un',
        options: ['Mal\'un', 'Fari', 'Wasikh', 'Nadif']
      },
      {
        id: 'ar-v1-4-20',
        type: 'multiple-choice',
        question: 'What is "empty" in Arabic?',
        questionFr: 'Comment dit-on "vide" en Arabe?',
        correctAnswer: 'Fari',
        correctAnswerFr: 'Fari',
        options: ['Fari', 'Mal\'un', 'Wasikh', 'Nadif']
      }
    ]
  },
  // Stage 1, Mission 5: Practice & Review
  {
    id: 'ar-vocab-1-5',
    stageId: 'arabic-stage-1',
    lessonNumber: 5,
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    xpReward: 15,
    exercises: [
      {
        id: 'ar-v1-5-1',
        type: 'multiple-choice',
        question: 'What is "one" in Arabic?',
        questionFr: 'Comment dit-on "un" en Arabe?',
        correctAnswer: 'Wahid',
        correctAnswerFr: 'Wahid',
        options: ['Wahid', 'Ithnan', 'Thalatha', 'Arba\'a']
      },
      {
        id: 'ar-v1-5-2',
        type: 'multiple-choice',
        question: 'What is "two" in Arabic?',
        questionFr: 'Comment dit-on "deux" en Arabe?',
        correctAnswer: 'Ithnan',
        correctAnswerFr: 'Ithnan',
        options: ['Ithnan', 'Wahid', 'Thalatha', 'Arba\'a']
      },
      {
        id: 'ar-v1-5-3',
        type: 'type-answer',
        question: 'Type "three" in Arabic',
        questionFr: 'Tapez "trois" en Arabe',
        correctAnswer: 'Thalatha',
        correctAnswerFr: 'Thalatha'
      },
      {
        id: 'ar-v1-5-4',
        type: 'multiple-choice',
        question: 'What is "four" in Arabic?',
        questionFr: 'Comment dit-on "quatre" en Arabe?',
        correctAnswer: 'Arba\'a',
        correctAnswerFr: 'Arba\'a',
        options: ['Arba\'a', 'Thalatha', 'Ithnan', 'Wahid']
      },
      {
        id: 'ar-v1-5-5',
        type: 'multiple-choice',
        question: 'What is "five" in Arabic?',
        questionFr: 'Comment dit-on "cinq" en Arabe?',
        correctAnswer: 'Khamsa',
        correctAnswerFr: 'Khamsa',
        options: ['Khamsa', 'Arba\'a', 'Thalatha', 'Ithnan']
      },
      {
        id: 'ar-v1-5-6',
        type: 'type-answer',
        question: 'Type "six" in Arabic',
        questionFr: 'Tapez "six" en Arabe',
        correctAnswer: 'Sitta',
        correctAnswerFr: 'Sitta'
      },
      {
        id: 'ar-v1-5-7',
        type: 'multiple-choice',
        question: 'What is "seven" in Arabic?',
        questionFr: 'Comment dit-on "sept" en Arabe?',
        correctAnswer: 'Sab\'a',
        correctAnswerFr: 'Sab\'a',
        options: ['Sab\'a', 'Sitta', 'Khamsa', 'Arba\'a']
      },
      {
        id: 'ar-v1-5-8',
        type: 'multiple-choice',
        question: 'What is "eight" in Arabic?',
        questionFr: 'Comment dit-on "huit" en Arabe?',
        correctAnswer: 'Thamaniya',
        correctAnswerFr: 'Thamaniya',
        options: ['Thamaniya', 'Sab\'a', 'Sitta', 'Khamsa']
      },
      {
        id: 'ar-v1-5-9',
        type: 'type-answer',
        question: 'Type "nine" in Arabic',
        questionFr: 'Tapez "neuf" en Arabe',
        correctAnswer: 'Tis\'a',
        correctAnswerFr: 'Tis\'a'
      },
      {
        id: 'ar-v1-5-10',
        type: 'multiple-choice',
        question: 'What is "ten" in Arabic?',
        questionFr: 'Comment dit-on "dix" en Arabe?',
        correctAnswer: 'Ashara',
        correctAnswerFr: 'Ashara',
        options: ['Ashara', 'Tis\'a', 'Thamaniya', 'Sab\'a']
      },
      {
        id: 'ar-v1-5-11',
        type: 'multiple-choice',
        question: 'What is "red" in Arabic?',
        questionFr: 'Comment dit-on "rouge" en Arabe?',
        correctAnswer: 'Ahmar',
        correctAnswerFr: 'Ahmar',
        options: ['Ahmar', 'Akhdar', 'Azraq', 'Abyad']
      },
      {
        id: 'ar-v1-5-12',
        type: 'type-answer',
        question: 'Type "blue" in Arabic',
        questionFr: 'Tapez "bleu" en Arabe',
        correctAnswer: 'Azraq',
        correctAnswerFr: 'Azraq'
      },
      {
        id: 'ar-v1-5-13',
        type: 'multiple-choice',
        question: 'What is "green" in Arabic?',
        questionFr: 'Comment dit-on "vert" en Arabe?',
        correctAnswer: 'Akhdar',
        correctAnswerFr: 'Akhdar',
        options: ['Akhdar', 'Azraq', 'Ahmar', 'Abyad']
      },
      {
        id: 'ar-v1-5-14',
        type: 'multiple-choice',
        question: 'What is "white" in Arabic?',
        questionFr: 'Comment dit-on "blanc" en Arabe?',
        correctAnswer: 'Abyad',
        correctAnswerFr: 'Abyad',
        options: ['Abyad', 'Akhdar', 'Azraq', 'Ahmar']
      },
      {
        id: 'ar-v1-5-15',
        type: 'type-answer',
        question: 'Type "black" in Arabic',
        questionFr: 'Tapez "noir" en Arabe',
        correctAnswer: 'Aswad',
        correctAnswerFr: 'Aswad'
      },
      {
        id: 'ar-v1-5-16',
        type: 'multiple-choice',
        question: 'What is "yellow" in Arabic?',
        questionFr: 'Comment dit-on "jaune" en Arabe?',
        correctAnswer: 'Asfar',
        correctAnswerFr: 'Asfar',
        options: ['Asfar', 'Aswad', 'Abyad', 'Akhdar']
      },
      {
        id: 'ar-v1-5-17',
        type: 'multiple-choice',
        question: 'What is "orange" in Arabic?',
        questionFr: 'Comment dit-on "orange" en Arabe?',
        correctAnswer: 'Burtuqali',
        correctAnswerFr: 'Burtuqali',
        options: ['Burtuqali', 'Asfar', 'Aswad', 'Abyad']
      },
      {
        id: 'ar-v1-5-18',
        type: 'type-answer',
        question: 'Type "purple" in Arabic',
        questionFr: 'Tapez "violet" en Arabe',
        correctAnswer: 'Banafsaji',
        correctAnswerFr: 'Banafsaji'
      },
      {
        id: 'ar-v1-5-19',
        type: 'multiple-choice',
        question: 'What is "brown" in Arabic?',
        questionFr: 'Comment dit-on "marron" en Arabe?',
        correctAnswer: 'Bunni',
        correctAnswerFr: 'Bunni',
        options: ['Bunni', 'Banafsaji', 'Burtuqali', 'Asfar']
      },
      {
        id: 'ar-v1-5-20',
        type: 'multiple-choice',
        question: 'What is "gray" in Arabic?',
        questionFr: 'Comment dit-on "gris" en Arabe?',
        correctAnswer: 'Rasasi',
        correctAnswerFr: 'Rasasi',
        options: ['Rasasi', 'Bunni', 'Banafsaji', 'Burtuqali']
      }
    ]
  },
  // Stage 1, Mission 6: Self Introductions
  {
    id: 'ar-vocab-1-6',
    stageId: 'arabic-stage-1',
    lessonNumber: 6,
    type: 'vocabulary',
    title: 'Self Introductions',
    titleFr: 'Se présenter',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s1-6-1',
        type: 'multiple-choice',
        question: 'How do you say "My name is..." in Arabic?',
        questionFr: 'Comment dit-on "Je m\'appelle..." en Arabe?',
        correctAnswer: 'Ana ismi...',
        correctAnswerFr: 'Ana ismi...',
        options: ['Ana ismi...', 'Ana min...', 'Ana umri...', 'Ana talib']
      },
      {
        id: 'ar-s1-6-2',
        type: 'type-answer',
        question: 'Type "I am from..." in Arabic',
        questionFr: 'Tapez "Je suis de..." en Arabe',
        correctAnswer: 'Ana min...',
        correctAnswerFr: 'Ana min...'
      },
      {
        id: 'ar-s1-6-3',
        type: 'multiple-choice',
        question: 'What does "Ana ismi..." mean?',
        questionFr: 'Que signifie "Ana ismi..."?',
        correctAnswer: 'My name is...',
        correctAnswerFr: 'Je m\'appelle...',
        options: ['My name is...', 'I am from...', 'I am... years old', 'I am a student'],
        optionsFr: ['Je m\'appelle...', 'Je suis de...', 'J\'ai... ans', 'Je suis étudiant']
      },
      {
        id: 'ar-s1-6-4',
        type: 'multiple-choice',
        question: 'How do you ask "How old are you?" in Arabic (to a male)?',
        questionFr: 'Comment demander "Quel âge as-tu?" en Arabe (à un homme)?',
        correctAnswer: 'Kam umrak?',
        correctAnswerFr: 'Kam umrak?',
        options: ['Kam umrak?', 'Kam ismak?', 'Kam baytuk?', 'Kam kitabuk?']
      },
      {
        id: 'ar-s1-6-5',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Arabic',
        questionFr: 'Tapez "J\'ai ... ans" en Arabe',
        correctAnswer: 'Ana umri...',
        correctAnswerFr: 'Ana umri...'
      },
      {
        id: 'ar-s1-6-6',
        type: 'multiple-choice',
        question: 'What is "Welcome" (warm greeting) in Arabic?',
        questionFr: 'Comment dit-on "Bienvenue" (accueil chaleureux) en Arabe?',
        correctAnswer: 'Ahlan wa sahlan',
        correctAnswerFr: 'Ahlan wa sahlan',
        options: ['Ahlan wa sahlan', 'Marhaba', 'Shukran', 'Ma\'a salama']
      },
      {
        id: 'ar-s1-6-7',
        type: 'multiple-choice',
        question: '"Ahlan wa sahlan" means:',
        questionFr: '"Ahlan wa sahlan" signifie:',
        correctAnswer: 'Welcome (warmly)',
        correctAnswerFr: 'Bienvenue (chaleureusement)',
        options: ['Welcome (warmly)', 'Goodbye', 'Thank you', 'See you later'],
        optionsFr: ['Bienvenue (chaleureusement)', 'Au revoir', 'Merci', 'À bientôt']
      },
      {
        id: 'ar-s1-6-8',
        type: 'fill-blank',
        question: 'Complete: "___ ismi Sara." (My name is Sara)',
        questionFr: 'Complétez: "___ ismi Sara." (Je m\'appelle Sara)',
        correctAnswer: 'Ana',
        correctAnswerFr: 'Ana',
        hint: 'This means "I" in Arabic',
        hintFr: 'Cela signifie "Je" en Arabe'
      },
      {
        id: 'ar-s1-6-9',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Arabic?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Arabe?',
        correctAnswer: 'Tasharrafna',
        correctAnswerFr: 'Tasharrafna',
        options: ['Tasharrafna', 'Shukran', 'Afwan', 'Aasif']
      },
      {
        id: 'ar-s1-6-10',
        type: 'type-answer',
        question: 'Type "What is your name?" in Arabic',
        questionFr: 'Tapez "Comment t\'appelles-tu?" en Arabe',
        correctAnswer: 'Ma ismuk?',
        correctAnswerFr: 'Ma ismuk?'
      },
      {
        id: 'ar-s1-6-11',
        type: 'multiple-choice',
        question: 'What does "Ana min Misr" mean?',
        questionFr: 'Que signifie "Ana min Misr"?',
        correctAnswer: 'I am from Egypt',
        correctAnswerFr: 'Je suis d\'Égypte',
        options: ['I am from Egypt', 'I am Egyptian', 'Egypt is big', 'I love Egypt'],
        optionsFr: ['Je suis d\'Égypte', 'Je suis Égyptien', 'L\'Égypte est grande', 'J\'aime l\'Égypte']
      },
      {
        id: 'ar-s1-6-12',
        type: 'fill-blank',
        question: 'Complete: "Kam ___ ?" (How old are you? — to a male)',
        questionFr: 'Complétez: "Kam ___ ?" (Quel âge as-tu? — à un homme)',
        correctAnswer: 'umrak',
        correctAnswerFr: 'umrak',
        hint: 'The word for "your age" (masculine)',
        hintFr: 'Le mot pour "ton âge" (masculin)'
      },
      {
        id: 'ar-s1-6-13',
        type: 'multiple-choice',
        question: 'How do you say "I am a teacher" in Arabic?',
        questionFr: 'Comment dit-on "Je suis enseignant" en Arabe?',
        correctAnswer: 'Ana mu\'allim',
        correctAnswerFr: 'Ana mu\'allim',
        options: ['Ana mu\'allim', 'Ana talib', 'Ana min', 'Ana ismi']
      },
      {
        id: 'ar-s1-6-14',
        type: 'type-answer',
        question: 'Type "I am a student" in Arabic',
        questionFr: 'Tapez "Je suis étudiant" en Arabe',
        correctAnswer: 'Ana talib',
        correctAnswerFr: 'Ana talib'
      },
      {
        id: 'ar-s1-6-15',
        type: 'multiple-choice',
        question: 'What is "Pleased to meet you" in Arabic?',
        questionFr: 'Comment dit-on "Enchanté" en Arabe?',
        correctAnswer: 'Fursa sa\'ida',
        correctAnswerFr: 'Fursa sa\'ida',
        options: ['Fursa sa\'ida', 'Shukran', 'Marhaba', 'Afwan']
      },
      {
        id: 'ar-s1-6-16',
        type: 'multiple-choice',
        question: 'What does "Ahlan" mean on its own?',
        questionFr: 'Que signifie "Ahlan" seul?',
        correctAnswer: 'Welcome / Hello',
        correctAnswerFr: 'Bienvenue / Bonjour',
        options: ['Welcome / Hello', 'Goodbye', 'Please', 'Thank you'],
        optionsFr: ['Bienvenue / Bonjour', 'Au revoir', 'S\'il vous plaît', 'Merci']
      },
      {
        id: 'ar-s1-6-17',
        type: 'fill-blank',
        question: 'Complete: "Ana ___ khams wa ishrin sana." (I am 25 years old)',
        questionFr: 'Complétez: "Ana ___ khams wa ishrin sana." (J\'ai 25 ans)',
        correctAnswer: 'umri',
        correctAnswerFr: 'umri',
        hint: 'The phrase "my age is"',
        hintFr: 'L\'expression "mon âge est"'
      },
      {
        id: 'ar-s1-6-18',
        type: 'multiple-choice',
        question: 'How do you say "I work as a doctor" in Arabic?',
        questionFr: 'Comment dit-on "Je travaille comme médecin" en Arabe?',
        correctAnswer: 'Ana tabib',
        correctAnswerFr: 'Ana tabib',
        options: ['Ana tabib', 'Ana talib', 'Ana mu\'allim', 'Ana ismi']
      },
      {
        id: 'ar-s1-6-19',
        type: 'type-answer',
        question: 'Type "I am from Morocco" in Arabic',
        questionFr: 'Tapez "Je suis du Maroc" en Arabe',
        correctAnswer: 'Ana min al-Maghrib',
        correctAnswerFr: 'Ana min al-Maghrib'
      },
      {
        id: 'ar-s1-6-20',
        type: 'multiple-choice',
        question: 'How do you respond to "Ahlan wa sahlan"?',
        questionFr: 'Comment répond-on à "Ahlan wa sahlan"?',
        correctAnswer: 'Ahlan bik',
        correctAnswerFr: 'Ahlan bik',
        options: ['Ahlan bik', 'Shukran', 'Aasif', 'Ma\'a salama']
      }
    ]
  },
  // Stage 1, Mission 7: Daily Phrases Review
  {
    id: 'ar-vocab-1-7',
    stageId: 'arabic-stage-1',
    lessonNumber: 7,
    type: 'vocabulary',
    title: 'Daily Phrases',
    titleFr: 'Expressions quotidiennes',
    xpReward: 15,
    exercises: [
      {
        id: 'ar-s1-7-1',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Arabic?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Arabe?',
        correctAnswer: 'Sabah al-khayr',
        correctAnswerFr: 'Sabah al-khayr',
        options: ['Sabah al-khayr', 'Masa al-khayr', 'Laylat al-khayr', 'Marhaba']
      },
      {
        id: 'ar-s1-7-2',
        type: 'type-answer',
        question: 'Type "Good afternoon/evening" in Arabic',
        questionFr: 'Tapez "Bon après-midi/soir" en Arabe',
        correctAnswer: 'Masa al-khayr',
        correctAnswerFr: 'Masa al-khayr'
      },
      {
        id: 'ar-s1-7-3',
        type: 'multiple-choice',
        question: 'What is the correct response to "Sabah al-khayr"?',
        questionFr: 'Quelle est la bonne réponse à "Sabah al-khayr"?',
        correctAnswer: 'Sabah al-noor',
        correctAnswerFr: 'Sabah al-noor',
        options: ['Sabah al-noor', 'Masa al-khayr', 'Shukran', 'Afwan']
      },
      {
        id: 'ar-s1-7-4',
        type: 'multiple-choice',
        question: '"Laylat al-khayr" means:',
        questionFr: '"Laylat al-khayr" signifie:',
        correctAnswer: 'Good night',
        correctAnswerFr: 'Bonne nuit',
        options: ['Good night', 'Good morning', 'Good afternoon', 'Goodbye'],
        optionsFr: ['Bonne nuit', 'Bon matin', 'Bon après-midi', 'Au revoir']
      },
      {
        id: 'ar-s1-7-5',
        type: 'fill-blank',
        question: 'Complete: "Sabah ___-khayr" (Good morning)',
        questionFr: 'Complétez: "Sabah ___-khayr" (Bonjour)',
        correctAnswer: 'al',
        correctAnswerFr: 'al',
        hint: 'The Arabic definite article',
        hintFr: 'L\'article défini arabe'
      },
      {
        id: 'ar-s1-7-6',
        type: 'multiple-choice',
        question: 'How do you say "Goodbye" in Arabic?',
        questionFr: 'Comment dit-on "Au revoir" en Arabe?',
        correctAnswer: 'Ma\'a as-salama',
        correctAnswerFr: 'Ma\'a as-salama',
        options: ['Ma\'a as-salama', 'Sabah al-khayr', 'Masa al-khayr', 'Marhaba']
      },
      {
        id: 'ar-s1-7-7',
        type: 'type-answer',
        question: 'Type "God willing" in Arabic',
        questionFr: 'Tapez "Si Dieu le veut" en Arabe',
        correctAnswer: 'Inshallah',
        correctAnswerFr: 'Inshallah'
      },
      {
        id: 'ar-s1-7-8',
        type: 'multiple-choice',
        question: '"Inshallah" literally means:',
        questionFr: '"Inshallah" signifie littéralement:',
        correctAnswer: 'If God wills it',
        correctAnswerFr: 'Si Dieu le veut',
        options: ['If God wills it', 'Thank God', 'God is great', 'Praise God'],
        optionsFr: ['Si Dieu le veut', 'Dieu merci', 'Dieu est grand', 'Louange à Dieu']
      },
      {
        id: 'ar-s1-7-9',
        type: 'multiple-choice',
        question: 'What time of day do you say "Masa al-khayr"?',
        questionFr: 'À quel moment de la journée dit-on "Masa al-khayr"?',
        correctAnswer: 'Afternoon / evening',
        correctAnswerFr: 'Après-midi / soir',
        options: ['Afternoon / evening', 'Morning', 'Night', 'Anytime'],
        optionsFr: ['Après-midi / soir', 'Matin', 'Nuit', 'N\'importe quand']
      },
      {
        id: 'ar-s1-7-10',
        type: 'fill-blank',
        question: 'Complete: "Ma\'a ___-salama" (Goodbye)',
        questionFr: 'Complétez: "Ma\'a ___-salama" (Au revoir)',
        correctAnswer: 'as',
        correctAnswerFr: 'as',
        hint: 'This is a contracted form of the definite article before "s"',
        hintFr: 'C\'est une forme contractée de l\'article défini avant "s"'
      },
      {
        id: 'ar-s1-7-11',
        type: 'multiple-choice',
        question: 'How do you say "Have a good day" in Arabic?',
        questionFr: 'Comment dit-on "Bonne journée" en Arabe?',
        correctAnswer: 'Yawm sa\'id',
        correctAnswerFr: 'Yawm sa\'id',
        options: ['Yawm sa\'id', 'Sabah al-khayr', 'Masa al-khayr', 'Inshallah']
      },
      {
        id: 'ar-s1-7-12',
        type: 'type-answer',
        question: 'Type "Good morning" in Arabic',
        questionFr: 'Tapez "Bonjour" (matin) en Arabe',
        correctAnswer: 'Sabah al-khayr',
        correctAnswerFr: 'Sabah al-khayr'
      },
      {
        id: 'ar-s1-7-13',
        type: 'multiple-choice',
        question: 'What is "See you tomorrow" in Arabic?',
        questionFr: 'Comment dit-on "À demain" en Arabe?',
        correctAnswer: 'Araka ghadan',
        correctAnswerFr: 'Araka ghadan',
        options: ['Araka ghadan', 'Ma\'a as-salama', 'Inshallah', 'Yawm sa\'id']
      },
      {
        id: 'ar-s1-7-14',
        type: 'multiple-choice',
        question: 'Which phrase is used to wish someone well when they leave?',
        questionFr: 'Quelle expression utilise-t-on pour souhaiter bon voyage à quelqu\'un?',
        correctAnswer: 'Ma\'a as-salama',
        correctAnswerFr: 'Ma\'a as-salama',
        options: ['Ma\'a as-salama', 'Sabah al-khayr', 'Inshallah', 'Marhaba']
      },
      {
        id: 'ar-s1-7-15',
        type: 'fill-blank',
        question: 'Complete: "___ al-khayr" (Good morning)',
        questionFr: 'Complétez: "___ al-khayr" (Bonjour)',
        correctAnswer: 'Sabah',
        correctAnswerFr: 'Sabah',
        hint: 'The Arabic word for "morning"',
        hintFr: 'Le mot arabe pour "matin"'
      },
      {
        id: 'ar-s1-7-16',
        type: 'multiple-choice',
        question: 'What is "Good night" in Arabic?',
        questionFr: 'Comment dit-on "Bonne nuit" en Arabe?',
        correctAnswer: 'Laylat al-khayr',
        correctAnswerFr: 'Laylat al-khayr',
        options: ['Laylat al-khayr', 'Sabah al-khayr', 'Masa al-khayr', 'Yawm sa\'id']
      },
      {
        id: 'ar-s1-7-17',
        type: 'type-answer',
        question: 'Type "Goodbye" in Arabic',
        questionFr: 'Tapez "Au revoir" en Arabe',
        correctAnswer: 'Ma\'a as-salama',
        correctAnswerFr: 'Ma\'a as-salama'
      },
      {
        id: 'ar-s1-7-18',
        type: 'multiple-choice',
        question: 'The response to "Laylat al-khayr" is:',
        questionFr: 'La réponse à "Laylat al-khayr" est:',
        correctAnswer: 'Laylat al-noor',
        correctAnswerFr: 'Laylat al-noor',
        options: ['Laylat al-noor', 'Sabah al-khayr', 'Afwan', 'Shukran']
      },
      {
        id: 'ar-s1-7-19',
        type: 'multiple-choice',
        question: 'What does "Yawm sa\'id" mean?',
        questionFr: 'Que signifie "Yawm sa\'id"?',
        correctAnswer: 'Happy day / Have a good day',
        correctAnswerFr: 'Bonne journée',
        options: ['Happy day / Have a good day', 'Good morning', 'Good night', 'Goodbye'],
        optionsFr: ['Bonne journée', 'Bonjour', 'Bonne nuit', 'Au revoir']
      },
      {
        id: 'ar-s1-7-20',
        type: 'type-answer',
        question: 'Type "Good evening" in Arabic',
        questionFr: 'Tapez "Bonsoir" en Arabe',
        correctAnswer: 'Masa al-khayr',
        correctAnswerFr: 'Masa al-khayr'
      }
    ]
  },
  // Stage 2, Mission 1: Please & Thank You
  {
    id: 'ar-vocab-2-1',
    stageId: 'arabic-stage-2',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Please & Thank You',
    titleFr: 'S\'il vous plaît et Merci',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Arabic (to a male)?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Arabe (à un homme)?',
        correctAnswer: 'Min fadlak',
        correctAnswerFr: 'Min fadlak',
        options: ['Min fadlak', 'Min fadlik', 'Shukran', 'Afwan']
      },
      {
        id: 'ar-s2-1-2',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Arabic (to a female)?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Arabe (à une femme)?',
        correctAnswer: 'Min fadlik',
        correctAnswerFr: 'Min fadlik',
        options: ['Min fadlik', 'Min fadlak', 'Shukran', 'Afwan']
      },
      {
        id: 'ar-s2-1-3',
        type: 'type-answer',
        question: 'Type "Thank you" in Arabic',
        questionFr: 'Tapez "Merci" en Arabe',
        correctAnswer: 'Shukran',
        correctAnswerFr: 'Shukran'
      },
      {
        id: 'ar-s2-1-4',
        type: 'multiple-choice',
        question: 'What is "Thank you very much" in Arabic?',
        questionFr: 'Comment dit-on "Merci beaucoup" en Arabe?',
        correctAnswer: 'Shukran jazilan',
        correctAnswerFr: 'Shukran jazilan',
        options: ['Shukran jazilan', 'Shukran', 'Afwan', 'Min fadlak']
      },
      {
        id: 'ar-s2-1-5',
        type: 'multiple-choice',
        question: 'What does "Afwan" mean?',
        questionFr: 'Que signifie "Afwan"?',
        correctAnswer: 'You\'re welcome',
        correctAnswerFr: 'De rien',
        options: ['You\'re welcome', 'Thank you', 'Please', 'Sorry'],
        optionsFr: ['De rien', 'Merci', 'S\'il vous plaît', 'Désolé']
      },
      {
        id: 'ar-s2-1-6',
        type: 'type-answer',
        question: 'Type "You\'re welcome" in Arabic',
        questionFr: 'Tapez "De rien" en Arabe',
        correctAnswer: 'Afwan',
        correctAnswerFr: 'Afwan'
      },
      {
        id: 'ar-s2-1-7',
        type: 'multiple-choice',
        question: '"Tafaddal" is said when:',
        questionFr: '"Tafaddal" se dit quand:',
        correctAnswer: 'Inviting someone to come in or proceed',
        correctAnswerFr: 'On invite quelqu\'un à entrer ou à continuer',
        options: ['Inviting someone to come in or proceed', 'Saying goodbye', 'Asking for help', 'Apologizing'],
        optionsFr: ['On invite quelqu\'un à entrer ou à continuer', 'On dit au revoir', 'On demande de l\'aide', 'On s\'excuse']
      },
      {
        id: 'ar-s2-1-8',
        type: 'fill-blank',
        question: 'Complete: "Shukran ___" (Thank you very much)',
        questionFr: 'Complétez: "Shukran ___" (Merci beaucoup)',
        correctAnswer: 'jazilan',
        correctAnswerFr: 'jazilan',
        hint: 'The word meaning "greatly/a lot"',
        hintFr: 'Le mot signifiant "beaucoup"'
      },
      {
        id: 'ar-s2-1-9',
        type: 'multiple-choice',
        question: 'How do you respond when someone says "Shukran" to you?',
        questionFr: 'Comment répond-on quand quelqu\'un vous dit "Shukran"?',
        correctAnswer: 'Afwan',
        correctAnswerFr: 'Afwan',
        options: ['Afwan', 'Shukran', 'Min fadlak', 'Aasif']
      },
      {
        id: 'ar-s2-1-10',
        type: 'type-answer',
        question: 'Type "Please" (to a male) in Arabic',
        questionFr: 'Tapez "S\'il vous plaît" (à un homme) en Arabe',
        correctAnswer: 'Min fadlak',
        correctAnswerFr: 'Min fadlak'
      },
      {
        id: 'ar-s2-1-11',
        type: 'multiple-choice',
        question: 'What is the difference between "Min fadlak" and "Min fadlik"?',
        questionFr: 'Quelle est la différence entre "Min fadlak" et "Min fadlik"?',
        correctAnswer: 'Fadlak is to a male, fadlik is to a female',
        correctAnswerFr: 'Fadlak s\'adresse à un homme, fadlik à une femme',
        options: ['Fadlak is to a male, fadlik is to a female', 'They are the same', 'Fadlak is formal, fadlik informal', 'Fadlak means please, fadlik means thank you'],
        optionsFr: ['Fadlak s\'adresse à un homme, fadlik à une femme', 'Ils sont identiques', 'Fadlak est formel, fadlik informel', 'Fadlak signifie s\'il vous plaît, fadlik merci']
      },
      {
        id: 'ar-s2-1-12',
        type: 'fill-blank',
        question: 'Complete: "Min ___ (to a female) — please"',
        questionFr: 'Complétez: "Min ___ (à une femme) — s\'il vous plaît"',
        correctAnswer: 'fadlik',
        correctAnswerFr: 'fadlik',
        hint: 'Feminine form of fadlak',
        hintFr: 'Forme féminine de fadlak'
      },
      {
        id: 'ar-s2-1-13',
        type: 'multiple-choice',
        question: 'What is "Tafaddal" used for?',
        questionFr: 'À quoi sert "Tafaddal"?',
        correctAnswer: 'Please come in / Here you go',
        correctAnswerFr: 'Entrez s\'il vous plaît / Voilà',
        options: ['Please come in / Here you go', 'Thank you very much', 'Excuse me', 'Sorry'],
        optionsFr: ['Entrez s\'il vous plaît / Voilà', 'Merci beaucoup', 'Excusez-moi', 'Désolé']
      },
      {
        id: 'ar-s2-1-14',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Arabic',
        questionFr: 'Tapez "Merci beaucoup" en Arabe',
        correctAnswer: 'Shukran jazilan',
        correctAnswerFr: 'Shukran jazilan'
      },
      {
        id: 'ar-s2-1-15',
        type: 'multiple-choice',
        question: 'What does "Jazilan" mean on its own?',
        questionFr: 'Que signifie "Jazilan" seul?',
        correctAnswer: 'Very much / greatly',
        correctAnswerFr: 'Beaucoup / grandement',
        options: ['Very much / greatly', 'Small', 'Fast', 'Beautiful'],
        optionsFr: ['Beaucoup / grandement', 'Petit', 'Rapide', 'Beau']
      },
      {
        id: 'ar-s2-1-16',
        type: 'multiple-choice',
        question: '"Min fadlak, a\'tini maa." What is being requested?',
        questionFr: '"Min fadlak, a\'tini maa." Que demande-t-on?',
        correctAnswer: 'Water, please',
        correctAnswerFr: 'De l\'eau, s\'il vous plaît',
        options: ['Water, please', 'Food, please', 'Help, please', 'Time, please'],
        optionsFr: ['De l\'eau, s\'il vous plaît', 'De la nourriture, s\'il vous plaît', 'De l\'aide, s\'il vous plaît', 'Du temps, s\'il vous plaît']
      },
      {
        id: 'ar-s2-1-17',
        type: 'fill-blank',
        question: 'Complete: "___ jazilan!" (Thank you very much!)',
        questionFr: 'Complétez: "___ jazilan!" (Merci beaucoup!)',
        correctAnswer: 'Shukran',
        correctAnswerFr: 'Shukran',
        hint: 'The basic word for "thank you"',
        hintFr: 'Le mot de base pour "merci"'
      },
      {
        id: 'ar-s2-1-18',
        type: 'multiple-choice',
        question: 'Which phrase means "please" and is also used to offer hospitality?',
        questionFr: 'Quelle expression signifie "s\'il vous plaît" et s\'utilise aussi pour offrir l\'hospitalité?',
        correctAnswer: 'Tafaddal',
        correctAnswerFr: 'Tafaddal',
        options: ['Tafaddal', 'Min fadlak', 'Shukran', 'Afwan']
      },
      {
        id: 'ar-s2-1-19',
        type: 'type-answer',
        question: 'Type "Please" (to a female) in Arabic',
        questionFr: 'Tapez "S\'il vous plaît" (à une femme) en Arabe',
        correctAnswer: 'Min fadlik',
        correctAnswerFr: 'Min fadlik'
      },
      {
        id: 'ar-s2-1-20',
        type: 'multiple-choice',
        question: 'How would you politely ask for food in Arabic?',
        questionFr: 'Comment demander poliment de la nourriture en Arabe?',
        correctAnswer: 'Min fadlak, a\'tini ta\'aam',
        correctAnswerFr: 'Min fadlak, a\'tini ta\'aam',
        options: ['Min fadlak, a\'tini ta\'aam', 'Shukran ta\'aam', 'Afwan ta\'aam', 'Aasif ta\'aam']
      }
    ]
  },
  // Stage 2, Mission 2: Apologies & Forgiveness
  {
    id: 'ar-vocab-2-2',
    stageId: 'arabic-stage-2',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Apologies & Forgiveness',
    titleFr: 'Excuses et pardon',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-2-1',
        type: 'multiple-choice',
        question: 'How do you say "Sorry" in Arabic (masculine speaker)?',
        questionFr: 'Comment dit-on "Désolé" en Arabe (locuteur masculin)?',
        correctAnswer: 'Aasif',
        correctAnswerFr: 'Aasif',
        options: ['Aasif', 'Aasifa', 'Afwan', 'Udhur']
      },
      {
        id: 'ar-s2-2-2',
        type: 'multiple-choice',
        question: 'How do you say "Sorry" in Arabic (feminine speaker)?',
        questionFr: 'Comment dit-on "Désolée" en Arabe (locutrice féminine)?',
        correctAnswer: 'Aasifa',
        correctAnswerFr: 'Aasifa',
        options: ['Aasifa', 'Aasif', 'Afwan', 'Udhur']
      },
      {
        id: 'ar-s2-2-3',
        type: 'type-answer',
        question: 'Type "Excuse me" in Arabic',
        questionFr: 'Tapez "Excusez-moi" en Arabe',
        correctAnswer: 'Udhur',
        correctAnswerFr: 'Udhur'
      },
      {
        id: 'ar-s2-2-4',
        type: 'multiple-choice',
        question: 'What does "La ba\'sa" mean?',
        questionFr: 'Que signifie "La ba\'sa"?',
        correctAnswer: 'No problem',
        correctAnswerFr: 'Pas de problème',
        options: ['No problem', 'I\'m sorry', 'Excuse me', 'Forgive me'],
        optionsFr: ['Pas de problème', 'Je suis désolé', 'Excusez-moi', 'Pardonnez-moi']
      },
      {
        id: 'ar-s2-2-5',
        type: 'fill-blank',
        question: 'Complete: "La ___" (No problem)',
        questionFr: 'Complétez: "La ___" (Pas de problème)',
        correctAnswer: 'ba\'sa',
        correctAnswerFr: 'ba\'sa',
        hint: 'The word meaning "harm/problem"',
        hintFr: 'Le mot signifiant "problème"'
      },
      {
        id: 'ar-s2-2-6',
        type: 'multiple-choice',
        question: 'What is "I\'m sorry" (a deeper apology) in Arabic?',
        questionFr: 'Comment dit-on "Je suis vraiment désolé" en Arabe?',
        correctAnswer: 'Ana mutaassif',
        correctAnswerFr: 'Ana mutaassif',
        options: ['Ana mutaassif', 'Aasif', 'Udhur', 'La ba\'sa']
      },
      {
        id: 'ar-s2-2-7',
        type: 'type-answer',
        question: 'Type "No problem" in Arabic',
        questionFr: 'Tapez "Pas de problème" en Arabe',
        correctAnswer: 'La ba\'sa',
        correctAnswerFr: 'La ba\'sa'
      },
      {
        id: 'ar-s2-2-8',
        type: 'multiple-choice',
        question: 'When would you use "Udhur" vs "Aasif"?',
        questionFr: 'Quand utiliser "Udhur" plutôt que "Aasif"?',
        correctAnswer: 'Udhur to get attention / pass by; Aasif for genuine apology',
        correctAnswerFr: 'Udhur pour attirer l\'attention / passer; Aasif pour une vraie excuse',
        options: ['Udhur to get attention / pass by; Aasif for genuine apology', 'They are the same', 'Udhur is formal, Aasif informal', 'Aasif is for men only'],
        optionsFr: ['Udhur pour attirer l\'attention / passer; Aasif pour une vraie excuse', 'Ils sont identiques', 'Udhur est formel, Aasif informel', 'Aasif est pour les hommes seulement']
      },
      {
        id: 'ar-s2-2-9',
        type: 'fill-blank',
        question: 'Complete: "Urjuk ___" (Please forgive me)',
        questionFr: 'Complétez: "Urjuk ___" (S\'il te plaît, pardonne-moi)',
        correctAnswer: 'al-afw',
        correctAnswerFr: 'al-afw',
        hint: 'The word meaning "forgiveness/pardon"',
        hintFr: 'Le mot signifiant "pardon"'
      },
      {
        id: 'ar-s2-2-10',
        type: 'multiple-choice',
        question: 'What is the correct response to "Aasif"?',
        questionFr: 'Quelle est la bonne réponse à "Aasif"?',
        correctAnswer: 'La ba\'sa',
        correctAnswerFr: 'La ba\'sa',
        options: ['La ba\'sa', 'Shukran', 'Min fadlak', 'Marhaba']
      },
      {
        id: 'ar-s2-2-11',
        type: 'type-answer',
        question: 'Type "Sorry" in Arabic (masculine speaker)',
        questionFr: 'Tapez "Désolé" en Arabe (locuteur masculin)',
        correctAnswer: 'Aasif',
        correctAnswerFr: 'Aasif'
      },
      {
        id: 'ar-s2-2-12',
        type: 'multiple-choice',
        question: '"Mutaassif" compared to "Aasif" expresses:',
        questionFr: '"Mutaassif" par rapport à "Aasif" exprime:',
        correctAnswer: 'A deeper or more formal apology',
        correctAnswerFr: 'Une excuse plus profonde ou plus formelle',
        options: ['A deeper or more formal apology', 'A lighter apology', 'The same level of apology', 'No apology at all'],
        optionsFr: ['Une excuse plus profonde ou plus formelle', 'Une excuse légère', 'Le même niveau d\'excuse', 'Aucune excuse']
      },
      {
        id: 'ar-s2-2-13',
        type: 'fill-blank',
        question: 'Complete: "Aasif___" (Sorry, feminine speaker)',
        questionFr: 'Complétez: "Aasif___" (Désolée, locutrice féminine)',
        correctAnswer: 'a',
        correctAnswerFr: 'a',
        hint: 'Add the feminine suffix',
        hintFr: 'Ajoutez le suffixe féminin'
      },
      {
        id: 'ar-s2-2-14',
        type: 'multiple-choice',
        question: 'How do you say "Pardon me" in Arabic?',
        questionFr: 'Comment dit-on "Pardonnez-moi" en Arabe?',
        correctAnswer: 'Urjuk al-afw',
        correctAnswerFr: 'Urjuk al-afw',
        options: ['Urjuk al-afw', 'Aasif', 'Udhur', 'La ba\'sa']
      },
      {
        id: 'ar-s2-2-15',
        type: 'type-answer',
        question: 'Type "Excuse me" in Arabic',
        questionFr: 'Tapez "Excusez-moi" en Arabe',
        correctAnswer: 'Udhur',
        correctAnswerFr: 'Udhur'
      },
      {
        id: 'ar-s2-2-16',
        type: 'multiple-choice',
        question: 'What does "La ba\'sa" literally mean?',
        questionFr: 'Que signifie littéralement "La ba\'sa"?',
        correctAnswer: 'No harm (no problem)',
        correctAnswerFr: 'Pas de mal (pas de problème)',
        options: ['No harm (no problem)', 'Big problem', 'It\'s okay later', 'Small issue'],
        optionsFr: ['Pas de mal (pas de problème)', 'Grand problème', 'C\'est bon plus tard', 'Petit problème']
      },
      {
        id: 'ar-s2-2-17',
        type: 'fill-blank',
        question: 'Complete: "Ana ___" (I\'m sorry — deeper apology)',
        questionFr: 'Complétez: "Ana ___" (Je suis vraiment désolé)',
        correctAnswer: 'mutaassif',
        correctAnswerFr: 'mutaassif',
        hint: 'Stronger form of "sorry" with "Ana" (I)',
        hintFr: 'Forme plus forte de "désolé" avec "Ana" (je)'
      },
      {
        id: 'ar-s2-2-18',
        type: 'multiple-choice',
        question: 'You accidentally bump into someone. What do you say?',
        questionFr: 'Vous bousculez accidentellement quelqu\'un. Que dites-vous?',
        correctAnswer: 'Aasif',
        correctAnswerFr: 'Aasif',
        options: ['Aasif', 'Shukran', 'Marhaba', 'Min fadlak']
      },
      {
        id: 'ar-s2-2-19',
        type: 'type-answer',
        question: 'Type "No problem" in Arabic',
        questionFr: 'Tapez "Pas de problème" en Arabe',
        correctAnswer: 'La ba\'sa',
        correctAnswerFr: 'La ba\'sa'
      },
      {
        id: 'ar-s2-2-20',
        type: 'multiple-choice',
        question: 'Which Arabic phrase do you use to get someone\'s attention politely?',
        questionFr: 'Quelle expression arabe utiliser pour attirer poliment l\'attention de quelqu\'un?',
        correctAnswer: 'Udhur',
        correctAnswerFr: 'Udhur',
        options: ['Udhur', 'Aasif', 'Shukran', 'Afwan']
      }
    ]
  },
  // Stage 2, Mission 3: Yes, No & Agreement
  {
    id: 'ar-vocab-2-3',
    stageId: 'arabic-stage-2',
    lessonNumber: 3,
    type: 'vocabulary',
    title: 'Yes, No & Agreement',
    titleFr: 'Oui, Non et Accord',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-3-1',
        type: 'multiple-choice',
        question: 'What is "Yes" in Arabic?',
        questionFr: 'Comment dit-on "Oui" en Arabe?',
        correctAnswer: 'Na\'am',
        correctAnswerFr: 'Na\'am',
        options: ['Na\'am', 'La', 'Rubbama', 'Tab\'an']
      },
      {
        id: 'ar-s2-3-2',
        type: 'type-answer',
        question: 'Type "No" in Arabic',
        questionFr: 'Tapez "Non" en Arabe',
        correctAnswer: 'La',
        correctAnswerFr: 'La'
      },
      {
        id: 'ar-s2-3-3',
        type: 'multiple-choice',
        question: 'What does "Sahih" mean?',
        questionFr: 'Que signifie "Sahih"?',
        correctAnswer: 'Correct / True',
        correctAnswerFr: 'Correct / Vrai',
        options: ['Correct / True', 'No', 'Maybe', 'Of course'],
        optionsFr: ['Correct / Vrai', 'Non', 'Peut-être', 'Bien sûr']
      },
      {
        id: 'ar-s2-3-4',
        type: 'multiple-choice',
        question: 'How do you say "Of course" in Arabic?',
        questionFr: 'Comment dit-on "Bien sûr" en Arabe?',
        correctAnswer: 'Tab\'an',
        correctAnswerFr: 'Tab\'an',
        options: ['Tab\'an', 'Na\'am', 'Rubbama', 'La']
      },
      {
        id: 'ar-s2-3-5',
        type: 'type-answer',
        question: 'Type "Maybe" in Arabic',
        questionFr: 'Tapez "Peut-être" en Arabe',
        correctAnswer: 'Rubbama',
        correctAnswerFr: 'Rubbama'
      },
      {
        id: 'ar-s2-3-6',
        type: 'multiple-choice',
        question: 'What is "I agree" in Arabic?',
        questionFr: 'Comment dit-on "Je suis d\'accord" en Arabe?',
        correctAnswer: 'Muwafiq',
        correctAnswerFr: 'Muwafiq',
        options: ['Muwafiq', 'Na\'am', 'Tab\'an', 'Sahih']
      },
      {
        id: 'ar-s2-3-7',
        type: 'fill-blank',
        question: 'Complete: "Qat\'an ___" (Absolutely not)',
        questionFr: 'Complétez: "Qat\'an ___" (Absolument pas)',
        correctAnswer: 'la',
        correctAnswerFr: 'la',
        hint: 'The word for "no" in Arabic',
        hintFr: 'Le mot pour "non" en Arabe'
      },
      {
        id: 'ar-s2-3-8',
        type: 'multiple-choice',
        question: '"Tab\'an" is used to mean:',
        questionFr: '"Tab\'an" est utilisé pour dire:',
        correctAnswer: 'Of course / Naturally',
        correctAnswerFr: 'Bien sûr / Naturellement',
        options: ['Of course / Naturally', 'Maybe', 'I disagree', 'Absolutely not'],
        optionsFr: ['Bien sûr / Naturellement', 'Peut-être', 'Je ne suis pas d\'accord', 'Absolument pas']
      },
      {
        id: 'ar-s2-3-9',
        type: 'type-answer',
        question: 'Type "Of course" in Arabic',
        questionFr: 'Tapez "Bien sûr" en Arabe',
        correctAnswer: 'Tab\'an',
        correctAnswerFr: 'Tab\'an'
      },
      {
        id: 'ar-s2-3-10',
        type: 'multiple-choice',
        question: 'What does "Qat\'an la" mean?',
        questionFr: 'Que signifie "Qat\'an la"?',
        correctAnswer: 'Absolutely not',
        correctAnswerFr: 'Absolument pas',
        options: ['Absolutely not', 'Of course', 'Maybe not', 'I agree'],
        optionsFr: ['Absolument pas', 'Bien sûr', 'Peut-être pas', 'Je suis d\'accord']
      },
      {
        id: 'ar-s2-3-11',
        type: 'fill-blank',
        question: 'Complete: "Na\'___ " (Yes)',
        questionFr: 'Complétez: "Na\'___ " (Oui)',
        correctAnswer: 'am',
        correctAnswerFr: 'am',
        hint: 'The second syllable of the Arabic word for "yes"',
        hintFr: 'La deuxième syllabe du mot arabe pour "oui"'
      },
      {
        id: 'ar-s2-3-12',
        type: 'multiple-choice',
        question: 'You are asked "Hal tuhibbu al-qahwa?" (Do you like coffee?). You like it. You say:',
        questionFr: 'On vous demande "Hal tuhibbu al-qahwa?" (Tu aimes le café?). Vous l\'aimez. Vous dites:',
        correctAnswer: 'Na\'am',
        correctAnswerFr: 'Na\'am',
        options: ['Na\'am', 'La', 'Rubbama', 'Muwafiq']
      },
      {
        id: 'ar-s2-3-13',
        type: 'type-answer',
        question: 'Type "I agree" in Arabic',
        questionFr: 'Tapez "Je suis d\'accord" en Arabe',
        correctAnswer: 'Muwafiq',
        correctAnswerFr: 'Muwafiq'
      },
      {
        id: 'ar-s2-3-14',
        type: 'multiple-choice',
        question: 'What does "Sahih" confirm?',
        questionFr: 'Que confirme "Sahih"?',
        correctAnswer: 'That something is correct or accurate',
        correctAnswerFr: 'Que quelque chose est correct ou exact',
        options: ['That something is correct or accurate', 'That something is wrong', 'A question', 'A refusal'],
        optionsFr: ['Que quelque chose est correct ou exact', 'Que quelque chose est faux', 'Une question', 'Un refus']
      },
      {
        id: 'ar-s2-3-15',
        type: 'fill-blank',
        question: 'Complete: "Rubba___" (Maybe)',
        questionFr: 'Complétez: "Rubba___" (Peut-être)',
        correctAnswer: 'ma',
        correctAnswerFr: 'ma',
        hint: 'Complete the word for "maybe"',
        hintFr: 'Complétez le mot pour "peut-être"'
      },
      {
        id: 'ar-s2-3-16',
        type: 'multiple-choice',
        question: 'Which word shows strong agreement in Arabic?',
        questionFr: 'Quel mot exprime un fort accord en Arabe?',
        correctAnswer: 'Tab\'an',
        correctAnswerFr: 'Tab\'an',
        options: ['Tab\'an', 'Rubbama', 'La', 'Aasif']
      },
      {
        id: 'ar-s2-3-17',
        type: 'type-answer',
        question: 'Type "Correct / True" in Arabic',
        questionFr: 'Tapez "Correct / Vrai" en Arabe',
        correctAnswer: 'Sahih',
        correctAnswerFr: 'Sahih'
      },
      {
        id: 'ar-s2-3-18',
        type: 'multiple-choice',
        question: 'Someone says "2 + 2 = 4". You confirm this. You say:',
        questionFr: 'Quelqu\'un dit "2 + 2 = 4". Vous confirmez. Vous dites:',
        correctAnswer: 'Sahih',
        correctAnswerFr: 'Sahih',
        options: ['Sahih', 'La', 'Rubbama', 'Aasif']
      },
      {
        id: 'ar-s2-3-19',
        type: 'fill-blank',
        question: 'Complete: "Muwa___" (I agree)',
        questionFr: 'Complétez: "Muwa___" (Je suis d\'accord)',
        correctAnswer: 'fiq',
        correctAnswerFr: 'fiq',
        hint: 'Complete the word for "I agree"',
        hintFr: 'Complétez le mot pour "je suis d\'accord"'
      },
      {
        id: 'ar-s2-3-20',
        type: 'multiple-choice',
        question: 'How do you politely express "Absolutely not" in Arabic?',
        questionFr: 'Comment exprime-t-on poliment "Absolument pas" en Arabe?',
        correctAnswer: 'Qat\'an la',
        correctAnswerFr: 'Qat\'an la',
        options: ['Qat\'an la', 'Na\'am la', 'Tab\'an la', 'Sahih la']
      }
    ]
  },
  // Stage 2, Mission 4: Welcome & Hospitality
  {
    id: 'ar-vocab-2-4',
    stageId: 'arabic-stage-2',
    lessonNumber: 4,
    type: 'vocabulary',
    title: 'Welcome & Hospitality',
    titleFr: 'Accueil et hospitalité',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-4-1',
        type: 'multiple-choice',
        question: 'What is "Welcome" (as a greeting) in Arabic?',
        questionFr: 'Comment dit-on "Bienvenue" (en tant que salutation) en Arabe?',
        correctAnswer: 'Ahlan',
        correctAnswerFr: 'Ahlan',
        options: ['Ahlan', 'Tafaddal', 'Shukran', 'Marhaba']
      },
      {
        id: 'ar-s2-4-2',
        type: 'type-answer',
        question: 'Type "Come in / Please (proceed)" in Arabic',
        questionFr: 'Tapez "Entrez / S\'il vous plaît (continuez)" en Arabe',
        correctAnswer: 'Tafaddal',
        correctAnswerFr: 'Tafaddal'
      },
      {
        id: 'ar-s2-4-3',
        type: 'multiple-choice',
        question: 'What is "Sit down" in Arabic?',
        questionFr: 'Comment dit-on "Asseyez-vous" en Arabe?',
        correctAnswer: 'Jlis',
        correctAnswerFr: 'Jlis',
        options: ['Jlis', 'Kul', 'Tafaddal', 'Ahlan']
      },
      {
        id: 'ar-s2-4-4',
        type: 'multiple-choice',
        question: 'What does "Kul" mean in a hospitality context?',
        questionFr: 'Que signifie "Kul" dans un contexte d\'hospitalité?',
        correctAnswer: 'Eat (please eat)',
        correctAnswerFr: 'Mange (mange s\'il te plaît)',
        options: ['Eat (please eat)', 'Drink', 'Sit', 'Come in'],
        optionsFr: ['Mange (mange s\'il te plaît)', 'Bois', 'Assieds-toi', 'Entre']
      },
      {
        id: 'ar-s2-4-5',
        type: 'fill-blank',
        question: 'Complete: "Manzilna ___" (Our home is your home)',
        questionFr: 'Complétez: "Manzilna ___" (Notre maison est ta maison)',
        correctAnswer: 'manzilak',
        correctAnswerFr: 'manzilak',
        hint: 'The phrase "your home" (masculine)',
        hintFr: 'L\'expression "ta maison" (masculin)'
      },
      {
        id: 'ar-s2-4-6',
        type: 'multiple-choice',
        question: '"Manzilna manzilak" expresses:',
        questionFr: '"Manzilna manzilak" exprime:',
        correctAnswer: 'Our home is your home (deep hospitality)',
        correctAnswerFr: 'Notre maison est ta maison (hospitalité profonde)',
        options: ['Our home is your home (deep hospitality)', 'Our home is big', 'Your home is far', 'Welcome to my home'],
        optionsFr: ['Notre maison est ta maison (hospitalité profonde)', 'Notre maison est grande', 'Ta maison est loin', 'Bienvenue chez moi']
      },
      {
        id: 'ar-s2-4-7',
        type: 'type-answer',
        question: 'Type "Sit down" in Arabic',
        questionFr: 'Tapez "Asseyez-vous" en Arabe',
        correctAnswer: 'Jlis',
        correctAnswerFr: 'Jlis'
      },
      {
        id: 'ar-s2-4-8',
        type: 'multiple-choice',
        question: 'A guest arrives at your door. What do you say to invite them in?',
        questionFr: 'Un invité arrive à votre porte. Que dites-vous pour l\'inviter à entrer?',
        correctAnswer: 'Tafaddal',
        correctAnswerFr: 'Tafaddal',
        options: ['Tafaddal', 'Aasif', 'Ma\'a salama', 'Shukran']
      },
      {
        id: 'ar-s2-4-9',
        type: 'fill-blank',
        question: 'Complete: "___lan" (Welcome)',
        questionFr: 'Complétez: "___lan" (Bienvenue)',
        correctAnswer: 'Ah',
        correctAnswerFr: 'Ah',
        hint: 'The first syllable of the Arabic word for "welcome"',
        hintFr: 'La première syllabe du mot arabe pour "bienvenue"'
      },
      {
        id: 'ar-s2-4-10',
        type: 'multiple-choice',
        question: 'What is "Please eat" in Arabic?',
        questionFr: 'Comment dit-on "Mange s\'il te plaît" en Arabe?',
        correctAnswer: 'Kul, tafaddal',
        correctAnswerFr: 'Kul, tafaddal',
        options: ['Kul, tafaddal', 'Jlis, tafaddal', 'Shrab, tafaddal', 'Tafaddal, ahlan']
      },
      {
        id: 'ar-s2-4-11',
        type: 'type-answer',
        question: 'Type "Our home is your home" in Arabic',
        questionFr: 'Tapez "Notre maison est ta maison" en Arabe',
        correctAnswer: 'Manzilna manzilak',
        correctAnswerFr: 'Manzilna manzilak'
      },
      {
        id: 'ar-s2-4-12',
        type: 'multiple-choice',
        question: 'How do you offer a drink to a guest in Arabic?',
        questionFr: 'Comment offrir une boisson à un invité en Arabe?',
        correctAnswer: 'Shrab, tafaddal',
        correctAnswerFr: 'Shrab, tafaddal',
        options: ['Shrab, tafaddal', 'Kul, tafaddal', 'Jlis, tafaddal', 'Ahlan, shukran']
      },
      {
        id: 'ar-s2-4-13',
        type: 'fill-blank',
        question: 'Complete: "Tafad___" (Come in / Please proceed)',
        questionFr: 'Complétez: "Tafad___" (Entrez / Continuez s\'il vous plaît)',
        correctAnswer: 'dal',
        correctAnswerFr: 'dal',
        hint: 'Complete the hospitality phrase',
        hintFr: 'Complétez l\'expression d\'hospitalité'
      },
      {
        id: 'ar-s2-4-14',
        type: 'multiple-choice',
        question: 'Which phrase reflects traditional Arabic hospitality toward guests?',
        questionFr: 'Quelle expression reflète l\'hospitalité arabe traditionnelle envers les invités?',
        correctAnswer: 'Manzilna manzilak',
        correctAnswerFr: 'Manzilna manzilak',
        options: ['Manzilna manzilak', 'La ba\'sa', 'Shukran jazilan', 'Rubbama']
      },
      {
        id: 'ar-s2-4-15',
        type: 'type-answer',
        question: 'Type "Welcome" in Arabic',
        questionFr: 'Tapez "Bienvenue" en Arabe',
        correctAnswer: 'Ahlan',
        correctAnswerFr: 'Ahlan'
      },
      {
        id: 'ar-s2-4-16',
        type: 'multiple-choice',
        question: 'What is "Drink" (imperative) in Arabic?',
        questionFr: 'Comment dit-on "Bois" (impératif) en Arabe?',
        correctAnswer: 'Shrab',
        correctAnswerFr: 'Shrab',
        options: ['Shrab', 'Kul', 'Jlis', 'Tafaddal']
      },
      {
        id: 'ar-s2-4-17',
        type: 'fill-blank',
        question: 'Complete: "J___" (Sit down — imperative)',
        questionFr: 'Complétez: "J___" (Assieds-toi — impératif)',
        correctAnswer: 'lis',
        correctAnswerFr: 'lis',
        hint: 'Complete the command to sit',
        hintFr: 'Complétez l\'ordre de s\'asseoir'
      },
      {
        id: 'ar-s2-4-18',
        type: 'multiple-choice',
        question: 'A host says "Kul, kul!" to their guest. The guest should:',
        questionFr: 'Un hôte dit "Kul, kul!" à son invité. L\'invité devrait:',
        correctAnswer: 'Eat more food',
        correctAnswerFr: 'Manger davantage',
        options: ['Eat more food', 'Leave quickly', 'Say goodbye', 'Ask for directions'],
        optionsFr: ['Manger davantage', 'Partir vite', 'Dire au revoir', 'Demander des directions']
      },
      {
        id: 'ar-s2-4-19',
        type: 'type-answer',
        question: 'Type "Come in" in Arabic',
        questionFr: 'Tapez "Entrez" en Arabe',
        correctAnswer: 'Tafaddal',
        correctAnswerFr: 'Tafaddal'
      },
      {
        id: 'ar-s2-4-20',
        type: 'multiple-choice',
        question: 'How do you say "Eat" (command, to a guest) in Arabic?',
        questionFr: 'Comment dit-on "Mange" (ordre, à un invité) en Arabe?',
        correctAnswer: 'Kul',
        correctAnswerFr: 'Kul',
        options: ['Kul', 'Jlis', 'Shrab', 'Ahlan']
      }
    ]
  },
  // Stage 2, Mission 5: Polite Requests
  {
    id: 'ar-vocab-2-5',
    stageId: 'arabic-stage-2',
    lessonNumber: 5,
    type: 'vocabulary',
    title: 'Polite Requests',
    titleFr: 'Demandes polies',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-5-1',
        type: 'multiple-choice',
        question: 'How do you say "I want" in Arabic?',
        questionFr: 'Comment dit-on "Je veux" en Arabe?',
        correctAnswer: 'Urid',
        correctAnswerFr: 'Urid',
        options: ['Urid', 'Ahtaj', 'Arju', 'Abhas']
      },
      {
        id: 'ar-s2-5-2',
        type: 'type-answer',
        question: 'Type "I need" in Arabic',
        questionFr: 'Tapez "J\'ai besoin" en Arabe',
        correctAnswer: 'Ahtaj',
        correctAnswerFr: 'Ahtaj'
      },
      {
        id: 'ar-s2-5-3',
        type: 'multiple-choice',
        question: 'What is "Can you...?" in Arabic?',
        questionFr: 'Comment dit-on "Peux-tu...?" en Arabe?',
        correctAnswer: 'Hal yumkinak?',
        correctAnswerFr: 'Hal yumkinak?',
        options: ['Hal yumkinak?', 'Hal urid?', 'Hal ahtaj?', 'Hal arju?']
      },
      {
        id: 'ar-s2-5-4',
        type: 'multiple-choice',
        question: 'What does "Arju" mean?',
        questionFr: 'Que signifie "Arju"?',
        correctAnswer: 'I request / I hope / Please',
        correctAnswerFr: 'Je demande / J\'espère / S\'il vous plaît',
        options: ['I request / I hope / Please', 'I want', 'I need', 'I am looking for'],
        optionsFr: ['Je demande / J\'espère / S\'il vous plaît', 'Je veux', 'J\'ai besoin', 'Je cherche']
      },
      {
        id: 'ar-s2-5-5',
        type: 'fill-blank',
        question: 'Complete: "Abhas ___" (I am looking for...)',
        questionFr: 'Complétez: "Abhas ___" (Je cherche...)',
        correctAnswer: '\'an',
        correctAnswerFr: '\'an',
        hint: 'The preposition meaning "for / about"',
        hintFr: 'La préposition signifiant "pour / à propos de"'
      },
      {
        id: 'ar-s2-5-6',
        type: 'multiple-choice',
        question: 'How do you politely ask "Can you help me?" in Arabic?',
        questionFr: 'Comment demander poliment "Peux-tu m\'aider?" en Arabe?',
        correctAnswer: 'Hal yumkinak musa\'adati?',
        correctAnswerFr: 'Hal yumkinak musa\'adati?',
        options: ['Hal yumkinak musa\'adati?', 'Urid musa\'ada', 'Ahtaj musa\'ada', 'Arju musa\'ada']
      },
      {
        id: 'ar-s2-5-7',
        type: 'type-answer',
        question: 'Type "I want water" in Arabic',
        questionFr: 'Tapez "Je veux de l\'eau" en Arabe',
        correctAnswer: 'Urid maa',
        correctAnswerFr: 'Urid maa'
      },
      {
        id: 'ar-s2-5-8',
        type: 'multiple-choice',
        question: '"Ahtaj musa\'ada" means:',
        questionFr: '"Ahtaj musa\'ada" signifie:',
        correctAnswer: 'I need help',
        correctAnswerFr: 'J\'ai besoin d\'aide',
        options: ['I need help', 'I want to help', 'Help me please', 'Can you help?'],
        optionsFr: ['J\'ai besoin d\'aide', 'Je veux aider', 'Aide-moi s\'il te plaît', 'Peux-tu aider?']
      },
      {
        id: 'ar-s2-5-9',
        type: 'fill-blank',
        question: 'Complete: "Hal ___ an tusa\'idani?" (Can you help me?)',
        questionFr: 'Complétez: "Hal ___ an tusa\'idani?" (Peux-tu m\'aider?)',
        correctAnswer: 'yumkinak',
        correctAnswerFr: 'yumkinak',
        hint: 'The phrase meaning "is it possible for you"',
        hintFr: 'L\'expression signifiant "est-il possible pour toi"'
      },
      {
        id: 'ar-s2-5-10',
        type: 'multiple-choice',
        question: 'You are at a restaurant. How do you politely order?',
        questionFr: 'Vous êtes au restaurant. Comment commandez-vous poliment?',
        correctAnswer: 'Urid ta\'aam, min fadlak',
        correctAnswerFr: 'Urid ta\'aam, min fadlak',
        options: ['Urid ta\'aam, min fadlak', 'Shukran ta\'aam', 'Ahtaj ta\'aam shukran', 'Arju kul']
      },
      {
        id: 'ar-s2-5-11',
        type: 'type-answer',
        question: 'Type "I need a doctor" in Arabic',
        questionFr: 'Tapez "J\'ai besoin d\'un médecin" en Arabe',
        correctAnswer: 'Ahtaj tabib',
        correctAnswerFr: 'Ahtaj tabib'
      },
      {
        id: 'ar-s2-5-12',
        type: 'multiple-choice',
        question: 'What is "I am looking for the hotel" in Arabic?',
        questionFr: 'Comment dit-on "Je cherche l\'hôtel" en Arabe?',
        correctAnswer: 'Abhas \'an al-funduq',
        correctAnswerFr: 'Abhas \'an al-funduq',
        options: ['Abhas \'an al-funduq', 'Urid al-funduq', 'Ahtaj al-funduq', 'Arju al-funduq']
      },
      {
        id: 'ar-s2-5-13',
        type: 'fill-blank',
        question: 'Complete: "U___" (I want — first person singular)',
        questionFr: 'Complétez: "U___" (Je veux — première personne singulier)',
        correctAnswer: 'rid',
        correctAnswerFr: 'rid',
        hint: 'Complete the verb "to want" in first person',
        hintFr: 'Complétez le verbe "vouloir" à la première personne'
      },
      {
        id: 'ar-s2-5-14',
        type: 'multiple-choice',
        question: 'How do you say "I would like some tea, please" in Arabic?',
        questionFr: 'Comment dit-on "Je voudrais du thé, s\'il vous plaît" en Arabe?',
        correctAnswer: 'Urid shay, min fadlak',
        correctAnswerFr: 'Urid shay, min fadlak',
        options: ['Urid shay, min fadlak', 'Ahtaj shay', 'Arju shay', 'Abhas shay']
      },
      {
        id: 'ar-s2-5-15',
        type: 'type-answer',
        question: 'Type "Can you repeat?" in Arabic',
        questionFr: 'Tapez "Peux-tu répéter?" en Arabe',
        correctAnswer: 'Hal yumkinak al-i\'ada?',
        correctAnswerFr: 'Hal yumkinak al-i\'ada?'
      },
      {
        id: 'ar-s2-5-16',
        type: 'multiple-choice',
        question: '"Arju" is most similar in meaning to:',
        questionFr: '"Arju" est le plus proche en signification de:',
        correctAnswer: 'I request / I kindly ask',
        correctAnswerFr: 'Je demande / Je sollicite aimablement',
        options: ['I request / I kindly ask', 'I demand', 'I refuse', 'I forget'],
        optionsFr: ['Je demande / Je sollicite aimablement', 'J\'exige', 'Je refuse', 'J\'oublie']
      },
      {
        id: 'ar-s2-5-17',
        type: 'fill-blank',
        question: 'Complete: "Ah___" (I need — first person)',
        questionFr: 'Complétez: "Ah___" (J\'ai besoin — première personne)',
        correctAnswer: 'taj',
        correctAnswerFr: 'taj',
        hint: 'Complete the verb "to need"',
        hintFr: 'Complétez le verbe "avoir besoin"'
      },
      {
        id: 'ar-s2-5-18',
        type: 'multiple-choice',
        question: 'What does "Abhas \'an" mean?',
        questionFr: 'Que signifie "Abhas \'an"?',
        correctAnswer: 'I am looking for',
        correctAnswerFr: 'Je cherche',
        options: ['I am looking for', 'I want', 'I need', 'I request'],
        optionsFr: ['Je cherche', 'Je veux', 'J\'ai besoin', 'Je demande']
      },
      {
        id: 'ar-s2-5-19',
        type: 'type-answer',
        question: 'Type "Can you?" in Arabic',
        questionFr: 'Tapez "Peux-tu?" en Arabe',
        correctAnswer: 'Hal yumkinak?',
        correctAnswerFr: 'Hal yumkinak?'
      },
      {
        id: 'ar-s2-5-20',
        type: 'multiple-choice',
        question: 'How do you make a polite request using "Arju" in Arabic?',
        questionFr: 'Comment fait-on une demande polie avec "Arju" en Arabe?',
        correctAnswer: 'Arju + the thing requested',
        correctAnswerFr: 'Arju + la chose demandée',
        options: ['Arju + the thing requested', 'La + the thing requested', 'Shukran + the thing requested', 'Aasif + the thing requested'],
        optionsFr: ['Arju + la chose demandée', 'La + la chose demandée', 'Shukran + la chose demandée', 'Aasif + la chose demandée']
      }
    ]
  },
  // Stage 2, Mission 6: Compliments
  {
    id: 'ar-vocab-2-6',
    stageId: 'arabic-stage-2',
    lessonNumber: 6,
    type: 'vocabulary',
    title: 'Giving Compliments',
    titleFr: 'Faire des compliments',
    xpReward: 10,
    exercises: [
      {
        id: 'ar-s2-6-1',
        type: 'multiple-choice',
        question: 'What is "Excellent" in Arabic?',
        questionFr: 'Comment dit-on "Excellent" en Arabe?',
        correctAnswer: 'Mumtaz',
        correctAnswerFr: 'Mumtaz',
        options: ['Mumtaz', 'Jayyid', 'Sahih', 'Kabir']
      },
      {
        id: 'ar-s2-6-2',
        type: 'type-answer',
        question: 'Type "Beautiful" (for a male/masculine) in Arabic',
        questionFr: 'Tapez "Beau" (pour un masculin) en Arabe',
        correctAnswer: 'Jamil',
        correctAnswerFr: 'Jamil'
      },
      {
        id: 'ar-s2-6-3',
        type: 'multiple-choice',
        question: 'How do you say "Beautiful" (feminine) in Arabic?',
        questionFr: 'Comment dit-on "Belle" (féminin) en Arabe?',
        correctAnswer: 'Jamila',
        correctAnswerFr: 'Jamila',
        options: ['Jamila', 'Jamil', 'Mumtaz', 'Dhakiya']
      },
      {
        id: 'ar-s2-6-4',
        type: 'multiple-choice',
        question: '"Anta dhaki" means:',
        questionFr: '"Anta dhaki" signifie:',
        correctAnswer: 'You are smart (to a male)',
        correctAnswerFr: 'Tu es intelligent (à un homme)',
        options: ['You are smart (to a male)', 'You are beautiful', 'You are excellent', 'You are kind'],
        optionsFr: ['Tu es intelligent (à un homme)', 'Tu es beau', 'Tu es excellent', 'Tu es gentil']
      },
      {
        id: 'ar-s2-6-5',
        type: 'fill-blank',
        question: 'Complete: "Anti ___" (You are smart — to a female)',
        questionFr: 'Complétez: "Anti ___" (Tu es intelligente — à une femme)',
        correctAnswer: 'dhakiya',
        correctAnswerFr: 'dhakiya',
        hint: 'Feminine form of "dhaki" (smart)',
        hintFr: 'Forme féminine de "dhaki" (intelligent)'
      },
      {
        id: 'ar-s2-6-6',
        type: 'multiple-choice',
        question: 'What is "I am happy" in Arabic?',
        questionFr: 'Comment dit-on "Je suis heureux" en Arabe?',
        correctAnswer: 'Ana sa\'id',
        correctAnswerFr: 'Ana sa\'id',
        options: ['Ana sa\'id', 'Ana talib', 'Ana kabir', 'Ana saghir']
      },
      {
        id: 'ar-s2-6-7',
        type: 'type-answer',
        question: 'Type "Well done" in Arabic',
        questionFr: 'Tapez "Bravo" en Arabe',
        correctAnswer: 'Ahsant',
        correctAnswerFr: 'Ahsant'
      },
      {
        id: 'ar-s2-6-8',
        type: 'multiple-choice',
        question: '"Ahsant" is used to mean:',
        questionFr: '"Ahsant" est utilisé pour dire:',
        correctAnswer: 'Well done / You did well',
        correctAnswerFr: 'Bravo / Tu as bien fait',
        options: ['Well done / You did well', 'Thank you', 'I\'m sorry', 'Please help me'],
        optionsFr: ['Bravo / Tu as bien fait', 'Merci', 'Je suis désolé', 'Aide-moi s\'il te plaît']
      },
      {
        id: 'ar-s2-6-9',
        type: 'fill-blank',
        question: 'Complete: "Mum___" (Excellent)',
        questionFr: 'Complétez: "Mum___" (Excellent)',
        correctAnswer: 'taz',
        correctAnswerFr: 'taz',
        hint: 'Complete the word for "excellent"',
        hintFr: 'Complétez le mot pour "excellent"'
      },
      {
        id: 'ar-s2-6-10',
        type: 'multiple-choice',
        question: 'Your friend passes a difficult exam. What do you say?',
        questionFr: 'Votre ami réussit un examen difficile. Que dites-vous?',
        correctAnswer: 'Ahsant!',
        correctAnswerFr: 'Ahsant!',
        options: ['Ahsant!', 'Aasif!', 'La ba\'sa!', 'Udhur!']
      },
      {
        id: 'ar-s2-6-11',
        type: 'type-answer',
        question: 'Type "Excellent" in Arabic',
        questionFr: 'Tapez "Excellent" en Arabe',
        correctAnswer: 'Mumtaz',
        correctAnswerFr: 'Mumtaz'
      },
      {
        id: 'ar-s2-6-12',
        type: 'multiple-choice',
        question: 'How do you say "You are kind" in Arabic?',
        questionFr: 'Comment dit-on "Tu es gentil" en Arabe?',
        correctAnswer: 'Anta latif',
        correctAnswerFr: 'Anta latif',
        options: ['Anta latif', 'Anta kabir', 'Anta talib', 'Anta aasif']
      },
      {
        id: 'ar-s2-6-13',
        type: 'fill-blank',
        question: 'Complete: "Ana ___" (I am happy)',
        questionFr: 'Complétez: "Ana ___" (Je suis heureux)',
        correctAnswer: 'sa\'id',
        correctAnswerFr: 'sa\'id',
        hint: 'The Arabic word for "happy"',
        hintFr: 'Le mot arabe pour "heureux"'
      },
      {
        id: 'ar-s2-6-14',
        type: 'multiple-choice',
        question: 'What is the feminine form of "Jamil" (beautiful)?',
        questionFr: 'Quelle est la forme féminine de "Jamil" (beau)?',
        correctAnswer: 'Jamila',
        correctAnswerFr: 'Jamila',
        options: ['Jamila', 'Jamilat', 'Jamilak', 'Jamilun']
      },
      {
        id: 'ar-s2-6-15',
        type: 'type-answer',
        question: 'Type "You are smart" (to a male) in Arabic',
        questionFr: 'Tapez "Tu es intelligent" (à un homme) en Arabe',
        correctAnswer: 'Anta dhaki',
        correctAnswerFr: 'Anta dhaki'
      },
      {
        id: 'ar-s2-6-16',
        type: 'multiple-choice',
        question: '"Jamila" can describe:',
        questionFr: '"Jamila" peut décrire:',
        correctAnswer: 'A beautiful woman or feminine noun',
        correctAnswerFr: 'Une belle femme ou un nom féminin',
        options: ['A beautiful woman or feminine noun', 'A handsome man', 'Any color', 'The weather'],
        optionsFr: ['Une belle femme ou un nom féminin', 'Un bel homme', 'N\'importe quelle couleur', 'La météo']
      },
      {
        id: 'ar-s2-6-17',
        type: 'fill-blank',
        question: 'Complete: "Anta ___" (You are smart — to a male)',
        questionFr: 'Complétez: "Anta ___" (Tu es intelligent — à un homme)',
        correctAnswer: 'dhaki',
        correctAnswerFr: 'dhaki',
        hint: 'The Arabic word for "smart/intelligent" (masculine)',
        hintFr: 'Le mot arabe pour "intelligent" (masculin)'
      },
      {
        id: 'ar-s2-6-18',
        type: 'multiple-choice',
        question: 'How do you say "You are beautiful" to a woman in Arabic?',
        questionFr: 'Comment dit-on "Tu es belle" à une femme en Arabe?',
        correctAnswer: 'Anti jamila',
        correctAnswerFr: 'Anti jamila',
        options: ['Anti jamila', 'Anta jamil', 'Anti dhakiya', 'Anta sa\'id']
      },
      {
        id: 'ar-s2-6-19',
        type: 'type-answer',
        question: 'Type "I am happy" in Arabic',
        questionFr: 'Tapez "Je suis heureux" en Arabe',
        correctAnswer: 'Ana sa\'id',
        correctAnswerFr: 'Ana sa\'id'
      },
      {
        id: 'ar-s2-6-20',
        type: 'multiple-choice',
        question: 'Which word is a general compliment meaning "excellent/outstanding"?',
        questionFr: 'Quel mot est un compliment général signifiant "excellent/remarquable"?',
        correctAnswer: 'Mumtaz',
        correctAnswerFr: 'Mumtaz',
        options: ['Mumtaz', 'Aasif', 'Udhur', 'Tab\'an']
      }
    ]
  },
  // Stage 2, Mission 7: Polite Speech Review
  {
    id: 'ar-vocab-2-7',
    stageId: 'arabic-stage-2',
    lessonNumber: 7,
    type: 'vocabulary',
    title: 'Polite Speech Review',
    titleFr: 'Révision du discours poli',
    xpReward: 20,
    exercises: [
      {
        id: 'ar-s2-7-1',
        type: 'multiple-choice',
        question: 'How do you say "Please" to a male in Arabic?',
        questionFr: 'Comment dit-on "S\'il vous plaît" à un homme en Arabe?',
        correctAnswer: 'Min fadlak',
        correctAnswerFr: 'Min fadlak',
        options: ['Min fadlak', 'Min fadlik', 'Shukran', 'Tafaddal']
      },
      {
        id: 'ar-s2-7-2',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Arabic',
        questionFr: 'Tapez "Merci beaucoup" en Arabe',
        correctAnswer: 'Shukran jazilan',
        correctAnswerFr: 'Shukran jazilan'
      },
      {
        id: 'ar-s2-7-3',
        type: 'multiple-choice',
        question: 'What is "No problem" in Arabic?',
        questionFr: 'Comment dit-on "Pas de problème" en Arabe?',
        correctAnswer: 'La ba\'sa',
        correctAnswerFr: 'La ba\'sa',
        options: ['La ba\'sa', 'Afwan', 'Aasif', 'Udhur']
      },
      {
        id: 'ar-s2-7-4',
        type: 'multiple-choice',
        question: '"Manzilna manzilak" expresses:',
        questionFr: '"Manzilna manzilak" exprime:',
        correctAnswer: 'Our home is your home',
        correctAnswerFr: 'Notre maison est ta maison',
        options: ['Our home is your home', 'Our home is big', 'Your home is far', 'Welcome to my home'],
        optionsFr: ['Notre maison est ta maison', 'Notre maison est grande', 'Ta maison est loin', 'Bienvenue chez moi']
      },
      {
        id: 'ar-s2-7-5',
        type: 'fill-blank',
        question: 'Complete: "___ yumkinak?" (Can you?)',
        questionFr: 'Complétez: "___ yumkinak?" (Peux-tu?)',
        correctAnswer: 'Hal',
        correctAnswerFr: 'Hal',
        hint: 'The Arabic question particle',
        hintFr: 'La particule interrogative arabe'
      },
      {
        id: 'ar-s2-7-6',
        type: 'multiple-choice',
        question: 'What is "Excellent" in Arabic?',
        questionFr: 'Comment dit-on "Excellent" en Arabe?',
        correctAnswer: 'Mumtaz',
        correctAnswerFr: 'Mumtaz',
        options: ['Mumtaz', 'Sahih', 'Jayyid', 'Kabir']
      },
      {
        id: 'ar-s2-7-7',
        type: 'type-answer',
        question: 'Type "Well done" in Arabic',
        questionFr: 'Tapez "Bravo" en Arabe',
        correctAnswer: 'Ahsant',
        correctAnswerFr: 'Ahsant'
      },
      {
        id: 'ar-s2-7-8',
        type: 'multiple-choice',
        question: 'Which phrase invites a guest to enter?',
        questionFr: 'Quelle expression invite un invité à entrer?',
        correctAnswer: 'Tafaddal',
        correctAnswerFr: 'Tafaddal',
        options: ['Tafaddal', 'Aasif', 'Ma\'a salama', 'La ba\'sa']
      },
      {
        id: 'ar-s2-7-9',
        type: 'fill-blank',
        question: 'Complete: "Ana ___" (I am happy)',
        questionFr: 'Complétez: "Ana ___" (Je suis heureux)',
        correctAnswer: 'sa\'id',
        correctAnswerFr: 'sa\'id',
        hint: 'The Arabic word for "happy"',
        hintFr: 'Le mot arabe pour "heureux"'
      },
      {
        id: 'ar-s2-7-10',
        type: 'multiple-choice',
        question: 'How do you say "Sorry" as a female speaker in Arabic?',
        questionFr: 'Comment dit-on "Désolée" en tant que locutrice féminine en Arabe?',
        correctAnswer: 'Aasifa',
        correctAnswerFr: 'Aasifa',
        options: ['Aasifa', 'Aasif', 'Udhur', 'La ba\'sa']
      },
      {
        id: 'ar-s2-7-11',
        type: 'type-answer',
        question: 'Type "Of course" in Arabic',
        questionFr: 'Tapez "Bien sûr" en Arabe',
        correctAnswer: 'Tab\'an',
        correctAnswerFr: 'Tab\'an'
      },
      {
        id: 'ar-s2-7-12',
        type: 'multiple-choice',
        question: 'What is "I agree" in Arabic?',
        questionFr: 'Comment dit-on "Je suis d\'accord" en Arabe?',
        correctAnswer: 'Muwafiq',
        correctAnswerFr: 'Muwafiq',
        options: ['Muwafiq', 'Tab\'an', 'Sahih', 'Na\'am']
      },
      {
        id: 'ar-s2-7-13',
        type: 'fill-blank',
        question: 'Complete: "Shukran ___" (Thank you very much)',
        questionFr: 'Complétez: "Shukran ___" (Merci beaucoup)',
        correctAnswer: 'jazilan',
        correctAnswerFr: 'jazilan',
        hint: 'The word meaning "greatly/a lot"',
        hintFr: 'Le mot signifiant "beaucoup"'
      },
      {
        id: 'ar-s2-7-14',
        type: 'multiple-choice',
        question: 'How do you say "I want water" politely in Arabic?',
        questionFr: 'Comment dit-on "Je veux de l\'eau" poliment en Arabe?',
        correctAnswer: 'Urid maa, min fadlak',
        correctAnswerFr: 'Urid maa, min fadlak',
        options: ['Urid maa, min fadlak', 'Ahtaj maa shukran', 'Arju maa afwan', 'Abhas maa tafaddal']
      },
      {
        id: 'ar-s2-7-15',
        type: 'type-answer',
        question: 'Type "You\'re welcome" in Arabic',
        questionFr: 'Tapez "De rien" en Arabe',
        correctAnswer: 'Afwan',
        correctAnswerFr: 'Afwan'
      },
      {
        id: 'ar-s2-7-16',
        type: 'multiple-choice',
        question: 'What does "Anta dhaki" mean?',
        questionFr: 'Que signifie "Anta dhaki"?',
        correctAnswer: 'You are smart (male)',
        correctAnswerFr: 'Tu es intelligent (masculin)',
        options: ['You are smart (male)', 'You are beautiful (male)', 'You are excellent', 'You are happy'],
        optionsFr: ['Tu es intelligent (masculin)', 'Tu es beau (masculin)', 'Tu es excellent', 'Tu es heureux']
      },
      {
        id: 'ar-s2-7-17',
        type: 'fill-blank',
        question: 'Complete: "Urid ___" (I need help)',
        questionFr: 'Complétez: "Urid ___" (J\'ai besoin d\'aide)',
        correctAnswer: 'musa\'ada',
        correctAnswerFr: 'musa\'ada',
        hint: 'The Arabic word for "help"',
        hintFr: 'Le mot arabe pour "aide"'
      },
      {
        id: 'ar-s2-7-18',
        type: 'multiple-choice',
        question: 'Which phrase means "Excuse me" to get attention?',
        questionFr: 'Quelle expression signifie "Excusez-moi" pour attirer l\'attention?',
        correctAnswer: 'Udhur',
        correctAnswerFr: 'Udhur',
        options: ['Udhur', 'Afwan', 'Aasif', 'Tab\'an']
      },
      {
        id: 'ar-s2-7-19',
        type: 'type-answer',
        question: 'Type "I am looking for..." in Arabic',
        questionFr: 'Tapez "Je cherche..." en Arabe',
        correctAnswer: 'Abhas \'an...',
        correctAnswerFr: 'Abhas \'an...'
      },
      {
        id: 'ar-s2-7-20',
        type: 'multiple-choice',
        question: 'You want to compliment someone\'s work. Which phrase is best?',
        questionFr: 'Vous voulez féliciter le travail de quelqu\'un. Quelle expression est la meilleure?',
        correctAnswer: 'Mumtaz! Ahsant!',
        correctAnswerFr: 'Mumtaz! Ahsant!',
        options: ['Mumtaz! Ahsant!', 'Aasif! La ba\'sa!', 'Udhur! Tab\'an!', 'La! Qat\'an la!']
      }
    ]
  }
];
