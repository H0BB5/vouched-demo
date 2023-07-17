import logo from "./logo.svg";
import { useEffect, useRef, useState } from "react";
import loadVouched from "./vouched-script";
import "./App.css";
import { Button, TextField, Input, Box } from "@mui/material";

function App() {
  useEffect(() => {
    loadVouched();
  }, []);

  const videoElement = useRef(null);
  const [videoSource, setVideoSource] = useState([]);
  const [selectedVideoSource, setSelectedVideoSource] = useState("");
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(gotDevices)
        .catch(handleError);
    }
    start();
  }, []);

  useEffect(() => {
    if (selectedVideoSource) {
      start();
    }
  }, [selectedVideoSource]);

  function gotDevices(deviceInfos) {
    const videoSrc = [];
    deviceInfos.forEach((deviceInfo) => {
      if (deviceInfo.kind === "videoinput") {
        videoSrc.push(deviceInfo);
      } else {
        console.log("Some other kind of source/device: ", deviceInfo);
      }
    });
    setVideoSource(videoSrc);
    setSelectedVideoSource(videoSrc[0]?.deviceId);
  }

  function handleError(error) {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  }

  function start() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const constraints = {
      video: {
        deviceId: selectedVideoSource
          ? { exact: selectedVideoSource }
          : undefined,
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .then(() => navigator.mediaDevices.enumerateDevices())
      .catch(handleError);
  }

  function gotStream(strm) {
    setStream(strm);
    if (videoElement.current) {
      videoElement.current.srcObject = strm;
    }
  }

  function stopStream() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  return (
    <div className="App">
      <div id="container">
        <h1>Select sources &amp; outputs</h1>

        <p>
          Returns all video sources of devices from{" "}
          <code>mediaDevices.enumerateDevices()</code>
          then sets the source for <code>getUserMedia()</code> using a{" "}
          <code>deviceId</code> constraint.
        </p>

        <div>
          <div className="select">
            <label htmlFor="videoSource">Video source: </label>
            <select
              id="videoSource"
              onChange={(e) => {
                stopStream();
                setSelectedVideoSource(e.target.value);
                start();
              }}
            >
              {videoSource.map((deviceInfo) => (
                <option key={deviceInfo.deviceId} value={deviceInfo.deviceId}>
                  {deviceInfo.label || `camera ${videoSource.length + 1}`}
                </option>
              ))}
            </select>
          </div>

          <video id="video" playsInline autoPlay ref={videoElement}></video>
        </div>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Box sx={{ marginTop: "1rem" }}>
          <Button>This is a default MUI Button</Button>
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          <TextField label="This is an MUI TextField" />
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          <Input placeholder="This is an MUI Input" />
        </Box>
      </header>
      <div id="vouched-element" style={{ height: "100%" }}></div>
    </div>
  );
}

export default App;
