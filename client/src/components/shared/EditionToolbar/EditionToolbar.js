import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditOffRoundedIcon from '@mui/icons-material/EditOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { Tooltip } from 'components/shared/MuiCustomizations';

export default function EditionToolbar({
  editMode,
  onDelete,
  onSubmit,
  onToggleEditMode,
  toggable,
}) {
  const theme = useTheme();

  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Box
          // EDIT MODE: left actions
          sx={{
            left: (theme) => theme.spacing(3),
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Fade
            in={toggable && editMode}
            timeout={theme.transitions.duration.standard * 2}
          >
            <Tooltip title="Cancel">
              <IconButton
                aria-label="cancel"
                color="inherit"
                edge="start"
                onClick={() => onToggleEditMode(!editMode)}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <EditOffRoundedIcon />
              </IconButton>
            </Tooltip>
          </Fade>
        </Box>
        <Box
          // EDIT MODE: right actions
          sx={{
            marginRight: -1,
            position: 'absolute',
            right: (theme) => theme.spacing(3),
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          {onDelete ? (
            <Fade
              in={!toggable || editMode}
              timeout={theme.transitions.duration.standard * 2}
            >
              <Button
                color="inherit"
                onClick={onDelete}
                // size="small"
                startIcon={<DeleteRoundedIcon />}
                sx={{
                  borderColor: (theme) => theme.palette.grey[500],
                  color: (theme) => theme.palette.grey[500],
                  marginRight: 2,
                }}
                variant="text"
              >
                {'Delete'}
              </Button>
            </Fade>
          ) : null}
          {onSubmit ? (
            <Fade
              in={!toggable || editMode}
              timeout={theme.transitions.duration.standard * 2}
            >
              <Button
                form={null} // FIXME
                onClick={onSubmit}
                // size="small"
                startIcon={<SaveRoundedIcon />}
                type="submit"
                variant="contained"
              >
                {'Save'}
              </Button>
            </Fade>
          ) : null}
        </Box>

        <Fade
          // !EDIT MODE: left actions
          in={toggable && !editMode}
          timeout={theme.transitions.duration.standard * 2}
        >
          <Tooltip title="Edit">
            <IconButton
              aria-label="close-panel"
              color="inherit"
              edge="start"
              onClick={() => onToggleEditMode(!editMode)}
              sx={{
                color: (theme) => theme.palette.grey[500],
                marginRight: 1,
                zIndex: (theme) => theme.zIndex.appBar,
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>
        </Fade>
      </Toolbar>
    </AppBar>
  );
}

EditionToolbar.propTypes = {
  editMode: PropTypes.bool,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  toggable: PropTypes.bool,
};
