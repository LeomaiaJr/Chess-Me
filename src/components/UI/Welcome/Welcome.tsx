import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useInterface } from '../../../hooks/useInterface';

const Welcome = () => {
  const { playerName, setPlayerName } = useInterface();

  const [open, setOpen] = useState(playerName === null);

  const [name, setName] = useState('');

  const getDisabled = () => name.length === 0 || name === 'Leo';

  const handleConfirm = () => {
    setPlayerName(name);
    setOpen(false);
  };

  if (playerName !== null) return null;

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Welcome to Chess Me</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a multiplayer chess game. <br />
            The world is playing against Leo on one chessboard. Everyone can
            play!
          </DialogContentText>
          <Stack mt={3}>
            <TextField
              error={name === 'Leo'}
              helperText={name === 'Leo' ? 'Leo is not allowed, sorry' : ''}
              id="playerName"
              InputLabelProps={{ shrink: true }}
              label="Name"
              placeholder="Your name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={getDisabled()}
          >
            Play
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Welcome;
