import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";

export function ChapterView() {
  return () =>
    html`<div
      style=${styleMap({
        overflowY: "auto",
        height: "calc(100vh - 7.75rem - 1.5rem)",
        marginTop: "1rem",
      })}
    >
      ${map(
        range(8),
        (_, index) => html`
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
            In the beginning was the Word, and the Word was with God and the
            Word was God. In the beginning was the Word, and the Word was with
            God and the Word was God.
          </div>
        `,
      )}
    </div>`;
}
