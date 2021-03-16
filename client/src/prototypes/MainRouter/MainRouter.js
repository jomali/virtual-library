import { Router } from "@reach/router";
import React from "react";
import { useUser } from "components/ContextUser";
import ScreenLogin from "components/ScreenLogin";
import ScreenVideogames from "components/ScreenVideogames";

export default function MainRouter(props) {
  const user = useUser();

  return (
    <Router basepath={process.env.PUBLIC_URL}>
      {!user.data ? (
        <ScreenLogin path="/" />
      ) : (
        <ScreenVideogames default path="/videogames" />
      )}
    </Router>
  );
}
