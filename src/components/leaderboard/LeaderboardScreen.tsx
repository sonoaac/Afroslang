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

  const lbFont = "'Times New Roman', Georgia, serif";
  const lbBg = '#080808';
  const lbSurface = '#111111';
  const lbBorder = 'rgba(255,255,255,0.08)';
  const lbRed = '#b00020';
  const lbRedBright = '#e53935';
  const lbText = '#ffffff';
  const lbMuted = 'rgba(255,255,255,0.6)';
  const lbDim = 'rgba(255,255,255,0.35)';

  const getRankAccent = (rank: number) => {
    if (rank === 1) return '#e53935';
    if (rank === 2) return '#c62828';
    if (rank === 3) return '#b71c1c';
    return lbMuted;
  };

  return (
    <div style={{ minHeight: '100vh', background: lbBg, padding: '1.5rem', fontFamily: lbFont }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: lbSurface, border: `1px solid ${lbBorder}`, color: lbText, padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: lbFont, fontSize: '0.9rem', transition: 'border-color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = lbRed; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = lbBorder; }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
            Back
          </button>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <Trophy style={{ width: 24, height: 24, color: lbRed }} strokeWidth={1.5} />
              <h1 style={{ color: lbText, fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontFamily: lbFont, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                Leaderboard
              </h1>
            </div>
            <p style={{ color: lbMuted, fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0 }}>Week {weekId}</p>
          </div>

          <div style={{ width: 80 }} />
        </div>

        {/* Top bar accent */}
        <div style={{ height: '2px', background: lbRed, marginBottom: '2rem', opacity: 0.7 }} />

        {/* League Selector */}
        <div style={{ background: lbSurface, border: `1px solid ${lbBorder}`, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => { if (canGoLeft) setCurrentLeague(LEAGUES[currentLeagueIndex - 1]); }}
              disabled={!canGoLeft}
              style={{ background: 'transparent', border: `1px solid ${canGoLeft ? lbBorder : 'transparent'}`, color: canGoLeft ? lbText : lbDim, padding: '0.5rem', cursor: canGoLeft ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
              onMouseEnter={(e) => { if (canGoLeft) (e.currentTarget as HTMLButtonElement).style.borderColor = lbRed; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = canGoLeft ? lbBorder : 'transparent'; }}
            >
              <ChevronLeft style={{ width: 20, height: 20 }} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{LEAGUE_CONFIG[currentLeague].icon}</span>
                <h2 style={{ color: lbText, fontSize: '1.3rem', fontFamily: lbFont, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                  {currentLeague} League
                </h2>
              </div>
              <p style={{ color: lbMuted, fontSize: '0.82rem', margin: 0 }}>
                {currentLeague === 'Copper' && 'Starting league — everyone begins here'}
                {currentLeague === 'Bronze' && 'Prove your dedication'}
                {currentLeague === 'Silver' && 'Rising through the ranks'}
                {currentLeague === 'Gold' && 'Elite performance'}
                {currentLeague === 'Platinum' && 'Master level'}
                {currentLeague === 'Diamond' && 'Legendary status'}
                {currentLeague === 'Stars' && 'The ultimate champions'}
              </p>
            </div>

            <button
              onClick={() => { if (canGoRight) setCurrentLeague(LEAGUES[currentLeagueIndex + 1]); }}
              disabled={!canGoRight}
              style={{ background: 'transparent', border: `1px solid ${canGoRight ? lbBorder : 'transparent'}`, color: canGoRight ? lbText : lbDim, padding: '0.5rem', cursor: canGoRight ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
              onMouseEnter={(e) => { if (canGoRight) (e.currentTarget as HTMLButtonElement).style.borderColor = lbRed; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = canGoRight ? lbBorder : 'transparent'; }}
            >
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>

        {/* User status */}
        {userEntry && (
          <div style={{ background: lbSurface, border: `1px solid rgba(176,0,32,0.35)`, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 40, height: 40, background: lbRed, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lbText, fontFamily: lbFont, fontWeight: 'bold', fontSize: '1rem' }}>
                {userData?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h3 style={{ color: lbText, fontFamily: lbFont, fontSize: '1rem', fontWeight: 'bold', margin: 0, marginBottom: '0.2rem' }}>{userData?.username || 'User'}</h3>
                <p style={{ color: lbMuted, fontSize: '0.78rem', margin: 0 }}>Your {userEntry.league} League Status</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: lbText, fontFamily: lbFont, fontSize: '1.1rem', fontWeight: 'bold' }}>{userEntry.xp} XP</div>
              <div style={{ color: lbMuted, fontSize: '0.78rem' }}>Rank #{userEntry.rank || 'N/A'}</div>
            </div>
          </div>
        )}

        {/* Rankings */}
        <div style={{ background: lbSurface, border: `1px solid ${lbBorder}`, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: lbText, fontFamily: lbFont, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '1.25rem', marginTop: 0 }}>
            {currentLeague} League Rankings
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ width: 28, height: 28, border: `2px solid ${lbBorder}`, borderTopColor: lbRed, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
              <p style={{ color: lbMuted, fontFamily: lbFont }}>Loading...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <Trophy style={{ width: 40, height: 40, color: lbDim, margin: '0 auto 1rem' }} strokeWidth={1.5} />
              <p style={{ color: lbMuted, fontFamily: lbFont }}>No players in this league yet</p>
              <p style={{ color: lbDim, fontSize: '0.85rem', fontFamily: lbFont }}>Be the first to join!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {leaderboard.map((player, index) => (
                <div
                  key={player.userId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: index < 3 ? 'rgba(176,0,32,0.08)' : 'rgba(255,255,255,0.02)',
                    border: index < 3 ? `1px solid rgba(176,0,32,0.2)` : `1px solid ${lbBorder}`,
                    borderLeft: index < 3 ? `3px solid ${getRankAccent(player.rank)}` : `3px solid transparent`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 32, textAlign: 'center', color: index < 3 ? getRankAccent(player.rank) : lbMuted, fontFamily: lbFont, fontSize: '0.95rem', fontWeight: 'bold', flexShrink: 0 }}>
                      {player.rank <= 3 ? `#${player.rank}` : `#${player.rank}`}
                    </div>
                    <div style={{ width: 36, height: 36, background: index < 3 ? lbRed : '#1a1a1a', border: `1px solid ${lbBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lbText, fontFamily: lbFont, fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0 }}>
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: lbText, fontFamily: lbFont, fontSize: '0.95rem' }}>{player.username}</span>
                        {player.subscribed && <Crown style={{ width: 13, height: 13, color: lbRed }} strokeWidth={2} />}
                      </div>
                      <div style={{ color: lbDim, fontSize: '0.75rem', fontFamily: lbFont }}>
                        {player.subscribed ? 'Premium' : 'Free'}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: index < 3 ? lbRedBright : lbText, fontFamily: lbFont, fontSize: '1rem', fontWeight: 'bold' }}>{player.xp} XP</div>
                    {player.subscribed && (
                      <div style={{ color: lbDim, fontSize: '0.72rem', fontFamily: lbFont }}>×{player.multiplier} bonus</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* League Info */}
        <div style={{ background: lbSurface, border: `1px solid ${lbBorder}`, padding: '1.5rem' }}>
          <h3 style={{ color: lbText, fontFamily: lbFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', marginTop: 0 }}>
            How the League System Works
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Weekly Promotion', desc: 'Top 7 players in each league move up to the next tier' },
              { title: 'Weekly Demotion', desc: 'Bottom 10% of players move down to the previous tier' },
              { title: 'Weekly Reset', desc: 'XP resets every week for fair competition' },
              { title: 'Premium Bonus', desc: 'Subscribed players get 1.42× XP multiplier' },
            ].map((item) => (
              <div key={item.title} style={{ borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.75rem' }}>
                <h4 style={{ color: lbText, fontFamily: lbFont, fontSize: '0.85rem', marginBottom: '0.3rem', marginTop: 0 }}>{item.title}</h4>
                <p style={{ color: lbMuted, fontSize: '0.78rem', fontFamily: lbFont, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
