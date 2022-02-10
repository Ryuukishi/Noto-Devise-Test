import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const EditButton = ({ noteId }) => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Edit note">
        <IconButton
          onClick={() => {
            navigate(`/edit/${noteId}`);
          }}
        >
          <EditIcon sx={{ "&:hover": { color: "dodgerblue" } }} />
        </IconButton>
      </Tooltip>
    </>
  );
};
export default EditButton;
