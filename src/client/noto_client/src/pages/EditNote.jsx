import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/context";
import { TextField, Button, Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import VisibilityButton from "../components/VisibilityButton";
import BackButton from "../components/BackButton";

const EditNote = () => {
  const { noteId } = useParams();
  const initialNoteState = {
    title: "",
    description: "",
    code: "",
    public: "",
    tags: [],
  };
  const [note, setNote] = useState(initialNoteState);
  const { tags, setNotes, resetNotes } = useContext(Context);
  const [toggleTags, setToggleTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((note) => setNote(note))
      .catch((err) => console.log(err));
  }, []);

  console.log(note)

  useEffect(() => {
    const tagArray = [];
    tags.forEach((tag) => {
      tagArray.push(tag.title);
    });
    setTagNames(tagArray);
  }, [tags]);

  const handleTags = (event, newTags) => {
    event.preventDefault();
    setFormData({
      ...formData,
      tags: newTags,
    });
    setToggleTags(newTags);
    console.log(newTags)
  };

  const handleAddTagOnBlur = (event) => {
    const tagsArray = tagNames;
    if (tagsArray.includes(event.target.value)) {
      return;
    } else if (event.target.value === "") {
      return;
    } else {
      tagsArray.push(event.target.value);
    }
    setTagNames(tagsArray);
    console.log("tag names: ", tagNames);
  };

  const tagElements = (
    <ToggleButtonGroup
      value={toggleTags}
      sx={{ my: "1rem", mx: "1rem" }}
      onChange={handleTags}
    >
      {tagNames.map((tag, index) => (
        <ToggleButton key={index} value={tag} aria-label={tag}>
          {tag}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
  
  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
    console.log(note);
  };

  const toggleVisibility = () => {
    setNote({ ...note, public: !note.public });
    console.log(note);
  };

  const onEditNote = async () => {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: note.id,
        title: note.title,
        description: note.description,
        code: note.code,
        public: note.public,
        tags: note.tags,
      }),
    };

    await fetch(`/api/notes/${noteId}`, options);
    const newNotes = await resetNotes();
    console.log(newNotes);
    setNotes(newNotes);
    navigate("/");
  };

  return (
    <form onSubmit={onEditNote}>
      <div>
        <TextField
          name="title"
          value={note.title}
          onChange={handleChange}
          variant="outlined"
          sx={{ my: "1rem", mx: "1rem", width: "45%" }}
        />
        <VisibilityButton
          isPublic={note.public}
          toggleVisibility={toggleVisibility}
          sx={{ my: "1.5rem" }}
        />
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {tagElements}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            ml: 3,
            width: "150px",
          }}
        >
          <AddIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            label="Add tag"
            onBlur={handleAddTagOnBlur}
            variant="standard"
          />
        </Box>
      </Box>
      <div>
        <TextField
          name="description"
          label="Description"
          value={note.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={15}
          sx={{ my: "1rem", mx: "1rem", width: "95%" }}
        />
        <TextField
          name="code"
          label="Code"
          value={note.code}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={15}
          sx={{ mx: "1rem", my: "1rem", width: "95%" }}
        />
      </div>
      <BackButton />
      <Button type="submit" variant="contained" sx={{ mx: "1rem", my: "1rem" }}>
        Save
      </Button>
    </form>
  );
};

export default EditNote;
