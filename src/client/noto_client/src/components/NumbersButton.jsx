import React from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { IconButton, Tooltip } from "@mui/material";

const NumbersButton = ({ lineNumbers, toggleLineNumbers }) => {
  return (
    <>
      <Tooltip title="Toggle Line Numbers">
        <IconButton
          onClick={toggleLineNumbers}
          sx={{ "&:hover": { color: "dodgerblue" } }}
        >
          {lineNumbers ? (
            <FormatListNumberedIcon sx={{ color: "dodgerblue" }} />
          ) : (
            <FormatListNumberedIcon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default NumbersButton;
