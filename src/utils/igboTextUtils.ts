// Utility functions for handling Igbo text with accent marks
// This helps users who might not type the exact accent marks

export const igboTextVariations: Record<string, string[]> = {
  // Common Igbo words with their variations
  'Ka ọ dị': ['Ka o di', 'ka ọ dị', 'ka o di', 'Ka o di'],
  'Ndewo': ['ndewo', 'Ndewo'],
  'Daalụ': ['Daalu', 'daalụ', 'daalu', 'Daalu'],
  'Biko': ['biko', 'Biko'],
  'Ụtụtụ ọma': ['Ututu oma', 'utụtụ ọma', 'ututu oma', 'Ututu oma'],
  'Ehihie ọma': ['Ehihie oma', 'ehihie ọma', 'ehihie oma', 'Ehihie oma'],
  'Ọ dị m ụtọ izute gị': ['O di m uto izute gi', 'ọ dị m ụtọ izute gị', 'o di m uto izute gi'],
  'Kedu ka ị mere': ['Kedu ka i mere', 'kedu ka ị mere', 'kedu ka i mere'],
  'Nna': ['nna', 'Nna'],
  'Nne': ['nne', 'Nne'],
  'Nwanne': ['nwanne', 'Nwanne'],
  'Ụmụaka': ['Umụaka', 'umụaka', 'Umụaka'],
  'Enyi': ['enyi', 'Enyi'],
  'Ụlọ': ['Ulo', 'ụlọ', 'ulo', 'Ulo'],
  'Mmiri': ['mmiri', 'Mmiri'],
  'Nri': ['nri', 'Nri'],
  'Akwụkwọ': ['Akwukwo', 'akwụkwọ', 'akwukwo', 'Akwukwo'],
  'Ego': ['ego', 'Ego'],
  'Ụbọchị': ['Ubọchị', 'ubọchị', 'Ubọchị'],
  'Abalị': ['Abali', 'abalị', 'abali', 'Abali'],
  'Ụtụtụ': ['Utụtụ', 'utụtụ', 'Utụtụ'],
  'Ehihie': ['ehihie', 'Ehihie'],
  'Anyasị': ['Anyasi', 'anyasị', 'anyasi', 'Anyasi'],
  'Ụwa': ['Uwa', 'ụwa', 'uwa', 'Uwa'],
  'Ala': ['ala', 'Ala'],
  'Oké ọhịa': ['Oke ohịa', 'oké ọhịa', 'oke ohịa', 'Oke ohịa'],
  'Mmiri ozuzo': ['mmiri ozuzo', 'Mmiri ozuzo'],
  'Anwụ': ['anwụ', 'Anwụ'],
  'Ọnwa': ['Onwa', 'ọnwa', 'onwa', 'Onwa'],
  'Kpakpando': ['kpakpando', 'Kpakpando'],
  'Ije': ['ije', 'Ije'],
  'Ịga': ['Iga', 'ịga', 'iga', 'Iga'],
  'Bịa': ['Bia', 'bịa', 'bia', 'Bia'],
  'Gaa': ['gaa', 'Gaa'],
  'Nọrọ': ['Noro', 'nọrọ', 'noro', 'Noro'],
  'Nọdụ': ['Nodu', 'nọdụ', 'nodu', 'Nodu'],
  'Guo': ['guo', 'Guo'],
  'Kpọọ': ['Kpoo', 'kpọọ', 'kpoo', 'Kpoo'],
  'Sị': ['Si', 'sị', 'si', 'Si'],
  'Kọọ': ['Koo', 'kọọ', 'koo', 'Koo'],
  'Mee': ['mee', 'Mee'],
  'Nye': ['nye', 'Nye'],
  'Nara': ['nara', 'Nara'],
  'Kpata': ['kpata', 'Kpata'],
  'Zụta': ['Zuta', 'zụta', 'zuta', 'Zuta'],
  'Ree': ['ree', 'Ree'],
  'Gbaa': ['gbaa', 'Gbaa'],
  'Kpụ': ['Kpu', 'kpụ', 'kpu', 'Kpu'],
  'Kpọ': ['Kpo', 'kpọ', 'kpo', 'Kpo'],
  'Kpị': ['Kpi', 'kpị', 'kpi', 'Kpi'],
  'Kpụrụ': ['Kpuru', 'kpụrụ', 'kpuru', 'Kpuru'],
  'Kpọrọ': ['Kporo', 'kpọrọ', 'kporo', 'Kporo'],
  'Kpịrị': ['Kpiri', 'kpịrị', 'kpiri', 'Kpiri']
};

// Function to normalize text by removing accent marks for comparison
const normalizeForComparison = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/ọ/g, 'o')
    .replace(/ị/g, 'i')
    .replace(/ụ/g, 'u')
    .replace(/ọ/g, 'o')
    .replace(/ị/g, 'i')
    .replace(/ụ/g, 'u')
    .replace(/ọ/g, 'o')
    .replace(/ị/g, 'i')
    .replace(/ụ/g, 'u');
};

// Function to check if a user's answer matches any variation of the correct answer
export const checkIgboAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  // First check exact match
  if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
    return true;
  }
  
  // Check normalized comparison (removes accent marks)
  const normalizedUser = normalizeForComparison(userAnswer);
  const normalizedCorrect = normalizeForComparison(correctAnswer);
  
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Check if user answer matches any variation of the correct answer
  const variations = igboTextVariations[correctAnswer];
  if (variations) {
    return variations.some(variation => 
      userAnswer.trim().toLowerCase() === variation.trim().toLowerCase()
    );
  }
  
  // Check reverse lookup - if user answer is a variation of any correct answer
  for (const [correct, variations] of Object.entries(igboTextVariations)) {
    if (variations.some(variation => 
      userAnswer.trim().toLowerCase() === variation.trim().toLowerCase()
    )) {
      return true;
    }
  }
  
  return false;
};

// Function to normalize Igbo text for display
export const normalizeIgboText = (text: string): string => {
  return text
    .replace(/ọ/g, 'ọ')
    .replace(/ị/g, 'ị')
    .replace(/ụ/g, 'ụ')
    .replace(/ọ/g, 'ọ')
    .replace(/ị/g, 'ị')
    .replace(/ụ/g, 'ụ');
};
