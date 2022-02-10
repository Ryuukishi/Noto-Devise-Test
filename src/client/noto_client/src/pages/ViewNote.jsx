import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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
  xonokai
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
  xonokai
];

const ViewNote = () => {
  const initialNoteState = {
    title: "",
    description: "",
    code: "",
    public: "",
  };
  const { noteId } = useParams();
  const [note, setNote] = useState(initialNoteState);
  const [language, setLanguage] = useState("plaintext");
  const [theme, setTheme] = useState(coy);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrapLongLines, setWrapLongLines] = useState(true);
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

  const toggleLineNumbers = () => {
    setLineNumbers(!lineNumbers);
    console.log("line numbers:", lineNumbers);
  };

  const toggleWrapLongLines = () => {
    setWrapLongLines(!wrapLongLines);
    console.log("wrap lines:", wrapLongLines);
  };

  return (
    <Box>
      <SelectLanguage language={language} setLanguage={setLanguage} />
      <SelectTheme availableThemes={availableThemes} setTheme={setTheme} />
      <NumbersButton lineNumbers={lineNumbers} toggleLineNumbers={toggleLineNumbers} />
      <WrapButton wrapLongLines={wrapLongLines} toggleWrapLongLines={toggleWrapLongLines} />
      <EditButton noteId={noteId} />
      <BackButton />
      <SyntaxHighlighter
        language={language}
        style={theme}
        showLineNumbers={lineNumbers}
        wrapLongLines={wrapLongLines}
      >
        {note.code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default ViewNote;
