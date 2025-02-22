import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

// ---------------------------------------
//       Vertex Shader (simple pass)
// ---------------------------------------
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ---------------------------------------
//  Fragment Shader (with "connections")
// ---------------------------------------
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // -----------------------------
  //   Simple Noise + FBM
  // -----------------------------
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0 - 2.0*f);
    return mix(
      mix( random(i + vec2(0.0, 0.0)), 
           random(i + vec2(1.0, 0.0)), 
           u.x),
      mix( random(i + vec2(0.0, 1.0)), 
           random(i + vec2(1.0, 1.0)), 
           u.x),
      u.y
    );
  }
  float fbm(vec2 st) {
    float value = 0.0;
    float amp   = 0.5;
    for(int i = 0; i < 5; i++){
      value += amp * noise(st);
      st *= 2.0;
      amp *= 0.5;
    }
    return value;
  }

  // ------------------------------------------------
  //    Metaball (exp-based falloff)
  // ------------------------------------------------
  float metaball(vec2 p, vec2 center, float radius) {
    float d = length(p - center);
    // If you want sharper highlights, increase 3.0 => 4.0 or 5.0
    return exp(-3.0 * d / radius);
  }

  // ------------------------------------------------
  //    Distance to a line segment (for connections)
  // ------------------------------------------------
  float lineDistance(vec2 p, vec2 a, vec2 b) {
    vec2 ap = p - a;
    vec2 ab = b - a;
    float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    vec2 closest = a + t * ab;
    return length(p - closest);
  }

  void main() {
    // Convert UV -> [-1..1]
    vec2 p = vUv * 2.0 - 1.0;
    float t = uTime * 0.7; // slightly slowed

    // Accumulate "strength" from multiple wave sources
    float strength = 0.0;

    // Extra-strong swirl so the motion is visible
    float swirl = fbm(p * 4.0 + vec2(t * 0.4, -t * 0.3)) * 2.0 - 1.0;

    // -----------------------------
    // 1) Center Drifting Metaball
    // -----------------------------
    vec2 centerPos = vec2(
      sin(t * 0.5) * 0.25 + 0.25 * swirl,
      cos(t * 0.5) * 0.25 - 0.25 * swirl
    );
    strength += metaball(p, centerPos, 0.45 + 0.1 * abs(swirl));

    // We'll store offset positions for orbiting blobs 
    vec2 offsets[3];

    // -----------------------------
    // 2) Orbiting Lobes
    // -----------------------------
    for (int i = 0; i < 3; i++) {
      float angle = t + float(i) * 2.0944; // ~120 deg offset
      float orbRadius = 0.3 + 0.1 * fbm(vec2(t + float(i)));
      vec2 offset = vec2(cos(angle), sin(angle)) * orbRadius;
      strength += metaball(p, offset, 0.25);
      offsets[i] = offset;
    }

    // Subtle extra swirl
    strength += fbm(p * 3.0 - vec2(t * 0.2, t * 0.2)) * 0.2;

    // --------------------------------
    //  Draw "Connection" Lines
    // --------------------------------
    // Lines from center to each orbiting offset
    float connectionAlpha = 0.0;
    for(int i = 0; i < 3; i++) {
      float distLine = lineDistance(p, centerPos, offsets[i]);
      // If within ~0.03 of the line, we fade in
      float lineGlow = 1.0 - smoothstep(0.015, 0.03, distLine);
      // Accumulate
      connectionAlpha = max(connectionAlpha, lineGlow);
    }

    // Optionally, lines between the orbiting offsets themselves:
    /*
    for(int i=0; i<3; i++){
      for(int j=i+1; j<3; j++){
        float distLine = lineDistance(p, offsets[i], offsets[j]);
        float lineGlow = 1.0 - smoothstep(0.015, 0.03, distLine);
        connectionAlpha = max(connectionAlpha, lineGlow);
      }
    }
    */

    // -----------------------------
    //   Color & Glow
    // -----------------------------
    // Gentle glow
    float glow = exp(-2.0 * strength) * 0.4;

    // Darker base color => more contrast
    vec3 baseColor = vec3(0.02, 0.1, 0.3);
    // Brighter highlight color
    vec3 highlight = vec3(0.2, 0.7, 1.0);

    // Blend colors based on strength + swirl
    float mixFactor = clamp(strength * 0.7 + swirl * 0.3, 0.0, 1.0);
    vec3 color = mix(baseColor, highlight, mixFactor);

    // Add a lighter glow overlay
    color += vec3(0.3, 0.75, 1.0) * glow;

    // Add "connection" lines in a subtle color
    vec3 connectionColor = vec3(0.5, 0.9, 1.0);
    color += connectionColor * connectionAlpha * 0.4;

    // -----------------------------
    //  Soft radial fade + discard
    // -----------------------------
    float dist = length(p);
    float alpha = 1.0 - smoothstep(0.8, 1.0, dist);

    // Discard near-transparent pixels to remove the box
    if (alpha < 0.01) {
      discard;
    }

    gl_FragColor = vec4(color, alpha);
  }
`;

const FluidOrbBlue: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene & Orthographic Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      precision: "highp",
    });
    const size = 150;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    containerRef.current.appendChild(renderer.domElement);

    // Postprocessing: mild bloom
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size, size),
      0.3, // lower bloom strength
      0.4, // radius
      0.2 // threshold
    );
    composer.addPass(bloomPass);

    // Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    // Fullscreen Plane
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 1;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    composerRef.current = composer;
    materialRef.current = material;

    // Animation
    let animationFrameId: number;
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += 0.016;
      }
      composer.render();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.02) 0%, transparent 70%)",
        boxShadow: `
          0 0 30px rgba(29, 78, 216, 0.2),
          inset 0 0 20px rgba(29, 78, 216, 0.2)
        `,
      }}
    />
  );
};

export default FluidOrbBlue;
