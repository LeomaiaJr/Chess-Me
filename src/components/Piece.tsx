import { Object3D } from 'three';

interface PieceProps {
  node: Object3D;
}

const Piece = ({ node }: PieceProps) => {
  return <primitive object={node} />;
};

export default Piece;
