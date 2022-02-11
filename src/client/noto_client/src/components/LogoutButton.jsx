import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const LogoutButton = () => {
  const { setUser, jwt, setJwt } = useContext(Context);
  const navigate = useNavigate();

  const onClickHandler = () => {
    setUser(false);
    setJwt(null);
    navigate("/landing");
  };

  return (
    <Button
      variant="outlined"
      onClick={() => {
        onClickHandler();
      }}
      sx={{ mx: "1rem", my: "1rem" }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
