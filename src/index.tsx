import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/action.css";
import "./styles/block.css";
import "./styles/confirm.css";
import "./styles/info.css";
import "./styles/popup.css";
import "./styles/setting.css";

ReactDOM.render(
  <React.StrictMode>
    <header className="header">
      <div>
        <div className="app-title">Minesweeper</div>
      </div>
    </header>
    <div className="contents">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
