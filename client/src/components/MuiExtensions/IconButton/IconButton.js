import MuiIconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";

/**
 * Customization of Material UI __IconButton__ component.
 *
 * - Reduces the opacity of the default color.
 */
const IconButton = styled(MuiIconButton)(({ theme }) => ({
  color: alpha(theme.palette.action.active, 0.7),
}));

export default IconButton;
