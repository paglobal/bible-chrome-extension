import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";

export function ChapterIndicator() {
  return () => {
    return html`<div
      style=${styleMap({
        paddingTop: "1.5rem",
        paddingBottom: "0.5rem",
      })}
    >
      <sl-button
        outline
        variant="primary"
        style=${styleMap({ width: "100%" })}
        @click=${() => {
          // @handled
          try {
            // sessionsTreeDialogRef.value?.show();
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
        title="Show Sessions"
        >Genesis 1 - KJV
      </sl-button>
    </div>`;
  };
}
