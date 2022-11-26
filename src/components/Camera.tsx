import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useInterface } from '../hooks/useInterface';

const ChessCamera = () => {
  const { camera } = useThree();
  const { setIsCameraMoving } = useInterface();

  const controls = useRef<any>();
  const hasInitialized = useRef(false);

  const isMobile = window.innerWidth < 1000;

  const posX = useRef(null);

  useEffect(() => {
    controls.current.addEventListener('end', () => {
      setIsCameraMoving(false);
    });

    controls.current.addEventListener('start', () => {
      setIsCameraMoving(true);
    });

    controls.current.addEventListener('change', () => {
      if (camera.position.x !== 0) hasInitialized.current = true;
    });

    return () => {
      controls.current.removeEventListener('change', () => {
        if (camera.position.x !== 0) hasInitialized.current = true;
      });

      controls.current.removeEventListener('start', () => {
        setIsCameraMoving(true);
      });

      controls.current.removeEventListener('end', () => {
        setIsCameraMoving(false);
      });
    };
  }, []);

  useFrame(() => {
    if (!hasInitialized.current) {
      const { z } = camera.position;

      let [newY, newZ] = [13, 15];

      if (isMobile) {
        newY = 25;
        newZ = 20;
      }

      if (z > newZ - 0.5) hasInitialized.current = true;

      camera.position.lerp(new Vector3(0, newY, newZ), 0.01);
    }
  });

  return (
    <OrbitControls
      ref={controls}
      target={[0, 0, 0]}
      maxPolarAngle={Math.PI / 2.1}
      maxDistance={80}
      onPointerUp={() => {
        console.log(32);
      }}
    />
  );
};

export default ChessCamera;
