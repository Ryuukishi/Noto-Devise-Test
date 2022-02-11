import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  coy,
  coyWithoutShadows,
  darcula,
  dark,
  dracula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  funky,
  ghcolors,
  hopscotch,
  materialDark,
  materialLight,
  materialOceanic,
  nord,
  okaidia,
  pojoaque,
  prism,
  shadesOfPurple,
  solarizedlight,
  synthwave84,
  tomorrow,
  twilight,
  vs,
  vscDarkPlus,
  xonokai,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import SelectLanguage from "../components/SelectLanguage";
import SelectTheme from "../components/SelectTheme";
import NumbersButton from "../components/NumbersButton";
import WrapButton from "../components/WrapButton";
import BackButton from "../components/BackButton";
import EditButton from "../components/EditButton";

const availableThemes = [
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  coy,
  coyWithoutShadows,
  darcula,
  dark,
  dracula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  funky,
  ghcolors,
  hopscotch,
  materialDark,
  materialLight,
  materialOceanic,
  nord,
  okaidia,
  pojoaque,
  prism,
  shadesOfPurple,
  solarizedlight,
  synthwave84,
  tomorrow,
  twilight,
  vs,
  vscDarkPlus,
  xonokai,
];

const ViewNote = () => {
  const initialNoteState = {
    title: "",
    description: "",
    code: "",
    public: "",
  };

  const { jwt, joins, tags } = useContext(Context);
  const { noteId } = useParams();
  const [note, setNote] = useState(initialNoteState);
  const [language, setLanguage] = useState("plaintext");
  const [theme, setTheme] = useState(coy);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrapLongLines, setWrapLongLines] = useState(true);

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
      .then((note) => setNote(note))
      .catch((err) => console.log(err));
  }, []);

  const toggleLineNumbers = () => {
    setLineNumbers(!lineNumbers);
    console.log("line numbers:", lineNumbers);
  };

  const toggleWrapLongLines = () => {
    setWrapLongLines(!wrapLongLines);
    console.log("wrap lines:", wrapLongLines);
  };

  const noteJoins = [];
  joins.forEach((join) => {
    if (join.note_id === note.id) {
      noteJoins.push(join);
    }
  });

  const noteTags = [];
  noteJoins.forEach((join) => {
    const newTag = tags.find((tag) => join.tag_id === tag.id);
    noteTags.push(newTag);
  });

  const tagList = (
    <ButtonGroup variant="text" aria-label="outlined primary button group">
      {noteTags.map((tag, index) => (
        <Button key={index}>{tag.title}</Button>
      ))}
    </ButtonGroup>
  );

  return (
    <Paper elevation={3} sx={{ p: 6, m: 6, minHeight: 800 }}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Typography sx={{ color: "#3884fd", fontSize: 28 }}>
          {note.title}
        </Typography>
        <Divider />
        {tagList}
        <Divider />
        <Typography>{note.description}</Typography>
        <Divider />
        <Stack direction="row" alignItems="center">
          <SelectLanguage language={language} setLanguage={setLanguage} />
          <SelectTheme availableThemes={availableThemes} setTheme={setTheme} />
          <NumbersButton
            lineNumbers={lineNumbers}
            toggleLineNumbers={toggleLineNumbers}
          />
          <WrapButton
            wrapLongLines={wrapLongLines}
            toggleWrapLongLines={toggleWrapLongLines}
          />
          <EditButton noteId={noteId} />
          <BackButton />
        </Stack>
        <SyntaxHighlighter
          language={language}
          style={theme}
          showLineNumbers={lineNumbers}
          wrapLongLines={wrapLongLines}
        >
          {note.code}
        </SyntaxHighlighter>
      </Stack>
    </Paper>
  );
};

export default ViewNote;
