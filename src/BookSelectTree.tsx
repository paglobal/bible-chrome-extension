import { html } from "lit";
import { chapterSelectTreeDialogRef } from "./App";
import { Tree } from "./Tree";
import { TreeItem } from "./TreeItem";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import {
  setSelectedBookName,
  setSelectedChapterNumber,
  setSelectedVerseNumber,
} from "./viewService";
import { TreeItemIcon } from "./TreeItemIcon";
import lucideScrollTextIcon from "./assets/icons/LucideScrollText.svg";
import { bookNames } from "./constants";

export function BookSelectTree() {
  return () => (
    <Tree
      contentFn={() =>
        bookNames.map((bookName) => {
          return (
            <TreeItem
              tooltipContent={bookName}
              onSelect={(e: Event) => {
                try {
                  e.stopPropagation();
                  setSelectedVerseNumber(1);
                  setSelectedChapterNumber(1);
                  setSelectedBookName(bookName);
                  chapterSelectTreeDialogRef.value?.show();
                } catch (error) {
                  console.error(error);
                  notifyWithErrorMessageAndReloadButton();
                }
              }}
            >
              {html`${(<TreeItemIcon iconUrl={lucideScrollTextIcon} />)}`}
              {bookName}
            </TreeItem>
          );
        })
      }
    />
  );
}
