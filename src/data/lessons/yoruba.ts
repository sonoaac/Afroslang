import { Lesson } from '../../types';

export const yorubaLessons: Lesson[] = [
  // STAGE 1 - MISSION 1: GREETINGS (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-1',
    type: 'vocabulary',
    title: 'Basic Greetings',
    titleFr: 'Salutations de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'yo-v1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Yoruba?',
        questionFr: 'Comment dit-on "Bonjour" en Yoruba?',
        correctAnswer: 'Bawo ni',
        options: ['Bawo ni', 'O dabo', 'E se', 'Jowo']
      },
      {
        id: 'yo-v2',
        type: 'multiple-choice',
        question: 'What does "Bawo ni" mean?',
        questionFr: 'Que signifie "Bawo ni"?',
        correctAnswer: 'Hello',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please']
      },
      {
        id: 'yo-v3',
        type: 'type-answer',
        question: 'Type the Yoruba word for "Goodbye"',
        questionFr: 'Tapez le mot Yoruba pour "Au revoir"',
        correctAnswer: 'O dabo'
      },
      {
        id: 'yo-v4',
        type: 'multiple-choice',
        question: 'What is "Good morning" in Yoruba?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Yoruba?',
        correctAnswer: 'E kaaro',
        options: ['E kaaro', 'E kaasan', 'E ku ale', 'Bawo ni']
      },
      {
        id: 'yo-v5',
        type: 'multiple-choice',
        question: '"E kaaro" means:',
        questionFr: '"E kaaro" signifie:',
        correctAnswer: 'Good morning',
        options: ['Good morning', 'Good afternoon', 'Good evening', 'Hello']
      },
      {
        id: 'yo-v6',
        type: 'multiple-choice',
        question: 'How do you say "Good afternoon" in Yoruba?',
        questionFr: 'Comment dit-on "Bon après-midi" en Yoruba?',
        correctAnswer: 'E kaasan',
        options: ['E kaasan', 'E kaaro', 'E ku ale', 'Bawo ni']
      },
      {
        id: 'yo-v7',
        type: 'type-answer',
        question: 'Type "Good evening" in Yoruba',
        questionFr: 'Tapez "Bonsoir" en Yoruba',
        correctAnswer: 'E ku ale'
      },
      {
        id: 'yo-v8',
        type: 'multiple-choice',
        question: 'What does "Bawo ni o?" mean?',
        questionFr: 'Que signifie "Bawo ni o?"?',
        correctAnswer: 'How are you?',
        options: ['How are you?', 'What is your name?', 'Where are you?', 'How old are you?']
      },
      {
        id: 'yo-v9',
        type: 'multiple-choice',
        question: 'How do you respond to "Bawo ni o?"',
        questionFr: 'Comment répondre à "Bawo ni o?"?',
        correctAnswer: 'Mo wa daadaa',
        options: ['Mo wa daadaa', 'Orukọ mi ni...', 'Mo wa...', 'Mo ni ọdun...']
      },
      {
        id: 'yo-v10',
        type: 'type-answer',
        question: 'Type "I am fine" in Yoruba',
        questionFr: 'Tapez "Je vais bien" en Yoruba',
        correctAnswer: 'Mo wa daadaa'
      },
      {
        id: 'yo-v11',
        type: 'multiple-choice',
        question: 'What is "Welcome" in Yoruba?',
        questionFr: 'Comment dit-on "Bienvenue" en Yoruba?',
        correctAnswer: 'E kaabo',
        options: ['E kaabo', 'Bawo ni', 'E se', 'Jowo']
      },
      {
        id: 'yo-v12',
        type: 'multiple-choice',
        question: '"E kaabo" means:',
        questionFr: '"E kaabo" signifie:',
        correctAnswer: 'Welcome',
        options: ['Hello', 'Welcome', 'Thank you', 'Goodbye']
      },
      {
        id: 'yo-v13',
        type: 'type-answer',
        question: 'Type "See you later" in Yoruba',
        questionFr: 'Tapez "À bientôt" en Yoruba',
        correctAnswer: 'O dabo'
      },
      {
        id: 'yo-v14',
        type: 'multiple-choice',
        question: 'How do you say "Nice to meet you" in Yoruba?',
        questionFr: 'Comment dit-on "Ravi de vous rencontrer" en Yoruba?',
        correctAnswer: 'O dara lati pade yin',
        options: ['O dara lati pade yin', 'Bawo ni', 'O dabo', 'E se']
      },
      {
        id: 'yo-v15',
        type: 'multiple-choice',
        question: 'What does "O dara lati pade yin" mean?',
        questionFr: 'Que signifie "O dara lati pade yin"?',
        correctAnswer: 'Nice to meet you',
        options: ['Nice to meet you', 'How are you?', 'What is your name?', 'Where are you from?']
      },
      {
        id: 'yo-v16',
        type: 'type-answer',
        question: 'Type "Excuse me" in Yoruba',
        questionFr: 'Tapez "Excusez-moi" en Yoruba',
        correctAnswer: 'Jowo'
      },
      {
        id: 'yo-v17',
        type: 'multiple-choice',
        question: 'How do you say "Please" in Yoruba?',
        questionFr: 'Comment dit-on "S\'il vous plaît" en Yoruba?',
        correctAnswer: 'Jowo',
        options: ['Jowo', 'E se', 'Bawo ni', 'O dabo']
      },
      {
        id: 'yo-v18',
        type: 'multiple-choice',
        question: 'What is "Sorry" in Yoruba?',
        questionFr: 'Comment dit-on "Désolé" en Yoruba?',
        correctAnswer: 'Ma binu',
        options: ['Ma binu', 'Jowo', 'E se', 'Bawo ni']
      },
      {
        id: 'yo-v19',
        type: 'type-answer',
        question: 'Type "Thank you very much" in Yoruba',
        questionFr: 'Tapez "Merci beaucoup" en Yoruba',
        correctAnswer: 'E se pupọ'
      },
      {
        id: 'yo-v20',
        type: 'multiple-choice',
        question: 'How do you say "You\'re welcome" in Yoruba?',
        questionFr: 'Comment dit-on "De rien" en Yoruba?',
        correctAnswer: 'Ko to o',
        options: ['Ko to o', 'Bawo ni', 'O dabo', 'E se']
      }
    ]
  },

  // STAGE 1 - MISSION 2: COMMON PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-2',
    type: 'vocabulary',
    title: 'Common Phrases',
    titleFr: 'Phrases courantes',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'yo-v21',
        type: 'multiple-choice',
        question: 'How do you say "What is your name?" in Yoruba?',
        questionFr: 'Comment dit-on "Comment vous appelez-vous?" en Yoruba?',
        correctAnswer: 'Kini orukọ rẹ?',
        options: ['Kini orukọ rẹ?', 'Bawo ni o?', 'Nibo ni o wa?', 'Melọ ni o dọgba?']
      },
      {
        id: 'yo-v22',
        type: 'multiple-choice',
        question: 'What does "Kini orukọ rẹ?" mean?',
        questionFr: 'Que signifie "Kini orukọ rẹ?"?',
        correctAnswer: 'What is your name?',
        options: ['What is your name?', 'How are you?', 'Where do you live?', 'How old are you?']
      },
      {
        id: 'yo-v23',
        type: 'type-answer',
        question: 'Type "My name is..." in Yoruba',
        questionFr: 'Tapez "Je m\'appelle..." en Yoruba',
        correctAnswer: 'Orukọ mi ni...'
      },
      {
        id: 'yo-v24',
        type: 'multiple-choice',
        question: 'How do you say "Where are you from?" in Yoruba?',
        questionFr: 'Comment dit-on "D\'où venez-vous?" en Yoruba?',
        correctAnswer: 'Nibo ni o wa?',
        options: ['Nibo ni o wa?', 'Kini orukọ rẹ?', 'Bawo ni o?', 'Nibo ni o ngbe?']
      },
      {
        id: 'yo-v25',
        type: 'multiple-choice',
        question: '"Nibo ni o wa?" means:',
        questionFr: '"Nibo ni o wa?" signifie:',
        correctAnswer: 'Where are you from?',
        options: ['Where are you from?', 'Where do you live?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'yo-v26',
        type: 'type-answer',
        question: 'Type "I am from..." in Yoruba',
        questionFr: 'Tapez "Je viens de..." en Yoruba',
        correctAnswer: 'Mo wa lati...'
      },
      {
        id: 'yo-v27',
        type: 'multiple-choice',
        question: 'How do you say "How old are you?" in Yoruba?',
        questionFr: 'Comment dit-on "Quel âge avez-vous?" en Yoruba?',
        correctAnswer: 'Melọ ni o dọgba?',
        options: ['Melọ ni o dọgba?', 'Kini orukọ rẹ?', 'Bawo ni o?', 'Nibo ni o wa?']
      },
      {
        id: 'yo-v28',
        type: 'multiple-choice',
        question: 'What does "Melọ ni o dọgba?" mean?',
        questionFr: 'Que signifie "Melọ ni o dọgba?"?',
        correctAnswer: 'How old are you?',
        options: ['How old are you?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'yo-v29',
        type: 'type-answer',
        question: 'Type "I am ... years old" in Yoruba',
        questionFr: 'Tapez "J\'ai ... ans" en Yoruba',
        correctAnswer: 'Mo ni ọdun...'
      },
      {
        id: 'yo-v30',
        type: 'multiple-choice',
        question: 'How do you say "Where do you live?" in Yoruba?',
        questionFr: 'Comment dit-on "Où habitez-vous?" en Yoruba?',
        correctAnswer: 'Nibo ni o ngbe?',
        options: ['Nibo ni o ngbe?', 'Nibo ni o wa?', 'Nibo ni o nlo?', 'Kini orukọ rẹ?']
      },
      {
        id: 'yo-v31',
        type: 'multiple-choice',
        question: '"Nibo ni o ngbe?" means:',
        questionFr: '"Nibo ni o ngbe?" signifie:',
        correctAnswer: 'Where do you live?',
        options: ['Where do you live?', 'Where are you from?', 'Where are you going?', 'Where is it?']
      },
      {
        id: 'yo-v32',
        type: 'type-answer',
        question: 'Type "I live in..." in Yoruba',
        questionFr: 'Tapez "J\'habite à..." en Yoruba',
        correctAnswer: 'Mo ngbe ni...'
      },
      {
        id: 'yo-v33',
        type: 'multiple-choice',
        question: 'How do you say "What do you do?" in Yoruba?',
        questionFr: 'Comment dit-on "Que faites-vous?" en Yoruba?',
        correctAnswer: 'Kini ni o nṣe?',
        options: ['Kini ni o nṣe?', 'Kini orukọ rẹ?', 'Bawo ni o?', 'Nibo ni o wa?']
      },
      {
        id: 'yo-v34',
        type: 'multiple-choice',
        question: 'What does "Kini ni o nṣe?" mean?',
        questionFr: 'Que signifie "Kini ni o nṣe?"?',
        correctAnswer: 'What do you do?',
        options: ['What do you do?', 'What is your name?', 'How are you?', 'Where are you from?']
      },
      {
        id: 'yo-v35',
        type: 'type-answer',
        question: 'Type "I am a student" in Yoruba',
        questionFr: 'Tapez "Je suis étudiant" en Yoruba',
        correctAnswer: 'Emi ni akẹkọ'
      },
      {
        id: 'yo-v36',
        type: 'multiple-choice',
        question: 'How do you say "I am a teacher" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis enseignant" en Yoruba?',
        correctAnswer: 'Emi ni olukọ',
        options: ['Emi ni olukọ', 'Emi ni akẹkọ', 'Emi ni dokita', 'Emi ni oṣiṣẹ']
      },
      {
        id: 'yo-v37',
        type: 'multiple-choice',
        question: 'What does "Emi ni olukọ" mean?',
        questionFr: 'Que signifie "Emi ni olukọ"?',
        correctAnswer: 'I am a teacher',
        options: ['I am a teacher', 'I am a student', 'I am a doctor', 'I am a worker']
      },
      {
        id: 'yo-v38',
        type: 'type-answer',
        question: 'Type "I am a doctor" in Yoruba',
        questionFr: 'Tapez "Je suis médecin" en Yoruba',
        correctAnswer: 'Emi ni dokita'
      },
      {
        id: 'yo-v39',
        type: 'multiple-choice',
        question: 'How do you say "I am learning Yoruba" in Yoruba?',
        questionFr: 'Comment dit-on "J\'apprends le Yoruba" en Yoruba?',
        correctAnswer: 'Mo nkọ Yoruba',
        options: ['Mo nkọ Yoruba', 'Mo nkọ Gẹẹsi', 'Mo nkọ Faransé', 'Mo nkọ Larubawa']
      },
      {
        id: 'yo-v40',
        type: 'multiple-choice',
        question: 'What does "Mo nkọ Yoruba" mean?',
        questionFr: 'Que signifie "Mo nkọ Yoruba"?',
        correctAnswer: 'I am learning Yoruba',
        options: ['I am learning Yoruba', 'I am learning English', 'I am learning French', 'I am learning Arabic']
      }
    ]
  },

  // STAGE 1 - MISSION 3: BASIC WORDS (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-3',
    type: 'vocabulary',
    title: 'Basic Words',
    titleFr: 'Mots de base',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'yo-v41',
        type: 'multiple-choice',
        question: 'How do you say "Yes" in Yoruba?',
        questionFr: 'Comment dit-on "Oui" en Yoruba?',
        correctAnswer: 'Beeni',
        options: ['Beeni', 'Rara', 'Jowo', 'Bawo ni']
      },
      {
        id: 'yo-v42',
        type: 'multiple-choice',
        question: 'What does "Beeni" mean?',
        questionFr: 'Que signifie "Beeni"?',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Please', 'Hello']
      },
      {
        id: 'yo-v43',
        type: 'type-answer',
        question: 'Type "No" in Yoruba',
        questionFr: 'Tapez "Non" en Yoruba',
        correctAnswer: 'Rara'
      },
      {
        id: 'yo-v44',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Yoruba?',
        questionFr: 'Comment dit-on "Eau" en Yoruba?',
        correctAnswer: 'Omi',
        options: ['Omi', 'Ounjẹ', 'Ile', 'Owo']
      },
      {
        id: 'yo-v45',
        type: 'multiple-choice',
        question: '"Omi" means:',
        questionFr: '"Omi" signifie:',
        correctAnswer: 'Water',
        options: ['Water', 'Food', 'House', 'Money']
      },
      {
        id: 'yo-v46',
        type: 'type-answer',
        question: 'Type "Food" in Yoruba',
        questionFr: 'Tapez "Nourriture" en Yoruba',
        correctAnswer: 'Ounjẹ'
      },
      {
        id: 'yo-v47',
        type: 'multiple-choice',
        question: 'How do you say "House" in Yoruba?',
        questionFr: 'Comment dit-on "Maison" en Yoruba?',
        correctAnswer: 'Ile',
        options: ['Ile', 'Omi', 'Ounjẹ', 'Owo']
      },
      {
        id: 'yo-v48',
        type: 'multiple-choice',
        question: 'What does "Ile" mean?',
        questionFr: 'Que signifie "Ile"?',
        correctAnswer: 'House',
        options: ['House', 'Water', 'Food', 'Money']
      },
      {
        id: 'yo-v49',
        type: 'type-answer',
        question: 'Type "Money" in Yoruba',
        questionFr: 'Tapez "Argent" en Yoruba',
        correctAnswer: 'Owo'
      },
      {
        id: 'yo-v50',
        type: 'multiple-choice',
        question: 'How do you say "Book" in Yoruba?',
        questionFr: 'Comment dit-on "Livre" en Yoruba?',
        correctAnswer: 'Iwe',
        options: ['Iwe', 'Owo', 'Ile', 'Ounjẹ']
      },
      {
        id: 'yo-v51',
        type: 'multiple-choice',
        question: '"Iwe" means:',
        questionFr: '"Iwe" signifie:',
        correctAnswer: 'Book',
        options: ['Book', 'Money', 'House', 'Food']
      },
      {
        id: 'yo-v52',
        type: 'type-answer',
        question: 'Type "Car" in Yoruba',
        questionFr: 'Tapez "Voiture" en Yoruba',
        correctAnswer: 'Mọto'
      },
      {
        id: 'yo-v53',
        type: 'multiple-choice',
        question: 'How do you say "Tree" in Yoruba?',
        questionFr: 'Comment dit-on "Arbre" en Yoruba?',
        correctAnswer: 'Igi',
        options: ['Igi', 'Mọto', 'Iwe', 'Owo']
      },
      {
        id: 'yo-v54',
        type: 'multiple-choice',
        question: 'What does "Igi" mean?',
        questionFr: 'Que signifie "Igi"?',
        correctAnswer: 'Tree',
        options: ['Tree', 'Car', 'Book', 'Money']
      },
      {
        id: 'yo-v55',
        type: 'type-answer',
        question: 'Type "Sun" in Yoruba',
        questionFr: 'Tapez "Soleil" en Yoruba',
        correctAnswer: 'Oorun'
      },
      {
        id: 'yo-v56',
        type: 'multiple-choice',
        question: 'How do you say "Moon" in Yoruba?',
        questionFr: 'Comment dit-on "Lune" en Yoruba?',
        correctAnswer: 'Oṣupa',
        options: ['Oṣupa', 'Oorun', 'Igi', 'Mọto']
      },
      {
        id: 'yo-v57',
        type: 'multiple-choice',
        question: 'What does "Oṣupa" mean?',
        questionFr: 'Que signifie "Oṣupa"?',
        correctAnswer: 'Moon',
        options: ['Moon', 'Sun', 'Tree', 'Car']
      },
      {
        id: 'yo-v58',
        type: 'type-answer',
        question: 'Type "Fire" in Yoruba',
        questionFr: 'Tapez "Feu" en Yoruba',
        correctAnswer: 'Ina'
      },
      {
        id: 'yo-v59',
        type: 'multiple-choice',
        question: 'How do you say "Earth" in Yoruba?',
        questionFr: 'Comment dit-on "Terre" en Yoruba?',
        correctAnswer: 'Aye',
        options: ['Aye', 'Ina', 'Oṣupa', 'Oorun']
      },
      {
        id: 'yo-v60',
        type: 'multiple-choice',
        question: 'What does "Aye" mean?',
        questionFr: 'Que signifie "Aye"?',
        correctAnswer: 'Earth',
        options: ['Earth', 'Fire', 'Moon', 'Sun']
      }
    ]
  },

  // STAGE 1 - MISSION 4: ESSENTIAL VOCABULARY (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-4',
    type: 'vocabulary',
    title: 'Essential Vocabulary',
    titleFr: 'Vocabulaire essentiel',
    level: 1,
    xpReward: 10,
    exercises: [
      {
        id: 'yo-v61',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Yoruba?',
        questionFr: 'Comment dit-on "Famille" en Yoruba?',
        correctAnswer: 'Ebi',
        options: ['Ebi', 'Ore', 'Oṣiṣẹ', 'Olukọ']
      },
      {
        id: 'yo-v62',
        type: 'multiple-choice',
        question: 'What does "Ebi" mean?',
        questionFr: 'Que signifie "Ebi"?',
        correctAnswer: 'Family',
        options: ['Family', 'Friends', 'Workers', 'Teachers']
      },
      {
        id: 'yo-v63',
        type: 'type-answer',
        question: 'Type "Mother" in Yoruba',
        questionFr: 'Tapez "Mère" en Yoruba',
        correctAnswer: 'Iya'
      },
      {
        id: 'yo-v64',
        type: 'multiple-choice',
        question: 'How do you say "Father" in Yoruba?',
        questionFr: 'Comment dit-on "Père" en Yoruba?',
        correctAnswer: 'Baba',
        options: ['Baba', 'Iya', 'Omo', 'Aburo']
      },
      {
        id: 'yo-v65',
        type: 'multiple-choice',
        question: '"Baba" means:',
        questionFr: '"Baba" signifie:',
        correctAnswer: 'Father',
        options: ['Father', 'Mother', 'Child', 'Sister']
      },
      {
        id: 'yo-v66',
        type: 'type-answer',
        question: 'Type "Child" in Yoruba',
        questionFr: 'Tapez "Enfant" en Yoruba',
        correctAnswer: 'Omo'
      },
      {
        id: 'yo-v67',
        type: 'multiple-choice',
        question: 'How do you say "Brother" in Yoruba?',
        questionFr: 'Comment dit-on "Frère" en Yoruba?',
        correctAnswer: 'Aburo',
        options: ['Aburo', 'Arabinrin', 'Baba', 'Iya']
      },
      {
        id: 'yo-v68',
        type: 'multiple-choice',
        question: 'What does "Aburo" mean?',
        questionFr: 'Que signifie "Aburo"?',
        correctAnswer: 'Brother',
        options: ['Brother', 'Sister', 'Father', 'Mother']
      },
      {
        id: 'yo-v69',
        type: 'type-answer',
        question: 'Type "Sister" in Yoruba',
        questionFr: 'Tapez "Sœur" en Yoruba',
        correctAnswer: 'Arabinrin'
      },
      {
        id: 'yo-v70',
        type: 'multiple-choice',
        question: 'How do you say "Friend" in Yoruba?',
        questionFr: 'Comment dit-on "Ami" en Yoruba?',
        correctAnswer: 'Ore',
        options: ['Ore', 'Ebi', 'Oṣiṣẹ', 'Olukọ']
      },
      {
        id: 'yo-v71',
        type: 'multiple-choice',
        question: '"Ore" means:',
        questionFr: '"Ore" signifie:',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'yo-v72',
        type: 'type-answer',
        question: 'Type "Work" in Yoruba',
        questionFr: 'Tapez "Travail" en Yoruba',
        correctAnswer: 'Iṣẹ'
      },
      {
        id: 'yo-v73',
        type: 'multiple-choice',
        question: 'How do you say "School" in Yoruba?',
        questionFr: 'Comment dit-on "École" en Yoruba?',
        correctAnswer: 'Ile-ẹkọ',
        options: ['Ile-ẹkọ', 'Ile-iṣẹ', 'Oja', 'Ile-iwosan']
      },
      {
        id: 'yo-v74',
        type: 'multiple-choice',
        question: 'What does "Ile-ẹkọ" mean?',
        questionFr: 'Que signifie "Ile-ẹkọ"?',
        correctAnswer: 'School',
        options: ['School', 'Office', 'Market', 'Hospital']
      },
      {
        id: 'yo-v75',
        type: 'type-answer',
        question: 'Type "Market" in Yoruba',
        questionFr: 'Tapez "Marché" en Yoruba',
        correctAnswer: 'Oja'
      },
      {
        id: 'yo-v76',
        type: 'multiple-choice',
        question: 'How do you say "Hospital" in Yoruba?',
        questionFr: 'Comment dit-on "Hôpital" en Yoruba?',
        correctAnswer: 'Ile-iwosan',
        options: ['Ile-iwosan', 'Ile-ẹkọ', 'Ile-iṣẹ', 'Oja']
      },
      {
        id: 'yo-v77',
        type: 'multiple-choice',
        question: 'What does "Ile-iwosan" mean?',
        questionFr: 'Que signifie "Ile-iwosan"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'yo-v78',
        type: 'type-answer',
        question: 'Type "Church" in Yoruba',
        questionFr: 'Tapez "Église" en Yoruba',
        correctAnswer: 'Ile-ẹsin'
      },
      {
        id: 'yo-v79',
        type: 'multiple-choice',
        question: 'How do you say "Time" in Yoruba?',
        questionFr: 'Comment dit-on "Temps" en Yoruba?',
        correctAnswer: 'Aago',
        options: ['Aago', 'Ojọ', 'Oṣu', 'Ọdun']
      },
      {
        id: 'yo-v80',
        type: 'multiple-choice',
        question: 'What does "Aago" mean?',
        questionFr: 'Que signifie "Aago"?',
        correctAnswer: 'Time',
        options: ['Time', 'Day', 'Month', 'Year']
      }
    ]
  },

  // STAGE 1 - MISSION 5: PRACTICE & REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-5',
    type: 'vocabulary',
    title: 'Practice & Review',
    titleFr: 'Pratique et révision',
    level: 1,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-v81',
        type: 'multiple-choice',
        question: 'Complete: "Bawo ni, ___ ni o?"',
        questionFr: 'Compléter: "Bawo ni, ___ ni o?"',
        correctAnswer: 'bawo',
        options: ['bawo', 'nibo', 'kini', 'melọ']
      },
      {
        id: 'yo-v82',
        type: 'multiple-choice',
        question: 'What is the correct response to "Bawo ni o?"',
        questionFr: 'Quelle est la bonne réponse à "Bawo ni o?"?',
        correctAnswer: 'Mo wa daadaa',
        options: ['Mo wa daadaa', 'Orukọ mi ni...', 'Mo wa lati...', 'Mo ngbe ni...']
      },
      {
        id: 'yo-v83',
        type: 'type-answer',
        question: 'Type the Yoruba word for "Thank you"',
        questionFr: 'Tapez le mot Yoruba pour "Merci"',
        correctAnswer: 'E se'
      },
      {
        id: 'yo-v84',
        type: 'multiple-choice',
        question: 'How do you say "Good morning" in Yoruba?',
        questionFr: 'Comment dit-on "Bonjour" (matin) en Yoruba?',
        correctAnswer: 'E kaaro',
        options: ['E kaaro', 'E kaasan', 'E ku ale', 'Bawo ni']
      },
      {
        id: 'yo-v85',
        type: 'multiple-choice',
        question: 'What does "O dabo" mean?',
        questionFr: 'Que signifie "O dabo"?',
        correctAnswer: 'Goodbye',
        options: ['Goodbye', 'Hello', 'Thank you', 'Please']
      },
      {
        id: 'yo-v86',
        type: 'type-answer',
        question: 'Type "Please" in Yoruba',
        questionFr: 'Tapez "S\'il vous plaît" en Yoruba',
        correctAnswer: 'Jowo'
      },
      {
        id: 'yo-v87',
        type: 'multiple-choice',
        question: 'How do you say "Water" in Yoruba?',
        questionFr: 'Comment dit-on "Eau" en Yoruba?',
        correctAnswer: 'Omi',
        options: ['Omi', 'Ounjẹ', 'Ile', 'Owo']
      },
      {
        id: 'yo-v88',
        type: 'multiple-choice',
        question: 'What does "Ounjẹ" mean?',
        questionFr: 'Que signifie "Ounjẹ"?',
        correctAnswer: 'Food',
        options: ['Food', 'Water', 'House', 'Money']
      },
      {
        id: 'yo-v89',
        type: 'type-answer',
        question: 'Type "House" in Yoruba',
        questionFr: 'Tapez "Maison" en Yoruba',
        correctAnswer: 'Ile'
      },
      {
        id: 'yo-v90',
        type: 'multiple-choice',
        question: 'How do you say "Family" in Yoruba?',
        questionFr: 'Comment dit-on "Famille" en Yoruba?',
        correctAnswer: 'Ebi',
        options: ['Ebi', 'Ore', 'Oṣiṣẹ', 'Olukọ']
      },
      {
        id: 'yo-v91',
        type: 'multiple-choice',
        question: 'What does "Iya" mean?',
        questionFr: 'Que signifie "Iya"?',
        correctAnswer: 'Mother',
        options: ['Mother', 'Father', 'Child', 'Sister']
      },
      {
        id: 'yo-v92',
        type: 'type-answer',
        question: 'Type "Father" in Yoruba',
        questionFr: 'Tapez "Père" en Yoruba',
        correctAnswer: 'Baba'
      },
      {
        id: 'yo-v93',
        type: 'multiple-choice',
        question: 'How do you say "School" in Yoruba?',
        questionFr: 'Comment dit-on "École" en Yoruba?',
        correctAnswer: 'Ile-ẹkọ',
        options: ['Ile-ẹkọ', 'Ile-iṣẹ', 'Oja', 'Ile-iwosan']
      },
      {
        id: 'yo-v94',
        type: 'multiple-choice',
        question: 'What does "Ore" mean?',
        questionFr: 'Que signifie "Ore"?',
        correctAnswer: 'Friend',
        options: ['Friend', 'Family', 'Worker', 'Teacher']
      },
      {
        id: 'yo-v95',
        type: 'type-answer',
        question: 'Type "Yes" in Yoruba',
        questionFr: 'Tapez "Oui" en Yoruba',
        correctAnswer: 'Beeni'
      },
      {
        id: 'yo-v96',
        type: 'multiple-choice',
        question: 'How do you say "No" in Yoruba?',
        questionFr: 'Comment dit-on "Non" en Yoruba?',
        correctAnswer: 'Rara',
        options: ['Rara', 'Beeni', 'Jowo', 'Bawo ni']
      },
      {
        id: 'yo-v97',
        type: 'multiple-choice',
        question: 'What does "Ile-iwosan" mean?',
        questionFr: 'Que signifie "Ile-iwosan"?',
        correctAnswer: 'Hospital',
        options: ['Hospital', 'School', 'Office', 'Market']
      },
      {
        id: 'yo-v98',
        type: 'type-answer',
        question: 'Type "Time" in Yoruba',
        questionFr: 'Tapez "Temps" en Yoruba',
        correctAnswer: 'Aago'
      },
      {
        id: 'yo-v99',
        type: 'multiple-choice',
        question: 'Complete: "Orukọ mi ni ___" (My name is...)',
        questionFr: 'Compléter: "Orukọ mi ni ___" (Je m\'appelle...)',
        correctAnswer: '...',
        options: ['...', 'Beeni', 'Rara', 'Jowo']
      },
      {
        id: 'yo-v100',
        type: 'multiple-choice',
        question: 'What is the Yoruba word for "Welcome"?',
        questionFr: 'Quel est le mot Yoruba pour "Bienvenue"?',
        correctAnswer: 'E kaabo',
        options: ['E kaabo', 'Bawo ni', 'E se', 'Jowo']
      }
    ]
  },

  // STAGE 2 - MISSION 6: DAILY LIFE (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-6',
    type: 'vocabulary',
    title: 'Daily Life',
    titleFr: 'Vie quotidienne',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-v101',
        type: 'multiple-choice',
        question: 'How do you say "I wake up" in Yoruba?',
        questionFr: 'Comment dit-on "Je me réveille" en Yoruba?',
        correctAnswer: 'Mo ji',
        options: ['Mo ji', 'Mo sun', 'Mo jeun', 'Mo lọ si iṣẹ']
      },
      {
        id: 'yo-v102',
        type: 'multiple-choice',
        question: 'What does "Mo ji" mean?',
        questionFr: 'Que signifie "Mo ji"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'yo-v103',
        type: 'type-answer',
        question: 'Type "I sleep" in Yoruba',
        questionFr: 'Tapez "Je dors" en Yoruba',
        correctAnswer: 'Mo sun'
      },
      {
        id: 'yo-v104',
        type: 'multiple-choice',
        question: 'How do you say "I eat" in Yoruba?',
        questionFr: 'Comment dit-on "Je mange" en Yoruba?',
        correctAnswer: 'Mo jeun',
        options: ['Mo jeun', 'Mo ji', 'Mo sun', 'Mo lọ si iṣẹ']
      },
      {
        id: 'yo-v105',
        type: 'multiple-choice',
        question: '"Mo jeun" means:',
        questionFr: '"Mo jeun" signifie:',
        correctAnswer: 'I eat',
        options: ['I eat', 'I wake up', 'I sleep', 'I go to work']
      },
      {
        id: 'yo-v106',
        type: 'type-answer',
        question: 'Type "I go to work" in Yoruba',
        questionFr: 'Tapez "Je vais au travail" en Yoruba',
        correctAnswer: 'Mo lọ si iṣẹ'
      },
      {
        id: 'yo-v107',
        type: 'multiple-choice',
        question: 'How do you say "I study" in Yoruba?',
        questionFr: 'Comment dit-on "J\'étudie" en Yoruba?',
        correctAnswer: 'Mo nkọ',
        options: ['Mo nkọ', 'Mo lọ si iṣẹ', 'Mo jeun', 'Mo ji']
      },
      {
        id: 'yo-v108',
        type: 'multiple-choice',
        question: 'What does "Mo nkọ" mean?',
        questionFr: 'Que signifie "Mo nkọ"?',
        correctAnswer: 'I study',
        options: ['I study', 'I go to work', 'I eat', 'I wake up']
      },
      {
        id: 'yo-v109',
        type: 'type-answer',
        question: 'Type "I play" in Yoruba',
        questionFr: 'Tapez "Je joue" en Yoruba',
        correctAnswer: 'Mo nṣere'
      },
      {
        id: 'yo-v110',
        type: 'multiple-choice',
        question: 'How do you say "I cook" in Yoruba?',
        questionFr: 'Comment dit-on "Je cuisine" en Yoruba?',
        correctAnswer: 'Mo nse ounjẹ',
        options: ['Mo nse ounjẹ', 'Mo nṣere', 'Mo nkọ', 'Mo lọ si iṣẹ']
      },
      {
        id: 'yo-v111',
        type: 'multiple-choice',
        question: '"Mo nse ounjẹ" means:',
        questionFr: '"Mo nse ounjẹ" signifie:',
        correctAnswer: 'I cook',
        options: ['I cook', 'I play', 'I study', 'I go to work']
      },
      {
        id: 'yo-v112',
        type: 'type-answer',
        question: 'Type "I clean" in Yoruba',
        questionFr: 'Tapez "Je nettoie" en Yoruba',
        correctAnswer: 'Mo nṣe ile'
      },
      {
        id: 'yo-v113',
        type: 'multiple-choice',
        question: 'How do you say "I wash" in Yoruba?',
        questionFr: 'Comment dit-on "Je lave" en Yoruba?',
        correctAnswer: 'Mo nfọ',
        options: ['Mo nfọ', 'Mo nṣe ile', 'Mo nse ounjẹ', 'Mo nṣere']
      },
      {
        id: 'yo-v114',
        type: 'multiple-choice',
        question: 'What does "Mo nfọ" mean?',
        questionFr: 'Que signifie "Mo nfọ"?',
        correctAnswer: 'I wash',
        options: ['I wash', 'I clean', 'I cook', 'I play']
      },
      {
        id: 'yo-v115',
        type: 'type-answer',
        question: 'Type "I read" in Yoruba',
        questionFr: 'Tapez "Je lis" en Yoruba',
        correctAnswer: 'Mo nka iwe'
      },
      {
        id: 'yo-v116',
        type: 'multiple-choice',
        question: 'How do you say "I write" in Yoruba?',
        questionFr: 'Comment dit-on "J\'écris" en Yoruba?',
        correctAnswer: 'Mo nkọwe',
        options: ['Mo nkọwe', 'Mo nka iwe', 'Mo nfọ', 'Mo nṣe ile']
      },
      {
        id: 'yo-v117',
        type: 'multiple-choice',
        question: 'What does "Mo nkọwe" mean?',
        questionFr: 'Que signifie "Mo nkọwe"?',
        correctAnswer: 'I write',
        options: ['I write', 'I read', 'I wash', 'I clean']
      },
      {
        id: 'yo-v118',
        type: 'type-answer',
        question: 'Type "I listen" in Yoruba',
        questionFr: 'Tapez "J\'écoute" en Yoruba',
        correctAnswer: 'Mo ngboran'
      },
      {
        id: 'yo-v119',
        type: 'multiple-choice',
        question: 'How do you say "I speak" in Yoruba?',
        questionFr: 'Comment dit-on "Je parle" en Yoruba?',
        correctAnswer: 'Mo nsọrọ',
        options: ['Mo nsọrọ', 'Mo ngboran', 'Mo nkọwe', 'Mo nka iwe']
      },
      {
        id: 'yo-v120',
        type: 'multiple-choice',
        question: 'What does "Mo nsọrọ" mean?',
        questionFr: 'Que signifie "Mo nsọrọ"?',
        correctAnswer: 'I speak',
        options: ['I speak', 'I listen', 'I write', 'I read']
      }
    ]
  },

  // STAGE 2 - MISSION 7: MORE PHRASES (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-7',
    type: 'vocabulary',
    title: 'More Phrases',
    titleFr: 'Plus de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-v121',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Yoruba?',
        questionFr: 'Comment dit-on "J\'ai faim" en Yoruba?',
        correctAnswer: 'Ebi npa mi',
        options: ['Ebi npa mi', 'Omi npa mi', 'Ororo npa mi', 'Gbona npa mi']
      },
      {
        id: 'yo-v122',
        type: 'multiple-choice',
        question: 'What does "Ebi npa mi" mean?',
        questionFr: 'Que signifie "Ebi npa mi"?',
        correctAnswer: 'I am hungry',
        options: ['I am hungry', 'I am thirsty', 'I am tired', 'I am hot']
      },
      {
        id: 'yo-v123',
        type: 'type-answer',
        question: 'Type "I am thirsty" in Yoruba',
        questionFr: 'Tapez "J\'ai soif" en Yoruba',
        correctAnswer: 'Omi npa mi'
      },
      {
        id: 'yo-v124',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Yoruba?',
        correctAnswer: 'Ororo npa mi',
        options: ['Ororo npa mi', 'Ebi npa mi', 'Omi npa mi', 'Gbona npa mi']
      },
      {
        id: 'yo-v125',
        type: 'multiple-choice',
        question: '"Ororo npa mi" means:',
        questionFr: '"Ororo npa mi" signifie:',
        correctAnswer: 'I am tired',
        options: ['I am tired', 'I am hungry', 'I am thirsty', 'I am hot']
      },
      {
        id: 'yo-v126',
        type: 'type-answer',
        question: 'Type "I am hot" in Yoruba',
        questionFr: 'Tapez "J\'ai chaud" en Yoruba',
        correctAnswer: 'Gbona npa mi'
      },
      {
        id: 'yo-v127',
        type: 'multiple-choice',
        question: 'How do you say "I am cold" in Yoruba?',
        questionFr: 'Comment dit-on "J\'ai froid" en Yoruba?',
        correctAnswer: 'Tutu npa mi',
        options: ['Tutu npa mi', 'Gbona npa mi', 'Ororo npa mi', 'Ebi npa mi']
      },
      {
        id: 'yo-v128',
        type: 'multiple-choice',
        question: 'What does "Tutu npa mi" mean?',
        questionFr: 'Que signifie "Tutu npa mi"?',
        correctAnswer: 'I am cold',
        options: ['I am cold', 'I am hot', 'I am tired', 'I am hungry']
      },
      {
        id: 'yo-v129',
        type: 'type-answer',
        question: 'Type "I am happy" in Yoruba',
        questionFr: 'Tapez "Je suis heureux" en Yoruba',
        correctAnswer: 'Mo dun'
      },
      {
        id: 'yo-v130',
        type: 'multiple-choice',
        question: 'How do you say "I am sad" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis triste" en Yoruba?',
        correctAnswer: 'Mo banuje',
        options: ['Mo banuje', 'Mo dun', 'Tutu npa mi', 'Gbona npa mi']
      },
      {
        id: 'yo-v131',
        type: 'multiple-choice',
        question: '"Mo banuje" means:',
        questionFr: '"Mo banuje" signifie:',
        correctAnswer: 'I am sad',
        options: ['I am sad', 'I am happy', 'I am cold', 'I am hot']
      },
      {
        id: 'yo-v132',
        type: 'type-answer',
        question: 'Type "I am angry" in Yoruba',
        questionFr: 'Tapez "Je suis en colère" en Yoruba',
        correctAnswer: 'Mo binu'
      },
      {
        id: 'yo-v133',
        type: 'multiple-choice',
        question: 'How do you say "I am sick" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis malade" en Yoruba?',
        correctAnswer: 'Mo nṣaaju',
        options: ['Mo nṣaaju', 'Mo binu', 'Mo banuje', 'Mo dun']
      },
      {
        id: 'yo-v134',
        type: 'multiple-choice',
        question: 'What does "Mo nṣaaju" mean?',
        questionFr: 'Que signifie "Mo nṣaaju"?',
        correctAnswer: 'I am sick',
        options: ['I am sick', 'I am angry', 'I am sad', 'I am happy']
      },
      {
        id: 'yo-v135',
        type: 'type-answer',
        question: 'Type "I am well" in Yoruba',
        questionFr: 'Tapez "Je vais bien" en Yoruba',
        correctAnswer: 'Mo wa daadaa'
      },
      {
        id: 'yo-v136',
        type: 'multiple-choice',
        question: 'How do you say "I am busy" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis occupé" en Yoruba?',
        correctAnswer: 'Mo nṣe iṣẹ',
        options: ['Mo nṣe iṣẹ', 'Mo wa daadaa', 'Mo nṣaaju', 'Mo binu']
      },
      {
        id: 'yo-v137',
        type: 'multiple-choice',
        question: 'What does "Mo nṣe iṣẹ" mean?',
        questionFr: 'Que signifie "Mo nṣe iṣẹ"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'yo-v138',
        type: 'type-answer',
        question: 'Type "I am free" in Yoruba',
        questionFr: 'Tapez "Je suis libre" en Yoruba',
        correctAnswer: 'Ko si iṣẹ fun mi'
      },
      {
        id: 'yo-v139',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis prêt" en Yoruba?',
        correctAnswer: 'Mo setan',
        options: ['Mo setan', 'Ko si iṣẹ fun mi', 'Mo nṣe iṣẹ', 'Mo wa daadaa']
      },
      {
        id: 'yo-v140',
        type: 'multiple-choice',
        question: 'What does "Mo setan" mean?',
        questionFr: 'Que signifie "Mo setan"?',
        correctAnswer: 'I am ready',
        options: ['I am ready', 'I am free', 'I am busy', 'I am well']
      }
    ]
  },

  // STAGE 2 - MISSION 8: USEFUL EXPRESSIONS (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-8',
    type: 'vocabulary',
    title: 'Useful Expressions',
    titleFr: 'Expressions utiles',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-v141',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t understand" in Yoruba?',
        questionFr: 'Comment dit-on "Je ne comprends pas" en Yoruba?',
        correctAnswer: 'Ko ye mi',
        options: ['Ko ye mi', 'Ko mo', 'Ko fe mi', 'Ko lọ']
      },
      {
        id: 'yo-v142',
        type: 'multiple-choice',
        question: 'What does "Ko ye mi" mean?',
        questionFr: 'Que signifie "Ko ye mi"?',
        correctAnswer: 'I don\'t understand',
        options: ['I don\'t understand', 'I don\'t know', 'I don\'t want', 'I won\'t go']
      },
      {
        id: 'yo-v143',
        type: 'type-answer',
        question: 'Type "I don\'t know" in Yoruba',
        questionFr: 'Tapez "Je ne sais pas" en Yoruba',
        correctAnswer: 'Ko mo'
      },
      {
        id: 'yo-v144',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t want" in Yoruba?',
        questionFr: 'Comment dit-on "Je ne veux pas" en Yoruba?',
        correctAnswer: 'Ko fe mi',
        options: ['Ko fe mi', 'Ko ye mi', 'Ko mo', 'Ko lọ']
      },
      {
        id: 'yo-v145',
        type: 'multiple-choice',
        question: '"Ko fe mi" means:',
        questionFr: '"Ko fe mi" signifie:',
        correctAnswer: 'I don\'t want',
        options: ['I don\'t want', 'I don\'t understand', 'I don\'t know', 'I won\'t go']
      },
      {
        id: 'yo-v146',
        type: 'type-answer',
        question: 'Type "I can\'t" in Yoruba',
        questionFr: 'Tapez "Je ne peux pas" en Yoruba',
        correctAnswer: 'Ko le mi'
      },
      {
        id: 'yo-v147',
        type: 'multiple-choice',
        question: 'How do you say "I can" in Yoruba?',
        questionFr: 'Comment dit-on "Je peux" en Yoruba?',
        correctAnswer: 'Mo le',
        options: ['Mo le', 'Ko le mi', 'Ko fe mi', 'Ko ye mi']
      },
      {
        id: 'yo-v148',
        type: 'multiple-choice',
        question: 'What does "Mo le" mean?',
        questionFr: 'Que signifie "Mo le"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'yo-v149',
        type: 'type-answer',
        question: 'Type "I will" in Yoruba',
        questionFr: 'Tapez "Je vais" en Yoruba',
        correctAnswer: 'Mo lọ'
      },
      {
        id: 'yo-v150',
        type: 'multiple-choice',
        question: 'How do you say "I won\'t" in Yoruba?',
        questionFr: 'Comment dit-on "Je ne vais pas" en Yoruba?',
        correctAnswer: 'Ko lọ',
        options: ['Ko lọ', 'Mo lọ', 'Mo le', 'Ko le mi']
      },
      {
        id: 'yo-v151',
        type: 'multiple-choice',
        question: '"Ko lọ" means:',
        questionFr: '"Ko lọ" signifie:',
        correctAnswer: 'I won\'t',
        options: ['I won\'t', 'I will', 'I can', 'I can\'t']
      },
      {
        id: 'yo-v152',
        type: 'type-answer',
        question: 'Type "I have" in Yoruba',
        questionFr: 'Tapez "J\'ai" en Yoruba',
        correctAnswer: 'Mo ni'
      },
      {
        id: 'yo-v153',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Yoruba?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Yoruba?',
        correctAnswer: 'Ko si fun mi',
        options: ['Ko si fun mi', 'Mo ni', 'Ko fe mi', 'Ko ye mi']
      },
      {
        id: 'yo-v154',
        type: 'multiple-choice',
        question: 'What does "Ko si fun mi" mean?',
        questionFr: 'Que signifie "Ko si fun mi"?',
        correctAnswer: 'I don\'t have',
        options: ['I don\'t have', 'I have', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'yo-v155',
        type: 'type-answer',
        question: 'Type "I like" in Yoruba',
        questionFr: 'Tapez "J\'aime" en Yoruba',
        correctAnswer: 'Mo feran'
      },
      {
        id: 'yo-v156',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t like" in Yoruba?',
        questionFr: 'Comment dit-on "Je n\'aime pas" en Yoruba?',
        correctAnswer: 'Ko feran mi',
        options: ['Ko feran mi', 'Mo feran', 'Ko si fun mi', 'Mo ni']
      },
      {
        id: 'yo-v157',
        type: 'multiple-choice',
        question: 'What does "Ko feran mi" mean?',
        questionFr: 'Que signifie "Ko feran mi"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'yo-v158',
        type: 'type-answer',
        question: 'Type "I love" in Yoruba',
        questionFr: 'Tapez "J\'aime beaucoup" en Yoruba',
        correctAnswer: 'Mo nifẹ'
      },
      {
        id: 'yo-v159',
        type: 'multiple-choice',
        question: 'How do you say "I hate" in Yoruba?',
        questionFr: 'Comment dit-on "Je déteste" en Yoruba?',
        correctAnswer: 'Mo korira',
        options: ['Mo korira', 'Mo nifẹ', 'Ko feran mi', 'Mo feran']
      },
      {
        id: 'yo-v160',
        type: 'multiple-choice',
        question: 'What does "Mo korira" mean?',
        questionFr: 'Que signifie "Mo korira"?',
        correctAnswer: 'I hate',
        options: ['I hate', 'I love', 'I don\'t like', 'I like']
      }
    ]
  },

  // STAGE 2 - MISSION 9: BUILDING SENTENCES (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-9',
    type: 'vocabulary',
    title: 'Building Sentences',
    titleFr: 'Construction de phrases',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-v161',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ounjẹ" (I am eating food)',
        questionFr: 'Compléter: "Mo ___ ounjẹ" (Je mange de la nourriture)',
        correctAnswer: 'jeun',
        options: ['jeun', 'se', 'lọ', 'kọ']
      },
      {
        id: 'yo-v162',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ omi" (I am drinking water)',
        questionFr: 'Compléter: "Mo ___ omi" (Je bois de l\'eau)',
        correctAnswer: 'mu',
        options: ['mu', 'jeun', 'se', 'lọ']
      },
      {
        id: 'yo-v163',
        type: 'type-answer',
        question: 'Complete: "Mo ___ si iṣẹ" (I am going to work)',
        questionFr: 'Compléter: "Mo ___ si iṣẹ" (Je vais au travail)',
        correctAnswer: 'lọ'
      },
      {
        id: 'yo-v164',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ Yoruba" (I am learning Yoruba)',
        questionFr: 'Compléter: "Mo ___ Yoruba" (J\'apprends le Yoruba)',
        correctAnswer: 'kọ',
        options: ['kọ', 'lọ', 'jeun', 'se']
      },
      {
        id: 'yo-v165',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ounjẹ" (I am cooking food)',
        questionFr: 'Compléter: "Mo ___ ounjẹ" (Je cuisine de la nourriture)',
        correctAnswer: 'se',
        options: ['se', 'kọ', 'lọ', 'jeun']
      },
      {
        id: 'yo-v166',
        type: 'type-answer',
        question: 'Complete: "Mo ___ iwe" (I am reading a book)',
        questionFr: 'Compléter: "Mo ___ iwe" (Je lis un livre)',
        correctAnswer: 'ka'
      },
      {
        id: 'yo-v167',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ nkan kan" (I am writing something)',
        questionFr: 'Compléter: "Mo ___ nkan kan" (J\'écris quelque chose)',
        correctAnswer: 'kọwe',
        options: ['kọwe', 'ka', 'se', 'kọ']
      },
      {
        id: 'yo-v168',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ orin" (I am playing music)',
        questionFr: 'Compléter: "Mo ___ orin" (Je joue de la musique)',
        correctAnswer: 'ṣere',
        options: ['ṣere', 'kọwe', 'ka', 'se']
      },
      {
        id: 'yo-v169',
        type: 'type-answer',
        question: 'Complete: "Mo ___ ile" (I am cleaning the house)',
        questionFr: 'Compléter: "Mo ___ ile" (Je nettoie la maison)',
        correctAnswer: 'ṣe'
      },
      {
        id: 'yo-v170',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ aṣo" (I am washing clothes)',
        questionFr: 'Compléter: "Mo ___ aṣo" (Je lave les vêtements)',
        correctAnswer: 'fọ',
        options: ['fọ', 'ṣe', 'ṣere', 'kọwe']
      },
      {
        id: 'yo-v171',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ile" (I am at home)',
        questionFr: 'Compléter: "Mo ___ ile" (Je suis à la maison)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      },
      {
        id: 'yo-v172',
        type: 'type-answer',
        question: 'Complete: "Mo ___ ile" (I am coming home)',
        questionFr: 'Compléter: "Mo ___ ile" (Je rentre à la maison)',
        correctAnswer: 'wọ'
      },
      {
        id: 'yo-v173',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ile" (I am leaving home)',
        questionFr: 'Compléter: "Mo ___ ile" (Je quitte la maison)',
        correctAnswer: 'jade',
        options: ['jade', 'wọ', 'wa', 'lọ']
      },
      {
        id: 'yo-v174',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ iṣẹ" (I am at work)',
        questionFr: 'Compléter: "Mo ___ iṣẹ" (Je suis au travail)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      },
      {
        id: 'yo-v175',
        type: 'type-answer',
        question: 'Complete: "Mo ___ ile-ẹkọ" (I am at school)',
        questionFr: 'Compléter: "Mo ___ ile-ẹkọ" (Je suis à l\'école)',
        correctAnswer: 'wa'
      },
      {
        id: 'yo-v176',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ oja" (I am at the market)',
        questionFr: 'Compléter: "Mo ___ oja" (Je suis au marché)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      },
      {
        id: 'yo-v177',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ile-iwosan" (I am at the hospital)',
        questionFr: 'Compléter: "Mo ___ ile-iwosan" (Je suis à l\'hôpital)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      },
      {
        id: 'yo-v178',
        type: 'type-answer',
        question: 'Complete: "Mo ___ ile-ẹsin" (I am at church)',
        questionFr: 'Compléter: "Mo ___ ile-ẹsin" (Je suis à l\'église)',
        correctAnswer: 'wa'
      },
      {
        id: 'yo-v179',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ile-iṣẹ" (I am at the office)',
        questionFr: 'Compléter: "Mo ___ ile-iṣẹ" (Je suis au bureau)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      },
      {
        id: 'yo-v180',
        type: 'multiple-choice',
        question: 'Complete: "Mo ___ ile" (I am at home)',
        questionFr: 'Compléter: "Mo ___ ile" (Je suis à la maison)',
        correctAnswer: 'wa',
        options: ['wa', 'lọ', 'wọ', 'jade']
      }
    ]
  },

  // STAGE 2 - MISSION 10: STAGE 2 REVIEW (20 questions, 10 will be randomly selected)
  {
    id: 'yo-vocab-10',
    type: 'vocabulary',
    title: 'Stage 2 Review',
    titleFr: 'Révision étape 2',
    level: 2,
    xpReward: 20,
    exercises: [
      {
        id: 'yo-v181',
        type: 'multiple-choice',
        question: 'What does "Mo ji" mean?',
        questionFr: 'Que signifie "Mo ji"?',
        correctAnswer: 'I wake up',
        options: ['I wake up', 'I sleep', 'I eat', 'I go to work']
      },
      {
        id: 'yo-v182',
        type: 'multiple-choice',
        question: 'How do you say "I am hungry" in Yoruba?',
        questionFr: 'Comment dit-on "J\'ai faim" en Yoruba?',
        correctAnswer: 'Ebi npa mi',
        options: ['Ebi npa mi', 'Omi npa mi', 'Ororo npa mi', 'Gbona npa mi']
      },
      {
        id: 'yo-v183',
        type: 'type-answer',
        question: 'Type "I don\'t understand" in Yoruba',
        questionFr: 'Tapez "Je ne comprends pas" en Yoruba',
        correctAnswer: 'Ko ye mi'
      },
      {
        id: 'yo-v184',
        type: 'multiple-choice',
        question: 'What does "Mo le" mean?',
        questionFr: 'Que signifie "Mo le"?',
        correctAnswer: 'I can',
        options: ['I can', 'I can\'t', 'I don\'t want', 'I don\'t understand']
      },
      {
        id: 'yo-v185',
        type: 'multiple-choice',
        question: 'How do you say "I like" in Yoruba?',
        questionFr: 'Comment dit-on "J\'aime" en Yoruba?',
        correctAnswer: 'Mo feran',
        options: ['Mo feran', 'Ko feran mi', 'Mo ni', 'Ko si fun mi']
      },
      {
        id: 'yo-v186',
        type: 'type-answer',
        question: 'Type "I am cooking food" in Yoruba',
        questionFr: 'Tapez "Je cuisine de la nourriture" en Yoruba',
        correctAnswer: 'Mo nse ounjẹ'
      },
      {
        id: 'yo-v187',
        type: 'multiple-choice',
        question: 'What does "Mo nka iwe" mean?',
        questionFr: 'Que signifie "Mo nka iwe"?',
        correctAnswer: 'I am reading a book',
        options: ['I am reading a book', 'I am writing something', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'yo-v188',
        type: 'multiple-choice',
        question: 'How do you say "I am at home" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis à la maison" en Yoruba?',
        correctAnswer: 'Mo wa ile',
        options: ['Mo wa ile', 'Mo lọ ile', 'Mo wọ ile', 'Mo jade ile']
      },
      {
        id: 'yo-v189',
        type: 'type-answer',
        question: 'Type "I am happy" in Yoruba',
        questionFr: 'Tapez "Je suis heureux" en Yoruba',
        correctAnswer: 'Mo dun'
      },
      {
        id: 'yo-v190',
        type: 'multiple-choice',
        question: 'What does "Mo nṣe iṣẹ" mean?',
        questionFr: 'Que signifie "Mo nṣe iṣẹ"?',
        correctAnswer: 'I am busy',
        options: ['I am busy', 'I am well', 'I am sick', 'I am angry']
      },
      {
        id: 'yo-v191',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t have" in Yoruba?',
        questionFr: 'Comment dit-on "Je n\'ai pas" en Yoruba?',
        correctAnswer: 'Ko si fun mi',
        options: ['Ko si fun mi', 'Mo ni', 'Ko fe mi', 'Ko ye mi']
      },
      {
        id: 'yo-v192',
        type: 'type-answer',
        question: 'Type "I am washing clothes" in Yoruba',
        questionFr: 'Tapez "Je lave les vêtements" en Yoruba',
        correctAnswer: 'Mo nfọ aṣo'
      },
      {
        id: 'yo-v193',
        type: 'multiple-choice',
        question: 'What does "Ko feran mi" mean?',
        questionFr: 'Que signifie "Ko feran mi"?',
        correctAnswer: 'I don\'t like',
        options: ['I don\'t like', 'I like', 'I don\'t have', 'I have']
      },
      {
        id: 'yo-v194',
        type: 'multiple-choice',
        question: 'How do you say "I am tired" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis fatigué" en Yoruba?',
        correctAnswer: 'Ororo npa mi',
        options: ['Ororo npa mi', 'Ebi npa mi', 'Omi npa mi', 'Gbona npa mi']
      },
      {
        id: 'yo-v195',
        type: 'type-answer',
        question: 'Type "I am coming home" in Yoruba',
        questionFr: 'Tapez "Je rentre à la maison" en Yoruba',
        correctAnswer: 'Mo wọ ile'
      },
      {
        id: 'yo-v196',
        type: 'multiple-choice',
        question: 'What does "Mo nkọwe nkan kan" mean?',
        questionFr: 'Que signifie "Mo nkọwe nkan kan"?',
        correctAnswer: 'I am writing something',
        options: ['I am writing something', 'I am reading a book', 'I am playing music', 'I am cleaning the house']
      },
      {
        id: 'yo-v197',
        type: 'multiple-choice',
        question: 'How do you say "I am ready" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis prêt" en Yoruba?',
        correctAnswer: 'Mo setan',
        options: ['Mo setan', 'Ko si iṣẹ fun mi', 'Mo nṣe iṣẹ', 'Mo wa daadaa']
      },
      {
        id: 'yo-v198',
        type: 'type-answer',
        question: 'Type "I am at school" in Yoruba',
        questionFr: 'Tapez "Je suis à l\'école" en Yoruba',
        correctAnswer: 'Mo wa ile-ẹkọ'
      },
      {
        id: 'yo-v199',
        type: 'multiple-choice',
        question: 'What does "Mo nifẹ" mean?',
        questionFr: 'Que signifie "Mo nifẹ"?',
        correctAnswer: 'I love',
        options: ['I love', 'I hate', 'I don\'t like', 'I like']
      },
      {
        id: 'yo-v200',
        type: 'multiple-choice',
        question: 'How do you say "I am at the market" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis au marché" en Yoruba?',
        correctAnswer: 'Mo wa oja',
        options: ['Mo wa oja', 'Mo lọ oja', 'Mo wọ oja', 'Mo jade oja']
      }
    ]
  }
];