import { makeStyles } from '@mui/styles';
import { COLORS } from '../../styles/pallete';

export const useStyles = makeStyles(() => ({
  snackbar: {
    boxShadow: 'unset !important',
    minWidth: 'unset !important',
    fontSize: '13px !important',
    'font-weight': '400 !important',
    paddingTop: '2px !important',
    paddingBottom: '2px !important',
    fontFamily: 'Roboto !important',

    '&& .MuiSvgIcon-root': {
      width: '24px !important',
      height: '24px !important',
    },

    '& i': {
      fontSize: '25px',
      marginInlineEnd: '8px',
    },
  },

  successSnackbar: {
    backgroundColor: `${COLORS.SUCESS} !important`,
  },

  infoSnackbar: {
    backgroundColor: `${COLORS.INFO} !important`,
  },
  errorSnackbar: {
    backgroundColor: `${COLORS.DANGER} !important`,
  },
}));
