import React from "react";
import { render } from "react-dom";
import "sanitize.css/sanitize.css";
import "sanitize.css/typography.css";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
  }
`;

render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById("root")
);
