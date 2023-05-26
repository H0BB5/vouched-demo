import logo from "./logo.svg";
import { useEffect } from "react";
import loadVouched from "./vouched-script";
import "./App.css";
import { Button } from "@mui/material";

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
        <Button>This is an MUI Button</Button>
      </header>
      <div id="vouched-element" style={{ height: "100%" }}></div>;
    </div>
  );
}

export default App;
