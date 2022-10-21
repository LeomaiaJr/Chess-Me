import { ChessNodes } from '../@types/chess';
import { CHESS_PIECES } from '../constants/chess';

import Piece from './Piece';

interface ChessboardProps {
  nodes: ChessNodes;
}

const Chessboard = ({ nodes }: ChessboardProps) => {
  return (
    <group scale={0.008}>
      <primitive object={nodes.board} />
      <primitive object={nodes.board_edge} />

      {CHESS_PIECES.map((piece, index) => (
        <Piece key={piece} node={(nodes as any)[piece]} />
      ))}
    </group>
  );
};

export default Chessboard;
