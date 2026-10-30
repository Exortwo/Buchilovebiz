import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CORE_FLAVORS, flavorBlendAt } from "./flavors";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/* Golden fried crust: bumpy shell with crunchy spots, tiny oil bubbles,
   sesame seeds and darker patches. Drawn procedurally so the placeholder
   needs no external texture — swap for your own buchi photo later. */
function crustTextures(size = 512) {
  const color = document.createElement("canvas");
  const bump = document.createElement("canvas");
  const rough = document.createElement("canvas");
  [color, bump, rough].forEach((canvas) => {
    canvas.width = canvas.height = size;
  });
  const ctx = color.getContext("2d");
  const bctx = bump.getContext("2d");
  const rctx = rough.getContext("2d");

  const base = ctx.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, "#c07927");
  base.addColorStop(0.32, "#e9ac56");
  base.addColorStop(0.62, "#d2903a");
  base.addColorStop(1, "#a35f1c");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  bctx.fillStyle = "#6e6e6e";
  bctx.fillRect(0, 0, size, size);
  rctx.fillStyle = "#b8b8b8";
  rctx.fillRect(0, 0, size, size);

  /* oil pooled in the dips — shinier patches */
  for (let i = 0; i < 16; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = 40 + Math.random() * 90;
    const pool = rctx.createRadialGradient(x, y, 0, x, y, radius);
    pool.addColorStop(0, "rgba(68,68,68,0.9)");
    pool.addColorStop(1, "rgba(68,68,68,0)");
    rctx.fillStyle = pool;
    rctx.beginPath();
    rctx.arc(x, y, radius, 0, Math.PI * 2);
    rctx.fill();
  }

  /* toasted blotches, lighter and darker patches of fry */
  for (let i = 0; i < 320; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = 10 + Math.random() * 44;
    const warm = Math.random() > 0.42;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, warm ? "rgba(255,206,130,0.34)" : "rgba(112,58,16,0.42)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const dent = bctx.createRadialGradient(x, y, 0, x, y, radius);
    dent.addColorStop(0, warm ? "rgba(255,255,255,0.45)" : "rgba(20,20,20,0.6)");
    dent.addColorStop(1, "rgba(128,128,128,0)");
    bctx.fillStyle = dent;
    bctx.beginPath();
    bctx.arc(x, y, radius, 0, Math.PI * 2);
    bctx.fill();
  }

  /* rough crunchy speckles */
  for (let i = 0; i < 900; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = 1.2 + Math.random() * 3.4;
    const dark = Math.random() > 0.5;
    ctx.fillStyle = dark
      ? `rgba(92,48,12,${0.2 + Math.random() * 0.35})`
      : `rgba(255,214,152,${0.2 + Math.random() * 0.35})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    bctx.fillStyle = dark
      ? `rgba(40,40,40,${0.3 + Math.random() * 0.4})`
      : `rgba(235,235,235,${0.3 + Math.random() * 0.4})`;
    bctx.beginPath();
    bctx.arc(x, y, radius, 0, Math.PI * 2);
    bctx.fill();
  }

  /* tiny oil bubbles: dark hollow with a bright fried rim */
  for (let i = 0; i < 200; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = 2.5 + Math.random() * 6;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(96,52,16,0.4)";
    ctx.fill();
    ctx.lineWidth = 1 + Math.random() * 1.4;
    ctx.strokeStyle = "rgba(255,222,166,0.5)";
    ctx.stroke();

    bctx.beginPath();
    bctx.arc(x, y, radius, 0, Math.PI * 2);
    bctx.fillStyle = "rgba(30,30,30,0.7)";
    bctx.fill();
    bctx.lineWidth = 1.2;
    bctx.strokeStyle = "rgba(255,255,255,0.85)";
    bctx.stroke();
  }

  /* sesame seeds, each with a soft shadow so they sit on the crust */
  for (let i = 0; i < 640; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const rx = 3.2 + Math.random() * 2.2;
    const ry = 5.6 + Math.random() * 3.4;
    const angle = Math.random() * Math.PI;

    ctx.save();
    ctx.translate(x + 1.4, y + 1.8);
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(90,44,10,0.4)";
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    const seed = ctx.createLinearGradient(0, -ry, 0, ry);
    seed.addColorStop(0, "#fffdf6");
    seed.addColorStop(0.6, "#f7e6c6");
    seed.addColorStop(1, "#d9b988");
    ctx.fillStyle = seed;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    bctx.save();
    bctx.translate(x, y);
    bctx.rotate(angle);
    bctx.fillStyle = "#f6f6f6";
    bctx.beginPath();
    bctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    bctx.fill();
    bctx.restore();

    rctx.save();
    rctx.translate(x, y);
    rctx.rotate(angle);
    rctx.fillStyle = "rgba(210,210,210,0.8)";
    rctx.beginPath();
    rctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    rctx.fill();
    rctx.restore();
  }

  return { color, bump, rough };
}

/* The cut face: chewy rice dough ring with a dark, crispy fried edge.
   The sweet filling is a separate mesh so its colour can change. */
function fillingCutTexture(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const r = size / 2;

  const dough = ctx.createRadialGradient(r * 0.86, r * 0.8, r * 0.06, r, r, r);
  dough.addColorStop(0, "#fffaf0");
  dough.addColorStop(0.5, "#f6e8cb");
  dough.addColorStop(0.82, "#e8d0a6");
  dough.addColorStop(1, "#c99a5c");
  ctx.fillStyle = dough;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 70; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = r * (0.48 + Math.random() * 0.44);
    const x = r + Math.cos(angle) * distance;
    const y = r + Math.sin(angle) * distance;
    ctx.strokeStyle = `rgba(255,255,255,${0.06 + Math.random() * 0.16})`;
    ctx.lineWidth = 1 + Math.random() * 2.4;
    ctx.beginPath();
    ctx.arc(x, y, 10 + Math.random() * 24, angle, angle + 1.1 + Math.random());
    ctx.stroke();
  }

  /* darker, crispier rim where the shell was fried hardest */
  const rim = ctx.createRadialGradient(r, r, r * 0.84, r, r, r);
  rim.addColorStop(0, "rgba(120,68,24,0)");
  rim.addColorStop(0.55, "rgba(122,68,24,0.88)");
  rim.addColorStop(1, "rgba(86,44,12,1)");
  ctx.fillStyle = rim;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  /* crackled, crunchy edge */
  for (let i = 0; i < 240; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = r * (0.9 + Math.random() * 0.09);
    ctx.save();
    ctx.translate(r + Math.cos(angle) * distance, r + Math.sin(angle) * distance);
    ctx.rotate(angle);
    ctx.fillStyle = Math.random() > 0.45 ? "rgba(255,238,206,0.85)" : "rgba(66,32,8,0.55)";
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.8 + Math.random() * 2.4, 3.4 + Math.random() * 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return canvas;
}

/* Soft gooey filling — drawn white so the material colour tints it. */
function coreTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const r = size / 2;

  const goo = ctx.createRadialGradient(r * 0.7, r * 0.66, r * 0.04, r, r, r);
  goo.addColorStop(0, "#ffffff");
  goo.addColorStop(0.5, "#f7f7f7");
  goo.addColorStop(0.85, "#e4e4e4");
  goo.addColorStop(1, "#c2c2c2");
  ctx.fillStyle = goo;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 14; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = r * (0.2 + Math.random() * 0.55);
    const x = r + Math.cos(angle) * distance;
    const y = r + Math.sin(angle) * distance;
    ctx.strokeStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.22})`;
    ctx.lineWidth = 2 + Math.random() * 5;
    ctx.beginPath();
    ctx.arc(x, y, 12 + Math.random() * 26, angle, angle + 0.9 + Math.random());
    ctx.stroke();
  }

  const edge = ctx.createRadialGradient(r, r, r * 0.88, r, r, r);
  edge.addColorStop(0, "rgba(70,70,70,0)");
  edge.addColorStop(1, "rgba(60,60,60,0.45)");
  ctx.fillStyle = edge;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

