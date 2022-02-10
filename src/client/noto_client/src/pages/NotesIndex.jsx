import React from "react";
import ResponsiveNav from "../components/ResponsiveNav";
import NotesList from "../components/NotesList";

const NotesIndex = () => {

  return (
    <ResponsiveNav>
      <NotesList/>
    </ResponsiveNav>
  );
};

export default NotesIndex;
