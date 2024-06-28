import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import plusLgIcon from "./assets/icons/plus-lg.svg";
import searchIcon from "./assets/icons/search.svg";
import xLgIcon from "./assets/icons/x-lg.svg";
import bookmarksIcon from "./assets/icons/bookmarks.svg";
import windowStackIcon from "./assets/icons/window-stack.svg";
import boxArrowInUpRight from "./assets/icons/box-arrow-in-up-right.svg";

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
          src=${boxArrowInUpRight}
          title="Open In New View"
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
