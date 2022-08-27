import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
// import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
// import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import useTable from '../useTable';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

export default function TableToolbar({
  addOptions = {
    buttonReference: null,
    disabled: false,
    hidden: false,
    label: null,
    onClick: () => null,
  },
  title,
}) {
  const {
    buttonReference: addOptionButtonReference,
    hidden: addOptionHidden,
    label: addOptionLabel,
    ...addOptionsOther
  } = addOptions;

  // const table = useTable();

  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 2,
        width: '100%',
      }}
    >
      <Stack direction="row" spacing={2} sx={{ flex: '1 1 100%' }}>
        <Typography component="div" id="tableTitle" variant="h6">
          {title}
        </Typography>
        {!addOptionHidden ? (
          <Button
            ref={addOptionButtonReference}
            size="small"
            variant="outlined"
            {...addOptionsOther}
          >
            {addOptionLabel || 'Add new'}
          </Button>
        ) : null}
      </Stack>
      {/* <Stack direction="row" spacing={2}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{ 'aria-label': 'search' }}
            placeholder="Search…"
          />
        </Search>
      </Stack> */}
    </Toolbar>
  );
}
