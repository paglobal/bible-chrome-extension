import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import {
  activeViewDatum,
  activeViewId,
  canUpdateScrollTop,
  displayedVerses,
  setCanUpdateScrollTop,
  updateView,
} from "./viewService";
import { createRef, ref } from "lit/directives/ref.js";
import { adaptEffect } from "promethium-js";
import { debounce } from "./utils";
import { delayTimeInMs } from "./constants";

const chapterContainerDivRef = createRef<HTMLDivElement>();

const updateViewScrollTop = debounce(() => {
  if (canUpdateScrollTop()) {
    const _activeViewId = activeViewId();
    if (_activeViewId) {
      setTimeout(() => {
        updateView(_activeViewId, {
          scrollTop: chapterContainerDivRef.value?.scrollTop,
        });
      });
    }
  } else {
    setCanUpdateScrollTop(true);
  }
}, delayTimeInMs);

export function ChapterView() {
  return () => {
    return html`<div
      ${ref(chapterContainerDivRef)}
      style=${styleMap({
        overflowY: "auto",
        height: "calc(100vh - 7.75rem - 1.5rem)",
        marginTop: "1rem",
      })}
      @scroll=${updateViewScrollTop}
    >
      ${displayedVerses().map((verse, index) => {
        let isCurrentVerse = false;
        if (
          activeViewDatum()?.bookName === verse.bookName &&
          activeViewDatum()?.chapterNumber === verse.chapterNumber &&
          activeViewDatum()?.verseNumber === verse.verseNumber
        ) {
          isCurrentVerse = true;
        }

        return html`
          <div
            ${ref((verseDiv) => {
              setTimeout(() => {
                if (isCurrentVerse && activeViewDatum()?.scrollTop === null) {
                  verseDiv?.scrollIntoView({
                    behavior: "instant",
                    block: "start",
                    inline: "nearest",
                  });
                } else if (index === displayedVerses().length - 1) {
                  if (typeof activeViewDatum()?.scrollTop === "number") {
                    if (
                      chapterContainerDivRef.value?.scrollTop !==
                      activeViewDatum()?.scrollTop
                    ) {
                      chapterContainerDivRef.value?.scrollTo({
                        top: activeViewDatum()?.scrollTop ?? 0,
                        behavior: "instant",
                      });
                    } else {
                      setCanUpdateScrollTop(true);
                    }
                  }
                }
              });
            })}
            style=${styleMap({
              fontSize: "var(--sl-font-size-medium)",
              lineHeight: "150%",
              color: "var(--sl-color-neutral-800)",
              marginTop: "1rem",
              border: isCurrentVerse
                ? "0.2rem solid var(--sl-color-primary-600)"
                : undefined,
              borderRadius: "1rem",
              padding: "0.5rem",
            })}
          >
            <span
              style=${styleMap({
                fontSize: "var(--sl-font-size-small)",
                color: "var(--sl-color-neutral-600)",
                marginRight: "var(--sl-spacing-2x-small)",
                display: "inline-block",
                transform: "translate(0, -0.5rem)",
              })}
              >${index + 1}</span
            >
            ${verse.text
              .replaceAll("\u00b6", "")
              .replaceAll("\u2039", "")
              .replaceAll("\u203a", "")}
          </div>
        `;
      })}
    </div>`;
  };
}
