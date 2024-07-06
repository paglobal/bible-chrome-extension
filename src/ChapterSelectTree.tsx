import { html } from "lit";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import {
  selectedBookChapterCount,
  setSelectedChapterNumber,
  setSelectedVerseNumber,
} from "./viewService";
import { Tree } from "./Tree";
import { TreeItem } from "./TreeItem";
import { TreeItemIcon } from "./TreeItemIcon";
import { verseSelectTreeDialogRef } from "./App";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import lucideScrollTextIcon from "./assets/icons/LucideScrollText.svg";

export function ChapterSelectTree() {
  return () => (
    <Tree
      contentFn={() =>
        map(range(selectedBookChapterCount()), (i) => {
          i = i + 1;

          return (
            <TreeItem
              tooltipContent={i.toString()}
              onSelect={(e: Event) => {
                try {
                  e.stopPropagation();
                  setSelectedVerseNumber(1);
                  setSelectedChapterNumber(i);
                  verseSelectTreeDialogRef.value?.show();
                } catch (error) {
                  console.error(error);
                  notifyWithErrorMessageAndReloadButton();
                }
              }}
            >
              {html`${(<TreeItemIcon iconUrl={lucideScrollTextIcon} />)}`}
              {i}
            </TreeItem>
          );
        })
      }
    />
  );
}
