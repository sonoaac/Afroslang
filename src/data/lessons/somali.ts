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
  ,
  // Stage 1, Lesson 6: Self Introductions
  {
    id: 'so-s1-6',
    stageId: 'somali-stage-1',
    lessonNumber: 6,
    type: 'vocabulary',
    title: 'Self Introductions',
    titleFr: 'Se présenter',
    xpReward: 10,
    exercises: [
      {
        id: 'so-s1-6-1',
        type: 'multiple-choice',
        question: 'How do you say "My name is..." in Somali?',
        questionFr: 'Comment dit-on "Je m\'appelle..." en Somali?',
        correctAnswer: 'Magacaygu waa...',
        options: ['Magacaygu waa...', 'Magacaagu waa maxay?', 'Waxaan ahay...', 'Ku soo dhawoow']
      },
      {
        id: 'so-s1-6-2',
        type: 'multiple-choice',
        question: 'What does "Magacaygu waa..." mean?',
        questionFr: 'Que signifie "Magacaygu waa..."?',
        correctAnswer: 'My name is...',
        options: ['My name is...', 'I am from...', 'How old are you?', 'Welcome']
      },
      {
        id: 'so-s1-6-3',
        type: 'type-answer',
        question: 'Type "I am from..." in Somali',
        questionFr: 'Tapez "Je viens de..." en Somali',
        correctAnswer: 'Waxaan ahay...'
      },
      {
        id: 'so-s1-6-4',
        type: 'multiple-choice',
        question: 'How do you ask "How old are you?" in Somali?',
        questionFr: 'Comment demande-t-on "Quel âge avez-vous?" en Somali?',
        correctAnswer: 'Imisa jir baad tahay?',
        options: ['Imisa jir baad tahay?', 'Magacaagu waa maxay?', 'Halkee ka timid?', 'Sidee tahay?']
      },
      {
        id: 'so-s1-6-5',
        type: 'fill-blank',
        question: 'Complete: "I am 25 years old" in Somali → Waxaan ahay ___ jir',
        questionFr: 'Complétez: "J\'ai 25 ans" en Somali → Waxaan ahay ___ jir',
        correctAnswer: '25',
        hint: 'Enter the number',
        hintFr: 'Entrez le nombre'
      },
      {
        id: 'so-s1-6-6',
        type: 'multiple-choice',
        question: 'What does "Waxaan ahay... jir" mean?',
        questionFr: 'Que signifie "Waxaan ahay... jir"?',
        correctAnswer: 'I am ... years old',
        options: ['I am ... years old', 'I am from...', 'My name is...', 'How old are you?']
      },
      {
        id: 'so-s1-6-7',
        type: 'type-answer',
        question: 'Type "Welcome" in Somali',
        questionFr: 'Tapez "Bienvenue" en Somali',
        correctAnswer: 'Ku soo dhawoow'
      },
      {
        id: 'so-s1-6-8',
        type: 'multiple-choice',
        question: 'How do you say "Welcome" in Somali?',
        questionFr: 'Comment dit-on "Bienvenue" en Somali?',
        correctAnswer: 'Ku soo dhawoow',
        options: ['Ku soo dhawoow', 'Nabadgelyo', 'Mahadsanid', 'Salaan']
      },
      {
        id: 'so-s1-6-9',
        type: 'multiple-choice',
        question: 'What is the correct phrase for "What is your name?" in Somali?',
        questionFr: 'Quelle est la phrase correcte pour "Comment vous appelez-vous?" en Somali?',
        correctAnswer: 'Magacaagu waa maxay?',
        options: ['Magacaagu waa maxay?', 'Sidee tahay?', 'Imisa jir baad tahay?', 'Halkee ka timid?']
      },
      {
        id: 'so-s1-6-10',
        type: 'fill-blank',
        question: 'Complete the phrase: "___ waa..." (My name is...)',
        questionFr: 'Complétez la phrase: "___ waa..." (Je m\'appelle...)',
        correctAnswer: 'Magacaygu',
        hint: 'First word meaning "my name"',
        hintFr: 'Premier mot signifiant "mon prénom"'
      },
      {
        id: 'so-s1-6-11',
        type: 'type-answer',
        question: 'Type "I am from..." in Somali (the phrase, not a specific place)',
        questionFr: 'Tapez "Je suis de..." en Somali (la phrase, pas un lieu précis)',
        correctAnswer: 'Waxaan ahay...'
      },
      {
        id: 'so-s1-6-12',
        type: 'multiple-choice',
        question: '"Imisa jir baad tahay?" translates to:',
        questionFr: '"Imisa jir baad tahay?" se traduit par:',
        correctAnswer: 'How old are you?',
        options: ['How old are you?', 'Where are you from?', 'What is your name?', 'How are you?']
      },
      {
        id: 'so-s1-6-13',
        type: 'multiple-choice',
        question: 'To say "My name is Ali" in Somali you say:',
        questionFr: 'Pour dire "Je m\'appelle Ali" en Somali on dit:',
        correctAnswer: 'Magacaygu waa Ali',
        options: ['Magacaygu waa Ali', 'Magacaagu waa Ali?', 'Waxaan ahay Ali jir', 'Ku soo dhawoow Ali']
      },
      {
        id: 'so-s1-6-14',
        type: 'fill-blank',
        question: 'Complete: "Ku soo ___" (Welcome)',
        questionFr: 'Complétez: "Ku soo ___" (Bienvenue)',
        correctAnswer: 'dhawoow',
        hint: 'Second part of the welcome phrase',
        hintFr: 'Deuxième partie de la phrase de bienvenue'
      },
      {
        id: 'so-s1-6-15',
        type: 'type-answer',
        question: 'Type "How old are you?" in Somali',
        questionFr: 'Tapez "Quel âge avez-vous?" en Somali',
        correctAnswer: 'Imisa jir baad tahay?'
      },
      {
        id: 'so-s1-6-16',
        type: 'multiple-choice',
        question: 'Which phrase means "I am from Somalia"?',
        questionFr: 'Quelle phrase signifie "Je viens de Somalie"?',
        correctAnswer: 'Waxaan ahay Soomaaliya',
        options: ['Waxaan ahay Soomaaliya', 'Magacaygu waa Soomaaliya', 'Ku soo dhawoow Soomaaliya', 'Imisa jir Soomaaliya?']
      },
      {
        id: 'so-s1-6-17',
        type: 'multiple-choice',
        question: 'Which is the correct Somali question for "What is your name?"',
        questionFr: 'Quelle est la bonne question Somali pour "Comment vous appelez-vous?"',
        correctAnswer: 'Magacaagu waa maxay?',
        options: ['Magacaagu waa maxay?', 'Magacaygu waa maxay?', 'Waxaan ahay maxay?', 'Imisa jir maxay?']
      },
      {
        id: 'so-s1-6-18',
        type: 'fill-blank',
        question: 'Fill in: "Waxaan ahay ___ jir" (I am 30 years old)',
        questionFr: 'Remplissez: "Waxaan ahay ___ jir" (J\'ai 30 ans)',
        correctAnswer: '30',
        hint: 'Enter the number thirty',
        hintFr: 'Entrez le nombre trente'
      },
      {
        id: 'so-s1-6-19',
        type: 'type-answer',
        question: 'Type "Welcome" in Somali',
        questionFr: 'Tapez "Bienvenue" en Somali',
        correctAnswer: 'Ku soo dhawoow'
      },
      {
        id: 'so-s1-6-20',
        type: 'multiple-choice',
        question: '"Ku soo dhawoow" is used to express:',
        questionFr: '"Ku soo dhawoow" s\'utilise pour exprimer:',
        correctAnswer: 'Welcome',
        options: ['Welcome', 'Goodbye', 'Thank you', 'Sorry']
      }
    ]
  },
  // Stage 1, Lesson 7: Daily Phrases
  {
    id: 'so-s1-7',
    stageId: 'somali-stage-1',
    lessonNumber: 7,
    type: 'vocabulary',
    title: 'Daily Phrases',
    titleFr: 'Phrases quotidiennes',
    xpReward: 10,
    exercises: [
      {
        id: 'so-s1-7-1',
        type: 'multiple-choice',
        question: 'How do you say "Good morning" in Somali?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Somali?',
        correctAnswer: 'Subax wanaagsan',
        options: ['Subax wanaagsan', 'Galabnimo wanaagsan', 'Habeennimo wanaagsan', 'Nabadgelyo']
      },
      {
        id: 'so-s1-7-2',
        type: 'multiple-choice',
        question: 'What does "Subax wanaagsan" mean?',
        questionFr: 'Que signifie "Subax wanaagsan"?',
        correctAnswer: 'Good morning',
        options: ['Good morning', 'Good afternoon', 'Good night', 'Goodbye']
      },
      {
        id: 'so-s1-7-3',
        type: 'type-answer',
        question: 'Type "Good afternoon" in Somali',
        questionFr: 'Tapez "Bonne après-midi" en Somali',
        correctAnswer: 'Galabnimo wanaagsan'
      },
      {
        id: 'so-s1-7-4',
        type: 'multiple-choice',
        question: 'How do you say "Good night" in Somali?',
        questionFr: 'Comment dit-on "Bonne nuit" en Somali?',
        correctAnswer: 'Habeennimo wanaagsan',
        options: ['Habeennimo wanaagsan', 'Galabnimo wanaagsan', 'Subax wanaagsan', 'Nabad gelyo']
      },
      {
        id: 'so-s1-7-5',
        type: 'fill-blank',
        question: 'Complete: "___ wanaagsan" (Good morning)',
        questionFr: 'Complétez: "___ wanaagsan" (Bonjour - matin)',
        correctAnswer: 'Subax',
        hint: 'The word for "morning"',
        hintFr: 'Le mot pour "matin"'
      },
      {
        id: 'so-s1-7-6',
        type: 'multiple-choice',
        question: 'What does "Nabad gelyo" mean?',
        questionFr: 'Que signifie "Nabad gelyo"?',
        correctAnswer: 'Goodbye',
        options: ['Goodbye', 'Good morning', 'Good night', 'Good afternoon']
      },
      {
        id: 'so-s1-7-7',
        type: 'type-answer',
        question: 'Type "Goodbye" in Somali',
        questionFr: 'Tapez "Au revoir" en Somali',
        correctAnswer: 'Nabad gelyo'
      },
      {
        id: 'so-s1-7-8',
        type: 'multiple-choice',
        question: 'What does "Inshallah" mean?',
        questionFr: 'Que signifie "Inshallah"?',
        correctAnswer: 'God willing',
        options: ['God willing', 'Thank you', 'Sorry', 'Goodbye']
      },
      {
        id: 'so-s1-7-9',
        type: 'fill-blank',
        question: 'Complete: "Galabnimo ___" (Good afternoon)',
        questionFr: 'Complétez: "Galabnimo ___" (Bonne après-midi)',
        correctAnswer: 'wanaagsan',
        hint: 'The word meaning "good"',
        hintFr: 'Le mot signifiant "bon"'
      },
      {
        id: 'so-s1-7-10',
        type: 'type-answer',
        question: 'Type "God willing" in Somali/Arabic as used in Somali speech',
        questionFr: 'Tapez "Si Dieu le veut" en Somali/Arabe tel qu\'utilisé en Somali',
        correctAnswer: 'Inshallah'
      },
      {
        id: 'so-s1-7-11',
        type: 'multiple-choice',
        question: 'Which phrase is used in the evening?',
        questionFr: 'Quelle phrase utilise-t-on le soir?',
        correctAnswer: 'Galabnimo wanaagsan',
        options: ['Galabnimo wanaagsan', 'Subax wanaagsan', 'Nabad gelyo', 'Inshallah']
      },
      {
        id: 'so-s1-7-12',
        type: 'multiple-choice',
        question: '"Habeennimo wanaagsan" is said:',
        questionFr: '"Habeennimo wanaagsan" se dit:',
        correctAnswer: 'At night before sleep',
        options: ['At night before sleep', 'In the morning', 'In the afternoon', 'When leaving']
      },
      {
        id: 'so-s1-7-13',
        type: 'fill-blank',
        question: 'Complete: "Habeennimo ___" (Good night)',
        questionFr: 'Complétez: "Habeennimo ___" (Bonne nuit)',
        correctAnswer: 'wanaagsan',
        hint: 'Same word as in Subax wanaagsan',
        hintFr: 'Même mot que dans Subax wanaagsan'
      },
      {
        id: 'so-s1-7-14',
        type: 'type-answer',
        question: 'Type "Good morning" in Somali',
        questionFr: 'Tapez "Bonjour" (matin) en Somali',
        correctAnswer: 'Subax wanaagsan'
      },
      {
        id: 'so-s1-7-15',
        type: 'multiple-choice',
        question: 'What is "Nabad gelyo" used for?',
        questionFr: 'À quoi sert "Nabad gelyo"?',
        correctAnswer: 'Saying goodbye',
        options: ['Saying goodbye', 'Saying hello', 'Saying good morning', 'Saying good night']
      },
      {
        id: 'so-s1-7-16',
        type: 'multiple-choice',
        question: 'Which phrase is appropriate at sunrise?',
        questionFr: 'Quelle phrase est appropriée au lever du soleil?',
        correctAnswer: 'Subax wanaagsan',
        options: ['Subax wanaagsan', 'Habeennimo wanaagsan', 'Galabnimo wanaagsan', 'Nabad gelyo']
      },
      {
        id: 'so-s1-7-17',
        type: 'fill-blank',
        question: 'Fill in: "___ gelyo" (Goodbye)',
        questionFr: 'Remplissez: "___ gelyo" (Au revoir)',
        correctAnswer: 'Nabad',
        hint: 'The word for "peace"',
        hintFr: 'Le mot pour "paix"'
      },
      {
        id: 'so-s1-7-18',
        type: 'type-answer',
        question: 'Type "Good night" in Somali',
        questionFr: 'Tapez "Bonne nuit" en Somali',
        correctAnswer: 'Habeennimo wanaagsan'
      },
      {
        id: 'so-s1-7-19',
        type: 'multiple-choice',
        question: '"Inshallah" is borrowed from which language?',
        questionFr: '"Inshallah" est emprunté à quelle langue?',
        correctAnswer: 'Arabic',
        options: ['Arabic', 'English', 'French', 'Swahili']
      },
      {
        id: 'so-s1-7-20',
        type: 'type-answer',
        question: 'Type "Good afternoon" in Somali',
        questionFr: 'Tapez "Bonne après-midi" en Somali',
        correctAnswer: 'Galabnimo wanaagsan'
      }
    ]
  },
  // ── STAGE 2 ────────────────────────────────────────────────────────────────
  // Stage 2, Lesson 1: Please & Thank You
  {
    id: 'so-s2-1',
    stageId: 'somali-stage-2',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Please & Thank You',
    titleFr: 'S\'il vous plaît & Merci',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Somali?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Somali?',
        correctAnswer: 'Fadlan',
        options: ['Fadlan', 'Mahadsanid', 'Adiga ayaa mudan', 'Waad ku mahadsan tahay']
      },
      {
        id: 'so-s2-1-2',
        type: 'multiple-choice',
        question: 'What does "Mahadsanid" mean?',
        questionFr: 'Que signifie "Mahadsanid"?',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'You\'re welcome', 'Sorry']
      },
      {
        id: 'so-s2-1-3',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Somali',
        questionFr: 'Tapez "Merci beaucoup" en Somali',
        correctAnswer: 'Aad ayaad u mahadsan tahay'
      },
      {
        id: 'so-s2-1-4',
        type: 'multiple-choice',
        question: 'How do you say "You\'re welcome" in Somali?',
        questionFr: 'Comment dit-on "De rien" en Somali?',
        correctAnswer: 'Adiga ayaa mudan',
        options: ['Adiga ayaa mudan', 'Mahadsanid', 'Fadlan', 'Waan ku mahadsan tahay']
      },
      {
        id: 'so-s2-1-5',
        type: 'fill-blank',
        question: 'Complete: "___ ayaa mudan" (You\'re welcome)',
        questionFr: 'Complétez: "___ ayaa mudan" (De rien)',
        correctAnswer: 'Adiga',
        hint: 'The Somali word for "you"',
        hintFr: 'Le mot Somali pour "toi/vous"'
      },
      {
        id: 'so-s2-1-6',
        type: 'multiple-choice',
        question: '"Waad ku mahadsan tahay" means:',
        questionFr: '"Waad ku mahadsan tahay" signifie:',
        correctAnswer: 'I thank you',
        options: ['I thank you', 'Thank you very much', 'You\'re welcome', 'Please']
      },
      {
        id: 'so-s2-1-7',
        type: 'type-answer',
        question: 'Type "Please" in Somali',
        questionFr: 'Tapez "S\'il vous plaît" en Somali',
        correctAnswer: 'Fadlan'
      },
      {
        id: 'so-s2-1-8',
        type: 'multiple-choice',
        question: 'Which phrase means "Thank you very much"?',
        questionFr: 'Quelle phrase signifie "Merci beaucoup"?',
        correctAnswer: 'Aad ayaad u mahadsan tahay',
        options: ['Aad ayaad u mahadsan tahay', 'Mahadsanid', 'Fadlan', 'Adiga ayaa mudan']
      },
      {
        id: 'so-s2-1-9',
        type: 'fill-blank',
        question: 'Complete: "Aad ayaad u ___ tahay" (Thank you very much)',
        questionFr: 'Complétez: "Aad ayaad u ___ tahay" (Merci beaucoup)',
        correctAnswer: 'mahadsan',
        hint: 'The root word related to "thanks"',
        hintFr: 'Le mot racine lié à "merci"'
      },
      {
        id: 'so-s2-1-10',
        type: 'type-answer',
        question: 'Type "Thank you" in Somali',
        questionFr: 'Tapez "Merci" en Somali',
        correctAnswer: 'Mahadsanid'
      },
      {
        id: 'so-s2-1-11',
        type: 'multiple-choice',
        question: 'When someone says "Mahadsanid" you reply with:',
        questionFr: 'Quand quelqu\'un dit "Mahadsanid" vous répondez:',
        correctAnswer: 'Adiga ayaa mudan',
        options: ['Adiga ayaa mudan', 'Mahadsanid', 'Fadlan', 'Waan ku mahadsan tahay']
      },
      {
        id: 'so-s2-1-12',
        type: 'multiple-choice',
        question: '"Fadlan" is placed in a sentence to mean:',
        questionFr: '"Fadlan" est placé dans une phrase pour signifier:',
        correctAnswer: 'Please',
        options: ['Please', 'Thank you', 'Sorry', 'Welcome']
      },
      {
        id: 'so-s2-1-13',
        type: 'fill-blank',
        question: 'Complete: "Waad ku ___ tahay" (I thank you)',
        questionFr: 'Complétez: "Waad ku ___ tahay" (Je vous remercie)',
        correctAnswer: 'mahadsan',
        hint: 'Related to the word for thanks',
        hintFr: 'Lié au mot pour remerciement'
      },
      {
        id: 'so-s2-1-14',
        type: 'type-answer',
        question: 'Type "You\'re welcome" in Somali',
        questionFr: 'Tapez "De rien" en Somali',
        correctAnswer: 'Adiga ayaa mudan'
      },
      {
        id: 'so-s2-1-15',
        type: 'multiple-choice',
        question: 'Which is the most formal way to say thank you in Somali?',
        questionFr: 'Quelle est la façon la plus formelle de dire merci en Somali?',
        correctAnswer: 'Aad ayaad u mahadsan tahay',
        options: ['Aad ayaad u mahadsan tahay', 'Mahadsanid', 'Fadlan', 'Haa']
      },
      {
        id: 'so-s2-1-16',
        type: 'multiple-choice',
        question: 'To ask someone politely for water you say:',
        questionFr: 'Pour demander poliment de l\'eau vous dites:',
        correctAnswer: 'Fadlan biyo i sii',
        options: ['Fadlan biyo i sii', 'Biyo mahadsanid', 'Adiga biyo mudan', 'Biyo wanaagsan']
      },
      {
        id: 'so-s2-1-17',
        type: 'fill-blank',
        question: 'Fill in: "Mahad___" (Thank you — common short form)',
        questionFr: 'Remplissez: "Mahad___" (Merci — forme courte courante)',
        correctAnswer: 'sanid',
        hint: 'The suffix that completes "thanks"',
        hintFr: 'Le suffixe qui complète "merci"'
      },
      {
        id: 'so-s2-1-18',
        type: 'type-answer',
        question: 'Type "I thank you" in Somali',
        questionFr: 'Tapez "Je vous remercie" en Somali',
        correctAnswer: 'Waad ku mahadsan tahay'
      },
      {
        id: 'so-s2-1-19',
        type: 'multiple-choice',
        question: 'What does "Fadlan" translate to?',
        questionFr: 'Que signifie "Fadlan"?',
        correctAnswer: 'Please',
        options: ['Please', 'Thank you', 'Goodbye', 'Welcome']
      },
      {
        id: 'so-s2-1-20',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Somali',
        questionFr: 'Tapez "Merci beaucoup" en Somali',
        correctAnswer: 'Aad ayaad u mahadsan tahay'
      }
    ]
  },
  // Stage 2, Lesson 2: Apologies
  {
    id: 'so-s2-2',
    stageId: 'somali-stage-2',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Apologies',
    titleFr: 'Excuses',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-2-1',
        type: 'multiple-choice',
        question: 'How do you say "Sorry / Forgive me" in Somali?',
        questionFr: 'Comment dit-on "Pardon / Excuse-moi" en Somali?',
        correctAnswer: 'Raali ka ahow',
        options: ['Raali ka ahow', 'Waa xun tahay', 'Adaa cafis leh', 'Maxaa dhacay?']
      },
      {
        id: 'so-s2-2-2',
        type: 'multiple-choice',
        question: 'What does "Waa xun tahay" mean?',
        questionFr: 'Que signifie "Waa xun tahay"?',
        correctAnswer: 'I\'m sorry',
        options: ['I\'m sorry', 'Forgive me', 'No problem', 'You are forgiven']
      },
      {
        id: 'so-s2-2-3',
        type: 'type-answer',
        question: 'Type "Sorry / Forgive me" in Somali',
        questionFr: 'Tapez "Pardon / Excuse-moi" en Somali',
        correctAnswer: 'Raali ka ahow'
      },
      {
        id: 'so-s2-2-4',
        type: 'multiple-choice',
        question: '"Adaa cafis leh" means:',
        questionFr: '"Adaa cafis leh" signifie:',
        correctAnswer: 'You are forgiven',
        options: ['You are forgiven', 'I\'m sorry', 'No problem', 'Forgive me']
      },
      {
        id: 'so-s2-2-5',
        type: 'fill-blank',
        question: 'Complete: "Raali ___ ahow" (Sorry / Forgive me)',
        questionFr: 'Complétez: "Raali ___ ahow" (Pardon)',
        correctAnswer: 'ka',
        hint: 'A short preposition meaning "from/of"',
        hintFr: 'Une courte préposition signifiant "de"'
      },
      {
        id: 'so-s2-2-6',
        type: 'multiple-choice',
        question: 'How do you ask "Are you upset?" in Somali?',
        questionFr: 'Comment demande-t-on "Es-tu fâché?" en Somali?',
        correctAnswer: 'Raali ma ahid?',
        options: ['Raali ma ahid?', 'Waa xun tahay?', 'Maxaa dhacay?', 'Adaa cafis leh?']
      },
      {
        id: 'so-s2-2-7',
        type: 'type-answer',
        question: 'Type "I\'m sorry" in Somali',
        questionFr: 'Tapez "Je suis désolé" en Somali',
        correctAnswer: 'Waa xun tahay'
      },
      {
        id: 'so-s2-2-8',
        type: 'multiple-choice',
        question: '"Maxaa dhacay?" in this context means:',
        questionFr: '"Maxaa dhacay?" dans ce contexte signifie:',
        correctAnswer: 'No problem',
        options: ['No problem', 'What happened?', 'Are you okay?', 'Forgive me']
      },
      {
        id: 'so-s2-2-9',
        type: 'fill-blank',
        question: 'Complete: "Adaa ___ leh" (You are forgiven)',
        questionFr: 'Complétez: "Adaa ___ leh" (Tu es pardonné)',
        correctAnswer: 'cafis',
        hint: 'The word meaning "forgiveness"',
        hintFr: 'Le mot signifiant "pardon/grâce"'
      },
      {
        id: 'so-s2-2-10',
        type: 'type-answer',
        question: 'Type "You are forgiven" in Somali',
        questionFr: 'Tapez "Tu es pardonné" en Somali',
        correctAnswer: 'Adaa cafis leh'
      },
      {
        id: 'so-s2-2-11',
        type: 'multiple-choice',
        question: 'Which phrase do you use when you accidentally bump into someone?',
        questionFr: 'Quelle phrase utilise-t-on quand on bouscule quelqu\'un accidentellement?',
        correctAnswer: 'Raali ka ahow',
        options: ['Raali ka ahow', 'Adaa cafis leh', 'Mahadsanid', 'Ku soo dhawoow']
      },
      {
        id: 'so-s2-2-12',
        type: 'multiple-choice',
        question: 'To tell someone "no problem" in Somali you say:',
        questionFr: 'Pour dire "pas de problème" en Somali on dit:',
        correctAnswer: 'Maxaa dhacay?',
        options: ['Maxaa dhacay?', 'Raali ka ahow', 'Waa xun tahay', 'Raali ma ahid?']
      },
      {
        id: 'so-s2-2-13',
        type: 'fill-blank',
        question: 'Complete: "Waa ___ tahay" (I\'m sorry)',
        questionFr: 'Complétez: "Waa ___ tahay" (Je suis désolé)',
        correctAnswer: 'xun',
        hint: 'Means "bad/unpleasant"',
        hintFr: 'Signifie "mauvais/désagréable"'
      },
      {
        id: 'so-s2-2-14',
        type: 'type-answer',
        question: 'Type "Are you upset?" in Somali',
        questionFr: 'Tapez "Es-tu fâché?" en Somali',
        correctAnswer: 'Raali ma ahid?'
      },
      {
        id: 'so-s2-2-15',
        type: 'multiple-choice',
        question: '"Waa xun tahay" is most similar in meaning to:',
        questionFr: '"Waa xun tahay" est le plus proche en sens de:',
        correctAnswer: 'I am sorry',
        options: ['I am sorry', 'No problem', 'You are forgiven', 'Excuse me please']
      },
      {
        id: 'so-s2-2-16',
        type: 'multiple-choice',
        question: 'Which phrase forgives the person who apologized?',
        questionFr: 'Quelle phrase pardonne la personne qui s\'est excusée?',
        correctAnswer: 'Adaa cafis leh',
        options: ['Adaa cafis leh', 'Raali ka ahow', 'Waa xun tahay', 'Maxaa dhacay?']
      },
      {
        id: 'so-s2-2-17',
        type: 'fill-blank',
        question: 'Complete: "___ ka ahow" (Forgive me)',
        questionFr: 'Complétez: "___ ka ahow" (Pardonne-moi)',
        correctAnswer: 'Raali',
        hint: 'The first word of the apology phrase',
        hintFr: 'Le premier mot de la phrase d\'excuse'
      },
      {
        id: 'so-s2-2-18',
        type: 'type-answer',
        question: 'Type "No problem" in Somali (the expression used as a response to apologies)',
        questionFr: 'Tapez "Pas de problème" en Somali (l\'expression utilisée en réponse aux excuses)',
        correctAnswer: 'Maxaa dhacay?'
      },
      {
        id: 'so-s2-2-19',
        type: 'multiple-choice',
        question: 'The phrase "Raali ma ahid?" literally checks if someone:',
        questionFr: 'La phrase "Raali ma ahid?" vérifie littéralement si quelqu\'un:',
        correctAnswer: 'Is not at ease / Is upset',
        options: ['Is not at ease / Is upset', 'Is hungry', 'Is tired', 'Is leaving']
      },
      {
        id: 'so-s2-2-20',
        type: 'type-answer',
        question: 'Type "Sorry / Forgive me" in Somali',
        questionFr: 'Tapez "Désolé / Pardonne-moi" en Somali',
        correctAnswer: 'Raali ka ahow'
      }
    ]
  },
  // Stage 2, Lesson 3: Yes / No / Agreement
  {
    id: 'so-s2-3',
    stageId: 'somali-stage-2',
    lessonNumber: 3,
    type: 'vocabulary',
    title: 'Yes, No & Agreement',
    titleFr: 'Oui, Non & Accord',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-3-1',
        type: 'multiple-choice',
        question: 'How do you say "Yes" in Somali?',
        questionFr: 'Comment dit-on "Oui" en Somali?',
        correctAnswer: 'Haa',
        options: ['Haa', 'Maya', 'Sax', 'Hubaal']
      },
      {
        id: 'so-s2-3-2',
        type: 'multiple-choice',
        question: 'What does "Maya" mean?',
        questionFr: 'Que signifie "Maya"?',
        correctAnswer: 'No',
        options: ['No', 'Yes', 'Correct', 'Maybe']
      },
      {
        id: 'so-s2-3-3',
        type: 'type-answer',
        question: 'Type "Correct" in Somali',
        questionFr: 'Tapez "Correct" en Somali',
        correctAnswer: 'Sax'
      },
      {
        id: 'so-s2-3-4',
        type: 'multiple-choice',
        question: '"Hubaal" means:',
        questionFr: '"Hubaal" signifie:',
        correctAnswer: 'Of course',
        options: ['Of course', 'Maybe', 'No', 'I disagree']
      },
      {
        id: 'so-s2-3-5',
        type: 'fill-blank',
        question: 'Complete: "Laga ___" (Maybe)',
        questionFr: 'Complétez: "Laga ___" (Peut-être)',
        correctAnswer: 'yaabo',
        hint: 'Second part of the word for "maybe"',
        hintFr: 'Deuxième partie du mot pour "peut-être"'
      },
      {
        id: 'so-s2-3-6',
        type: 'multiple-choice',
        question: 'How do you say "I agree" in Somali?',
        questionFr: 'Comment dit-on "Je suis d\'accord" en Somali?',
        correctAnswer: 'Waan ku raacaanaa',
        options: ['Waan ku raacaanaa', 'Kaama raacin', 'Haa', 'Laga yaabo']
      },
      {
        id: 'so-s2-3-7',
        type: 'type-answer',
        question: 'Type "I disagree" in Somali',
        questionFr: 'Tapez "Je ne suis pas d\'accord" en Somali',
        correctAnswer: 'Kaama raacin'
      },
      {
        id: 'so-s2-3-8',
        type: 'multiple-choice',
        question: 'What does "Laga yaabo" mean?',
        questionFr: 'Que signifie "Laga yaabo"?',
        correctAnswer: 'Maybe',
        options: ['Maybe', 'Of course', 'Yes', 'I agree']
      },
      {
        id: 'so-s2-3-9',
        type: 'fill-blank',
        question: 'Complete: "Waan ku ___" (I agree)',
        questionFr: 'Complétez: "Waan ku ___" (Je suis d\'accord)',
        correctAnswer: 'raacaanaa',
        hint: 'The verb meaning "to follow/agree"',
        hintFr: 'Le verbe signifiant "suivre/être d\'accord"'
      },
      {
        id: 'so-s2-3-10',
        type: 'type-answer',
        question: 'Type "Of course" in Somali',
        questionFr: 'Tapez "Bien sûr" en Somali',
        correctAnswer: 'Hubaal'
      },
      {
        id: 'so-s2-3-11',
        type: 'multiple-choice',
        question: '"Sax" is used to mean:',
        questionFr: '"Sax" est utilisé pour signifier:',
        correctAnswer: 'Correct',
        options: ['Correct', 'Yes', 'Of course', 'I agree']
      },
      {
        id: 'so-s2-3-12',
        type: 'multiple-choice',
        question: 'If you want to politely disagree you say:',
        questionFr: 'Si vous voulez poliment ne pas être d\'accord vous dites:',
        correctAnswer: 'Kaama raacin',
        options: ['Kaama raacin', 'Waan ku raacaanaa', 'Haa', 'Hubaal']
      },
      {
        id: 'so-s2-3-13',
        type: 'fill-blank',
        question: 'Complete: "Kaama ___" (I disagree)',
        questionFr: 'Complétez: "Kaama ___" (Je ne suis pas d\'accord)',
        correctAnswer: 'raacin',
        hint: 'The negative verb form of "to follow/agree"',
        hintFr: 'La forme négative du verbe "suivre/être d\'accord"'
      },
      {
        id: 'so-s2-3-14',
        type: 'type-answer',
        question: 'Type "No" in Somali',
        questionFr: 'Tapez "Non" en Somali',
        correctAnswer: 'Maya'
      },
      {
        id: 'so-s2-3-15',
        type: 'multiple-choice',
        question: 'Which word means "correct" in Somali?',
        questionFr: 'Quel mot signifie "correct" en Somali?',
        correctAnswer: 'Sax',
        options: ['Sax', 'Haa', 'Maya', 'Hubaal']
      },
      {
        id: 'so-s2-3-16',
        type: 'multiple-choice',
        question: '"Haa" and "Hubaal" differ because:',
        questionFr: '"Haa" et "Hubaal" diffèrent parce que:',
        correctAnswer: 'Haa means yes; Hubaal means of course',
        options: ['Haa means yes; Hubaal means of course', 'Haa means correct; Hubaal means yes', 'They are the same', 'Haa means maybe; Hubaal means yes']
      },
      {
        id: 'so-s2-3-17',
        type: 'fill-blank',
        question: 'Complete: "___ yaabo" (Maybe)',
        questionFr: 'Complétez: "___ yaabo" (Peut-être)',
        correctAnswer: 'Laga',
        hint: 'First part of the word for "maybe"',
        hintFr: 'Première partie du mot pour "peut-être"'
      },
      {
        id: 'so-s2-3-18',
        type: 'type-answer',
        question: 'Type "Yes" in Somali',
        questionFr: 'Tapez "Oui" en Somali',
        correctAnswer: 'Haa'
      },
      {
        id: 'so-s2-3-19',
        type: 'multiple-choice',
        question: 'To strongly confirm something you say:',
        questionFr: 'Pour confirmer fermement quelque chose on dit:',
        correctAnswer: 'Hubaal',
        options: ['Hubaal', 'Laga yaabo', 'Maya', 'Kaama raacin']
      },
      {
        id: 'so-s2-3-20',
        type: 'type-answer',
        question: 'Type "I agree" in Somali',
        questionFr: 'Tapez "Je suis d\'accord" en Somali',
        correctAnswer: 'Waan ku raacaanaa'
      }
    ]
  },
  // Stage 2, Lesson 4: Welcome & Hospitality
  {
    id: 'so-s2-4',
    stageId: 'somali-stage-2',
    lessonNumber: 4,
    type: 'vocabulary',
    title: 'Welcome & Hospitality',
    titleFr: 'Accueil & Hospitalité',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-4-1',
        type: 'multiple-choice',
        question: 'How do you say "Welcome" in Somali?',
        questionFr: 'Comment dit-on "Bienvenue" en Somali?',
        correctAnswer: 'Ku soo dhawoow',
        options: ['Ku soo dhawoow', 'Soo gal', 'Fariiso', 'Cunto cunso']
      },
      {
        id: 'so-s2-4-2',
        type: 'multiple-choice',
        question: 'What does "Soo gal" mean?',
        questionFr: 'Que signifie "Soo gal"?',
        correctAnswer: 'Come in',
        options: ['Come in', 'Sit down', 'Please eat', 'Welcome']
      },
      {
        id: 'so-s2-4-3',
        type: 'type-answer',
        question: 'Type "Sit down" in Somali',
        questionFr: 'Tapez "Asseyez-vous" en Somali',
        correctAnswer: 'Fariiso'
      },
      {
        id: 'so-s2-4-4',
        type: 'multiple-choice',
        question: '"Cunto cunso" means:',
        questionFr: '"Cunto cunso" signifie:',
        correctAnswer: 'Please eat',
        options: ['Please eat', 'Come in', 'Sit down', 'Welcome']
      },
      {
        id: 'so-s2-4-5',
        type: 'fill-blank',
        question: 'Complete: "Gurigayagu waa ___" (Our home is your home)',
        questionFr: 'Complétez: "Gurigayagu waa ___" (Notre maison est la vôtre)',
        correctAnswer: 'gurigaaga',
        hint: 'The phrase meaning "your home"',
        hintFr: 'La phrase signifiant "ta maison"'
      },
      {
        id: 'so-s2-4-6',
        type: 'multiple-choice',
        question: 'How do you say "Come in" in Somali?',
        questionFr: 'Comment dit-on "Entrez" en Somali?',
        correctAnswer: 'Soo gal',
        options: ['Soo gal', 'Fariiso', 'Cunto cunso', 'Ku soo dhawoow']
      },
      {
        id: 'so-s2-4-7',
        type: 'type-answer',
        question: 'Type "Please eat" in Somali',
        questionFr: 'Tapez "Mangez s\'il vous plaît" en Somali',
        correctAnswer: 'Cunto cunso'
      },
      {
        id: 'so-s2-4-8',
        type: 'multiple-choice',
        question: '"Gurigayagu waa gurigaaga" is the Somali way of saying:',
        questionFr: '"Gurigayagu waa gurigaaga" est la façon Somali de dire:',
        correctAnswer: 'Our home is your home',
        options: ['Our home is your home', 'Welcome to our home', 'Please sit down', 'Come in please']
      },
      {
        id: 'so-s2-4-9',
        type: 'fill-blank',
        question: 'Complete: "Soo ___" (Come in)',
        questionFr: 'Complétez: "Soo ___" (Entrez)',
        correctAnswer: 'gal',
        hint: 'The verb meaning "to enter"',
        hintFr: 'Le verbe signifiant "entrer"'
      },
      {
        id: 'so-s2-4-10',
        type: 'type-answer',
        question: 'Type "Welcome" in Somali',
        questionFr: 'Tapez "Bienvenue" en Somali',
        correctAnswer: 'Ku soo dhawoow'
      },
      {
        id: 'so-s2-4-11',
        type: 'multiple-choice',
        question: 'A Somali host would say ___ when guests arrive at the door:',
        questionFr: 'Un hôte Somali dirait ___ quand les invités arrivent à la porte:',
        correctAnswer: 'Ku soo dhawoow',
        options: ['Ku soo dhawoow', 'Nabadgelyo', 'Mahadsanid', 'Raali ka ahow']
      },
      {
        id: 'so-s2-4-12',
        type: 'multiple-choice',
        question: 'To invite guests inside you say:',
        questionFr: 'Pour inviter des hôtes à l\'intérieur vous dites:',
        correctAnswer: 'Soo gal',
        options: ['Soo gal', 'Fariiso', 'Cunto cunso', 'Nabad gelyo']
      },
      {
        id: 'so-s2-4-13',
        type: 'fill-blank',
        question: 'Complete: "___ cunso" (Please eat)',
        questionFr: 'Complétez: "___ cunso" (Mangez s\'il vous plaît)',
        correctAnswer: 'Cunto',
        hint: 'The word for "food"',
        hintFr: 'Le mot pour "nourriture"'
      },
      {
        id: 'so-s2-4-14',
        type: 'type-answer',
        question: 'Type "Sit down" in Somali',
        questionFr: 'Tapez "Asseyez-vous" en Somali',
        correctAnswer: 'Fariiso'
      },
      {
        id: 'so-s2-4-15',
        type: 'multiple-choice',
        question: '"Fariiso" is the command meaning:',
        questionFr: '"Fariiso" est le commandement signifiant:',
        correctAnswer: 'Sit down',
        options: ['Sit down', 'Stand up', 'Come in', 'Eat']
      },
      {
        id: 'so-s2-4-16',
        type: 'multiple-choice',
        question: 'Which phrase best expresses Somali hospitality?',
        questionFr: 'Quelle phrase exprime le mieux l\'hospitalité Somali?',
        correctAnswer: 'Gurigayagu waa gurigaaga',
        options: ['Gurigayagu waa gurigaaga', 'Fadlan', 'Mahadsanid', 'Nabadgelyo']
      },
      {
        id: 'so-s2-4-17',
        type: 'fill-blank',
        question: 'Complete: "Gurigayagu waa guriga___" (Our home is your home)',
        questionFr: 'Complétez: "Gurigayagu waa guriga___" (Notre maison est la vôtre)',
        correctAnswer: 'aga',
        hint: 'The suffix meaning "yours"',
        hintFr: 'Le suffixe signifiant "le tien/vôtre"'
      },
      {
        id: 'so-s2-4-18',
        type: 'type-answer',
        question: 'Type "Come in" in Somali',
        questionFr: 'Tapez "Entrez" en Somali',
        correctAnswer: 'Soo gal'
      },
      {
        id: 'so-s2-4-19',
        type: 'multiple-choice',
        question: 'After welcoming guests and seating them, you offer food by saying:',
        questionFr: 'Après avoir accueilli les invités et les avoir assis vous leur offrez à manger en disant:',
        correctAnswer: 'Cunto cunso',
        options: ['Cunto cunso', 'Soo gal', 'Fariiso', 'Nabadgelyo']
      },
      {
        id: 'so-s2-4-20',
        type: 'type-answer',
        question: 'Type "Our home is your home" in Somali',
        questionFr: 'Tapez "Notre maison est la vôtre" en Somali',
        correctAnswer: 'Gurigayagu waa gurigaaga'
      }
    ]
  },
  // Stage 2, Lesson 5: Requests
  {
    id: 'so-s2-5',
    stageId: 'somali-stage-2',
    lessonNumber: 5,
    type: 'vocabulary',
    title: 'Making Requests',
    titleFr: 'Faire des demandes',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-5-1',
        type: 'multiple-choice',
        question: 'How do you say "I want" in Somali?',
        questionFr: 'Comment dit-on "Je veux" en Somali?',
        correctAnswer: 'Waxaan rabaa',
        options: ['Waxaan rabaa', 'Waxaan u baahnahay', 'Ma awoodaa?', 'Waxaan raadinayaa']
      },
      {
        id: 'so-s2-5-2',
        type: 'multiple-choice',
        question: 'What does "Waxaan u baahnahay" mean?',
        questionFr: 'Que signifie "Waxaan u baahnahay"?',
        correctAnswer: 'I need',
        options: ['I need', 'I want', 'Can you?', 'Please help me']
      },
      {
        id: 'so-s2-5-3',
        type: 'type-answer',
        question: 'Type "Can you?" in Somali',
        questionFr: 'Tapez "Pouvez-vous?" en Somali',
        correctAnswer: 'Ma awoodaa?'
      },
      {
        id: 'so-s2-5-4',
        type: 'multiple-choice',
        question: '"Fadlan iiga caawiyo" means:',
        questionFr: '"Fadlan iiga caawiyo" signifie:',
        correctAnswer: 'Please help me',
        options: ['Please help me', 'I want', 'I need', 'I am looking for']
      },
      {
        id: 'so-s2-5-5',
        type: 'fill-blank',
        question: 'Complete: "Waxaan ___" (I want)',
        questionFr: 'Complétez: "Waxaan ___" (Je veux)',
        correctAnswer: 'rabaa',
        hint: 'The verb meaning "to want"',
        hintFr: 'Le verbe signifiant "vouloir"'
      },
      {
        id: 'so-s2-5-6',
        type: 'multiple-choice',
        question: 'How do you say "I am looking for" in Somali?',
        questionFr: 'Comment dit-on "Je cherche" en Somali?',
        correctAnswer: 'Waxaan raadinayaa',
        options: ['Waxaan raadinayaa', 'Waxaan rabaa', 'Waxaan u baahnahay', 'Ma awoodaa?']
      },
      {
        id: 'so-s2-5-7',
        type: 'type-answer',
        question: 'Type "I need" in Somali',
        questionFr: 'Tapez "J\'ai besoin" en Somali',
        correctAnswer: 'Waxaan u baahnahay'
      },
      {
        id: 'so-s2-5-8',
        type: 'multiple-choice',
        question: '"Ma awoodaa?" is used to:',
        questionFr: '"Ma awoodaa?" est utilisé pour:',
        correctAnswer: 'Ask if someone is able/can do something',
        options: ['Ask if someone is able/can do something', 'Say thank you', 'Ask for food', 'Say welcome']
      },
      {
        id: 'so-s2-5-9',
        type: 'fill-blank',
        question: 'Complete: "Fadlan iiga ___" (Please help me)',
        questionFr: 'Complétez: "Fadlan iiga ___" (Aidez-moi s\'il vous plaît)',
        correctAnswer: 'caawiyo',
        hint: 'The verb meaning "to help" (command form)',
        hintFr: 'Le verbe signifiant "aider" (forme impérative)'
      },
      {
        id: 'so-s2-5-10',
        type: 'type-answer',
        question: 'Type "I am looking for" in Somali',
        questionFr: 'Tapez "Je cherche" en Somali',
        correctAnswer: 'Waxaan raadinayaa'
      },
      {
        id: 'so-s2-5-11',
        type: 'multiple-choice',
        question: 'To express a need (not just a want) you use:',
        questionFr: 'Pour exprimer un besoin (pas seulement un désir) vous utilisez:',
        correctAnswer: 'Waxaan u baahnahay',
        options: ['Waxaan u baahnahay', 'Waxaan rabaa', 'Ma awoodaa?', 'Waxaan raadinayaa']
      },
      {
        id: 'so-s2-5-12',
        type: 'multiple-choice',
        question: 'Which phrase asks for assistance?',
        questionFr: 'Quelle phrase demande de l\'aide?',
        correctAnswer: 'Fadlan iiga caawiyo',
        options: ['Fadlan iiga caawiyo', 'Waxaan rabaa', 'Ma awoodaa?', 'Waxaan raadinayaa']
      },
      {
        id: 'so-s2-5-13',
        type: 'fill-blank',
        question: 'Complete: "Waxaan u ___" (I need)',
        questionFr: 'Complétez: "Waxaan u ___" (J\'ai besoin)',
        correctAnswer: 'baahnahay',
        hint: 'The verb phrase meaning "to need"',
        hintFr: 'Le groupe verbal signifiant "avoir besoin"'
      },
      {
        id: 'so-s2-5-14',
        type: 'type-answer',
        question: 'Type "Please help me" in Somali',
        questionFr: 'Tapez "Aidez-moi s\'il vous plaît" en Somali',
        correctAnswer: 'Fadlan iiga caawiyo'
      },
      {
        id: 'so-s2-5-15',
        type: 'multiple-choice',
        question: '"Waxaan raadinayaa" is used when you are:',
        questionFr: '"Waxaan raadinayaa" est utilisé quand vous:',
        correctAnswer: 'Looking for something',
        options: ['Looking for something', 'Offering food', 'Greeting someone', 'Leaving']
      },
      {
        id: 'so-s2-5-16',
        type: 'multiple-choice',
        question: 'To politely ask a favor you start with:',
        questionFr: 'Pour demander poliment une faveur vous commencez par:',
        correctAnswer: 'Fadlan',
        options: ['Fadlan', 'Haa', 'Maya', 'Hubaal']
      },
      {
        id: 'so-s2-5-17',
        type: 'fill-blank',
        question: 'Complete: "Waxaan ___ayaa" (I am looking for)',
        questionFr: 'Complétez: "Waxaan ___ayaa" (Je cherche)',
        correctAnswer: 'raadin',
        hint: 'The root verb meaning "to search"',
        hintFr: 'Le verbe racine signifiant "chercher"'
      },
      {
        id: 'so-s2-5-18',
        type: 'type-answer',
        question: 'Type "I want" in Somali',
        questionFr: 'Tapez "Je veux" en Somali',
        correctAnswer: 'Waxaan rabaa'
      },
      {
        id: 'so-s2-5-19',
        type: 'multiple-choice',
        question: '"Ma awoodaa?" literally means:',
        questionFr: '"Ma awoodaa?" signifie littéralement:',
        correctAnswer: 'Are you able?',
        options: ['Are you able?', 'Do you want?', 'Do you need?', 'Do you understand?']
      },
      {
        id: 'so-s2-5-20',
        type: 'type-answer',
        question: 'Type "Can you?" in Somali',
        questionFr: 'Tapez "Pouvez-vous?" en Somali',
        correctAnswer: 'Ma awoodaa?'
      }
    ]
  },
  // Stage 2, Lesson 6: Compliments
  {
    id: 'so-s2-6',
    stageId: 'somali-stage-2',
    lessonNumber: 6,
    type: 'vocabulary',
    title: 'Giving Compliments',
    titleFr: 'Faire des compliments',
    xpReward: 15,
    exercises: [
      {
        id: 'so-s2-6-1',
        type: 'multiple-choice',
        question: 'How do you say "I am very happy" in Somali?',
        questionFr: 'Comment dit-on "Je suis très heureux" en Somali?',
        correctAnswer: 'Aad baan ugu faraxsanahay',
        options: ['Aad baan ugu faraxsanahay', 'Waa qurux badan tahay', 'Si fiican ayaad u samaaysay', 'Waa fiican tahay']
      },
      {
        id: 'so-s2-6-2',
        type: 'multiple-choice',
        question: 'What does "Waa qurux badan tahay" mean?',
        questionFr: 'Que signifie "Waa qurux badan tahay"?',
        correctAnswer: 'You are beautiful',
        options: ['You are beautiful', 'You are smart', 'Well done', 'It is good']
      },
      {
        id: 'so-s2-6-3',
        type: 'type-answer',
        question: 'Type "You are very smart" in Somali',
        questionFr: 'Tapez "Vous êtes très intelligent" en Somali',
        correctAnswer: 'Aad ayaad u caqoon tahay'
      },
      {
        id: 'so-s2-6-4',
        type: 'multiple-choice',
        question: '"Si fiican ayaad u samaaysay" means:',
        questionFr: '"Si fiican ayaad u samaaysay" signifie:',
        correctAnswer: 'Well done',
        options: ['Well done', 'You are beautiful', 'I am happy', 'It is good']
      },
      {
        id: 'so-s2-6-5',
        type: 'fill-blank',
        question: 'Complete: "Waa ___ tahay" (It is good)',
        questionFr: 'Complétez: "Waa ___ tahay" (C\'est bien)',
        correctAnswer: 'fiican',
        hint: 'The adjective meaning "good/fine"',
        hintFr: 'L\'adjectif signifiant "bien/bon"'
      },
      {
        id: 'so-s2-6-6',
        type: 'multiple-choice',
        question: 'How do you say "It is good" in Somali?',
        questionFr: 'Comment dit-on "C\'est bien" en Somali?',
        correctAnswer: 'Waa fiican tahay',
        options: ['Waa fiican tahay', 'Waa xun tahay', 'Aad baan ugu faraxsanahay', 'Si fiican ayaad u samaaysay']
      },
      {
        id: 'so-s2-6-7',
        type: 'type-answer',
        question: 'Type "You are beautiful" in Somali',
        questionFr: 'Tapez "Tu es beau/belle" en Somali',
        correctAnswer: 'Waa qurux badan tahay'
      },
      {
        id: 'so-s2-6-8',
        type: 'multiple-choice',
        question: '"Aad baan ugu faraxsanahay" expresses:',
        questionFr: '"Aad baan ugu faraxsanahay" exprime:',
        correctAnswer: 'Great happiness',
        options: ['Great happiness', 'Sadness', 'Surprise', 'Disagreement']
      },
      {
        id: 'so-s2-6-9',
        type: 'fill-blank',
        question: 'Complete: "Aad ayaad u ___ tahay" (You are very smart)',
        questionFr: 'Complétez: "Aad ayaad u ___ tahay" (Vous êtes très intelligent)',
        correctAnswer: 'caqoon',
        hint: 'The adjective meaning "smart/wise"',
        hintFr: 'L\'adjectif signifiant "intelligent/sage"'
      },
      {
        id: 'so-s2-6-10',
        type: 'type-answer',
        question: 'Type "Well done" in Somali',
        questionFr: 'Tapez "Bien fait" en Somali',
        correctAnswer: 'Si fiican ayaad u samaaysay'
      },
      {
        id: 'so-s2-6-11',
        type: 'multiple-choice',
        question: 'To praise someone\'s work you say:',
        questionFr: 'Pour féliciter quelqu\'un pour son travail vous dites:',
        correctAnswer: 'Si fiican ayaad u samaaysay',
        options: ['Si fiican ayaad u samaaysay', 'Waa qurux badan tahay', 'Aad baan ugu faraxsanahay', 'Raali ka ahow']
      },
      {
        id: 'so-s2-6-12',
        type: 'multiple-choice',
        question: '"Qurux badan" in Somali means:',
        questionFr: '"Qurux badan" en Somali signifie:',
        correctAnswer: 'Very beautiful',
        options: ['Very beautiful', 'Very smart', 'Very happy', 'Very good']
      },
      {
        id: 'so-s2-6-13',
        type: 'fill-blank',
        question: 'Complete: "Aad baan ugu ___" (I am very happy)',
        questionFr: 'Complétez: "Aad baan ugu ___" (Je suis très heureux)',
        correctAnswer: 'faraxsanahay',
        hint: 'The adjective phrase meaning "happy/joyful"',
        hintFr: 'L\'adjectif signifiant "heureux/joyeux"'
      },
      {
        id: 'so-s2-6-14',
        type: 'type-answer',
        question: 'Type "I am very happy" in Somali',
        questionFr: 'Tapez "Je suis très heureux" en Somali',
        correctAnswer: 'Aad baan ugu faraxsanahay'
      },
      {
        id: 'so-s2-6-15',
        type: 'multiple-choice',
        question: 'Which phrase is a compliment about appearance?',
        questionFr: 'Quelle phrase est un compliment sur l\'apparence?',
        correctAnswer: 'Waa qurux badan tahay',
        options: ['Waa qurux badan tahay', 'Si fiican ayaad u samaaysay', 'Aad baan ugu faraxsanahay', 'Waa fiican tahay']
      },
      {
        id: 'so-s2-6-16',
        type: 'multiple-choice',
        question: 'Which phrase is a compliment about intelligence?',
        questionFr: 'Quelle phrase est un compliment sur l\'intelligence?',
        correctAnswer: 'Aad ayaad u caqoon tahay',
        options: ['Aad ayaad u caqoon tahay', 'Waa qurux badan tahay', 'Si fiican ayaad u samaaysay', 'Aad baan ugu faraxsanahay']
      },
      {
        id: 'so-s2-6-17',
        type: 'fill-blank',
        question: 'Complete: "Si ___ ayaad u samaaysay" (Well done)',
        questionFr: 'Complétez: "Si ___ ayaad u samaaysay" (Bien fait)',
        correctAnswer: 'fiican',
        hint: 'Means "good/well"',
        hintFr: 'Signifie "bien/bon"'
      },
      {
        id: 'so-s2-6-18',
        type: 'type-answer',
        question: 'Type "It is good" in Somali',
        questionFr: 'Tapez "C\'est bien" en Somali',
        correctAnswer: 'Waa fiican tahay'
      },
      {
        id: 'so-s2-6-19',
        type: 'multiple-choice',
        question: '"Caqoon" in Somali refers to:',
        questionFr: '"Caqoon" en Somali fait référence à:',
        correctAnswer: 'Being smart/wise',
        options: ['Being smart/wise', 'Being beautiful', 'Being happy', 'Being kind']
      },
      {
        id: 'so-s2-6-20',
        type: 'type-answer',
        question: 'Type "You are very smart" in Somali',
        questionFr: 'Tapez "Vous êtes très intelligent" en Somali',
        correctAnswer: 'Aad ayaad u caqoon tahay'
      }
    ]
  },
  // Stage 2, Lesson 7: Review — Polite & Formal Speech
  {
    id: 'so-s2-7',
    stageId: 'somali-stage-2',
    lessonNumber: 7,
    type: 'vocabulary',
    title: 'Stage 2 Review',
    titleFr: 'Révision Étape 2',
    xpReward: 20,
    exercises: [
      {
        id: 'so-s2-7-1',
        type: 'multiple-choice',
        question: 'What is "Please" in Somali?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Somali?',
        correctAnswer: 'Fadlan',
        options: ['Fadlan', 'Mahadsanid', 'Raali ka ahow', 'Haa']
      },
      {
        id: 'so-s2-7-2',
        type: 'multiple-choice',
        question: 'What does "Raali ka ahow" mean?',
        questionFr: 'Que signifie "Raali ka ahow"?',
        correctAnswer: 'Sorry / Forgive me',
        options: ['Sorry / Forgive me', 'Thank you', 'Welcome', 'Sit down']
      },
      {
        id: 'so-s2-7-3',
        type: 'type-answer',
        question: 'Type "You\'re welcome" in Somali',
        questionFr: 'Tapez "De rien" en Somali',
        correctAnswer: 'Adiga ayaa mudan'
      },
      {
        id: 'so-s2-7-4',
        type: 'multiple-choice',
        question: '"Fariiso" means:',
        questionFr: '"Fariiso" signifie:',
        correctAnswer: 'Sit down',
        options: ['Sit down', 'Come in', 'Please eat', 'Welcome']
      },
      {
        id: 'so-s2-7-5',
        type: 'fill-blank',
        question: 'Complete: "Waxaan ___" (I want)',
        questionFr: 'Complétez: "Waxaan ___" (Je veux)',
        correctAnswer: 'rabaa',
        hint: 'The verb for "want"',
        hintFr: 'Le verbe pour "vouloir"'
      },
      {
        id: 'so-s2-7-6',
        type: 'multiple-choice',
        question: 'How do you say "Of course" in Somali?',
        questionFr: 'Comment dit-on "Bien sûr" en Somali?',
        correctAnswer: 'Hubaal',
        options: ['Hubaal', 'Haa', 'Sax', 'Laga yaabo']
      },
      {
        id: 'so-s2-7-7',
        type: 'type-answer',
        question: 'Type "I need" in Somali',
        questionFr: 'Tapez "J\'ai besoin" en Somali',
        correctAnswer: 'Waxaan u baahnahay'
      },
      {
        id: 'so-s2-7-8',
        type: 'multiple-choice',
        question: '"Adaa cafis leh" is used to say:',
        questionFr: '"Adaa cafis leh" est utilisé pour dire:',
        correctAnswer: 'You are forgiven',
        options: ['You are forgiven', 'Please help me', 'I agree', 'Come in']
      },
      {
        id: 'so-s2-7-9',
        type: 'fill-blank',
        question: 'Complete: "Aad ayaad u ___ tahay" (You are very smart)',
        questionFr: 'Complétez: "Aad ayaad u ___ tahay" (Vous êtes très intelligent)',
        correctAnswer: 'caqoon',
        hint: 'The word for "smart"',
        hintFr: 'Le mot pour "intelligent"'
      },
      {
        id: 'so-s2-7-10',
        type: 'multiple-choice',
        question: 'Which phrase means "Please help me"?',
        questionFr: 'Quelle phrase signifie "Aidez-moi s\'il vous plaît"?',
        correctAnswer: 'Fadlan iiga caawiyo',
        options: ['Fadlan iiga caawiyo', 'Ma awoodaa?', 'Waxaan raadinayaa', 'Soo gal']
      },
      {
        id: 'so-s2-7-11',
        type: 'type-answer',
        question: 'Type "Maybe" in Somali',
        questionFr: 'Tapez "Peut-être" en Somali',
        correctAnswer: 'Laga yaabo'
      },
      {
        id: 'so-s2-7-12',
        type: 'multiple-choice',
        question: '"Gurigayagu waa gurigaaga" expresses:',
        questionFr: '"Gurigayagu waa gurigaaga" exprime:',
        correctAnswer: 'Somali hospitality',
        options: ['Somali hospitality', 'An apology', 'A request', 'A compliment on appearance']
      },
      {
        id: 'so-s2-7-13',
        type: 'fill-blank',
        question: 'Complete: "Soo ___" (Come in)',
        questionFr: 'Complétez: "Soo ___" (Entrez)',
        correctAnswer: 'gal',
        hint: 'The verb for "enter"',
        hintFr: 'Le verbe pour "entrer"'
      },
      {
        id: 'so-s2-7-14',
        type: 'type-answer',
        question: 'Type "Well done" in Somali',
        questionFr: 'Tapez "Bien fait" en Somali',
        correctAnswer: 'Si fiican ayaad u samaaysay'
      },
      {
        id: 'so-s2-7-15',
        type: 'multiple-choice',
        question: '"Waan ku raacaanaa" means:',
        questionFr: '"Waan ku raacaanaa" signifie:',
        correctAnswer: 'I agree',
        options: ['I agree', 'I disagree', 'Of course', 'Maybe']
      },
      {
        id: 'so-s2-7-16',
        type: 'multiple-choice',
        question: 'To say "Thank you very much" in Somali you say:',
        questionFr: 'Pour dire "Merci beaucoup" en Somali on dit:',
        correctAnswer: 'Aad ayaad u mahadsan tahay',
        options: ['Aad ayaad u mahadsan tahay', 'Mahadsanid', 'Fadlan', 'Waa fiican tahay']
      },
      {
        id: 'so-s2-7-17',
        type: 'fill-blank',
        question: 'Complete: "Waa qurux ___ tahay" (You are beautiful)',
        questionFr: 'Complétez: "Waa qurux ___ tahay" (Tu es beau/belle)',
        correctAnswer: 'badan',
        hint: 'Means "much/many" — here intensifying "beautiful"',
        hintFr: 'Signifie "beaucoup/très" — ici intensifiant "beau"'
      },
      {
        id: 'so-s2-7-18',
        type: 'type-answer',
        question: 'Type "I disagree" in Somali',
        questionFr: 'Tapez "Je ne suis pas d\'accord" en Somali',
        correctAnswer: 'Kaama raacin'
      },
      {
        id: 'so-s2-7-19',
        type: 'multiple-choice',
        question: '"Cunto cunso" is said by a Somali host to:',
        questionFr: '"Cunto cunso" est dit par un hôte Somali pour:',
        correctAnswer: 'Invite guests to eat',
        options: ['Invite guests to eat', 'Ask guests to leave', 'Greet guests at the door', 'Apologize to guests']
      },
      {
        id: 'so-s2-7-20',
        type: 'type-answer',
        question: 'Type "I am very happy" in Somali',
        questionFr: 'Tapez "Je suis très heureux" en Somali',
        correctAnswer: 'Aad baan ugu faraxsanahay'
      }
    ]
  }
];
