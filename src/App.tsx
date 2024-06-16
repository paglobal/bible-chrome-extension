import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";

// disable animations for all tree items
setDefaultAnimation("tree-item.expand", null);
setDefaultAnimation("tree-item.collapse", null);

function App() {
  return html`<div
    id="app"
    style=${styleMap({
      height: "100vh",
      overflow: "hidden",
    })}
  ></div>`;
}

export default App;
