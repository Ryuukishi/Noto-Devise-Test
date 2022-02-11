import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      variant="outlined"
      onClick={() => {
        navigate("/");
      }}
      sx={{ mx: "1rem", my: "1rem" }}
    >
      Back
    </Button>
  );
};

export default BackButton;
