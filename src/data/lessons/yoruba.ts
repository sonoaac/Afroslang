import { Lesson } from '../../types';

type RawLesson = Omit<Lesson, 'stageId' | 'lessonNumber'> & { level?: number };

export const yorubaLessons: RawLesson[] = [
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

  // ── STAGE 2: POLITE & FORMAL SPEECH ─────────────────────────────────────

  // Unit 1 — Please & Thank You
  {
    id: 'yo-s2-1',
    type: 'vocabulary',
    title: 'Please & Thank You',
    titleFr: 'S\'il vous plaît et Merci',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-1-1',
        type: 'multiple-choice',
        question: 'How do you say "please" in Yoruba?',
        questionFr: 'Comment dit-on "s\'il vous plaît" en Yoruba?',
        correctAnswer: 'E jọwọ',
        options: ['E jọwọ', 'E se', 'Ko si ohun', 'Bawo ni']
      },
      {
        id: 'yo-s2-1-2',
        type: 'multiple-choice',
        question: 'What does "E se" mean?',
        questionFr: 'Que signifie "E se"?',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'Sorry', 'Welcome']
      },
      {
        id: 'yo-s2-1-3',
        type: 'multiple-choice',
        question: 'How do you say "thank you very much" in Yoruba?',
        questionFr: 'Comment dit-on "merci beaucoup" en Yoruba?',
        correctAnswer: 'E se pupọ',
        options: ['E se pupọ', 'E se', 'E jọwọ', 'Mo dupẹ']
      },
      {
        id: 'yo-s2-1-4',
        type: 'multiple-choice',
        question: 'What does "Ko si ohun" mean?',
        questionFr: 'Que signifie "Ko si ohun"?',
        correctAnswer: 'You\'re welcome',
        options: ['You\'re welcome', 'Thank you', 'Please', 'No problem']
      },
      {
        id: 'yo-s2-1-5',
        type: 'multiple-choice',
        question: 'How do you say "I am grateful" in Yoruba?',
        questionFr: 'Comment dit-on "Je suis reconnaissant" en Yoruba?',
        correctAnswer: 'Mo dupẹ',
        options: ['Mo dupẹ', 'E se', 'Ko si ohun', 'E jọwọ']
      },
      {
        id: 'yo-s2-1-6',
        type: 'fill-blank',
        question: 'Complete: "E ___" = please',
        questionFr: 'Complétez: "E ___" = s\'il vous plaît',
        correctAnswer: 'jọwọ',
        hint: 'Used before requests',
        hintFr: 'Utilisé avant les demandes'
      },
      {
        id: 'yo-s2-1-7',
        type: 'multiple-choice',
        question: 'What does "Mo dupe lọwọ rẹ" mean?',
        questionFr: 'Que signifie "Mo dupe lọwọ rẹ"?',
        correctAnswer: 'I thank you (formal)',
        options: ['I thank you (formal)', 'I greet you', 'I welcome you', 'I need you']
      },
      {
        id: 'yo-s2-1-8',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Yoruba?',
        questionFr: 'Comment dit-on "bien fait" en Yoruba?',
        correctAnswer: 'O ṣe daadaa',
        options: ['O ṣe daadaa', 'E se', 'Mo dupẹ', 'O dara']
      },
      {
        id: 'yo-s2-1-9',
        type: 'multiple-choice',
        question: 'In "E se pupọ", what does "pupọ" mean?',
        questionFr: 'Dans "E se pupọ", que signifie "pupọ"?',
        correctAnswer: 'Very much',
        options: ['Very much', 'A little', 'Again', 'Always']
      },
      {
        id: 'yo-s2-1-10',
        type: 'multiple-choice',
        question: 'Which phrase is used to formally thank someone?',
        questionFr: 'Quelle expression est utilisée pour remercier formellement?',
        correctAnswer: 'Mo dupe lọwọ rẹ',
        options: ['Mo dupe lọwọ rẹ', 'E jọwọ', 'Ko si ohun', 'E se pupọ']
      },
      {
        id: 'yo-s2-1-11',
        type: 'type-answer',
        question: 'Type "thank you" in Yoruba',
        questionFr: 'Tapez "merci" en Yoruba',
        correctAnswer: 'E se'
      },
      {
        id: 'yo-s2-1-12',
        type: 'multiple-choice',
        question: 'How do you reply when someone thanks you?',
        questionFr: 'Comment répondre quand quelqu\'un vous remercie?',
        correctAnswer: 'Ko si ohun',
        options: ['Ko si ohun', 'E se', 'E jọwọ', 'Bẹẹni']
      },
      {
        id: 'yo-s2-1-13',
        type: 'multiple-choice',
        question: 'How do you say "please come" in Yoruba?',
        questionFr: 'Comment dit-on "veuillez venir" en Yoruba?',
        correctAnswer: 'E jọwọ wọle',
        options: ['E jọwọ wọle', 'E se wọle', 'Mo dupẹ wọle', 'Ko si wọle']
      },
      {
        id: 'yo-s2-1-14',
        type: 'multiple-choice',
        question: 'What does "Mo dupẹ" mean?',
        questionFr: 'Que signifie "Mo dupẹ"?',
        correctAnswer: 'I am grateful',
        options: ['I am grateful', 'I am sorry', 'I am here', 'I am well']
      },
      {
        id: 'yo-s2-1-15',
        type: 'fill-blank',
        question: 'Complete: "Ko si ___" = you\'re welcome',
        questionFr: 'Complétez: "Ko si ___" = de rien',
        correctAnswer: 'ohun',
        hint: 'Literally "there is nothing"',
        hintFr: 'Littéralement "il n\'y a rien"'
      },
      {
        id: 'yo-s2-1-16',
        type: 'multiple-choice',
        question: 'In "O ṣe daadaa", what does "daadaa" mean?',
        questionFr: 'Dans "O ṣe daadaa", que signifie "daadaa"?',
        correctAnswer: 'Well / Nicely',
        options: ['Well / Nicely', 'Quickly', 'Slowly', 'Often']
      },
      {
        id: 'yo-s2-1-17',
        type: 'multiple-choice',
        question: 'How do you say "please sit down"?',
        questionFr: 'Comment dit-on "veuillez vous asseoir"?',
        correctAnswer: 'E jọwọ joko',
        options: ['E jọwọ joko', 'E se joko', 'Mo dupẹ joko', 'Ko si joko']
      },
      {
        id: 'yo-s2-1-18',
        type: 'multiple-choice',
        question: 'Which Yoruba phrase means "thank you very much"?',
        questionFr: 'Quelle phrase yoruba signifie "merci beaucoup"?',
        correctAnswer: 'E se pupọ',
        options: ['E se pupọ', 'E se daadaa', 'Ko si ohun', 'Mo dupe']
      },
      {
        id: 'yo-s2-1-19',
        type: 'multiple-choice',
        question: 'What is the difference between "E se" and "E se pupọ"?',
        questionFr: 'Quelle est la différence entre "E se" et "E se pupọ"?',
        correctAnswer: '"E se pupọ" means thank you very much',
        options: ['"E se pupọ" means thank you very much', '"E se" is more formal', '"E se pupọ" is a greeting', 'They mean the same thing']
      },
      {
        id: 'yo-s2-1-20',
        type: 'type-answer',
        question: 'Type "you\'re welcome" in Yoruba',
        questionFr: 'Tapez "de rien" en Yoruba',
        correctAnswer: 'Ko si ohun'
      }
    ]
  },

  // Unit 2 — Apologies & Forgiveness
  {
    id: 'yo-s2-2',
    type: 'vocabulary',
    title: 'Apologies & Forgiveness',
    titleFr: 'Excuses et Pardon',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-2-1',
        type: 'multiple-choice',
        question: 'How do you say "sorry" in Yoruba?',
        questionFr: 'Comment dit-on "désolé" en Yoruba?',
        correctAnswer: 'E ma binu',
        options: ['E ma binu', 'E dariji mi', 'Mo banujẹ', 'Ko si ohun']
      },
      {
        id: 'yo-s2-2-2',
        type: 'multiple-choice',
        question: 'What does "E ma binu" literally mean?',
        questionFr: 'Que signifie littéralement "E ma binu"?',
        correctAnswer: 'Don\'t be angry',
        options: ['Don\'t be angry', 'Forgive me', 'I am sorry', 'No problem']
      },
      {
        id: 'yo-s2-2-3',
        type: 'multiple-choice',
        question: 'How do you say "forgive me" in Yoruba?',
        questionFr: 'Comment dit-on "pardonnez-moi" en Yoruba?',
        correctAnswer: 'E dariji mi',
        options: ['E dariji mi', 'E ma binu', 'Ko si ohun', 'Mo banujẹ']
      },
      {
        id: 'yo-s2-2-4',
        type: 'multiple-choice',
        question: 'What does "Mo banujẹ" mean?',
        questionFr: 'Que signifie "Mo banujẹ"?',
        correctAnswer: 'I am sorry',
        options: ['I am sorry', 'I am well', 'I am happy', 'I am angry']
      },
      {
        id: 'yo-s2-2-5',
        type: 'multiple-choice',
        question: 'How do you say "no problem" in Yoruba?',
        questionFr: 'Comment dit-on "pas de problème" en Yoruba?',
        correctAnswer: 'Ko si ohun',
        options: ['Ko si ohun', 'E ma binu', 'E dariji mi', 'Bẹẹni']
      },
      {
        id: 'yo-s2-2-6',
        type: 'fill-blank',
        question: 'Complete: "E dariji ___" = forgive me',
        questionFr: 'Complétez: "E dariji ___" = pardonnez-moi',
        correctAnswer: 'mi',
        hint: 'The word for "me"',
        hintFr: 'Le mot pour "moi"'
      },
      {
        id: 'yo-s2-2-7',
        type: 'multiple-choice',
        question: 'What does "O ti dara" mean?',
        questionFr: 'Que signifie "O ti dara"?',
        correctAnswer: 'It\'s okay / It\'s fine now',
        options: ['It\'s okay / It\'s fine now', 'It\'s bad', 'It\'s over', 'It\'s done']
      },
      {
        id: 'yo-s2-2-8',
        type: 'multiple-choice',
        question: 'How do you formally apologize in Yoruba?',
        questionFr: 'Comment s\'excuser formellement en Yoruba?',
        correctAnswer: 'Mo tọrọ gafara',
        options: ['Mo tọrọ gafara', 'E ma binu', 'Ko si ohun', 'Mo banujẹ']
      },
      {
        id: 'yo-s2-2-9',
        type: 'multiple-choice',
        question: 'Which phrase do you use to comfort someone after an accident?',
        questionFr: 'Quelle phrase utilisez-vous pour réconforter quelqu\'un après un accident?',
        correctAnswer: 'E ma binu',
        options: ['E ma binu', 'Bẹẹni', 'E se', 'O dara']
      },
      {
        id: 'yo-s2-2-10',
        type: 'multiple-choice',
        question: 'How do you respond to an apology in Yoruba?',
        questionFr: 'Comment répondre à une excuse en Yoruba?',
        correctAnswer: 'Ko si ohun',
        options: ['Ko si ohun', 'E ma binu', 'Mo banujẹ', 'E dariji']
      },
      {
        id: 'yo-s2-2-11',
        type: 'type-answer',
        question: 'Type "forgive me" in Yoruba',
        questionFr: 'Tapez "pardonnez-moi" en Yoruba',
        correctAnswer: 'E dariji mi'
      },
      {
        id: 'yo-s2-2-12',
        type: 'multiple-choice',
        question: 'In "Mo banujẹ", which word means sad/sorry?',
        questionFr: 'Dans "Mo banujẹ", quel mot signifie triste/désolé?',
        correctAnswer: 'banujẹ',
        options: ['banujẹ', 'Mo', 'banu', 'jẹ']
      },
      {
        id: 'yo-s2-2-13',
        type: 'multiple-choice',
        question: 'How do you say "it\'s okay" in Yoruba?',
        questionFr: 'Comment dit-on "c\'est bon" en Yoruba?',
        correctAnswer: 'O ti dara',
        options: ['O ti dara', 'Ko si ohun', 'E ma binu', 'O dara pupọ']
      },
      {
        id: 'yo-s2-2-14',
        type: 'multiple-choice',
        question: 'What does "Idariji" mean?',
        questionFr: 'Que signifie "Idariji"?',
        correctAnswer: 'Forgiveness',
        options: ['Forgiveness', 'Apology', 'Sorrow', 'Anger']
      },
      {
        id: 'yo-s2-2-15',
        type: 'fill-blank',
        question: 'Complete: "Mo ___" = I am sorry',
        questionFr: 'Complétez: "Mo ___" = je suis désolé',
        correctAnswer: 'banujẹ',
        hint: 'Expresses sadness or remorse',
        hintFr: 'Exprime la tristesse ou le remords'
      },
      {
        id: 'yo-s2-2-16',
        type: 'multiple-choice',
        question: 'What does "Ẹ jẹ ki a gbagbe" mean?',
        questionFr: 'Que signifie "Ẹ jẹ ki a gbagbe"?',
        correctAnswer: 'Let\'s forget it',
        options: ['Let\'s forget it', 'Let\'s go', 'Let\'s eat', 'Let\'s talk']
      },
      {
        id: 'yo-s2-2-17',
        type: 'multiple-choice',
        question: 'How do you say "don\'t worry" in Yoruba?',
        questionFr: 'Comment dit-on "ne t\'inquiète pas" en Yoruba?',
        correctAnswer: 'Maṣe yọ ara rẹ lẹnu',
        options: ['Maṣe yọ ara rẹ lẹnu', 'E ma binu', 'Ko si ohun', 'Mo banujẹ']
      },
      {
        id: 'yo-s2-2-18',
        type: 'multiple-choice',
        question: 'Which phrase shows deep forgiveness?',
        questionFr: 'Quelle phrase montre un pardon profond?',
        correctAnswer: 'Mo ti dariji rẹ',
        options: ['Mo ti dariji rẹ', 'Ko si ohun', 'O ti dara', 'E ma binu']
      },
      {
        id: 'yo-s2-2-19',
        type: 'multiple-choice',
        question: 'What does "E ma binu" achieve in Yoruba culture?',
        questionFr: 'Que réalise "E ma binu" dans la culture yoruba?',
        correctAnswer: 'It calms anger and shows empathy',
        options: ['It calms anger and shows empathy', 'It requests help', 'It greets someone', 'It ends a conversation']
      },
      {
        id: 'yo-s2-2-20',
        type: 'type-answer',
        question: 'Type "sorry" in Yoruba',
        questionFr: 'Tapez "désolé" en Yoruba',
        correctAnswer: 'E ma binu'
      }
    ]
  },

  // Unit 3 — Yes, No & Agreement
  {
    id: 'yo-s2-3',
    type: 'vocabulary',
    title: 'Yes, No & Agreement',
    titleFr: 'Oui, Non et Accord',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-3-1',
        type: 'multiple-choice',
        question: 'How do you say "yes" in Yoruba?',
        questionFr: 'Comment dit-on "oui" en Yoruba?',
        correctAnswer: 'Bẹẹni',
        options: ['Bẹẹni', 'Rara', 'Boya', 'O tọ']
      },
      {
        id: 'yo-s2-3-2',
        type: 'multiple-choice',
        question: 'How do you say "no" in Yoruba?',
        questionFr: 'Comment dit-on "non" en Yoruba?',
        correctAnswer: 'Rara',
        options: ['Rara', 'Bẹẹni', 'Boya', 'Dajudaju']
      },
      {
        id: 'yo-s2-3-3',
        type: 'multiple-choice',
        question: 'What does "O tọ" mean?',
        questionFr: 'Que signifie "O tọ"?',
        correctAnswer: 'Correct / Right',
        options: ['Correct / Right', 'Wrong', 'Maybe', 'I agree']
      },
      {
        id: 'yo-s2-3-4',
        type: 'multiple-choice',
        question: 'How do you say "of course" in Yoruba?',
        questionFr: 'Comment dit-on "bien sûr" en Yoruba?',
        correctAnswer: 'Dajudaju',
        options: ['Dajudaju', 'Boya', 'O tọ', 'Nitootọ']
      },
      {
        id: 'yo-s2-3-5',
        type: 'multiple-choice',
        question: 'What does "Boya" mean?',
        questionFr: 'Que signifie "Boya"?',
        correctAnswer: 'Maybe',
        options: ['Maybe', 'Yes', 'No', 'Of course']
      },
      {
        id: 'yo-s2-3-6',
        type: 'multiple-choice',
        question: 'How do you say "I agree" in Yoruba?',
        questionFr: 'Comment dit-on "je suis d\'accord" en Yoruba?',
        correctAnswer: 'Mo gba',
        options: ['Mo gba', 'Mi o gba', 'Emi naa', 'O tọ']
      },
      {
        id: 'yo-s2-3-7',
        type: 'fill-blank',
        question: 'Complete: "Bẹẹ___" = yes',
        questionFr: 'Complétez: "Bẹẹ___" = oui',
        correctAnswer: 'ni',
        hint: 'A short suffix',
        hintFr: 'Un court suffixe'
      },
      {
        id: 'yo-s2-3-8',
        type: 'multiple-choice',
        question: 'What does "Emi naa" mean?',
        questionFr: 'Que signifie "Emi naa"?',
        correctAnswer: 'Me too',
        options: ['Me too', 'You too', 'I agree', 'I know']
      },
      {
        id: 'yo-s2-3-9',
        type: 'multiple-choice',
        question: 'How do you say "I don\'t agree" in Yoruba?',
        questionFr: 'Comment dit-on "je ne suis pas d\'accord" en Yoruba?',
        correctAnswer: 'Mi o gba',
        options: ['Mi o gba', 'Mo gba', 'Rara', 'Boya']
      },
      {
        id: 'yo-s2-3-10',
        type: 'multiple-choice',
        question: 'What does "Nitootọ" mean?',
        questionFr: 'Que signifie "Nitootọ"?',
        correctAnswer: 'Truly / Really',
        options: ['Truly / Really', 'Maybe', 'Of course', 'Not at all']
      },
      {
        id: 'yo-s2-3-11',
        type: 'type-answer',
        question: 'Type "yes" in Yoruba',
        questionFr: 'Tapez "oui" en Yoruba',
        correctAnswer: 'Bẹẹni'
      },
      {
        id: 'yo-s2-3-12',
        type: 'multiple-choice',
        question: 'How do you confirm something is correct?',
        questionFr: 'Comment confirmer que quelque chose est correct?',
        correctAnswer: 'O tọ',
        options: ['O tọ', 'Rara', 'Boya', 'Mi o gba']
      },
      {
        id: 'yo-s2-3-13',
        type: 'multiple-choice',
        question: 'What does "Dajudaju" express?',
        questionFr: 'Qu\'exprime "Dajudaju"?',
        correctAnswer: 'Strong certainty / Of course',
        options: ['Strong certainty / Of course', 'Doubt', 'Refusal', 'Surprise']
      },
      {
        id: 'yo-s2-3-14',
        type: 'multiple-choice',
        question: 'What does "Rara" mean?',
        questionFr: 'Que signifie "Rara"?',
        correctAnswer: 'No',
        options: ['No', 'Yes', 'Maybe', 'Never mind']
      },
      {
        id: 'yo-s2-3-15',
        type: 'fill-blank',
        question: 'Complete: "Mo ___" = I agree',
        questionFr: 'Complétez: "Mo ___" = je suis d\'accord',
        correctAnswer: 'gba',
        hint: 'Short verb meaning to accept/agree',
        hintFr: 'Verbe court signifiant accepter/être d\'accord'
      },
      {
        id: 'yo-s2-3-16',
        type: 'multiple-choice',
        question: 'How do you say "that is true" in Yoruba?',
        questionFr: 'Comment dit-on "c\'est vrai" en Yoruba?',
        correctAnswer: 'Nitootọ',
        options: ['Nitootọ', 'O tọ', 'Dajudaju', 'Bẹẹni']
      },
      {
        id: 'yo-s2-3-17',
        type: 'multiple-choice',
        question: 'Which phrase shows the strongest agreement?',
        questionFr: 'Quelle phrase montre l\'accord le plus fort?',
        correctAnswer: 'Dajudaju',
        options: ['Dajudaju', 'Boya', 'O tọ', 'Emi naa']
      },
      {
        id: 'yo-s2-3-18',
        type: 'multiple-choice',
        question: 'How do you say "maybe" in Yoruba?',
        questionFr: 'Comment dit-on "peut-être" en Yoruba?',
        correctAnswer: 'Boya',
        options: ['Boya', 'Bẹẹni', 'Rara', 'O tọ']
      },
      {
        id: 'yo-s2-3-19',
        type: 'multiple-choice',
        question: 'What does "Mo ko gba" mean?',
        questionFr: 'Que signifie "Mo ko gba"?',
        correctAnswer: 'I don\'t agree',
        options: ['I don\'t agree', 'I agree', 'I don\'t know', 'I refuse']
      },
      {
        id: 'yo-s2-3-20',
        type: 'type-answer',
        question: 'Type "of course" in Yoruba',
        questionFr: 'Tapez "bien sûr" en Yoruba',
        correctAnswer: 'Dajudaju'
      }
    ]
  },

  // Unit 4 — Welcome & Hospitality
  {
    id: 'yo-s2-4',
    type: 'vocabulary',
    title: 'Welcome & Hospitality',
    titleFr: 'Bienvenue et Hospitalité',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-4-1',
        type: 'multiple-choice',
        question: 'How do you say "welcome" in Yoruba?',
        questionFr: 'Comment dit-on "bienvenue" en Yoruba?',
        correctAnswer: 'E kaabo',
        options: ['E kaabo', 'E wọle', 'E joko', 'E jẹun']
      },
      {
        id: 'yo-s2-4-2',
        type: 'multiple-choice',
        question: 'What does "E wọle" mean?',
        questionFr: 'Que signifie "E wọle"?',
        correctAnswer: 'Come in',
        options: ['Come in', 'Sit down', 'Welcome', 'Please eat']
      },
      {
        id: 'yo-s2-4-3',
        type: 'multiple-choice',
        question: 'How do you say "sit down" in Yoruba?',
        questionFr: 'Comment dit-on "asseyez-vous" en Yoruba?',
        correctAnswer: 'E joko',
        options: ['E joko', 'E wọle', 'E kaabo', 'E jẹun']
      },
      {
        id: 'yo-s2-4-4',
        type: 'multiple-choice',
        question: 'What does "E jẹun" mean?',
        questionFr: 'Que signifie "E jẹun"?',
        correctAnswer: 'Please eat',
        options: ['Please eat', 'Please sit', 'Come in', 'Welcome']
      },
      {
        id: 'yo-s2-4-5',
        type: 'multiple-choice',
        question: 'How do you say "let me help you" in Yoruba?',
        questionFr: 'Comment dit-on "laissez-moi vous aider" en Yoruba?',
        correctAnswer: 'Jẹ ki n ran ọ lọwọ',
        options: ['Jẹ ki n ran ọ lọwọ', 'E jọwọ', 'Mo dupẹ', 'E kaabo']
      },
      {
        id: 'yo-s2-4-6',
        type: 'fill-blank',
        question: 'Complete: "E ___" = come in',
        questionFr: 'Complétez: "E ___" = entrez',
        correctAnswer: 'wọle',
        hint: 'Invitation to enter a home',
        hintFr: 'Invitation à entrer dans une maison'
      },
      {
        id: 'yo-s2-4-7',
        type: 'multiple-choice',
        question: 'What does "Ile wa ni ile yin" mean?',
        questionFr: 'Que signifie "Ile wa ni ile yin"?',
        correctAnswer: 'Our home is your home',
        options: ['Our home is your home', 'Welcome to our home', 'Please come in', 'Sit and eat']
      },
      {
        id: 'yo-s2-4-8',
        type: 'multiple-choice',
        question: 'How do you offer something to a guest?',
        questionFr: 'Comment offrir quelque chose à un invité?',
        correctAnswer: 'E mu',
        options: ['E mu', 'E joko', 'E kaabo', 'E se']
      },
      {
        id: 'yo-s2-4-9',
        type: 'multiple-choice',
        question: 'What does "E joko" mean?',
        questionFr: 'Que signifie "E joko"?',
        correctAnswer: 'Sit down',
        options: ['Sit down', 'Come in', 'Welcome', 'Please eat']
      },
      {
        id: 'yo-s2-4-10',
        type: 'multiple-choice',
        question: 'When a visitor arrives, you say:',
        questionFr: 'Quand un visiteur arrive, vous dites:',
        correctAnswer: 'E kaabo',
        options: ['E kaabo', 'O dabo', 'E se', 'Ko si ohun']
      },
      {
        id: 'yo-s2-4-11',
        type: 'type-answer',
        question: 'Type "welcome" in Yoruba',
        questionFr: 'Tapez "bienvenue" en Yoruba',
        correctAnswer: 'E kaabo'
      },
      {
        id: 'yo-s2-4-12',
        type: 'multiple-choice',
        question: 'In "E jẹun", what does "jẹun" mean?',
        questionFr: 'Dans "E jẹun", que signifie "jẹun"?',
        correctAnswer: 'Eat',
        options: ['Eat', 'Sit', 'Come', 'Stay']
      },
      {
        id: 'yo-s2-4-13',
        type: 'multiple-choice',
        question: 'How do you say "please come in and sit"?',
        questionFr: 'Comment dit-on "veuillez entrer et vous asseoir"?',
        correctAnswer: 'E wọle, e joko',
        options: ['E wọle, e joko', 'E kaabo, e jẹun', 'E se, e kaabo', 'E joko, e wọle']
      },
      {
        id: 'yo-s2-4-14',
        type: 'multiple-choice',
        question: 'What does "E mu" mean?',
        questionFr: 'Que signifie "E mu"?',
        correctAnswer: 'Have this / Take this',
        options: ['Have this / Take this', 'Eat this', 'Sit here', 'Come here']
      },
      {
        id: 'yo-s2-4-15',
        type: 'fill-blank',
        question: 'Complete: "E ___" = sit down',
        questionFr: 'Complétez: "E ___" = asseyez-vous',
        correctAnswer: 'joko',
        hint: 'Used when offering a seat',
        hintFr: 'Utilisé pour offrir une place'
      },
      {
        id: 'yo-s2-4-16',
        type: 'multiple-choice',
        question: 'What phrase makes a guest feel at home?',
        questionFr: 'Quelle phrase met un invité à l\'aise?',
        correctAnswer: 'Ile wa ni ile yin',
        options: ['Ile wa ni ile yin', 'E kaabo', 'E wọle', 'E jẹun']
      },
      {
        id: 'yo-s2-4-17',
        type: 'multiple-choice',
        question: 'What does "Kaabo" alone mean?',
        questionFr: 'Que signifie "Kaabo" seul?',
        correctAnswer: 'Welcome',
        options: ['Welcome', 'Goodbye', 'Thank you', 'Please']
      },
      {
        id: 'yo-s2-4-18',
        type: 'multiple-choice',
        question: 'How do you say "I will help you"?',
        questionFr: 'Comment dit-on "je vais vous aider"?',
        correctAnswer: 'Emi yio ran ọ lọwọ',
        options: ['Emi yio ran ọ lọwọ', 'Jẹ ki n ran ọ lọwọ', 'Mo dupẹ', 'E se']
      },
      {
        id: 'yo-s2-4-19',
        type: 'multiple-choice',
        question: 'Which phrase invites someone to eat?',
        questionFr: 'Quelle phrase invite quelqu\'un à manger?',
        correctAnswer: 'E jẹun',
        options: ['E jẹun', 'E wọle', 'E joko', 'E kaabo']
      },
      {
        id: 'yo-s2-4-20',
        type: 'type-answer',
        question: 'Type "come in" in Yoruba',
        questionFr: 'Tapez "entrez" en Yoruba',
        correctAnswer: 'E wọle'
      }
    ]
  },

  // Unit 5 — Making Polite Requests
  {
    id: 'yo-s2-5',
    type: 'vocabulary',
    title: 'Making Polite Requests',
    titleFr: 'Formuler des Demandes Polies',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-5-1',
        type: 'multiple-choice',
        question: 'How do you say "I want" in Yoruba?',
        questionFr: 'Comment dit-on "je veux" en Yoruba?',
        correctAnswer: 'Mo fẹ',
        options: ['Mo fẹ', 'Mo nilo', 'Mo n wa', 'Jọwọ']
      },
      {
        id: 'yo-s2-5-2',
        type: 'multiple-choice',
        question: 'What does "Mo nilo" mean?',
        questionFr: 'Que signifie "Mo nilo"?',
        correctAnswer: 'I need',
        options: ['I need', 'I want', 'I have', 'I go']
      },
      {
        id: 'yo-s2-5-3',
        type: 'multiple-choice',
        question: 'How do you ask "can you help me?" in Yoruba?',
        questionFr: 'Comment demander "pouvez-vous m\'aider?" en Yoruba?',
        correctAnswer: 'Ṣe o le ran mi lọwọ?',
        options: ['Ṣe o le ran mi lọwọ?', 'Mo fẹ iranlọwọ', 'Jọwọ joko', 'E kaabo']
      },
      {
        id: 'yo-s2-5-4',
        type: 'multiple-choice',
        question: 'What does "Jọwọ ran mi lọwọ" mean?',
        questionFr: 'Que signifie "Jọwọ ran mi lọwọ"?',
        correctAnswer: 'Please help me',
        options: ['Please help me', 'Please come here', 'Please wait', 'Please sit']
      },
      {
        id: 'yo-s2-5-5',
        type: 'multiple-choice',
        question: 'How do you say "I am looking for" in Yoruba?',
        questionFr: 'Comment dit-on "je cherche" en Yoruba?',
        correctAnswer: 'Mo n wa',
        options: ['Mo n wa', 'Mo fẹ', 'Mo nilo', 'Mo lọ']
      },
      {
        id: 'yo-s2-5-6',
        type: 'fill-blank',
        question: 'Complete: "Mo ___" = I want',
        questionFr: 'Complétez: "Mo ___" = je veux',
        correctAnswer: 'fẹ',
        hint: 'The verb for wanting/wishing',
        hintFr: 'Le verbe pour vouloir/souhaiter'
      },
      {
        id: 'yo-s2-5-7',
        type: 'multiple-choice',
        question: 'What does "Ṣe o le?" mean?',
        questionFr: 'Que signifie "Ṣe o le?"?',
        correctAnswer: 'Can you?',
        options: ['Can you?', 'Do you want?', 'Are you?', 'Will you?']
      },
      {
        id: 'yo-s2-5-8',
        type: 'multiple-choice',
        question: 'How do you say "I need water" in Yoruba?',
        questionFr: 'Comment dit-on "j\'ai besoin d\'eau" en Yoruba?',
        correctAnswer: 'Mo nilo omi',
        options: ['Mo nilo omi', 'Mo fẹ omi', 'Mo n wa omi', 'E mu omi']
      },
      {
        id: 'yo-s2-5-9',
        type: 'multiple-choice',
        question: 'What does "Mo fẹ" mean?',
        questionFr: 'Que signifie "Mo fẹ"?',
        correctAnswer: 'I want',
        options: ['I want', 'I need', 'I have', 'I see']
      },
      {
        id: 'yo-s2-5-10',
        type: 'multiple-choice',
        question: 'How do you politely say "give me please"?',
        questionFr: 'Comment dire poliment "donnez-moi s\'il vous plaît"?',
        correctAnswer: 'Jọwọ fun mi',
        options: ['Jọwọ fun mi', 'E jọwọ', 'Mo fẹ', 'E mu']
      },
      {
        id: 'yo-s2-5-11',
        type: 'type-answer',
        question: 'Type "I need" in Yoruba',
        questionFr: 'Tapez "j\'ai besoin" en Yoruba',
        correctAnswer: 'Mo nilo'
      },
      {
        id: 'yo-s2-5-12',
        type: 'multiple-choice',
        question: 'In "Mo n wa", what does "wa" mean?',
        questionFr: 'Dans "Mo n wa", que signifie "wa"?',
        correctAnswer: 'Looking for / Searching',
        options: ['Looking for / Searching', 'Going', 'Coming', 'Staying']
      },
      {
        id: 'yo-s2-5-13',
        type: 'multiple-choice',
        question: 'How do you say "please give me" in Yoruba?',
        questionFr: 'Comment dit-on "donnez-moi s\'il vous plaît" en Yoruba?',
        correctAnswer: 'Jọwọ fun mi',
        options: ['Jọwọ fun mi', 'E jọwọ fun', 'Mo nilo fun', 'Ko si fun mi']
      },
      {
        id: 'yo-s2-5-14',
        type: 'multiple-choice',
        question: 'What does "Ṣe o le ran mi lọwọ" mean?',
        questionFr: 'Que signifie "Ṣe o le ran mi lọwọ"?',
        correctAnswer: 'Can you help me?',
        options: ['Can you help me?', 'Do you need help?', 'Can I help you?', 'Are you helping me?']
      },
      {
        id: 'yo-s2-5-15',
        type: 'fill-blank',
        question: 'Complete: "Mo n ___" = I am looking for',
        questionFr: 'Complétez: "Mo n ___" = je cherche',
        correctAnswer: 'wa',
        hint: 'The verb meaning to search',
        hintFr: 'Le verbe signifiant chercher'
      },
      {
        id: 'yo-s2-5-16',
        type: 'multiple-choice',
        question: 'How do you start a polite request in Yoruba?',
        questionFr: 'Comment commencer une demande polie en Yoruba?',
        correctAnswer: 'Jọwọ',
        options: ['Jọwọ', 'Rara', 'Bẹẹni', 'Nitootọ']
      },
      {
        id: 'yo-s2-5-17',
        type: 'multiple-choice',
        question: 'What does "Jọwọ" mean?',
        questionFr: 'Que signifie "Jọwọ"?',
        correctAnswer: 'Please',
        options: ['Please', 'Thank you', 'Sorry', 'Welcome']
      },
      {
        id: 'yo-s2-5-18',
        type: 'multiple-choice',
        question: 'How do you say "I want to go" in Yoruba?',
        questionFr: 'Comment dit-on "je veux partir" en Yoruba?',
        correctAnswer: 'Mo fẹ lọ',
        options: ['Mo fẹ lọ', 'Mo nilo lọ', 'Mo n wa lọ', 'Jọwọ lọ']
      },
      {
        id: 'yo-s2-5-19',
        type: 'multiple-choice',
        question: 'What is the difference between "Mo fẹ" and "Mo nilo"?',
        questionFr: 'Quelle est la différence entre "Mo fẹ" et "Mo nilo"?',
        correctAnswer: '"Mo fẹ" = want, "Mo nilo" = need',
        options: ['"Mo fẹ" = want, "Mo nilo" = need', '"Mo fẹ" = need, "Mo nilo" = want', 'They mean the same thing', '"Mo nilo" is more polite']
      },
      {
        id: 'yo-s2-5-20',
        type: 'type-answer',
        question: 'Type "please help me" in Yoruba',
        questionFr: 'Tapez "aidez-moi s\'il vous plaît" en Yoruba',
        correctAnswer: 'Jọwọ ran mi lọwọ'
      }
    ]
  },

  // Unit 6 — Compliments & Encouragement
  {
    id: 'yo-s2-6',
    type: 'vocabulary',
    title: 'Compliments & Encouragement',
    titleFr: 'Compliments et Encouragement',
    level: 2,
    xpReward: 15,
    exercises: [
      {
        id: 'yo-s2-6-1',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Yoruba?',
        questionFr: 'Comment dit-on "bien fait" en Yoruba?',
        correctAnswer: 'O ṣe daadaa',
        options: ['O ṣe daadaa', 'O dara', 'Ẹwà', 'Mo yọ']
      },
      {
        id: 'yo-s2-6-2',
        type: 'multiple-choice',
        question: 'What does "O dara" mean?',
        questionFr: 'Que signifie "O dara"?',
        correctAnswer: 'It\'s good / Good',
        options: ['It\'s good / Good', 'It\'s bad', 'It\'s beautiful', 'Well done']
      },
      {
        id: 'yo-s2-6-3',
        type: 'multiple-choice',
        question: 'How do you say "beautiful" in Yoruba?',
        questionFr: 'Comment dit-on "beau/belle" en Yoruba?',
        correctAnswer: 'Ẹwà',
        options: ['Ẹwà', 'O dara', 'Mo yọ', 'O ṣe daadaa']
      },
      {
        id: 'yo-s2-6-4',
        type: 'multiple-choice',
        question: 'What does "Iwọ jẹ ọlọgbọn" mean?',
        questionFr: 'Que signifie "Iwọ jẹ ọlọgbọn"?',
        correctAnswer: 'You are smart',
        options: ['You are smart', 'You are beautiful', 'You are strong', 'You are kind']
      },
      {
        id: 'yo-s2-6-5',
        type: 'multiple-choice',
        question: 'How do you say "I am happy" in Yoruba?',
        questionFr: 'Comment dit-on "je suis heureux" en Yoruba?',
        correctAnswer: 'Mo yọ',
        options: ['Mo yọ', 'Mo banujẹ', 'Mo dupẹ', 'Mo fẹ']
      },
      {
        id: 'yo-s2-6-6',
        type: 'fill-blank',
        question: 'Complete: "O dara ___" = very good',
        questionFr: 'Complétez: "O dara ___" = très bien',
        correctAnswer: 'pupọ',
        hint: 'The word for "very/much"',
        hintFr: 'Le mot pour "très/beaucoup"'
      },
      {
        id: 'yo-s2-6-7',
        type: 'multiple-choice',
        question: 'What does "Ẹ kú irẹlẹ" mean?',
        questionFr: 'Que signifie "Ẹ kú irẹlẹ"?',
        correctAnswer: 'Well done (for humility/effort)',
        options: ['Well done (for humility/effort)', 'You are beautiful', 'Thank you', 'Good morning']
      },
      {
        id: 'yo-s2-6-8',
        type: 'multiple-choice',
        question: 'How do you compliment someone\'s work in Yoruba?',
        questionFr: 'Comment complimenter le travail de quelqu\'un en Yoruba?',
        correctAnswer: 'O ṣe daadaa',
        options: ['O ṣe daadaa', 'E se', 'Mo yọ', 'O dara']
      },
      {
        id: 'yo-s2-6-9',
        type: 'multiple-choice',
        question: 'What does "Mo yọ" mean?',
        questionFr: 'Que signifie "Mo yọ"?',
        correctAnswer: 'I am happy',
        options: ['I am happy', 'I am sad', 'I am tired', 'I am ready']
      },
      {
        id: 'yo-s2-6-10',
        type: 'multiple-choice',
        question: 'How do you say "very good" in Yoruba?',
        questionFr: 'Comment dit-on "très bien" en Yoruba?',
        correctAnswer: 'O dara pupọ',
        options: ['O dara pupọ', 'O ṣe daadaa', 'Ẹwà pupọ', 'Mo yọ pupọ']
      },
      {
        id: 'yo-s2-6-11',
        type: 'type-answer',
        question: 'Type "beautiful" in Yoruba',
        questionFr: 'Tapez "beau/belle" en Yoruba',
        correctAnswer: 'Ẹwà'
      },
      {
        id: 'yo-s2-6-12',
        type: 'multiple-choice',
        question: 'What does "Ọjọ rere" mean?',
        questionFr: 'Que signifie "Ọjọ rere"?',
        correctAnswer: 'Good day',
        options: ['Good day', 'Good work', 'Good luck', 'Good morning']
      },
      {
        id: 'yo-s2-6-13',
        type: 'multiple-choice',
        question: 'How do you encourage someone to keep going?',
        questionFr: 'Comment encourager quelqu\'un à continuer?',
        correctAnswer: 'O ṣe daadaa, ma tẹsiwaju',
        options: ['O ṣe daadaa, ma tẹsiwaju', 'E se, o dara', 'Mo yọ, e kaabo', 'Ẹwà, dajudaju']
      },
      {
        id: 'yo-s2-6-14',
        type: 'multiple-choice',
        question: 'What does "O ṣe daadaa" mean?',
        questionFr: 'Que signifie "O ṣe daadaa"?',
        correctAnswer: 'Well done / You did well',
        options: ['Well done / You did well', 'It is good', 'You are beautiful', 'I am happy']
      },
      {
        id: 'yo-s2-6-15',
        type: 'fill-blank',
        question: 'Complete: "Iwọ jẹ ___" = you are smart',
        questionFr: 'Complétez: "Iwọ jẹ ___" = tu es intelligent',
        correctAnswer: 'ọlọgbọn',
        hint: 'The Yoruba word for smart/intelligent',
        hintFr: 'Le mot yoruba pour intelligent'
      },
      {
        id: 'yo-s2-6-16',
        type: 'multiple-choice',
        question: 'How do you say "you are beautiful" in Yoruba?',
        questionFr: 'Comment dit-on "tu es beau/belle" en Yoruba?',
        correctAnswer: 'Iwọ jẹ ẹwà',
        options: ['Iwọ jẹ ẹwà', 'Iwọ jẹ daadaa', 'O dara pupọ', 'Ẹwà daadaa']
      },
      {
        id: 'yo-s2-6-17',
        type: 'multiple-choice',
        question: 'What does "Ẹ kú" mean in Yoruba greetings?',
        questionFr: 'Que signifie "Ẹ kú" dans les salutations yoruba?',
        correctAnswer: 'Well done / Acknowledgment of effort',
        options: ['Well done / Acknowledgment of effort', 'Thank you', 'Goodbye', 'Welcome']
      },
      {
        id: 'yo-s2-6-18',
        type: 'multiple-choice',
        question: 'How do you express joy in Yoruba?',
        questionFr: 'Comment exprimer la joie en Yoruba?',
        correctAnswer: 'Mo yọ',
        options: ['Mo yọ', 'Mo banujẹ', 'E ma binu', 'Mo nilo']
      },
      {
        id: 'yo-s2-6-19',
        type: 'multiple-choice',
        question: 'Which word means "smart/intelligent" in Yoruba?',
        questionFr: 'Quel mot signifie "intelligent" en Yoruba?',
        correctAnswer: 'ọlọgbọn',
        options: ['ọlọgbọn', 'ẹwà', 'daadaa', 'pupọ']
      },
      {
        id: 'yo-s2-6-20',
        type: 'type-answer',
        question: 'Type "well done" in Yoruba',
        questionFr: 'Tapez "bien fait" en Yoruba',
        correctAnswer: 'O ṣe daadaa'
      }
    ]
  },

  // Unit 7 — Polite Speech Review
  {
    id: 'yo-s2-7',
    type: 'vocabulary',
    title: 'Polite Speech Review',
    titleFr: 'Révision du Discours Poli',
    level: 2,
    xpReward: 20,
    exercises: [
      {
        id: 'yo-s2-7-1',
        type: 'multiple-choice',
        question: 'How do you say "please" in Yoruba?',
        questionFr: 'Comment dit-on "s\'il vous plaît" en Yoruba?',
        correctAnswer: 'E jọwọ',
        options: ['E jọwọ', 'E se', 'Ko si ohun', 'E kaabo']
      },
      {
        id: 'yo-s2-7-2',
        type: 'multiple-choice',
        question: 'What does "E se" mean?',
        questionFr: 'Que signifie "E se"?',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'Sorry', 'You\'re welcome']
      },
      {
        id: 'yo-s2-7-3',
        type: 'multiple-choice',
        question: 'How do you say "sorry" in Yoruba?',
        questionFr: 'Comment dit-on "désolé" en Yoruba?',
        correctAnswer: 'E ma binu',
        options: ['E ma binu', 'E dariji mi', 'Mo banujẹ', 'Ko si ohun']
      },
      {
        id: 'yo-s2-7-4',
        type: 'multiple-choice',
        question: 'What does "Bẹẹni" mean?',
        questionFr: 'Que signifie "Bẹẹni"?',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Maybe', 'Of course']
      },
      {
        id: 'yo-s2-7-5',
        type: 'multiple-choice',
        question: 'How do you say "welcome" in Yoruba?',
        questionFr: 'Comment dit-on "bienvenue" en Yoruba?',
        correctAnswer: 'E kaabo',
        options: ['E kaabo', 'E wọle', 'E joko', 'E se']
      },
      {
        id: 'yo-s2-7-6',
        type: 'multiple-choice',
        question: 'What does "Mo fẹ" mean?',
        questionFr: 'Que signifie "Mo fẹ"?',
        correctAnswer: 'I want',
        options: ['I want', 'I need', 'I have', 'I go']
      },
      {
        id: 'yo-s2-7-7',
        type: 'multiple-choice',
        question: 'How do you say "well done" in Yoruba?',
        questionFr: 'Comment dit-on "bien fait" en Yoruba?',
        correctAnswer: 'O ṣe daadaa',
        options: ['O ṣe daadaa', 'O dara', 'Mo yọ', 'E se']
      },
      {
        id: 'yo-s2-7-8',
        type: 'fill-blank',
        question: 'Complete: "Ko si ___" = you\'re welcome',
        questionFr: 'Complétez: "Ko si ___" = de rien',
        correctAnswer: 'ohun',
        hint: 'Literally "there is nothing"',
        hintFr: 'Littéralement "il n\'y a rien"'
      },
      {
        id: 'yo-s2-7-9',
        type: 'multiple-choice',
        question: 'What does "E dariji mi" mean?',
        questionFr: 'Que signifie "E dariji mi"?',
        correctAnswer: 'Forgive me',
        options: ['Forgive me', 'Help me', 'Greet me', 'Thank me']
      },
      {
        id: 'yo-s2-7-10',
        type: 'multiple-choice',
        question: 'How do you say "I agree" in Yoruba?',
        questionFr: 'Comment dit-on "je suis d\'accord" en Yoruba?',
        correctAnswer: 'Mo gba',
        options: ['Mo gba', 'Mi o gba', 'Bẹẹni', 'O tọ']
      },
      {
        id: 'yo-s2-7-11',
        type: 'multiple-choice',
        question: 'What does "E wọle" mean?',
        questionFr: 'Que signifie "E wọle"?',
        correctAnswer: 'Come in',
        options: ['Come in', 'Sit down', 'Welcome', 'Please eat']
      },
      {
        id: 'yo-s2-7-12',
        type: 'multiple-choice',
        question: 'How do you say "I need" in Yoruba?',
        questionFr: 'Comment dit-on "j\'ai besoin" en Yoruba?',
        correctAnswer: 'Mo nilo',
        options: ['Mo nilo', 'Mo fẹ', 'Mo n wa', 'Mo lọ']
      },
      {
        id: 'yo-s2-7-13',
        type: 'type-answer',
        question: 'Type "thank you very much" in Yoruba',
        questionFr: 'Tapez "merci beaucoup" en Yoruba',
        correctAnswer: 'E se pupọ'
      },
      {
        id: 'yo-s2-7-14',
        type: 'multiple-choice',
        question: 'What does "Dajudaju" mean?',
        questionFr: 'Que signifie "Dajudaju"?',
        correctAnswer: 'Of course',
        options: ['Of course', 'Maybe', 'Never', 'Always']
      },
      {
        id: 'yo-s2-7-15',
        type: 'multiple-choice',
        question: 'How do you say "I am happy" in Yoruba?',
        questionFr: 'Comment dit-on "je suis heureux" en Yoruba?',
        correctAnswer: 'Mo yọ',
        options: ['Mo yọ', 'Mo banujẹ', 'Mo fẹ', 'Mo dupẹ']
      },
      {
        id: 'yo-s2-7-16',
        type: 'fill-blank',
        question: 'Complete: "E ___" = sit down',
        questionFr: 'Complétez: "E ___" = asseyez-vous',
        correctAnswer: 'joko',
        hint: 'Invitation to take a seat',
        hintFr: 'Invitation à s\'asseoir'
      },
      {
        id: 'yo-s2-7-17',
        type: 'multiple-choice',
        question: 'What does "Mo banujẹ" mean?',
        questionFr: 'Que signifie "Mo banujẹ"?',
        correctAnswer: 'I am sorry',
        options: ['I am sorry', 'I am well', 'I am grateful', 'I am happy']
      },
      {
        id: 'yo-s2-7-18',
        type: 'multiple-choice',
        question: 'How do you say "maybe" in Yoruba?',
        questionFr: 'Comment dit-on "peut-être" en Yoruba?',
        correctAnswer: 'Boya',
        options: ['Boya', 'Bẹẹni', 'Rara', 'O tọ']
      },
      {
        id: 'yo-s2-7-19',
        type: 'multiple-choice',
        question: 'What does "Ẹwà" mean?',
        questionFr: 'Que signifie "Ẹwà"?',
        correctAnswer: 'Beautiful',
        options: ['Beautiful', 'Good', 'Smart', 'Happy']
      },
      {
        id: 'yo-s2-7-20',
        type: 'type-answer',
        question: 'Type "forgive me" in Yoruba',
        questionFr: 'Tapez "pardonnez-moi" en Yoruba',
        correctAnswer: 'E dariji mi'
      }
    ]
  }
];
