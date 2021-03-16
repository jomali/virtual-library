import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import Box from "components/_Box";
import Card from "components/_Card";
import CustomTextField from "components/CustomTextField";
import { t } from "lang";
import logo from "share/ludoteca-logo.png";

const PAPER_PADDING_MULTIPLY = 6;

const useStyles = makeStyles((theme) => ({
  buttonAccept: {
    minHeight: 56, // same as text fields
  },
  item: {
    display: "flex",
    justifyContent: "center",
  },
  linearProgress: {
    minHeight: 4,
  },
  logo: {
    maxHeight: 120,
  },
  paper: {
    padding: theme.spacing(PAPER_PADDING_MULTIPLY),
    paddingBottom: theme.spacing(PAPER_PADDING_MULTIPLY * 1.5),
    paddingTop: theme.spacing(PAPER_PADDING_MULTIPLY * 1.5),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  rootXs: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScreenLogin(props) {
  const classes = useStyles();
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const loading = true;

  const [userNameField, setUserNameField] = React.useState("");
  const [passwordField, setPasswordField] = React.useState("");
  const [passwordFieldVisible, setPasswordFieldVisible] = React.useState(false);

  const handleSubmit = async () => {};

  const LoginForm = () => (
    <Box spacing={5}>
      <Box spacing={2}>
        <div className={classes.item}>
          <img alt="logo" className={classes.logo} src={logo} />
        </div>

        <div className={classes.item}>
          <Typography color="textSecondary" variant="h4">
            {t("signIn")}
          </Typography>
        </div>
      </Box>

      <Box spacing={2}>
        <CustomTextField
          autoFocus
          label={t("userName")}
          onChange={(value) => setUserNameField(value)}
          value={userNameField}
        />

        <CustomTextField
          InputProps={{
            className: classes.input,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("togglePasswordVisibility")}
                  onClick={() => setPasswordFieldVisible(!passwordFieldVisible)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {passwordFieldVisible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={t("password")}
          onChange={(value) => setPasswordField(value)}
          type={passwordFieldVisible ? "text" : "password"}
          value={passwordField}
        />
      </Box>

      <div className={classes.item}>
        <Button
          className={classes.buttonAccept}
          color="primary"
          fullWidth
          onClick={handleSubmit}
          variant="contained"
        >
          {t("accept")}
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      {xsScreen ? (
        <div className={classes.linearProgress}>
          {loading && <LinearProgress color="primary" />}
        </div>
      ) : null}
      <div
        className={clsx({
          [classes.root]: true,
          [classes.rootXs]: xsScreen,
        })}
      >
        {xsScreen ? (
          LoginForm()
        ) : (
          <Container maxWidth="sm">
            <Card loading={loading}>{LoginForm()}</Card>
          </Container>
        )}
      </div>
    </>
  );
}
