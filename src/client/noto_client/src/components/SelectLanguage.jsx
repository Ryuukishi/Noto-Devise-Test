import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectLanguage = ({ language, setLanguage }) => {
  const handleChange = (event) => {
    setLanguage(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ display: "inline-flex" }}>
      <FormControl sx={{ width: 130, marginRight: "1rem" }}>
        <InputLabel>Language</InputLabel>
        <Select label="language" value={language} onChange={handleChange}>
          <MenuItem value="actionscript">actionscript</MenuItem>
          <MenuItem value="bash">bash</MenuItem>
          <MenuItem value="basic">basic</MenuItem>
          <MenuItem value="batch">batch</MenuItem>
          <MenuItem value="bison">bison</MenuItem>
          <MenuItem value="c">c</MenuItem>
          <MenuItem value="clojure">clojure</MenuItem>
          <MenuItem value="csharp">csharp</MenuItem>
          <MenuItem value="css">css</MenuItem>
          <MenuItem value="dart">dart</MenuItem>
          <MenuItem value="docker">docker</MenuItem>
          <MenuItem value="elm">elm</MenuItem>
          <MenuItem value="erb">erb</MenuItem>
          <MenuItem value="erlang">erlang</MenuItem>
          <MenuItem value="excel-formula">excel-formula</MenuItem>
          <MenuItem value="fortran">fortran</MenuItem>
          <MenuItem value="fsharp">fsharp</MenuItem>
          <MenuItem value="git">git</MenuItem>
          <MenuItem value="go">go</MenuItem>
          <MenuItem value="graphql">graphql</MenuItem>
          <MenuItem value="haskell">haskell</MenuItem>
          <MenuItem value="java">java</MenuItem>
          <MenuItem value="javascript">javascript</MenuItem>
          <MenuItem value="json">json</MenuItem>
          <MenuItem value="jsx">jsx</MenuItem>
          <MenuItem value="julia">julia</MenuItem>
          <MenuItem value="kotlin">kotlin</MenuItem>
          <MenuItem value="latex">latex</MenuItem>
          <MenuItem value="latte">latte</MenuItem>
          <MenuItem value="lisp">lisp</MenuItem>
          <MenuItem value="lua">lua</MenuItem>
          <MenuItem value="makefile">makefile</MenuItem>
          <MenuItem value="markdown">markdown</MenuItem>
          <MenuItem value="matlab">matlab</MenuItem>
          <MenuItem value="mongodb">mongodb</MenuItem>
          <MenuItem value="moonscript">moonscript</MenuItem>
          <MenuItem value="objectivec">objectivec</MenuItem>
          <MenuItem value="pascal">pascal</MenuItem>
          <MenuItem value="perl">perl</MenuItem>
          <MenuItem value="php">php</MenuItem>
          <MenuItem value="plaintext">plaintext</MenuItem>
          <MenuItem value="powershell">powershell</MenuItem>
          <MenuItem value="python">python</MenuItem>
          <MenuItem value="r">r</MenuItem>
          <MenuItem value="regex">regex</MenuItem>
          <MenuItem value="ruby">ruby</MenuItem>
          <MenuItem value="rust">rust</MenuItem>
          <MenuItem value="sas">sas</MenuItem>
          <MenuItem value="sass">sass</MenuItem>
          <MenuItem value="scala">scala</MenuItem>
          <MenuItem value="scheme">scheme</MenuItem>
          <MenuItem value="scss">scss</MenuItem>
          <MenuItem value="shell-session">shell-session</MenuItem>
          <MenuItem value="sql">sql</MenuItem>
          <MenuItem value="swift">swift</MenuItem>
          <MenuItem value="typescript">typescript</MenuItem>
          <MenuItem value="vbnet">vbnet</MenuItem>
          <MenuItem value="visual-basic">visual-basic</MenuItem>
          <MenuItem value="xml-doc">xml-doc</MenuItem>
          <MenuItem value="yaml">yaml</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectLanguage;
