import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

function makeMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.78, ...options });
}

function makeTree(x, z, scale = 1) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035 * scale, 0.055 * scale, 0.32 * scale, 7), makeMaterial("#8b5a2b"));
  const crown = new THREE.Mesh(new THREE.ConeGeometry(0.19 * scale, 0.46 * scale, 8), makeMaterial("#258b4e"));
  trunk.position.y = 0.16 * scale;
  crown.position.y = 0.5 * scale;
  tree.add(trunk, crown);
  tree.position.set(x, 0.08, z);
  tree.userData.baseScale = scale;
  return tree;
}

function makePlastic(index) {
  const colors = ["#60a5fa", "#fbbf24", "#f472b6", "#a78bfa", "#fb923c"];
  const plastic = new THREE.Group();
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.065, 0.2, 8), makeMaterial(colors[index % colors.length]));
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 8), makeMaterial("#f8fafc"));
  bottle.rotation.z = index % 2 ? 1.2 : -0.85;
  cap.position.y = 0.11;
  cap.rotation.z = bottle.rotation.z;
  plastic.add(bottle, cap);
  const positions = [[-0.76, 0.58], [-0.38, 0.88], [0.08, 0.76], [0.53, 0.6], [0.75, 0.92]];
  plastic.position.set(positions[index][0], 0.12, positions[index][1]);
  plastic.userData.index = index;
  return plastic;
}

function makeCloud(x, y, z, scale) {
  const cloud = new THREE.Group();
  const material = makeMaterial("#ffffff", { transparent: true, opacity: 0.9 });
  [-0.14, 0, 0.15].forEach((offset, index) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry((0.12 + index * 0.02) * scale, 10, 10), material);
    puff.position.set(offset * scale, index === 1 ? 0.035 * scale : 0, 0);
    cloud.add(puff);
  });
  cloud.position.set(x, y, z);
  return cloud;
}

function makeRecoveryBeacon() {
  const beacon = new THREE.Group();
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.045, 0.48, 7), makeMaterial("#176b43"));
  stem.position.y = 0.33;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.022, 8, 18), makeMaterial("#f6c84b"));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.57;
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), makeMaterial("#f8d96b", { emissive: "#d2a432", emissiveIntensity: 0.25 }));
  core.position.y = 0.57;
  beacon.add(stem, ring, core);
  beacon.position.set(0.42, 0.12, -0.18);
  return beacon;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => material?.dispose());
  });
}

function getStage(verifiedItems, goalItems) {
  const progress = goalItems ? verifiedItems / goalItems : 0;
  if (progress >= 1) return { label: "Flourishing", progress: 1 };
  if (progress >= 0.65) return { label: "Growing", progress };
  if (progress >= 0.35) return { label: "Recovering", progress };
  return { label: "Starting", progress };
}

