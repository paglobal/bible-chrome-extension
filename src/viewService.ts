import { adaptMemo, adaptRenderEffect, adaptState } from "promethium-js";
import {
  VersionId,
  bookNames,
  localStorageKeys,
  lockNames,
  tableOfContents,
  versionData,
} from "./constants";
import {
  getStorageData,
  notifyWithErrorMessageAndReloadButton,
  setStorageData,
  subscribeToStorageData,
} from "./utils";

type Version = {
  metadata: {
    description: string;
    copyright_statement: string;
  };
  verses: Array<{
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    text: string;
  }>;
};

export type Verse = Version["verses"][number];

export type ViewData = Array<
  {
    id: `${number}-${number}`;
    scrollTopPercent: number | null;
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
export const [currentVersion, setCurrentVersion] = adaptState<Version | null>(
  null,
);
export const currentVersionDatum = adaptMemo(
  () =>
    versionData.find(
      (versionDatum) => versionDatum.id === activeViewDatum()?.versionId,
    ) ?? null,
);
export const displayedVerses = adaptMemo(() => {
  const _activeViewDatum = activeViewDatum();
  if (_activeViewDatum) {
    const chapterDatum =
      tableOfContents[_activeViewDatum.bookName][
        _activeViewDatum.chapterNumber
      ];
    const _currentVersion = currentVersion();
    if (_currentVersion) {
      const verses = [];
      for (let i = chapterDatum.startIndex; i <= chapterDatum.endIndex; i++) {
        const verse = _currentVersion.verses[i];
        verses.push(verse);
      }

      return verses;
    }
  }

  return [];
});
export const [selectedBookName, setSelectedBookName] = adaptState(bookNames[0]);
export const selectedBookChapterCount = adaptMemo(
  () => Object.keys(tableOfContents[selectedBookName()]).length,
);
export const [selectedChapterNumber, setSelectedChapterNumber] = adaptState(1);
export const selectedChapterVerseCount = adaptMemo(
  () => tableOfContents[selectedBookName()][selectedChapterNumber()].verseCount,
);
export const [selectedVerseNumber, setSelectedVerseNumber] = adaptState(1);
export const [canUpdateScrollTop, setCanUpdateScrollTop] = adaptState(false);

adaptRenderEffect(async () => {
  // @handled
  try {
    const _activeViewDatum = activeViewDatum();
    if (_activeViewDatum) {
      if (versionChanged()) {
        const response = await fetch(
          `./assets/data/${_activeViewDatum.versionId}${
            _activeViewDatum.strongsEnabled && currentVersionDatum()?.hasStrongs
              ? "-strongs"
              : ""
          }.json`,
        );
        setCurrentVersion((await response.json()) as Version);
      }
      const currentVerseTitle = `${_activeViewDatum.bookName} ${
        _activeViewDatum.chapterNumber
      }:${
        _activeViewDatum.verseNumber
      } - ${_activeViewDatum.versionId.toUpperCase()}`;
      document.title = currentVerseTitle;
    }
  } catch (error) {
    console.error(error);
    notifyWithErrorMessageAndReloadButton();
  }
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
        // @review
        setActiveViewId(
          newViewData[prevActiveViewDatumIndex]?.id ??
            newViewData[newViewData.length - 1].id,
        );
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
      setActiveViewId(viewData()[viewData().length - 1].id);
    }
    if (
      prevActiveViewDatum?.versionId !== activeViewDatum()?.versionId ||
      prevActiveViewDatum?.strongsEnabled !== activeViewDatum()?.strongsEnabled
    ) {
      setVersionChanged(true);
    } else {
      setVersionChanged(false);
    }
    if (activeViewDatum()?.scrollTopPercent === null) {
      setCanUpdateScrollTop(false);
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
    bookName: verse?.bookName ?? bookNames[0],
    chapterNumber: verse?.chapterNumber ?? 1,
    verseNumber: verse?.verseNumber ?? 1,
    scrollTopPercent: null,
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

export type ViewUpdateOptions = Omit<Partial<ViewDatum>, "id">;

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
          if (newViewDatum[key as keyof ViewUpdateOptions] !== undefined) {
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
