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
import { ChessNodes } from '../@types/chess';
import Chessboard from './Chessboard';

const Chess = () => {
  const chessData = useGLTF('/chess/chess.gltf');
  const nodes = chessData.nodes as ChessNodes;

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

        <Chessboard nodes={nodes} />
      </Suspense>
    </Canvas>
  );
};

export default Chess;
