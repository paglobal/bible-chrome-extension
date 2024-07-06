import { Tree } from "./Tree";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import {
  activeViewId,
  selectedBookName,
  selectedChapterNumber,
  selectedChapterVerseCount,
  selectedVerseNumber,
  setSelectedVerseNumber,
  updateView,
} from "./viewService";
import { TreeItem } from "./TreeItem";
import {
  bookSelectTreeDialogRef,
  chapterSelectTreeDialogRef,
  verseSelectTreeDialogRef,
} from "./App";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import { html } from "lit";
import { TreeItemIcon } from "./TreeItemIcon";
import lucideScrollTextIcon from "./assets/icons/LucideScrollText.svg";

export function VerseSelectTree() {
  return () => (
    <Tree
      contentFn={() =>
        map(range(selectedChapterVerseCount()), (i) => {
          i = i + 1;

          return (
            <TreeItem
              tooltipContent={i.toString()}
              onSelect={(e: Event) => {
                try {
                  e.stopPropagation();
                  setSelectedVerseNumber(i);
                  verseSelectTreeDialogRef.value?.hide();
                  chapterSelectTreeDialogRef.value?.hide();
                  bookSelectTreeDialogRef.value?.hide();
                  const _activeViewId = activeViewId();
                  if (_activeViewId) {
                    updateView(_activeViewId, {
                      bookName: selectedBookName(),
                      chapterNumber: selectedChapterNumber(),
                      verseNumber: selectedVerseNumber(),
                      scrollTop: null,
                    });
                  } else {
                    // @handle
                  }
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
