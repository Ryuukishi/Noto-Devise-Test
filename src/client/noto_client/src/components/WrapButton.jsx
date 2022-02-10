import React from "react";
import WrapTextOutlinedIcon from "@mui/icons-material/WrapTextOutlined";
import { IconButton, Tooltip } from "@mui/material";

const WrapButton = ({ wrapLongLines, toggleWrapLongLines }) => {
  return (
    <>
      <Tooltip title="Wrap Lines">
        <IconButton
          onClick={toggleWrapLongLines}
          sx={{ "&:hover": { color: "dodgerblue" } }}
        >
          {wrapLongLines ? (
            <WrapTextOutlinedIcon sx={{ color: "dodgerblue" }} />
          ) : (
            <WrapTextOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default WrapButton;
