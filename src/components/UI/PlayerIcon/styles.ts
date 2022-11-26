import { styled as muiStyled } from '@mui/material/styles';

import Badge from '@mui/material/Badge';

export const PlayerIconWrapper = muiStyled('div')({
  position: 'absolute',
  zIndex: 100,
});

interface CustomBadgeProps {
  active?: string;
}

export const AvatarBadge = muiStyled(Badge)<CustomBadgeProps>(
  ({ active = 'false' }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: active === 'true' ? '#44b700' : '#bfbfbf',
      color: active === 'true' ? '#44b700' : '#bfbfbf',
      transition: 'all .5s ease',
      WebkitTransition: 'all .5s ease',
      MozTransition: 'all .5s ease',
    },
  })
);
