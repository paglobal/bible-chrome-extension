import tableOfContents_json from "./assets/data/table-of-contents.json";
import crossReferences_json from "./assets/data/cross-references.json";
import strongsHebrewDictionary_json from "./assets/data/strongs-hebrew-dictionary.json";
import strongsGreekDictionary_json from "./assets/data/strongs-greek-dictionary.json";

export const tableOfContents = tableOfContents_json as Record<
  string,
  Record<number, { startIndex: number; endIndex: number; verseCount: number }>
>;

export const bookNames = Object.keys(tableOfContents);

type VersionData = Array<{
  displayName: string;
  id: string;
  hasStrongs: boolean;
}>;

export type VersionId = VersionData[number]["id"];

export const versionData: VersionData = [
  {
    displayName: "KJV - Authorized King James Version",
    id: "kjv",
    hasStrongs: true,
  },
  {
    displayName: "ASV - American Strandard Version",
    id: "asv",
    hasStrongs: true,
  },
  { displayName: "WEB - Word English Bible", id: "web", hasStrongs: false },
];

export type AreaName = "local";

export type LocalStorageKey = `local-${number}`;

export const localStorageKeys = {
  viewData: "local-1",
  activeViewId: "local-2",
} as const satisfies Record<string, LocalStorageKey>;

type LockName = `lock-${number}`;

export const lockNames = {
  viewData: "lock-1",
} as const satisfies Record<string, LockName>;

export const delayTimeInMs = 200;

export {
  crossReferences_json,
  strongsHebrewDictionary_json,
  strongsGreekDictionary_json,
};