export default function PlasticRecoveryWorld({ verifiedItems = 0, goalItems = 20, stage }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [zoom, setZoom] = useState(4.65);
  const [pan, setPan] = useState(0);
  const recovery = getStage(verifiedItems, goalItems);
  const worldStage = stage || recovery.label;

  const adjustZoom = (amount) => {
    const current = sceneRef.current;
    if (!current) return;
    const nextZoom = clamp(current.targetZoom + amount, 3.55, 6.1);
    current.targetZoom = nextZoom;
    current.userAdjustedZoom = true;
    setZoom(nextZoom);
  };

  const adjustPan = (amount) => {
    const current = sceneRef.current;
    if (!current) return;
    const nextPan = clamp(current.targetPan + amount, -0.55, 0.55);
    current.targetPan = nextPan;
    setPan(nextPan);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webglAvailable) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setWebglAvailable(false);
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f6fbf5");
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    const initialZoom = mount.clientWidth < 380 ? 5.45 : mount.clientWidth < 440 ? 5.15 : 4.85;
    camera.position.set(0, initialZoom * 0.409, initialZoom);
    camera.lookAt(0, 0.22, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight("#fffdf5", "#5b8f55", 2.1));
    const sun = new THREE.DirectionalLight("#fff3c4", 2.4);
    sun.position.set(3, 5, 3);
    scene.add(sun);

    const world = new THREE.Group();
    const worldBaseY = 0.56;
    world.position.y = worldBaseY;
    scene.add(world);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.22, 0.36, 36), makeMaterial("#4a5b3b"));
    soil.position.y = -0.14;
    world.add(soil);
    const ground = new THREE.Mesh(new THREE.CylinderGeometry(1.46, 1.46, 0.12, 36), makeMaterial("#83c96b"));
    ground.position.y = 0.05;
    world.add(ground);
    const waterMaterial = makeMaterial("#73c8cf", { roughness: 0.28, metalness: 0.1 });
    const river = new THREE.Mesh(new THREE.CircleGeometry(0.52, 32), waterMaterial);
    river.rotation.x = -Math.PI / 2;
    river.position.set(-0.34, 0.12, 0.06);
    river.scale.set(1.55, 0.66, 1);
    world.add(river);

    const trees = [[-1.0, -0.3, 0.85], [0.8, -0.5, 0.9], [0.88, 0.23, 0.75], [-0.1, -0.9, 0.7], [0.22, 0.8, 0.8], [-0.94, 0.22, 0.72]].map(([x, z, scale]) => makeTree(x, z, scale));
    trees.forEach((tree) => world.add(tree));

    const plants = new THREE.Group();
    const plantMaterial = makeMaterial("#b5d955");
    for (let index = 0; index < 11; index += 1) {
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.035, 7, 7), plantMaterial);
      const angle = index * 2.17;
      flower.position.set(Math.cos(angle) * 1.08, 0.13, Math.sin(angle) * 0.74);
      plants.add(flower);
    }
    world.add(plants);
    const beacon = makeRecoveryBeacon();
    world.add(beacon);

    const plastic = Array.from({ length: 5 }, (_, index) => makePlastic(index));
    plastic.forEach((item) => world.add(item));
    const cloudA = makeCloud(-1.08, 1.65, -0.65, 0.95);
    const cloudB = makeCloud(1.02, 1.37, -0.5, 0.74);
    scene.add(cloudA, cloudB);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interaction = { dragging: false, lastX: 0, targetRotation: 0 };
    const onPointerDown = (event) => {
      interaction.dragging = true;
      interaction.lastX = event.clientX;
      renderer.domElement.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (!interaction.dragging) return;
      interaction.targetRotation += (event.clientX - interaction.lastX) * 0.012;
      interaction.lastX = event.clientX;
    };
    const onPointerUp = () => { interaction.dragging = false; };
    const onWheel = (event) => {
      event.preventDefault();
      adjustZoom(event.deltaY * 0.003);
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    sceneRef.current = { camera, world, trees, plants, plastic, beacon, waterMaterial, targetZoom: initialZoom, targetPan: 0, userAdjustedZoom: false, renderedItems: verifiedItems, recovery: recovery.progress };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      const current = sceneRef.current;
      if (current && !current.userAdjustedZoom) {
        const fittedZoom = width < 380 ? 5.45 : width < 440 ? 5.15 : 4.85;
        current.targetZoom = fittedZoom;
        setZoom(fittedZoom);
      }
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const animate = (time) => {
      const current = sceneRef.current;
      if (current) {
        world.rotation.y += (interaction.targetRotation - world.rotation.y) * 0.08;
        if (!reducedMotion && !interaction.dragging) interaction.targetRotation += 0.0016;
        camera.position.z += (current.targetZoom - camera.position.z) * 0.12;
        camera.position.y = camera.position.z * 0.409;
        camera.lookAt(current.targetPan, 0.22, 0);
        if (!reducedMotion) {
          world.position.y = worldBaseY + Math.sin(time * 0.0011) * 0.045;
          cloudA.position.x = -1.08 + Math.sin(time * 0.00045) * 0.07;
          cloudB.position.x = 1.02 + Math.cos(time * 0.0004) * 0.05;
        }
        current.trees.forEach((tree) => {
          const nextScale = tree.userData.targetScale ?? 1;
          tree.scale.x += (nextScale - tree.scale.x) * 0.08;
          tree.scale.y += (nextScale - tree.scale.y) * 0.08;
          tree.scale.z += (nextScale - tree.scale.z) * 0.08;
        });
        current.plastic.forEach((item) => {
          const nextScale = item.userData.targetScale ?? 1;
          item.scale.x += (nextScale - item.scale.x) * 0.09;
          item.scale.y += (nextScale - item.scale.y) * 0.09;
          item.scale.z += (nextScale - item.scale.z) * 0.09;
          if (nextScale < 0.03 && item.scale.x < 0.035) item.visible = false;
        });
        renderer.render(scene, camera);
      }
      frameId = window.requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
      sceneRef.current = null;
    };
  }, [webglAvailable]);

  useEffect(() => {
    const current = sceneRef.current;
    if (!current) return;
    const progress = clamp(verifiedItems / goalItems, 0, 1);
    const targetVisiblePlastic = Math.round((1 - progress) * current.plastic.length);
    const hasNewVerifiedItem = verifiedItems > current.renderedItems;
    current.plastic.forEach((item, index) => {
      const shouldShow = index < targetVisiblePlastic;
      if (shouldShow) item.visible = true;
      item.userData.targetScale = shouldShow ? 1 : 0.01;
      if (!hasNewVerifiedItem) {
        item.visible = shouldShow;
        item.scale.setScalar(shouldShow ? 1 : 0.01);
      }
    });
    current.trees.forEach((tree, index) => {
      const showTree = index < 2 + Math.round(progress * 4);
      tree.visible = showTree;
      tree.userData.targetScale = showTree ? 1 : 0.01;
      if (!hasNewVerifiedItem) tree.scale.setScalar(showTree ? 1 : 0.01);
    });
        current.plants.scale.setScalar(0.35 + progress * 0.65);
    current.beacon.scale.setScalar(0.55 + progress * 0.45);
    current.waterMaterial.color.set(progress >= 0.65 ? "#53c8d4" : progress >= 0.35 ? "#6bb7c2" : "#84a8ad");
    current.renderedItems = verifiedItems;
    current.recovery = progress;
  }, [verifiedItems, goalItems]);

  if (!webglAvailable) {
    return <div className="flex h-[300px] items-end rounded-lg bg-[linear-gradient(145deg,#d8f5df_0%,#a7d6aa_52%,#5c9a74_100%)] p-4"><p className="rounded-lg bg-white/85 px-3 py-2 text-sm font-bold text-eco-950">{verifiedItems} of {goalItems} verified plastic items - {worldStage} stage</p></div>;
  }

  return (
    <div className="relative">
      <div ref={mountRef} className="h-[300px] w-full touch-pan-y overflow-hidden rounded-lg" aria-label={`Interactive motivational visualization: ${verifiedItems} of ${goalItems} verified plastic items, ${worldStage} stage. Drag to rotate. Use zoom controls to adjust the view.`} role="img" />
      <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between" role="group" aria-label="Move recovery world left or right">
        <button type="button" aria-label="Move recovery world left" title="Move left" onClick={() => adjustPan(0.18)} disabled={pan >= 0.55} className="grid size-10 place-items-center rounded-lg border border-eco-200 bg-white/95 text-eco-800 shadow-soft transition hover:bg-eco-50 disabled:cursor-not-allowed disabled:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><ChevronLeft className="size-5" /></button>
        <button type="button" aria-label="Move recovery world right" title="Move right" onClick={() => adjustPan(-0.18)} disabled={pan <= -0.55} className="grid size-10 place-items-center rounded-lg border border-eco-200 bg-white/95 text-eco-800 shadow-soft transition hover:bg-eco-50 disabled:cursor-not-allowed disabled:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><ChevronRight className="size-5" /></button>
      </div>
      <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-lg border border-eco-200 bg-white/95 shadow-soft" role="group" aria-label="Adjust recovery world zoom">
        <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => adjustZoom(0.45)} disabled={zoom >= 6.1} className="grid size-10 place-items-center border-r border-eco-100 text-eco-800 transition hover:bg-eco-50 disabled:cursor-not-allowed disabled:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><ZoomOut className="size-4" /></button>
        <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => adjustZoom(-0.45)} disabled={zoom <= 3.55} className="grid size-10 place-items-center text-eco-800 transition hover:bg-eco-50 disabled:cursor-not-allowed disabled:text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><ZoomIn className="size-4" /></button>
      </div>
      <p className="sr-only">A motivational visualization only. It does not represent an exact measurement of real-world environmental impact.</p>
    </div>
  );
}
