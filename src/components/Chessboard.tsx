import { useChess } from '../hooks/useChess';
import { getAllPiecesData } from '../utils/chess';
import Piece from './Piece';

const BOARD_POSITION = [875, 0, -875];

const Chessboard = () => {
  const { nodes, gameData } = useChess();

  return (
    <group scale={0.008} position={[-7, 0, 7]}>
      <primitive object={nodes.board} position={BOARD_POSITION} />
      <primitive object={nodes.board_edge} position={BOARD_POSITION} />

      {getAllPiecesData(gameData).map((piece) => (
        <Piece
          key={piece.id}
          piece={piece}
          node={(nodes as any)[`${piece.piece}_${piece.color}`]}
        />
      ))}
    </group>
  );
};

export default Chessboard;
