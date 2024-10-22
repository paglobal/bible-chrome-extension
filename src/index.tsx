import { render } from "lit";
import App from "./App";
import "./index.css";
import { getStorageData, setStorageData } from "./utils";
import {
  ViewData,
  ViewId,
  generateViewDatum,
  setActiveViewId,
  setViewData,
  viewData,
} from "./viewService";
import { localStorageKeys, lockNames } from "./constants";
import "./customElements";

(async function () {
  // @error
  await navigator.locks.request(lockNames.viewData, async () => {
    // @error
    const initialViewData =
      (await getStorageData<ViewData>(localStorageKeys.viewData)) ?? [];
    if (!initialViewData.length) {
      const newViewData = [generateViewDatum()];
      setViewData(newViewData);
      await setStorageData<ViewData>(localStorageKeys.viewData, newViewData);
    } else {
      setViewData(initialViewData);
    }
    const initialActiveViewId = await getStorageData<ViewId>(
      localStorageKeys.activeViewId,
    );
    if (
      !initialActiveViewId ||
      !viewData()?.some((viewDatum) => viewDatum.id === initialActiveViewId)
    ) {
      const newActiveViewId = viewData()[0].id;
      setActiveViewId(newActiveViewId);
      await setStorageData<ViewId>(
        localStorageKeys.activeViewId,
        newActiveViewId,
      );
    } else {
      setActiveViewId(initialActiveViewId);
    }
  });
  // auto light/dark mode based on user preferences
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("sl-theme-dark");
    } else {
      document.documentElement.classList.remove("sl-theme-dark");
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("sl-theme-dark");
        } else {
          document.documentElement.classList.remove("sl-theme-dark");
        }
      });
  }
  render(<App />, document.body);
})();
