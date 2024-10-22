import { SlAlert } from "@shoelace-style/shoelace";
import { type LocalStorageKey, AreaName } from "./constants";
import infoCircleIcon from "./assets/icons/info-circle.svg";
import exclamationCircleIcon from "./assets/icons/exclamation-circle.svg";
import check2CircleIcon from "./assets/icons/check2-circle.svg";
import exclamationTriangleIcon from "./assets/icons/exclamation-triangle.svg";
import arrowClockwiseIcon from "./assets/icons/arrow-clockwise.svg";

// copied from "https://shoelace.style/components/alert" and slightly modified
export function notify(
  message: string,
  variant: Exclude<SlAlert["variant"], "neutral"> = "danger",
  duration: number = 3000,
) {
  const iconUrls = {
    danger: exclamationCircleIcon,
    success: check2CircleIcon,
    primary: infoCircleIcon,
    warning: exclamationTriangleIcon,
  };
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration,
    innerHTML: `<sl-icon src="${iconUrls[variant]}" slot="icon"></sl-icon>${message}`,
  });
  document.body.append(alert);
  alert.toast();
}

export function notifyWithErrorMessageAndReloadButton() {
  const errorMessage =
    "Error occurred while executing action. You can click the button below to attempt to recover.";
  const reloadButtonHTML = `<sl-icon-button src="${arrowClockwiseIcon}" title="Reload UI" class="reload-button"></sl-icon-button>`;
  const fullMessageContent = `<div>${errorMessage}</div><div style="display: flex; justify-content: center; align-items: center;">${reloadButtonHTML}</div>`;
  notify(fullMessageContent, "danger", 6000);
  document
    .querySelectorAll(".reload-button")
    .forEach((button) =>
      button.addEventListener("click", () => location.reload()),
    );
}

export async function getStorageData<T = unknown>(key: LocalStorageKey) {
  const areaName = key.split("-")[0] as AreaName;

  return (await chrome.storage[areaName].get(key))[key] as T | undefined;
}

export async function setStorageData<T = unknown>(
  key: LocalStorageKey,
  value: T,
) {
  const areaName = key.split("-")[0] as AreaName;
  chrome.storage[areaName].set({ [key]: value });
}

export async function subscribeToStorageData<T = unknown>(
  key: LocalStorageKey,
  fn: (changes: { newValue: T | undefined; oldValue: T | undefined }) => void,
) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    const keyAreaName = key.split("-")[0] as AreaName;
    if (areaName === keyAreaName) {
      const newStorageData = changes[key]?.newValue;
      const oldStorageData = changes[key]?.oldValue;
      if (newStorageData !== undefined || oldStorageData !== undefined) {
        fn({ newValue: newStorageData, oldValue: oldStorageData });
      }
    }
  });
}

export function debounce(callback: () => void, timeout: number) {
  let timeoutId: number | undefined | NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, timeout);
  };
}
