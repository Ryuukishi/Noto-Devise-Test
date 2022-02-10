import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/context";
import VisibilityButton from "./VisibilityButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

function Note(props) {
  const {
    setNotes,
    setTags,
    setJoins,
    resetNotes,
    resetTags,
    resetJoins,
    joins,
    tags,
    deleteNote,
  } = useContext(Context);
  const { title, description, code, isPublic, noteId } = props;
  const [visibility, setVisibility] = useState(isPublic);
  const noteJoins = [];
  joins.forEach((join) => {
    if (join.note_id === noteId) {
      noteJoins.push(join);
    }
  });

  const noteTags = [];
  noteJoins.forEach((join) => {
    const newTag = tags.find((tag) => join.tag_id === tag.id);
    noteTags.push(newTag);
  });

  const onDeleteNote = async () => {
    deleteNote(noteId);
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await fetch(`/api/notes/${noteId}`, options);
    const newNotes = await resetNotes();
    const newTags = await resetTags();
    const newJoins = await resetJoins();
    setNotes(newNotes);
    setTags(newTags);
    setJoins(newJoins);
  };

  const toggleVisibility = async () => {
    setVisibility(!isPublic);
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
        title: title,
        description: description,
        code: code,
        public: !isPublic,
      }),
    };

    await fetch(`/api/notes/${noteId}`, options);
    const newNotes = await resetNotes();
    setNotes(newNotes);
  };

  let truncatedTags = [];
  if (noteTags.length > 3) {
    truncatedTags = noteTags.slice(0, 2);
  } else {
    truncatedTags = [...noteTags];
  }
  console.log("truncatedtags after", truncatedTags);
  const tagList = (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {truncatedTags.map((tag, index) => (
        <Button key={index}>{tag.title}</Button>
      ))}
    </ButtonGroup>
  );

  return (
    <Card sx={{ minWidth: 300, maxWidth: 300, height: 150 }}>
      <Link
        to={`/view/${noteId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {tagList}
      <EditButton noteId={noteId} />
      <DeleteButton onDeleteNote={onDeleteNote} />
      <VisibilityButton
        isPublic={visibility}
        toggleVisibility={toggleVisibility}
      />
    </Card>
  );
}

export default Note;
