import React, { useContext } from "react";
import Note from "./Note";
import Context from "../context/context";
import Box from "@mui/material/Box";

function NotesList() {
  const { filteredNotes } = useContext(Context);
  // setFilteredNotes(notes)
  return (
    <div style={{ width: "80%", position: "absolute", right: 100 }}>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(5, 1fr)",
          justifyContent: "center",
        }}
      >
        {filteredNotes.map((note, index) => (
          <Note
            key={index}
            title={note.title}
            description={note.description}
            code={note.code}
            isPublic={note.public}
            noteId={note.id}
          />
        ))}
      </Box>
    </div>
  );
}
export default NotesList;