function canvasTexture(canvas, { srgb = true } = {}) {
  const map = new THREE.CanvasTexture(canvas);
  if (srgb) map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  return map;
}

export default function Buchi3D({ progressRef }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const small = window.matchMedia("(max-width: 640px)").matches;
    const renderer = new THREE.WebGLRenderer({
      antialias: !small,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const baseZ = 5.9;
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.02, baseZ);

    const key = new THREE.DirectionalLight(0xffdcae, 2.6);
    key.position.set(2.8, 3.2, 4.2);
    const warm = new THREE.DirectionalLight(0xff9a3f, 1.4);
    warm.position.set(-3.6, -1.4, 2.2);
    const back = new THREE.PointLight(0xffb066, 8, 16, 2);
    back.position.set(0, 1.4, -3);
    scene.add(new THREE.HemisphereLight(0xffeccd, 0x2a1508, 1.05), key, warm, back);

    const crust = crustTextures();
    const crustMat = new THREE.MeshPhysicalMaterial({
      map: canvasTexture(crust.color),
      bumpMap: canvasTexture(crust.bump, { srgb: false }),
      bumpScale: 0.09,
      roughnessMap: canvasTexture(crust.rough, { srgb: false }),
      roughness: 0.95,
      metalness: 0.04,
      clearcoat: 0.45,
      clearcoatRoughness: 0.35,
      sheen: 0.25,
      sheenRoughness: 0.7,
      sheenColor: new THREE.Color(0xffd6a0),
    });
    const faceMat = new THREE.MeshStandardMaterial({
      map: canvasTexture(fillingCutTexture()),
      roughness: 0.68,
      metalness: 0,
    });
    const coreMat = new THREE.MeshPhysicalMaterial({
      map: canvasTexture(coreTexture()),
      color: new THREE.Color(CORE_FLAVORS[0].color),
      roughness: 0.4,
      metalness: 0,
      clearcoat: 0.75,
      clearcoatRoughness: 0.22,
      emissive: new THREE.Color(CORE_FLAVORS[0].color),
      emissiveIntensity: 0.18,
    });
    const coreColors = CORE_FLAVORS.map((flavor) => new THREE.Color(flavor.color));

    const segments = small ? [26, 18] : [48, 32];
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    const halves = [-1, 1].map((side) => {
      const group = new THREE.Group();
      const faceRotation = side < 0 ? Math.PI / 2 : -Math.PI / 2;

      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(1, segments[0], segments[1], side < 0 ? -Math.PI / 2 : Math.PI / 2, Math.PI),
        crustMat
      );

      const face = new THREE.Mesh(new THREE.CircleGeometry(0.995, segments[0]), faceMat);
      face.rotation.y = faceRotation;
      face.position.x = side * 0.004;

      const core = new THREE.Mesh(new THREE.CircleGeometry(0.462, segments[0]), coreMat);
      core.rotation.y = faceRotation;
      core.position.x = -side * 0.016;

      const drip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 12), coreMat);
      drip.position.set(-side * 0.03, -0.24, 0);
      drip.visible = false;

      group.add(shell, face, core, drip);
      spin.add(group);
      return { group, side, core, drip };
    });

    const fit = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      const aspect = width / height;
      renderer.setSize(width, height, false);
      camera.aspect = aspect;
      const halfHeight = Math.tan((camera.fov * Math.PI) / 360) * baseZ;
      const wanted = small ? 1.95 : 2.45;
      const available = halfHeight * aspect;
      camera.position.z = available >= wanted ? baseZ : Math.min(baseZ * (wanted / available), 13);
      camera.updateProjectionMatrix();
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(host);

    let onScreen = true;
    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
      },
      { rootMargin: "20% 0px" }
    );
    visibility.observe(host);

    const state = {
      last: performance.now(),
      angle: 0,
      smooth: clamp(progressRef?.current || 0, 0, 1),
      shine: 0,
      elapsed: 0,
      hovering: false,
    };
    const onEnter = () => {
      state.hovering = true;
    };
    const onLeave = () => {
      state.hovering = false;
    };
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);

    let frame = 0;

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      const now = performance.now();
      const delta = Math.min((now - state.last) / 1000, 0.05);
      state.last = now;
      if (!onScreen) return;
      state.elapsed += delta;

      const target = clamp(progressRef?.current ?? 0, 0, 1);
      state.smooth += (target - state.smooth) * Math.min(1, delta * 7);
      const progress = state.smooth;
      const split = smoothstep(0.54, 0.76, progress);

      /* hover: the shell shines a little more, like hot oil catching light */
      state.shine += ((state.hovering ? 1 : 0) - state.shine) * Math.min(1, delta * 5);
      crustMat.clearcoat = 0.45 + state.shine * 0.5;
      coreMat.clearcoat = 0.75 + state.shine * 0.25;
      key.intensity = 2.6 + state.shine * 1.2;
      back.intensity = 8 + state.shine * 5;

      /* the filling melts from mung bean → ube → chocolate → cheese → custard */
      const flavorT = flavorBlendAt(progress);
      const i0 = Math.min(CORE_FLAVORS.length - 1, Math.floor(flavorT));
      const i1 = Math.min(CORE_FLAVORS.length - 1, i0 + 1);
      const blend = flavorT - i0;
      coreMat.color.copy(coreColors[i0]).lerp(coreColors[i1], blend);
      coreMat.emissive.copy(coreMat.color).multiplyScalar(0.35);

      const speed = (0.3 + clamp(progress / 0.5, 0, 1) * 1.8) * (1 - split);
      state.angle += speed * delta;
      const settle = Math.round(state.angle / (Math.PI * 2)) * Math.PI * 2;

      spin.rotation.y = state.angle + (settle - state.angle) * split;
      tilt.rotation.x = 0.16 + progress * 0.16;
      tilt.rotation.z = -0.06 + progress * 0.08;
      spin.scale.setScalar((small ? 0.82 : 1) * (1 - 0.05 * split));

      const gap = 0.002 + split * 0.98;
      const goo = smoothstep(0.18, 0.5, split);

      halves.forEach(({ group, side, core, drip }) => {
        group.position.x = side * gap;
        group.position.y = split * 0.03;
        group.rotation.y = side * 1.02 * split;
        group.rotation.z = side * -0.1 * split;

        /* soft breathing core + a gooey drip that stretches as the halves part */
        const pulse = 0.5 + 0.5 * Math.sin(state.elapsed * 1.9 + (side > 0 ? 1.7 : 0));
        core.scale.setScalar(1 + 0.02 * pulse * goo);
        drip.visible = goo > 0.02;
        const wide = (0.85 + 0.15 * pulse) * goo;
        drip.scale.set(wide, (0.55 + 1.1 * pulse) * goo, wide);
        drip.position.y = -0.2 - 0.12 * pulse;
      });

      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      halves.forEach(({ group }) => {
        group.children.forEach((child) => child.geometry.dispose());
      });
      crustMat.map?.dispose();
      crustMat.bumpMap?.dispose();
      crustMat.roughnessMap?.dispose();
      faceMat.map?.dispose();
      coreMat.map?.dispose();
      crustMat.dispose();
      faceMat.dispose();
      coreMat.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [progressRef]);

  return <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />;
}