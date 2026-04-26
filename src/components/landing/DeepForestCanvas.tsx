import { useEffect } from 'react';

const KEYFRAMES = `
@keyframes deep-forest-para {
  100% {
    background-position:
      -5000px 20%,
      -800px  95%,
       500px  50%,
      1000px 100%,
       400px   0;
  }
}
`;

export interface DeepForestCanvasProps {
  preview?: boolean;
}

export function DeepForestCanvas({ preview = false }: DeepForestCanvasProps) {
  useEffect(() => {
    const id = 'deep-forest-kf';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = KEYFRAMES;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div
      style={{
        position:      preview ? 'absolute' : 'fixed',
        inset:         0,
        zIndex:        preview ? undefined : 0,
        pointerEvents: 'none',
        width:         preview ? '100%' : '100vw',
        height:        preview ? '100%' : '100vh',
        overflow:      'hidden',
        backgroundColor: 'hsl(200,40%,18%)',
        backgroundImage: `
          url('https://78.media.tumblr.com/cae86e76225a25b17332dfc9cf8b1121/tumblr_p7n8kqHMuD1uy4lhuo1_540.png'),
          url('https://78.media.tumblr.com/66445d34fe560351d474af69ef3f2fb0/tumblr_p7n908E1Jb1uy4lhuo1_1280.png'),
          url('https://78.media.tumblr.com/8cd0a12b7d9d5ba2c7d26f42c25de99f/tumblr_p7n8kqHMuD1uy4lhuo2_1280.png'),
          url('https://78.media.tumblr.com/5ecb41b654f4e8878f59445b948ede50/tumblr_p7n8on19cV1uy4lhuo1_1280.png'),
          url('https://78.media.tumblr.com/28bd9a2522fbf8981d680317ccbf4282/tumblr_p7n8kqHMuD1uy4lhuo3_1280.png')
        `,
        backgroundRepeat:   'repeat-x',
        backgroundPosition: '0 20%, 0 100%, 0 50%, 0 100%, 0 0',
        backgroundSize:     '2500px, 800px, 500px 200px, 1000px, 400px 260px',
        animation:          'deep-forest-para 50s infinite linear',
      }}
    />
  );
}
