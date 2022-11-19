import { Circle } from '@react-three/drei';
import { Move, Square } from 'chess.js';
import { useState } from 'react';
import { useChess } from '../hooks/useChess';
import { getAvailableMoves, squareToVector } from '../utils/chess';

interface HoverableSquareProps {
  move: Move;
}

const HoverableSquare = ({ move }: HoverableSquareProps) => {
  const { movePiece } = useChess();

  const isCapture = move.captured !== undefined;

  const [isHovered, setIsHovered] = useState(false);
  const [x, _, z] = squareToVector(move.to as Square);

  return (
    <group position={[x, 35, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <Circle
        args={[isCapture ? 90 : 50, 50, 1]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onPointerUp={() => movePiece(move)}
      >
        <meshBasicMaterial color="#008080" />
      </Circle>
      {isHovered && (
        <Circle position={[0, 0, -1]} args={[isCapture ? 100 : 60, 50, 1]}>
          <meshBasicMaterial color={'#395B64'} />
        </Circle>
      )}
    </group>
  );
};

const AvailableMoves = () => {
  const { game, selectedPiece } = useChess();

  if (selectedPiece === null) return null;

  return (
    <>
      {getAvailableMoves(game, selectedPiece.square).map((move: any) => (
        <HoverableSquare key={`${move.to}`} move={move as Move} />
      ))}
    </>
  );
};

export default AvailableMoves;
