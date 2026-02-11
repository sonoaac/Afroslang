import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, CheckCircle, Sparkles, Zap, Heart, BarChart3 } from 'lucide-react';

interface SuccessPageProps {
  onContinue: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onContinue }) => {
  const { refreshUserData } = useAuth();

  useEffect(() => {
    // Refresh user data to get updated subscription status
    refreshUserData();
  }, [refreshUserData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--app-bg)' }}>
      <div className="max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Crown className="w-12 h-12 text-black" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Premium! 🎉
          </h1>
          
          <p className="text-xl text-white/80 mb-12">
            You now have access to all premium features. Let's start learning!
          </p>

          {/* Premium Features Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">Unlimited Hearts</h3>
              </div>
              <p className="text-white/80">Never run out of hearts again!</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">1.42x XP Boost</h3>
              </div>
              <p className="text-white/80">Earn 42% more XP on every lesson!</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Personal Analytics</h3>
              </div>
              <p className="text-white/80">Get detailed feedback on your progress!</p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xl px-12 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              Start Learning Now!
            </div>
          </button>

          {/* Additional Info */}
          <div className="mt-8 text-white/60">
            <p>Your subscription is now active. You can manage it anytime from your profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
