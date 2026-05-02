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
  }
];
