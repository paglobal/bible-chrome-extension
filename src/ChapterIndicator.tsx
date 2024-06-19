import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import { bookSelectTreeDialogRef } from "./App";
import caretLeftFill from "./assets/icons/caret-left-fill.svg";
import caretRightFill from "./assets/icons/caret-right-fill.svg";

export function ChapterIndicator() {
  return () => {
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
        title="1 Thessalonians - KJV"
        >1 Thessalonians - KJV
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
