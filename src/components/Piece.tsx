import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, Mesh, Object3D, Vector3 } from 'three';
import { PieceData } from '../@types/chess';
import { getYOffSet, PIECE_MOV_SPEED } from '../constants/chess';
import { useChess } from '../hooks/useChess';
import { getAvailableMoves, squareToVector } from '../utils/chess';

interface PieceProps {
  node: Object3D;
  piece: PieceData;
}

const Piece = ({ node, piece }: PieceProps) => {
  const { game, selectedPiece, setSelectedPiece } = useChess();

  const { geometry, material } = node.children[0] as Mesh;

  const groupRef = useRef<Group>(null);
  const hasSetInitialPosition = useRef(false);

  const [positionToLerp, setPositionToLerp] = useState(
    squareToVector(piece.square, piece.piece)
  );

  useEffect(() => {
    setPositionToLerp(squareToVector(piece.square, piece.piece));
  }, [piece.square]);

  useFrame(() => {
    if (!hasSetInitialPosition.current) {
      const [x, y, z] = squareToVector(piece.square, piece.piece);

      groupRef.current?.position.set(x, y, z);
      hasSetInitialPosition.current = true;
    } else {
      const [x, y, z] = positionToLerp;

      groupRef?.current?.position.lerp(new Vector3(x, y, z), PIECE_MOV_SPEED);
    }
  });

  useEffect(() => {
    const currPos = squareToVector(piece.square, piece.piece);
    if (selectedPiece?.id === piece.id) {
      setPositionToLerp([currPos[0], getYOffSet(piece), currPos[2]]);
    } else {
      setPositionToLerp(currPos);
    }
  }, [selectedPiece]);

  const pointerUpHandler = () => {
    if (selectedPiece?.id === piece.id) setSelectedPiece(null);
    else if (getAvailableMoves(game, piece.square).length > 0)
      setSelectedPiece(piece);
  };

  return (
    <group {...node} ref={groupRef}>
      <mesh
        geometry={geometry}
        material={material}
        onPointerUp={pointerUpHandler}
        rotation={[0, 0, Math.PI]}
      />
    </group>
  );
};

export default Piece;
