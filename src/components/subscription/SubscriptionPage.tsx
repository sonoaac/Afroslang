import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getStripe, SUBSCRIPTION_PLANS, PREMIUM_FEATURES } from '../../utils/stripeConfig';
import { activateDemoSubscription } from '../../utils/demoSubscription';
import { Crown, Check, Star, Zap, Heart, BarChart3, Trophy, ChevronLeft } from 'lucide-react';

interface SubscriptionPageProps {
  onBack: () => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
  const { user, userData, isGuest } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    if (isGuest || !user) {
      alert('Please create an account or sign in to subscribe to Afroslang Premium. This ensures your subscription is properly linked to your account.');
      return;
    }

    if (!userData?.username) {
      alert('Please complete your profile by setting a username before subscribing. This helps us personalize your experience.');
      return;
    }

    setLoading(planType);

    try {
      const plan = SUBSCRIPTION_PLANS[planType];
      
      console.log('Plan selected:', plan);
      console.log('Payment link:', plan.paymentLink);
      
      // Check if payment link exists
      if (!plan.paymentLink) {
        throw new Error('Payment link not configured for this plan');
      }
      
      // Redirect to Stripe payment link with user info
      const paymentUrl = `${plan.paymentLink}?client_reference_id=${user.uid}&prefilled_email=${user.email}&prefilled_name=${userData.username}`;
      
      console.log('Full payment URL:', paymentUrl);
      console.log('User info:', { uid: user.uid, email: user.email, username: userData.username });
      
      // Open Stripe payment in new tab
      window.open(paymentUrl, '_blank');
      
      // Show success message
      alert(`Redirecting to Stripe payment for ${plan.name} with 7-day free trial! Your subscription will be linked to ${userData.username} (${user.email}).`);
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setLoading(null);
    }
  };

  const isSubscribed = userData?.subscription?.active;

  // Show message for guest users
  if (isGuest) {
    return (
      <div className="min-h-screen p-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-4xl mx-auto">
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

          {/* Guest Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-12 h-12 text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">Create Account to Subscribe</h1>
            </div>
            
            <p className="text-white/80 text-xl mb-8">
              To subscribe to Afroslang Premium, please create an account first. This ensures your subscription is properly linked and you can access all premium features.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  // This would trigger sign up modal
                  alert('Please use the profile menu to sign up for an account first.');
                }}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <Crown className="w-5 h-5" />
                Create Account to Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen p-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-4xl mx-auto">
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

          {/* Premium Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-12 h-12 text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">Premium Active!</h1>
            </div>
            
            <p className="text-white/80 text-xl mb-8">
              You're enjoying all premium features
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREMIUM_FEATURES.map((feature, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
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
            <Crown className="w-16 h-16 text-yellow-400" />
            <h1 className="text-6xl font-bold text-white">Afroslang Premium</h1>
          </div>
          <p className="text-2xl text-white/80 mb-8">
            Unlock unlimited learning potential with premium features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {PREMIUM_FEATURES.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">{feature.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Monthly Plan */}
            <div className={`bg-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all ${
              selectedPlan === 'monthly' ? 'ring-2 ring-white/50' : ''
            }`}>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Monthly</h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$5.99</div>
                <div className="text-white/60 mb-2 text-sm sm:text-base">per month</div>
                <div className="bg-green-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full mb-4 font-semibold">
                  7-day FREE trial
                </div>
                
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                    selectedPlan === 'monthly'
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {selectedPlan === 'monthly' ? 'Selected' : 'Select Monthly'}
                </button>
              </div>
            </div>

            {/* Yearly Plan */}
            <div className={`bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all relative ${
              selectedPlan === 'yearly' ? 'ring-2 ring-yellow-400/50' : ''
            }`}>
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                  BEST VALUE
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Yearly</h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$39.99</div>
                <div className="text-white/60 mb-2 text-sm sm:text-base">per year</div>
                <div className="bg-green-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full mb-2 font-semibold">
                  7-day FREE trial
                </div>
                <div className="text-green-400 font-bold mb-4 sm:mb-6 text-sm sm:text-base">Save $32.89/year!</div>
                
                <button
                  onClick={() => setSelectedPlan('yearly')}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                    selectedPlan === 'yearly'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-yellow-400/20 text-white hover:bg-yellow-400/30'
                  }`}
                >
                  {selectedPlan === 'yearly' ? 'Selected' : 'Select Yearly'}
                </button>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={loading !== null}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="animate-spin w-5 h-5 sm:w-6 sm:h-6 border-2 border-black/30 border-t-black rounded-full"></div>
                  <span className="text-sm sm:text-base">Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base">Subscribe to Premium</span>
                </div>
              )}
            </button>
            
            <p className="text-white/60 text-xs sm:text-sm mt-3 sm:mt-4">
              Cancel anytime. Secure payment powered by Stripe.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white mb-2">What happens to my progress?</h4>
              <p className="text-white/80 text-sm">All your learning progress is saved and will continue to be available.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-white/80 text-sm">Yes! You can cancel your subscription at any time from your account settings.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-white/80 text-sm">We accept all major credit cards, debit cards, and digital wallets through Stripe.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-2">Is there a free trial?</h4>
              <p className="text-white/80 text-sm">New users get 3 free hearts to try the app. Premium features require a subscription.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
