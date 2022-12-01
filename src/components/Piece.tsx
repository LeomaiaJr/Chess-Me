import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, Mesh, Object3D, Vector3 } from 'three';
import { getYOffSet, PIECE_MOV_SPEED } from '../constants/chess';
import { useChess } from '../hooks/useChess';
import { getPieceDeadAnimPos } from '../utils/anim';
import {
  getAvailableMoves,
  InGamePieceData,
  squareToVector,
} from '../utils/chess';

interface PieceProps {
  node: Object3D;
  piece: InGamePieceData;
}

const Piece = ({ node, piece }: PieceProps) => {
  const { game, selectedPiece, setSelectedPiece, gameData } = useChess();

  const { geometry, material } = node.children[0] as Mesh;

  const groupRef = useRef<Group>(null);
  const hasSetInitialPosition = useRef(false);

  const [positionToLerp, setPositionToLerp] = useState(
    squareToVector(piece.square, piece.piece)
  );

  useEffect(() => {
    if (piece.isAlive)
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
    if (piece.isAlive) {
      const currPos = squareToVector(piece.square, piece.piece);
      if (selectedPiece?.id === piece.id) {
        setPositionToLerp([currPos[0], getYOffSet(piece), currPos[2]]);
      } else {
        setPositionToLerp(currPos);
      }
    }
  }, [selectedPiece]);

  const pointerUpHandler = () => {
    if (piece.isAlive) {
      if (selectedPiece?.id === piece.id) setSelectedPiece(null);
      else if (getAvailableMoves(game, piece.square).length > 0)
        setSelectedPiece(piece);
    }
  };

  const isOnStand = useRef(false);

  const deadAnim = async () => {
    const currPos = groupRef?.current?.position!;

    const deadPieces = gameData.deadPieces.filter(
      (deadPiece) => deadPiece.color === piece.color
    );

    const pieceIndex = deadPieces.findIndex(
      (deadPiece) => deadPiece.id === piece.id
    );

    const animsPos = getPieceDeadAnimPos(piece, currPos, pieceIndex);

    for (const pos of animsPos) {
      setPositionToLerp(pos);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    isOnStand.current = true;
  };

  useEffect(() => {
    if (!piece.isAlive && !isOnStand.current) deadAnim();
  }, [piece.isAlive]);

  const shouldFloat = piece.isAlive && selectedPiece?.id === piece.id;

  return (
    <Float
      speed={shouldFloat ? 5 : 0}
      rotationIntensity={shouldFloat ? 0.2 : 0}
      floatIntensity={shouldFloat ? 0.2 : 0}
    >
      <group {...(node as any)} ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={geometry}
          material={material}
          onPointerUp={pointerUpHandler}
          rotation={[0, 0, Math.PI]}
        />
      </group>
    </Float>
  );
};

export default Piece;
