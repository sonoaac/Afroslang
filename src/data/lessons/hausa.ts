import { Lesson } from '../../types';

type RawLesson = Omit<Lesson, 'stageId' | 'lessonNumber'> & { level?: number };

export const hausaLessons: RawLesson[] = [
  // STAGE 1 - MISSION 1: GREETINGS (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-1',
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'ha-v1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Hausa?',
        questionFr: 'Comment dit-on "Bonjour" en Hausa?',
        correctAnswer: 'Sannu',
        options: ['Sannu', 'Nagode', 'Sai anjima', 'Yauwa']
      },
      {
        id: 'ha-v2',
        type: 'multiple-choice',
        question: 'What does "Sannu" mean?',
        questionFr: 'Que signifie "Sannu"?',
        correctAnswer: 'Hello',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please']
      },
      {
        id: 'ha-v3',
        type: 'type-answer',
        question: 'Type the Hausa word for "Goodbye"',
        questionFr: 'Tapez le mot Hausa pour "Au revoir"',
        correctAnswer: 'Sai anjima'
      },
      {
        id: 'ha-v4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Hausa?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Hausa?',
        correctAnswer: 'Ina kwana',
        options: ['Ina kwana', 'Ina yini', 'Barka da rana', 'Sannu']
      },
      {
        id: 'ha-v5',
        type: 'multiple-choice',
        question: '"Ina kwana" means:',
        questionFr: '"Ina kwana" signifie:',
        correctAnswer: 'Good morning',
        options: ['Good morning', 'Good afternoon', 'Good evening', 'Hello']
      },
      {
        id: 'ha-v6',
        type: 'multiple-choice',
        question: 'How do you say "Good afternoon" in Hausa?',
        questionFr: 'Comment dit-on "Bon après-midi" en Hausa?',
        correctAnswer: 'Ina yini',
        options: ['Ina yini', 'Ina kwana', 'Barka da rana', 'Sannu']
      },
      {
        id: 'ha-v7',
        type: 'type-answer',
        question: 'Type "Good evening" in Hausa',
        questionFr: 'Tapez "Bonsoir" en Hausa',
        correctAnswer: 'Barka da rana'
      },
      {
        id: 'ha-v8',
        type: 'multiple-choice',
        question: 'What does "Yaya dai?" mean?',
        questionFr: 'Que signifie "Yaya dai?"?',
        correctAnswer: 'How are you?',
        options: ['How are you?', 'What is your name?', 'Where are you?', 'How old are you?']
      },
      {
        id: 'ha-v9',
        type: 'multiple-choice',
        question: 'How do you respond to "Yaya dai?"',
        questionFr: 'Comment répondre à "Yaya dai?"?',
        correctAnswer: 'Lafiya lau',
        options: ['Lafiya lau', 'Sunana...', 'Ina zaune', 'Ina shekara...']
      },
      {
        id: 'ha-v10',
        type: 'type-answer',
        question: 'Type "I am fine" in Hausa',
        questionFr: 'Tapez "Je vais bien" en Hausa',
        correctAnswer: 'Lafiya lau'
      },
      {
        id: 'ha-v11',
        type: 'multiple-choice',
        question: 'What is "Welcome" in Hausa?',
        questionFr: 'Comment dit-on "Bienvenue" en Hausa?',
        correctAnswer: 'Barka da zuwa',
        options: ['Barka da zuwa', 'Sannu', 'Nagode', 'Don Allah']
      },
      {
        id: 'ha-v12',
        type: 'multiple-choice',
        question: '"Barka da zuwa" means:',
        questionFr: '"Barka da zuwa" signifie:',
        correctAnswer: 'Welcome',
        options: ['Hello', 'Welcome', 'Thank you', 'Goodbye']
      },
      {
        id: 'ha-v13',
        type: 'type-answer',
        question: 'Type "See you later" in Hausa',
        questionFr: 'Tapez "À bientôt" en Hausa',
        correctAnswer: 'Sai anjima'
      },
      {
        id: 'ha-v14',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Hausa?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Hausa?',
        correctAnswer: 'Na ji dadin saduwa da ku',
        options: ['Na ji dadin saduwa da ku', 'Sannu', 'Sai anjima', 'Nagode']
      },
      {
        id: 'ha-v15',
        type: 'multiple-choice',
        question: 'What does "Na ji dadin saduwa da ku" mean?',
        questionFr: 'Que signifie "Na ji dadin saduwa da ku"?',
        correctAnswer: 'Nice to meet you',
        options: ['Nice to meet you', 'How are you?', 'What is your name?', 'Where are you from?']
      },
      {
        id: 'ha-v16',
        type: 'type-answer',
        question: 'Type "Excuse me" in Hausa',
        questionFr: 'Tapez "Excusez-moi" en Hausa',
        correctAnswer: 'Don Allah'
      },
      {
        id: 'ha-v17',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Hausa?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Hausa?',
        correctAnswer: 'Don Allah',
        options: ['Don Allah', 'Nagode', 'Sannu', 'Sai anjima']
      },
      {
        id: 'ha-v18',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Hausa?',
        questionFr: 'Comment dit-on "Désolé" en Hausa?',
        correctAnswer: 'Yi hakuri',
        options: ['Yi hakuri', 'Don Allah', 'Nagode', 'Sannu']
      },
      {
        id: 'ha-v19',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Hausa',
        questionFr: 'Tapez "Merci beaucoup" en Hausa',
        correctAnswer: 'Nagode sosai'
      },
      {
        id: 'ha-v20',
        type: 'multiple-choice',
        question: 'How do you say "You\'re welcome" in Hausa?',
        questionFr: 'Comment dit-on "De rien" en Hausa?',
        correctAnswer: 'Ba komai',
        options: ['Ba komai', 'Sannu', 'Sai anjima', 'Nagode']
      }
    ]
  },

  // STAGE 1 - MISSION 2: COMMON PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-2',
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'ha-v21',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Hausa?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Hausa?',
        correctAnswer: 'Menene sunanka?',
        options: ['Menene sunanka?', 'Yaya dai?', 'Ina zaune?', 'Ina shekara?']
      },
      {
        id: 'ha-v22',
        type: 'multiple-choice',
        question: 'What does "Menene sunanka?" mean?',
        questionFr: 'Que signifie "Menene sunanka?"?',
        correctAnswer: 'What is your name?',
        options: ['What is your name?', 'How are you?', 'Where do you live?', 'How old are you?']
      },
      {
        id: 'ha-v23',
        type: 'type-answer',
        question: 'Type "My name is..." in Hausa',
        questionFr: 'Tapez "Je m\'appelle..." en Hausa',
        correctAnswer: 'Sunana...'
      },
      {
        id: 'ha-v24',
        type: 'multiple-choice',
        question: 'How do you say "Where are you from?" in Hausa?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Hausa?',
        correctAnswer: 'Daga ina kake?',
        options: ['Daga ina kake?', 'Menene sunanka?', 'Yaya dai?', 'Ina zaune?']
      },
      {
        id: 'ha-v25',
        type: 'multiple-choice',
        question: '"Daga ina kake?" means:',
        questionFr: '"Daga ina kake?" signifie:',
        correctAnswer: 'Where are you from?',
        options: ['Where are you from?', 'Where do you live?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'ha-v26',
        type: 'type-answer',
        question: 'Type "I am from..." in Hausa',
        questionFr: 'Tapez "Je viens de..." en Hausa',
        correctAnswer: 'Daga...'
      },
      {
        id: 'ha-v27',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Hausa?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Hausa?',
        correctAnswer: 'Ina shekara?',
        options: ['Ina shekara?', 'Menene sunanka?', 'Yaya dai?', 'Daga ina kake?']
      },
      {
        id: 'ha-v28',
        type: 'multiple-choice',
        question: 'What does "Ina shekara?" mean?',
        questionFr: 'Que signifie "Ina shekara?"?',
        correctAnswer: 'How old are you?',
        options: ['How old are you?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'ha-v29',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Hausa',
        questionFr: 'Tapez "J\'ai ... ans" en Hausa',
        correctAnswer: 'Ina shekara...'
      },
      {
        id: 'ha-v30',
        type: 'multiple-choice',
        question: 'How do you say "Where do you live?" in Hausa?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Hausa?',
        correctAnswer: 'Ina zaune?',
        options: ['Ina zaune?', 'Daga ina kake?', 'Menene sunanka?', 'Ina shekara?']
      },
      {
        id: 'ha-v31',
        type: 'multiple-choice',
        question: '"Ina zaune?" means:',
        questionFr: '"Ina zaune?" signifie:',
        correctAnswer: 'Where do you live?',
        options: ['Where do you live?', 'Where are you from?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'ha-v32',
        type: 'type-answer',
        question: 'Type "I live in..." in Hausa',
        questionFr: 'Tapez "J\'habite à..." en Hausa',
        correctAnswer: 'Ina zaune a...'
      },
      {
        id: 'ha-v33',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Hausa?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Hausa?',
        correctAnswer: 'Me kake yi?',
        options: ['Me kake yi?', 'Menene sunanka?', 'Yaya dai?', 'Daga ina kake?']
      },
      {
        id: 'ha-v34',
        type: 'multiple-choice',
        question: 'What does "Me kake yi?" mean?',
        questionFr: 'Que signifie "Me kake yi?"?',
        correctAnswer: 'What do you do?',
        options: ['What do you do?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'ha-v35',
        type: 'type-answer',
        question: 'Type "I am a student" in Hausa',
        questionFr: 'Tapez "Je suis étudiant" en Hausa',
        correctAnswer: 'Ni dalibi ne'
      },
      {
        id: 'ha-v36',
        type: 'multiple-choice',
        question: 'How do you say "I am a teacher" in Hausa?',
        questionFr: 'Comment dit-on "Je suis enseignant" en Hausa?',
        correctAnswer: 'Ni malami ne',
        options: ['Ni malami ne', 'Ni dalibi ne', 'Ni likita ne', 'Ni ma\'aikaci ne']
      },
      {
        id: 'ha-v37',
        type: 'multiple-choice',
        question: 'What does "Ni malami ne" mean?',
        questionFr: 'Que signifie "Ni malami ne"?',
        correctAnswer: 'I am a teacher',
        options: ['I am a teacher', 'I am a student', 'I am a doctor', 'I am a worker']
      },
      {
        id: 'ha-v38',
        type: 'type-answer',
        question: 'Type "I am a doctor" in Hausa',
        questionFr: 'Tapez "Je suis médecin" en Hausa',
        correctAnswer: 'Ni likita ne'
      },
      {
        id: 'ha-v39',
        type: 'multiple-choice',
        question: 'How do you say "I am learning Hausa" in Hausa?',
        questionFr: 'Comment dit-on "J\'apprends le Hausa" en Hausa?',
        correctAnswer: 'Ina koyon Hausa',
        options: ['Ina koyon Hausa', 'Ina koyon Turanci', 'Ina koyon Faransanci', 'Ina koyon Larabci']
      },
      {
        id: 'ha-v40',
        type: 'multiple-choice',
        question: 'What does "Ina koyon Hausa" mean?',
        questionFr: 'Que signifie "Ina koyon Hausa"?',
        correctAnswer: 'I am learning Hausa',
        options: ['I am learning Hausa', 'I am learning English', 'I am learning French', 'I am learning Arabic']
      }
    ]
  },

  // STAGE 1 - MISSION 3: BASIC WORDS (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-3',
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'ha-v41',
        type: 'multiple-choice',
        question: 'How do you say "Yes" in Hausa?',
        questionFr: 'Comment dit-on "Oui" en Hausa?',
        correctAnswer: 'Ee',
        options: ['Ee', 'A\'a', 'Don Allah', 'Sannu']
      },
      {
        id: 'ha-v42',
        type: 'multiple-choice',
        question: 'What does "Ee" mean?',
        questionFr: 'Que signifie "Ee"?',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Please', 'Hello']
      },
      {
        id: 'ha-v43',
        type: 'type-answer',
        question: 'Type "No" in Hausa',
        questionFr: 'Tapez "Non" en Hausa',
        correctAnswer: 'A\'a'
      },
      {
        id: 'ha-v44',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Hausa?',
        questionFr: 'Comment dit-on "Eau" en Hausa?',
        correctAnswer: 'Ruwa',
        options: ['Ruwa', 'Abinci', 'Gida', 'Kudi']
      },
      {
        id: 'ha-v45',
        type: 'multiple-choice',
        question: '"Ruwa" means:',
        questionFr: '"Ruwa" signifie:',
        correctAnswer: 'Water',
        options: ['Water', 'Food', 'House', 'Money']
      },
      {
        id: 'ha-v46',
        type: 'type-answer',
        question: 'Type "Food" in Hausa',
        questionFr: 'Tapez "Nourriture" en Hausa',
        correctAnswer: 'Abinci'
      },
      {
        id: 'ha-v47',
        type: 'multiple-choice',
        question: 'How do you say "House" in Hausa?',
        questionFr: 'Comment dit-on "Maison" en Hausa?',
        correctAnswer: 'Gida',
        options: ['Gida', 'Ruwa', 'Abinci', 'Kudi']
      },
      {
        id: 'ha-v48',
        type: 'multiple-choice',
        question: 'What does "Gida" mean?',
        questionFr: 'Que signifie "Gida"?',
        correctAnswer: 'House',
        options: ['House', 'Water', 'Food', 'Money']
      },
      {
        id: 'ha-v49',
        type: 'type-answer',
        question: 'Type "Money" in Hausa',
        questionFr: 'Tapez "Argent" en Hausa',
        correctAnswer: 'Kudi'
      },
      {
        id: 'ha-v50',
        type: 'multiple-choice',
        question: 'How do you say "Book" in Hausa?',
        questionFr: 'Comment dit-on "Livre" en Hausa?',
        correctAnswer: 'Littafi',
        options: ['Littafi', 'Kudi', 'Gida', 'Abinci']
      },
      {
        id: 'ha-v51',
        type: 'multiple-choice',
        question: '"Littafi" means:',
        questionFr: '"Littafi" signifie:',
        correctAnswer: 'Book',
        options: ['Book', 'Money', 'House', 'Food']
      },
      {
        id: 'ha-v52',
        type: 'type-answer',
        question: 'Type "Car" in Hausa',
        questionFr: 'Tapez "Voiture" en Hausa',
        correctAnswer: 'Mota'
      },
      {
        id: 'ha-v53',
        type: 'multiple-choice',
        question: 'How do you say "Tree" in Hausa?',
        questionFr: 'Comment dit-on "Arbre" en Hausa?',
        correctAnswer: 'Bishiya',
        options: ['Bishiya', 'Mota', 'Littafi', 'Kudi']
      },
      {
        id: 'ha-v54',
        type: 'multiple-choice',
        question: 'What does "Bishiya" mean?',
        questionFr: 'Que signifie "Bishiya"?',
        correctAnswer: 'Tree',
        options: ['Tree', 'Car', 'Book', 'Money']
      },
      {
        id: 'ha-v55',
        type: 'type-answer',
        question: 'Type "Sun" in Hausa',
        questionFr: 'Tapez "Soleil" en Hausa',
        correctAnswer: 'Rana'
      },
      {
        id: 'ha-v56',
        type: 'multiple-choice',
        question: 'How do you say "Moon" in Hausa?',
        questionFr: 'Comment dit-on "Lune" en Hausa?',
        correctAnswer: 'Wata',
        options: ['Wata', 'Rana', 'Bishiya', 'Mota']
      },
      {
        id: 'ha-v57',
        type: 'multiple-choice',
        question: 'What does "Wata" mean?',
        questionFr: 'Que signifie "Wata"?',
        correctAnswer: 'Moon',
        options: ['Moon', 'Sun', 'Tree', 'Car']
      },
      {
        id: 'ha-v58',
        type: 'type-answer',
        question: 'Type "Fire" in Hausa',
        questionFr: 'Tapez "Feu" en Hausa',
        correctAnswer: 'Wuta'
      },
      {
        id: 'ha-v59',
        type: 'multiple-choice',
        question: 'How do you say "Earth" in Hausa?',
        questionFr: 'Comment dit-on "Terre" en Hausa?',
        correctAnswer: 'Duniya',
        options: ['Duniya', 'Wuta', 'Wata', 'Rana']
      },
      {
        id: 'ha-v60',
        type: 'multiple-choice',
        question: 'What does "Duniya" mean?',
        questionFr: 'Que signifie "Duniya"?',
        correctAnswer: 'Earth',
        options: ['Earth', 'Fire', 'Moon', 'Sun']
      }
    ]
  },

  // STAGE 1 - MISSION 4: ESSENTIAL VOCABULARY (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-4',
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'ha-v61',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Hausa?',
        questionFr: 'Comment dit-on "Famille" en Hausa?',
        correctAnswer: 'Iyalin',
        options: ['Iyalin', 'Abokai', 'Ma\'aikata', 'Malamai']
      },
      {
        id: 'ha-v62',
        type: 'multiple-choice',
        question: 'What does "Iyalin" mean?',
        questionFr: 'Que signifie "Iyalin"?',
        correctAnswer: 'Family',
        options: ['Family', 'Friends', 'Workers', 'Teachers']
      },
      {
        id: 'ha-v63',
        type: 'type-answer',
        question: 'Type "Mother" in Hausa',
        questionFr: 'Tapez "Mère" en Hausa',
        correctAnswer: 'Uwa'
      },
      {
        id: 'ha-v64',
        type: 'multiple-choice',
        question: 'How do you say "Father" in Hausa?',
        questionFr: 'Comment dit-on "Père" en Hausa?',
        correctAnswer: 'Uba',
        options: ['Uba', 'Uwa', 'Yaro', 'Yarinya']
      },
      {
        id: 'ha-v65',
        type: 'multiple-choice',
        question: '"Uba" means:',
        questionFr: '"Uba" signifie:',
        correctAnswer: 'Father',
        options: ['Father', 'Mother', 'Child', 'Sister']
      },
      {
        id: 'ha-v66',
        type: 'type-answer',
        question: 'Type "Child" in Hausa',
        questionFr: 'Tapez "Enfant" en Hausa',
        correctAnswer: 'Yaro'
      },
      {
        id: 'ha-v67',
        type: 'multiple-choice',
        question: 'How do you say "Brother" in Hausa?',
        questionFr: 'Comment dit-on "Frère" en Hausa?',
        correctAnswer: 'Dan uwa',
        options: ['Dan uwa', 'Yar uwa', 'Uba', 'Uwa']
      },
      {
        id: 'ha-v68',
        type: 'multiple-choice',
        question: 'What does "Dan uwa" mean?',
        questionFr: 'Que signifie "Dan uwa"?',
        correctAnswer: 'Brother',
        options: ['Brother', 'Sister', 'Father', 'Mother']
      },
      {
        id: 'ha-v69',
        type: 'type-answer',
        question: 'Type "Sister" in Hausa',
        questionFr: 'Tapez "Sœur" en Hausa',
        correctAnswer: 'Yar uwa'
      },
      {
        id: 'ha-v70',
        type: 'multiple-choice',
        question: 'How do you say "Friend" in Hausa?',
        questionFr: 'Comment dit-on "Ami" en Hausa?',
        correctAnswer: 'Aboki',
        options: ['Aboki', 'Iyalin', 'Ma\'aikaci', 'Malami']
      },
      {
        id: 'ha-v71',
        type: 'multiple-choice',
        question: '"Aboki" means:',
        questionFr: '"Aboki" signifie:',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'ha-v72',
        type: 'type-answer',
        question: 'Type "Work" in Hausa',
        questionFr: 'Tapez "Travail" en Hausa',
        correctAnswer: 'Aiki'
      },
      {
        id: 'ha-v73',
        type: 'multiple-choice',
        question: 'How do you say "School" in Hausa?',
        questionFr: 'Comment dit-on "École" en Hausa?',
        correctAnswer: 'Makaranta',
        options: ['Makaranta', 'Ofis', 'Kasuwa', 'Asibiti']
      },
      {
        id: 'ha-v74',
        type: 'multiple-choice',
        question: 'What does "Makaranta" mean?',
        questionFr: 'Que signifie "Makaranta"?',
        correctAnswer: 'School',
        options: ['School', 'Office', 'Market', 'Hospital']
      },
      {
        id: 'ha-v75',
        type: 'type-answer',
        question: 'Type "Market" in Hausa',
        questionFr: 'Tapez "Marché" en Hausa',
        correctAnswer: 'Kasuwa'
      },
      {
        id: 'ha-v76',
        type: 'multiple-choice',
        question: 'How do you say "Hospital" in Hausa?',
        questionFr: 'Comment dit-on "Hôpital" en Hausa?',
        correctAnswer: 'Asibiti',
        options: ['Asibiti', 'Makaranta', 'Ofis', 'Kasuwa']
      },
      {
        id: 'ha-v77',
        type: 'multiple-choice',
        question: 'What does "Asibiti" mean?',
        questionFr: 'Que signifie "Asibiti"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'ha-v78',
        type: 'type-answer',
        question: 'Type "Church" in Hausa',
        questionFr: 'Tapez "Église" en Hausa',
        correctAnswer: 'Coci'
      },
      {
        id: 'ha-v79',
        type: 'multiple-choice',
        question: 'How do you say "Time" in Hausa?',
        questionFr: 'Comment dit-on "Temps" en Hausa?',
        correctAnswer: 'Lokaci',
        options: ['Lokaci', 'Rana', 'Wata', 'Shekara']
      },
      {
        id: 'ha-v80',
        type: 'multiple-choice',
        question: 'What does "Lokaci" mean?',
        questionFr: 'Que signifie "Lokaci"?',
        correctAnswer: 'Time',
        options: ['Time', 'Day', 'Month', 'Year']
      }
    ]
  },

  // STAGE 1 - MISSION 5: PRACTICE & REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-5',
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    level: 1,
    xpReward: 15,
    exercises: [
      {
        id: 'ha-v81',
        type: 'multiple-choice',
        question: 'Complete: "Sannu, ___ dai?"',
        questionFr: 'Compléter: "Sannu, ___ dai?"',
        correctAnswer: 'Yaya',
        options: ['Yaya', 'Ina', 'Me', 'Menene']
      },
      {
        id: 'ha-v82',
        type: 'multiple-choice',
        question: 'What is the correct response to "Yaya dai?"',
        questionFr: 'Quelle est la bonne réponse à "Yaya dai?"?',
        correctAnswer: 'Lafiya lau',
        options: ['Lafiya lau', 'Sunana...', 'Daga...', 'Ina zaune a...']
      },
      {
        id: 'ha-v83',
        type: 'type-answer',
        question: 'Type the Hausa word for "Thank you"',
        questionFr: 'Tapez le mot Hausa pour "Merci"',
        correctAnswer: 'Nagode'
      },
      {
        id: 'ha-v84',
        type: 'multiple-choice',
        question: 'How do you say "Good morning" in Hausa?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Hausa?',
        correctAnswer: 'Ina kwana',
        options: ['Ina kwana', 'Ina yini', 'Barka da rana', 'Sannu']
      },
      {
        id: 'ha-v85',
        type: 'multiple-choice',
        question: 'What does "Sai anjima" mean?',
        questionFr: 'Que signifie "Sai anjima"?',
        correctAnswer: 'Goodbye',
        options: ['Goodbye', 'Hello', 'Thank you', 'Please']
      },
      {
        id: 'ha-v86',
        type: 'type-answer',
        question: 'Type "Please" in Hausa',
        questionFr: 'Tapez "S\'il vous plaît" en Hausa',
        correctAnswer: 'Don Allah'
      },
      {
        id: 'ha-v87',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Hausa?',
        questionFr: 'Comment dit-on "Eau" en Hausa?',
        correctAnswer: 'Ruwa',
        options: ['Ruwa', 'Abinci', 'Gida', 'Kudi']
      },
      {
        id: 'ha-v88',
        type: 'multiple-choice',
        question: 'What does "Abinci" mean?',
        questionFr: 'Que signifie "Abinci"?',
        correctAnswer: 'Food',
        options: ['Food', 'Water', 'House', 'Money']
      },
      {
        id: 'ha-v89',
        type: 'type-answer',
        question: 'Type "House" in Hausa',
        questionFr: 'Tapez "Maison" en Hausa',
        correctAnswer: 'Gida'
      },
      {
        id: 'ha-v90',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Hausa?',
        questionFr: 'Comment dit-on "Famille" en Hausa?',
        correctAnswer: 'Iyalin',
        options: ['Iyalin', 'Abokai', 'Ma\'aikata', 'Malamai']
      },
      {
        id: 'ha-v91',
        type: 'multiple-choice',
        question: 'What does "Uwa" mean?',
        questionFr: 'Que signifie "Uwa"?',
        correctAnswer: 'Mother',
        options: ['Mother', 'Father', 'Child', 'Sister']
      },
      {
        id: 'ha-v92',
        type: 'type-answer',
        question: 'Type "Father" in Hausa',
        questionFr: 'Tapez "Père" en Hausa',
        correctAnswer: 'Uba'
      },
      {
        id: 'ha-v93',
        type: 'multiple-choice',
        question: 'How do you say "School" in Hausa?',
        questionFr: 'Comment dit-on "École" en Hausa?',
        correctAnswer: 'Makaranta',
        options: ['Makaranta', 'Ofis', 'Kasuwa', 'Asibiti']
      },
      {
        id: 'ha-v94',
        type: 'multiple-choice',
        question: 'What does "Aboki" mean?',
        questionFr: 'Que signifie "Aboki"?',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'ha-v95',
        type: 'type-answer',
        question: 'Type "Yes" in Hausa',
        questionFr: 'Tapez "Oui" en Hausa',
        correctAnswer: 'Ee'
      },
      {
        id: 'ha-v96',
        type: 'multiple-choice',
        question: 'How do you say "No" in Hausa?',
        questionFr: 'Comment dit-on "Non" en Hausa?',
        correctAnswer: 'A\'a',
        options: ['A\'a', 'Ee', 'Don Allah', 'Sannu']
      },
      {
        id: 'ha-v97',
        type: 'multiple-choice',
        question: 'What does "Asibiti" mean?',
        questionFr: 'Que signifie "Asibiti"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'ha-v98',
        type: 'type-answer',
        question: 'Type "Time" in Hausa',
        questionFr: 'Tapez "Temps" en Hausa',
        correctAnswer: 'Lokaci'
      },
      {
        id: 'ha-v99',
        type: 'multiple-choice',
        question: 'Complete: "Sunana ___" (My name is...)',
        questionFr: 'Compléter: "Sunana ___" (Je m\'appelle...)',
        correctAnswer: '...',
        options: ['...', 'Ee', 'A\'a', 'Don Allah']
      },
      {
        id: 'ha-v100',
        type: 'multiple-choice',
        question: 'What is the Hausa word for "Welcome"?',
        questionFr: 'Quel est le mot Hausa pour "Bienvenue"?',
        correctAnswer: 'Barka da zuwa',
        options: ['Barka da zuwa', 'Sannu', 'Nagode', 'Don Allah']
      }
    ]
  },

  // STAGE 2 - MISSION 6: DAILY LIFE (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-6',
    type: 'vocabulary',
    title: 'Daily Life',
    titleFr: 'Vie quotidienne',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'ha-v101',
        type: 'multiple-choice',
        question: 'How do you say "I wake up" in Hausa?',
        questionFr: 'Comment dit-on "Je me réveille" en Hausa?',
        correctAnswer: 'Ina tashi',
        options: ['Ina tashi', 'Ina barci', 'Ina ci', 'Ina tafiya aiki']
      },
      {
        id: 'ha-v102',
        type: 'multiple-choice',
        question: 'What does "Ina tashi" mean?',
        questionFr: 'Que signifie "Ina tashi"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'ha-v103',
        type: 'type-answer',
        question: 'Type "I sleep" in Hausa',
        questionFr: 'Tapez "Je dors" en Hausa',
        correctAnswer: 'Ina barci'
      },
      {
        id: 'ha-v104',
        type: 'multiple-choice',
        question: 'How do you say "I eat" in Hausa?',
        questionFr: 'Comment dit-on "Je mange" en Hausa?',
        correctAnswer: 'Ina ci',
        options: ['Ina ci', 'Ina tashi', 'Ina barci', 'Ina tafiya aiki']
      },
      {
        id: 'ha-v105',
        type: 'multiple-choice',
        question: '"Ina ci" means:',
        questionFr: '"Ina ci" signifie:',
        correctAnswer: 'I eat',
        options: ['I eat', 'I wake up', 'I sleep', 'I go to work']
      },
      {
        id: 'ha-v106',
        type: 'type-answer',
        question: 'Type "I go to work" in Hausa',
        questionFr: 'Tapez "Je vais au travail" en Hausa',
        correctAnswer: 'Ina tafiya aiki'
      },
      {
        id: 'ha-v107',
        type: 'multiple-choice',
        question: 'How do you say "I study" in Hausa?',
        questionFr: 'Comment dit-on "J\'étudie" en Hausa?',
        correctAnswer: 'Ina koyo',
        options: ['Ina koyo', 'Ina tafiya aiki', 'Ina ci', 'Ina tashi']
      },
      {
        id: 'ha-v108',
        type: 'multiple-choice',
        question: 'What does "Ina koyo" mean?',
        questionFr: 'Que signifie "Ina koyo"?',
        correctAnswer: 'I study',
        options: ['I study', 'I go to work', 'I eat', 'I wake up']
      },
      {
        id: 'ha-v109',
        type: 'type-answer',
        question: 'Type "I play" in Hausa',
        questionFr: 'Tapez "Je joue" en Hausa',
        correctAnswer: 'Ina wasa'
      },
      {
        id: 'ha-v110',
        type: 'multiple-choice',
        question: 'How do you say "I cook" in Hausa?',
        questionFr: 'Comment dit-on "Je cuisine" en Hausa?',
        correctAnswer: 'Ina dafa',
        options: ['Ina dafa', 'Ina wasa', 'Ina koyo', 'Ina tafiya aiki']
      },
      {
        id: 'ha-v111',
        type: 'multiple-choice',
        question: '"Ina dafa" means:',
        questionFr: '"Ina dafa" signifie:',
        correctAnswer: 'I cook',
        options: ['I cook', 'I play', 'I study', 'I go to work']
      },
      {
        id: 'ha-v112',
        type: 'type-answer',
        question: 'Type "I clean" in Hausa',
        questionFr: 'Tapez "Je nettoie" en Hausa',
        correctAnswer: 'Ina tsaftace'
      },
      {
        id: 'ha-v113',
        type: 'multiple-choice',
        question: 'How do you say "I wash" in Hausa?',
        questionFr: 'Comment dit-on "Je lave" en Hausa?',
        correctAnswer: 'Ina wanke',
        options: ['Ina wanke', 'Ina tsaftace', 'Ina dafa', 'Ina wasa']
      },
      {
        id: 'ha-v114',
        type: 'multiple-choice',
        question: 'What does "Ina wanke" mean?',
        questionFr: 'Que signifie "Ina wanke"?',
        correctAnswer: 'I wash',
        options: ['I wash', 'I clean', 'I cook', 'I play']
      },
      {
        id: 'ha-v115',
        type: 'type-answer',
        question: 'Type "I read" in Hausa',
        questionFr: 'Tapez "Je lis" en Hausa',
        correctAnswer: 'Ina karatu'
      },
      {
        id: 'ha-v116',
        type: 'multiple-choice',
        question: 'How do you say "I write" in Hausa?',
        questionFr: 'Comment dit-on "J\'écris" en Hausa?',
        correctAnswer: 'Ina rubutu',
        options: ['Ina rubutu', 'Ina karatu', 'Ina wanke', 'Ina tsaftace']
      },
      {
        id: 'ha-v117',
        type: 'multiple-choice',
        question: 'What does "Ina rubutu" mean?',
        questionFr: 'Que signifie "Ina rubutu"?',
        correctAnswer: 'I write',
        options: ['I write', 'I read', 'I wash', 'I clean']
      },
      {
        id: 'ha-v118',
        type: 'type-answer',
        question: 'Type "I listen" in Hausa',
        questionFr: 'Tapez "J\'écoute" en Hausa',
        correctAnswer: 'Ina sauraro'
      },
      {
        id: 'ha-v119',
        type: 'multiple-choice',
        question: 'How do you say "I speak" in Hausa?',
        questionFr: 'Comment dit-on "Je parle" en Hausa?',
        correctAnswer: 'Ina magana',
        options: ['Ina magana', 'Ina sauraro', 'Ina rubutu', 'Ina karatu']
      },
      {
        id: 'ha-v120',
        type: 'multiple-choice',
        question: 'What does "Ina magana" mean?',
        questionFr: 'Que signifie "Ina magana"?',
        correctAnswer: 'I speak',
        options: ['I speak', 'I listen', 'I write', 'I read']
      }
    ]
  },

  // STAGE 2 - MISSION 7: MORE PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-7',
    type: 'vocabulary',
    title: 'More Phrases',
    titleFr: 'Plus de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'ha-v121',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Hausa?',
        questionFr: 'Comment dit-on "J\'ai faim" en Hausa?',
        correctAnswer: 'Yunwa tana ci ni',
        options: ['Yunwa tana ci ni', 'Kishirwa tana ci ni', 'Barci yana ci ni', 'Zafi yana ci ni']
      },
      {
        id: 'ha-v122',
        type: 'multiple-choice',
        question: 'What does "Yunwa tana ci ni" mean?',
        questionFr: 'Que signifie "Yunwa tana ci ni"?',
        correctAnswer: 'I am hungry',
        options: ['I am hungry', 'I am thirsty', 'I am tired', 'I am hot']
      },
      {
        id: 'ha-v123',
        type: 'type-answer',
        question: 'Type "I am thirsty" in Hausa',
        questionFr: 'Tapez "J\'ai soif" en Hausa',
        correctAnswer: 'Kishirwa tana ci ni'
      },
      {
        id: 'ha-v124',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Hausa?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Hausa?',
        correctAnswer: 'Gajiya tana ci ni',
        options: ['Gajiya tana ci ni', 'Yunwa tana ci ni', 'Kishirwa tana ci ni', 'Zafi yana ci ni']
      },
      {
        id: 'ha-v125',
        type: 'multiple-choice',
        question: '"Gajiya tana ci ni" means:',
        questionFr: '"Gajiya tana ci ni" signifie:',
        correctAnswer: 'I am tired',
        options: ['I am tired', 'I am hungry', 'I am thirsty', 'I am hot']
      },
      {
        id: 'ha-v126',
        type: 'type-answer',
        question: 'Type "I am hot" in Hausa',
        questionFr: 'Tapez "J\'ai chaud" en Hausa',
        correctAnswer: 'Zafi yana ci ni'
      },
      {
        id: 'ha-v127',
        type: 'multiple-choice',
        question: 'How do you say "I am cold" in Hausa?',
        questionFr: 'Comment dit-on "J\'ai froid" en Hausa?',
        correctAnswer: 'Sanyi yana ci ni',
        options: ['Sanyi yana ci ni', 'Zafi yana ci ni', 'Gajiya tana ci ni', 'Yunwa tana ci ni']
      },
      {
        id: 'ha-v128',
        type: 'multiple-choice',
        question: 'What does "Sanyi yana ci ni" mean?',
        questionFr: 'Que signifie "Sanyi yana ci ni"?',
        correctAnswer: 'I am cold',
        options: ['I am cold', 'I am hot', 'I am tired', 'I am hungry']
      },
      {
        id: 'ha-v129',
        type: 'type-answer',
        question: 'Type "I am happy" in Hausa',
        questionFr: 'Tapez "Je suis heureux" en Hausa',
        correctAnswer: 'Ina farin ciki'
      },
      {
        id: 'ha-v130',
        type: 'multiple-choice',
        question: 'How do you say "I am sad" in Hausa?',
        questionFr: 'Comment dit-on "Je suis triste" en Hausa?',
        correctAnswer: 'Ina bakin ciki',
        options: ['Ina bakin ciki', 'Ina farin ciki', 'Sanyi yana ci ni', 'Zafi yana ci ni']
      },
      {
        id: 'ha-v131',
        type: 'multiple-choice',
        question: '"Ina bakin ciki" means:',
        questionFr: '"Ina bakin ciki" signifie:',
        correctAnswer: 'I am sad',
        options: ['I am sad', 'I am happy', 'I am cold', 'I am hot']
      },
      {
        id: 'ha-v132',
        type: 'type-answer',
        question: 'Type "I am angry" in Hausa',
        questionFr: 'Tapez "Je suis en colère" en Hausa',
        correctAnswer: 'Ina fushi'
      },
      {
        id: 'ha-v133',
        type: 'multiple-choice',
        question: 'How do you say "I am sick" in Hausa?',
        questionFr: 'Comment dit-on "Je suis malade" en Hausa?',
        correctAnswer: 'Ina rashin lafiya',
        options: ['Ina rashin lafiya', 'Ina fushi', 'Ina bakin ciki', 'Ina farin ciki']
      },
      {
        id: 'ha-v134',
        type: 'multiple-choice',
        question: 'What does "Ina rashin lafiya" mean?',
        questionFr: 'Que signifie "Ina rashin lafiya"?',
        correctAnswer: 'I am sick',
        options: ['I am sick', 'I am angry', 'I am sad', 'I am happy']
      },
      {
        id: 'ha-v135',
        type: 'type-answer',
        question: 'Type "I am well" in Hausa',
        questionFr: 'Tapez "Je vais bien" en Hausa',
        correctAnswer: 'Lafiya lau'
      },
      {
        id: 'ha-v136',
        type: 'multiple-choice',
        question: 'How do you say "I am busy" in Hausa?',
        questionFr: 'Comment dit-on "Je suis occupé" en Hausa?',
        correctAnswer: 'Ina aiki',
        options: ['Ina aiki', 'Lafiya lau', 'Ina rashin lafiya', 'Ina fushi']
      },
      {
        id: 'ha-v137',
        type: 'multiple-choice',
        question: 'What does "Ina aiki" mean?',
        questionFr: 'Que signifie "Ina aiki"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'ha-v138',
        type: 'type-answer',
        question: 'Type "I am free" in Hausa',
        questionFr: 'Tapez "Je suis libre" en Hausa',
        correctAnswer: 'Ba ni da aiki'
      },
      {
        id: 'ha-v139',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Hausa?',
        questionFr: 'Comment dit-on "Je suis prêt" en Hausa?',
        correctAnswer: 'Ina shirye',
        options: ['Ina shirye', 'Ba ni da aiki', 'Ina aiki', 'Lafiya lau']
      },
      {
        id: 'ha-v140',
        type: 'multiple-choice',
        question: 'What does "Ina shirye" mean?',
        questionFr: 'Que signifie "Ina shirye"?',
        correctAnswer: 'I am ready',
        options: ['I am ready', 'I am free', 'I am busy', 'I am well']
      }
    ]
  },

  // ─── STAGE 2: POLITE & FORMAL SPEECH ────────────────────────────────────────

  // Stage 2, Unit 1: Please & Thank You
  {
    id: 'ha-s2-1',
    type: 'vocabulary',
    title: 'Please & Thank You',
    titleFr: 'S\'il vous plaît et merci',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-1-1', type: 'multiple-choice', question: 'How do you say "Please" in Hausa?', questionFr: 'Comment dit-on "S\'il vous plaît" en Hausa?', correctAnswer: 'Don Allah', options: ['Don Allah', 'Na gode', 'Sai anjima', 'Sannu'] },
      { id: 'ha-s2-1-2', type: 'multiple-choice', question: 'What does "Na gode" mean?', questionFr: 'Que signifie "Na gode"?', correctAnswer: 'Thank you', options: ['Thank you', 'Goodbye', 'Please', 'Welcome'] },
      { id: 'ha-s2-1-3', type: 'type-answer', question: 'Type "Thank you" in Hausa', questionFr: 'Tapez "Merci" en Hausa', correctAnswer: 'Na gode' },
      { id: 'ha-s2-1-4', type: 'multiple-choice', question: 'What does "Babu laifi" mean?', questionFr: 'Que signifie "Babu laifi"?', correctAnswer: 'You\'re welcome', options: ['You\'re welcome', 'Thank you', 'Please', 'Sorry'] },
      { id: 'ha-s2-1-5', type: 'multiple-choice', question: 'How do you say "Thank you very much" in Hausa?', questionFr: 'Comment dit-on "Merci beaucoup" en Hausa?', correctAnswer: 'Na gode ƙwarai', options: ['Na gode ƙwarai', 'Na gode', 'Madalla', 'Sannu'] },
      { id: 'ha-s2-1-6', type: 'type-answer', question: 'Type "Please" in Hausa', questionFr: 'Tapez "S\'il vous plaît" en Hausa', correctAnswer: 'Don Allah' },
      { id: 'ha-s2-1-7', type: 'multiple-choice', question: 'What does "Don Allah" mean?', questionFr: 'Que signifie "Don Allah"?', correctAnswer: 'Please', options: ['Please', 'Thank you', 'Sorry', 'Welcome'] },
      { id: 'ha-s2-1-8', type: 'multiple-choice', question: 'How do you say "You\'re welcome" in Hausa?', questionFr: 'Comment dit-on "De rien" en Hausa?', correctAnswer: 'Babu laifi', options: ['Babu laifi', 'Na gode', 'Don Allah', 'Madalla'] },
      { id: 'ha-s2-1-9', type: 'type-answer', question: 'Type "Thank you very much" in Hausa', questionFr: 'Tapez "Merci beaucoup" en Hausa', correctAnswer: 'Na gode ƙwarai' },
      { id: 'ha-s2-1-10', type: 'multiple-choice', question: '"Na gode" means:', questionFr: '"Na gode" signifie:', correctAnswer: 'Thank you', options: ['Thank you', 'Please', 'Sorry', 'Goodbye'] },
      { id: 'ha-s2-1-11', type: 'multiple-choice', question: 'How do you respond to "Na gode"?', questionFr: 'Comment répondre à "Na gode"?', correctAnswer: 'Babu laifi', options: ['Babu laifi', 'Don Allah', 'Na gode', 'Sannu'] },
      { id: 'ha-s2-1-12', type: 'type-answer', question: 'Type "You\'re welcome" in Hausa', questionFr: 'Tapez "De rien" en Hausa', correctAnswer: 'Babu laifi' },
      { id: 'ha-s2-1-13', type: 'multiple-choice', question: 'What does "Na gode ƙwarai" mean?', questionFr: 'Que signifie "Na gode ƙwarai"?', correctAnswer: 'Thank you very much', options: ['Thank you very much', 'Thank you', 'You\'re welcome', 'Please'] },
      { id: 'ha-s2-1-14', type: 'multiple-choice', question: '"Madalla" is used to express:', questionFr: '"Madalla" exprime:', correctAnswer: 'Well done / Excellent', options: ['Well done / Excellent', 'Thank you', 'Please', 'Sorry'] },
      { id: 'ha-s2-1-15', type: 'type-answer', question: 'Type "Well done" in Hausa', questionFr: 'Tapez "Bravo" en Hausa', correctAnswer: 'Madalla' },
      { id: 'ha-s2-1-16', type: 'multiple-choice', question: 'Which phrase is used to politely ask for something?', questionFr: 'Quelle expression est utilisée pour demander poliment quelque chose?', correctAnswer: 'Don Allah', options: ['Don Allah', 'Na gode', 'Babu laifi', 'Sai anjima'] },
      { id: 'ha-s2-1-17', type: 'type-answer', question: 'Type "Well done / Excellent" in Hausa', questionFr: 'Tapez "Bravo / Excellent" en Hausa', correctAnswer: 'Madalla' },
      { id: 'ha-s2-1-18', type: 'multiple-choice', question: 'How do you thank someone formally in Hausa?', questionFr: 'Comment remercie-t-on quelqu\'un formellement en Hausa?', correctAnswer: 'Na gode ƙwarai', options: ['Na gode ƙwarai', 'Sannu', 'Don Allah', 'Madalla'] },
      { id: 'ha-s2-1-19', type: 'type-answer', question: 'Type "Please (for God\'s sake)" in Hausa', questionFr: 'Tapez "S\'il vous plaît (au nom de Dieu)" en Hausa', correctAnswer: 'Don Allah' },
      { id: 'ha-s2-1-20', type: 'multiple-choice', question: '"Babu laifi" literally means:', questionFr: '"Babu laifi" signifie littéralement:', correctAnswer: 'No fault / No problem', options: ['No fault / No problem', 'Thank you', 'Please enter', 'Welcome'] }
    ]
  },

  // Stage 2, Unit 2: Apologies & Forgiveness
  {
    id: 'ha-s2-2',
    type: 'vocabulary',
    title: 'Apologies & Forgiveness',
    titleFr: 'Excuses et pardon',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-2-1', type: 'multiple-choice', question: 'How do you say "Sorry" in Hausa?', questionFr: 'Comment dit-on "Désolé" en Hausa?', correctAnswer: 'Yi haƙuri', options: ['Yi haƙuri', 'Na gode', 'Don Allah', 'Babu laifi'] },
      { id: 'ha-s2-2-2', type: 'multiple-choice', question: 'What does "Yi haƙuri" mean?', questionFr: 'Que signifie "Yi haƙuri"?', correctAnswer: 'Sorry / Be patient', options: ['Sorry / Be patient', 'Thank you', 'Please', 'Welcome'] },
      { id: 'ha-s2-2-3', type: 'type-answer', question: 'Type "Sorry" in Hausa', questionFr: 'Tapez "Désolé" en Hausa', correctAnswer: 'Yi haƙuri' },
      { id: 'ha-s2-2-4', type: 'multiple-choice', question: 'What does "Gafara" mean?', questionFr: 'Que signifie "Gafara"?', correctAnswer: 'Forgiveness / Pardon', options: ['Forgiveness / Pardon', 'Sorry', 'Please', 'Thank you'] },
      { id: 'ha-s2-2-5', type: 'multiple-choice', question: 'How do you say "Forgive me" in Hausa?', questionFr: 'Comment dit-on "Pardonne-moi" en Hausa?', correctAnswer: 'Gafara da ni', options: ['Gafara da ni', 'Yi haƙuri', 'Babu laifi', 'Don Allah'] },
      { id: 'ha-s2-2-6', type: 'type-answer', question: 'Type "Forgive me" in Hausa', questionFr: 'Tapez "Pardonne-moi" en Hausa', correctAnswer: 'Gafara da ni' },
      { id: 'ha-s2-2-7', type: 'multiple-choice', question: 'How do you say "It\'s okay" in Hausa?', questionFr: 'Comment dit-on "C\'est bon" en Hausa?', correctAnswer: 'Yana daidai', options: ['Yana daidai', 'Yi haƙuri', 'Gafara', 'Don Allah'] },
      { id: 'ha-s2-2-8', type: 'multiple-choice', question: 'What does "Yana daidai" mean?', questionFr: 'Que signifie "Yana daidai"?', correctAnswer: 'It\'s okay / It\'s correct', options: ['It\'s okay / It\'s correct', 'Forgive me', 'Be patient', 'Please'] },
      { id: 'ha-s2-2-9', type: 'type-answer', question: 'Type "It\'s okay" in Hausa', questionFr: 'Tapez "C\'est bon" en Hausa', correctAnswer: 'Yana daidai' },
      { id: 'ha-s2-2-10', type: 'multiple-choice', question: '"Gafara da ni" means:', questionFr: '"Gafara da ni" signifie:', correctAnswer: 'Forgive me', options: ['Forgive me', 'Thank you', 'It\'s okay', 'Sorry'] },
      { id: 'ha-s2-2-11', type: 'multiple-choice', question: 'How do you respond when someone apologizes?', questionFr: 'Comment répondre quand quelqu\'un s\'excuse?', correctAnswer: 'Babu laifi', options: ['Babu laifi', 'Yi haƙuri', 'Gafara', 'Na gode'] },
      { id: 'ha-s2-2-12', type: 'type-answer', question: 'Type "Forgiveness / Pardon" in Hausa', questionFr: 'Tapez "Pardon / Excuse" en Hausa', correctAnswer: 'Gafara' },
      { id: 'ha-s2-2-13', type: 'multiple-choice', question: '"Yi haƙuri" literally means:', questionFr: '"Yi haƙuri" signifie littéralement:', correctAnswer: 'Be patient / tolerant', options: ['Be patient / tolerant', 'No problem', 'Forgive me', 'Thank you'] },
      { id: 'ha-s2-2-14', type: 'multiple-choice', question: 'What do you say to excuse yourself in Hausa?', questionFr: 'Que dit-on pour s\'excuser en Hausa?', correctAnswer: 'Yi haƙuri', options: ['Yi haƙuri', 'Na gode', 'Madalla', 'Sannu'] },
      { id: 'ha-s2-2-15', type: 'type-answer', question: 'Type "No problem" in Hausa', questionFr: 'Tapez "Pas de problème" en Hausa', correctAnswer: 'Babu laifi' },
      { id: 'ha-s2-2-16', type: 'multiple-choice', question: 'Which phrase asks for forgiveness?', questionFr: 'Quelle expression demande le pardon?', correctAnswer: 'Gafara da ni', options: ['Gafara da ni', 'Na gode', 'Don Allah', 'Yana daidai'] },
      { id: 'ha-s2-2-17', type: 'type-answer', question: 'Type "I\'m sorry / Be patient" in Hausa', questionFr: 'Tapez "Désolé / Soyez patient" en Hausa', correctAnswer: 'Yi haƙuri' },
      { id: 'ha-s2-2-18', type: 'multiple-choice', question: '"Babu laifi" can also mean:', questionFr: '"Babu laifi" peut aussi signifier:', correctAnswer: 'It\'s okay / No problem', options: ['It\'s okay / No problem', 'Forgive me', 'Please', 'Be patient'] },
      { id: 'ha-s2-2-19', type: 'type-answer', question: 'Type "Forgiveness" in Hausa', questionFr: 'Tapez "Pardon" en Hausa', correctAnswer: 'Gafara' },
      { id: 'ha-s2-2-20', type: 'multiple-choice', question: 'What does "Gafara" mean?', questionFr: 'Que signifie "Gafara"?', correctAnswer: 'Pardon / Forgiveness', options: ['Pardon / Forgiveness', 'Sorry', 'It\'s okay', 'Be patient'] }
    ]
  },

  // Stage 2, Unit 3: Yes, No & Agreement
  {
    id: 'ha-s2-3',
    type: 'vocabulary',
    title: 'Yes, No & Agreement',
    titleFr: 'Oui, non et accord',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-3-1', type: 'multiple-choice', question: 'How do you say "Yes" in Hausa?', questionFr: 'Comment dit-on "Oui" en Hausa?', correctAnswer: 'Ee', options: ['Ee', 'A\'a', 'Daidai', 'Watakila'] },
      { id: 'ha-s2-3-2', type: 'multiple-choice', question: 'What does "A\'a" mean?', questionFr: 'Que signifie "A\'a"?', correctAnswer: 'No', options: ['No', 'Yes', 'Maybe', 'Correct'] },
      { id: 'ha-s2-3-3', type: 'type-answer', question: 'Type "Yes" in Hausa', questionFr: 'Tapez "Oui" en Hausa', correctAnswer: 'Ee' },
      { id: 'ha-s2-3-4', type: 'multiple-choice', question: 'What does "Daidai" mean?', questionFr: 'Que signifie "Daidai"?', correctAnswer: 'Correct / Right', options: ['Correct / Right', 'Yes', 'No', 'Maybe'] },
      { id: 'ha-s2-3-5', type: 'multiple-choice', question: 'How do you say "Of course" in Hausa?', questionFr: 'Comment dit-on "Bien sûr" en Hausa?', correctAnswer: 'Tabbas', options: ['Tabbas', 'Ee', 'A\'a', 'Daidai'] },
      { id: 'ha-s2-3-6', type: 'type-answer', question: 'Type "No" in Hausa', questionFr: 'Tapez "Non" en Hausa', correctAnswer: 'A\'a' },
      { id: 'ha-s2-3-7', type: 'multiple-choice', question: 'What does "Watakila" mean?', questionFr: 'Que signifie "Watakila"?', correctAnswer: 'Maybe / Perhaps', options: ['Maybe / Perhaps', 'Yes', 'No', 'Of course'] },
      { id: 'ha-s2-3-8', type: 'multiple-choice', question: 'How do you say "I agree" in Hausa?', questionFr: 'Comment dit-on "Je suis d\'accord" en Hausa?', correctAnswer: 'Na yarda', options: ['Na yarda', 'Daidai', 'Ee', 'Tabbas'] },
      { id: 'ha-s2-3-9', type: 'type-answer', question: 'Type "Correct" in Hausa', questionFr: 'Tapez "Correct" en Hausa', correctAnswer: 'Daidai' },
      { id: 'ha-s2-3-10', type: 'multiple-choice', question: '"Tabbas" means:', questionFr: '"Tabbas" signifie:', correctAnswer: 'Of course / Certainly', options: ['Of course / Certainly', 'Maybe', 'No', 'Correct'] },
      { id: 'ha-s2-3-11', type: 'multiple-choice', question: 'How do you say "Maybe" in Hausa?', questionFr: 'Comment dit-on "Peut-être" en Hausa?', correctAnswer: 'Watakila', options: ['Watakila', 'Tabbas', 'Ee', 'Daidai'] },
      { id: 'ha-s2-3-12', type: 'type-answer', question: 'Type "Of course" in Hausa', questionFr: 'Tapez "Bien sûr" en Hausa', correctAnswer: 'Tabbas' },
      { id: 'ha-s2-3-13', type: 'multiple-choice', question: '"Na yarda" means:', questionFr: '"Na yarda" signifie:', correctAnswer: 'I agree', options: ['I agree', 'I understand', 'I need', 'I want'] },
      { id: 'ha-s2-3-14', type: 'multiple-choice', question: 'Which word means "Correct"?', questionFr: 'Quel mot signifie "Correct"?', correctAnswer: 'Daidai', options: ['Daidai', 'Ee', 'Tabbas', 'Watakila'] },
      { id: 'ha-s2-3-15', type: 'type-answer', question: 'Type "Maybe" in Hausa', questionFr: 'Tapez "Peut-être" en Hausa', correctAnswer: 'Watakila' },
      { id: 'ha-s2-3-16', type: 'multiple-choice', question: 'How do you express agreement in Hausa?', questionFr: 'Comment exprimer son accord en Hausa?', correctAnswer: 'Na yarda', options: ['Na yarda', 'A\'a', 'Watakila', 'Yi haƙuri'] },
      { id: 'ha-s2-3-17', type: 'type-answer', question: 'Type "I agree" in Hausa', questionFr: 'Tapez "Je suis d\'accord" en Hausa', correctAnswer: 'Na yarda' },
      { id: 'ha-s2-3-18', type: 'multiple-choice', question: '"A\'a" is the Hausa word for:', questionFr: '"A\'a" est le mot Hausa pour:', correctAnswer: 'No', options: ['No', 'Yes', 'Correct', 'Maybe'] },
      { id: 'ha-s2-3-19', type: 'type-answer', question: 'Type "Yes / That\'s right" in Hausa', questionFr: 'Tapez "Oui / C\'est exact" en Hausa', correctAnswer: 'Ee' },
      { id: 'ha-s2-3-20', type: 'multiple-choice', question: 'To confirm something is correct you say:', questionFr: 'Pour confirmer que quelque chose est correct on dit:', correctAnswer: 'Daidai', options: ['Daidai', 'Watakila', 'A\'a', 'Gafara'] }
    ]
  },

  // Stage 2, Unit 4: Welcome & Hospitality
  {
    id: 'ha-s2-4',
    type: 'vocabulary',
    title: 'Welcome & Hospitality',
    titleFr: 'Bienvenue et hospitalité',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-4-1', type: 'multiple-choice', question: 'How do you say "Welcome" in Hausa?', questionFr: 'Comment dit-on "Bienvenue" en Hausa?', correctAnswer: 'Barka da zuwa', options: ['Barka da zuwa', 'Sannu', 'Na gode', 'Don Allah'] },
      { id: 'ha-s2-4-2', type: 'multiple-choice', question: 'What does "Barka da zuwa" mean?', questionFr: 'Que signifie "Barka da zuwa"?', correctAnswer: 'Welcome', options: ['Welcome', 'Hello', 'Thank you', 'Goodbye'] },
      { id: 'ha-s2-4-3', type: 'type-answer', question: 'Type "Welcome" in Hausa', questionFr: 'Tapez "Bienvenue" en Hausa', correctAnswer: 'Barka da zuwa' },
      { id: 'ha-s2-4-4', type: 'multiple-choice', question: 'How do you say "Come in" in Hausa?', questionFr: 'Comment dit-on "Entrez" en Hausa?', correctAnswer: 'Ka shiga', options: ['Ka shiga', 'Zauna', 'Ka yi ta gida', 'Barka da zuwa'] },
      { id: 'ha-s2-4-5', type: 'multiple-choice', question: 'What does "Zauna" mean?', questionFr: 'Que signifie "Zauna"?', correctAnswer: 'Sit down', options: ['Sit down', 'Come in', 'Go out', 'Stand up'] },
      { id: 'ha-s2-4-6', type: 'type-answer', question: 'Type "Sit down" in Hausa', questionFr: 'Tapez "Assieds-toi" en Hausa', correctAnswer: 'Zauna' },
      { id: 'ha-s2-4-7', type: 'multiple-choice', question: 'How do you say "Make yourself at home"?', questionFr: 'Comment dit-on "Faites comme chez vous"?', correctAnswer: 'Ka yi ta gida', options: ['Ka yi ta gida', 'Ka shiga', 'Zauna', 'Barka da zuwa'] },
      { id: 'ha-s2-4-8', type: 'multiple-choice', question: '"Kome lafiya?" means:', questionFr: '"Kome lafiya?" signifie:', correctAnswer: 'Is everything alright?', options: ['Is everything alright?', 'Come in', 'Sit down', 'Welcome'] },
      { id: 'ha-s2-4-9', type: 'type-answer', question: 'Type "Come in" in Hausa', questionFr: 'Tapez "Entrez" en Hausa', correctAnswer: 'Ka shiga' },
      { id: 'ha-s2-4-10', type: 'multiple-choice', question: '"Ka yi ta gida" means:', questionFr: '"Ka yi ta gida" signifie:', correctAnswer: 'Make yourself at home', options: ['Make yourself at home', 'Sit down', 'Come in', 'Is everything alright?'] },
      { id: 'ha-s2-4-11', type: 'multiple-choice', question: 'What do you say when a guest arrives?', questionFr: 'Que dit-on quand un invité arrive?', correctAnswer: 'Barka da zuwa', options: ['Barka da zuwa', 'Zauna', 'Ka shiga', 'Kome lafiya?'] },
      { id: 'ha-s2-4-12', type: 'type-answer', question: 'Type "Is everything alright?" in Hausa', questionFr: 'Tapez "Tout va bien?" en Hausa', correctAnswer: 'Kome lafiya?' },
      { id: 'ha-s2-4-13', type: 'multiple-choice', question: 'What does "Ka shiga" mean?', questionFr: 'Que signifie "Ka shiga"?', correctAnswer: 'Come in', options: ['Come in', 'Sit down', 'Go out', 'Welcome'] },
      { id: 'ha-s2-4-14', type: 'multiple-choice', question: '"Zauna" is the Hausa word for:', questionFr: '"Zauna" est le mot Hausa pour:', correctAnswer: 'Sit down', options: ['Sit down', 'Come in', 'Stand up', 'Leave'] },
      { id: 'ha-s2-4-15', type: 'type-answer', question: 'Type "Make yourself at home" in Hausa', questionFr: 'Tapez "Faites comme chez vous" en Hausa', correctAnswer: 'Ka yi ta gida' },
      { id: 'ha-s2-4-16', type: 'multiple-choice', question: 'Which phrase warmly greets an arriving guest?', questionFr: 'Quelle expression accueille chaleureusement un invité?', correctAnswer: 'Barka da zuwa', options: ['Barka da zuwa', 'Zauna', 'Kome lafiya?', 'Yi haƙuri'] },
      { id: 'ha-s2-4-17', type: 'type-answer', question: 'Type "Sit down / Have a seat" in Hausa', questionFr: 'Tapez "Assieds-toi / Asseyez-vous" en Hausa', correctAnswer: 'Zauna' },
      { id: 'ha-s2-4-18', type: 'multiple-choice', question: 'What would you say when inviting someone inside?', questionFr: 'Que diriez-vous en invitant quelqu\'un à entrer?', correctAnswer: 'Ka shiga', options: ['Ka shiga', 'Na gode', 'Sai anjima', 'Yi haƙuri'] },
      { id: 'ha-s2-4-19', type: 'type-answer', question: 'Type "Welcome (on arrival)" in Hausa', questionFr: 'Tapez "Bienvenue (à l\'arrivée)" en Hausa', correctAnswer: 'Barka da zuwa' },
      { id: 'ha-s2-4-20', type: 'multiple-choice', question: '"Sannu da zuwa" also means:', questionFr: '"Sannu da zuwa" signifie aussi:', correctAnswer: 'Welcome / Hello on arrival', options: ['Welcome / Hello on arrival', 'Goodbye', 'Thank you for coming', 'Sit down'] }
    ]
  },

  // Stage 2, Unit 5: Making Polite Requests
  {
    id: 'ha-s2-5',
    type: 'vocabulary',
    title: 'Making Polite Requests',
    titleFr: 'Faire des demandes polies',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-5-1', type: 'multiple-choice', question: 'How do you say "I would like" in Hausa?', questionFr: 'Comment dit-on "Je voudrais" en Hausa?', correctAnswer: 'Ina so', options: ['Ina so', 'Ina bukata', 'Don Allah', 'Na gode'] },
      { id: 'ha-s2-5-2', type: 'multiple-choice', question: 'What does "Ina bukata" mean?', questionFr: 'Que signifie "Ina bukata"?', correctAnswer: 'I need', options: ['I need', 'I want', 'I have', 'I like'] },
      { id: 'ha-s2-5-3', type: 'type-answer', question: 'Type "I need" in Hausa', questionFr: 'Tapez "J\'ai besoin" en Hausa', correctAnswer: 'Ina bukata' },
      { id: 'ha-s2-5-4', type: 'multiple-choice', question: 'How do you politely start a request in Hausa?', questionFr: 'Comment commencer poliment une demande en Hausa?', correctAnswer: 'Don Allah...', options: ['Don Allah...', 'Na gode...', 'Sai anjima...', 'Madalla...'] },
      { id: 'ha-s2-5-5', type: 'multiple-choice', question: '"Zaka iya?" means:', questionFr: '"Zaka iya?" signifie:', correctAnswer: 'Can you? / Are you able to?', options: ['Can you? / Are you able to?', 'Do you want?', 'Do you need?', 'Will you go?'] },
      { id: 'ha-s2-5-6', type: 'type-answer', question: 'Type "I would like" in Hausa', questionFr: 'Tapez "Je voudrais" en Hausa', correctAnswer: 'Ina so' },
      { id: 'ha-s2-5-7', type: 'multiple-choice', question: 'How do you say "Can you help me?"', questionFr: 'Comment dit-on "Peux-tu m\'aider?"?', correctAnswer: 'Zaka iya taimaka min?', options: ['Zaka iya taimaka min?', 'Don Allah taimaka', 'Ina bukata taimaka', 'Na gode taimaka'] },
      { id: 'ha-s2-5-8', type: 'multiple-choice', question: '"Ina neman" means:', questionFr: '"Ina neman" signifie:', correctAnswer: 'I am looking for', options: ['I am looking for', 'I need', 'I want', 'I like'] },
      { id: 'ha-s2-5-9', type: 'type-answer', question: 'Type "Can you?" in Hausa', questionFr: 'Tapez "Peux-tu?" en Hausa', correctAnswer: 'Zaka iya?' },
      { id: 'ha-s2-5-10', type: 'multiple-choice', question: '"Ina so" means:', questionFr: '"Ina so" signifie:', correctAnswer: 'I want / I would like', options: ['I want / I would like', 'I need', 'I have', 'I am looking for'] },
      { id: 'ha-s2-5-11', type: 'multiple-choice', question: 'How do you say "I am looking for..."?', questionFr: 'Comment dit-on "Je cherche..."?', correctAnswer: 'Ina neman...', options: ['Ina neman...', 'Ina so...', 'Ina bukata...', 'Don Allah...'] },
      { id: 'ha-s2-5-12', type: 'type-answer', question: 'Type "I am looking for" in Hausa', questionFr: 'Tapez "Je cherche" en Hausa', correctAnswer: 'Ina neman' },
      { id: 'ha-s2-5-13', type: 'multiple-choice', question: 'To say "I want water" in Hausa:', questionFr: 'Pour dire "Je veux de l\'eau" en Hausa:', correctAnswer: 'Ina so ruwa', options: ['Ina so ruwa', 'Ina bukata ruwa', 'Don Allah ruwa', 'Na gode ruwa'] },
      { id: 'ha-s2-5-14', type: 'multiple-choice', question: 'What does "Don Allah, ka taimaka" mean?', questionFr: 'Que signifie "Don Allah, ka taimaka"?', correctAnswer: 'Please, help me', options: ['Please, help me', 'Thank you, help', 'Welcome, help me', 'Sorry, help me'] },
      { id: 'ha-s2-5-15', type: 'type-answer', question: 'Type "Please, can you help me?" in Hausa', questionFr: 'Tapez "S\'il vous plaît, peux-tu m\'aider?" en Hausa', correctAnswer: 'Don Allah, zaka iya taimaka min?' },
      { id: 'ha-s2-5-16', type: 'multiple-choice', question: 'Which phrase means "I need"?', questionFr: 'Quelle expression signifie "J\'ai besoin"?', correctAnswer: 'Ina bukata', options: ['Ina bukata', 'Ina so', 'Ina neman', 'Zaka iya?'] },
      { id: 'ha-s2-5-17', type: 'type-answer', question: 'Type "I want food" in Hausa', questionFr: 'Tapez "Je veux de la nourriture" en Hausa', correctAnswer: 'Ina so abinci' },
      { id: 'ha-s2-5-18', type: 'multiple-choice', question: '"Yi min" means:', questionFr: '"Yi min" signifie:', correctAnswer: 'Do for me / Give me', options: ['Do for me / Give me', 'Help me', 'Come to me', 'Talk to me'] },
      { id: 'ha-s2-5-19', type: 'type-answer', question: 'Type "I need water" in Hausa', questionFr: 'Tapez "J\'ai besoin d\'eau" en Hausa', correctAnswer: 'Ina bukata ruwa' },
      { id: 'ha-s2-5-20', type: 'multiple-choice', question: 'How do you say "Please give me" in Hausa?', questionFr: 'Comment dit-on "Donne-moi s\'il te plaît" en Hausa?', correctAnswer: 'Don Allah, ba ni', options: ['Don Allah, ba ni', 'Na gode, ba ni', 'Madalla, ba ni', 'Sannu, ba ni'] }
    ]
  },

  // Stage 2, Unit 6: Compliments & Encouragement
  {
    id: 'ha-s2-6',
    type: 'vocabulary',
    title: 'Compliments & Encouragement',
    titleFr: 'Compliments et encouragement',
    xpReward: 10,
    exercises: [
      { id: 'ha-s2-6-1', type: 'multiple-choice', question: 'How do you say "Nice / Good" in Hausa?', questionFr: 'Comment dit-on "Bien / Bon" en Hausa?', correctAnswer: 'Da kyau', options: ['Da kyau', 'Madalla', 'Kyau sosai', 'Ina murna'] },
      { id: 'ha-s2-6-2', type: 'multiple-choice', question: 'What does "Madalla" mean?', questionFr: 'Que signifie "Madalla"?', correctAnswer: 'Well done / Excellent', options: ['Well done / Excellent', 'Thank you', 'Please', 'Good'] },
      { id: 'ha-s2-6-3', type: 'type-answer', question: 'Type "Well done" in Hausa', questionFr: 'Tapez "Bravo" en Hausa', correctAnswer: 'Madalla' },
      { id: 'ha-s2-6-4', type: 'multiple-choice', question: 'How do you say "Very good" in Hausa?', questionFr: 'Comment dit-on "Très bien" en Hausa?', correctAnswer: 'Kyau sosai', options: ['Kyau sosai', 'Da kyau', 'Madalla', 'Ina murna'] },
      { id: 'ha-s2-6-5', type: 'multiple-choice', question: 'What does "Kyakkyawa" mean?', questionFr: 'Que signifie "Kyakkyawa"?', correctAnswer: 'Beautiful (person)', options: ['Beautiful (person)', 'Well done', 'Excellent', 'Good'] },
      { id: 'ha-s2-6-6', type: 'type-answer', question: 'Type "You did well" in Hausa', questionFr: 'Tapez "Tu as bien fait" en Hausa', correctAnswer: 'Ka yi kyau' },
      { id: 'ha-s2-6-7', type: 'multiple-choice', question: '"Madalla" is used to express:', questionFr: '"Madalla" est utilisé pour exprimer:', correctAnswer: 'Praise / Excellent work', options: ['Praise / Excellent work', 'Gratitude', 'Apology', 'Greeting'] },
      { id: 'ha-s2-6-8', type: 'multiple-choice', question: 'How do you say "You are smart"?', questionFr: 'Comment dit-on "Tu es intelligent(e)"?', correctAnswer: 'Kana da wayo', options: ['Kana da wayo', 'Ka yi kyau', 'Da kyau', 'Madalla'] },
      { id: 'ha-s2-6-9', type: 'type-answer', question: 'Type "Very good" in Hausa', questionFr: 'Tapez "Très bien" en Hausa', correctAnswer: 'Kyau sosai' },
      { id: 'ha-s2-6-10', type: 'multiple-choice', question: '"Kana da wayo" means:', questionFr: '"Kana da wayo" signifie:', correctAnswer: 'You are smart / clever', options: ['You are smart / clever', 'You did well', 'You are beautiful', 'You are good'] },
      { id: 'ha-s2-6-11', type: 'multiple-choice', question: 'How do you compliment something as "nice"?', questionFr: 'Comment complimenter quelque chose de "bien"?', correctAnswer: 'Da kyau', options: ['Da kyau', 'Madalla', 'Ina murna', 'Kyakkyawa'] },
      { id: 'ha-s2-6-12', type: 'type-answer', question: 'Type "Beautiful" (person) in Hausa', questionFr: 'Tapez "Beau / Belle" (personne) en Hausa', correctAnswer: 'Kyakkyawa' },
      { id: 'ha-s2-6-13', type: 'multiple-choice', question: '"Ina murna" means:', questionFr: '"Ina murna" signifie:', correctAnswer: 'I am happy / pleased', options: ['I am happy / pleased', 'I am sad', 'I am tired', 'I am ready'] },
      { id: 'ha-s2-6-14', type: 'multiple-choice', question: 'How do you say "I am happy"?', questionFr: 'Comment dit-on "Je suis heureux"?', correctAnswer: 'Ina murna', options: ['Ina murna', 'Da kyau', 'Madalla', 'Kana da wayo'] },
      { id: 'ha-s2-6-15', type: 'type-answer', question: 'Type "I am happy" in Hausa', questionFr: 'Tapez "Je suis heureux" en Hausa', correctAnswer: 'Ina murna' },
      { id: 'ha-s2-6-16', type: 'multiple-choice', question: 'How do you say "Excellent"?', questionFr: 'Comment dit-on "Excellent"?', correctAnswer: 'Madalla', options: ['Madalla', 'Da kyau', 'Kyau sosai', 'Ina murna'] },
      { id: 'ha-s2-6-17', type: 'type-answer', question: 'Type "Good / Nice" in Hausa', questionFr: 'Tapez "Bon / Bien" en Hausa', correctAnswer: 'Da kyau' },
      { id: 'ha-s2-6-18', type: 'multiple-choice', question: '"Ka yi kyau" means:', questionFr: '"Ka yi kyau" signifie:', correctAnswer: 'You did well', options: ['You did well', 'You are smart', 'You are beautiful', 'You are happy'] },
      { id: 'ha-s2-6-19', type: 'type-answer', question: 'Type "You are smart" in Hausa', questionFr: 'Tapez "Tu es intelligent(e)" en Hausa', correctAnswer: 'Kana da wayo' },
      { id: 'ha-s2-6-20', type: 'multiple-choice', question: 'Which phrase means "You are smart / clever"?', questionFr: 'Quelle expression signifie "Tu es intelligent / habile"?', correctAnswer: 'Kana da wayo', options: ['Kana da wayo', 'Ka yi kyau', 'Madalla', 'Da kyau'] }
    ]
  },

  // Stage 2, Unit 7: Polite Speech Review
  {
    id: 'ha-s2-7',
    type: 'vocabulary',
    title: 'Polite Speech Review',
    titleFr: 'Révision: discours poli',
    xpReward: 15,
    exercises: [
      { id: 'ha-s2-7-1', type: 'multiple-choice', question: 'How do you say "Please" in Hausa?', questionFr: 'Comment dit-on "S\'il vous plaît" en Hausa?', correctAnswer: 'Don Allah', options: ['Don Allah', 'Na gode', 'Yi haƙuri', 'Ee'] },
      { id: 'ha-s2-7-2', type: 'multiple-choice', question: 'What does "Na gode" mean?', questionFr: 'Que signifie "Na gode"?', correctAnswer: 'Thank you', options: ['Thank you', 'Sorry', 'Welcome', 'Please'] },
      { id: 'ha-s2-7-3', type: 'type-answer', question: 'Type "Sorry / Be patient" in Hausa', questionFr: 'Tapez "Désolé / Soyez patient" en Hausa', correctAnswer: 'Yi haƙuri' },
      { id: 'ha-s2-7-4', type: 'multiple-choice', question: '"Babu laifi" means:', questionFr: '"Babu laifi" signifie:', correctAnswer: 'No problem / You\'re welcome', options: ['No problem / You\'re welcome', 'Thank you', 'Please', 'Sorry'] },
      { id: 'ha-s2-7-5', type: 'multiple-choice', question: 'How do you say "Yes"?', questionFr: 'Comment dit-on "Oui"?', correctAnswer: 'Ee', options: ['Ee', 'A\'a', 'Daidai', 'Tabbas'] },
      { id: 'ha-s2-7-6', type: 'multiple-choice', question: '"A\'a" means:', questionFr: '"A\'a" signifie:', correctAnswer: 'No', options: ['No', 'Yes', 'Maybe', 'Sorry'] },
      { id: 'ha-s2-7-7', type: 'type-answer', question: 'Type "Welcome" in Hausa', questionFr: 'Tapez "Bienvenue" en Hausa', correctAnswer: 'Barka da zuwa' },
      { id: 'ha-s2-7-8', type: 'multiple-choice', question: 'How do you say "I would like"?', questionFr: 'Comment dit-on "Je voudrais"?', correctAnswer: 'Ina so', options: ['Ina so', 'Ina bukata', 'Ina neman', 'Zaka iya?'] },
      { id: 'ha-s2-7-9', type: 'type-answer', question: 'Type "Well done / Excellent" in Hausa', questionFr: 'Tapez "Bravo / Excellent" en Hausa', correctAnswer: 'Madalla' },
      { id: 'ha-s2-7-10', type: 'multiple-choice', question: '"Daidai" means:', questionFr: '"Daidai" signifie:', correctAnswer: 'Correct / Right', options: ['Correct / Right', 'Maybe', 'No', 'Sorry'] },
      { id: 'ha-s2-7-11', type: 'multiple-choice', question: 'How do you say "Forgive me"?', questionFr: 'Comment dit-on "Pardonne-moi"?', correctAnswer: 'Gafara da ni', options: ['Gafara da ni', 'Yi haƙuri', 'Babu laifi', 'Don Allah'] },
      { id: 'ha-s2-7-12', type: 'type-answer', question: 'Type "Sit down" in Hausa', questionFr: 'Tapez "Assieds-toi" en Hausa', correctAnswer: 'Zauna' },
      { id: 'ha-s2-7-13', type: 'multiple-choice', question: '"Watakila" means:', questionFr: '"Watakila" signifie:', correctAnswer: 'Maybe / Perhaps', options: ['Maybe / Perhaps', 'Of course', 'Correct', 'Sorry'] },
      { id: 'ha-s2-7-14', type: 'multiple-choice', question: 'How do you say "Come in"?', questionFr: 'Comment dit-on "Entrez"?', correctAnswer: 'Ka shiga', options: ['Ka shiga', 'Zauna', 'Ka yi ta gida', 'Barka da zuwa'] },
      { id: 'ha-s2-7-15', type: 'type-answer', question: 'Type "Thank you very much" in Hausa', questionFr: 'Tapez "Merci beaucoup" en Hausa', correctAnswer: 'Na gode ƙwarai' },
      { id: 'ha-s2-7-16', type: 'multiple-choice', question: '"Yi haƙuri" means:', questionFr: '"Yi haƙuri" signifie:', correctAnswer: 'Sorry / Be patient', options: ['Sorry / Be patient', 'Thank you', 'Welcome', 'Of course'] },
      { id: 'ha-s2-7-17', type: 'multiple-choice', question: 'How do you say "I am happy"?', questionFr: 'Comment dit-on "Je suis heureux"?', correctAnswer: 'Ina murna', options: ['Ina murna', 'Da kyau', 'Madalla', 'Kana da wayo'] },
      { id: 'ha-s2-7-18', type: 'type-answer', question: 'Type "I need" in Hausa', questionFr: 'Tapez "J\'ai besoin" en Hausa', correctAnswer: 'Ina bukata' },
      { id: 'ha-s2-7-19', type: 'multiple-choice', question: '"Tabbas" means:', questionFr: '"Tabbas" signifie:', correctAnswer: 'Of course / Certainly', options: ['Of course / Certainly', 'Maybe', 'No', 'Correct'] },
      { id: 'ha-s2-7-20', type: 'multiple-choice', question: 'What is "You\'re welcome" in Hausa?', questionFr: 'Qu\'est-ce que "De rien" en Hausa?', correctAnswer: 'Babu laifi', options: ['Babu laifi', 'Na gode ƙwarai', 'Don Allah', 'Madalla'] }
    ]
  }
];
