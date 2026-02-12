import { useAuth } from '../../contexts/AuthContext';
import { Gem, Heart, Zap } from 'lucide-react';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { InterfaceLanguage } from '../../types';

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData } = useAuth();
  const isEnglish = interfaceLanguage === 'en';
  
  // Get currency values (with defaults)
  const gems = userData?.gems || 500;
  const sandbits = userData?.sandbits || 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isEnglish ? 'Back' : 'Retour'}
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {isEnglish ? 'Shop' : 'Boutique'}
          </h1>
        </div>

        {/* Currency Display */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 sm:p-6 mb-8 border-2 border-amber-200">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0">
            {/* Gems */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <Gem className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  {isEnglish ? 'Gems' : 'Gemmes'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {gems}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 bg-amber-300"></div>

            {/* Sandbits */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <SandbitsIcon size={32} className="text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  {isEnglish ? 'Sandbits' : 'Sablebits'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {sandbits}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Example Shop Items */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 transition-all hover:shadow-lg">
            <div className="text-center">
              <div className="mb-4">
                <Heart className="w-12 h-12 text-red-500 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? 'Extra Hearts' : 'Cœurs Supplémentaires'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish ? 'Get 5 extra hearts' : 'Obtenez 5 cœurs supplémentaires'}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Gem className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900">100</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-amber-500 transition-all hover:shadow-lg">
            <div className="text-center">
              <div className="mb-4">
                <SandbitsIcon size={48} className="mx-auto text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? 'Sandbits Pack' : 'Pack de Sablebits'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish ? 'Get 500 Sandbits' : 'Obtenez 500 Sablebits'}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Gem className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-gray-900">250</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-green-500 transition-all hover:shadow-lg">
            <div className="text-center">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? 'XP Boost' : 'Boost XP'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish ? '2x XP for 1 hour' : '2x XP pendant 1 heure'}
              </p>
              <div className="flex items-center justify-center gap-2">
                <SandbitsIcon size={24} className="text-amber-700" />
                <span className="text-2xl font-bold text-gray-900">150</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'About Currencies' : 'À Propos des Devises'}
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <Gem className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <p>
                <strong className="font-semibold">{isEnglish ? 'Gems' : 'Gemmes'}:</strong>{' '}
                {isEnglish 
                  ? 'Earn gems by completing lessons and achieving daily goals. Use gems to purchase hearts and special items.'
                  : 'Gagnez des gemmes en complétant des leçons et en atteignant des objectifs quotidiens. Utilisez des gemmes pour acheter des cœurs et des objets spéciaux.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <SandbitsIcon size={20} className="text-amber-700 mt-1 flex-shrink-0" />
              <p>
                <strong className="font-semibold">{isEnglish ? 'Sandbits' : 'Sablebits'}:</strong>{' '}
                {isEnglish 
                  ? 'Premium currency earned through special quests and achievements. Use Sandbits for exclusive items and bonuses.'
                  : 'Devise premium gagnée grâce à des quêtes spéciales et des réalisations. Utilisez les Sablebits pour des objets exclusifs et des bonus.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
