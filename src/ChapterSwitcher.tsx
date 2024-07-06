import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import { bookSelectTreeDialogRef } from "./App";
import caretLeftFill from "./assets/icons/caret-left-fill.svg";
import caretRightFill from "./assets/icons/caret-right-fill.svg";
import { ViewUpdateOptions, activeViewDatum, updateView } from "./viewService";
import { activeViewId } from "./viewService";
import { bookNames, tableOfContents } from "./constants";

export function ChapterSwitcher() {
  return () => {
    const _activeViewDatum = activeViewDatum();
    const _activeViewId = activeViewId();
    let nextChapterUpdateOptions: ViewUpdateOptions | null = null;
    let prevChapterUpdateOptions: ViewUpdateOptions | null = null;
    let currentChapterTitle: string | null = null;
    let nextChapterTitle: string | null = null;
    let prevChapterTitle: string | null = null;
    if (_activeViewDatum) {
      const bookName = _activeViewDatum.bookName;
      const prevBookName = bookNames.find(
        (_, index) => bookNames[index + 1] === bookName,
      );
      const nextBookName = bookNames.find(
        (_, index) => bookNames[index - 1] === bookName,
      );
      let chapterNumber = _activeViewDatum.chapterNumber;
      if (tableOfContents[bookName][chapterNumber - 1]) {
        prevChapterUpdateOptions = {
          bookName,
          chapterNumber: chapterNumber - 1,
          verseNumber: 1,
        };
      } else if (prevBookName) {
        const lastChapterNumber = Object.keys(
          tableOfContents[prevBookName],
        ).length;
        prevChapterUpdateOptions = {
          bookName: prevBookName,
          chapterNumber: lastChapterNumber,
          verseNumber: 1,
        };
      }
      if (tableOfContents[bookName][chapterNumber + 1]) {
        nextChapterUpdateOptions = {
          bookName,
          chapterNumber: chapterNumber + 1,
          verseNumber: 1,
        };
      } else if (nextBookName) {
        nextChapterUpdateOptions = {
          bookName: nextBookName,
          chapterNumber: 1,
          verseNumber: 1,
        };
      }
      currentChapterTitle = `${_activeViewDatum.bookName} ${
        _activeViewDatum.chapterNumber
      }:${
        _activeViewDatum.verseNumber
      } - ${_activeViewDatum.versionId.toUpperCase()}`;
      nextChapterTitle = nextChapterUpdateOptions
        ? `${nextChapterUpdateOptions.bookName} ${
            nextChapterUpdateOptions.chapterNumber
          } - ${_activeViewDatum.versionId.toUpperCase()}`
        : null;
      prevChapterTitle = prevChapterUpdateOptions
        ? `${prevChapterUpdateOptions.bookName} ${
            prevChapterUpdateOptions.chapterNumber
          } - ${_activeViewDatum.versionId.toUpperCase()}`
        : null;
    }

    return html`<div
      style=${styleMap({
        paddingTop: "1.5rem",
        paddingBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      })}
    >
      <sl-button
        ?disabled=${!prevChapterUpdateOptions}
        variant="primary"
        size="small"
        circle
        outline
        title=${prevChapterTitle ? prevChapterTitle : ""}
        @click=${async () => {
          // @handled
          try {
            if (_activeViewId && prevChapterUpdateOptions) {
              await updateView(_activeViewId, prevChapterUpdateOptions);
            }
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
      >
        <sl-icon src=${caretLeftFill}></sl-icon>
      </sl-button>
      <sl-button
        ?disabled=${!_activeViewDatum}
        outline
        pill
        class="indicator"
        variant="primary"
        style=${styleMap({
          width: "calc(100% - 6rem)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0.5rem",
        })}
        title=${currentChapterTitle ? currentChapterTitle : ""}
        @click=${() => {
          // @handled
          try {
            bookSelectTreeDialogRef.value?.show();
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
        >${currentChapterTitle}
      </sl-button>
      <sl-button
        ?disabled=${!nextChapterUpdateOptions}
        variant="primary"
        size="small"
        circle
        outline
        title=${nextChapterTitle ? nextChapterTitle : ""}
        @click=${async () => {
          // @handled
          try {
            if (_activeViewId && nextChapterUpdateOptions) {
              await updateView(_activeViewId, nextChapterUpdateOptions);
            }
          } catch (error) {
            console.error(error);
            notifyWithErrorMessageAndReloadButton();
          }
        }}
      >
        <sl-icon src=${caretRightFill}></sl-icon>
      </sl-button>
    </div>`;
  };
}
