import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { logger } from '../../utils/logger';
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
      logger.error('Error loading user progress:', error);
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

  const fbFont = "'Times New Roman', Georgia, serif";
  const fbBg = '#080808';
  const fbSurface = '#111111';
  const fbBorder = 'rgba(255,255,255,0.08)';
  const fbRed = '#b00020';
  const fbText = '#ffffff';
  const fbMuted = 'rgba(255,255,255,0.6)';
  const fbDim = 'rgba(255,255,255,0.35)';

  const getAccuracyColor = (pct: number) => {
    if (pct >= 90) return '#86efac';
    if (pct >= 80) return '#fde68a';
    if (pct >= 70) return '#fdba74';
    return '#fca5a5';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: fbBg, fontFamily: fbFont }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: `2px solid rgba(255,255,255,0.1)`, borderTopColor: fbRed, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '1rem' }}>Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: fbBg, padding: '1.5rem', fontFamily: fbFont }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: fbSurface, border: `1px solid ${fbBorder}`, color: fbMuted, padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: fbFont, fontSize: '0.9rem', transition: 'border-color 0.2s, color 0.2s', marginBottom: '2rem' }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = fbRed; el.style.color = fbText; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = fbBorder; el.style.color = fbMuted; }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
          Back
        </button>

        <div style={{ height: '2px', background: fbRed, marginBottom: '2.5rem', opacity: 0.7 }} />

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <BarChart3 style={{ width: 32, height: 32, color: fbRed }} strokeWidth={1.5} />
            <h1 style={{ color: fbText, fontFamily: fbFont, fontSize: 'clamp(1.3rem, 4vw, 2.5rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Your Learning Analytics
            </h1>
          </div>
          <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '1rem' }}>
            Personalized insights to help you improve faster
          </p>
        </div>

        {/* Overview Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { Icon: Zap, label: 'Total XP', value: totalXP.toLocaleString(), sub: 'Experience Points' },
            { Icon: BookOpen, label: 'Lessons', value: totalLessons, sub: 'Completed' },
            { Icon: Target, label: 'Accuracy', value: `${totalLessons > 0 ? Math.round(((totalLessons * 10 - totalMistakes) / (totalLessons * 10)) * 100) : 100}%`, sub: 'Overall Performance' },
          ].map(({ Icon, label, value, sub }) => (
            <div key={label} style={{ background: fbSurface, border: `1px solid ${fbBorder}`, padding: '1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: fbRed, opacity: 0.6 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Icon style={{ width: 18, height: 18, color: fbRed }} strokeWidth={1.5} />
                <span style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
              </div>
              <div style={{ color: fbText, fontFamily: fbFont, fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{value}</div>
              <p style={{ color: fbDim, fontFamily: fbFont, fontSize: '0.72rem', margin: 0 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Language Progress */}
        <div style={{ background: fbSurface, border: `1px solid ${fbBorder}`, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', marginBottom: '1.25rem', marginTop: 0 }}>
            Language Progress
          </h2>

          {Object.keys(userProgress).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <BookOpen style={{ width: 36, height: 36, color: fbDim, margin: '0 auto 1rem', display: 'block' }} strokeWidth={1.5} />
              <p style={{ color: fbMuted, fontFamily: fbFont }}>Start learning to see your progress here!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {Object.entries(userProgress).map(([languageId, progress]) => {
                const accuracy = progress.lessonsCompleted > 0
                  ? Math.round(((progress.lessonsCompleted * 10 - progress.mistakeCount) / (progress.lessonsCompleted * 10)) * 100)
                  : 100;
                return (
                  <div key={languageId} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${fbBorder}`, borderLeft: `3px solid rgba(176,0,32,0.4)`, padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h3 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{getLanguageName(languageId)}</h3>
                      <span style={{ fontSize: '1rem' }}>{getPerformanceIcon(accuracy)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {[
                        { label: 'XP', val: progress.xp },
                        { label: 'Level', val: progress.level },
                        { label: 'Lessons', val: progress.lessonsCompleted },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.78rem' }}>{label}</span>
                          <span style={{ color: fbText, fontFamily: fbFont, fontSize: '0.78rem', fontWeight: 'bold' }}>{val}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.78rem' }}>Accuracy</span>
                        <span style={{ color: getAccuracyColor(accuracy), fontFamily: fbFont, fontSize: '0.78rem', fontWeight: 'bold' }}>{accuracy}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <div style={{ background: fbSurface, border: `1px solid ${fbBorder}`, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', marginBottom: '1.25rem', marginTop: 0 }}>
              Areas for Improvement
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {weakAreas.map((area, index) => (
                <div key={index} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${fbBorder}`, borderLeft: `3px solid ${fbRed}`, padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{getPerformanceIcon(area.percentage)}</span>
                      <div>
                        <h3 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', fontWeight: 'bold', margin: 0, marginBottom: '0.2rem' }}>{area.category} — {area.language}</h3>
                        <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.75rem', margin: 0 }}>Accuracy: {area.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: fbText, fontFamily: fbFont, fontSize: '0.85rem', fontWeight: 'bold' }}>{area.mistakes} mistakes</div>
                      <div style={{ color: fbDim, fontFamily: fbFont, fontSize: '0.72rem' }}>of {area.total} questions</div>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(176,0,32,0.06)', border: `1px solid rgba(176,0,32,0.2)`, padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <Lightbulb style={{ width: 14, height: 14, color: fbRed }} strokeWidth={2} />
                      <span style={{ color: fbText, fontFamily: fbFont, fontSize: '0.78rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Improvement Tip</span>
                    </div>
                    <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{area.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div style={{ background: fbSurface, border: `1px solid ${fbBorder}`, padding: '1.5rem' }}>
          <h2 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', marginBottom: '1.25rem', marginTop: 0 }}>
            Recommendations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${fbBorder}`, borderLeft: `3px solid rgba(176,0,32,0.4)`, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <TrendingUp style={{ width: 20, height: 20, color: fbRed }} strokeWidth={1.5} />
                <h3 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Keep Learning</h3>
              </div>
              <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                You're making great progress! Continue with your current learning routine.
              </p>
              <div style={{ color: '#86efac', fontFamily: fbFont, fontSize: '0.78rem', letterSpacing: '0.04em' }}>
                Try completing 3–5 lessons per day for optimal progress
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${fbBorder}`, borderLeft: `3px solid rgba(176,0,32,0.4)`, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Award style={{ width: 20, height: 20, color: fbRed }} strokeWidth={1.5} />
                <h3 style={{ color: fbText, fontFamily: fbFont, fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Challenge Yourself</h3>
              </div>
              <p style={{ color: fbMuted, fontFamily: fbFont, fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                Ready for the next level? Try more advanced lessons and new languages.
              </p>
              <div style={{ color: '#fde68a', fontFamily: fbFont, fontSize: '0.78rem', letterSpacing: '0.04em' }}>
                Aim for 90%+ accuracy to unlock advanced content
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
