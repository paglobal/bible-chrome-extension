import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import { createRef } from "lit/directives/ref.js";
import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
import type SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import { ChapterIndicator } from "./ChapterIndicator";
import { Toolbar } from "./Toolbar";
import { ChapterView } from "./ChapterView";
import { Dialog } from "./Dialog";
import { Tree } from "./Tree";
import { TreeItem } from "./TreeItem";
import { TreeItemIcon } from "./TreeItemIcon";
import lucideScrollTextIcon from "./assets/icons/LucideScrollText.svg";

// disable animations for all tree items
setDefaultAnimation("tree-item.expand", null);
setDefaultAnimation("tree-item.collapse", null);

export const bookSelectTreeDialogRef = createRef<SlDialog>();
export const chapterSelectDialogRef = createRef<SlDialog>();
export const verseSelectDialogRef = createRef<SlDialog>();
export const switchViewTreeDialogRef = createRef<SlDialog>();
export const bookmarksTreeDialogRef = createRef<SlDialog>();
export const searchScriptureDialogRef = createRef<SlDialog>();
export const verseReferenceTreeDialogRef = createRef<SlDialog>();
export const strongsViewDialogRef = createRef<SlDialog>();

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
        background: "var(--sl-color-neutral-50)",
      })}
    >
      <div
        style=${styleMap({
          width: "min(90%, 700px)",
          margin: "auto",
        })}
      >
        ${(
          <>
            <ChapterView />
            <ChapterIndicator />
            <Toolbar />
            <Dialog
              label="Select Book"
              ref={bookSelectTreeDialogRef}
              fullWidth
              noTopBodyMargin
            >
              {html`<sl-select
                value="KJV"
                style=${styleMap({
                  margin: "0.5rem 0 1rem 0",
                })}
              >
                <sl-option value="KJV">KJV</sl-option>
                <sl-option value="ASV">ASV</sl-option>
                <sl-option value="WEB">WEB</sl-option>
              </sl-select>`}
              {html`<sl-divider
                style=${styleMap({ marginBottom: "1rem" })}
              ></sl-divider>`}
              <Tree
                contentFn={() =>
                  map(range(66), () => {
                    return (
                      <TreeItem tooltipContent="Genesis">
                        {html`${(
                          <TreeItemIcon iconUrl={lucideScrollTextIcon} />
                        )}`}
                        {"Genesis"}
                      </TreeItem>
                    );
                  })
                }
              />
            </Dialog>
          </>
        )}
      </div>
    </div>`;
}

export default App;
