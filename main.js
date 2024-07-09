import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//create a new scene
const scene = new THREE.Scene();

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//create a sphere
const geometry = new THREE.SphereGeometry(3, 128, 64);
const material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
const mesh = new THREE.Mesh(geometry, material);

//initializing camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;

const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);

//helper
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
// scene.add(pointLightHelper);

//add to the scene
scene.add(mesh);
scene.add(light);
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
renderer.setPixelRatio(4);

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
