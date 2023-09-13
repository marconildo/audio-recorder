import React, { useContext, useState } from "react";
import { MainContext } from "./contexts/MainContext.js";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
  width: 100px;
  margin: 24px;
`;

export default function OutputSelect(props) {
  const [format, setFormat] = useState(props.defaultValue);

  const handleChange = e => {
    setFormat(e.target.value);
    props.onChange(e);
  };

  return (
    <StyledFormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Output</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={format}
        onChange={e => handleChange(e)}
        label="Output"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"audio/webm"}>webm</MenuItem>
        <MenuItem value={"audio/wav"}>wav</MenuItem>
        <MenuItem value={"audio/mp3"}>mp3</MenuItem>
      </Select>
    </StyledFormControl>
  );
}
