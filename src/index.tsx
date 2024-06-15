import { render } from "lit";
import App from "./App";
import "./index.css";

// auto light/dark mode based on user preferences
if (window.matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("sl-theme-dark");
  } else {
    document.documentElement.classList.remove("sl-theme-dark");
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("sl-theme-dark");
      } else {
        document.documentElement.classList.remove("sl-theme-dark");
      }
    });
}
render(<App />, document.body);
