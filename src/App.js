import logo from "./logo.svg";
import { useEffect } from "react";
import loadVouched from "./vouched-script";
import "./App.css";
import { Button, TextField, Input, Box } from "@mui/material";

function App() {
  useEffect(() => {
    loadVouched();
  }, []);

  return (
    <div className="App">
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
      <div id="vouched-element" style={{ height: "100%" }}></div>;
    </div>
  );
}

export default App;
