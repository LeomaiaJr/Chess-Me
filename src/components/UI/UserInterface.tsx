import { Stats } from '@react-three/drei';
import { useInterface } from '../../hooks/useInterface';
import AppDrawer from './Drawer/Drawer';

const UserInterface = () => {
  const { showStats } = useInterface();

  return (
    <>
      <AppDrawer />

      {showStats && <Stats className="stats" />}
    </>
  );
};

export default UserInterface;
