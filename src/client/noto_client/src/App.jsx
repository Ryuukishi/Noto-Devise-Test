import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./context/context";
import { useState, useEffect } from "react";
import Global from "./styles/global";
import NotesIndex from "./pages/NotesIndex";
import NewNoteForm from "./pages/NewNoteForm";
import ViewNote from "./pages/ViewNote";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditNote from "./pages/EditNote";
import "./styles/app.css";

function App() {
  // const [context, setContext] = useState({});

  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([notes]);
  const [tags, setTags] = useState([]);
  const [joins, setJoins] = useState([]);
  const [lineNumbers, setLineNumbers] = useState(true);

  useEffect(() => {
    fetch("/api/notes", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((notes) => setNotes(notes))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    fetch("/api/tags", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((tags) => setTags(tags))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("/api/note_tags", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((joins) => setJoins(joins))
      .catch((err) => console.log(err));
  }, []);

  const resetNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const notesFetch = await fetch("/api/notes", options);
    const newNotes = notesFetch.json();
    return newNotes;
  };

  const resetTags = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const tagsFetch = await fetch("/api/tags", options);
    const newTags = tagsFetch.json();
    return newTags;
  };

  const resetJoins = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const noteTagsFetch = await fetch("/api/note_tags", options);
    const newNoteTags = noteTagsFetch.json();
    return newNoteTags;
  };

  const deleteNote = (noteId) => {
    let index = notes.findIndex((note) => {
      return note.id === noteId;
    });
    notes.splice(index, 1);
    setNotes(notes);
  };

  return (
    <>
      <Global />
      <Context.Provider
        value={{
          user,
          setUser,
          tags,
          setTags,
          notes,
          setNotes,
          joins,
          setJoins,
          filteredNotes,
          setFilteredNotes,
          resetNotes,
          resetTags,
          resetJoins,
          deleteNote,
          lineNumbers,
          setLineNumbers,
          jwt,
          setJwt,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NotesIndex />} />
            <Route path="/new" element={<NewNoteForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/view/:noteId" element={<ViewNote />} />
            <Route path="/edit/:noteId" element={<EditNote />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
