import * as THREE from "three";

//create a new scene
const scene = new THREE.Scene();

//create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshBasicMaterial({ color: "#00ff83" });
const mesh = new THREE.Mesh(geometry, material);

//initializing camera
const camera = new THREE.PerspectiveCamera(35, 800 / 600);
camera.position.z = 30;

//
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);

//add to the scene
scene.add(mesh);
scene.add(light);
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
renderer.render(scene, camera);
