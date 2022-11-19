import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { Color } from '../@types/chess';
import { STAND_POS } from '../constants/chess';
import { useChess } from '../hooks/useChess';
import { getOppositeColor } from '../utils/chess';

interface PieceStandProps {
  color: Color;
}

const PieceStand = ({ color }: PieceStandProps) => {
  const { nodes, gameData } = useChess();

  const { material } = nodes[color === 'w' ? 'pawn_w' : 'pawn_b']
    .children[0] as Mesh;
  const x = STAND_POS[color].x;

  const groupRef = useRef<Group>(null);

  const animate = useMemo(() => {
    return (
      gameData.deadPieces.filter(
        (piece) => piece.color === getOppositeColor(color)
      ).length > 0
    );
  }, [gameData]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(new Vector3(10, 400, 10), 0.01);
      groupRef.current.position.lerp(new Vector3(x, 78, -875), 0.01);
    }
  });

  if (!animate) return null;

  return (
    <group>
      <Box
        ref={groupRef}
        args={[35, 1, 130]}
        scale={[10, 1, 10]}
        position={[x, -130, -875]}
      >
        <meshStandardMaterial {...material} />
      </Box>
    </group>
  );
};

export default PieceStand;
