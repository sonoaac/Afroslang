import { useEffect, useRef } from 'react';

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
    vec2 r = u_res;
    float t = u_time;
    vec2 p = (FC * 2.0 - r) / r.y;
    vec3 c = vec3(0.0);
    for (float i = 0.0; i < 42.0; i++) {
      float a = i / 1.5 + t * 0.5;
      vec2 q = p;
      q.x = q.x + sin(q.y * 19.0 + t * 2.0 + i) *
            29.0 * smoothstep(0.0, -2.0, q.y);
      float d = length(q - vec2(cos(a), sin(a)) *
                       (0.4 * smoothstep(0.0, 0.5, -q.y)));
      c = c + vec3(0.34, 0.30, 0.24) * (0.015 / d);
    }
    vec3 col = c * c + 0.05;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function compile(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function GlCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width  = w + 'px';
      canvas!.style.height = h + 'px';
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener('resize', resize);

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

    // Scroll drives time — still when idle, animates as you scroll
    let scrollT = 0;
    let rafId: number;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollT = maxScroll > 0 ? (window.scrollY / maxScroll) * 12 : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    function draw() {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, scrollT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
