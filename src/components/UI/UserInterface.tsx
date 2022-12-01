import { Stats } from '@react-three/drei';
import { useConnection } from '../../hooks/useConnection';
import { useInterface } from '../../hooks/useInterface';
import AppDrawer from './Drawer/Drawer';
import PlayerIcon from './PlayerIcon/PlayerIcon';
import Welcome from './Welcome/Welcome';

const UserInterface = () => {
  useConnection();
  const { showStats } = useInterface();

  return (
    <>
      <AppDrawer />

      <PlayerIcon isLeoPlayer />
      <PlayerIcon />

      {showStats && <Stats className="stats" />}

      <Welcome />
    </>
  );
};

export default UserInterface;
