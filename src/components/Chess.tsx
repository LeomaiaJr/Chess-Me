import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { EnvironmentPresets } from '../@types/interface';
import { useInterface } from '../hooks/useInterface';
import ChessCamera from './Camera';
import Chessboard from './Chessboard';
import ChessMeText from './ChessMeText';

const Chess = () => {
  const { environmentPreset } = useInterface();

  const preset =
    environmentPreset === EnvironmentPresets.LEOS_CUSTOM
      ? undefined
      : environmentPreset;

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          position: [0, 18, 0],
        }}
      >
        <Suspense fallback={null}>
          <Environment
            preset={preset}
            ground={{
              scale: 150,
            }}
            path={`cube/`}
            files={[`px.png`, `nx.png`, `py.png`, `ny.png`, `pz.png`, `nz.png`]}
          />

          <ChessCamera />

          <directionalLight
            position={[0, 1, 0]}
            intensity={0.5}
            color="white"
          />

          <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.5} />
          </mesh>

          <ChessMeText />

          <Chessboard />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Chess;
