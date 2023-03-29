import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './assets/scss/base.scss'
import Authentication from "./components/authentication/authentication";
// createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <Authentication />
//   </React.StrictMode>
// );

createRoot(document.getElementById("auth-root") as HTMLElement).render(
  <React.StrictMode>
    <Authentication />
  </React.StrictMode>
);
