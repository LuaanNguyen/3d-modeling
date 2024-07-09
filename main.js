import * as THREE from "three";
import "./style.css";

//create a new scene
const scene = new THREE.Scene();

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//create a sphere
const geometry = new THREE.SphereGeometry(3, 128, 64);
const material = new THREE.MeshStandardMaterial({ color: "0xffff" });
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
