import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { SlSelect, SlSelectEvent } from "@shoelace-style/shoelace";
import { activeViewId, currentVersionDatum, updateView } from "./viewService";
import { versionData } from "./constants";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import { bookSelectTreeDialogRef } from "./App";

export function VersionSwitcher() {
  return () =>
    html`<sl-select
      value=${currentVersionDatum()?.id ?? versionData[0].id}
      style=${styleMap({
        margin: "0.5rem 0 1rem 0",
      })}
      @sl-change=${async (e: SlSelectEvent) => {
        try {
          const _activeViewId = activeViewId();
          if (_activeViewId) {
            await updateView(_activeViewId, {
              versionId: (e.target as SlSelect).value as string,
              scrollTop: null,
            });
          }
          bookSelectTreeDialogRef.value?.hide();
        } catch (error) {
          console.error(error);
          notifyWithErrorMessageAndReloadButton();
        }
      }}
    >
      ${versionData.map(
        (versionDatum) => html`
          <sl-option value=${versionDatum.id}
            >${versionDatum.displayName}</sl-option
          >
        `,
      )}
    </sl-select>`;
}
