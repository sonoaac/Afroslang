import { InterfaceLanguage } from '../../types';
import { Trophy, Star, Flame, Award, Sparkles, Zap, Home } from 'lucide-react';

interface LessonCompleteProps {
  interfaceLanguage: InterfaceLanguage;
  xpEarned: number;
  onContinue: () => void;
  onBackToLanguageSelect: () => void;
}

export function LessonComplete({ interfaceLanguage, xpEarned, onContinue, onBackToLanguageSelect }: LessonCompleteProps) {
  const isEnglish = interfaceLanguage === 'en';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden" style={{ background: 'var(--app-bg)' }}>
      {/* Animated Celebration Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {['🎉', '⭐', '🌟', '✨', '🎊', '💫', '🏆', '🔥', '💎'][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      {/* Rotating background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF1493] rounded-full opacity-30 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00FF94] rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFD700] rounded-full opacity-20 blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Home Button - Top Right */}
        <div className="flex justify-end mb-6 animate-fadeIn">
          <button
            onClick={onBackToLanguageSelect}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-[#9D4EDD] to-[#FFB6D9] game-border retro-shadow flex items-center justify-center hover:scale-110 hover:retro-shadow-lg transition-all group"
            aria-label="Back to language selection"
          >
            <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={3} />
          </button>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 retro-shadow-lg game-border text-center space-y-8 sm:space-y-10 animate-fadeIn">
          {/* Trophy Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-br from-[#FFD700] via-[#FF6B35] to-[#FF1493] rounded-full flex items-center justify-center retro-shadow-lg game-border animate-bounce">
                <Trophy className="w-14 h-14 sm:w-20 sm:h-20 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-[#00FF94] to-[#7FFF00] rounded-full flex items-center justify-center retro-shadow game-border animate-pulse">
                <Star className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white" />
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#9D4EDD] to-[#FF69B4] rounded-full flex items-center justify-center retro-shadow game-border animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl text-transparent bg-gradient-to-r from-[#FF1493] via-[#9D4EDD] to-[#00FF94] bg-clip-text uppercase tracking-wider animate-pulse">
              {isEnglish ? '🎊 VICTORY! 🎊' : '🎊 VICTOIRE! 🎊'}
            </h1>
            <h2 className="text-2xl sm:text-4xl text-[#1A1A1A]">
              {isEnglish ? 'Lesson Complete!' : 'Leçon Terminée!'}
            </h2>
            <p className="text-base sm:text-2xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
              {isEnglish 
                ? 'You absolutely CRUSHED it! Keep that momentum going! 🚀'
                : 'Vous avez TOUT DÉCHIRÉ! Gardez cet élan! 🚀'}
            </p>
          </div>

          {/* XP Display - Big and Bold */}
          <div className="relative">
            <div className="bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FFD700] rounded-3xl p-6 sm:p-10 game-border retro-shadow-lg animate-neonGlow">
              <div className="flex items-center justify-center gap-6 mb-4">
                <Zap className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-pulse" />
                <p className="text-lg sm:text-3xl text-white uppercase tracking-wider">
                  {isEnglish ? 'XP EARNED' : 'XP GAGNÉ'}
                </p>
                <Zap className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="relative">
                <p className="text-5xl sm:text-8xl text-white drop-shadow-lg">
                  +{xpEarned}
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-white/20 blur-xl rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-[#FF1493] to-[#FF69B4] rounded-2xl p-6 game-border retro-shadow transform hover:scale-105 transition-all">
              <div className="flex flex-col items-center gap-3 text-white">
                <Flame className="w-12 h-12" />
                <p className="text-base sm:text-xl uppercase tracking-wider">{isEnglish ? 'ON FIRE!' : 'EN FEU!'}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#9D4EDD] to-[#FFB6D9] rounded-2xl p-6 game-border retro-shadow transform hover:scale-105 transition-all">
              <div className="flex flex-col items-center gap-3 text-white">
                <Star className="w-12 h-12 fill-white" />
                <p className="text-base sm:text-xl uppercase tracking-wider">{isEnglish ? 'SUPERSTAR!' : 'SUPERSTAR!'}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00FF94] to-[#7FFF00] rounded-2xl p-6 game-border retro-shadow transform hover:scale-105 transition-all">
              <div className="flex flex-col items-center gap-3 text-white">
                <Award className="w-12 h-12" />
                <p className="text-base sm:text-xl uppercase tracking-wider">{isEnglish ? 'CHAMPION!' : 'CHAMPION!'}</p>
              </div>
            </div>
          </div>

          {/* Continue Button - BIG */}
          <button
            onClick={onContinue}
            className="w-full py-5 sm:py-8 rounded-3xl bg-gradient-to-r from-[#00FF94] via-[#7FFF00] to-[#00FF94] text-white game-border retro-shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-2xl sm:text-4xl uppercase tracking-wider animate-pulse hover:animate-none"
          >
            {isEnglish ? '🚀 CONTINUE →' : '🚀 CONTINUER →'}
          </button>

          {/* Fun Motivational Message */}
          <div className="pt-4">
            <p className="text-base sm:text-2xl text-[#4A4A4A] animate-bounce">
              {isEnglish ? '⚡ You\'re unstoppable! ⚡' : '⚡ Vous êtes imbattable! ⚡'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
