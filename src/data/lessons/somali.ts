import { Lesson } from '../../types';

export const somaliLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'so-vocab-1-1',
    stageId: 'somali-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'so-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Somali?',
        questionFr: 'Comment dit-on "Bonjour" en Somali?',
        correctAnswer: 'Salaan',
        correctAnswerFr: 'Salaan',
        options: ['Salaan', 'Nabadgelyo', 'Mahadsanid', 'Fadlan']
      },
      {
        id: 'so-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Salaan" mean?',
        questionFr: 'Que signifie "Salaan"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'so-v1-1-3',
        type: 'type-answer',
        question: 'Type the Somali word for "Goodbye"',
        questionFr: 'Tapez le mot Somali pour "Au revoir"',
        correctAnswer: 'Nabadgelyo',
        correctAnswerFr: 'Nabadgelyo'
      },
      {
        id: 'so-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Somali?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Somali?',
        correctAnswer: 'Subax wanaagsan',
        correctAnswerFr: 'Subax wanaagsan',
        options: ['Subax wanaagsan', 'Galab wanaagsan', 'Habeen wanaagsan', 'Salaan']
      },
      {
        id: 'so-v1-1-5',
        type: 'multiple-choice',
        question: '"Sidee tahay?" means:',
        questionFr: '"Sidee tahay?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'so-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Somali',
        questionFr: 'Tapez "Merci" en Somali',
        correctAnswer: 'Mahadsanid',
        correctAnswerFr: 'Mahadsanid'
      },
      {
        id: 'so-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Somali?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Somali?',
        correctAnswer: 'Fadlan',
        correctAnswerFr: 'Fadlan',
        options: ['Fadlan', 'Mahadsanid', 'Nabadgelyo', 'Salaan']
      },
      {
        id: 'so-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Sidee tahay?"?',
        questionFr: 'Comment répondez-vous à "Sidee tahay?"?',
        correctAnswer: 'Waan fiicanahay',
        correctAnswerFr: 'Waan fiicanahay',
        options: ['Waan fiicanahay', 'Salaan', 'Nabadgelyo', 'Mahadsanid']
      },
      {
        id: 'so-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Somali',
        questionFr: 'Tapez "Excusez-moi" en Somali',
        correctAnswer: 'Raali ahaan',
        correctAnswerFr: 'Raali ahaan'
      },
      {
        id: 'so-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Somali?',
        questionFr: 'Comment dit-on "Désolé" en Somali?',
        correctAnswer: 'Waan ka xumahay',
        correctAnswerFr: 'Waan ka xumahay',
        options: ['Waan ka xumahay', 'Mahadsanid', 'Fadlan', 'Nabadgelyo']
      },
      {
        id: 'so-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Somali?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Somali?',
        correctAnswer: 'Kulanka ayaa farxad leh',
        correctAnswerFr: 'Kulanka ayaa farxad leh',
        options: ['Kulanka ayaa farxad leh', 'Sidee tahay?', 'Salaan', 'Nabadgelyo']
      },
      {
        id: 'so-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Somali',
        questionFr: 'Tapez "À bientôt" en Somali',
        correctAnswer: 'Markale',
        correctAnswerFr: 'Markale'
      },
      {
        id: 'so-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Somali?',
        questionFr: 'Comment dit-on "De rien" en Somali?',
        correctAnswer: 'Mahadsanid',
        correctAnswerFr: 'Mahadsanid',
        options: ['Mahadsanid', 'Fadlan', 'Raali ahaan', 'Salaan']
      },
      {
        id: 'so-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Somali?',
        questionFr: 'Comment dit-on "Bonsoir" en Somali?',
        correctAnswer: 'Galab wanaagsan',
        correctAnswerFr: 'Galab wanaagsan',
        options: ['Galab wanaagsan', 'Subax wanaagsan', 'Habeen wanaagsan', 'Salaan']
      },
      {
        id: 'so-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Somali',
        questionFr: 'Tapez "Bonne nuit" en Somali',
        correctAnswer: 'Habeen wanaagsan',
        correctAnswerFr: 'Habeen wanaagsan'
      },
      {
        id: 'so-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Somali?',
        questionFr: 'Comment dit-on "Oui" en Somali?',
        correctAnswer: 'Haa',
        correctAnswerFr: 'Haa',
        options: ['Haa', 'Maya', 'Mahadsanid', 'Salaan']
      },
      {
        id: 'so-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Somali?',
        questionFr: 'Comment dit-on "Non" en Somali?',
        correctAnswer: 'Maya',
        correctAnswerFr: 'Maya',
        options: ['Maya', 'Haa', 'Nabadgelyo', 'Fadlan']
      },
      {
        id: 'so-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Somali',
        questionFr: 'Tapez "Peut-être" en Somali',
        correctAnswer: 'Laga yaabaa',
        correctAnswerFr: 'Laga yaabaa'
      },
      {
        id: 'so-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Somali?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Somali?',
        correctAnswer: 'Ma fahmin',
        correctAnswerFr: 'Ma fahmin',
        options: ['Ma fahmin', 'Mahadsanid', 'Nabadgelyo', 'Raali ahaan']
      },
      {
        id: 'so-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Somali?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Somali?',
        correctAnswer: 'Ma ogi',
        correctAnswerFr: 'Ma ogi',
        options: ['Ma ogi', 'Mahadsanid', 'Nabadgelyo', 'Raali ahaan']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'so-vocab-1-2',
    stageId: 'somali-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'so-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Somali?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Somali?',
        correctAnswer: 'Magacaagu waa maxay?',
        correctAnswerFr: 'Magacaagu waa maxay?',
        options: ['Magacaagu waa maxay?', 'Mahadsanid maxay?', 'Nabadgelyo maxay?', 'Fadlan maxay?']
      },
      {
        id: 'so-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Somali',
        questionFr: 'Tapez "Je m\'appelle..." en Somali',
        correctAnswer: 'Magacaygu waa...',
        correctAnswerFr: 'Magacaygu waa...'
      },
      {
        id: 'so-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Somali?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Somali?',
        correctAnswer: 'Halkee ka timid?',
        correctAnswerFr: 'Halkee ka timid?',
        options: ['Halkee ka timid?', 'Mahadsanid ka timid?', 'Nabadgelyo ka timid?', 'Fadlan ka timid?']
      },
      {
        id: 'so-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Somali',
        questionFr: 'Tapez "Je viens de..." en Somali',
        correctAnswer: 'Waxaan ka imid...',
        correctAnswerFr: 'Waxaan ka imid...'
      },
      {
        id: 'so-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Somali?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Somali?',
        correctAnswer: 'Imisa jir ayaad tahay?',
        correctAnswerFr: 'Imisa jir ayaad tahay?',
        options: ['Imisa jir ayaad tahay?', 'Mahadsanid jir?', 'Nabadgelyo jir?', 'Fadlan jir?']
      },
      {
        id: 'so-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Somali',
        questionFr: 'Tapez "J\'ai ... ans" en Somali',
        correctAnswer: 'Waxaan ahay ... jir',
        correctAnswerFr: 'Waxaan ahay ... jir'
      },
      {
        id: 'so-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Somali?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Somali?',
        correctAnswer: 'Halkee ku nooshahay?',
        correctAnswerFr: 'Halkee ku nooshahay?',
        options: ['Halkee ku nooshahay?', 'Mahadsanid ku nooshahay?', 'Nabadgelyo ku nooshahay?', 'Fadlan ku nooshahay?']
      },
      {
        id: 'so-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Somali',
        questionFr: 'Tapez "J\'habite à..." en Somali',
        correctAnswer: 'Waxaan ku noolahay...',
        correctAnswerFr: 'Waxaan ku noolahay...'
      },
      {
        id: 'so-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Somali?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Somali?',
        correctAnswer: 'Maxaad samaysaa?',
        correctAnswerFr: 'Maxaad samaysaa?',
        options: ['Maxaad samaysaa?', 'Mahadsanid samaysaa?', 'Nabadgelyo samaysaa?', 'Fadlan samaysaa?']
      },
      {
        id: 'so-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Somali',
        questionFr: 'Tapez "Je suis étudiant" en Somali',
        correctAnswer: 'Waxaan ahay arday',
        correctAnswerFr: 'Waxaan ahay arday'
      },
      {
        id: 'so-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Somali" in Somali?',
        questionFr: 'Comment dit-on "J\'apprends le Somali" en Somali?',
        correctAnswer: 'Waxaan baranayaa Soomaali',
        correctAnswerFr: 'Waxaan baranayaa Soomaali',
        options: ['Waxaan baranayaa Soomaali', 'Mahadsanid Soomaali', 'Nabadgelyo Soomaali', 'Fadlan Soomaali']
      },
      {
        id: 'so-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Somali" in Somali',
        questionFr: 'Tapez "Je parle un peu Somali" en Somali',
        correctAnswer: 'Waxaan ku hadlaa Soomaali yar',
        correctAnswerFr: 'Waxaan ku hadlaa Soomaali yar'
      },
      {
        id: 'so-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Somali well" in Somali?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Somali" en Somali?',
        correctAnswer: 'Ma ku hadli karo Soomaali si fiican',
        correctAnswerFr: 'Ma ku hadli karo Soomaali si fiican',
        options: ['Ma ku hadli karo Soomaali si fiican', 'Mahadsanid Soomaali', 'Nabadgelyo Soomaali', 'Fadlan Soomaali']
      },
      {
        id: 'so-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Somali',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Somali',
        correctAnswer: 'Ma i caawin kartaa?',
        correctAnswerFr: 'Ma i caawin kartaa?'
      },
      {
        id: 'so-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Somali?',
        questionFr: 'Comment dit-on "Bien sûr" en Somali?',
        correctAnswer: 'Haa',
        correctAnswerFr: 'Haa',
        options: ['Haa', 'Maya', 'Mahadsanid', 'Fadlan']
      },
      {
        id: 'so-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Somali?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Somali?',
        correctAnswer: 'Waxaan u baahanahay caawimaad',
        correctAnswerFr: 'Waxaan u baahanahay caawimaad',
        options: ['Waxaan u baahanahay caawimaad', 'Mahadsanid caawimaad', 'Nabadgelyo caawimaad', 'Fadlan caawimaad']
      },
      {
        id: 'so-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Somali',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Somali',
        correctAnswer: 'Ma dib u dhihi kartaa?',
        correctAnswerFr: 'Ma dib u dhihi kartaa?'
      },
      {
        id: 'so-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Somali?',
        questionFr: 'Comment dit-on "Parlez lentement" en Somali?',
        correctAnswer: 'Ku hadal si tartiib ah',
        correctAnswerFr: 'Ku hadal si tartiib ah',
        options: ['Ku hadal si tartiib ah', 'Ku hadal mahadsanid', 'Ku hadal nabadgelyo', 'Ku hadal fadlan']
      },
      {
        id: 'so-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Somali',
        questionFr: 'Tapez "Je comprends" en Somali',
        correctAnswer: 'Waan fahmay',
        correctAnswerFr: 'Waan fahmay'
      },
      {
        id: 'so-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Somali?',
        questionFr: 'Comment dit-on "C\'est correct" en Somali?',
        correctAnswer: 'Waa sax',
        correctAnswerFr: 'Waa sax',
        options: ['Waa sax', 'Waa khalad', 'Mahadsanid', 'Fadlan']
      }
    ]
  },
  // Stage 1, Mission 3: Basic Words
  {
    id: 'so-vocab-1-3',
    stageId: 'somali-stage-1',
    lessonNumber: 3,
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    xpReward: 10,
    exercises: [
      {
        id: 'so-v1-3-1',
        type: 'multiple-choice',
        question: 'What is "water" in Somali?',
        questionFr: 'Comment dit-on "eau" en Somali?',
        correctAnswer: 'Biyo',
        correctAnswerFr: 'Biyo',
        options: ['Biyo', 'Cunto', 'Guri', 'Qalin']
      },
      {
        id: 'so-v1-3-2',
        type: 'multiple-choice',
        question: 'What is "food" in Somali?',
        questionFr: 'Comment dit-on "nourriture" en Somali?',
        correctAnswer: 'Cunto',
        correctAnswerFr: 'Cunto',
        options: ['Cunto', 'Biyo', 'Guri', 'Qalin']
      },
      {
        id: 'so-v1-3-3',
        type: 'type-answer',
        question: 'Type "house" in Somali',
        questionFr: 'Tapez "maison" en Somali',
        correctAnswer: 'Guri',
        correctAnswerFr: 'Guri'
      },
      {
        id: 'so-v1-3-4',
        type: 'multiple-choice',
        question: 'What is "book" in Somali?',
        questionFr: 'Comment dit-on "livre" en Somali?',
        correctAnswer: 'Buug',
        correctAnswerFr: 'Buug',
        options: ['Buug', 'Qalin', 'Guri', 'Biyo']
      },
      {
        id: 'so-v1-3-5',
        type: 'multiple-choice',
        question: 'What is "pen" in Somali?',
        questionFr: 'Comment dit-on "stylo" en Somali?',
        correctAnswer: 'Qalin',
        correctAnswerFr: 'Qalin',
        options: ['Qalin', 'Buug', 'Guri', 'Biyo']
      },
      {
        id: 'so-v1-3-6',
        type: 'type-answer',
        question: 'Type "car" in Somali',
        questionFr: 'Tapez "voiture" en Somali',
        correctAnswer: 'Baabuur',
        correctAnswerFr: 'Baabuur'
      },
      {
        id: 'so-v1-3-7',
        type: 'multiple-choice',
        question: 'What is "money" in Somali?',
        questionFr: 'Comment dit-on "argent" en Somali?',
        correctAnswer: 'Lacag',
        correctAnswerFr: 'Lacag',
        options: ['Lacag', 'Baabuur', 'Guri', 'Biyo']
      },
      {
        id: 'so-v1-3-8',
        type: 'multiple-choice',
        question: 'What is "time" in Somali?',
        questionFr: 'Comment dit-on "temps" en Somali?',
        correctAnswer: 'Waqti',
        correctAnswerFr: 'Waqti',
        options: ['Waqti', 'Lacag', 'Baabuur', 'Guri']
      },
      {
        id: 'so-v1-3-9',
        type: 'type-answer',
        question: 'Type "day" in Somali',
        questionFr: 'Tapez "jour" en Somali',
        correctAnswer: 'Maalin',
        correctAnswerFr: 'Maalin'
      },
      {
        id: 'so-v1-3-10',
        type: 'multiple-choice',
        question: 'What is "night" in Somali?',
        questionFr: 'Comment dit-on "nuit" en Somali?',
        correctAnswer: 'Habeen',
        correctAnswerFr: 'Habeen',
        options: ['Habeen', 'Maalin', 'Waqti', 'Lacag']
      },
      {
        id: 'so-v1-3-11',
        type: 'multiple-choice',
        question: 'What is "family" in Somali?',
        questionFr: 'Comment dit-on "famille" en Somali?',
        correctAnswer: 'Qoys',
        correctAnswerFr: 'Qoys',
        options: ['Qoys', 'Habeen', 'Maalin', 'Waqti']
      },
      {
        id: 'so-v1-3-12',
        type: 'type-answer',
        question: 'Type "mother" in Somali',
        questionFr: 'Tapez "mère" en Somali',
        correctAnswer: 'Hooyo',
        correctAnswerFr: 'Hooyo'
      },
      {
        id: 'so-v1-3-13',
        type: 'multiple-choice',
        question: 'What is "father" in Somali?',
        questionFr: 'Comment dit-on "père" en Somali?',
        correctAnswer: 'Aabo',
        correctAnswerFr: 'Aabo',
        options: ['Aabo', 'Hooyo', 'Qoys', 'Habeen']
      },
      {
        id: 'so-v1-3-14',
        type: 'multiple-choice',
        question: 'What is "brother" in Somali?',
        questionFr: 'Comment dit-on "frère" en Somali?',
        correctAnswer: 'Walaal',
        correctAnswerFr: 'Walaal',
        options: ['Walaal', 'Aabo', 'Hooyo', 'Qoys']
      },
      {
        id: 'so-v1-3-15',
        type: 'type-answer',
        question: 'Type "sister" in Somali',
        questionFr: 'Tapez "sœur" en Somali',
        correctAnswer: 'Walaal',
        correctAnswerFr: 'Walaal'
      },
      {
        id: 'so-v1-3-16',
        type: 'multiple-choice',
        question: 'What is "friend" in Somali?',
        questionFr: 'Comment dit-on "ami" en Somali?',
        correctAnswer: 'Saaxiib',
        correctAnswerFr: 'Saaxiib',
        options: ['Saaxiib', 'Walaal', 'Aabo', 'Hooyo']
      },
      {
        id: 'so-v1-3-17',
        type: 'multiple-choice',
        question: 'What is "school" in Somali?',
        questionFr: 'Comment dit-on "école" en Somali?',
        correctAnswer: 'Dugsi',
        correctAnswerFr: 'Dugsi',
        options: ['Dugsi', 'Saaxiib', 'Walaal', 'Aabo']
      },
      {
        id: 'so-v1-3-18',
        type: 'type-answer',
        question: 'Type "teacher" in Somali',
        questionFr: 'Tapez "enseignant" en Somali',
        correctAnswer: 'Macallin',
        correctAnswerFr: 'Macallin'
      },
      {
        id: 'so-v1-3-19',
        type: 'multiple-choice',
        question: 'What is "student" in Somali?',
        questionFr: 'Comment dit-on "étudiant" en Somali?',
        correctAnswer: 'Arday',
        correctAnswerFr: 'Arday',
        options: ['Arday', 'Macallin', 'Dugsi', 'Saaxiib']
      },
      {
        id: 'so-v1-3-20',
        type: 'multiple-choice',
        question: 'What is "work" in Somali?',
        questionFr: 'Comment dit-on "travail" en Somali?',
        correctAnswer: 'Shaqo',
        correctAnswerFr: 'Shaqo',
        options: ['Shaqo', 'Arday', 'Macallin', 'Dugsi']
      }
    ]
  },
  // Stage 1, Mission 4: Essential Vocabulary
  {
    id: 'so-vocab-1-4',
    stageId: 'somali-stage-1',
    lessonNumber: 4,
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    xpReward: 10,
    exercises: [
      {
        id: 'so-v1-4-1',
        type: 'multiple-choice',
        question: 'What is "big" in Somali?',
        questionFr: 'Comment dit-on "grand" en Somali?',
        correctAnswer: 'Weyn',
        correctAnswerFr: 'Weyn',
        options: ['Weyn', 'Yar', 'Cusub', 'Qadiim']
      },
      {
        id: 'so-v1-4-2',
        type: 'multiple-choice',
        question: 'What is "small" in Somali?',
        questionFr: 'Comment dit-on "petit" en Somali?',
        correctAnswer: 'Yar',
        correctAnswerFr: 'Yar',
        options: ['Yar', 'Weyn', 'Cusub', 'Qadiim']
      },
      {
        id: 'so-v1-4-3',
        type: 'type-answer',
        question: 'Type "good" in Somali',
        questionFr: 'Tapez "bon" en Somali',
        correctAnswer: 'Wanaagsan',
        correctAnswerFr: 'Wanaagsan'
      },
      {
        id: 'so-v1-4-4',
        type: 'multiple-choice',
        question: 'What is "bad" in Somali?',
        questionFr: 'Comment dit-on "mauvais" en Somali?',
        correctAnswer: 'Xun',
        correctAnswerFr: 'Xun',
        options: ['Xun', 'Wanaagsan', 'Yar', 'Weyn']
      },
      {
        id: 'so-v1-4-5',
        type: 'multiple-choice',
        question: 'What is "new" in Somali?',
        questionFr: 'Comment dit-on "nouveau" en Somali?',
        correctAnswer: 'Cusub',
        correctAnswerFr: 'Cusub',
        options: ['Cusub', 'Qadiim', 'Xun', 'Wanaagsan']
      },
      {
        id: 'so-v1-4-6',
        type: 'type-answer',
        question: 'Type "old" in Somali',
        questionFr: 'Tapez "vieux" en Somali',
        correctAnswer: 'Qadiim',
        correctAnswerFr: 'Qadiim'
      },
      {
        id: 'so-v1-4-7',
        type: 'multiple-choice',
        question: 'What is "hot" in Somali?',
        questionFr: 'Comment dit-on "chaud" en Somali?',
        correctAnswer: 'Kulul',
        correctAnswerFr: 'Kulul',
        options: ['Kulul', 'Qabow', 'Cusub', 'Qadiim']
      },
      {
        id: 'so-v1-4-8',
        type: 'multiple-choice',
        question: 'What is "cold" in Somali?',
        questionFr: 'Comment dit-on "froid" en Somali?',
        correctAnswer: 'Qabow',
        correctAnswerFr: 'Qabow',
        options: ['Qabow', 'Kulul', 'Cusub', 'Qadiim']
      },
      {
        id: 'so-v1-4-9',
        type: 'type-answer',
        question: 'Type "fast" in Somali',
        questionFr: 'Tapez "rapide" en Somali',
        correctAnswer: 'Dhaqso',
        correctAnswerFr: 'Dhaqso'
      },
      {
        id: 'so-v1-4-10',
        type: 'multiple-choice',
        question: 'What is "slow" in Somali?',
        questionFr: 'Comment dit-on "lent" en Somali?',
        correctAnswer: 'Gaagaaban',
        correctAnswerFr: 'Gaagaaban',
        options: ['Gaagaaban', 'Dhaqso', 'Qabow', 'Kulul']
      },
      {
        id: 'so-v1-4-11',
        type: 'multiple-choice',
        question: 'What is "beautiful" in Somali?',
        questionFr: 'Comment dit-on "beau" en Somali?',
        correctAnswer: 'Qurux badan',
        correctAnswerFr: 'Qurux badan',
        options: ['Qurux badan', 'Gaagaaban', 'Dhaqso', 'Qabow']
      },
      {
        id: 'so-v1-4-12',
        type: 'type-answer',
        question: 'Type "ugly" in Somali',
        questionFr: 'Tapez "laid" en Somali',
        correctAnswer: 'Qurux la\'aan',
        correctAnswerFr: 'Qurux la\'aan'
      },
      {
        id: 'so-v1-4-13',
        type: 'multiple-choice',
        question: 'What is "easy" in Somali?',
        questionFr: 'Comment dit-on "facile" en Somali?',
        correctAnswer: 'Fudud',
        correctAnswerFr: 'Fudud',
        options: ['Fudud', 'Adag', 'Qurux la\'aan', 'Qurux badan']
      },
      {
        id: 'so-v1-4-14',
        type: 'multiple-choice',
        question: 'What is "difficult" in Somali?',
        questionFr: 'Comment dit-on "difficile" en Somali?',
        correctAnswer: 'Adag',
        correctAnswerFr: 'Adag',
        options: ['Adag', 'Fudud', 'Qurux la\'aan', 'Qurux badan']
      },
      {
        id: 'so-v1-4-15',
        type: 'type-answer',
        question: 'Type "expensive" in Somali',
        questionFr: 'Tapez "cher" en Somali',
        correctAnswer: 'Qiimo badan',
        correctAnswerFr: 'Qiimo badan'
      },
      {
        id: 'so-v1-4-16',
        type: 'multiple-choice',
        question: 'What is "cheap" in Somali?',
        questionFr: 'Comment dit-on "bon marché" en Somali?',
        correctAnswer: 'Qiimo yar',
        correctAnswerFr: 'Qiimo yar',
        options: ['Qiimo yar', 'Qiimo badan', 'Adag', 'Fudud']
      },
      {
        id: 'so-v1-4-17',
        type: 'multiple-choice',
        question: 'What is "clean" in Somali?',
        questionFr: 'Comment dit-on "propre" en Somali?',
        correctAnswer: 'Nadiif',
        correctAnswerFr: 'Nadiif',
        options: ['Nadiif', 'Wasakh', 'Qiimo yar', 'Qiimo badan']
      },
      {
        id: 'so-v1-4-18',
        type: 'type-answer',
        question: 'Type "dirty" in Somali',
        questionFr: 'Tapez "sale" en Somali',
        correctAnswer: 'Wasakh',
        correctAnswerFr: 'Wasakh'
      },
      {
        id: 'so-v1-4-19',
        type: 'multiple-choice',
        question: 'What is "full" in Somali?',
        questionFr: 'Comment dit-on "plein" en Somali?',
        correctAnswer: 'Buuxa',
        correctAnswerFr: 'Buuxa',
        options: ['Buuxa', 'Madhan', 'Wasakh', 'Nadiif']
      },
      {
        id: 'so-v1-4-20',
        type: 'multiple-choice',
        question: 'What is "empty" in Somali?',
        questionFr: 'Comment dit-on "vide" en Somali?',
        correctAnswer: 'Madhan',
        correctAnswerFr: 'Madhan',
        options: ['Madhan', 'Buuxa', 'Wasakh', 'Nadiif']
      }
    ]
  },
  // Stage 1, Mission 5: Practice & Review
  {
    id: 'so-vocab-1-5',
    stageId: 'somali-stage-1',
    lessonNumber: 5,
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    xpReward: 15,
    exercises: [
      {
        id: 'so-v1-5-1',
        type: 'multiple-choice',
        question: 'What is "one" in Somali?',
        questionFr: 'Comment dit-on "un" en Somali?',
        correctAnswer: 'Kow',
        correctAnswerFr: 'Kow',
        options: ['Kow', 'Laba', 'Saddex', 'Afar']
      },
      {
        id: 'so-v1-5-2',
        type: 'multiple-choice',
        question: 'What is "two" in Somali?',
        questionFr: 'Comment dit-on "deux" en Somali?',
        correctAnswer: 'Laba',
        correctAnswerFr: 'Laba',
        options: ['Laba', 'Kow', 'Saddex', 'Afar']
      },
      {
        id: 'so-v1-5-3',
        type: 'type-answer',
        question: 'Type "three" in Somali',
        questionFr: 'Tapez "trois" en Somali',
        correctAnswer: 'Saddex',
        correctAnswerFr: 'Saddex'
      },
      {
        id: 'so-v1-5-4',
        type: 'multiple-choice',
        question: 'What is "four" in Somali?',
        questionFr: 'Comment dit-on "quatre" en Somali?',
        correctAnswer: 'Afar',
        correctAnswerFr: 'Afar',
        options: ['Afar', 'Saddex', 'Laba', 'Kow']
      },
      {
        id: 'so-v1-5-5',
        type: 'multiple-choice',
        question: 'What is "five" in Somali?',
        questionFr: 'Comment dit-on "cinq" en Somali?',
        correctAnswer: 'Shan',
        correctAnswerFr: 'Shan',
        options: ['Shan', 'Afar', 'Saddex', 'Laba']
      },
      {
        id: 'so-v1-5-6',
        type: 'type-answer',
        question: 'Type "six" in Somali',
        questionFr: 'Tapez "six" en Somali',
        correctAnswer: 'Lix',
        correctAnswerFr: 'Lix'
      },
      {
        id: 'so-v1-5-7',
        type: 'multiple-choice',
        question: 'What is "seven" in Somali?',
        questionFr: 'Comment dit-on "sept" en Somali?',
        correctAnswer: 'Todoba',
        correctAnswerFr: 'Todoba',
        options: ['Todoba', 'Lix', 'Shan', 'Afar']
      },
      {
        id: 'so-v1-5-8',
        type: 'multiple-choice',
        question: 'What is "eight" in Somali?',
        questionFr: 'Comment dit-on "huit" en Somali?',
        correctAnswer: 'Siddeed',
        correctAnswerFr: 'Siddeed',
        options: ['Siddeed', 'Todoba', 'Lix', 'Shan']
      },
      {
        id: 'so-v1-5-9',
        type: 'type-answer',
        question: 'Type "nine" in Somali',
        questionFr: 'Tapez "neuf" en Somali',
        correctAnswer: 'Sagaal',
        correctAnswerFr: 'Sagaal'
      },
      {
        id: 'so-v1-5-10',
        type: 'multiple-choice',
        question: 'What is "ten" in Somali?',
        questionFr: 'Comment dit-on "dix" en Somali?',
        correctAnswer: 'Toban',
        correctAnswerFr: 'Toban',
        options: ['Toban', 'Sagaal', 'Siddeed', 'Todoba']
      },
      {
        id: 'so-v1-5-11',
        type: 'multiple-choice',
        question: 'What is "red" in Somali?',
        questionFr: 'Comment dit-on "rouge" en Somali?',
        correctAnswer: 'Casaan',
        correctAnswerFr: 'Casaan',
        options: ['Casaan', 'Cagaar', 'Buluug', 'Caddaan']
      },
      {
        id: 'so-v1-5-12',
        type: 'type-answer',
        question: 'Type "blue" in Somali',
        questionFr: 'Tapez "bleu" en Somali',
        correctAnswer: 'Buluug',
        correctAnswerFr: 'Buluug'
      },
      {
        id: 'so-v1-5-13',
        type: 'multiple-choice',
        question: 'What is "green" in Somali?',
        questionFr: 'Comment dit-on "vert" en Somali?',
        correctAnswer: 'Cagaar',
        correctAnswerFr: 'Cagaar',
        options: ['Cagaar', 'Buluug', 'Casaan', 'Caddaan']
      },
      {
        id: 'so-v1-5-14',
        type: 'multiple-choice',
        question: 'What is "white" in Somali?',
        questionFr: 'Comment dit-on "blanc" en Somali?',
        correctAnswer: 'Caddaan',
        correctAnswerFr: 'Caddaan',
        options: ['Caddaan', 'Cagaar', 'Buluug', 'Casaan']
      },
      {
        id: 'so-v1-5-15',
        type: 'type-answer',
        question: 'Type "black" in Somali',
        questionFr: 'Tapez "noir" en Somali',
        correctAnswer: 'Madow',
        correctAnswerFr: 'Madow'
      },
      {
        id: 'so-v1-5-16',
        type: 'multiple-choice',
        question: 'What is "yellow" in Somali?',
        questionFr: 'Comment dit-on "jaune" en Somali?',
        correctAnswer: 'Jaale',
        correctAnswerFr: 'Jaale',
        options: ['Jaale', 'Madow', 'Caddaan', 'Cagaar']
      },
      {
        id: 'so-v1-5-17',
        type: 'multiple-choice',
        question: 'What is "orange" in Somali?',
        questionFr: 'Comment dit-on "orange" en Somali?',
        correctAnswer: 'Liimi',
        correctAnswerFr: 'Liimi',
        options: ['Liimi', 'Jaale', 'Madow', 'Caddaan']
      },
      {
        id: 'so-v1-5-18',
        type: 'type-answer',
        question: 'Type "purple" in Somali',
        questionFr: 'Tapez "violet" en Somali',
        correctAnswer: 'Midabka',
        correctAnswerFr: 'Midabka'
      },
      {
        id: 'so-v1-5-19',
        type: 'multiple-choice',
        question: 'What is "brown" in Somali?',
        questionFr: 'Comment dit-on "marron" en Somali?',
        correctAnswer: 'Bunni',
        correctAnswerFr: 'Bunni',
        options: ['Bunni', 'Midabka', 'Liimi', 'Jaale']
      },
      {
        id: 'so-v1-5-20',
        type: 'multiple-choice',
        question: 'What is "gray" in Somali?',
        questionFr: 'Comment dit-on "gris" en Somali?',
        correctAnswer: 'Ciro',
        correctAnswerFr: 'Ciro',
        options: ['Ciro', 'Bunni', 'Midabka', 'Liimi']
      }
    ]
  }
];
