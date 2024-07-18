import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { activeViewDatum, displayedVerses } from "./viewService";
import { createRef, ref } from "lit/directives/ref.js";

export function ChapterView() {
  const currentVerseDivRef = createRef<HTMLDivElement>();

  return () => {
    const _activeViewDatum = activeViewDatum();

    return html`<div
      style=${styleMap({
        overflowY: "auto",
        height: "calc(100vh - 7.75rem - 1.5rem)",
        marginTop: "1rem",
      })}
    >
      ${displayedVerses().map((verse, index) => {
        return html`
          <div
            ${ref(currentVerseDivRef)}
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
            ${verse.text
              .replaceAll("\u00b6", "")
              .replaceAll("\u2039", "")
              .replaceAll("\u203a", "")}
          </div>
        `;
      })}
    </div>`;
  };
}
