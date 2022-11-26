import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import { styled as muiStyled } from '@mui/material/styles';

export const DrawerButton = muiStyled(IconButton)({
  position: 'absolute',
  zIndex: 100,
  top: '16px',
  left: '16px',
  background: 'white',

  '&:hover': {
    background: 'white',
  },

  '& svg': {
    color: '#008080',
  },
});

export const ResponsiveDrawer = muiStyled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '70%',
    maxWidth: '300px',
  },
});

export const DrawerDivider = muiStyled(Divider)({
  margin: '0 -20px',
});
