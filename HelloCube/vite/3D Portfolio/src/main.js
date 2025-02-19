import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Obtener el canvas correctamente
const canvas = document.getElementById("canvas");

// Verificar si el canvas existe
if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("El elemento con ID 'canvas' no es un canvas o no existe.");
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Object - Dodecaedro
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshStandardMaterial({ color: "#468585", emissive: "#468585", emissiveIntensity: 1 });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Object - Caja
const boxGeometry = new THREE.BoxGeometry();
const materialBox = new THREE.MeshStandardMaterial({ color: "#B4B4B3", emissive: "#B4B4B3", emissiveIntensity: 1 });

const meshBox = new THREE.Mesh(boxGeometry, materialBox);
meshBox.position.y = -1.5;
scene.add(meshBox);

// Light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas || undefined });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//Responsive
window.addEventListener("resize", () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Loop de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
