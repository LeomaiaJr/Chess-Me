import {
  OrbitControls,
  Stats,
  useGLTF,
  Sky,
  BakeShadows,
  Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ChessNodes } from './@types/chess';
import Chess from './components/Chess';
import Chessboard from './components/Chessboard';

function App() {
  return <Chess />;
}

export default App;
