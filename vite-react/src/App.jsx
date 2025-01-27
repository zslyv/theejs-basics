/* eslint-disable react/no-unknown-property */
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Sparkles} from "@react-three/drei";
import {useRef} from "react"

// 2. Create the self closing component
// This component needs something to be returned, in this case a mesh with a reference so the program knows what's interacting with
const RotatingCube = () => {
  const meshRef = useRef(); //We grab the hook of "useRef" from react 
  // We use "useRef" to beable to use useFrame() from react-three/fiber
  useFrame(() => {
    // If can acces to the object being rendered
    if(meshRef.current) {
      // Do the animation
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    // Make the returning ref equal to the meshRef
    <mesh ref={meshRef}>
      {/* To render the shape it's easier, inside the mesh just tell it what the shape is, in this case cylinderGeometry indicating the size in "args*/}
      <cylinderGeometry args={[1, 1, 2]} /> {/* In this case one side, other side and how big it is. Or simply x, y and z axis xD*/}
      {/* Then indicate the mesh with the color and the emissive color. */}
      <meshLambertMaterial color="#458585" emissive="#458585" />

      {/* Adding sparkles, also needs to be imported */}
      {/* Sparkles amount - scale - size - speed - noise - color */}
      <Sparkles count={100} scale={2} size={6} speed={0.002} noise={0.2} color="orange"/>
    </mesh>
  )

}

// 1. Declare a functional component
const App = () => {
  return (
    // Inside here goes the page content.
    // Canvas comes from THREE.js too so import it too. Canvas turns things inside into a 3D rendering context.
    <Canvas style={{ height:'100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* In here you don't have to put true, it's enough like this. Also just called the orbit controls wich was 4 lines in pure JS now it's 1 line*/}
      <OrbitControls enableZoom enablePan enableRotate/>

      {/* No necessity to put a comma between the properties too. Also if multiple walues use an array like in position. */}
      <directionalLight position={[1, 1, 1]} intensity={10} color={0x9CDBA6} />

      {/* Attatch is used to indicate it's for the background */}
      <color attach="background" args={['#F0F0F0']}/>

      {/* Call a component (It's created above this functinal component) */}
      <RotatingCube />
    </Canvas>
  )
}

// Exports the functional component to the page.
export default App;