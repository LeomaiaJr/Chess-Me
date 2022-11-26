import { AvatarBadge, PlayerIconWrapper } from './styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useInterface } from '../../../hooks/useInterface';
import { useChess } from '../../../hooks/useChess';

interface PlayerIconProps {
  isLeoPlayer?: boolean;
}

const PlayerIcon = ({ isLeoPlayer = false }: PlayerIconProps) => {
  const { game } = useChess();
  const { isCameraMoving, showPlayerIcons } = useInterface();

  const avatarSize = window.innerWidth < 1000 ? 60 : 100;

  const getStyles = () => {
    const leftSpacing = window.innerWidth < 1000 ? '32px' : '64px';

    if (!isLeoPlayer) {
      return {
        bottom: window.innerWidth < 1000 ? '32px' : '96px',
        right: leftSpacing,
      };
    }

    return {
      top: '96px',
      left: leftSpacing,
    };
  };

  const getFade = () => {
    if (window.innerWidth > 1000) return showPlayerIcons;
    return !isCameraMoving && showPlayerIcons;
  };

  const isPlayerTurn = () => {
    const turn = game.turn();

    if (isLeoPlayer) return turn === 'w';

    return turn === 'b';
  };

  return (
    <Fade in={getFade()} timeout={1000}>
      <PlayerIconWrapper
        sx={{
          ...getStyles(),
        }}
      >
        <Box component="div" display="flex" alignItems="center" gap={2}>
          <AvatarBadge
            active={isPlayerTurn() ? 'true' : 'false'}
            badgeContent="."
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar
              alt="player_icon"
              src={
                isLeoPlayer
                  ? '/player_icons/leo.png'
                  : '/player_icons/world.png'
              }
              sx={{ width: avatarSize, height: avatarSize }}
            />
          </AvatarBadge>
          <Stack>
            <Typography variant="h6" color="white">
              {isLeoPlayer ? 'Leo' : 'World'}
            </Typography>
            <Typography variant="subtitle1" color="white">
              {isLeoPlayer ? 'White' : 'Black'} Pieces
            </Typography>
          </Stack>
        </Box>
      </PlayerIconWrapper>
    </Fade>
  );
};

export default PlayerIcon;
