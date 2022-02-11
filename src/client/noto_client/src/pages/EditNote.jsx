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
  const initialFormState = {
    title: "",
    description: "",
    code: "",
    public: false,
    tags: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const { tags, setNotes, resetNotes, jwt } = useContext(Context);
  const [toggleTags, setToggleTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/notes/${noteId}`, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((note) => setFormData(note))
      .catch((err) => console.log(err));
  }, []);

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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const toggleVisibility = () => {
    setFormData({ ...formData, public: !formData.public });
  };

  const onEditNote = async () => {
    const options = {
      method: "PATCH",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: jwt,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.id,
        title: formData.title,
        description: formData.description,
        code: formData.code,
        public: formData.public,
        tags: formData.tags,
      }),
    };

    await fetch(`/api/notes/${noteId}`, options);
    const updatedNotes = await resetNotes();
    setNotes(updatedNotes);
    navigate("/");
  };

  console.log(formData);

  return (
    <form>
      <div>
        <TextField
          name="title"
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
      <Button
        onClick={onEditNote}
        variant="contained"
        sx={{ mx: "1rem", my: "1rem" }}
      >
        Save
      </Button>
    </form>
  );
};

export default EditNote;
