import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Div100vh from "react-div-100vh";
import { useQuery } from "react-query";

export const CONFIGURATION_FILE = "configuration.json";

export const APIContext = React.createContext();

export const APIProvider = ({ children }) => {
  const classes = useStyles();

  const { status, data, error } = useQuery("configuration", async () => {
    return fetch(CONFIGURATION_FILE).then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });

  if (status === "loading") {
    return (
      <Div100vh className={classes.root}>
        <CircularProgress size={75} />
      </Div100vh>
    );
  }

  if (status === "error") {
    if (error) console.log(error);
    return <p>No es posible iniciar la aplicación.</p>;
  }

  return (
    <APIContext.Provider value={{ data, status, error }}>
      {children}
    </APIContext.Provider>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
