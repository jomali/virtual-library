import React from 'react';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Container = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexGrow: 1,
  overflow: 'hidden',
  padding: theme.spacing(0, 3),
  position: 'sticky',
  top: 0,
  ...theme.mixins.toolbar,
}));

const PanelHeader = (props) => {
  const {
    editMode,
    label,
    onClose,
    onDelete,
    onSubmit,
    onToggleEditMode,
    toggable,
  } = props;

  const theme = useTheme();

  return (
    <Container>
      {/* Float: left */}
      <Box
        sx={{
          left: (theme) => theme.spacing(3),
          position: 'absolute',
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <Fade
          in={toggable && editMode}
          {...(editMode ? { timeout: 1000 } : {})}
        >
          <Tooltip title="Cancel">
            <IconButton
              aria-label="cancel"
              color="inherit"
              edge="start"
              onClick={() => onToggleEditMode(false)}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Fade>
      </Box>

      {/* Float: right */}
      <Box
        sx={{
          marginRight: -1,
          position: 'absolute',
          right: (theme) => theme.spacing(3),
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        {Boolean(onDelete) ? (
          <Fade in={editMode} {...(editMode ? { timeout: 1000 } : {})}>
            <Button
              color="inherit"
              onClick={onDelete}
              size="small"
              startIcon={<DeleteRoundedIcon />}
              sx={{
                borderColor: (theme) => theme.palette.grey[500],
                color: (theme) => theme.palette.grey[500],
                marginRight: 1,
              }}
              variant="outlined"
            >
              {'Delete'}
            </Button>
          </Fade>
        ) : null}
        {Boolean(onSubmit) ? (
          <Fade in={editMode} {...(editMode ? { timeout: 1000 } : {})}>
            <Button
              form={null} // FIXME
              onClick={onSubmit}
              size="small"
              startIcon={<SaveRoundedIcon />}
              type="submit"
              variant="outlined"
            >
              {'Save'}
            </Button>
          </Fade>
        ) : null}
      </Box>

      {/* General */}
      <Fade
        in={!toggable || !editMode}
        {...(!editMode ? { timeout: 1000 } : {})}
      >
        <Tooltip title="Close panel">
          <IconButton
            aria-label="close-panel"
            color="inherit"
            edge="start"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              marginRight: 1,
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronLeftRoundedIcon />
            ) : (
              <ChevronRightRoundedIcon />
            )}
          </IconButton>
        </Tooltip>
      </Fade>
      {Boolean(label) ? (
        <Fade
          in={!toggable || !editMode}
          {...(!editMode ? { timeout: 1000 } : {})}
        >
          <Typography
            component="div"
            sx={{
              marginRight: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              zIndex: (theme) => theme.zIndex.appBar,
            }}
            variant="h6"
          >
            {label}
          </Typography>
        </Fade>
      ) : null}

      <Box sx={{ flexGrow: 1 }} />

      <Fade
        in={toggable && !editMode}
        {...(!editMode ? { timeout: 1000 } : {})}
      >
        <Tooltip title="Edit">
          <IconButton
            edge="end"
            onClick={() => onToggleEditMode(true)}
            sx={{
              color: (theme) => theme.palette.grey[500],
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      </Fade>
    </Container>
  );
};

PanelHeader.propTypes = {
  editMode: PropTypes.bool,
  label: PropTypes.string,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  toggable: PropTypes.bool,
};

export default PanelHeader;
