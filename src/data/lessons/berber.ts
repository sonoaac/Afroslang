import { Lesson } from '../../types';

export const berberLessons: Lesson[] = [
  // Stage 1, Mission 1: Greetings
  {
    id: 'ber-vocab-1-1',
    stageId: 'berber-stage-1',
    lessonNumber: 1,
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    xpReward: 10,
    exercises: [
      {
        id: 'ber-v1-1-1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Berber?',
        questionFr: 'Comment dit-on "Bonjour" en Berbère?',
        correctAnswer: 'Azul',
        correctAnswerFr: 'Azul',
        options: ['Azul', 'Ar tufat', 'Tanemmirt', 'Ssusm iyi']
      },
      {
        id: 'ber-v1-1-2',
        type: 'multiple-choice',
        question: 'What does "Azul" mean?',
        questionFr: 'Que signifie "Azul"?',
        correctAnswer: 'Hello',
        correctAnswerFr: 'Bonjour',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        optionsFr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît']
      },
      {
        id: 'ber-v1-1-3',
        type: 'type-answer',
        question: 'Type the Berber word for "Goodbye"',
        questionFr: 'Tapez le mot Berbère pour "Au revoir"',
        correctAnswer: 'Ar tufat',
        correctAnswerFr: 'Ar tufat'
      },
      {
        id: 'ber-v1-1-4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Berber?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Berbère?',
        correctAnswer: 'Azul fell-awen',
        correctAnswerFr: 'Azul fell-awen',
        options: ['Azul fell-awen', 'Azul', 'Ar tufat', 'Tanemmirt']
      },
      {
        id: 'ber-v1-1-5',
        type: 'multiple-choice',
        question: '"Amek tella?" means:',
        questionFr: '"Amek tella?" signifie:',
        correctAnswer: 'How are you?',
        correctAnswerFr: 'Comment allez-vous?',
        options: ['Hello', 'How are you?', 'Thank you', 'Goodbye'],
        optionsFr: ['Bonjour', 'Comment allez-vous?', 'Merci', 'Au revoir']
      },
      {
        id: 'ber-v1-1-6',
        type: 'type-answer',
        question: 'Type "Thank you" in Berber',
        questionFr: 'Tapez "Merci" en Berbère',
        correctAnswer: 'Tanemmirt',
        correctAnswerFr: 'Tanemmirt'
      },
      {
        id: 'ber-v1-1-7',
        type: 'multiple-choice',
        question: 'What is "Please" in Berber?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Berbère?',
        correctAnswer: 'Ssusm iyi',
        correctAnswerFr: 'Ssusm iyi',
        options: ['Ssusm iyi', 'Tanemmirt', 'Ar tufat', 'Azul']
      },
      {
        id: 'ber-v1-1-8',
        type: 'multiple-choice',
        question: 'How do you respond to "Amek tella?"?',
        questionFr: 'Comment répondez-vous à "Amek tella?"?',
        correctAnswer: 'La bas',
        correctAnswerFr: 'La bas',
        options: ['La bas', 'Azul', 'Ar tufat', 'Tanemmirt']
      },
      {
        id: 'ber-v1-1-9',
        type: 'type-answer',
        question: 'Type "Excuse me" in Berber',
        questionFr: 'Tapez "Excusez-moi" en Berbère',
        correctAnswer: 'Smhith iyi',
        correctAnswerFr: 'Smhith iyi'
      },
      {
        id: 'ber-v1-1-10',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Berber?',
        questionFr: 'Comment dit-on "Désolé" en Berbère?',
        correctAnswer: 'Smhith iyi',
        correctAnswerFr: 'Smhith iyi',
        options: ['Smhith iyi', 'Tanemmirt', 'Ssusm iyi', 'Ar tufat']
      },
      {
        id: 'ber-v1-1-11',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Berber?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Berbère?',
        correctAnswer: 'Tanemmirt',
        correctAnswerFr: 'Tanemmirt',
        options: ['Tanemmirt', 'Amek tella?', 'Azul', 'Ar tufat']
      },
      {
        id: 'ber-v1-1-12',
        type: 'type-answer',
        question: 'Type "See you later" in Berber',
        questionFr: 'Tapez "À bientôt" en Berbère',
        correctAnswer: 'Ar tufat',
        correctAnswerFr: 'Ar tufat'
      },
      {
        id: 'ber-v1-1-13',
        type: 'multiple-choice',
        question: 'What is "You\'re welcome" in Berber?',
        questionFr: 'Comment dit-on "De rien" en Berbère?',
        correctAnswer: 'Tanemmirt',
        correctAnswerFr: 'Tanemmirt',
        options: ['Tanemmirt', 'Ssusm iyi', 'Smhith iyi', 'Azul']
      },
      {
        id: 'ber-v1-1-14',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Berber?',
        questionFr: 'Comment dit-on "Bonsoir" en Berbère?',
        correctAnswer: 'Azul fell-awen',
        correctAnswerFr: 'Azul fell-awen',
        options: ['Azul fell-awen', 'Azul', 'Ar tufat', 'Tanemmirt']
      },
      {
        id: 'ber-v1-1-15',
        type: 'type-answer',
        question: 'Type "Good night" in Berber',
        questionFr: 'Tapez "Bonne nuit" en Berbère',
        correctAnswer: 'Ar tufat',
        correctAnswerFr: 'Ar tufat'
      },
      {
        id: 'ber-v1-1-16',
        type: 'multiple-choice',
        question: 'What is "Yes" in Berber?',
        questionFr: 'Comment dit-on "Oui" en Berbère?',
        correctAnswer: 'Ih',
        correctAnswerFr: 'Ih',
        options: ['Ih', 'Uhu', 'Tanemmirt', 'Azul']
      },
      {
        id: 'ber-v1-1-17',
        type: 'multiple-choice',
        question: 'How do you say "No" in Berber?',
        questionFr: 'Comment dit-on "Non" en Berbère?',
        correctAnswer: 'Uhu',
        correctAnswerFr: 'Uhu',
        options: ['Uhu', 'Ih', 'Ar tufat', 'Ssusm iyi']
      },
      {
        id: 'ber-v1-1-18',
        type: 'type-answer',
        question: 'Type "Maybe" in Berber',
        questionFr: 'Tapez "Peut-être" en Berbère',
        correctAnswer: 'Yella',
        correctAnswerFr: 'Yella'
      },
      {
        id: 'ber-v1-1-19',
        type: 'multiple-choice',
        question: 'What is "I don\'t understand" in Berber?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Berbère?',
        correctAnswer: 'Ur fehhem ara',
        correctAnswerFr: 'Ur fehhem ara',
        options: ['Ur fehhem ara', 'Tanemmirt', 'Ar tufat', 'Smhith iyi']
      },
      {
        id: 'ber-v1-1-20',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t know" in Berber?',
        questionFr: 'Comment dit-on "Je ne sais pas" en Berbère?',
        correctAnswer: 'Ur ssine ara',
        correctAnswerFr: 'Ur ssine ara',
        options: ['Ur ssine ara', 'Tanemmirt', 'Ar tufat', 'Smhith iyi']
      }
    ]
  },
  // Stage 1, Mission 2: Common Phrases
  {
    id: 'ber-vocab-1-2',
    stageId: 'berber-stage-1',
    lessonNumber: 2,
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    xpReward: 10,
    exercises: [
      {
        id: 'ber-v1-2-1',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Berber?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Berbère?',
        correctAnswer: 'Amek ism-ik?',
        correctAnswerFr: 'Amek ism-ik?',
        options: ['Amek ism-ik?', 'Tanemmirt ism-ik?', 'Ar tufat ism-ik?', 'Ssusm iyi ism-ik?']
      },
      {
        id: 'ber-v1-2-2',
        type: 'type-answer',
        question: 'Type "My name is..." in Berber',
        questionFr: 'Tapez "Je m\'appelle..." en Berbère',
        correctAnswer: 'Ism-iw...',
        correctAnswerFr: 'Ism-iw...'
      },
      {
        id: 'ber-v1-2-3',
        type: 'multiple-choice',
        question: 'What is "Where are you from?" in Berber?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Berbère?',
        correctAnswer: 'Anwa tamurt i d-tekkid?',
        correctAnswerFr: 'Anwa tamurt i d-tekkid?',
        options: ['Anwa tamurt i d-tekkid?', 'Tanemmirt tamurt?', 'Ar tufat tamurt?', 'Ssusm iyi tamurt?']
      },
      {
        id: 'ber-v1-2-4',
        type: 'type-answer',
        question: 'Type "I am from..." in Berber',
        questionFr: 'Tapez "Je viens de..." en Berbère',
        correctAnswer: 'Nekk d-usi...',
        correctAnswerFr: 'Nekk d-usi...'
      },
      {
        id: 'ber-v1-2-5',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Berber?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Berbère?',
        correctAnswer: 'Acḥal iseggasen i tesɛed?',
        correctAnswerFr: 'Acḥal iseggasen i tesɛed?',
        options: ['Acḥal iseggasen i tesɛed?', 'Tanemmirt iseggasen?', 'Ar tufat iseggasen?', 'Ssusm iyi iseggasen?']
      },
      {
        id: 'ber-v1-2-6',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Berber',
        questionFr: 'Tapez "J\'ai ... ans" en Berbère',
        correctAnswer: 'Nekk ɣur-i ... iseggasen',
        correctAnswerFr: 'Nekk ɣur-i ... iseggasen'
      },
      {
        id: 'ber-v1-2-7',
        type: 'multiple-choice',
        question: 'What is "Where do you live?" in Berber?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Berbère?',
        correctAnswer: 'Anwa tamurt i tezzed?',
        correctAnswerFr: 'Anwa tamurt i tezzed?',
        options: ['Anwa tamurt i tezzed?', 'Tanemmirt tamurt?', 'Ar tufat tamurt?', 'Ssusm iyi tamurt?']
      },
      {
        id: 'ber-v1-2-8',
        type: 'type-answer',
        question: 'Type "I live in..." in Berber',
        questionFr: 'Tapez "J\'habite à..." en Berbère',
        correctAnswer: 'Nekk zzedɣ...',
        correctAnswerFr: 'Nekk zzedɣ...'
      },
      {
        id: 'ber-v1-2-9',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Berber?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Berbère?',
        correctAnswer: 'D acu i tettxedmeḍ?',
        correctAnswerFr: 'D acu i tettxedmeḍ?',
        options: ['D acu i tettxedmeḍ?', 'Tanemmirt tettxedmeḍ?', 'Ar tufat tettxedmeḍ?', 'Ssusm iyi tettxedmeḍ?']
      },
      {
        id: 'ber-v1-2-10',
        type: 'type-answer',
        question: 'Type "I am a student" in Berber',
        questionFr: 'Tapez "Je suis étudiant" en Berbère',
        correctAnswer: 'Nekk d-almud',
        correctAnswerFr: 'Nekk d-almud'
      },
      {
        id: 'ber-v1-2-11',
        type: 'multiple-choice',
        question: 'What is "I am learning Berber" in Berber?',
        questionFr: 'Comment dit-on "J\'apprends le Berbère" en Berbère?',
        correctAnswer: 'Nekk la tt-ɣerrem Tamaziɣt',
        correctAnswerFr: 'Nekk la tt-ɣerrem Tamaziɣt',
        options: ['Nekk la tt-ɣerrem Tamaziɣt', 'Tanemmirt Tamaziɣt', 'Ar tufat Tamaziɣt', 'Ssusm iyi Tamaziɣt']
      },
      {
        id: 'ber-v1-2-12',
        type: 'type-answer',
        question: 'Type "I speak a little Berber" in Berber',
        questionFr: 'Tapez "Je parle un peu Berbère" en Berbère',
        correctAnswer: 'Nekk ssawaleɣ Tamaziɣt meẓẓiyen',
        correctAnswerFr: 'Nekk ssawaleɣ Tamaziɣt meẓẓiyen'
      },
      {
        id: 'ber-v1-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t speak Berber well" in Berber?',
        questionFr: 'Comment dit-on "Je ne parle pas bien Berbère" en Berbère?',
        correctAnswer: 'Ur ssawaleɣ ara Tamaziɣt ilhan',
        correctAnswerFr: 'Ur ssawaleɣ ara Tamaziɣt ilhan',
        options: ['Ur ssawaleɣ ara Tamaziɣt ilhan', 'Tanemmirt Tamaziɣt', 'Ar tufat Tamaziɣt', 'Ssusm iyi Tamaziɣt']
      },
      {
        id: 'ber-v1-2-14',
        type: 'type-answer',
        question: 'Type "Can you help me?" in Berber',
        questionFr: 'Tapez "Pouvez-vous m\'aider?" en Berbère',
        correctAnswer: 'Tzemreḍ ad iyi tɛawneḍ?',
        correctAnswerFr: 'Tzemreḍ ad iyi tɛawneḍ?'
      },
      {
        id: 'ber-v1-2-15',
        type: 'multiple-choice',
        question: 'What is "Of course" in Berber?',
        questionFr: 'Comment dit-on "Bien sûr" en Berbère?',
        correctAnswer: 'Ih',
        correctAnswerFr: 'Ih',
        options: ['Ih', 'Uhu', 'Tanemmirt', 'Ssusm iyi']
      },
      {
        id: 'ber-v1-2-16',
        type: 'multiple-choice',
        question: 'How do you say "I need help" in Berber?',
        questionFr: 'Comment dit-on "J\'ai besoin d\'aide" en Berbère?',
        correctAnswer: 'Nekk ḥesbeɣ tɛawent',
        correctAnswerFr: 'Nekk ḥesbeɣ tɛawent',
        options: ['Nekk ḥesbeɣ tɛawent', 'Tanemmirt tɛawent', 'Ar tufat tɛawent', 'Ssusm iyi tɛawent']
      },
      {
        id: 'ber-v1-2-17',
        type: 'type-answer',
        question: 'Type "Can you repeat that?" in Berber',
        questionFr: 'Tapez "Pouvez-vous répéter?" en Berbère',
        correctAnswer: 'Tzemreḍ ad t-id-tesnulfuḍ?',
        correctAnswerFr: 'Tzemreḍ ad t-id-tesnulfuḍ?'
      },
      {
        id: 'ber-v1-2-18',
        type: 'multiple-choice',
        question: 'What is "Speak slowly" in Berber?',
        questionFr: 'Comment dit-on "Parlez lentement" en Berbère?',
        correctAnswer: 'Sawel s-tawwurt',
        correctAnswerFr: 'Sawel s-tawwurt',
        options: ['Sawel s-tawwurt', 'Sawel tanemmirt', 'Sawel ar tufat', 'Sawel ssusm iyi']
      },
      {
        id: 'ber-v1-2-19',
        type: 'type-answer',
        question: 'Type "I understand" in Berber',
        questionFr: 'Tapez "Je comprends" en Berbère',
        correctAnswer: 'Fehhem',
        correctAnswerFr: 'Fehhem'
      },
      {
        id: 'ber-v1-2-20',
        type: 'multiple-choice',
        question: 'How do you say "That\'s correct" in Berber?',
        questionFr: 'Comment dit-on "C\'est correct" en Berbère?',
        correctAnswer: 'Ih',
        correctAnswerFr: 'Ih',
        options: ['Ih', 'Uhu', 'Tanemmirt', 'Ssusm iyi']
      }
    ]
  },
  // Stage 1, Mission 3: Basic Words
  {
    id: 'ber-vocab-1-3',
    stageId: 'berber-stage-1',
    lessonNumber: 3,
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    xpReward: 10,
    exercises: [
      {
        id: 'ber-v1-3-1',
        type: 'multiple-choice',
        question: 'What is "water" in Berber?',
        questionFr: 'Comment dit-on "eau" en Berbère?',
        correctAnswer: 'Aman',
        correctAnswerFr: 'Aman',
        options: ['Aman', 'Tiremt', 'Taddart', 'Tasdawit']
      },
      {
        id: 'ber-v1-3-2',
        type: 'multiple-choice',
        question: 'What is "food" in Berber?',
        questionFr: 'Comment dit-on "nourriture" en Berbère?',
        correctAnswer: 'Tiremt',
        correctAnswerFr: 'Tiremt',
        options: ['Tiremt', 'Aman', 'Taddart', 'Tasdawit']
      },
      {
        id: 'ber-v1-3-3',
        type: 'type-answer',
        question: 'Type "house" in Berber',
        questionFr: 'Tapez "maison" en Berbère',
        correctAnswer: 'Taddart',
        correctAnswerFr: 'Taddart'
      },
      {
        id: 'ber-v1-3-4',
        type: 'multiple-choice',
        question: 'What is "book" in Berber?',
        questionFr: 'Comment dit-on "livre" en Berbère?',
        correctAnswer: 'Tasdawit',
        correctAnswerFr: 'Tasdawit',
        options: ['Tasdawit', 'Aman', 'Taddart', 'Tiremt']
      },
      {
        id: 'ber-v1-3-5',
        type: 'multiple-choice',
        question: 'What is "pen" in Berber?',
        questionFr: 'Comment dit-on "stylo" en Berbère?',
        correctAnswer: 'Aqlem',
        correctAnswerFr: 'Aqlem',
        options: ['Aqlem', 'Tasdawit', 'Taddart', 'Tiremt']
      },
      {
        id: 'ber-v1-3-6',
        type: 'type-answer',
        question: 'Type "car" in Berber',
        questionFr: 'Tapez "voiture" en Berbère',
        correctAnswer: 'Tumubil',
        correctAnswerFr: 'Tumubil'
      },
      {
        id: 'ber-v1-3-7',
        type: 'multiple-choice',
        question: 'What is "money" in Berber?',
        questionFr: 'Comment dit-on "argent" en Berbère?',
        correctAnswer: 'Aflus',
        correctAnswerFr: 'Aflus',
        options: ['Aflus', 'Tumubil', 'Taddart', 'Aman']
      },
      {
        id: 'ber-v1-3-8',
        type: 'multiple-choice',
        question: 'What is "time" in Berber?',
        questionFr: 'Comment dit-on "temps" en Berbère?',
        correctAnswer: 'Amkan',
        correctAnswerFr: 'Amkan',
        options: ['Amkan', 'Aflus', 'Tumubil', 'Taddart']
      },
      {
        id: 'ber-v1-3-9',
        type: 'type-answer',
        question: 'Type "day" in Berber',
        questionFr: 'Tapez "jour" en Berbère',
        correctAnswer: 'Ass',
        correctAnswerFr: 'Ass'
      },
      {
        id: 'ber-v1-3-10',
        type: 'multiple-choice',
        question: 'What is "night" in Berber?',
        questionFr: 'Comment dit-on "nuit" en Berbère?',
        correctAnswer: 'Id',
        correctAnswerFr: 'Id',
        options: ['Id', 'Ass', 'Amkan', 'Aflus']
      },
      {
        id: 'ber-v1-3-11',
        type: 'multiple-choice',
        question: 'What is "family" in Berber?',
        questionFr: 'Comment dit-on "famille" en Berbère?',
        correctAnswer: 'Tawacult',
        correctAnswerFr: 'Tawacult',
        options: ['Tawacult', 'Id', 'Ass', 'Amkan']
      },
      {
        id: 'ber-v1-3-12',
        type: 'type-answer',
        question: 'Type "mother" in Berber',
        questionFr: 'Tapez "mère" en Berbère',
        correctAnswer: 'Yemma',
        correctAnswerFr: 'Yemma'
      },
      {
        id: 'ber-v1-3-13',
        type: 'multiple-choice',
        question: 'What is "father" in Berber?',
        questionFr: 'Comment dit-on "père" en Berbère?',
        correctAnswer: 'Baba',
        correctAnswerFr: 'Baba',
        options: ['Baba', 'Yemma', 'Tawacult', 'Id']
      },
      {
        id: 'ber-v1-3-14',
        type: 'multiple-choice',
        question: 'What is "brother" in Berber?',
        questionFr: 'Comment dit-on "frère" en Berbère?',
        correctAnswer: 'Gma',
        correctAnswerFr: 'Gma',
        options: ['Gma', 'Baba', 'Yemma', 'Tawacult']
      },
      {
        id: 'ber-v1-3-15',
        type: 'type-answer',
        question: 'Type "sister" in Berber',
        questionFr: 'Tapez "sœur" en Berbère',
        correctAnswer: 'Ultma',
        correctAnswerFr: 'Ultma'
      },
      {
        id: 'ber-v1-3-16',
        type: 'multiple-choice',
        question: 'What is "friend" in Berber?',
        questionFr: 'Comment dit-on "ami" en Berbère?',
        correctAnswer: 'Amdakul',
        correctAnswerFr: 'Amdakul',
        options: ['Amdakul', 'Ultma', 'Gma', 'Baba']
      },
      {
        id: 'ber-v1-3-17',
        type: 'multiple-choice',
        question: 'What is "school" in Berber?',
        questionFr: 'Comment dit-on "école" en Berbère?',
        correctAnswer: 'Tasdawit',
        correctAnswerFr: 'Tasdawit',
        options: ['Tasdawit', 'Amdakul', 'Ultma', 'Gma']
      },
      {
        id: 'ber-v1-3-18',
        type: 'type-answer',
        question: 'Type "teacher" in Berber',
        questionFr: 'Tapez "enseignant" en Berbère',
        correctAnswer: 'Amessus',
        correctAnswerFr: 'Amessus'
      },
      {
        id: 'ber-v1-3-19',
        type: 'multiple-choice',
        question: 'What is "student" in Berber?',
        questionFr: 'Comment dit-on "étudiant" en Berbère?',
        correctAnswer: 'Almud',
        correctAnswerFr: 'Almud',
        options: ['Almud', 'Amessus', 'Tasdawit', 'Amdakul']
      },
      {
        id: 'ber-v1-3-20',
        type: 'multiple-choice',
        question: 'What is "work" in Berber?',
        questionFr: 'Comment dit-on "travail" en Berbère?',
        correctAnswer: 'Axeddim',
        correctAnswerFr: 'Axeddim',
        options: ['Axeddim', 'Almud', 'Amessus', 'Tasdawit']
      }
    ]
  },
  // Stage 1, Mission 4: Essential Vocabulary
  {
    id: 'ber-vocab-1-4',
    stageId: 'berber-stage-1',
    lessonNumber: 4,
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    xpReward: 10,
    exercises: [
      {
        id: 'ber-v1-4-1',
        type: 'multiple-choice',
        question: 'What is "big" in Berber?',
        questionFr: 'Comment dit-on "grand" en Berbère?',
        correctAnswer: 'Meggur',
        correctAnswerFr: 'Meggur',
        options: ['Meggur', 'Meẓẓiyen', 'Amaynut', 'Aqdim']
      },
      {
        id: 'ber-v1-4-2',
        type: 'multiple-choice',
        question: 'What is "small" in Berber?',
        questionFr: 'Comment dit-on "petit" en Berbère?',
        correctAnswer: 'Meẓẓiyen',
        correctAnswerFr: 'Meẓẓiyen',
        options: ['Meẓẓiyen', 'Meggur', 'Amaynut', 'Aqdim']
      },
      {
        id: 'ber-v1-4-3',
        type: 'type-answer',
        question: 'Type "good" in Berber',
        questionFr: 'Tapez "bon" en Berbère',
        correctAnswer: 'Ilhan',
        correctAnswerFr: 'Ilhan'
      },
      {
        id: 'ber-v1-4-4',
        type: 'multiple-choice',
        question: 'What is "bad" in Berber?',
        questionFr: 'Comment dit-on "mauvais" en Berbère?',
        correctAnswer: 'Icenn',
        correctAnswerFr: 'Icenn',
        options: ['Icenn', 'Ilhan', 'Meẓẓiyen', 'Meggur']
      },
      {
        id: 'ber-v1-4-5',
        type: 'multiple-choice',
        question: 'What is "new" in Berber?',
        questionFr: 'Comment dit-on "nouveau" en Berbère?',
        correctAnswer: 'Amaynut',
        correctAnswerFr: 'Amaynut',
        options: ['Amaynut', 'Aqdim', 'Icenn', 'Ilhan']
      },
      {
        id: 'ber-v1-4-6',
        type: 'type-answer',
        question: 'Type "old" in Berber',
        questionFr: 'Tapez "vieux" en Berbère',
        correctAnswer: 'Aqdim',
        correctAnswerFr: 'Aqdim'
      },
      {
        id: 'ber-v1-4-7',
        type: 'multiple-choice',
        question: 'What is "hot" in Berber?',
        questionFr: 'Comment dit-on "chaud" en Berbère?',
        correctAnswer: 'Aḥmam',
        correctAnswerFr: 'Aḥmam',
        options: ['Aḥmam', 'Aseklu', 'Amaynut', 'Aqdim']
      },
      {
        id: 'ber-v1-4-8',
        type: 'multiple-choice',
        question: 'What is "cold" in Berber?',
        questionFr: 'Comment dit-on "froid" en Berbère?',
        correctAnswer: 'Aseklu',
        correctAnswerFr: 'Aseklu',
        options: ['Aseklu', 'Aḥmam', 'Amaynut', 'Aqdim']
      },
      {
        id: 'ber-v1-4-9',
        type: 'type-answer',
        question: 'Type "fast" in Berber',
        questionFr: 'Tapez "rapide" en Berbère',
        correctAnswer: 'Azzal',
        correctAnswerFr: 'Azzal'
      },
      {
        id: 'ber-v1-4-10',
        type: 'multiple-choice',
        question: 'What is "slow" in Berber?',
        questionFr: 'Comment dit-on "lent" en Berbère?',
        correctAnswer: 'Aẓẓal',
        correctAnswerFr: 'Aẓẓal',
        options: ['Aẓẓal', 'Azzal', 'Aseklu', 'Aḥmam']
      },
      {
        id: 'ber-v1-4-11',
        type: 'multiple-choice',
        question: 'What is "beautiful" in Berber?',
        questionFr: 'Comment dit-on "beau" en Berbère?',
        correctAnswer: 'Amellal',
        correctAnswerFr: 'Amellal',
        options: ['Amellal', 'Aẓẓal', 'Azzal', 'Aseklu']
      },
      {
        id: 'ber-v1-4-12',
        type: 'type-answer',
        question: 'Type "ugly" in Berber',
        questionFr: 'Tapez "laid" en Berbère',
        correctAnswer: 'Aḥerran',
        correctAnswerFr: 'Aḥerran'
      },
      {
        id: 'ber-v1-4-13',
        type: 'multiple-choice',
        question: 'What is "easy" in Berber?',
        questionFr: 'Comment dit-on "facile" en Berbère?',
        correctAnswer: 'Aḥes',
        correctAnswerFr: 'Aḥes',
        options: ['Aḥes', 'Aḥerran', 'Amellal', 'Aẓẓal']
      },
      {
        id: 'ber-v1-4-14',
        type: 'multiple-choice',
        question: 'What is "difficult" in Berber?',
        questionFr: 'Comment dit-on "difficile" en Berbère?',
        correctAnswer: 'Aḥerran',
        correctAnswerFr: 'Aḥerran',
        options: ['Aḥerran', 'Aḥes', 'Amellal', 'Aẓẓal']
      },
      {
        id: 'ber-v1-4-15',
        type: 'type-answer',
        question: 'Type "expensive" in Berber',
        questionFr: 'Tapez "cher" en Berbère',
        correctAnswer: 'Aɣezzaf',
        correctAnswerFr: 'Aɣezzaf'
      },
      {
        id: 'ber-v1-4-16',
        type: 'multiple-choice',
        question: 'What is "cheap" in Berber?',
        questionFr: 'Comment dit-on "bon marché" en Berbère?',
        correctAnswer: 'Arxis',
        correctAnswerFr: 'Arxis',
        options: ['Arxis', 'Aɣezzaf', 'Aḥerran', 'Aḥes']
      },
      {
        id: 'ber-v1-4-17',
        type: 'multiple-choice',
        question: 'What is "clean" in Berber?',
        questionFr: 'Comment dit-on "propre" en Berbère?',
        correctAnswer: 'Iṣafaḍen',
        correctAnswerFr: 'Iṣafaḍen',
        options: ['Iṣafaḍen', 'Arxis', 'Aɣezzaf', 'Aḥerran']
      },
      {
        id: 'ber-v1-4-18',
        type: 'type-answer',
        question: 'Type "dirty" in Berber',
        questionFr: 'Tapez "sale" en Berbère',
        correctAnswer: 'Aberkan',
        correctAnswerFr: 'Aberkan'
      },
      {
        id: 'ber-v1-4-19',
        type: 'multiple-choice',
        question: 'What is "full" in Berber?',
        questionFr: 'Comment dit-on "plein" en Berbère?',
        correctAnswer: 'Iččan',
        correctAnswerFr: 'Iččan',
        options: ['Iččan', 'Iferrahen', 'Amellal', 'Arxis']
      },
      {
        id: 'ber-v1-4-20',
        type: 'multiple-choice',
        question: 'What is "empty" in Berber?',
        questionFr: 'Comment dit-on "vide" en Berbère?',
        correctAnswer: 'Iferrahen',
        correctAnswerFr: 'Iferrahen',
        options: ['Iferrahen', 'Iččan', 'Amellal', 'Arxis']
      }
    ]
  },
  // Stage 1, Mission 5: Practice & Review
  {
    id: 'ber-vocab-1-5',
    stageId: 'berber-stage-1',
    lessonNumber: 5,
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    xpReward: 15,
    exercises: [
      {
        id: 'ber-v1-5-1',
        type: 'multiple-choice',
        question: 'What is "one" in Berber?',
        questionFr: 'Comment dit-on "un" en Berbère?',
        correctAnswer: 'Yan',
        correctAnswerFr: 'Yan',
        options: ['Yan', 'Sin', 'Kraḍ', 'Kkuẓ']
      },
      {
        id: 'ber-v1-5-2',
        type: 'multiple-choice',
        question: 'What is "two" in Berber?',
        questionFr: 'Comment dit-on "deux" en Berbère?',
        correctAnswer: 'Sin',
        correctAnswerFr: 'Sin',
        options: ['Sin', 'Yan', 'Kraḍ', 'Kkuẓ']
      },
      {
        id: 'ber-v1-5-3',
        type: 'type-answer',
        question: 'Type "three" in Berber',
        questionFr: 'Tapez "trois" en Berbère',
        correctAnswer: 'Kraḍ',
        correctAnswerFr: 'Kraḍ'
      },
      {
        id: 'ber-v1-5-4',
        type: 'multiple-choice',
        question: 'What is "four" in Berber?',
        questionFr: 'Comment dit-on "quatre" en Berbère?',
        correctAnswer: 'Kkuẓ',
        correctAnswerFr: 'Kkuẓ',
        options: ['Kkuẓ', 'Kraḍ', 'Sin', 'Yan']
      },
      {
        id: 'ber-v1-5-5',
        type: 'multiple-choice',
        question: 'What is "five" in Berber?',
        questionFr: 'Comment dit-on "cinq" en Berbère?',
        correctAnswer: 'Smmus',
        correctAnswerFr: 'Smmus',
        options: ['Smmus', 'Kkuẓ', 'Kraḍ', 'Sin']
      },
      {
        id: 'ber-v1-5-6',
        type: 'type-answer',
        question: 'Type "six" in Berber',
        questionFr: 'Tapez "six" en Berbère',
        correctAnswer: 'Sḍis',
        correctAnswerFr: 'Sḍis'
      },
      {
        id: 'ber-v1-5-7',
        type: 'multiple-choice',
        question: 'What is "seven" in Berber?',
        questionFr: 'Comment dit-on "sept" en Berbère?',
        correctAnswer: 'Sa',
        correctAnswerFr: 'Sa',
        options: ['Sa', 'Sḍis', 'Smmus', 'Kkuẓ']
      },
      {
        id: 'ber-v1-5-8',
        type: 'multiple-choice',
        question: 'What is "eight" in Berber?',
        questionFr: 'Comment dit-on "huit" en Berbère?',
        correctAnswer: 'Tam',
        correctAnswerFr: 'Tam',
        options: ['Tam', 'Sa', 'Sḍis', 'Smmus']
      },
      {
        id: 'ber-v1-5-9',
        type: 'type-answer',
        question: 'Type "nine" in Berber',
        questionFr: 'Tapez "neuf" en Berbère',
        correctAnswer: 'Tẓa',
        correctAnswerFr: 'Tẓa'
      },
      {
        id: 'ber-v1-5-10',
        type: 'multiple-choice',
        question: 'What is "ten" in Berber?',
        questionFr: 'Comment dit-on "dix" en Berbère?',
        correctAnswer: 'Mraw',
        correctAnswerFr: 'Mraw',
        options: ['Mraw', 'Tẓa', 'Tam', 'Sa']
      },
      {
        id: 'ber-v1-5-11',
        type: 'multiple-choice',
        question: 'What is "red" in Berber?',
        questionFr: 'Comment dit-on "rouge" en Berbère?',
        correctAnswer: 'Azeggaɣ',
        correctAnswerFr: 'Azeggaɣ',
        options: ['Azeggaɣ', 'Azegzaw', 'Amellal', 'Aberkan']
      },
      {
        id: 'ber-v1-5-12',
        type: 'type-answer',
        question: 'Type "blue" in Berber',
        questionFr: 'Tapez "bleu" en Berbère',
        correctAnswer: 'Azuggaɣ',
        correctAnswerFr: 'Azuggaɣ'
      },
      {
        id: 'ber-v1-5-13',
        type: 'multiple-choice',
        question: 'What is "green" in Berber?',
        questionFr: 'Comment dit-on "vert" en Berbère?',
        correctAnswer: 'Azegzaw',
        correctAnswerFr: 'Azegzaw',
        options: ['Azegzaw', 'Azeggaɣ', 'Amellal', 'Aberkan']
      },
      {
        id: 'ber-v1-5-14',
        type: 'multiple-choice',
        question: 'What is "white" in Berber?',
        questionFr: 'Comment dit-on "blanc" en Berbère?',
        correctAnswer: 'Amellal',
        correctAnswerFr: 'Amellal',
        options: ['Amellal', 'Azegzaw', 'Azeggaɣ', 'Aberkan']
      },
      {
        id: 'ber-v1-5-15',
        type: 'type-answer',
        question: 'Type "black" in Berber',
        questionFr: 'Tapez "noir" en Berbère',
        correctAnswer: 'Aberkan',
        correctAnswerFr: 'Aberkan'
      },
      {
        id: 'ber-v1-5-16',
        type: 'multiple-choice',
        question: 'What is "yellow" in Berber?',
        questionFr: 'Comment dit-on "jaune" en Berbère?',
        correctAnswer: 'Awraɣ',
        correctAnswerFr: 'Awraɣ',
        options: ['Awraɣ', 'Aberkan', 'Amellal', 'Azegzaw']
      },
      {
        id: 'ber-v1-5-17',
        type: 'multiple-choice',
        question: 'What is "orange" in Berber?',
        questionFr: 'Comment dit-on "orange" en Berbère?',
        correctAnswer: 'Awraɣ-azeggaɣ',
        correctAnswerFr: 'Awraɣ-azeggaɣ',
        options: ['Awraɣ-azeggaɣ', 'Awraɣ', 'Aberkan', 'Amellal']
      },
      {
        id: 'ber-v1-5-18',
        type: 'type-answer',
        question: 'Type "purple" in Berber',
        questionFr: 'Tapez "violet" en Berbère',
        correctAnswer: 'Anmiregan',
        correctAnswerFr: 'Anmiregan'
      },
      {
        id: 'ber-v1-5-19',
        type: 'multiple-choice',
        question: 'What is "brown" in Berber?',
        questionFr: 'Comment dit-on "marron" en Berbère?',
        correctAnswer: 'Aberkan-awraɣ',
        correctAnswerFr: 'Aberkan-awraɣ',
        options: ['Aberkan-awraɣ', 'Awraɣ', 'Amellal', 'Azegzaw']
      },
      {
        id: 'ber-v1-5-20',
        type: 'multiple-choice',
        question: 'What is "gray" in Berber?',
        questionFr: 'Comment dit-on "gris" en Berbère?',
        correctAnswer: 'Amellal-aberkan',
        correctAnswerFr: 'Amellal-aberkan',
        options: ['Amellal-aberkan', 'Awraɣ', 'Azegzaw', 'Azeggaɣ']
      }
    ]
  }
];
