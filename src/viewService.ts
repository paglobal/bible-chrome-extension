import { adaptMemo, adaptRenderEffect, adaptState } from "promethium-js";
import {
  VersionId,
  bookNames,
  localStorageKeys,
  lockNames,
  tableOfContents,
} from "./constants";
import {
  getStorageData,
  setStorageData,
  subscribeToStorageData,
} from "./utils";

type Version = {
  metadata: {
    description: string;
    copyright_statement: string;
  };
  verses: Array<{
    book_name: string;
    book: number;
    chapter: number;
    verse: number;
    text: string;
  }>;
};

export type Verse = Version["verses"][number];

export type ViewData = Array<
  {
    id: `${number}-${number}`;
    scrollTop: number;
    strongsEnabled: boolean;
    versionId: VersionId;
  } & Omit<Verse, "book" | "text">
>;

type ViewDatum = ViewData[number];

export type ViewId = ViewDatum["id"];

export const [viewData, setViewData] = adaptState<ViewData>([]);
export const [activeViewId, setActiveViewId] = adaptState<ViewId | null>(null);
export const activeViewDatum = adaptMemo(
  () => viewData().find((viewDatum) => activeViewId() === viewDatum.id) ?? null,
);
export const [versionChanged, setVersionChanged] = adaptState(true);
export const [version, setVersion] = adaptState<Version | null>(null);
export const [showSpinner, setShowSpinner] = adaptState(true);
export const displayedVerses = adaptMemo(() => {
  const _activeViewDatum = activeViewDatum();
  if (_activeViewDatum) {
    const chapterDatum =
      tableOfContents[_activeViewDatum.book_name][_activeViewDatum.chapter];

    const _version = version();
    if (_version) {
      const verses = [];
      for (let i = chapterDatum.startIndex; i <= chapterDatum.endIndex; i++) {
        const verse = _version.verses[i];
        verses.push(verse);
      }

      return verses;
    }
  }

  return [];
});

adaptRenderEffect(async () => {
  // @error
  const _activeViewDatum = activeViewDatum();
  if (_activeViewDatum && versionChanged()) {
    const response = await fetch(
      `./assets/data/${_activeViewDatum.versionId}${
        _activeViewDatum.strongsEnabled ? "-strongs" : ""
      }.json`,
    );
    setVersion((await response.json()) as Version);
  }
  setShowSpinner(false);
});

subscribeToStorageData<ViewData>(localStorageKeys.viewData, async () => {
  // @error
  await navigator.locks.request(lockNames.viewData, async () => {
    // @error
    const prevActiveViewDatum = activeViewDatum();
    // get storage data anew instead of using provided value to make sure we always have the most up-to-date values
    const newViewData =
      (await getStorageData<ViewData>(localStorageKeys.viewData)) ?? [];
    if (!newViewData.some((viewDatum) => viewDatum.id === activeViewId())) {
      const prevActiveViewDatumIndex = viewData()?.findIndex(
        (viewDatum) => viewDatum.id === activeViewId(),
      );
      if (prevActiveViewDatumIndex && prevActiveViewDatumIndex !== -1) {
        if (prevActiveViewDatumIndex === viewData().length) {
          setActiveViewId(viewData()[prevActiveViewDatumIndex - 1].id);
        } else {
          setActiveViewId(viewData()[prevActiveViewDatumIndex].id);
        }
      }
    }
    if (!newViewData.length) {
      const newViewData = [generateViewDatum()];
      setViewData(newViewData);
      await setStorageData<ViewData>(localStorageKeys.viewData, newViewData);
    } else {
      setViewData(newViewData);
    }
    if (!viewData().some((viewDatum) => viewDatum.id === activeViewId())) {
      setActiveViewId(viewData()[0].id);
    }
    if (prevActiveViewDatum?.versionId !== activeViewDatum()?.versionId) {
      setVersionChanged(true);
    } else {
      setVersionChanged(false);
    }
  });
});

export function viewId(): ViewId {
  return `${Date.now()}-${Math.random() * Math.pow(10, 16)}`;
}

export function generateViewDatum(
  verse?: Verse,
  versionId?: VersionId,
): ViewDatum {
  return {
    id: viewId(),
    versionId: versionId ?? "kjv",
    book_name: verse?.book_name ?? bookNames[0],
    chapter: verse?.chapter ?? 1,
    verse: verse?.verse ?? 1,
    scrollTop: 0,
    strongsEnabled: false,
  };
}

export async function createView(
  verse?: Verse,
  versionId?: VersionId,
  index?: number,
) {
  await navigator.locks.request(lockNames.viewData, async () => {
    const viewDatum = generateViewDatum(verse, versionId);
    // get storage data anew instead of using state value to make sure we always have the most up-to-date values
    const viewData =
      (await getStorageData<ViewData>(localStorageKeys.viewData)) ?? [];
    if (index) {
      await setStorageData<ViewData>(localStorageKeys.viewData, [
        ...viewData.slice(0, index),
        viewDatum,
        ...viewData.slice(index + 1),
      ]);
    } else {
      await setStorageData<ViewData>(localStorageKeys.viewData, [
        ...viewData,
        viewDatum,
      ]);
    }
  });
}

export async function deleteView(viewId: ViewId) {
  await navigator.locks.request(lockNames.viewData, async () => {
    // get storage data anew instead of using state value to make sure we always have the most up-to-date values
    const viewData =
      (await getStorageData<ViewData>(localStorageKeys.viewData)) ?? [];
    const newViewData = viewData.filter((viewDatum) => viewDatum.id !== viewId);
    await setStorageData<ViewData>(localStorageKeys.viewData, newViewData);
  });
}

type ViewUpdateOptions = Omit<Partial<ViewDatum>, "id">;

export async function updateView(viewId: ViewId, options: ViewUpdateOptions) {
  await navigator.locks.request(lockNames.viewData, async () => {
    // get storage data anew instead of using state value to make sure we always have the most up-to-date values
    const viewData =
      (await getStorageData<ViewData>(localStorageKeys.viewData)) ?? [];
    const newViewData = viewData.map((viewDatum) => {
      if (viewDatum.id !== viewId) {
        return viewDatum;
      } else {
        const newViewDatum = { ...viewDatum };
        Object.entries(options).forEach(([key, value]) => {
          if (newViewDatum[key as keyof ViewUpdateOptions]) {
            (newViewDatum[
              key as keyof ViewUpdateOptions
            ] as ViewDatum[keyof ViewDatum]) = value;
          }
        });

        return newViewDatum;
      }
    });
    await setStorageData<ViewData>(localStorageKeys.viewData, newViewData);
  });
}
