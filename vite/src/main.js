import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js"; //This one is for the controls, comes with three.js

const canvas = document.getElementById('canvas');

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// Adding the camera
//in the two last, how near the object has to be to be visible, the second how far.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Add the object to the space
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshBasicMaterial( {color: '#468585'});
const dodecahedron = new THREE.Mesh(geometry, material); //COULD MAKE MISTAKE FOR THE TOONMATERIAL
//If end up using basic material it doesn't use emisive
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2); // passing the widht, height and depth
const boxMaterial = new THREE.MeshBasicMaterial( {color: '#B4B4B3'});
const box = new THREE.Mesh(boxGeometry, boxMaterial); 
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

//Light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

//Renderer
//Add the canvas to be able to interact with the scene
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
//Set pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);

//Orbit controls
//we import it first, then pass it the camera, and then the dom element from the renderer.
const controls = new OrbitControls(camera, renderer.domElement);
//make the controls smoother
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true; //to zoom in and out
controls.enablePan = true; //to pan the screen

//Adding animationd
function animate() {
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  box.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
};

animate();