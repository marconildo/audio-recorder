//Todo: passthrough the file format to the download button

import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "./contexts/MainContext.js";
import AudioAnalyser from "react-audio-analyser";
import RecordButton from "./RecordButton.js";
import DownloadButton from "./DownloadButton";
import OutputSelect from "./OutputSelect";

export default function AudioRecorderFunc(props) {
  const { audioURL, setAudioURL, setAudioExtension } = useContext(MainContext);
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [audioType, setAudioType] = useState("audio/wav");

  const controlAudio = status => {
    setStatus(status);
  };

  useEffect(() => {
    setAudioExtension(audioType.replace("audio/", ""));
  }, []);

  useEffect(() => {
    setAudioExtension(audioType.replace("audio/", ""));
  }, [audioType]);

  const changeScheme = e => {
    setAudioType(e.target.value);
  };

  const toggleRecording = () => {
    status === "recording"
      ? controlAudio("inactive")
      : controlAudio("recording");
  };
  // const { status, audioSrc, audioType } = this.state;
  const audioProps = {
    audioType,
    // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
    status,
    audioSrc,
    timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
    startCallback: e => {
      console.log("succ start", e);
    },
    pauseCallback: e => {
      console.log("succ pause", e);
    },
    stopCallback: e => {
      setAudioSrc(window.URL.createObjectURL(e));
      console.log("succ stop", e);
      setAudioURL(window.URL.createObjectURL(e));
    },
    onRecordCallback: e => {
      console.log("recording", e);
    },
    errorCallback: err => {
      console.log("error", err);
    }
  };
  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          <RecordButton
            id="recordButton"
            onClick={() => {
              toggleRecording();
              // toggleIsRecording();
            }}
          />
          <DownloadButton audioType={audioType} id="downloadButton" />
        </div>
      </AudioAnalyser>
      <OutputSelect defaultValue={audioType} onChange={e => changeScheme(e)} />
    </div>
  );
}
