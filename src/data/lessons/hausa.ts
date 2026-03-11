import { Lesson } from '../types';

export const hausaLessons: Lesson[] = [
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

  // STAGE 2 - MISSION 8: USEFUL EXPRESSIONS (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-8',
    type: 'vocabulary',
    title: 'Useful Expressions',
    titleFr: 'Expressions utiles',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'ha-v141',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t understand" in Hausa?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Hausa?',
        correctAnswer: 'Ban gane ba',
        options: ['Ban gane ba', 'Ban sani ba', 'Ba na so ba', 'Ba zan tafi ba']
      },
      {
        id: 'ha-v142',
        type: 'multiple-choice',
        question: 'What does "Ban gane ba" mean?',
        questionFr: 'Que signifie "Ban gane ba"?',
        correctAnswer: 'I don\'t understand',
        options: ['I don\'t understand', 'I don\'t know', 'I don\'t want', 'I won\'t go']
      },
      {
        id: 'ha-v143',
        type: 'type-answer',
        question: 'Type "I don\'t know" in Hausa',
        questionFr: 'Tapez "Je ne sais pas" en Hausa',
        correctAnswer: 'Ban sani ba'
      },
      {
        id: 'ha-v144',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t want" in Hausa?',
        questionFr: 'Comment dit-on "Je ne veux pas" en Hausa?',
        correctAnswer: 'Ba na so ba',
        options: ['Ba na so ba', 'Ban gane ba', 'Ban sani ba', 'Ba zan tafi ba']
      },
      {
        id: 'ha-v145',
        type: 'multiple-choice',
        question: '"Ba na so ba" means:',
        questionFr: '"Ba na so ba" signifie:',
        correctAnswer: 'I don\'t want',
        options: ['I don\'t want', 'I don\'t understand', 'I don\'t know', 'I won\'t go']
      },
      {
        id: 'ha-v146',
        type: 'type-answer',
        question: 'Type "I can\'t" in Hausa',
        questionFr: 'Tapez "Je ne peux pas" en Hausa',
        correctAnswer: 'Ba zan iya ba'
      },
      {
        id: 'ha-v147',
        type: 'multiple-choice',
        question: 'How do you say "I can" in Hausa?',
        questionFr: 'Comment dit-on "Je peux" en Hausa?',
        correctAnswer: 'Zan iya',
        options: ['Zan iya', 'Ba zan iya ba', 'Ba na so ba', 'Ban gane ba']
      },
      {
        id: 'ha-v148',
        type: 'multiple-choice',
        question: 'What does "Zan iya" mean?',
        questionFr: 'Que signifie "Zan iya"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'ha-v149',
        type: 'type-answer',
        question: 'Type "I will" in Hausa',
        questionFr: 'Tapez "Je vais" en Hausa',
        correctAnswer: 'Zan'
      },
      {
        id: 'ha-v150',
        type: 'multiple-choice',
        question: 'How do you say "I won\'t" in Hausa?',
        questionFr: 'Comment dit-on "Je ne vais pas" en Hausa?',
        correctAnswer: 'Ba zan ba',
        options: ['Ba zan ba', 'Zan', 'Zan iya', 'Ba zan iya ba']
      },
      {
        id: 'ha-v151',
        type: 'multiple-choice',
        question: '"Ba zan ba" means:',
        questionFr: '"Ba zan ba" signifie:',
        correctAnswer: 'I won\'t',
        options: ['I won\'t', 'I will', 'I can', 'I can\'t']
      },
      {
        id: 'ha-v152',
        type: 'type-answer',
        question: 'Type "I have" in Hausa',
        questionFr: 'Tapez "J\'ai" en Hausa',
        correctAnswer: 'Ina da'
      },
      {
        id: 'ha-v153',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Hausa?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Hausa?',
        correctAnswer: 'Ba ni da',
        options: ['Ba ni da', 'Ina da', 'Ba na so ba', 'Ban gane ba']
      },
      {
        id: 'ha-v154',
        type: 'multiple-choice',
        question: 'What does "Ba ni da" mean?',
        questionFr: 'Que signifie "Ba ni da"?',
        correctAnswer: 'I don\'t have',
        options: ['I don\'t have', 'I have', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'ha-v155',
        type: 'type-answer',
        question: 'Type "I like" in Hausa',
        questionFr: 'Tapez "J\'aime" en Hausa',
        correctAnswer: 'Ina so'
      },
      {
        id: 'ha-v156',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t like" in Hausa?',
        questionFr: 'Comment dit-on "Je n\'aime pas" en Hausa?',
        correctAnswer: 'Ba na so ba',
        options: ['Ba na so ba', 'Ina so', 'Ba ni da', 'Ina da']
      },
      {
        id: 'ha-v157',
        type: 'multiple-choice',
        question: 'What does "Ba na so ba" mean?',
        questionFr: 'Que signifie "Ba na so ba"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'ha-v158',
        type: 'type-answer',
        question: 'Type "I love" in Hausa',
        questionFr: 'Tapez "J\'aime beaucoup" en Hausa',
        correctAnswer: 'Ina son'
      },
      {
        id: 'ha-v159',
        type: 'multiple-choice',
        question: 'How do you say "I hate" in Hausa?',
        questionFr: 'Comment dit-on "Je déteste" en Hausa?',
        correctAnswer: 'Ina ƙi',
        options: ['Ina ƙi', 'Ina son', 'Ba na so ba', 'Ina so']
      },
      {
        id: 'ha-v160',
        type: 'multiple-choice',
        question: 'What does "Ina ƙi" mean?',
        questionFr: 'Que signifie "Ina ƙi"?',
        correctAnswer: 'I hate',
        options: ['I hate', 'I love', 'I don\'t like', 'I like']
      }
    ]
  },

  // STAGE 2 - MISSION 9: BUILDING SENTENCES (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-9',
    type: 'vocabulary',
    title: 'Building Sentences',
    titleFr: 'Construction de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'ha-v161',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ abinci" (I am eating food)',
        questionFr: 'Compléter: "Ina ___ abinci" (Je mange de la nourriture)',
        correctAnswer: 'ci',
        options: ['ci', 'dafa', 'tafiya', 'koyo']
      },
      {
        id: 'ha-v162',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ ruwa" (I am drinking water)',
        questionFr: 'Compléter: "Ina ___ ruwa" (Je bois de l\'eau)',
        correctAnswer: 'sha',
        options: ['sha', 'ci', 'dafa', 'tafiya']
      },
      {
        id: 'ha-v163',
        type: 'type-answer',
        question: 'Complete: "Ina ___ aiki" (I am going to work)',
        questionFr: 'Compléter: "Ina ___ aiki" (Je vais au travail)',
        correctAnswer: 'tafiya'
      },
      {
        id: 'ha-v164',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ Hausa" (I am learning Hausa)',
        questionFr: 'Compléter: "Ina ___ Hausa" (J\'apprends le Hausa)',
        correctAnswer: 'koyo',
        options: ['koyo', 'tafiya', 'ci', 'dafa']
      },
      {
        id: 'ha-v165',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ abinci" (I am cooking food)',
        questionFr: 'Compléter: "Ina ___ abinci" (Je cuisine de la nourriture)',
        correctAnswer: 'dafa',
        options: ['dafa', 'koyo', 'tafiya', 'ci']
      },
      {
        id: 'ha-v166',
        type: 'type-answer',
        question: 'Complete: "Ina ___ littafi" (I am reading a book)',
        questionFr: 'Compléter: "Ina ___ littafi" (Je lis un livre)',
        correctAnswer: 'karatu'
      },
      {
        id: 'ha-v167',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ wani abu" (I am writing something)',
        questionFr: 'Compléter: "Ina ___ wani abu" (J\'écris quelque chose)',
        correctAnswer: 'rubutu',
        options: ['rubutu', 'karatu', 'dafa', 'koyo']
      },
      {
        id: 'ha-v168',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ waka" (I am playing music)',
        questionFr: 'Compléter: "Ina ___ waka" (Je joue de la musique)',
        correctAnswer: 'wasa',
        options: ['wasa', 'rubutu', 'karatu', 'dafa']
      },
      {
        id: 'ha-v169',
        type: 'type-answer',
        question: 'Complete: "Ina ___ gida" (I am cleaning the house)',
        questionFr: 'Compléter: "Ina ___ gida" (Je nettoie la maison)',
        correctAnswer: 'tsaftace'
      },
      {
        id: 'ha-v170',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ tufafi" (I am washing clothes)',
        questionFr: 'Compléter: "Ina ___ tufafi" (Je lave les vêtements)',
        correctAnswer: 'wanke',
        options: ['wanke', 'tsaftace', 'wasa', 'rubutu']
      },
      {
        id: 'ha-v171',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ gida" (I am at home)',
        questionFr: 'Compléter: "Ina ___ gida" (Je suis à la maison)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      },
      {
        id: 'ha-v172',
        type: 'type-answer',
        question: 'Complete: "Ina ___ gida" (I am coming home)',
        questionFr: 'Compléter: "Ina ___ gida" (Je rentre à la maison)',
        correctAnswer: 'zuwa'
      },
      {
        id: 'ha-v173',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ gida" (I am leaving home)',
        questionFr: 'Compléter: "Ina ___ gida" (Je quitte la maison)',
        correctAnswer: 'fita',
        options: ['fita', 'zuwa', 'zaune', 'tafiya']
      },
      {
        id: 'ha-v174',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ aiki" (I am at work)',
        questionFr: 'Compléter: "Ina ___ aiki" (Je suis au travail)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      },
      {
        id: 'ha-v175',
        type: 'type-answer',
        question: 'Complete: "Ina ___ makaranta" (I am at school)',
        questionFr: 'Compléter: "Ina ___ makaranta" (Je suis à l\'école)',
        correctAnswer: 'zaune'
      },
      {
        id: 'ha-v176',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ kasuwa" (I am at the market)',
        questionFr: 'Compléter: "Ina ___ kasuwa" (Je suis au marché)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      },
      {
        id: 'ha-v177',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ asibiti" (I am at the hospital)',
        questionFr: 'Compléter: "Ina ___ asibiti" (Je suis à l\'hôpital)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      },
      {
        id: 'ha-v178',
        type: 'type-answer',
        question: 'Complete: "Ina ___ coci" (I am at church)',
        questionFr: 'Compléter: "Ina ___ coci" (Je suis à l\'église)',
        correctAnswer: 'zaune'
      },
      {
        id: 'ha-v179',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ ofis" (I am at the office)',
        questionFr: 'Compléter: "Ina ___ ofis" (Je suis au bureau)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      },
      {
        id: 'ha-v180',
        type: 'multiple-choice',
        question: 'Complete: "Ina ___ gida" (I am at home)',
        questionFr: 'Compléter: "Ina ___ gida" (Je suis à la maison)',
        correctAnswer: 'zaune',
        options: ['zaune', 'tafiya', 'zuwa', 'fita']
      }
    ]
  },

  // STAGE 2 - MISSION 10: STAGE 2 REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'ha-vocab-10',
    type: 'vocabulary',
    title: 'Stage 2 Review',
    titleFr: 'Révision étape 2',
    level: 2,
    xpReward: 20,
    exercises: [
      {
        id: 'ha-v181',
        type: 'multiple-choice',
        question: 'What does "Ina tashi" mean?',
        questionFr: 'Que signifie "Ina tashi"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'ha-v182',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Hausa?',
        questionFr: 'Comment dit-on "J\'ai faim" en Hausa?',
        correctAnswer: 'Yunwa tana ci ni',
        options: ['Yunwa tana ci ni', 'Kishirwa tana ci ni', 'Gajiya tana ci ni', 'Zafi yana ci ni']
      },
      {
        id: 'ha-v183',
        type: 'type-answer',
        question: 'Type "I don\'t understand" in Hausa',
        questionFr: 'Tapez "Je ne comprends pas" en Hausa',
        correctAnswer: 'Ban gane ba'
      },
      {
        id: 'ha-v184',
        type: 'multiple-choice',
        question: 'What does "Zan iya" mean?',
        questionFr: 'Que signifie "Zan iya"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'ha-v185',
        type: 'multiple-choice',
        question: 'How do you say "I like" in Hausa?',
        questionFr: 'Comment dit-on "J\'aime" en Hausa?',
        correctAnswer: 'Ina so',
        options: ['Ina so', 'Ba na so ba', 'Ina da', 'Ba ni da']
      },
      {
        id: 'ha-v186',
        type: 'type-answer',
        question: 'Type "I am cooking food" in Hausa',
        questionFr: 'Tapez "Je cuisine de la nourriture" en Hausa',
        correctAnswer: 'Ina dafa abinci'
      },
      {
        id: 'ha-v187',
        type: 'multiple-choice',
        question: 'What does "Ina karatu littafi" mean?',
        questionFr: 'Que signifie "Ina karatu littafi"?',
        correctAnswer: 'I am reading a book',
        options: ['I am reading a book', 'I am writing something', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'ha-v188',
        type: 'multiple-choice',
        question: 'How do you say "I am at home" in Hausa?',
        questionFr: 'Comment dit-on "Je suis à la maison" en Hausa?',
        correctAnswer: 'Ina zaune gida',
        options: ['Ina zaune gida', 'Ina tafiya gida', 'Ina zuwa gida', 'Ina fita gida']
      },
      {
        id: 'ha-v189',
        type: 'type-answer',
        question: 'Type "I am happy" in Hausa',
        questionFr: 'Tapez "Je suis heureux" en Hausa',
        correctAnswer: 'Ina farin ciki'
      },
      {
        id: 'ha-v190',
        type: 'multiple-choice',
        question: 'What does "Ina aiki" mean?',
        questionFr: 'Que signifie "Ina aiki"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'ha-v191',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Hausa?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Hausa?',
        correctAnswer: 'Ba ni da',
        options: ['Ba ni da', 'Ina da', 'Ba na so ba', 'Ban gane ba']
      },
      {
        id: 'ha-v192',
        type: 'type-answer',
        question: 'Type "I am washing clothes" in Hausa',
        questionFr: 'Tapez "Je lave les vêtements" en Hausa',
        correctAnswer: 'Ina wanke tufafi'
      },
      {
        id: 'ha-v193',
        type: 'multiple-choice',
        question: 'What does "Ba na so ba" mean?',
        questionFr: 'Que signifie "Ba na so ba"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'ha-v194',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Hausa?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Hausa?',
        correctAnswer: 'Gajiya tana ci ni',
        options: ['Gajiya tana ci ni', 'Yunwa tana ci ni', 'Kishirwa tana ci ni', 'Zafi yana ci ni']
      },
      {
        id: 'ha-v195',
        type: 'type-answer',
        question: 'Type "I am coming home" in Hausa',
        questionFr: 'Tapez "Je rentre à la maison" en Hausa',
        correctAnswer: 'Ina zuwa gida'
      },
      {
        id: 'ha-v196',
        type: 'multiple-choice',
        question: 'What does "Ina rubutu wani abu" mean?',
        questionFr: 'Que signifie "Ina rubutu wani abu"?',
        correctAnswer: 'I am writing something',
        options: ['I am writing something', 'I am reading a book', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'ha-v197',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Hausa?',
        questionFr: 'Comment dit-on "Je suis prêt" en Hausa?',
        correctAnswer: 'Ina shirye',
        options: ['Ina shirye', 'Ba ni da aiki', 'Ina aiki', 'Lafiya lau']
      },
      {
        id: 'ha-v198',
        type: 'type-answer',
        question: 'Type "I am at school" in Hausa',
        questionFr: 'Tapez "Je suis à l\'école" en Hausa',
        correctAnswer: 'Ina zaune makaranta'
      },
      {
        id: 'ha-v199',
        type: 'multiple-choice',
        question: 'What does "Ina son" mean?',
        questionFr: 'Que signifie "Ina son"?',
        correctAnswer: 'I love',
        options: ['I love', 'I hate', 'I don\'t like', 'I like']
      },
      {
        id: 'ha-v200',
        type: 'multiple-choice',
        question: 'How do you say "I am at the market" in Hausa?',
        questionFr: 'Comment dit-on "Je suis au marché" en Hausa?',
        correctAnswer: 'Ina zaune kasuwa',
        options: ['Ina zaune kasuwa', 'Ina tafiya kasuwa', 'Ina zuwa kasuwa', 'Ina fita kasuwa']
      }
    ]
  }
];