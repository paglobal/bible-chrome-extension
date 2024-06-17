import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import { ChapterIndicator } from "./ChapterIndicator";
import { Toolbar } from "./Toolbar";

// disable animations for all tree items
setDefaultAnimation("tree-item.expand", null);
setDefaultAnimation("tree-item.collapse", null);

function App() {
  return () =>
    html`<div
      id="app"
      style=${styleMap({
        overflow: "hidden",
        width: "100%",
        minWidth: "100vw",
        height: "100%",
        minHeight: "100vh",
        background: "var(--sl-color-neutral-0)",
      })}
    >
      <div
        style=${styleMap({
          width: "90%",
          margin: "auto",
        })}
      >
        ${(
          <>
            <ChapterIndicator />
            <Toolbar />
          </>
        )}
      </div>
    </div>`;
}

export default App;
