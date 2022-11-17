import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, Mesh, Object3D, Vector3 } from 'three';
import { PieceData } from '../@types/chess';
import { getYOffSet, PIECE_MOV_SPEED } from '../constants/chess';
import { squareToVector } from '../utils/chess';

interface PieceProps {
  node: Object3D;
  piece: PieceData;
}

const DeadPiece = ({ node, piece }: PieceProps) => {
  const { geometry, material } = node.children[0] as Mesh;
  const [x, y, z] = squareToVector(piece.square, piece.piece);

  const groupRef = useRef<Group>(null);

  const [positionToLerp, setPositionToLerp] = useState(
    squareToVector(piece.square, piece.piece)
  );

  useFrame(() => {
    const [x, y, z] = positionToLerp;

    groupRef?.current?.position.lerp(new Vector3(x, y, z), PIECE_MOV_SPEED);
  });

  const getCurrPosition = () => groupRef?.current?.position!;

  const deadAnim = async () => {
    const currPos = getCurrPosition();

    setPositionToLerp([currPos.x, getYOffSet(piece) * 2, currPos.z]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  useEffect(() => {
    deadAnim();
  }, []);

  return (
    <group {...node} ref={groupRef} position={[x, y, z]}>
      <mesh
        geometry={geometry}
        material={material}
        rotation={[0, 0, Math.PI]}
      />
    </group>
  );
};

export default DeadPiece;
