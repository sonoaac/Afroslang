import { useEffect, useRef } from 'react';

// Savanna-tuned WebGL shader — same structure as GlCanvas but shifted to
// warm amber/terracotta. Ribbons become dusty ochre, sky base is dark burnt amber.
const VERT = `
  attribute vec2 pos;
  void main() {
    gl_Position = vec4(pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform vec2 u_res;
  uniform float u_time;

  void main() {
    vec2 FC = gl_FragCoord.xy;
    vec2 r  = u_res;
    float t = u_time;
    vec2 p  = (FC * 2.0 - r) / r.y;
    vec3 c  = vec3(0.0);

    for (float i = 0.0; i < 42.0; i++) {
      float a = i / 1.5 + t * 0.5;
      vec2 q  = p;
      q.x = q.x + sin(q.y * 19.0 + t * 2.0 + i) *
            29.0 * smoothstep(0.0, -2.0, q.y);
      float d = length(q - vec2(cos(a), sin(a)) *
                       (0.4 * smoothstep(0.0, 0.5, -q.y)));
      // Warm amber/terracotta dust ribbons (vs. cold golden-gray in GlCanvas)
      c = c + vec3(0.72, 0.32, 0.06) * (0.015 / d);
    }

    // Dark burnt-amber base sky instead of near-black
    vec3 col = c * c + vec3(0.11, 0.048, 0.010);
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Acacia silhouette SVG — flat-top African acacia trees + ground plane
const ACACIA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax meet">
  <!-- Ground plane -->
  <rect x="0" y="295" width="1440" height="25" fill="#0a0400"/>

  <!-- Far-distance acacia (small, right) -->
  <rect x="1180" y="240" width="5" height="55" fill="#0a0400"/>
  <ellipse cx="1182" cy="232" rx="30" ry="10" fill="#0a0400"/>
  <ellipse cx="1155" cy="236" rx="18" ry="7" fill="#0a0400"/>
  <ellipse cx="1210" cy="235" rx="20" ry="7" fill="#0a0400"/>

  <!-- Mid-distance giraffe silhouette (left-center) -->
  <rect x="390" y="195" width="9" height="100" fill="#0a0400"/>
  <rect x="392" y="140" width="6" height="60" fill="#0a0400"/>
  <ellipse cx="395" cy="136" rx="8" ry="10" fill="#0a0400"/>
  <rect x="382" y="260" width="6" height="35" fill="#0a0400"/>
  <rect x="395" y="260" width="6" height="35" fill="#0a0400"/>

  <!-- Large left acacia -->
  <rect x="118" y="170" width="10" height="125" fill="#0a0400"/>
  <ellipse cx="123" cy="155" rx="68" ry="20" fill="#0a0400"/>
  <ellipse cx="80"  cy="162" rx="40" ry="14" fill="#0a0400"/>
  <ellipse cx="166" cy="160" rx="44" ry="15" fill="#0a0400"/>
  <ellipse cx="123" cy="148" rx="52" ry="12" fill="#0a0400"/>

  <!-- Medium acacia center-left -->
  <rect x="520" y="210" width="8" height="85" fill="#0a0400"/>
  <ellipse cx="524" cy="198" rx="50" ry="16" fill="#0a0400"/>
  <ellipse cx="488" cy="204" rx="30" ry="11" fill="#0a0400"/>
  <ellipse cx="560" cy="203" rx="33" ry="12" fill="#0a0400"/>
  <ellipse cx="524" cy="193" rx="38" ry="10" fill="#0a0400"/>

  <!-- Tall skinny acacia center-right -->
  <rect x="870" y="185" width="7" height="110" fill="#0a0400"/>
  <ellipse cx="873" cy="172" rx="56" ry="17" fill="#0a0400"/>
  <ellipse cx="832" cy="179" rx="34" ry="12" fill="#0a0400"/>
  <ellipse cx="914" cy="177" rx="36" ry="13" fill="#0a0400"/>
  <ellipse cx="873" cy="165" rx="44" ry="11" fill="#0a0400"/>

  <!-- Small shrub far left -->
  <rect x="32" y="268" width="5" height="27" fill="#0a0400"/>
  <ellipse cx="34" cy="262" rx="22" ry="9" fill="#0a0400"/>

  <!-- Small shrub right -->
  <rect x="1340" y="272" width="5" height="23" fill="#0a0400"/>
  <ellipse cx="1342" cy="266" rx="20" ry="8" fill="#0a0400"/>

  <!-- Large right acacia -->
  <rect x="1260" y="192" width="9" height="103" fill="#0a0400"/>
  <ellipse cx="1264" cy="178" rx="62" ry="19" fill="#0a0400"/>
  <ellipse cx="1220" cy="185" rx="38" ry="13" fill="#0a0400"/>
  <ellipse cx="1306" cy="184" rx="40" ry="14" fill="#0a0400"/>
  <ellipse cx="1264" cy="172" rx="48" ry="12" fill="#0a0400"/>
</svg>
`;

function compile(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

interface SavannaCanvasProps {
  /** When true, renders as a contained block (for shop previews). Default: fixed fullscreen. */
  preview?: boolean;
}

export function SavannaCanvas({ preview = false }: SavannaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const dpr = preview ? 1 : (window.devicePixelRatio || 1);

    function resize() {
      if (preview) {
        const rect = canvas!.parentElement?.getBoundingClientRect();
        const w = rect?.width  || 400;
        const h = rect?.height || 300;
        canvas!.width  = w * dpr;
        canvas!.height = h * dpr;
        canvas!.style.width  = w + 'px';
        canvas!.style.height = h + 'px';
      } else {
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas!.width  = w * dpr;
        canvas!.height = h * dpr;
        canvas!.style.width  = w + 'px';
        canvas!.style.height = h + 'px';
      }
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    if (!preview) window.addEventListener('resize', resize);

    const vs = compile(gl, VERT, gl.VERTEX_SHADER);
    const fs = compile(gl, FRAG, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, 'pos');
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    let scrollT = 0;
    let rafId: number;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollT = maxScroll > 0 ? (window.scrollY / maxScroll) * 12 : 0;
    };
    if (!preview) window.addEventListener('scroll', onScroll, { passive: true });

    // Preview mode: gently animate time so the canvas isn't static
    let previewT = 0;

    function draw() {
      const t = preview ? (previewT += 0.008) : scrollT;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, t);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      if (!preview) {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [preview]);

  const fixedStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    display: 'block',
    zIndex: 0,
    pointerEvents: 'none',
  };

  const previewStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
  };

  return (
    <div style={{ position: preview ? 'relative' : 'fixed', inset: 0, zIndex: preview ? undefined : 0, pointerEvents: 'none', width: preview ? '100%' : '100vw', height: preview ? '100%' : '100vh' }}>
      {/* WebGL canvas */}
      <canvas ref={canvasRef} style={preview ? previewStyle : fixedStyle} />

      {/* Acacia silhouette overlay — sits above canvas, below all content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: preview ? '55%' : '45vh',
          zIndex: preview ? 1 : 1,
          pointerEvents: 'none',
        }}
        dangerouslySetInnerHTML={{ __html: ACACIA_SVG }}
      />
    </div>
  );
}
