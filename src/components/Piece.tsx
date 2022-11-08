import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, Mesh, Object3D, Vector3 } from 'three';
import { PieceData } from '../@types/chess';
import { useChess } from '../hooks/useChess';
import { squareToVector } from '../utils/chess';

interface PieceProps {
  node: Object3D;
  piece: PieceData;
}

const Piece = ({ node, piece }: PieceProps) => {
  const { selectedPiece, setSelectedPiece } = useChess();

  const { geometry, material } = node.children[0] as Mesh;

  const groupRef = useRef<Group>(null);
  const hasSetInitialPosition = useRef(false);

  const [positionToLerp, setPositionToLerp] = useState(
    squareToVector(piece.square, piece.piece)
  );

  useFrame(() => {
    if (!hasSetInitialPosition.current) {
      const [x, y, z] = squareToVector(piece.square, piece.piece);

      groupRef.current?.position.set(x, y, z);
      hasSetInitialPosition.current = true;
    } else {
      const [x, y, z] = positionToLerp;

      groupRef?.current?.position.lerp(new Vector3(x, y, z), 0.1);
    }
  });

  useEffect(() => {
    const currPos = squareToVector(piece.square, piece.piece);
    if (selectedPiece?.id === piece.id) {
      const yOffSet =
        piece.piece === 'queen' && piece.color === 'b' ? 400 : 210;
      setPositionToLerp([currPos[0], yOffSet, currPos[2]]);
    } else {
      setPositionToLerp(currPos);
    }
  }, [selectedPiece]);

  const pointerUpHandler = () => {
    if (selectedPiece?.id === piece.id) setSelectedPiece(null);
    else setSelectedPiece(piece);
  };

  return (
    <group {...node} ref={groupRef}>
      <mesh
        geometry={geometry}
        material={material}
        onPointerUp={pointerUpHandler}
      ></mesh>
    </group>
  );
};

export default Piece;
