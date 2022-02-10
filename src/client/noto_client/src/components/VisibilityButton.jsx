import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const VisibilityButton = ({ isPublic, toggleVisibility, sx }) => {
  return (
    <>
      <Tooltip title="Toggle visibility">
        <IconButton onClick={toggleVisibility} sx={{...sx,"&:hover": { color: "dodgerblue" }}}>
          {isPublic ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default VisibilityButton;
