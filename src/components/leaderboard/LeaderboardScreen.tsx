import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getLeaderboard, getCurrentWeekIdFromDB, getUserLeaderboardEntry, LEAGUES, LEAGUE_CONFIG, League } from '../../utils/leaderboardUtils';
import { Trophy, Crown, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const { user, userData } = useAuth();
  const [currentLeague, setCurrentLeague] = useState<League>('Copper');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [weekId, setWeekId] = useState<string>('');
  const [userEntry, setUserEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentWeek();
  }, []);

  useEffect(() => {
    if (weekId) {
      loadLeaderboard();
      loadUserEntry();
    }
  }, [weekId, currentLeague, user]);

  const loadCurrentWeek = async () => {
    try {
      const week = await getCurrentWeekIdFromDB();
      setWeekId(week);
    } catch (error) {
      console.error('Error loading current week:', error);
    }
  };

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard(currentLeague, weekId);
      setLeaderboard(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserEntry = async () => {
    if (!user) return;
    
    try {
      const entry = await getUserLeaderboardEntry(user.uid, weekId);
      setUserEntry(entry);
    } catch (error) {
      console.error('Error loading user entry:', error);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-600';
  };

  const currentLeagueIndex = LEAGUES.indexOf(currentLeague);
  const canGoLeft = currentLeagueIndex > 0;
  const canGoRight = currentLeagueIndex < LEAGUES.length - 1;

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--app-bg)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-6 py-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Back</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">🏆 Leaderboard</h1>
            <p className="text-white/80">Week {weekId}</p>
          </div>

          <div className="w-24"></div> {/* Spacer */}
        </div>

        {/* League Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (canGoLeft) {
                  setCurrentLeague(LEAGUES[currentLeagueIndex - 1]);
                }
              }}
              disabled={!canGoLeft}
              className={`p-3 rounded-xl transition-all ${
                canGoLeft 
                  ? 'bg-white/20 hover:bg-white/30 text-white' 
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">{LEAGUE_CONFIG[currentLeague].icon}</span>
                <h2 className="text-2xl font-bold text-white">{currentLeague} League</h2>
              </div>
              <p className="text-white/80">
                {currentLeague === 'Copper' && 'Starting league - everyone begins here'}
                {currentLeague === 'Bronze' && 'Prove your dedication'}
                {currentLeague === 'Silver' && 'Rising through the ranks'}
                {currentLeague === 'Gold' && 'Elite performance'}
                {currentLeague === 'Platinum' && 'Master level'}
                {currentLeague === 'Diamond' && 'Legendary status'}
                {currentLeague === 'Stars' && 'The ultimate champions'}
              </p>
            </div>

            <button
              onClick={() => {
                if (canGoRight) {
                  setCurrentLeague(LEAGUES[currentLeagueIndex + 1]);
                }
              }}
              disabled={!canGoRight}
              className={`p-3 rounded-xl transition-all ${
                canGoRight 
                  ? 'bg-white/20 hover:bg-white/30 text-white' 
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* User's Current Status */}
        {userEntry && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userData?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{userData?.username || 'User'}</h3>
                  <p className="text-white/80">Your {userEntry.league} League Status</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{userEntry.xp} XP</div>
                <div className="text-white/80">Rank #{userEntry.rank || 'N/A'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {currentLeague} League Rankings
          </h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-white/80">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/80 text-lg">No players in this league yet</p>
              <p className="text-white/60">Be the first to join!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div
                  key={player.userId}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    index < 3 
                      ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{player.username}</span>
                        {player.subscribed && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-white/60 text-sm">
                        {player.subscribed ? 'Premium Player' : 'Free Player'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{player.xp} XP</div>
                    <div className="text-white/60 text-sm">
                      {player.subscribed && `×${player.multiplier} bonus`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* League Info */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">How the League System Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">📈 Weekly Promotion</h4>
              <p className="text-sm">Top 7 players in each league move up to the next tier</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">📉 Weekly Demotion</h4>
              <p className="text-sm">Bottom 10% of players move down to the previous tier</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🔄 Weekly Reset</h4>
              <p className="text-sm">XP resets every week for fair competition</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">👑 Premium Bonus</h4>
              <p className="text-sm">Subscribed players get 1.42x XP multiplier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
