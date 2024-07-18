import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import plusLgIcon from "./assets/icons/plus-lg.svg";
import searchIcon from "./assets/icons/search.svg";
import xCircleIcon from "./assets/icons/x-circle.svg";
import plusCircleIcon from "./assets/icons/plus-circle.svg";
import bookmarksIcon from "./assets/icons/bookmarks.svg";
import windowStackIcon from "./assets/icons/window-stack.svg";
import {
  activeViewDatum,
  activeViewId,
  currentVersionDatum,
  updateView,
} from "./viewService";
import { SlSwitch } from "@shoelace-style/shoelace";

export function Toolbar() {
  return () =>
    html` <div
      style=${styleMap({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      })}
    >
      <sl-button-group
        label="Tools"
        style=${styleMap({
          fontSize: "1rem",
        })}
      >
        <sl-switch
          title="Toggle Strongs"
          style=${styleMap({
            display: "flex",
            alignItems: "center",
            "--width": "1.5rem",
            "--height": "0.80rem",
            "--thumb-size": "0.72rem",
            paddingBottom: "0.2rem",
            marginRight: "-0.1rem",
          })}
          ?disabled=${!currentVersionDatum()?.hasStrongs}
          ?checked=${currentVersionDatum()?.hasStrongs &&
          activeViewDatum()?.strongsEnabled}
          @sl-change=${async (e: Event) => {
            const _activeViewId = activeViewId();
            if (_activeViewId) {
              await updateView(_activeViewId, {
                strongsEnabled: (e.target as SlSwitch).checked,
              });
            }
          }}
        ></sl-switch>
        <sl-icon-button
          src=${plusLgIcon}
          title="New Tab"
          @click=${() => {
            // @handled
            try {
              chrome.tabs.create({ url: "./index.html" });
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
        <sl-icon-button
          src=${plusCircleIcon}
          title="New View"
          @click=${() => {
            // @handled
            try {
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
        <sl-icon-button
          src=${windowStackIcon}
          title="Switch View"
          @click=${async () => {
            // @handled
            try {
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
        <sl-icon-button
          src=${bookmarksIcon}
          title="Bookmarks"
          @click=${() => {
            // @handled
            try {
              //importTabGroupFromSessionTreeDialogRef.value?.show();
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
        <sl-icon-button
          src=${searchIcon}
          title="Search Scripture"
          @click=${() => {
            // @handled
            try {
              // addTabGroupDialogRef.value?.show();
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
        <sl-icon-button
          src=${xCircleIcon}
          title="Close View"
          @click=${() => {
            // @handled
            try {
              //helpDialogRef.value?.show();
            } catch (error) {
              console.error(error);
              notifyWithErrorMessageAndReloadButton();
            }
          }}
        ></sl-icon-button>
      </sl-button-group>
    </div>`;
}
