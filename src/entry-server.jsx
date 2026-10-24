import React from "react";
import { renderToString } from "react-dom/server";
import App, { getPage } from "./App.jsx";
export function render(path) {
  return { html: renderToString(<App path={path} />), page: getPage(path) };
}
