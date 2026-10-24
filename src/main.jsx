import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/oswald/latin-500.css";
import "@fontsource/oswald/latin-600.css";
import "@fontsource/source-sans-3/latin-400.css";
import "@fontsource/source-sans-3/latin-500.css";
import "@fontsource/source-sans-3/latin-600.css";
import App from "./App.jsx";
import "./styles.css";

const element = document.getElementById("root");
const app = <App path={window.location.pathname} />;
if (element.hasChildNodes() && !element.innerHTML.includes("<!--app-html-->"))
  hydrateRoot(element, app);
else createRoot(element).render(app);
