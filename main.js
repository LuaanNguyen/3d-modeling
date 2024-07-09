import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
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
const material = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.2,
});
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

//timeline
const tl = gsap.timeline({ default: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

let mouseDown = false;
let RGB = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    RGB = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.width) * 255),
      150,
    ];
  }
  //animate
  let newColor = new THREE.Color(`rgb(${RGB.join(",")})`);
  gsap.to(mesh.material.color, {
    r: newColor.r,
    g: newColor.g,
    b: newColor.b,
  });
});
