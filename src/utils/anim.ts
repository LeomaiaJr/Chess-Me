import { Vector3 } from 'three';
import { PieceData } from '../@types/chess';
import { STAND_POS } from '../constants/chess';
import { getOppositeColor } from './chess';

type Pos = [number, number, number];
type DeadAnimPos = [Pos, Pos, Pos, Pos];

export const getPieceDeadAnimPos = (
  piece: PieceData,
  currPos: Vector3,
  deadPiecesCount: number
): DeadAnimPos => {
  const positions = [];

  const opColor = getOppositeColor(piece.color);

  const isFirstRow = deadPiecesCount < 9;

  const { x: standX, y: standY, z: standZ } = STAND_POS[opColor];
  const newX =
    standX + (isFirstRow ? -90 : 90) * (piece.color === 'w' ? -1 : 1);
  const newY = 210 * 3 + (piece.piece === 'queen' ? 190 : 0);
  const newZ =
    standZ + (isFirstRow ? deadPiecesCount - 1 : deadPiecesCount - 9) * 160;

  // 1st pos, move piece up
  positions.push([currPos.x, newY, currPos.z]);

  // 2nd pos, move piece to the side, in the right row (1, 2)
  positions.push([newX, newY, currPos.z]);

  // 3rd pos, move piece in the right position in the row (1-8)
  positions.push([newX, newY, newZ]);

  // 4th pos, move piece down to the stand
  positions.push([newX, piece.piece === 'queen' ? standY + 190 : standY, newZ]);

  return positions as DeadAnimPos;
};
