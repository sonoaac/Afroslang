import './DescrambleText.css';

// ── Types ──────────────────────────────────────────────────────────────────
export interface DescrambleChar {
  from: string; // scramble char shown in phase 1
  to: string;   // final char revealed in phase 2
}

interface DescrambleTextProps {
  chars: DescrambleChar[];
  className?: string;
  style?: React.CSSProperties;
  /** Duration of each char's drop-in (ms). Default 900 */
  p1Duration?: number;
  /** Stagger between chars in phase 1 (ms). Default 55 */
  p1Stagger?: number;
  /** Pause between phase 1 end and phase 2 start (ms). Default 280 */
  p2Delay?: number;
  /** Duration of each char's swap (ms). Default 800 */
  p2Duration?: number;
  /** Stagger between chars in phase 2 (ms). Default 85 */
  p2Stagger?: number;
}

const EASE = 'cubic-bezier(0.87, 0, 0.13, 1)'; // expo.inOut equivalent

// ── Component ──────────────────────────────────────────────────────────────
export function DescrambleText({
  chars,
  className = '',
  style,
  p1Duration = 900,
  p1Stagger  = 55,
  p2Delay    = 280,
  p2Duration = 800,
  p2Stagger  = 85,
}: DescrambleTextProps) {
  const n = chars.length;
  // Phase 2 starts after the last char of phase 1 has fully landed
  const phase2Start = (n - 1) * p1Stagger + p1Duration + p2Delay;

  return (
    <span
      className={`dsc-word ${className}`.trim()}
      style={style}
      // Readable text for screen readers — the visible scrambled chars are aria-hidden
      aria-label={chars.map(c => c.to).join('')}
    >
      {chars.map((char, i) => {
        const changing  = char.from !== char.to;
        const p1Delay   = i * p1Stagger;
        const p2DelayMs = phase2Start + i * p2Stagger;

        // Phase 1: all chars drop in
        // Phase 2: changing chars drop out (::before reveals the final char)
        const anim = changing
          ? `dscIn ${p1Duration}ms ${EASE} ${p1Delay}ms both, dscOut ${p2Duration}ms ${EASE} ${p2DelayMs}ms both`
          : `dscIn ${p1Duration}ms ${EASE} ${p1Delay}ms both`;

        return (
          <span
            key={i}
            className="dsc-char"
            // data-to drives the ::before content (the revealed final char)
            data-to={changing ? char.to : ''}
            style={{ animation: anim }}
            aria-hidden="true"
          >
            {char.from}
          </span>
        );
      })}
    </span>
  );
}

// ── Helper ─────────────────────────────────────────────────────────────────
// Auto-generate scramble chars for any word.
// Picks visually distinct uppercase chars so the scramble looks clearly "wrong".
const POOL = 'NKXBHWQZMVPRSTJFGDUYCA';

export function scrambleWord(word: string): DescrambleChar[] {
  let idx = 5; // deterministic start — same scramble every load
  return word.split('').map(ch => {
    let s = POOL[idx % POOL.length];
    // avoid picking the same char as the target (case-insensitive)
    if (s.toLowerCase() === ch.toLowerCase()) {
      idx++;
      s = POOL[idx % POOL.length];
    }
    idx += 3;
    return { from: s, to: ch };
  });
}
