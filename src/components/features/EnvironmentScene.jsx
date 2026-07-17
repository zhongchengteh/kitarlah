import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeTree(x, z, scale = 1) {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035 * scale, 0.05 * scale, 0.3 * scale, 8),
    new THREE.MeshStandardMaterial({ color: "#8b5a2b", roughness: 0.85 })
  );
  trunk.position.y = 0.16 * scale;

  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(0.18 * scale, 0.45 * scale, 9),
    new THREE.MeshStandardMaterial({ color: "#22c55e", roughness: 0.7 })
  );
  crown.position.y = 0.52 * scale;

  tree.add(trunk, crown);
  tree.position.set(x, 0, z);
  return tree;
}

function makeCloud(x, y, z, scale = 1) {
  const cloud = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.9 });
  [-0.16, 0, 0.17].forEach((offset, index) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry((0.13 + index * 0.02) * scale, 12, 12), material);
    puff.position.set(offset * scale, index === 1 ? 0.04 * scale : 0, 0);
    cloud.add(puff);
  });
  cloud.position.set(x, y, z);
  return cloud;
}

export default function EnvironmentScene({ health = 65 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e9f8ef");

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.1, 4.3);
    camera.lookAt(0, 0.55, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight("#ffffff", "#86efac", 2.4);
    const sun = new THREE.DirectionalLight("#fff7d6", 2.3);
    sun.position.set(3, 5, 4);
    scene.add(ambient, sun);

    const world = new THREE.Group();
    scene.add(world);

    const groundHealth = THREE.MathUtils.clamp(health / 100, 0.25, 1);
    const ground = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color().lerpColors(new THREE.Color("#9ca3af"), new THREE.Color("#15803d"), groundHealth),
        roughness: 0.82,
      })
    );
    ground.scale.y = 0.28;
    world.add(ground);

    const water = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 48),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color().lerpColors(new THREE.Color("#94a3b8"), new THREE.Color("#38bdf8"), groundHealth),
        roughness: 0.35,
        metalness: 0.05,
      })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(-0.42, 0.055, 0.18);
    world.add(water);

    const treeCount = Math.max(4, Math.round(5 + health / 8));
    for (let index = 0; index < treeCount; index += 1) {
      const angle = (index / treeCount) * Math.PI * 2;
      const radius = 0.72 + (index % 3) * 0.16;
      world.add(makeTree(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.75 + (index % 4) * 0.14));
    }

    const flowerMaterial = new THREE.MeshStandardMaterial({ color: "#facc15", roughness: 0.6 });
    const flowerCount = Math.round(health / 9);
    for (let index = 0; index < flowerCount; index += 1) {
      const angle = index * 1.9;
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), flowerMaterial);
      flower.position.set(Math.cos(angle) * 0.95, 0.1, Math.sin(angle) * 0.64);
      world.add(flower);
    }

    const cloudA = makeCloud(-1.05, 1.65, -0.55, 0.95);
    const cloudB = makeCloud(1.02, 1.42, -0.35, 0.72);
    scene.add(cloudA, cloudB);

    const trashMaterial = new THREE.MeshStandardMaterial({
      color: "#64748b",
      roughness: 0.8,
      transparent: true,
      opacity: THREE.MathUtils.clamp(1 - health / 100, 0.08, 0.55),
    });
    for (let index = 0; index < 5; index += 1) {
      const trash = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.055, 0.08), trashMaterial);
      trash.position.set(-0.8 + index * 0.32, 0.08, 0.82 - (index % 2) * 0.22);
      trash.rotation.y = index * 0.7;
      world.add(trash);
    }

    let frameId = 0;
    const animate = () => {
      world.rotation.y += 0.004;
      cloudA.position.x = -1.05 + Math.sin(Date.now() * 0.0007) * 0.05;
      cloudB.position.x = 1.02 + Math.cos(Date.now() * 0.0006) * 0.04;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width;
      const nextHeight = entry.contentRect.height;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });
    resizeObserver.observe(mount);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [health]);

  return <div ref={mountRef} className="h-64 w-full overflow-hidden rounded-lg bg-eco-50" aria-label="3D flourishing environment visualization" />;
}
