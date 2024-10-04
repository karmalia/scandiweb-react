import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (
  !new (class {
    x;
  })().hasOwnProperty("x")
)
  throw new Error("Transpiler is not configured correctly");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
