import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useInterface } from '../../../hooks/useInterface';

const LeoToken = () => {
  const { setLeosSecret } = useInterface();

  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState('');

  const handleClose = () => {
    setOpen(false);
    setSecret('');
  };

  const handleConfirm = () => {
    setLeosSecret(secret);
    setOpen(false);
    setSecret('');
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you Leo?</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" mt={1} component="div">
            <TextField
              id="leos-secret"
              InputLabelProps={{ shrink: true }}
              label="Leo's Secret"
              placeholder="Secret"
              variant="outlined"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fortunately not</Button>
          <Button variant="contained" onClick={handleConfirm} autoFocus>
            Unfortunately yes
          </Button>
        </DialogActions>
      </Dialog>

      <Link href="#" onClick={() => setOpen(true)}>
        <Typography variant="caption">Leo? Is that you?</Typography>
      </Link>
    </>
  );
};

export default LeoToken;
