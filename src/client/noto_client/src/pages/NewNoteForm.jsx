import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import VisibilityButton from "../components/VisibilityButton";
import Context from "../context/context";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import BackButton from "../components/BackButton";

const NewNoteForm = () => {
  const initialFormState = {
    title: "",
    description: "",
    code: "",
    public: false,
    tags: [],
  };

  const {
    tags,
    setNotes,
    setJoins,
    setTags,
    resetNotes,
    resetJoins,
    resetTags,
    jwt,
  } = useContext(Context);
  const [formData, setFormData] = useState(initialFormState);
  const [toggleTags, setToggleTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const tagArray = [];
    tags.forEach((tag) => {
      tagArray.push(tag.title);
    });
    setTagNames(tagArray);
  }, [tags]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTags = (event, newTags) => {
    event.preventDefault();
    setFormData({
      ...formData,
      tags: newTags,
    });
    setToggleTags(newTags);
    console.log(newTags);
  };

  const onCreateNote = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: jwt,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        description: event.target.description.value,
        code: event.target.code.value,
        public: formData.public,
        tags: formData.tags,
      }),
    };
    if (
      formData.title.length === 0 ||
      formData.description.length === 0 ||
      formData.code.length === 0
    ) {
      alert("Can't be empty");
    } else {
      await fetch("/api/notes", options);
      setFormData(initialFormState);
      const newNotes = await resetNotes();
      const newTags = await resetTags();
      const newJoins = await resetJoins();
      setNotes(newNotes);
      setTags(newTags);
      setJoins(newJoins);
      navigate("/");
    }
  };

  const toggleVisibility = () => {
    setFormData({ ...formData, public: !formData.public });
  };

  const handleAddTagOnBlur = (event) => {
    if (tagNames.includes(event.target.value)) {
      return;
    } else if (event.target.value === "") {
      return;
    } else {
      const tagsArray = [...tagNames];
      tagsArray.push(event.target.value);
      setTagNames(tagsArray);
    }
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

  console.log(formData);

  return (
    <form onSubmit={onCreateNote}>
      <div>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          sx={{ my: "1rem", mx: "1rem", width: "45%" }}
        />

        <VisibilityButton
          isPublic={formData.public}
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
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={15}
          sx={{ my: "1rem", mx: "1rem", width: "95%" }}
        />
        <TextField
          name="code"
          label="Code"
          value={formData.code}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={15}
          sx={{ mx: "1rem", my: "1rem", width: "95%" }}
        />
      </div>
      <BackButton />
      <Button type="submit" variant="contained" sx={{ mx: "1rem", my: "1rem" }}>
        Add Note
      </Button>
    </form>
  );
};

export default NewNoteForm;
