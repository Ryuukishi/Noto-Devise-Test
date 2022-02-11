import { useEffect, useContext } from "react";
import ResponsiveNav from "../components/ResponsiveNav";
import NotesList from "../components/NotesList";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const NotesIndex = () => {
  const navigate = useNavigate();
  const { jwt, setNotes } = useContext(Context);
  useEffect(async () => {
    if (!jwt) {
      navigate("/landing");
    } else {
      await loadNotes(jwt);
    }
  }, []);

  const loadNotes = async (newJwt) => {
    const options = {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: newJwt,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/notes", options);
    const responseJson = await response.json();
    console.log("resonsejson", responseJson);
    setNotes(responseJson);
  };

  return (
    <ResponsiveNav>
      <NotesList />
    </ResponsiveNav>
  );
};

export default NotesIndex;
