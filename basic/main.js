import * as THREE from 'three'; //Importing threeJS

// 1. Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// 2. Add the camera
// Cameras can have different properties, goes in this order:
// - Fov (Field of view) - Aspect ratio (That formula makes the aspect ratio the same as the window size) - Near plains - Far plains
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Modify the camera possition (z axis) far or closer
camera.position.z = 5;

// 3. Create and add a cube object
// Creates the object with BoxGeomety, but you can use any other. Like cone, or other shapes
const geometry = new THREE.BoxGeometry();
// Creates the material, in this case MeshLambert. My fav is MeshToonMaterial
// Emissive it's for our object to react to color because by default it's black, so it's good to have that.
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585'});
// Create the cube
// Mesh consist of two things, a geometry and a material so we add those to the mesh.
const cube = new THREE.Mesh(geometry, material);
// Add the cube to the scene
scene.add(cube);

// 4. Add lighting
// Using directional light in this case
// In this case if you want to use a HEX color you have to use 0x(hexNumber)
// Parameters: color - intensity (10 is great)
const light = new THREE.DirectionalLight(0x9CDBA6, 10);
// Position the light
light.position.set(1, 1, 1);
//Add the light to the scene
scene.add(light);

// 5. Set up the render
const renderer = new THREE.WebGLRenderer();
// Set the renderer to the size of the window.
renderer.setSize(window.innerWidth, window.innerHeight);
// Finally add the renderer to the page but it won't be visible yet.
document.body.appendChild(renderer.domElement);

// 6. Animate the scene
// Animating the scene
function animate() {
    // Here we request an animation frame where we'll pass the function (very important line)
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01; //rotate x axis
    cube.rotation.y += 0.01; //rotate y axis 
    // Actually show the cube in the page (finally)
    renderer.render(scene, camera);
}

//call the function
animate();