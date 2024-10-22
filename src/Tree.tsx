import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { SlSelectionChangeEvent } from "@shoelace-style/shoelace";
import { notifyWithErrorMessageAndReloadButton } from "./utils";

export function Tree(props: {
  contentFn: () => unknown;
  fullHeight?: boolean;
}) {
  return () => {
    return html`
      <sl-tree
        style=${styleMap({
          "--indent-guide-width": "1px",
          overflowY: "auto",
        })}
        selection="leaf"
        tabindex="-1"
        @sl-selection-change=${(e: SlSelectionChangeEvent) => {
          // @handled
          try {
            e.detail.selection.forEach((treeItem) => treeItem.click());
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
      >
        ${props.contentFn()}
      </sl-tree>
    `;
  };
}
