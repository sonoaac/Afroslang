import { Lesson } from '../../types';

type RawLesson = Omit<Lesson, 'stageId' | 'lessonNumber'> & { level?: number };

export const zuluLessons: RawLesson[] = [
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

  // ── STAGE 2: POLITE & FORMAL SPEECH ─────────────────────────────────────

  // Unit 1 — Please & Thank You
  {
    id: 'zu-s2-1',
    type: 'vocabulary',
    title: 'Please & Thank You',
    titleFr: 'S\'il vous plaît et Merci',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-1-1',
        type: 'multiple-choice',
        question: 'How do you say "please" in Zulu?',
        questionFr: 'Comment dit-on "s\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngiyacela',
        options: ['Ngiyacela', 'Ngiyabonga', 'Kulungile', 'Sawubona']
      },
      {
        id: 'zu-s2-1-2',
        type: 'multiple-choice',
        question: 'What does "Ngiyabonga" mean?',
        questionFr: 'Que signifie "Ngiyabonga"?',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'Sorry', 'Welcome']
      },
      {
        id: 'zu-s2-1-3',
        type: 'multiple-choice',
        question: 'How do you say "thank you very much" in Zulu?',
        questionFr: 'Comment dit-on "merci beaucoup" en Zulu?',
        correctAnswer: 'Ngiyabonga kakhulu',
        options: ['Ngiyabonga kakhulu', 'Ngiyabonga', 'Ngiyacela', 'Kulungile']
      },
      {
        id: 'zu-s2-1-4',
        type: 'multiple-choice',
        question: 'What does "Kulungile" mean?',
        questionFr: 'Que signifie "Kulungile"?',
        correctAnswer: 'It\'s okay / You\'re welcome',
        options: ['It\'s okay / You\'re welcome', 'Thank you', 'Please', 'Sorry']
      },
      {
        id: 'zu-s2-1-5',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Zulu?',
        questionFr: 'Comment dit-on "bien fait" en Zulu?',
        correctAnswer: 'Wenze kahle',
        options: ['Wenze kahle', 'Ngiyabonga', 'Kulungile', 'Ngiyacela']
      },
      {
        id: 'zu-s2-1-6',
        type: 'fill-blank',
        question: 'Complete: "Ngiya___" = please',
        questionFr: 'Complétez: "Ngiya___" = s\'il vous plaît',
        correctAnswer: 'cela',
        hint: 'The verb for requesting politely',
        hintFr: 'Le verbe pour demander poliment'
      },
      {
        id: 'zu-s2-1-7',
        type: 'multiple-choice',
        question: 'What does "Ngiyabonga kakhulu" mean?',
        questionFr: 'Que signifie "Ngiyabonga kakhulu"?',
        correctAnswer: 'Thank you very much',
        options: ['Thank you very much', 'Thank you', 'You\'re welcome', 'Well done']
      },
      {
        id: 'zu-s2-1-8',
        type: 'multiple-choice',
        question: 'In "Ngiyabonga kakhulu", what does "kakhulu" mean?',
        questionFr: 'Dans "Ngiyabonga kakhulu", que signifie "kakhulu"?',
        correctAnswer: 'Very much',
        options: ['Very much', 'A little', 'Again', 'Always']
      },
      {
        id: 'zu-s2-1-9',
        type: 'multiple-choice',
        question: 'How do you respond when someone thanks you?',
        questionFr: 'Comment répondre quand quelqu\'un vous remercie?',
        correctAnswer: 'Kulungile',
        options: ['Kulungile', 'Ngiyabonga', 'Ngiyacela', 'Wenze kahle']
      },
      {
        id: 'zu-s2-1-10',
        type: 'multiple-choice',
        question: 'How do you formally say "I am grateful" in Zulu?',
        questionFr: 'Comment dire formellement "je suis reconnaissant" en Zulu?',
        correctAnswer: 'Ngibonga kakhulu',
        options: ['Ngibonga kakhulu', 'Ngiyacela', 'Kulungile', 'Wenze kahle']
      },
      {
        id: 'zu-s2-1-11',
        type: 'type-answer',
        question: 'Type "thank you" in Zulu',
        questionFr: 'Tapez "merci" en Zulu',
        correctAnswer: 'Ngiyabonga'
      },
      {
        id: 'zu-s2-1-12',
        type: 'multiple-choice',
        question: 'What does "Wenze kahle" literally mean?',
        questionFr: 'Que signifie littéralement "Wenze kahle"?',
        correctAnswer: 'You did well',
        options: ['You did well', 'You are here', 'You are welcome', 'You are kind']
      },
      {
        id: 'zu-s2-1-13',
        type: 'multiple-choice',
        question: 'How do you say "please give me" in Zulu?',
        questionFr: 'Comment dit-on "donnez-moi s\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngicela unginike',
        options: ['Ngicela unginike', 'Ngiyabonga', 'Kulungile', 'Wenze kahle']
      },
      {
        id: 'zu-s2-1-14',
        type: 'multiple-choice',
        question: 'What does "Ngiyacela" mean?',
        questionFr: 'Que signifie "Ngiyacela"?',
        correctAnswer: 'Please / I request',
        options: ['Please / I request', 'Thank you', 'I agree', 'I am sorry']
      },
      {
        id: 'zu-s2-1-15',
        type: 'fill-blank',
        question: 'Complete: "Ngiyabonga ___" = thank you very much',
        questionFr: 'Complétez: "Ngiyabonga ___" = merci beaucoup',
        correctAnswer: 'kakhulu',
        hint: 'The Zulu word for "very much"',
        hintFr: 'Le mot zulu pour "beaucoup"'
      },
      {
        id: 'zu-s2-1-16',
        type: 'multiple-choice',
        question: 'Which Zulu phrase acknowledges good work?',
        questionFr: 'Quelle phrase zulu reconnaît un bon travail?',
        correctAnswer: 'Wenze kahle',
        options: ['Wenze kahle', 'Ngiyabonga', 'Ngiyacela', 'Kulungile']
      },
      {
        id: 'zu-s2-1-17',
        type: 'multiple-choice',
        question: 'How do you say "please sit down" in Zulu?',
        questionFr: 'Comment dit-on "veuillez vous asseoir" en Zulu?',
        correctAnswer: 'Ngicela uhlale',
        options: ['Ngicela uhlale', 'Ngiyabonga', 'Wenze kahle', 'Kulungile']
      },
      {
        id: 'zu-s2-1-18',
        type: 'multiple-choice',
        question: 'What is the difference between "Ngiyabonga" and "Ngiyabonga kakhulu"?',
        questionFr: 'Quelle est la différence entre "Ngiyabonga" et "Ngiyabonga kakhulu"?',
        correctAnswer: '"Ngiyabonga kakhulu" is more emphatic',
        options: ['"Ngiyabonga kakhulu" is more emphatic', '"Ngiyabonga" is more formal', 'They mean the same thing', '"Ngiyabonga kakhulu" is for elders only']
      },
      {
        id: 'zu-s2-1-19',
        type: 'multiple-choice',
        question: 'In Zulu, "Kulungile" can also mean:',
        questionFr: 'En Zulu, "Kulungile" peut aussi signifier:',
        correctAnswer: 'It\'s fine / No problem',
        options: ['It\'s fine / No problem', 'You\'re right', 'Go ahead', 'I agree']
      },
      {
        id: 'zu-s2-1-20',
        type: 'type-answer',
        question: 'Type "you\'re welcome" in Zulu',
        questionFr: 'Tapez "de rien" en Zulu',
        correctAnswer: 'Kulungile'
      }
    ]
  },

  // Unit 2 — Apologies & Forgiveness
  {
    id: 'zu-s2-2',
    type: 'vocabulary',
    title: 'Apologies & Forgiveness',
    titleFr: 'Excuses et Pardon',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-2-1',
        type: 'multiple-choice',
        question: 'How do you say "sorry" in Zulu?',
        questionFr: 'Comment dit-on "désolé" en Zulu?',
        correctAnswer: 'Uxolo',
        options: ['Uxolo', 'Ngixolele', 'Kulungile', 'Ngiyacela']
      },
      {
        id: 'zu-s2-2-2',
        type: 'multiple-choice',
        question: 'What does "Ngixolele" mean?',
        questionFr: 'Que signifie "Ngixolele"?',
        correctAnswer: 'Forgive me',
        options: ['Forgive me', 'Sorry', 'No problem', 'I\'m okay']
      },
      {
        id: 'zu-s2-2-3',
        type: 'multiple-choice',
        question: 'How do you say "no problem" in Zulu?',
        questionFr: 'Comment dit-on "pas de problème" en Zulu?',
        correctAnswer: 'Akukho ndaba',
        options: ['Akukho ndaba', 'Uxolo', 'Ngixolele', 'Kulungile']
      },
      {
        id: 'zu-s2-2-4',
        type: 'multiple-choice',
        question: 'What does "Uxolo" mean?',
        questionFr: 'Que signifie "Uxolo"?',
        correctAnswer: 'Sorry / Peace',
        options: ['Sorry / Peace', 'Forgive me', 'No problem', 'It\'s okay']
      },
      {
        id: 'zu-s2-2-5',
        type: 'multiple-choice',
        question: 'How do you say "it\'s okay" in Zulu?',
        questionFr: 'Comment dit-on "c\'est bon" en Zulu?',
        correctAnswer: 'Kulungile',
        options: ['Kulungile', 'Uxolo', 'Ngixolele', 'Akukho ndaba']
      },
      {
        id: 'zu-s2-2-6',
        type: 'fill-blank',
        question: 'Complete: "Ngi___" = forgive me',
        questionFr: 'Complétez: "Ngi___" = pardonnez-moi',
        correctAnswer: 'xolele',
        hint: 'The verb for forgiveness',
        hintFr: 'Le verbe pour le pardon'
      },
      {
        id: 'zu-s2-2-7',
        type: 'multiple-choice',
        question: 'What does "Ngiyaxolisa" mean?',
        questionFr: 'Que signifie "Ngiyaxolisa"?',
        correctAnswer: 'I apologize',
        options: ['I apologize', 'I forgive', 'I agree', 'I understand']
      },
      {
        id: 'zu-s2-2-8',
        type: 'multiple-choice',
        question: 'In Zulu, "Uxolo" is also the word for:',
        questionFr: 'En Zulu, "Uxolo" est aussi le mot pour:',
        correctAnswer: 'Peace',
        options: ['Peace', 'Love', 'Joy', 'Hope']
      },
      {
        id: 'zu-s2-2-9',
        type: 'multiple-choice',
        question: 'How do you accept an apology in Zulu?',
        questionFr: 'Comment accepter une excuse en Zulu?',
        correctAnswer: 'Kulungile',
        options: ['Kulungile', 'Uxolo', 'Ngixolele', 'Ngiyacela']
      },
      {
        id: 'zu-s2-2-10',
        type: 'multiple-choice',
        question: 'What does "Akukho ndaba" mean?',
        questionFr: 'Que signifie "Akukho ndaba"?',
        correctAnswer: 'No problem / Never mind',
        options: ['No problem / Never mind', 'I am sorry', 'Forgive me', 'It is fine']
      },
      {
        id: 'zu-s2-2-11',
        type: 'type-answer',
        question: 'Type "forgive me" in Zulu',
        questionFr: 'Tapez "pardonnez-moi" en Zulu',
        correctAnswer: 'Ngixolele'
      },
      {
        id: 'zu-s2-2-12',
        type: 'multiple-choice',
        question: 'What does "Ngiyaxolisa" achieve?',
        questionFr: 'Qu\'exprime "Ngiyaxolisa"?',
        correctAnswer: 'It formally expresses an apology',
        options: ['It formally expresses an apology', 'It requests forgiveness', 'It accepts an apology', 'It greets someone']
      },
      {
        id: 'zu-s2-2-13',
        type: 'multiple-choice',
        question: 'How do you say "I\'m deeply sorry" in Zulu?',
        questionFr: 'Comment dire "je suis profondément désolé" en Zulu?',
        correctAnswer: 'Ngiyaxolisa kakhulu',
        options: ['Ngiyaxolisa kakhulu', 'Uxolo kakhulu', 'Ngixolele kakhulu', 'Kulungile kakhulu']
      },
      {
        id: 'zu-s2-2-14',
        type: 'multiple-choice',
        question: 'What does "Xola" mean on its own?',
        questionFr: 'Que signifie "Xola" seul?',
        correctAnswer: 'Be calm / Forgive (informal)',
        options: ['Be calm / Forgive (informal)', 'Come here', 'Sit down', 'Thank you']
      },
      {
        id: 'zu-s2-2-15',
        type: 'fill-blank',
        question: 'Complete: "U___" = sorry (informal)',
        questionFr: 'Complétez: "U___" = désolé (informel)',
        correctAnswer: 'xolo',
        hint: 'A single-word apology',
        hintFr: 'Une excuse en un seul mot'
      },
      {
        id: 'zu-s2-2-16',
        type: 'multiple-choice',
        question: 'In Zulu culture, apologizing starts with:',
        questionFr: 'Dans la culture zulu, les excuses commencent par:',
        correctAnswer: 'Uxolo',
        options: ['Uxolo', 'Ngiyabonga', 'Sawubona', 'Kulungile']
      },
      {
        id: 'zu-s2-2-17',
        type: 'multiple-choice',
        question: 'What does "Ngikhuluma ngokukhulu ukuzisola" mean?',
        questionFr: 'Que signifie "Ngikhuluma ngokukhulu ukuzisola"?',
        correctAnswer: 'I speak with great regret',
        options: ['I speak with great regret', 'I speak slowly', 'I speak clearly', 'I speak honestly']
      },
      {
        id: 'zu-s2-2-18',
        type: 'multiple-choice',
        question: 'How do you reassure someone after an accident?',
        questionFr: 'Comment rassurer quelqu\'un après un accident?',
        correctAnswer: 'Kulungile, akukho ndaba',
        options: ['Kulungile, akukho ndaba', 'Uxolo, ngixolele', 'Ngiyabonga, wenze kahle', 'Sawubona, ngiyacela']
      },
      {
        id: 'zu-s2-2-19',
        type: 'multiple-choice',
        question: 'What does "Ukuxolela" mean?',
        questionFr: 'Que signifie "Ukuxolela"?',
        correctAnswer: 'Forgiveness',
        options: ['Forgiveness', 'Apology', 'Peace', 'Kindness']
      },
      {
        id: 'zu-s2-2-20',
        type: 'type-answer',
        question: 'Type "sorry" in Zulu',
        questionFr: 'Tapez "désolé" en Zulu',
        correctAnswer: 'Uxolo'
      }
    ]
  },

  // Unit 3 — Yes, No & Agreement
  {
    id: 'zu-s2-3',
    type: 'vocabulary',
    title: 'Yes, No & Agreement',
    titleFr: 'Oui, Non et Accord',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-3-1',
        type: 'multiple-choice',
        question: 'How do you say "yes" in Zulu?',
        questionFr: 'Comment dit-on "oui" en Zulu?',
        correctAnswer: 'Yebo',
        options: ['Yebo', 'Cha', 'Mhlawumbe', 'Kulungile']
      },
      {
        id: 'zu-s2-3-2',
        type: 'multiple-choice',
        question: 'How do you say "no" in Zulu?',
        questionFr: 'Comment dit-on "non" en Zulu?',
        correctAnswer: 'Cha',
        options: ['Cha', 'Yebo', 'Mhlawumbe', 'Ngiyavuma']
      },
      {
        id: 'zu-s2-3-3',
        type: 'multiple-choice',
        question: 'What does "Yebo ngempela" mean?',
        questionFr: 'Que signifie "Yebo ngempela"?',
        correctAnswer: 'Yes indeed / Absolutely',
        options: ['Yes indeed / Absolutely', 'Yes please', 'Yes of course', 'Yes maybe']
      },
      {
        id: 'zu-s2-3-4',
        type: 'multiple-choice',
        question: 'How do you say "maybe" in Zulu?',
        questionFr: 'Comment dit-on "peut-être" en Zulu?',
        correctAnswer: 'Mhlawumbe',
        options: ['Mhlawumbe', 'Yebo', 'Cha', 'Ngiyavuma']
      },
      {
        id: 'zu-s2-3-5',
        type: 'multiple-choice',
        question: 'What does "Ngiyavuma" mean?',
        questionFr: 'Que signifie "Ngiyavuma"?',
        correctAnswer: 'I agree',
        options: ['I agree', 'I disagree', 'I understand', 'I know']
      },
      {
        id: 'zu-s2-3-6',
        type: 'multiple-choice',
        question: 'How do you say "of course" in Zulu?',
        questionFr: 'Comment dit-on "bien sûr" en Zulu?',
        correctAnswer: 'Ngempela',
        options: ['Ngempela', 'Mhlawumbe', 'Cha', 'Yebo']
      },
      {
        id: 'zu-s2-3-7',
        type: 'fill-blank',
        question: 'Complete: "Yebo ___" = yes indeed',
        questionFr: 'Complétez: "Yebo ___" = oui vraiment',
        correctAnswer: 'ngempela',
        hint: 'The word meaning "truly/indeed"',
        hintFr: 'Le mot signifiant "vraiment"'
      },
      {
        id: 'zu-s2-3-8',
        type: 'multiple-choice',
        question: 'What does "Angivumi" mean?',
        questionFr: 'Que signifie "Angivumi"?',
        correctAnswer: 'I don\'t agree',
        options: ['I don\'t agree', 'I agree', 'I don\'t know', 'I don\'t want']
      },
      {
        id: 'zu-s2-3-9',
        type: 'multiple-choice',
        question: 'How do you say "that is correct" in Zulu?',
        questionFr: 'Comment dit-on "c\'est correct" en Zulu?',
        correctAnswer: 'Kulungile / Kunjalo',
        options: ['Kulungile / Kunjalo', 'Yebo yebo', 'Ngempela', 'Mhlawumbe']
      },
      {
        id: 'zu-s2-3-10',
        type: 'multiple-choice',
        question: 'What does "Nami" mean?',
        questionFr: 'Que signifie "Nami"?',
        correctAnswer: 'Me too',
        options: ['Me too', 'You too', 'Us too', 'Them too']
      },
      {
        id: 'zu-s2-3-11',
        type: 'type-answer',
        question: 'Type "yes" in Zulu',
        questionFr: 'Tapez "oui" en Zulu',
        correctAnswer: 'Yebo'
      },
      {
        id: 'zu-s2-3-12',
        type: 'multiple-choice',
        question: 'How do you express "me too" in Zulu?',
        questionFr: 'Comment dire "moi aussi" en Zulu?',
        correctAnswer: 'Nami',
        options: ['Nami', 'Nabo', 'Nawe', 'Naye']
      },
      {
        id: 'zu-s2-3-13',
        type: 'multiple-choice',
        question: 'What does "Kunjalo" mean?',
        questionFr: 'Que signifie "Kunjalo"?',
        correctAnswer: 'That\'s right / Indeed',
        options: ['That\'s right / Indeed', 'That\'s wrong', 'That\'s good', 'That\'s enough']
      },
      {
        id: 'zu-s2-3-14',
        type: 'multiple-choice',
        question: 'What does "Cha" mean?',
        questionFr: 'Que signifie "Cha"?',
        correctAnswer: 'No',
        options: ['No', 'Yes', 'Maybe', 'Never']
      },
      {
        id: 'zu-s2-3-15',
        type: 'fill-blank',
        question: 'Complete: "Ngiya___" = I agree',
        questionFr: 'Complétez: "Ngiya___" = je suis d\'accord',
        correctAnswer: 'vuma',
        hint: 'The verb for agreeing/accepting',
        hintFr: 'Le verbe pour accepter/être d\'accord'
      },
      {
        id: 'zu-s2-3-16',
        type: 'multiple-choice',
        question: 'How do you say "I think so" in Zulu?',
        questionFr: 'Comment dit-on "je pense que oui" en Zulu?',
        correctAnswer: 'Ngicabanga ukuthi kunjalo',
        options: ['Ngicabanga ukuthi kunjalo', 'Mhlawumbe kunjalo', 'Yebo ngempela', 'Ngiyavuma']
      },
      {
        id: 'zu-s2-3-17',
        type: 'multiple-choice',
        question: 'Which phrase shows the strongest agreement?',
        questionFr: 'Quelle phrase montre l\'accord le plus fort?',
        correctAnswer: 'Yebo ngempela',
        options: ['Yebo ngempela', 'Mhlawumbe', 'Ngiyavuma', 'Kunjalo']
      },
      {
        id: 'zu-s2-3-18',
        type: 'multiple-choice',
        question: 'How do you say "maybe" in Zulu?',
        questionFr: 'Comment dit-on "peut-être" en Zulu?',
        correctAnswer: 'Mhlawumbe',
        options: ['Mhlawumbe', 'Yebo', 'Cha', 'Kunjalo']
      },
      {
        id: 'zu-s2-3-19',
        type: 'multiple-choice',
        question: 'What does "Angivumi" signal?',
        questionFr: 'Qu\'indique "Angivumi"?',
        correctAnswer: 'Disagreement or refusal',
        options: ['Disagreement or refusal', 'Agreement', 'Confusion', 'Surprise']
      },
      {
        id: 'zu-s2-3-20',
        type: 'type-answer',
        question: 'Type "of course" in Zulu',
        questionFr: 'Tapez "bien sûr" en Zulu',
        correctAnswer: 'Ngempela'
      }
    ]
  },

  // Unit 4 — Welcome & Hospitality
  {
    id: 'zu-s2-4',
    type: 'vocabulary',
    title: 'Welcome & Hospitality',
    titleFr: 'Bienvenue et Hospitalité',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-4-1',
        type: 'multiple-choice',
        question: 'How do you say "welcome" in Zulu?',
        questionFr: 'Comment dit-on "bienvenue" en Zulu?',
        correctAnswer: 'Wamukelekile',
        options: ['Wamukelekile', 'Ngena', 'Hlala', 'Ngiyabonga']
      },
      {
        id: 'zu-s2-4-2',
        type: 'multiple-choice',
        question: 'What does "Ngena" mean?',
        questionFr: 'Que signifie "Ngena"?',
        correctAnswer: 'Come in',
        options: ['Come in', 'Sit down', 'Welcome', 'Eat']
      },
      {
        id: 'zu-s2-4-3',
        type: 'multiple-choice',
        question: 'How do you say "sit down" in Zulu?',
        questionFr: 'Comment dit-on "asseyez-vous" en Zulu?',
        correctAnswer: 'Hlala',
        options: ['Hlala', 'Ngena', 'Wamukelekile', 'Dlula']
      },
      {
        id: 'zu-s2-4-4',
        type: 'multiple-choice',
        question: 'What does "Yidla" mean?',
        questionFr: 'Que signifie "Yidla"?',
        correctAnswer: 'Please eat',
        options: ['Please eat', 'Please sit', 'Come in', 'Welcome']
      },
      {
        id: 'zu-s2-4-5',
        type: 'multiple-choice',
        question: 'How do you say "let me help you" in Zulu?',
        questionFr: 'Comment dit-on "laissez-moi vous aider" en Zulu?',
        correctAnswer: 'Ake ngikusize',
        options: ['Ake ngikusize', 'Ngiyabonga', 'Wamukelekile', 'Ngiyacela']
      },
      {
        id: 'zu-s2-4-6',
        type: 'fill-blank',
        question: 'Complete: "Wamukel___" = welcome',
        questionFr: 'Complétez: "Wamukel___" = bienvenue',
        correctAnswer: 'ekile',
        hint: 'The Zulu word for welcome is a past-tense form',
        hintFr: 'Le mot zulu pour bienvenue est une forme passée'
      },
      {
        id: 'zu-s2-4-7',
        type: 'multiple-choice',
        question: 'What does "Izindlu zethu ziyindlu yakho" mean?',
        questionFr: 'Que signifie "Izindlu zethu ziyindlu yakho"?',
        correctAnswer: 'Our home is your home',
        options: ['Our home is your home', 'Welcome to our home', 'Please come inside', 'Sit and eat']
      },
      {
        id: 'zu-s2-4-8',
        type: 'multiple-choice',
        question: 'How do you offer food to a guest in Zulu?',
        questionFr: 'Comment offrir de la nourriture à un invité en Zulu?',
        correctAnswer: 'Yidla',
        options: ['Yidla', 'Hlala', 'Ngena', 'Wamukelekile']
      },
      {
        id: 'zu-s2-4-9',
        type: 'multiple-choice',
        question: 'What does "Hlala" mean?',
        questionFr: 'Que signifie "Hlala"?',
        correctAnswer: 'Sit / Stay',
        options: ['Sit / Stay', 'Come in', 'Welcome', 'Eat']
      },
      {
        id: 'zu-s2-4-10',
        type: 'multiple-choice',
        question: 'When a visitor arrives, you say:',
        questionFr: 'Quand un visiteur arrive, vous dites:',
        correctAnswer: 'Wamukelekile',
        options: ['Wamukelekile', 'Sala kahle', 'Ngiyabonga', 'Kulungile']
      },
      {
        id: 'zu-s2-4-11',
        type: 'type-answer',
        question: 'Type "welcome" in Zulu',
        questionFr: 'Tapez "bienvenue" en Zulu',
        correctAnswer: 'Wamukelekile'
      },
      {
        id: 'zu-s2-4-12',
        type: 'multiple-choice',
        question: 'What does "Ngena" literally mean?',
        questionFr: 'Que signifie littéralement "Ngena"?',
        correctAnswer: 'Enter',
        options: ['Enter', 'Stay', 'Go', 'Eat']
      },
      {
        id: 'zu-s2-4-13',
        type: 'multiple-choice',
        question: 'How do you say "please come in and sit"?',
        questionFr: 'Comment dit-on "veuillez entrer et vous asseoir"?',
        correctAnswer: 'Ngena, uhlale',
        options: ['Ngena, uhlale', 'Wamukelekile, yidla', 'Hlala, ngena', 'Yidla, ngena']
      },
      {
        id: 'zu-s2-4-14',
        type: 'multiple-choice',
        question: 'What does "Thatha" mean when offering something?',
        questionFr: 'Que signifie "Thatha" quand on offre quelque chose?',
        correctAnswer: 'Take this',
        options: ['Take this', 'Give this', 'Eat this', 'Drink this']
      },
      {
        id: 'zu-s2-4-15',
        type: 'fill-blank',
        question: 'Complete: "Ake ngiku___" = let me help you',
        questionFr: 'Complétez: "Ake ngiku___" = laissez-moi vous aider',
        correctAnswer: 'size',
        hint: 'The verb for helping',
        hintFr: 'Le verbe pour aider'
      },
      {
        id: 'zu-s2-4-16',
        type: 'multiple-choice',
        question: 'Which phrase expresses Zulu hospitality?',
        questionFr: 'Quelle phrase exprime l\'hospitalité zulu?',
        correctAnswer: 'Izindlu zethu ziyindlu yakho',
        options: ['Izindlu zethu ziyindlu yakho', 'Wamukelekile', 'Ngena', 'Hlala']
      },
      {
        id: 'zu-s2-4-17',
        type: 'multiple-choice',
        question: 'What does "Wamukelwa" mean?',
        questionFr: 'Que signifie "Wamukelwa"?',
        correctAnswer: 'You are received / You are welcomed',
        options: ['You are received / You are welcomed', 'You are eating', 'You are sitting', 'You are coming']
      },
      {
        id: 'zu-s2-4-18',
        type: 'multiple-choice',
        question: 'How do you say "please drink" in Zulu?',
        questionFr: 'Comment dit-on "veuillez boire" en Zulu?',
        correctAnswer: 'Phuza',
        options: ['Phuza', 'Yidla', 'Hlala', 'Ngena']
      },
      {
        id: 'zu-s2-4-19',
        type: 'multiple-choice',
        question: 'Which word is used to invite someone inside?',
        questionFr: 'Quel mot est utilisé pour inviter quelqu\'un à entrer?',
        correctAnswer: 'Ngena',
        options: ['Ngena', 'Hlala', 'Wamukelekile', 'Yidla']
      },
      {
        id: 'zu-s2-4-20',
        type: 'type-answer',
        question: 'Type "come in" in Zulu',
        questionFr: 'Tapez "entrez" en Zulu',
        correctAnswer: 'Ngena'
      }
    ]
  },

  // Unit 5 — Making Polite Requests
  {
    id: 'zu-s2-5',
    type: 'vocabulary',
    title: 'Making Polite Requests',
    titleFr: 'Formuler des Demandes Polies',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-5-1',
        type: 'multiple-choice',
        question: 'How do you say "I want" in Zulu?',
        questionFr: 'Comment dit-on "je veux" en Zulu?',
        correctAnswer: 'Ngifuna',
        options: ['Ngifuna', 'Ngidinga', 'Ngicela', 'Ngiyacela']
      },
      {
        id: 'zu-s2-5-2',
        type: 'multiple-choice',
        question: 'What does "Ngidinga" mean?',
        questionFr: 'Que signifie "Ngidinga"?',
        correctAnswer: 'I need',
        options: ['I need', 'I want', 'I have', 'I go']
      },
      {
        id: 'zu-s2-5-3',
        type: 'multiple-choice',
        question: 'How do you ask "can you help me?" in Zulu?',
        questionFr: 'Comment demander "pouvez-vous m\'aider?" en Zulu?',
        correctAnswer: 'Ungangisiza?',
        options: ['Ungangisiza?', 'Ngifuna usizo', 'Ngicela ukusiza', 'Ngiyacela']
      },
      {
        id: 'zu-s2-5-4',
        type: 'multiple-choice',
        question: 'What does "Ngicela usizo" mean?',
        questionFr: 'Que signifie "Ngicela usizo"?',
        correctAnswer: 'Please help me / I request help',
        options: ['Please help me / I request help', 'Please come here', 'Please wait', 'Please sit']
      },
      {
        id: 'zu-s2-5-5',
        type: 'multiple-choice',
        question: 'How do you say "I am looking for" in Zulu?',
        questionFr: 'Comment dit-on "je cherche" en Zulu?',
        correctAnswer: 'Ngifuna / Ngidinga',
        options: ['Ngifuna / Ngidinga', 'Ngihamba', 'Ngiya', 'Ngifike']
      },
      {
        id: 'zu-s2-5-6',
        type: 'fill-blank',
        question: 'Complete: "Ngi___" = I want',
        questionFr: 'Complétez: "Ngi___" = je veux',
        correctAnswer: 'funa',
        hint: 'The verb for wanting',
        hintFr: 'Le verbe pour vouloir'
      },
      {
        id: 'zu-s2-5-7',
        type: 'multiple-choice',
        question: 'What does "Ungangisiza?" mean?',
        questionFr: 'Que signifie "Ungangisiza?"?',
        correctAnswer: 'Can you help me?',
        options: ['Can you help me?', 'Do you need help?', 'Can I help you?', 'Are you helping me?']
      },
      {
        id: 'zu-s2-5-8',
        type: 'multiple-choice',
        question: 'How do you say "I need water" in Zulu?',
        questionFr: 'Comment dit-on "j\'ai besoin d\'eau" en Zulu?',
        correctAnswer: 'Ngidinga amanzi',
        options: ['Ngidinga amanzi', 'Ngifuna amanzi', 'Ngicela amanzi', 'Ngiphuza amanzi']
      },
      {
        id: 'zu-s2-5-9',
        type: 'multiple-choice',
        question: 'What does "Ngifuna" mean?',
        questionFr: 'Que signifie "Ngifuna"?',
        correctAnswer: 'I want',
        options: ['I want', 'I need', 'I have', 'I see']
      },
      {
        id: 'zu-s2-5-10',
        type: 'multiple-choice',
        question: 'How do you politely say "please give me" in Zulu?',
        questionFr: 'Comment dire poliment "donnez-moi s\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngicela unginike',
        options: ['Ngicela unginike', 'Ngifuna okunika', 'Ngidinga unike', 'Ngiyacela unike']
      },
      {
        id: 'zu-s2-5-11',
        type: 'type-answer',
        question: 'Type "I need" in Zulu',
        questionFr: 'Tapez "j\'ai besoin" en Zulu',
        correctAnswer: 'Ngidinga'
      },
      {
        id: 'zu-s2-5-12',
        type: 'multiple-choice',
        question: 'What is the difference between "Ngifuna" and "Ngidinga"?',
        questionFr: 'Quelle est la différence entre "Ngifuna" et "Ngidinga"?',
        correctAnswer: '"Ngifuna" = want, "Ngidinga" = need',
        options: ['"Ngifuna" = want, "Ngidinga" = need', '"Ngifuna" = need, "Ngidinga" = want', 'They mean the same thing', '"Ngidinga" is more polite']
      },
      {
        id: 'zu-s2-5-13',
        type: 'multiple-choice',
        question: 'How do you say "please help me" in Zulu?',
        questionFr: 'Comment dit-on "aidez-moi s\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngicela usizo',
        options: ['Ngicela usizo', 'Ngifuna ukusiza', 'Ungangisiza', 'Ngidinga wena']
      },
      {
        id: 'zu-s2-5-14',
        type: 'multiple-choice',
        question: 'What does "Ngicela" mean at the start of a request?',
        questionFr: 'Que signifie "Ngicela" au début d\'une demande?',
        correctAnswer: 'Please / I request',
        options: ['Please / I request', 'I want', 'I need', 'Thank you']
      },
      {
        id: 'zu-s2-5-15',
        type: 'fill-blank',
        question: 'Complete: "Ngi___" = I need',
        questionFr: 'Complétez: "Ngi___" = j\'ai besoin',
        correctAnswer: 'dinga',
        hint: 'The Zulu verb for needing',
        hintFr: 'Le verbe zulu pour avoir besoin'
      },
      {
        id: 'zu-s2-5-16',
        type: 'multiple-choice',
        question: 'How do you say "can you please?" in Zulu?',
        questionFr: 'Comment dit-on "pouvez-vous s\'il vous plaît?" en Zulu?',
        correctAnswer: 'Ungacela?',
        options: ['Ungacela?', 'Ungafuna?', 'Unganika?', 'Ungadinga?']
      },
      {
        id: 'zu-s2-5-17',
        type: 'multiple-choice',
        question: 'What does "Usizo" mean?',
        questionFr: 'Que signifie "Usizo"?',
        correctAnswer: 'Help / Assistance',
        options: ['Help / Assistance', 'Water', 'Food', 'Place']
      },
      {
        id: 'zu-s2-5-18',
        type: 'multiple-choice',
        question: 'How do you say "I want to go" in Zulu?',
        questionFr: 'Comment dit-on "je veux partir" en Zulu?',
        correctAnswer: 'Ngifuna ukuhamba',
        options: ['Ngifuna ukuhamba', 'Ngidinga ukuhamba', 'Ngicela ukuhamba', 'Ngiyahamba']
      },
      {
        id: 'zu-s2-5-19',
        type: 'multiple-choice',
        question: 'Which phrase is used to begin a polite request?',
        questionFr: 'Quelle phrase est utilisée pour commencer une demande polie?',
        correctAnswer: 'Ngicela',
        options: ['Ngicela', 'Ngifuna', 'Ngidinga', 'Ngiyabonga']
      },
      {
        id: 'zu-s2-5-20',
        type: 'type-answer',
        question: 'Type "please help me" in Zulu',
        questionFr: 'Tapez "aidez-moi s\'il vous plaît" en Zulu',
        correctAnswer: 'Ngicela usizo'
      }
    ]
  },

  // Unit 6 — Compliments & Encouragement
  {
    id: 'zu-s2-6',
    type: 'vocabulary',
    title: 'Compliments & Encouragement',
    titleFr: 'Compliments et Encouragement',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'zu-s2-6-1',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Zulu?',
        questionFr: 'Comment dit-on "bien fait" en Zulu?',
        correctAnswer: 'Wenze kahle',
        options: ['Wenze kahle', 'Muhle', 'Ngiyajabula', 'Kulungile']
      },
      {
        id: 'zu-s2-6-2',
        type: 'multiple-choice',
        question: 'What does "Muhle" mean?',
        questionFr: 'Que signifie "Muhle"?',
        correctAnswer: 'Beautiful / Good-looking',
        options: ['Beautiful / Good-looking', 'Smart', 'Strong', 'Kind']
      },
      {
        id: 'zu-s2-6-3',
        type: 'multiple-choice',
        question: 'How do you say "you are smart" in Zulu?',
        questionFr: 'Comment dit-on "tu es intelligent" en Zulu?',
        correctAnswer: 'Uhlakanipha',
        options: ['Uhlakanipha', 'Umuhle', 'Unamandla', 'Unomusa']
      },
      {
        id: 'zu-s2-6-4',
        type: 'multiple-choice',
        question: 'What does "Ngiyajabula" mean?',
        questionFr: 'Que signifie "Ngiyajabula"?',
        correctAnswer: 'I am happy',
        options: ['I am happy', 'I am sad', 'I am tired', 'I am ready']
      },
      {
        id: 'zu-s2-6-5',
        type: 'multiple-choice',
        question: 'How do you say "very good" in Zulu?',
        questionFr: 'Comment dit-on "très bien" en Zulu?',
        correctAnswer: 'Kulungile kakhulu',
        options: ['Kulungile kakhulu', 'Wenze kahle kakhulu', 'Muhle kakhulu', 'Yebo kakhulu']
      },
      {
        id: 'zu-s2-6-6',
        type: 'fill-blank',
        question: 'Complete: "Wenze ___" = well done',
        questionFr: 'Complétez: "Wenze ___" = bien fait',
        correctAnswer: 'kahle',
        hint: 'The word meaning "well/nicely"',
        hintFr: 'Le mot signifiant "bien"'
      },
      {
        id: 'zu-s2-6-7',
        type: 'multiple-choice',
        question: 'How do you say "you are beautiful" in Zulu?',
        questionFr: 'Comment dit-on "tu es beau/belle" en Zulu?',
        correctAnswer: 'Umuhle',
        options: ['Umuhle', 'Uhlakanipha', 'Unamandla', 'Unomusa']
      },
      {
        id: 'zu-s2-6-8',
        type: 'multiple-choice',
        question: 'What does "Unamandla" mean?',
        questionFr: 'Que signifie "Unamandla"?',
        correctAnswer: 'You are strong',
        options: ['You are strong', 'You are smart', 'You are beautiful', 'You are kind']
      },
      {
        id: 'zu-s2-6-9',
        type: 'multiple-choice',
        question: 'How do you encourage someone in Zulu?',
        questionFr: 'Comment encourager quelqu\'un en Zulu?',
        correctAnswer: 'Qhubeka, wenza kahle',
        options: ['Qhubeka, wenza kahle', 'Yebo, kulungile', 'Ngiyabonga, muhle', 'Uxolo, ngena']
      },
      {
        id: 'zu-s2-6-10',
        type: 'multiple-choice',
        question: 'What does "Ngiyakuthanda" mean?',
        questionFr: 'Que signifie "Ngiyakuthanda"?',
        correctAnswer: 'I love you / I like you',
        options: ['I love you / I like you', 'I see you', 'I need you', 'I thank you']
      },
      {
        id: 'zu-s2-6-11',
        type: 'type-answer',
        question: 'Type "beautiful" in Zulu',
        questionFr: 'Tapez "beau/belle" en Zulu',
        correctAnswer: 'Muhle'
      },
      {
        id: 'zu-s2-6-12',
        type: 'multiple-choice',
        question: 'What does "Unomusa" mean?',
        questionFr: 'Que signifie "Unomusa"?',
        correctAnswer: 'You are kind',
        options: ['You are kind', 'You are smart', 'You are strong', 'You are beautiful']
      },
      {
        id: 'zu-s2-6-13',
        type: 'multiple-choice',
        question: 'How do you say "I am proud of you" in Zulu?',
        questionFr: 'Comment dit-on "je suis fier de toi" en Zulu?',
        correctAnswer: 'Ngiyaniqhenya ngawe',
        options: ['Ngiyaniqhenya ngawe', 'Ngiyakuthanda', 'Wenze kahle', 'Ngiyajabula']
      },
      {
        id: 'zu-s2-6-14',
        type: 'multiple-choice',
        question: 'What does "Wenze kahle" literally mean?',
        questionFr: 'Que signifie littéralement "Wenze kahle"?',
        correctAnswer: 'You did well',
        options: ['You did well', 'You are good', 'You are beautiful', 'You are kind']
      },
      {
        id: 'zu-s2-6-15',
        type: 'fill-blank',
        question: 'Complete: "U___" = you are beautiful',
        questionFr: 'Complétez: "U___" = tu es beau/belle',
        correctAnswer: 'muhle',
        hint: 'The Zulu word for beautiful',
        hintFr: 'Le mot zulu pour beau/belle'
      },
      {
        id: 'zu-s2-6-16',
        type: 'multiple-choice',
        question: 'How do you say "keep going" in Zulu?',
        questionFr: 'Comment dit-on "continue" en Zulu?',
        correctAnswer: 'Qhubeka',
        options: ['Qhubeka', 'Hlala', 'Ngena', 'Yidla']
      },
      {
        id: 'zu-s2-6-17',
        type: 'multiple-choice',
        question: 'What does "Uhlakanipha" mean?',
        questionFr: 'Que signifie "Uhlakanipha"?',
        correctAnswer: 'You are smart / intelligent',
        options: ['You are smart / intelligent', 'You are beautiful', 'You are strong', 'You are kind']
      },
      {
        id: 'zu-s2-6-18',
        type: 'multiple-choice',
        question: 'How do you express joy in Zulu?',
        questionFr: 'Comment exprimer la joie en Zulu?',
        correctAnswer: 'Ngiyajabula',
        options: ['Ngiyajabula', 'Ngiyadabuka', 'Ngiyacela', 'Ngidinga']
      },
      {
        id: 'zu-s2-6-19',
        type: 'multiple-choice',
        question: 'What does "Kahle" mean on its own?',
        questionFr: 'Que signifie "Kahle" seul?',
        correctAnswer: 'Well / Nicely / Slowly',
        options: ['Well / Nicely / Slowly', 'Good', 'Beautiful', 'Smart']
      },
      {
        id: 'zu-s2-6-20',
        type: 'type-answer',
        question: 'Type "well done" in Zulu',
        questionFr: 'Tapez "bien fait" en Zulu',
        correctAnswer: 'Wenze kahle'
      }
    ]
  },

  // Unit 7 — Polite Speech Review
  {
    id: 'zu-s2-7',
    type: 'vocabulary',
    title: 'Polite Speech Review',
    titleFr: 'Révision du Discours Poli',
    level: 2,
    xpReward: 20,
    exercises: [
      {
        id: 'zu-s2-7-1',
        type: 'multiple-choice',
        question: 'How do you say "please" in Zulu?',
        questionFr: 'Comment dit-on "s\'il vous plaît" en Zulu?',
        correctAnswer: 'Ngiyacela',
        options: ['Ngiyacela', 'Ngiyabonga', 'Kulungile', 'Wamukelekile']
      },
      {
        id: 'zu-s2-7-2',
        type: 'multiple-choice',
        question: 'What does "Ngiyabonga" mean?',
        questionFr: 'Que signifie "Ngiyabonga"?',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'Sorry', 'You\'re welcome']
      },
      {
        id: 'zu-s2-7-3',
        type: 'multiple-choice',
        question: 'How do you say "sorry" in Zulu?',
        questionFr: 'Comment dit-on "désolé" en Zulu?',
        correctAnswer: 'Uxolo',
        options: ['Uxolo', 'Ngixolele', 'Kulungile', 'Ngiyacela']
      },
      {
        id: 'zu-s2-7-4',
        type: 'multiple-choice',
        question: 'What does "Yebo" mean?',
        questionFr: 'Que signifie "Yebo"?',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Maybe', 'Of course']
      },
      {
        id: 'zu-s2-7-5',
        type: 'multiple-choice',
        question: 'How do you say "welcome" in Zulu?',
        questionFr: 'Comment dit-on "bienvenue" en Zulu?',
        correctAnswer: 'Wamukelekile',
        options: ['Wamukelekile', 'Ngena', 'Hlala', 'Ngiyabonga']
      },
      {
        id: 'zu-s2-7-6',
        type: 'multiple-choice',
        question: 'What does "Ngifuna" mean?',
        questionFr: 'Que signifie "Ngifuna"?',
        correctAnswer: 'I want',
        options: ['I want', 'I need', 'I have', 'I go']
      },
      {
        id: 'zu-s2-7-7',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Zulu?',
        questionFr: 'Comment dit-on "bien fait" en Zulu?',
        correctAnswer: 'Wenze kahle',
        options: ['Wenze kahle', 'Muhle', 'Ngiyajabula', 'Kulungile']
      },
      {
        id: 'zu-s2-7-8',
        type: 'fill-blank',
        question: 'Complete: "Ngiyabonga ___" = thank you very much',
        questionFr: 'Complétez: "Ngiyabonga ___" = merci beaucoup',
        correctAnswer: 'kakhulu',
        hint: 'The word meaning "very much"',
        hintFr: 'Le mot signifiant "beaucoup"'
      },
      {
        id: 'zu-s2-7-9',
        type: 'multiple-choice',
        question: 'What does "Ngixolele" mean?',
        questionFr: 'Que signifie "Ngixolele"?',
        correctAnswer: 'Forgive me',
        options: ['Forgive me', 'Help me', 'Greet me', 'Thank me']
      },
      {
        id: 'zu-s2-7-10',
        type: 'multiple-choice',
        question: 'How do you say "I agree" in Zulu?',
        questionFr: 'Comment dit-on "je suis d\'accord" en Zulu?',
        correctAnswer: 'Ngiyavuma',
        options: ['Ngiyavuma', 'Angivumi', 'Yebo', 'Kulungile']
      },
      {
        id: 'zu-s2-7-11',
        type: 'multiple-choice',
        question: 'What does "Ngena" mean?',
        questionFr: 'Que signifie "Ngena"?',
        correctAnswer: 'Come in',
        options: ['Come in', 'Sit down', 'Welcome', 'Please eat']
      },
      {
        id: 'zu-s2-7-12',
        type: 'multiple-choice',
        question: 'How do you say "I need" in Zulu?',
        questionFr: 'Comment dit-on "j\'ai besoin" en Zulu?',
        correctAnswer: 'Ngidinga',
        options: ['Ngidinga', 'Ngifuna', 'Ngicela', 'Ngihamba']
      },
      {
        id: 'zu-s2-7-13',
        type: 'type-answer',
        question: 'Type "thank you very much" in Zulu',
        questionFr: 'Tapez "merci beaucoup" en Zulu',
        correctAnswer: 'Ngiyabonga kakhulu'
      },
      {
        id: 'zu-s2-7-14',
        type: 'multiple-choice',
        question: 'What does "Mhlawumbe" mean?',
        questionFr: 'Que signifie "Mhlawumbe"?',
        correctAnswer: 'Maybe',
        options: ['Maybe', 'Never', 'Always', 'Of course']
      },
      {
        id: 'zu-s2-7-15',
        type: 'multiple-choice',
        question: 'How do you say "I am happy" in Zulu?',
        questionFr: 'Comment dit-on "je suis heureux" en Zulu?',
        correctAnswer: 'Ngiyajabula',
        options: ['Ngiyajabula', 'Ngiyadabuka', 'Ngiyacela', 'Ngidinga']
      },
      {
        id: 'zu-s2-7-16',
        type: 'fill-blank',
        question: 'Complete: "H___" = sit down',
        questionFr: 'Complétez: "H___" = asseyez-vous',
        correctAnswer: 'lala',
        hint: 'Also means "stay"',
        hintFr: 'Signifie aussi "rester"'
      },
      {
        id: 'zu-s2-7-17',
        type: 'multiple-choice',
        question: 'What does "Kulungile" mean?',
        questionFr: 'Que signifie "Kulungile"?',
        correctAnswer: 'It\'s okay / You\'re welcome',
        options: ['It\'s okay / You\'re welcome', 'I am sorry', 'I am grateful', 'I am happy']
      },
      {
        id: 'zu-s2-7-18',
        type: 'multiple-choice',
        question: 'How do you say "no" in Zulu?',
        questionFr: 'Comment dit-on "non" en Zulu?',
        correctAnswer: 'Cha',
        options: ['Cha', 'Yebo', 'Mhlawumbe', 'Kulungile']
      },
      {
        id: 'zu-s2-7-19',
        type: 'multiple-choice',
        question: 'What does "Muhle" mean?',
        questionFr: 'Que signifie "Muhle"?',
        correctAnswer: 'Beautiful',
        options: ['Beautiful', 'Good', 'Smart', 'Happy']
      },
      {
        id: 'zu-s2-7-20',
        type: 'type-answer',
        question: 'Type "forgive me" in Zulu',
        questionFr: 'Tapez "pardonnez-moi" en Zulu',
        correctAnswer: 'Ngixolele'
      }
    ]
  }
];
