import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import plugLgIcon from "./assets/icons/plus-lg.svg";
import searchIcon from "./assets/icons/search.svg";
import xLgIcon from "./assets/icons/x-lg.svg";
import bookmarksIcon from "./assets/icons/bookmarks.svg";
import windowStackIcon from "./assets/icons/window-stack.svg";

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
          paddingTop: "0.5rem",
        })}
      >
        <sl-icon-button
          src=${plugLgIcon}
          title="New Tab"
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
          title="Search"
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
          src=${xLgIcon}
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
