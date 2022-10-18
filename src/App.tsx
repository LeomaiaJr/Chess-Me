import {
  OrbitControls,
  Stats,
  useGLTF,
  Sky,
  BakeShadows,
  Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function App() {
  const { nodes, scene } = useGLTF('/chess/chess.gltf');

  return (
    <Canvas
      shadows
      style={{
        background: 'grey',
      }}
    >
      <Suspense fallback={null}>
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
          ground={{ height: 1, radius: 1, scale: 0.1 }}
        />
        <Stats />
        <OrbitControls />
        <BakeShadows />

        <primitive
          object={scene}
          position={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
        />
      </Suspense>
    </Canvas>
  );
}

export default App;
