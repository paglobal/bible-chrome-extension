import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { createRef } from "lit/directives/ref.js";
import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";
import { SlDialog } from "@shoelace-style/shoelace";
import { ChapterSwitcher } from "./ChapterSwitcher";
import { Toolbar } from "./Toolbar";
import { ChapterView } from "./ChapterView";
import { Dialog } from "./Dialog";
import { VersionSwitcher } from "./VersionSwitcher";
import { BookSelectTree } from "./BookSelectTree";
import { ChapterSelectTree } from "./ChapterSelectTree";
import { VerseSelectTree } from "./VerseSelectTree";

// disable animations for all tree items
setDefaultAnimation("tree-item.expand", null);
setDefaultAnimation("tree-item.collapse", null);

export const bookSelectTreeDialogRef = createRef<SlDialog>();
export const chapterSelectTreeDialogRef = createRef<SlDialog>();
export const verseSelectTreeDialogRef = createRef<SlDialog>();
export const switchViewTreeDialogRef = createRef<SlDialog>();
export const searchScriptureDialogRef = createRef<SlDialog>();
export const verseReferenceTreeDialogRef = createRef<SlDialog>();

function App() {
  return () =>
    html`<div
      id="app"
      style=${styleMap({
        width: "100%",
        minWidth: "100vw",
        height: "100%",
        minHeight: "100vh",
        background: "var(--sl-color-neutral-50)",
      })}
    >
      <div
        style=${styleMap({
          width: "min(90%, 50rem)",
          margin: "auto",
        })}
      >
        ${(
          <>
            <ChapterView />
            <ChapterSwitcher />
            <Toolbar />
            <Dialog
              label="Select Book"
              ref={bookSelectTreeDialogRef}
              fullWidth
              noTopBodyMargin
            >
              <VersionSwitcher />
              <BookSelectTree />
            </Dialog>
            <Dialog
              label="Select Chapter"
              ref={chapterSelectTreeDialogRef}
              fullWidth
              noTopBodyMargin
            >
              <ChapterSelectTree />
            </Dialog>
            <Dialog
              label="Select Verse"
              ref={verseSelectTreeDialogRef}
              fullWidth
              noTopBodyMargin
            >
              <VerseSelectTree />
            </Dialog>
          </>
        )}
      </div>
    </div>`;
}

export default App;
