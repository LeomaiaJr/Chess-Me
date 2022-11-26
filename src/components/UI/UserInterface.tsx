import { Stats } from '@react-three/drei';
import { useInterface } from '../../hooks/useInterface';
import AppDrawer from './Drawer/Drawer';
import PlayerIcon from './PlayerIcon/PlayerIcon';

const UserInterface = () => {
  const { showStats } = useInterface();

  return (
    <>
      <AppDrawer />

      <PlayerIcon isLeoPlayer />
      <PlayerIcon />

      {showStats && <Stats className="stats" />}
    </>
  );
};

export default UserInterface;
