import {
  BakeShadows,
  Environment,
  OrbitControls,
  Stats,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Chessboard from './Chessboard';

const Chess = () => {
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

        <Chessboard />
      </Suspense>
    </Canvas>
  );
};

export default Chess;
