import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const SelectTheme = ({ availableThemes, theme, setTheme }) => {
  const handleChange = (event) => {
    setTheme(availableThemes[event.target.value]);
  };

  return (
    <Box sx={{ display: "inline-flex" }}>
      <FormControl sx={{ width: 180, marginRight: "1rem" }}>
        <InputLabel>Theme</InputLabel>
        <Select label="theme" value={theme} onChange={handleChange}>
          <MenuItem name="a11y-dark" value="0">
            a11y-dark
          </MenuItem>
          <MenuItem name="atom-dark" value="1">
            atom-dark
          </MenuItem>
          <MenuItem name="base16-ateliersulphurpool.light" value="2">
            base16-ateliersulphurpool.light
          </MenuItem>
          <MenuItem name="cb" value="3">
            cb
          </MenuItem>
          <MenuItem name="coldark-cold" value="4">
            coldark-cold
          </MenuItem>
          <MenuItem name="coldark-dark" value="5">
            coldark-dark
          </MenuItem>
          <MenuItem name="coy" value="6">
            coy
          </MenuItem>
          <MenuItem name="coy-without-shadows" value="7">
            coy-without-shadows
          </MenuItem>
          <MenuItem name="darcula" value="8">
            darcula
          </MenuItem>
          <MenuItem name="dark" value="9">
            dark
          </MenuItem>
          <MenuItem name="dracula" value="10">
            dracula
          </MenuItem>
          <MenuItem name="duotone-dark" value="11">
            duotone-dark
          </MenuItem>
          <MenuItem name="duotone-earth" value="12">
            duotone-earth
          </MenuItem>
          <MenuItem name="duotone-forest" value="13">
            duotone-forest
          </MenuItem>
          <MenuItem name="duotone-light" value="14">
            duotone-light
          </MenuItem>
          <MenuItem name="duotone-sea" value="15">
            duotone-sea
          </MenuItem>
          <MenuItem name="duotone-space" value="16">
            duotone-space
          </MenuItem>
          <MenuItem name="funky" value="17">
            funky
          </MenuItem>
          <MenuItem name="ghcolors" value="18">
            ghcolors
          </MenuItem>
          <MenuItem name="hopscotch" value="19">
            hopscotch
          </MenuItem>
          <MenuItem name="material-dark" value="20">
            material-dark
          </MenuItem>
          <MenuItem name="material-light" value="21">
            material-light
          </MenuItem>
          <MenuItem name="material-oceanic" value="22">
            material-oceanic
          </MenuItem>
          <MenuItem name="nord" value="23">
            nord
          </MenuItem>
          <MenuItem name="okaidia" value="24">
            okaidia
          </MenuItem>
          <MenuItem name="pojoaque" value="25">
            pojoaque
          </MenuItem>
          <MenuItem name="prism" value="26">
            prism
          </MenuItem>
          <MenuItem name="shades-of-purple" value="27">
            shades-of-purple
          </MenuItem>
          <MenuItem name="solarizedlight" value="28">
            solarizedlight
          </MenuItem>
          <MenuItem name="synthwave84" value="29">
            synthwave84
          </MenuItem>
          <MenuItem name="tomorrow" value="30">
            tomorrow
          </MenuItem>
          <MenuItem name="twilight" value="31">
            twilight
          </MenuItem>
          <MenuItem name="vs" value="32">
            vs
          </MenuItem>
          <MenuItem name="vsc-dark-plus" value="33">
            vsc-dark-plus
          </MenuItem>
          <MenuItem name="xonokai" value="34">
            xonokai
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectTheme;
