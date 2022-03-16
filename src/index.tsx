import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/action.css";
import "./styles/block.css";
import "./styles/confirm.css";
import "./styles/index.css";
import "./styles/info.css";
import "./styles/popup.css";
import "./styles/setting.css";

ReactDOM.render(
  <React.StrictMode>
    <header className="header">
      <div className="app-title">Minesweeper</div>
    </header>
    <div className="contents">
      <App />
    </div>
    <footer className="footer">
      &copy;&nbsp;2022&nbsp;
      <a
          href="https://github.com/geminos-panjan"
          target="_blank" rel="noopener noreferrer"
        >geminos-panjan</a>
    </footer>
  </React.StrictMode>,
  document.getElementById("root")
);
