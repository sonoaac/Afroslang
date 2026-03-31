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
  /** Offset before this word's phase 1 begins (ms). Use to sequence words. Default 0 */
  startDelay?: number;
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
  startDelay = 0,
  p1Duration = 900,
  p1Stagger  = 55,
  p2Delay    = 280,
  p2Duration = 800,
  p2Stagger  = 85,
}: DescrambleTextProps) {
  const n = chars.length;
  // Phase 2 starts after the last char of phase 1 has fully landed
  const phase2Start = startDelay + (n - 1) * p1Stagger + p1Duration + p2Delay;

  return (
    <span
      className={`dsc-word ${className}`.trim()}
      style={style}
      aria-label={chars.map(c => c.to).join('')}
    >
      {chars.map((char, i) => {
        const changing  = char.from !== char.to;
        const p1DelayMs = startDelay + i * p1Stagger;
        const p2DelayMs = phase2Start + i * p2Stagger;

        const anim = changing
          ? `dscIn ${p1Duration}ms ${EASE} ${p1DelayMs}ms both, dscOut ${p2Duration}ms ${EASE} ${p2DelayMs}ms both`
          : `dscIn ${p1Duration}ms ${EASE} ${p1DelayMs}ms both`;

        return (
          <span
            key={i}
            className="dsc-char"
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

// ── Timing helper ─────────────────────────────────────────────────────────
// Returns the ms when phase 2 of a word begins — use as startDelay for the next word.
// Mirrors the GSAP "<" (start-of-previous) timing so words overlap like the original demo.
export function getPhase2Start(
  charCount: number,
  startDelay  = 0,
  p1Duration  = 900,
  p1Stagger   = 55,
  p2Delay     = 280,
): number {
  return startDelay + (charCount - 1) * p1Stagger + p1Duration + p2Delay;
}

// ── Helper ─────────────────────────────────────────────────────────────────
const POOL = 'NKXBHWQZMVPRSTJFGDUYCA';

export function scrambleWord(word: string): DescrambleChar[] {
  let idx = 5;
  return word.split('').map(ch => {
    let s = POOL[idx % POOL.length];
    if (s.toLowerCase() === ch.toLowerCase()) {
      idx++;
      s = POOL[idx % POOL.length];
    }
    idx += 3;
    return { from: s, to: ch };
  });
}
