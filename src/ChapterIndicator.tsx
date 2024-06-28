import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import { bookSelectTreeDialogRef } from "./App";
import caretLeftFill from "./assets/icons/caret-left-fill.svg";
import caretRightFill from "./assets/icons/caret-right-fill.svg";
import { Verse, activeViewDatum } from "./viewService";
import { activeViewId } from "./viewService";
import { tableOfContents } from "./constants";

export function ChapterIndicator() {
  return () => {
    const _activeViewDatum = activeViewDatum();
    const _activeViewId = activeViewId();
    let nextChapterUpdateInfo: Verse | null = null;
    let prevChapterUpdateInfo: Verse | null = null;
    if (_activeViewDatum) {
      let book_name = _activeViewDatum.book_name;
      // let book = _activeViewDatum.book;
      let chapter = _activeViewDatum.chapter;
      let verse = _activeViewDatum.verse;
      if (tableOfContents) {
      }
    }

    return html`<div
      style=${styleMap({
        paddingTop: "1.5rem",
        paddingBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      })}
    >
      <sl-button
        variant="primary"
        size="small"
        circle
        outline
        title="Previous Chapter"
      >
        <sl-icon src=${caretLeftFill}></sl-icon>
      </sl-button>
      <sl-button
        outline
        pill
        class="indicator"
        variant="primary"
        style=${styleMap({
          width: "calc(100% - 6rem)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0.5rem",
        })}
        @click=${() => {
          // @handled
          try {
            bookSelectTreeDialogRef.value?.show();
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
        title=${_activeViewDatum
          ? `${_activeViewDatum.book_name} ${
              _activeViewDatum.chapter
            } - ${_activeViewDatum.versionId.toUpperCase()}`
          : ""}
        >${_activeViewDatum
          ? `${_activeViewDatum.book_name} ${
              _activeViewDatum.chapter
            } - ${_activeViewDatum.versionId.toUpperCase()}`
          : ""}
      </sl-button>
      <sl-button
        variant="primary"
        size="small"
        circle
        outline
        title="Next Chapter"
      >
        <sl-icon src=${caretRightFill}></sl-icon>
      </sl-button>
    </div>`;
  };
}
