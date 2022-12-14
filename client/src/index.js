import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);