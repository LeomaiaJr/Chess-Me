import MenuIcon from '@mui/icons-material/Menu';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { COLORS } from '../../../styles/pallete';
import { DrawerButton, DrawerDivider, ResponsiveDrawer } from './styles';
import { useInterface } from '../../../hooks/useInterface';
import { EnvironmentPresets } from '../../../@types/interface';
import { EnvironmentPresetsLabels } from '../../../constants/interface';
import LeoToken from '../LeoToken/LeoToken';

const AppDrawer = () => {
  const {
    showStats,
    setShowStats,
    showPlayerIcons,
    setShowPlayerIcons,
    environmentPreset,
    setEnvironmentPreset,
    playersConnected,
  } = useInterface();

  const getPlayersConnectedLabel = () => {
    if (playersConnected === 1) return '1 player connected';
    return `${playersConnected} players connected`;
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <DrawerButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </DrawerButton>
      <ResponsiveDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Stack p={2.5} height="100%" justifyContent="space-between">
          <Stack gap={2}>
            <Typography variant="h6">Chess Me</Typography>
            <DrawerDivider />

            <Box display="flex" alignItems="center" gap={2} component="div">
              <QueryStatsIcon
                sx={{
                  color: COLORS.PRIMARY,
                }}
              />
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={showStats}
                    onChange={() => {
                      setShowStats(!showStats);
                    }}
                  />
                }
                label="Show FPS & Stats"
                labelPlacement="end"
              />
            </Box>
            <DrawerDivider />

            <Box display="flex" alignItems="center" gap={2} component="div">
              <AccountCircleIcon
                sx={{
                  color: COLORS.PRIMARY,
                }}
              />
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={showPlayerIcons}
                    onChange={() => {
                      setShowPlayerIcons(!showPlayerIcons);
                    }}
                  />
                }
                label="Show Player Icons"
                labelPlacement="end"
              />
            </Box>
            <DrawerDivider />

            <Box display="flex" alignItems="center" gap={2} component="div">
              <NaturePeopleIcon
                sx={{
                  color: COLORS.PRIMARY,
                }}
              />
              <FormControl
                sx={{
                  flex: 1,
                }}
              >
                <InputLabel id="env-label-id">Environment</InputLabel>
                <Select
                  labelId="env-label-id"
                  value={environmentPreset}
                  input={<OutlinedInput label="Environment" />}
                  onChange={(e) =>
                    setEnvironmentPreset(e.target.value as EnvironmentPresets)
                  }
                >
                  {Object.values(EnvironmentPresets).map((preset) => (
                    <MenuItem key={preset} value={preset}>
                      {(EnvironmentPresetsLabels as any)[preset]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <DrawerDivider />
            <Box display="flex" alignItems="center" gap={2} component="div">
              <GroupIcon
                sx={{
                  color: COLORS.PRIMARY,
                }}
              />
              <Typography variant="subtitle1">
                {getPlayersConnectedLabel()}
              </Typography>
            </Box>
          </Stack>
          <Box component="div">
            <LeoToken />
          </Box>
        </Stack>
      </ResponsiveDrawer>
    </>
  );
};

export default AppDrawer;
