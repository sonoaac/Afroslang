import { Lesson } from '../types';

export const zuluLessons: Lesson[] = [
  // STAGE 1 - MISSION 1: GREETINGS (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-1',
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'zu-v1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Zulu?',
        questionFr: 'Comment dit-on "Bonjour" en Zulu?',
        correctAnswer: 'Sawubona',
        options: ['Sawubona', 'Hamba kahle', 'Ngiyabonga', 'Ngiyacela']
      },
      {
        id: 'zu-v2',
        type: 'multiple-choice',
        question: 'What does "Sawubona" mean?',
        questionFr: 'Que signifie "Sawubona"?',
        correctAnswer: 'Hello',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please']
      },
      {
        id: 'zu-v3',
        type: 'type-answer',
        question: 'Type the Zulu word for "Goodbye"',
        questionFr: 'Tapez le mot Zulu pour "Au revoir"',
        correctAnswer: 'Hamba kahle'
      },
      {
        id: 'zu-v4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Zulu?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Zulu?',
        correctAnswer: 'Sawubona',
        options: ['Sawubona', 'Lala kahle', 'Hamba kahle', 'Ngiyabonga']
      },
      {
        id: 'zu-v5',
        type: 'multiple-choice',
        question: '"Sawubona" means:',
        questionFr: '"Sawubona" signifie:',
        correctAnswer: 'Hello/Good morning',
        options: ['Hello/Good morning', 'Good afternoon', 'Good evening', 'Goodbye']
      },
      {
        id: 'zu-v6',
        type: 'multiple-choice',
        question: 'How do you say "Good evening" in Zulu?',
        questionFr: 'Comment dit-on "Bonsoir" en Zulu?',
        correctAnswer: 'Lala kahle',
        options: ['Lala kahle', 'Sawubona', 'Hamba kahle', 'Ngiyabonga']
      },
      {
        id: 'zu-v7',
        type: 'type-answer',
        question: 'Type "Good night" in Zulu',
        questionFr: 'Tapez "Bonne nuit" en Zulu',
        correctAnswer: 'Lala kahle'
      },
      {
        id: 'zu-v8',
        type: 'multiple-choice',
        question: 'What does "Unjani?" mean?',
        questionFr: 'Que signifie "Unjani?"?',
        correctAnswer: 'How are you?',
        options: ['How are you?', 'What is your name?', 'Where are you?', 'How old are you?']
      },
      {
        id: 'zu-v9',
        type: 'multiple-choice',
        question: 'How do you respond to "Unjani?"',
        questionFr: 'Comment répondre à "Unjani?"?',
        correctAnswer: 'Ngikhona',
        options: ['Ngikhona', 'Igama lami ngu...', 'Ngivela...', 'Ngineminyaka...']
      },
      {
        id: 'zu-v10',
        type: 'type-answer',
        question: 'Type "I am fine" in Zulu',
        questionFr: 'Tapez "Je vais bien" en Zulu',
        correctAnswer: 'Ngikhona'
      },
      {
        id: 'zu-v11',
        type: 'multiple-choice',
        question: 'What is "Welcome" in Zulu?',
        questionFr: 'Comment dit-on "Bienvenue" en Zulu?',
        correctAnswer: 'Siyakwamukela',
        options: ['Siyakwamukela', 'Sawubona', 'Ngiyabonga', 'Ngiyacela']
      },
      {
        id: 'zu-v12',
        type: 'multiple-choice',
        question: '"Siyakwamukela" means:',
        questionFr: '"Siyakwamukela" signifie:',
        correctAnswer: 'Welcome',
        options: ['Hello', 'Welcome', 'Thank you', 'Goodbye']
      },
      {
        id: 'zu-v13',
        type: 'type-answer',
        question: 'Type "See you later" in Zulu',
        questionFr: 'Tapez "À bientôt" en Zulu',
        correctAnswer: 'Sizobonana'
      },
      {
        id: 'zu-v14',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Zulu?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Zulu?',
        correctAnswer: 'Kuhle ukuhlangana nawe',
        options: ['Kuhle ukuhlangana nawe', 'Sawubona', 'Hamba kahle', 'Ngiyabonga']
      },
      {
        id: 'zu-v15',
        type: 'multiple-choice',
        question: 'What does "Kuhle ukuhlangana nawe" mean?',
        questionFr: 'Que signifie "Kuhle ukuhlangana nawe"?',
        correctAnswer: 'Nice to meet you',
        options: ['Nice to meet you', 'How are you?', 'What is your name?', 'Where are you from?']
      },
      {
        id: 'zu-v16',
        type: 'type-answer',
        question: 'Type "Excuse me" in Zulu',
        questionFr: 'Tapez "Excusez-moi" en Zulu',
        correctAnswer: 'Uxolo'
      },
      {
        id: 'zu-v17',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Zulu?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngiyacela',
        options: ['Ngiyacela', 'Ngiyabonga', 'Sawubona', 'Hamba kahle']
      },
      {
        id: 'zu-v18',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Zulu?',
        questionFr: 'Comment dit-on "Désolé" en Zulu?',
        correctAnswer: 'Uxolo',
        options: ['Uxolo', 'Ngiyacela', 'Ngiyabonga', 'Sawubona']
      },
      {
        id: 'zu-v19',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Zulu',
        questionFr: 'Tapez "Merci beaucoup" en Zulu',
        correctAnswer: 'Ngiyabonga kakhulu'
      },
      {
        id: 'zu-v20',
        type: 'multiple-choice',
        question: 'How do you say "You\'re welcome" in Zulu?',
        questionFr: 'Comment dit-on "De rien" en Zulu?',
        correctAnswer: 'Wamukelekile',
        options: ['Wamukelekile', 'Sawubona', 'Hamba kahle', 'Ngiyabonga']
      }
    ]
  },

  // STAGE 1 - MISSION 2: COMMON PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-2',
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'zu-v21',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Zulu?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Zulu?',
        correctAnswer: 'Ubani igama lakho?',
        options: ['Ubani igama lakho?', 'Unjani?', 'Uhlala kuphi?', 'Uneminyaka emingaki?']
      },
      {
        id: 'zu-v22',
        type: 'multiple-choice',
        question: 'What does "Ubani igama lakho?" mean?',
        questionFr: 'Que signifie "Ubani igama lakho?"?',
        correctAnswer: 'What is your name?',
        options: ['What is your name?', 'How are you?', 'Where do you live?', 'How old are you?']
      },
      {
        id: 'zu-v23',
        type: 'type-answer',
        question: 'Type "My name is..." in Zulu',
        questionFr: 'Tapez "Je m\'appelle..." en Zulu',
        correctAnswer: 'Igama lami ngu...'
      },
      {
        id: 'zu-v24',
        type: 'multiple-choice',
        question: 'How do you say "Where are you from?" in Zulu?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Zulu?',
        correctAnswer: 'Uvela kuphi?',
        options: ['Uvela kuphi?', 'Ubani igama lakho?', 'Unjani?', 'Uhlala kuphi?']
      },
      {
        id: 'zu-v25',
        type: 'multiple-choice',
        question: '"Uvela kuphi?" means:',
        questionFr: '"Uvela kuphi?" signifie:',
        correctAnswer: 'Where are you from?',
        options: ['Where are you from?', 'Where do you live?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'zu-v26',
        type: 'type-answer',
        question: 'Type "I am from..." in Zulu',
        questionFr: 'Tapez "Je viens de..." en Zulu',
        correctAnswer: 'Ngivela...'
      },
      {
        id: 'zu-v27',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Zulu?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Zulu?',
        correctAnswer: 'Uneminyaka emingaki?',
        options: ['Uneminyaka emingaki?', 'Ubani igama lakho?', 'Unjani?', 'Uvela kuphi?']
      },
      {
        id: 'zu-v28',
        type: 'multiple-choice',
        question: 'What does "Uneminyaka emingaki?" mean?',
        questionFr: 'Que signifie "Uneminyaka emingaki?"?',
        correctAnswer: 'How old are you?',
        options: ['How old are you?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'zu-v29',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Zulu',
        questionFr: 'Tapez "J\'ai ... ans" en Zulu',
        correctAnswer: 'Ngineminyaka...'
      },
      {
        id: 'zu-v30',
        type: 'multiple-choice',
        question: 'How do you say "Where do you live?" in Zulu?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Zulu?',
        correctAnswer: 'Uhlala kuphi?',
        options: ['Uhlala kuphi?', 'Uvela kuphi?', 'Uya kuphi?', 'Ukuphi?']
      },
      {
        id: 'zu-v31',
        type: 'multiple-choice',
        question: '"Uhlala kuphi?" means:',
        questionFr: '"Uhlala kuphi?" signifie:',
        correctAnswer: 'Where do you live?',
        options: ['Where do you live?', 'Where are you from?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'zu-v32',
        type: 'type-answer',
        question: 'Type "I live in..." in Zulu',
        questionFr: 'Tapez "J\'habite à..." en Zulu',
        correctAnswer: 'Ngihlala...'
      },
      {
        id: 'zu-v33',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Zulu?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Zulu?',
        correctAnswer: 'Wenza nini?',
        options: ['Wenza nini?', 'Ubani igama lakho?', 'Unjani?', 'Uvela kuphi?']
      },
      {
        id: 'zu-v34',
        type: 'multiple-choice',
        question: 'What does "Wenza nini?" mean?',
        questionFr: 'Que signifie "Wenza nini?"?',
        correctAnswer: 'What do you do?',
        options: ['What do you do?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'zu-v35',
        type: 'type-answer',
        question: 'Type "I am a student" in Zulu',
        questionFr: 'Tapez "Je suis étudiant" en Zulu',
        correctAnswer: 'Ngingumfundi'
      },
      {
        id: 'zu-v36',
        type: 'multiple-choice',
        question: 'How do you say "I am a teacher" in Zulu?',
        questionFr: 'Comment dit-on "Je suis enseignant" en Zulu?',
        correctAnswer: 'Nginguthisha',
        options: ['Nginguthisha', 'Ngingumfundi', 'Ngingudokotela', 'Ngingumsebenzi']
      },
      {
        id: 'zu-v37',
        type: 'multiple-choice',
        question: 'What does "Nginguthisha" mean?',
        questionFr: 'Que signifie "Nginguthisha"?',
        correctAnswer: 'I am a teacher',
        options: ['I am a teacher', 'I am a student', 'I am a doctor', 'I am a worker']
      },
      {
        id: 'zu-v38',
        type: 'type-answer',
        question: 'Type "I am a doctor" in Zulu',
        questionFr: 'Tapez "Je suis médecin" en Zulu',
        correctAnswer: 'Ngingudokotela'
      },
      {
        id: 'zu-v39',
        type: 'multiple-choice',
        question: 'How do you say "I am learning Zulu" in Zulu?',
        questionFr: 'Comment dit-on "J\'apprends le Zulu" en Zulu?',
        correctAnswer: 'Ngifunda isiZulu',
        options: ['Ngifunda isiZulu', 'Ngifunda isiNgisi', 'Ngifunda isiFulentshi', 'Ngifunda isiArabhu']
      },
      {
        id: 'zu-v40',
        type: 'multiple-choice',
        question: 'What does "Ngifunda isiZulu" mean?',
        questionFr: 'Que signifie "Ngifunda isiZulu"?',
        correctAnswer: 'I am learning Zulu',
        options: ['I am learning Zulu', 'I am learning English', 'I am learning French', 'I am learning Arabic']
      }
    ]
  },

  // STAGE 1 - MISSION 3: BASIC WORDS (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-3',
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'zu-v41',
        type: 'multiple-choice',
        question: 'How do you say "Yes" in Zulu?',
        questionFr: 'Comment dit-on "Oui" en Zulu?',
        correctAnswer: 'Yebo',
        options: ['Yebo', 'Cha', 'Ngiyacela', 'Sawubona']
      },
      {
        id: 'zu-v42',
        type: 'multiple-choice',
        question: 'What does "Yebo" mean?',
        questionFr: 'Que signifie "Yebo"?',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Please', 'Hello']
      },
      {
        id: 'zu-v43',
        type: 'type-answer',
        question: 'Type "No" in Zulu',
        questionFr: 'Tapez "Non" en Zulu',
        correctAnswer: 'Cha'
      },
      {
        id: 'zu-v44',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Zulu?',
        questionFr: 'Comment dit-on "Eau" en Zulu?',
        correctAnswer: 'Amanzi',
        options: ['Amanzi', 'Ukudla', 'Indlu', 'Imali']
      },
      {
        id: 'zu-v45',
        type: 'multiple-choice',
        question: '"Amanzi" means:',
        questionFr: '"Amanzi" signifie:',
        correctAnswer: 'Water',
        options: ['Water', 'Food', 'House', 'Money']
      },
      {
        id: 'zu-v46',
        type: 'type-answer',
        question: 'Type "Food" in Zulu',
        questionFr: 'Tapez "Nourriture" en Zulu',
        correctAnswer: 'Ukudla'
      },
      {
        id: 'zu-v47',
        type: 'multiple-choice',
        question: 'How do you say "House" in Zulu?',
        questionFr: 'Comment dit-on "Maison" en Zulu?',
        correctAnswer: 'Indlu',
        options: ['Indlu', 'Amanzi', 'Ukudla', 'Imali']
      },
      {
        id: 'zu-v48',
        type: 'multiple-choice',
        question: 'What does "Indlu" mean?',
        questionFr: 'Que signifie "Indlu"?',
        correctAnswer: 'House',
        options: ['House', 'Water', 'Food', 'Money']
      },
      {
        id: 'zu-v49',
        type: 'type-answer',
        question: 'Type "Money" in Zulu',
        questionFr: 'Tapez "Argent" en Zulu',
        correctAnswer: 'Imali'
      },
      {
        id: 'zu-v50',
        type: 'multiple-choice',
        question: 'How do you say "Book" in Zulu?',
        questionFr: 'Comment dit-on "Livre" en Zulu?',
        correctAnswer: 'Incwadi',
        options: ['Incwadi', 'Imali', 'Indlu', 'Ukudla']
      },
      {
        id: 'zu-v51',
        type: 'multiple-choice',
        question: '"Incwadi" means:',
        questionFr: '"Incwadi" signifie:',
        correctAnswer: 'Book',
        options: ['Book', 'Money', 'House', 'Food']
      },
      {
        id: 'zu-v52',
        type: 'type-answer',
        question: 'Type "Car" in Zulu',
        questionFr: 'Tapez "Voiture" en Zulu',
        correctAnswer: 'Imoto'
      },
      {
        id: 'zu-v53',
        type: 'multiple-choice',
        question: 'How do you say "Tree" in Zulu?',
        questionFr: 'Comment dit-on "Arbre" en Zulu?',
        correctAnswer: 'Isihlahla',
        options: ['Isihlahla', 'Imoto', 'Incwadi', 'Imali']
      },
      {
        id: 'zu-v54',
        type: 'multiple-choice',
        question: 'What does "Isihlahla" mean?',
        questionFr: 'Que signifie "Isihlahla"?',
        correctAnswer: 'Tree',
        options: ['Tree', 'Car', 'Book', 'Money']
      },
      {
        id: 'zu-v55',
        type: 'type-answer',
        question: 'Type "Sun" in Zulu',
        questionFr: 'Tapez "Soleil" en Zulu',
        correctAnswer: 'Ilanga'
      },
      {
        id: 'zu-v56',
        type: 'multiple-choice',
        question: 'How do you say "Moon" in Zulu?',
        questionFr: 'Comment dit-on "Lune" en Zulu?',
        correctAnswer: 'Inyanga',
        options: ['Inyanga', 'Ilanga', 'Isihlahla', 'Imoto']
      },
      {
        id: 'zu-v57',
        type: 'multiple-choice',
        question: 'What does "Inyanga" mean?',
        questionFr: 'Que signifie "Inyanga"?',
        correctAnswer: 'Moon',
        options: ['Moon', 'Sun', 'Tree', 'Car']
      },
      {
        id: 'zu-v58',
        type: 'type-answer',
        question: 'Type "Fire" in Zulu',
        questionFr: 'Tapez "Feu" en Zulu',
        correctAnswer: 'Umlilo'
      },
      {
        id: 'zu-v59',
        type: 'multiple-choice',
        question: 'How do you say "Earth" in Zulu?',
        questionFr: 'Comment dit-on "Terre" en Zulu?',
        correctAnswer: 'Umhlaba',
        options: ['Umhlaba', 'Umlilo', 'Inyanga', 'Ilanga']
      },
      {
        id: 'zu-v60',
        type: 'multiple-choice',
        question: 'What does "Umhlaba" mean?',
        questionFr: 'Que signifie "Umhlaba"?',
        correctAnswer: 'Earth',
        options: ['Earth', 'Fire', 'Moon', 'Sun']
      }
    ]
  },

  // STAGE 1 - MISSION 4: ESSENTIAL VOCABULARY (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-4',
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'zu-v61',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Zulu?',
        questionFr: 'Comment dit-on "Famille" en Zulu?',
        correctAnswer: 'Umndeni',
        options: ['Umndeni', 'Abangane', 'Abasebenzi', 'Othisha']
      },
      {
        id: 'zu-v62',
        type: 'multiple-choice',
        question: 'What does "Umndeni" mean?',
        questionFr: 'Que signifie "Umndeni"?',
        correctAnswer: 'Family',
        options: ['Family', 'Friends', 'Workers', 'Teachers']
      },
      {
        id: 'zu-v63',
        type: 'type-answer',
        question: 'Type "Mother" in Zulu',
        questionFr: 'Tapez "Mère" en Zulu',
        correctAnswer: 'Umama'
      },
      {
        id: 'zu-v64',
        type: 'multiple-choice',
        question: 'How do you say "Father" in Zulu?',
        questionFr: 'Comment dit-on "Père" en Zulu?',
        correctAnswer: 'Ubaba',
        options: ['Ubaba', 'Umama', 'Umntwana', 'Umfowethu']
      },
      {
        id: 'zu-v65',
        type: 'multiple-choice',
        question: '"Ubaba" means:',
        questionFr: '"Ubaba" signifie:',
        correctAnswer: 'Father',
        options: ['Father', 'Mother', 'Child', 'Brother']
      },
      {
        id: 'zu-v66',
        type: 'type-answer',
        question: 'Type "Child" in Zulu',
        questionFr: 'Tapez "Enfant" en Zulu',
        correctAnswer: 'Umntwana'
      },
      {
        id: 'zu-v67',
        type: 'multiple-choice',
        question: 'How do you say "Brother" in Zulu?',
        questionFr: 'Comment dit-on "Frère" en Zulu?',
        correctAnswer: 'Umfowethu',
        options: ['Umfowethu', 'Udade wethu', 'Ubaba', 'Umama']
      },
      {
        id: 'zu-v68',
        type: 'multiple-choice',
        question: 'What does "Umfowethu" mean?',
        questionFr: 'Que signifie "Umfowethu"?',
        correctAnswer: 'Brother',
        options: ['Brother', 'Sister', 'Father', 'Mother']
      },
      {
        id: 'zu-v69',
        type: 'type-answer',
        question: 'Type "Sister" in Zulu',
        questionFr: 'Tapez "Sœur" en Zulu',
        correctAnswer: 'Udade wethu'
      },
      {
        id: 'zu-v70',
        type: 'multiple-choice',
        question: 'How do you say "Friend" in Zulu?',
        questionFr: 'Comment dit-on "Ami" en Zulu?',
        correctAnswer: 'Umngane',
        options: ['Umngane', 'Umndeni', 'Umsebenzi', 'Uthisha']
      },
      {
        id: 'zu-v71',
        type: 'multiple-choice',
        question: '"Umngane" means:',
        questionFr: '"Umngane" signifie:',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'zu-v72',
        type: 'type-answer',
        question: 'Type "Work" in Zulu',
        questionFr: 'Tapez "Travail" en Zulu',
        correctAnswer: 'Umsebenzi'
      },
      {
        id: 'zu-v73',
        type: 'multiple-choice',
        question: 'How do you say "School" in Zulu?',
        questionFr: 'Comment dit-on "École" en Zulu?',
        correctAnswer: 'Isikole',
        options: ['Isikole', 'Ihhovisi', 'Imakethe', 'Isibhedlela']
      },
      {
        id: 'zu-v74',
        type: 'multiple-choice',
        question: 'What does "Isikole" mean?',
        questionFr: 'Que signifie "Isikole"?',
        correctAnswer: 'School',
        options: ['School', 'Office', 'Market', 'Hospital']
      },
      {
        id: 'zu-v75',
        type: 'type-answer',
        question: 'Type "Market" in Zulu',
        questionFr: 'Tapez "Marché" en Zulu',
        correctAnswer: 'Imakethe'
      },
      {
        id: 'zu-v76',
        type: 'multiple-choice',
        question: 'How do you say "Hospital" in Zulu?',
        questionFr: 'Comment dit-on "Hôpital" en Zulu?',
        correctAnswer: 'Isibhedlela',
        options: ['Isibhedlela', 'Isikole', 'Ihhovisi', 'Imakethe']
      },
      {
        id: 'zu-v77',
        type: 'multiple-choice',
        question: 'What does "Isibhedlela" mean?',
        questionFr: 'Que signifie "Isibhedlela"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'zu-v78',
        type: 'type-answer',
        question: 'Type "Church" in Zulu',
        questionFr: 'Tapez "Église" en Zulu',
        correctAnswer: 'Isonto'
      },
      {
        id: 'zu-v79',
        type: 'multiple-choice',
        question: 'How do you say "Time" in Zulu?',
        questionFr: 'Comment dit-on "Temps" en Zulu?',
        correctAnswer: 'Isikhathi',
        options: ['Isikhathi', 'Usuku', 'Inyanga', 'Unyaka']
      },
      {
        id: 'zu-v80',
        type: 'multiple-choice',
        question: 'What does "Isikhathi" mean?',
        questionFr: 'Que signifie "Isikhathi"?',
        correctAnswer: 'Time',
        options: ['Time', 'Day', 'Month', 'Year']
      }
    ]
  },

  // STAGE 1 - MISSION 5: PRACTICE & REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-5',
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    level: 1,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-v81',
        type: 'multiple-choice',
        question: 'Complete: "Sawubona, ___?"',
        questionFr: 'Compléter: "Sawubona, ___?"',
        correctAnswer: 'unjani',
        options: ['unjani', 'ubani', 'kuphi', 'mingaki']
      },
      {
        id: 'zu-v82',
        type: 'multiple-choice',
        question: 'What is the correct response to "Unjani?"',
        questionFr: 'Quelle est la bonne réponse à "Unjani?"?',
        correctAnswer: 'Ngikhona',
        options: ['Ngikhona', 'Igama lami ngu...', 'Ngivela...', 'Ngihlala...']
      },
      {
        id: 'zu-v83',
        type: 'type-answer',
        question: 'Type the Zulu word for "Thank you"',
        questionFr: 'Tapez le mot Zulu pour "Merci"',
        correctAnswer: 'Ngiyabonga'
      },
      {
        id: 'zu-v84',
        type: 'multiple-choice',
        question: 'How do you say "Good morning" in Zulu?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Zulu?',
        correctAnswer: 'Sawubona',
        options: ['Sawubona', 'Lala kahle', 'Hamba kahle', 'Ngiyabonga']
      },
      {
        id: 'zu-v85',
        type: 'multiple-choice',
        question: 'What does "Hamba kahle" mean?',
        questionFr: 'Que signifie "Hamba kahle"?',
        correctAnswer: 'Goodbye',
        options: ['Goodbye', 'Hello', 'Thank you', 'Please']
      },
      {
        id: 'zu-v86',
        type: 'type-answer',
        question: 'Type "Please" in Zulu',
        questionFr: 'Tapez "S\'il vous plaît" en Zulu',
        correctAnswer: 'Ngiyacela'
      },
      {
        id: 'zu-v87',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Zulu?',
        questionFr: 'Comment dit-on "Eau" en Zulu?',
        correctAnswer: 'Amanzi',
        options: ['Amanzi', 'Ukudla', 'Indlu', 'Imali']
      },
      {
        id: 'zu-v88',
        type: 'multiple-choice',
        question: 'What does "Ukudla" mean?',
        questionFr: 'Que signifie "Ukudla"?',
        correctAnswer: 'Food',
        options: ['Food', 'Water', 'House', 'Money']
      },
      {
        id: 'zu-v89',
        type: 'type-answer',
        question: 'Type "House" in Zulu',
        questionFr: 'Tapez "Maison" en Zulu',
        correctAnswer: 'Indlu'
      },
      {
        id: 'zu-v90',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Zulu?',
        questionFr: 'Comment dit-on "Famille" en Zulu?',
        correctAnswer: 'Umndeni',
        options: ['Umndeni', 'Abangane', 'Abasebenzi', 'Othisha']
      },
      {
        id: 'zu-v91',
        type: 'multiple-choice',
        question: 'What does "Umama" mean?',
        questionFr: 'Que signifie "Umama"?',
        correctAnswer: 'Mother',
        options: ['Mother', 'Father', 'Child', 'Sister']
      },
      {
        id: 'zu-v92',
        type: 'type-answer',
        question: 'Type "Father" in Zulu',
        questionFr: 'Tapez "Père" en Zulu',
        correctAnswer: 'Ubaba'
      },
      {
        id: 'zu-v93',
        type: 'multiple-choice',
        question: 'How do you say "School" in Zulu?',
        questionFr: 'Comment dit-on "École" en Zulu?',
        correctAnswer: 'Isikole',
        options: ['Isikole', 'Ihhovisi', 'Imakethe', 'Isibhedlela']
      },
      {
        id: 'zu-v94',
        type: 'multiple-choice',
        question: 'What does "Umngane" mean?',
        questionFr: 'Que signifie "Umngane"?',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'zu-v95',
        type: 'type-answer',
        question: 'Type "Yes" in Zulu',
        questionFr: 'Tapez "Oui" en Zulu',
        correctAnswer: 'Yebo'
      },
      {
        id: 'zu-v96',
        type: 'multiple-choice',
        question: 'How do you say "No" in Zulu?',
        questionFr: 'Comment dit-on "Non" en Zulu?',
        correctAnswer: 'Cha',
        options: ['Cha', 'Yebo', 'Ngiyacela', 'Sawubona']
      },
      {
        id: 'zu-v97',
        type: 'multiple-choice',
        question: 'What does "Isibhedlela" mean?',
        questionFr: 'Que signifie "Isibhedlela"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'zu-v98',
        type: 'type-answer',
        question: 'Type "Time" in Zulu',
        questionFr: 'Tapez "Temps" en Zulu',
        correctAnswer: 'Isikhathi'
      },
      {
        id: 'zu-v99',
        type: 'multiple-choice',
        question: 'Complete: "Igama lami ngu ___" (My name is...)',
        questionFr: 'Compléter: "Igama lami ngu ___" (Je m\'appelle...)',
        correctAnswer: '...',
        options: ['...', 'Yebo', 'Cha', 'Ngiyacela']
      },
      {
        id: 'zu-v100',
        type: 'multiple-choice',
        question: 'What is the Zulu word for "Welcome"?',
        questionFr: 'Quel est le mot Zulu pour "Bienvenue"?',
        correctAnswer: 'Siyakwamukela',
        options: ['Siyakwamukela', 'Sawubona', 'Ngiyabonga', 'Ngiyacela']
      }
    ]
  },

  // STAGE 2 - MISSION 6: DAILY LIFE (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-6',
    type: 'vocabulary',
    title: 'Daily Life',
    titleFr: 'Vie quotidienne',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-v101',
        type: 'multiple-choice',
        question: 'How do you say "I wake up" in Zulu?',
        questionFr: 'Comment dit-on "Je me réveille" en Zulu?',
        correctAnswer: 'Ngivuka',
        options: ['Ngivuka', 'Ngiyalala', 'Ngidla', 'Ngiya emsebenzini']
      },
      {
        id: 'zu-v102',
        type: 'multiple-choice',
        question: 'What does "Ngivuka" mean?',
        questionFr: 'Que signifie "Ngivuka"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'zu-v103',
        type: 'type-answer',
        question: 'Type "I sleep" in Zulu',
        questionFr: 'Tapez "Je dors" en Zulu',
        correctAnswer: 'Ngiyalala'
      },
      {
        id: 'zu-v104',
        type: 'multiple-choice',
        question: 'How do you say "I eat" in Zulu?',
        questionFr: 'Comment dit-on "Je mange" en Zulu?',
        correctAnswer: 'Ngidla',
        options: ['Ngidla', 'Ngivuka', 'Ngiyalala', 'Ngiya emsebenzini']
      },
      {
        id: 'zu-v105',
        type: 'multiple-choice',
        question: '"Ngidla" means:',
        questionFr: '"Ngidla" signifie:',
        correctAnswer: 'I eat',
        options: ['I eat', 'I wake up', 'I sleep', 'I go to work']
      },
      {
        id: 'zu-v106',
        type: 'type-answer',
        question: 'Type "I go to work" in Zulu',
        questionFr: 'Tapez "Je vais au travail" en Zulu',
        correctAnswer: 'Ngiya emsebenzini'
      },
      {
        id: 'zu-v107',
        type: 'multiple-choice',
        question: 'How do you say "I study" in Zulu?',
        questionFr: 'Comment dit-on "J\'étudie" en Zulu?',
        correctAnswer: 'Ngifunda',
        options: ['Ngifunda', 'Ngiya emsebenzini', 'Ngidla', 'Ngivuka']
      },
      {
        id: 'zu-v108',
        type: 'multiple-choice',
        question: 'What does "Ngifunda" mean?',
        questionFr: 'Que signifie "Ngifunda"?',
        correctAnswer: 'I study',
        options: ['I study', 'I go to work', 'I eat', 'I wake up']
      },
      {
        id: 'zu-v109',
        type: 'type-answer',
        question: 'Type "I play" in Zulu',
        questionFr: 'Tapez "Je joue" en Zulu',
        correctAnswer: 'Ngidlala'
      },
      {
        id: 'zu-v110',
        type: 'multiple-choice',
        question: 'How do you say "I cook" in Zulu?',
        questionFr: 'Comment dit-on "Je cuisine" en Zulu?',
        correctAnswer: 'Ngipheka',
        options: ['Ngipheka', 'Ngidlala', 'Ngifunda', 'Ngiya emsebenzini']
      },
      {
        id: 'zu-v111',
        type: 'multiple-choice',
        question: '"Ngipheka" means:',
        questionFr: '"Ngipheka" signifie:',
        correctAnswer: 'I cook',
        options: ['I cook', 'I play', 'I study', 'I go to work']
      },
      {
        id: 'zu-v112',
        type: 'type-answer',
        question: 'Type "I clean" in Zulu',
        questionFr: 'Tapez "Je nettoie" en Zulu',
        correctAnswer: 'Ngihlanza'
      },
      {
        id: 'zu-v113',
        type: 'multiple-choice',
        question: 'How do you say "I wash" in Zulu?',
        questionFr: 'Comment dit-on "Je lave" en Zulu?',
        correctAnswer: 'Ngigeza',
        options: ['Ngigeza', 'Ngihlanza', 'Ngipheka', 'Ngidlala']
      },
      {
        id: 'zu-v114',
        type: 'multiple-choice',
        question: 'What does "Ngigeza" mean?',
        questionFr: 'Que signifie "Ngigeza"?',
        correctAnswer: 'I wash',
        options: ['I wash', 'I clean', 'I cook', 'I play']
      },
      {
        id: 'zu-v115',
        type: 'type-answer',
        question: 'Type "I read" in Zulu',
        questionFr: 'Tapez "Je lis" en Zulu',
        correctAnswer: 'Ngifunda'
      },
      {
        id: 'zu-v116',
        type: 'multiple-choice',
        question: 'How do you say "I write" in Zulu?',
        questionFr: 'Comment dit-on "J\'écris" en Zulu?',
        correctAnswer: 'Ngibhala',
        options: ['Ngibhala', 'Ngifunda', 'Ngigeza', 'Ngihlanza']
      },
      {
        id: 'zu-v117',
        type: 'multiple-choice',
        question: 'What does "Ngibhala" mean?',
        questionFr: 'Que signifie "Ngibhala"?',
        correctAnswer: 'I write',
        options: ['I write', 'I read', 'I wash', 'I clean']
      },
      {
        id: 'zu-v118',
        type: 'type-answer',
        question: 'Type "I listen" in Zulu',
        questionFr: 'Tapez "J\'écoute" en Zulu',
        correctAnswer: 'Ngiyalalela'
      },
      {
        id: 'zu-v119',
        type: 'multiple-choice',
        question: 'How do you say "I speak" in Zulu?',
        questionFr: 'Comment dit-on "Je parle" en Zulu?',
        correctAnswer: 'Ngikhuluma',
        options: ['Ngikhuluma', 'Ngiyalalela', 'Ngibhala', 'Ngifunda']
      },
      {
        id: 'zu-v120',
        type: 'multiple-choice',
        question: 'What does "Ngikhuluma" mean?',
        questionFr: 'Que signifie "Ngikhuluma"?',
        correctAnswer: 'I speak',
        options: ['I speak', 'I listen', 'I write', 'I read']
      }
    ]
  },

  // STAGE 2 - MISSION 7: MORE PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-7',
    type: 'vocabulary',
    title: 'More Phrases',
    titleFr: 'Plus de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-v121',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Zulu?',
        questionFr: 'Comment dit-on "J\'ai faim" en Zulu?',
        correctAnswer: 'Ngilambile',
        options: ['Ngilambile', 'Ngomile', 'Ngikhathele', 'Ngishisa']
      },
      {
        id: 'zu-v122',
        type: 'multiple-choice',
        question: 'What does "Ngilambile" mean?',
        questionFr: 'Que signifie "Ngilambile"?',
        correctAnswer: 'I am hungry',
        options: ['I am hungry', 'I am thirsty', 'I am tired', 'I am hot']
      },
      {
        id: 'zu-v123',
        type: 'type-answer',
        question: 'Type "I am thirsty" in Zulu',
        questionFr: 'Tapez "J\'ai soif" en Zulu',
        correctAnswer: 'Ngomile'
      },
      {
        id: 'zu-v124',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Zulu?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Zulu?',
        correctAnswer: 'Ngikhathele',
        options: ['Ngikhathele', 'Ngilambile', 'Ngomile', 'Ngishisa']
      },
      {
        id: 'zu-v125',
        type: 'multiple-choice',
        question: '"Ngikhathele" means:',
        questionFr: '"Ngikhathele" signifie:',
        correctAnswer: 'I am tired',
        options: ['I am tired', 'I am hungry', 'I am thirsty', 'I am hot']
      },
      {
        id: 'zu-v126',
        type: 'type-answer',
        question: 'Type "I am hot" in Zulu',
        questionFr: 'Tapez "J\'ai chaud" en Zulu',
        correctAnswer: 'Ngishisa'
      },
      {
        id: 'zu-v127',
        type: 'multiple-choice',
        question: 'How do you say "I am cold" in Zulu?',
        questionFr: 'Comment dit-on "J\'ai froid" en Zulu?',
        correctAnswer: 'Ngibanda',
        options: ['Ngibanda', 'Ngishisa', 'Ngikhathele', 'Ngilambile']
      },
      {
        id: 'zu-v128',
        type: 'multiple-choice',
        question: 'What does "Ngibanda" mean?',
        questionFr: 'Que signifie "Ngibanda"?',
        correctAnswer: 'I am cold',
        options: ['I am cold', 'I am hot', 'I am tired', 'I am hungry']
      },
      {
        id: 'zu-v129',
        type: 'type-answer',
        question: 'Type "I am happy" in Zulu',
        questionFr: 'Tapez "Je suis heureux" en Zulu',
        correctAnswer: 'Ngiyajabula'
      },
      {
        id: 'zu-v130',
        type: 'multiple-choice',
        question: 'How do you say "I am sad" in Zulu?',
        questionFr: 'Comment dit-on "Je suis triste" en Zulu?',
        correctAnswer: 'Ngidabukile',
        options: ['Ngidabukile', 'Ngiyajabula', 'Ngibanda', 'Ngishisa']
      },
      {
        id: 'zu-v131',
        type: 'multiple-choice',
        question: '"Ngidabukile" means:',
        questionFr: '"Ngidabukile" signifie:',
        correctAnswer: 'I am sad',
        options: ['I am sad', 'I am happy', 'I am cold', 'I am hot']
      },
      {
        id: 'zu-v132',
        type: 'type-answer',
        question: 'Type "I am angry" in Zulu',
        questionFr: 'Tapez "Je suis en colère" en Zulu',
        correctAnswer: 'Ngithukuthele'
      },
      {
        id: 'zu-v133',
        type: 'multiple-choice',
        question: 'How do you say "I am sick" in Zulu?',
        questionFr: 'Comment dit-on "Je suis malade" en Zulu?',
        correctAnswer: 'Ngigula',
        options: ['Ngigula', 'Ngithukuthele', 'Ngidabukile', 'Ngiyajabula']
      },
      {
        id: 'zu-v134',
        type: 'multiple-choice',
        question: 'What does "Ngigula" mean?',
        questionFr: 'Que signifie "Ngigula"?',
        correctAnswer: 'I am sick',
        options: ['I am sick', 'I am angry', 'I am sad', 'I am happy']
      },
      {
        id: 'zu-v135',
        type: 'type-answer',
        question: 'Type "I am well" in Zulu',
        questionFr: 'Tapez "Je vais bien" en Zulu',
        correctAnswer: 'Ngiphilile'
      },
      {
        id: 'zu-v136',
        type: 'multiple-choice',
        question: 'How do you say "I am busy" in Zulu?',
        questionFr: 'Comment dit-on "Je suis occupé" en Zulu?',
        correctAnswer: 'Ngimatasa',
        options: ['Ngimatasa', 'Ngiphilile', 'Ngigula', 'Ngithukuthele']
      },
      {
        id: 'zu-v137',
        type: 'multiple-choice',
        question: 'What does "Ngimatasa" mean?',
        questionFr: 'Que signifie "Ngimatasa"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'zu-v138',
        type: 'type-answer',
        question: 'Type "I am free" in Zulu',
        questionFr: 'Tapez "Je suis libre" en Zulu',
        correctAnswer: 'Anginamsebenzi'
      },
      {
        id: 'zu-v139',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Zulu?',
        questionFr: 'Comment dit-on "Je suis prêt" en Zulu?',
        correctAnswer: 'Ngilungile',
        options: ['Ngilungile', 'Anginamsebenzi', 'Ngimatasa', 'Ngiphilile']
      },
      {
        id: 'zu-v140',
        type: 'multiple-choice',
        question: 'What does "Ngilungile" mean?',
        questionFr: 'Que signifie "Ngilungile"?',
        correctAnswer: 'I am ready',
        options: ['I am ready', 'I am free', 'I am busy', 'I am well']
      }
    ]
  },

  // STAGE 2 - MISSION 8: USEFUL EXPRESSIONS (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-8',
    type: 'vocabulary',
    title: 'Useful Expressions',
    titleFr: 'Expressions utiles',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-v141',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t understand" in Zulu?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Zulu?',
        correctAnswer: 'Angiqondi',
        options: ['Angiqondi', 'Angazi', 'Angifuni', 'Angiyi']
      },
      {
        id: 'zu-v142',
        type: 'multiple-choice',
        question: 'What does "Angiqondi" mean?',
        questionFr: 'Que signifie "Angiqondi"?',
        correctAnswer: 'I don\'t understand',
        options: ['I don\'t understand', 'I don\'t know', 'I don\'t want', 'I won\'t go']
      },
      {
        id: 'zu-v143',
        type: 'type-answer',
        question: 'Type "I don\'t know" in Zulu',
        questionFr: 'Tapez "Je ne sais pas" en Zulu',
        correctAnswer: 'Angazi'
      },
      {
        id: 'zu-v144',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t want" in Zulu?',
        questionFr: 'Comment dit-on "Je ne veux pas" en Zulu?',
        correctAnswer: 'Angifuni',
        options: ['Angifuni', 'Angiqondi', 'Angazi', 'Angiyi']
      },
      {
        id: 'zu-v145',
        type: 'multiple-choice',
        question: '"Angifuni" means:',
        questionFr: '"Angifuni" signifie:',
        correctAnswer: 'I don\'t want',
        options: ['I don\'t want', 'I don\'t understand', 'I don\'t know', 'I won\'t go']
      },
      {
        id: 'zu-v146',
        type: 'type-answer',
        question: 'Type "I can\'t" in Zulu',
        questionFr: 'Tapez "Je ne peux pas" en Zulu',
        correctAnswer: 'Angikwazi'
      },
      {
        id: 'zu-v147',
        type: 'multiple-choice',
        question: 'How do you say "I can" in Zulu?',
        questionFr: 'Comment dit-on "Je peux" en Zulu?',
        correctAnswer: 'Ngiyakwazi',
        options: ['Ngiyakwazi', 'Angikwazi', 'Angifuni', 'Angiqondi']
      },
      {
        id: 'zu-v148',
        type: 'multiple-choice',
        question: 'What does "Ngiyakwazi" mean?',
        questionFr: 'Que signifie "Ngiyakwazi"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'zu-v149',
        type: 'type-answer',
        question: 'Type "I will" in Zulu',
        questionFr: 'Tapez "Je vais" en Zulu',
        correctAnswer: 'Ngiyayi'
      },
      {
        id: 'zu-v150',
        type: 'multiple-choice',
        question: 'How do you say "I won\'t" in Zulu?',
        questionFr: 'Comment dit-on "Je ne vais pas" en Zulu?',
        correctAnswer: 'Angiyi',
        options: ['Angiyi', 'Ngiyayi', 'Ngiyakwazi', 'Angikwazi']
      },
      {
        id: 'zu-v151',
        type: 'multiple-choice',
        question: '"Angiyi" means:',
        questionFr: '"Angiyi" signifie:',
        correctAnswer: 'I won\'t',
        options: ['I won\'t', 'I will', 'I can', 'I can\'t']
      },
      {
        id: 'zu-v152',
        type: 'type-answer',
        question: 'Type "I have" in Zulu',
        questionFr: 'Tapez "J\'ai" en Zulu',
        correctAnswer: 'Nginakho'
      },
      {
        id: 'zu-v153',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Zulu?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Zulu?',
        correctAnswer: 'Anginakho',
        options: ['Anginakho', 'Nginakho', 'Angifuni', 'Angiqondi']
      },
      {
        id: 'zu-v154',
        type: 'multiple-choice',
        question: 'What does "Anginakho" mean?',
        questionFr: 'Que signifie "Anginakho"?',
        correctAnswer: 'I don\'t have',
        options: ['I don\'t have', 'I have', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'zu-v155',
        type: 'type-answer',
        question: 'Type "I like" in Zulu',
        questionFr: 'Tapez "J\'aime" en Zulu',
        correctAnswer: 'Ngiyathanda'
      },
      {
        id: 'zu-v156',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t like" in Zulu?',
        questionFr: 'Comment dit-on "Je n\'aime pas" en Zulu?',
        correctAnswer: 'Angithandi',
        options: ['Angithandi', 'Ngiyathanda', 'Anginakho', 'Nginakho']
      },
      {
        id: 'zu-v157',
        type: 'multiple-choice',
        question: 'What does "Angithandi" mean?',
        questionFr: 'Que signifie "Angithandi"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'zu-v158',
        type: 'type-answer',
        question: 'Type "I love" in Zulu',
        questionFr: 'Tapez "J\'aime beaucoup" en Zulu',
        correctAnswer: 'Ngiyathanda kakhulu'
      },
      {
        id: 'zu-v159',
        type: 'multiple-choice',
        question: 'How do you say "I hate" in Zulu?',
        questionFr: 'Comment dit-on "Je déteste" en Zulu?',
        correctAnswer: 'Ngiyazonda',
        options: ['Ngiyazonda', 'Ngiyathanda kakhulu', 'Angithandi', 'Ngiyathanda']
      },
      {
        id: 'zu-v160',
        type: 'multiple-choice',
        question: 'What does "Ngiyazonda" mean?',
        questionFr: 'Que signifie "Ngiyazonda"?',
        correctAnswer: 'I hate',
        options: ['I hate', 'I love', 'I don\'t like', 'I like']
      }
    ]
  },

  // STAGE 2 - MISSION 9: BUILDING SENTENCES (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-9',
    type: 'vocabulary',
    title: 'Building Sentences',
    titleFr: 'Construction de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-v161',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ ukudla" (I am eating food)',
        questionFr: 'Compléter: "Ngi___ ukudla" (Je mange de la nourriture)',
        correctAnswer: 'dla',
        options: ['dla', 'pheka', 'ya', 'funda']
      },
      {
        id: 'zu-v162',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ amanzi" (I am drinking water)',
        questionFr: 'Compléter: "Ngi___ amanzi" (Je bois de l\'eau)',
        correctAnswer: 'phuza',
        options: ['phuza', 'dla', 'pheka', 'ya']
      },
      {
        id: 'zu-v163',
        type: 'type-answer',
        question: 'Complete: "Ngi___ emsebenzini" (I am going to work)',
        questionFr: 'Compléter: "Ngi___ emsebenzini" (Je vais au travail)',
        correctAnswer: 'ya'
      },
      {
        id: 'zu-v164',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ isiZulu" (I am learning Zulu)',
        questionFr: 'Compléter: "Ngi___ isiZulu" (J\'apprends le Zulu)',
        correctAnswer: 'funda',
        options: ['funda', 'ya', 'dla', 'pheka']
      },
      {
        id: 'zu-v165',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ ukudla" (I am cooking food)',
        questionFr: 'Compléter: "Ngi___ ukudla" (Je cuisine de la nourriture)',
        correctAnswer: 'pheka',
        options: ['pheka', 'funda', 'ya', 'dla']
      },
      {
        id: 'zu-v166',
        type: 'type-answer',
        question: 'Complete: "Ngi___ incwadi" (I am reading a book)',
        questionFr: 'Compléter: "Ngi___ incwadi" (Je lis un livre)',
        correctAnswer: 'funda'
      },
      {
        id: 'zu-v167',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ okuthile" (I am writing something)',
        questionFr: 'Compléter: "Ngi___ okuthile" (J\'écris quelque chose)',
        correctAnswer: 'bhala',
        options: ['bhala', 'funda', 'pheka', 'dla']
      },
      {
        id: 'zu-v168',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ umculo" (I am playing music)',
        questionFr: 'Compléter: "Ngi___ umculo" (Je joue de la musique)',
        correctAnswer: 'dlala',
        options: ['dlala', 'bhala', 'funda', 'pheka']
      },
      {
        id: 'zu-v169',
        type: 'type-answer',
        question: 'Complete: "Ngi___ indlu" (I am cleaning the house)',
        questionFr: 'Compléter: "Ngi___ indlu" (Je nettoie la maison)',
        correctAnswer: 'hlanza'
      },
      {
        id: 'zu-v170',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ izingubo" (I am washing clothes)',
        questionFr: 'Compléter: "Ngi___ izingubo" (Je lave les vêtements)',
        correctAnswer: 'geza',
        options: ['geza', 'hlanza', 'dlala', 'bhala']
      },
      {
        id: 'zu-v171',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ endlini" (I am at home)',
        questionFr: 'Compléter: "Ngi___ endlini" (Je suis à la maison)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      },
      {
        id: 'zu-v172',
        type: 'type-answer',
        question: 'Complete: "Ngi___ endlini" (I am coming home)',
        questionFr: 'Compléter: "Ngi___ endlini" (Je rentre à la maison)',
        correctAnswer: 'za'
      },
      {
        id: 'zu-v173',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ endlini" (I am leaving home)',
        questionFr: 'Compléter: "Ngi___ endlini" (Je quitte la maison)',
        correctAnswer: 'phuma',
        options: ['phuma', 'za', 'khona', 'ya']
      },
      {
        id: 'zu-v174',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ emsebenzini" (I am at work)',
        questionFr: 'Compléter: "Ngi___ emsebenzini" (Je suis au travail)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      },
      {
        id: 'zu-v175',
        type: 'type-answer',
        question: 'Complete: "Ngi___ esikoleni" (I am at school)',
        questionFr: 'Compléter: "Ngi___ esikoleni" (Je suis à l\'école)',
        correctAnswer: 'khona'
      },
      {
        id: 'zu-v176',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ emakethe" (I am at the market)',
        questionFr: 'Compléter: "Ngi___ emakethe" (Je suis au marché)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      },
      {
        id: 'zu-v177',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ esibhedlela" (I am at the hospital)',
        questionFr: 'Compléter: "Ngi___ esibhedlela" (Je suis à l\'hôpital)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      },
      {
        id: 'zu-v178',
        type: 'type-answer',
        question: 'Complete: "Ngi___ esontweni" (I am at church)',
        questionFr: 'Compléter: "Ngi___ esontweni" (Je suis à l\'église)',
        correctAnswer: 'khona'
      },
      {
        id: 'zu-v179',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ ehhovisini" (I am at the office)',
        questionFr: 'Compléter: "Ngi___ ehhovisini" (Je suis au bureau)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      },
      {
        id: 'zu-v180',
        type: 'multiple-choice',
        question: 'Complete: "Ngi___ endlini" (I am at home)',
        questionFr: 'Compléter: "Ngi___ endlini" (Je suis à la maison)',
        correctAnswer: 'khona',
        options: ['khona', 'ya', 'za', 'phuma']
      }
    ]
  },

  // STAGE 2 - MISSION 10: STAGE 2 REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'zu-vocab-10',
    type: 'vocabulary',
    title: 'Stage 2 Review',
    titleFr: 'Révision étape 2',
    level: 2,
    xpReward: 20,
    exercises: [
      {
        id: 'zu-v181',
        type: 'multiple-choice',
        question: 'What does "Ngivuka" mean?',
        questionFr: 'Que signifie "Ngivuka"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'zu-v182',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Zulu?',
        questionFr: 'Comment dit-on "J\'ai faim" en Zulu?',
        correctAnswer: 'Ngilambile',
        options: ['Ngilambile', 'Ngomile', 'Ngikhathele', 'Ngishisa']
      },
      {
        id: 'zu-v183',
        type: 'type-answer',
        question: 'Type "I don\'t understand" in Zulu',
        questionFr: 'Tapez "Je ne comprends pas" en Zulu',
        correctAnswer: 'Angiqondi'
      },
      {
        id: 'zu-v184',
        type: 'multiple-choice',
        question: 'What does "Ngiyakwazi" mean?',
        questionFr: 'Que signifie "Ngiyakwazi"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'zu-v185',
        type: 'multiple-choice',
        question: 'How do you say "I like" in Zulu?',
        questionFr: 'Comment dit-on "J\'aime" en Zulu?',
        correctAnswer: 'Ngiyathanda',
        options: ['Ngiyathanda', 'Angithandi', 'Nginakho', 'Anginakho']
      },
      {
        id: 'zu-v186',
        type: 'type-answer',
        question: 'Type "I am cooking food" in Zulu',
        questionFr: 'Tapez "Je cuisine de la nourriture" en Zulu',
        correctAnswer: 'Ngipheka ukudla'
      },
      {
        id: 'zu-v187',
        type: 'multiple-choice',
        question: 'What does "Ngifunda incwadi" mean?',
        questionFr: 'Que signifie "Ngifunda incwadi"?',
        correctAnswer: 'I am reading a book',
        options: ['I am reading a book', 'I am writing something', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'zu-v188',
        type: 'multiple-choice',
        question: 'How do you say "I am at home" in Zulu?',
        questionFr: 'Comment dit-on "Je suis à la maison" en Zulu?',
        correctAnswer: 'Ngikhona endlini',
        options: ['Ngikhona endlini', 'Ngiya endlini', 'Ngiza endlini', 'Ngiphuma endlini']
      },
      {
        id: 'zu-v189',
        type: 'type-answer',
        question: 'Type "I am happy" in Zulu',
        questionFr: 'Tapez "Je suis heureux" en Zulu',
        correctAnswer: 'Ngiyajabula'
      },
      {
        id: 'zu-v190',
        type: 'multiple-choice',
        question: 'What does "Ngimatasa" mean?',
        questionFr: 'Que signifie "Ngimatasa"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'zu-v191',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Zulu?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Zulu?',
        correctAnswer: 'Anginakho',
        options: ['Anginakho', 'Nginakho', 'Angifuni', 'Angiqondi']
      },
      {
        id: 'zu-v192',
        type: 'type-answer',
        question: 'Type "I am washing clothes" in Zulu',
        questionFr: 'Tapez "Je lave les vêtements" en Zulu',
        correctAnswer: 'Ngigeza izingubo'
      },
      {
        id: 'zu-v193',
        type: 'multiple-choice',
        question: 'What does "Angithandi" mean?',
        questionFr: 'Que signifie "Angithandi"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'zu-v194',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Zulu?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Zulu?',
        correctAnswer: 'Ngikhathele',
        options: ['Ngikhathele', 'Ngilambile', 'Ngomile', 'Ngishisa']
      },
      {
        id: 'zu-v195',
        type: 'type-answer',
        question: 'Type "I am coming home" in Zulu',
        questionFr: 'Tapez "Je rentre à la maison" en Zulu',
        correctAnswer: 'Ngiza endlini'
      },
      {
        id: 'zu-v196',
        type: 'multiple-choice',
        question: 'What does "Ngibhala okuthile" mean?',
        questionFr: 'Que signifie "Ngibhala okuthile"?',
        correctAnswer: 'I am writing something',
        options: ['I am writing something', 'I am reading a book', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'zu-v197',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Zulu?',
        questionFr: 'Comment dit-on "Je suis prêt" en Zulu?',
        correctAnswer: 'Ngilungile',
        options: ['Ngilungile', 'Anginamsebenzi', 'Ngimatasa', 'Ngiphilile']
      },
      {
        id: 'zu-v198',
        type: 'type-answer',
        question: 'Type "I am at school" in Zulu',
        questionFr: 'Tapez "Je suis à l\'école" en Zulu',
        correctAnswer: 'Ngikhona esikoleni'
      },
      {
        id: 'zu-v199',
        type: 'multiple-choice',
        question: 'What does "Ngiyathanda kakhulu" mean?',
        questionFr: 'Que signifie "Ngiyathanda kakhulu"?',
        correctAnswer: 'I love',
        options: ['I love', 'I hate', 'I don\'t like', 'I like']
      },
      {
        id: 'zu-v200',
        type: 'multiple-choice',
        question: 'How do you say "I am at the market" in Zulu?',
        questionFr: 'Comment dit-on "Je suis au marché" en Zulu?',
        correctAnswer: 'Ngikhona emakethe',
        options: ['Ngikhona emakethe', 'Ngiya emakethe', 'Ngiza emakethe', 'Ngiphuma emakethe']
      }
    ]
  }
];