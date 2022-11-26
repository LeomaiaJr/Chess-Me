import { Float, Text3D } from '@react-three/drei';
import { Mesh } from 'three';
import { useChess } from '../hooks/useChess';

const ChessMeText = () => {
  const { nodes } = useChess();

  const { material: whiteMat } = nodes.pawn_w.children[0] as Mesh;
  const { material: blackMat } = nodes.pawn_b.children[0] as Mesh;

  return (
    <group position={[5, 2, -50]}>
      <Text3D
        scale={4}
        font={'/fonts/roboto.json'}
        bevelEnabled
        bevelSize={0.05}
      >
        Chess Me
        <meshStandardMaterial {...whiteMat} />
      </Text3D>

      <Text3D
        position={[20, -2, 0]}
        font={'/fonts/roboto.json'}
        bevelEnabled
        bevelSize={0.05}
      >
        By Leo
        <meshStandardMaterial {...blackMat} />
      </Text3D>
    </group>
  );
};

export default ChessMeText;
