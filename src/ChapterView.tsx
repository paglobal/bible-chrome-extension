import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { displayedVerses } from "./viewService";

export function ChapterView() {
  return () =>
    html`<div
      style=${styleMap({
        overflowY: "auto",
        height: "calc(100vh - 7.75rem - 1.5rem)",
        marginTop: "1rem",
      })}
    >
      ${displayedVerses().map(
        (verse, index) => html`
          <div
            style=${styleMap({
              fontSize: "var(--sl-font-size-medium)",
              lineHeight: "150%",
              color: "var(--sl-color-neutral-800)",
              marginTop: "1rem",
            })}
          >
            <span
              style=${styleMap({
                fontSize: "var(--sl-font-size-small)",
                color: "var(--sl-color-neutral-600)",
                marginRight: "var(--sl-spacing-2x-small)",
                display: "inline-block",
                transform: "translate(0, -0.5rem)",
              })}
              >${index + 1}</span
            >
            ${verse.text.replace("\u00b6", "")}
          </div>
        `,
      )}
    </div>`;
}
