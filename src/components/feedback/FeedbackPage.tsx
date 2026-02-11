import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { BarChart3, TrendingUp, Target, Lightbulb, ChevronLeft, Award, Zap, BookOpen } from 'lucide-react';

interface FeedbackPageProps {
  onBack: () => void;
}

interface UserProgress {
  [languageId: string]: {
    xp: number;
    level: number;
    hearts: number;
    completedLessons: string[];
    mistakeCount: number;
    wordsLearned: number;
    lessonsCompleted: number;
  };
}

interface WeakArea {
  category: string;
  language: string;
  mistakes: number;
  total: number;
  percentage: number;
  improvement: string;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ onBack }) => {
  const { user, userData } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalXP, setTotalXP] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, 'users', user!.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        const progress = data.userProgressMap || {};
        setUserProgress(progress);
        
        // Calculate totals
        let xp = 0;
        let lessons = 0;
        let mistakes = 0;
        
        Object.values(progress).forEach((langProgress: any) => {
          xp += langProgress.xp || 0;
          lessons += langProgress.lessonsCompleted || 0;
          mistakes += langProgress.mistakeCount || 0;
        });
        
        setTotalXP(xp);
        setTotalLessons(lessons);
        setTotalMistakes(mistakes);
        
        // Analyze weak areas
        analyzeWeakAreas(progress);
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeWeakAreas = (progress: UserProgress) => {
    const areas: WeakArea[] = [];
    
    Object.entries(progress).forEach(([languageId, langProgress]) => {
      const languageName = getLanguageName(languageId);
      const totalQuestions = (langProgress.lessonsCompleted || 0) * 10; // Assuming 10 questions per lesson
      const accuracy = totalQuestions > 0 ? ((totalQuestions - (langProgress.mistakeCount || 0)) / totalQuestions) * 100 : 100;
      
      if (accuracy < 80) {
        areas.push({
          category: 'Vocabulary',
          language: languageName,
          mistakes: langProgress.mistakeCount || 0,
          total: totalQuestions,
          percentage: accuracy,
          improvement: getImprovementTip('vocabulary', accuracy)
        });
      }
    });
    
    // Sort by worst performance first
    areas.sort((a, b) => a.percentage - b.percentage);
    setWeakAreas(areas);
  };

  const getLanguageName = (languageId: string): string => {
    const languageNames: { [key: string]: string } = {
      'swahili': 'Swahili',
      'hausa': 'Hausa',
      'yoruba': 'Yoruba',
      'zulu': 'Zulu',
      'igbo': 'Igbo',
      'arabic': 'Arabic',
      'somali': 'Somali',
      'berber': 'Berber',
      'shona': 'Shona',
      'chichewa': 'Chichewa',
      'wolof': 'Wolof',
      'twi': 'Twi',
      'amharic': 'Amharic',
      'moore': 'Moore',
      'lingala': 'Lingala'
    };
    return languageNames[languageId] || languageId;
  };

  const getImprovementTip = (category: string, accuracy: number): string => {
    if (accuracy < 50) {
      return 'Focus on basic vocabulary and practice daily. Try the beginner lessons again.';
    } else if (accuracy < 70) {
      return 'Review common words and phrases. Practice with flashcards and repetition.';
    } else if (accuracy < 80) {
      return 'Good progress! Focus on advanced vocabulary and grammar patterns.';
    } else {
      return 'Excellent work! Keep practicing to maintain your high accuracy.';
    }
  };

  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-yellow-400';
    if (percentage >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '⭐';
    if (percentage >= 70) return '📈';
    return '🎯';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--app-bg)' }}>
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading your feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--app-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-6 py-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Back</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="w-16 h-16 text-white" />
            <h1 className="text-5xl font-bold text-white">Your Learning Analytics</h1>
          </div>
          <p className="text-xl text-white/80">
            Personalized insights to help you improve faster
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Total XP</h3>
            </div>
            <div className="text-4xl font-bold text-white">{totalXP.toLocaleString()}</div>
            <p className="text-white/60">Experience Points Earned</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Lessons</h3>
            </div>
            <div className="text-4xl font-bold text-white">{totalLessons}</div>
            <p className="text-white/60">Lessons Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Target className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">
                {totalLessons > 0 ? Math.round(((totalLessons * 10 - totalMistakes) / (totalLessons * 10)) * 100) : 100}%
              </h3>
            </div>
            <div className="text-2xl font-bold text-white">Accuracy</div>
            <p className="text-white/60">Overall Performance</p>
          </div>
        </div>

        {/* Language Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Language Progress</h2>
          
          {Object.keys(userProgress).length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/80 text-lg">Start learning to see your progress here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(userProgress).map(([languageId, progress]) => {
                const accuracy = progress.lessonsCompleted > 0 
                  ? Math.round(((progress.lessonsCompleted * 10 - progress.mistakeCount) / (progress.lessonsCompleted * 10)) * 100)
                  : 100;
                
                return (
                  <div key={languageId} className="bg-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{getLanguageName(languageId)}</h3>
                      <span className="text-2xl">{getPerformanceIcon(accuracy)}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">XP:</span>
                        <span className="text-white font-bold">{progress.xp}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-white/80">Level:</span>
                        <span className="text-white font-bold">{progress.level}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-white/80">Lessons:</span>
                        <span className="text-white font-bold">{progress.lessonsCompleted}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-white/80">Accuracy:</span>
                        <span className={`font-bold ${getPerformanceColor(accuracy)}`}>
                          {accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Weak Areas Analysis */}
        {weakAreas.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Areas for Improvement</h2>
            
            <div className="space-y-6">
              {weakAreas.map((area, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getPerformanceIcon(area.percentage)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{area.category} - {area.language}</h3>
                        <p className="text-white/60">Accuracy: {area.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{area.mistakes} mistakes</div>
                      <div className="text-white/60 text-sm">out of {area.total} questions</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-semibold">Improvement Tip:</span>
                    </div>
                    <p className="text-white/80">{area.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">Keep Learning!</h3>
              </div>
              <p className="text-white/80 mb-4">
                You're making great progress! Continue with your current learning routine.
              </p>
              <div className="text-green-400 font-semibold">
                💡 Try completing 3-5 lessons per day for optimal progress
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Challenge Yourself</h3>
              </div>
              <p className="text-white/80 mb-4">
                Ready for the next level? Try more advanced lessons and new languages.
              </p>
              <div className="text-yellow-400 font-semibold">
                🎯 Aim for 90%+ accuracy to unlock advanced content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
