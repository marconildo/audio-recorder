import React, { Fragment, useState, useContext } from "react";
import { MainContext } from "./contexts/MainContext.js";

import GetAppIcon from "@material-ui/icons/GetApp";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

import { saveAs } from "file-saver";

const StyledFab = styled(Fab)`
  position: relative;
  background-color: #272727;
  color: white;
  opacity: 1;
  margin: 12px;
  transition: all 0.2s;
  :hover {
    background-color: #272727;
    opacity: 0.9;
  }
  @keyframes pulse {
    0% {
      transform: scale(1, 1);
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

export default function DownloadButton(props) {
  const { audioURL, audioExtension } = useContext(MainContext);

  const onDownload = async () => {
    console.log(audioExtension);
    let filename = `download.${audioExtension}`;
    const downloadResult = await fetch(audioURL);
    const blob = await downloadResult.blob();
    saveAs(blob, filename);
    console.log("reached here");
    console.log(blob);
  };

  // const onDownload = () => {
  //   console.log(audioExtension);
  //   let filename = `download.${audioExtension}`;
  //   const downloadResult = audioURL;
  //   const blob = downloadResult.blob();
  //   saveAs(blob, filename);
  // };

  return (
    <Fragment>
      <Tooltip
        title="Download Recording"
        aria-label="download"
        placement="right"
      >
        <StyledFab
          onClick={() => {
            onDownload();
          }}
          color="secondary"
          aria-label="download"
        >
          <GetAppIcon />
        </StyledFab>
      </Tooltip>
    </Fragment>
  );
}
