import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

/*
Entry point file that renders the `Root` component, with a `store`
prop passed in, inside the div with id 'root'.
*/

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const store = configureStore();
  ReactDOM.render(<Root store={store}/>, rootEl);
})