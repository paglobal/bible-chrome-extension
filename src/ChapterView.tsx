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
import { notifyWithErrorMessageAndReloadButton } from "./utils";
import chatDotsIcon from "./assets/icons/chat-dots.svg";

const chapterContainerDivRef = createRef<HTMLDivElement>();

const updateViewScrollTop = () => {
  if (canUpdateScrollTop()) {
    const _activeViewId = activeViewId();
    if (_activeViewId && chapterContainerDivRef.value) {
      const scrollTopPercent =
        chapterContainerDivRef.value.scrollTop /
        (chapterContainerDivRef.value.scrollHeight -
          chapterContainerDivRef.value.clientHeight);
      setTimeout(() => {
        updateView(_activeViewId, {
          scrollTopPercent,
        });
      });
    }
  } else {
    setCanUpdateScrollTop(true);
  }
};

export function ChapterView() {
  return () => {
    return html`<div
      ${ref(chapterContainerDivRef)}
      style=${styleMap({
        overflowY: "auto",
        height: "calc(100vh - 7.75rem - 1.5rem)",
        marginTop: "1rem",
      })}
      @scrollend=${updateViewScrollTop}
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
                if (
                  isCurrentVerse &&
                  activeViewDatum()?.scrollTopPercent === null
                ) {
                  verseDiv?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                } else if (
                  index === displayedVerses().length - 1 &&
                  chapterContainerDivRef.value
                ) {
                  if (typeof activeViewDatum()?.scrollTopPercent === "number") {
                    const scrollTopPercent =
                      chapterContainerDivRef.value.scrollTop /
                      (chapterContainerDivRef.value.scrollHeight -
                        chapterContainerDivRef.value.clientHeight);
                    if (
                      Math.abs(
                        scrollTopPercent -
                          (activeViewDatum()?.scrollTopPercent ?? 0),
                      ) >= 0.02
                    ) {
                      chapterContainerDivRef.value?.scrollTo({
                        top:
                          (activeViewDatum()?.scrollTopPercent ?? 0) *
                          (chapterContainerDivRef.value.scrollHeight -
                            chapterContainerDivRef.value.clientHeight),
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
                ? "0.15rem solid var(--sl-color-primary-600)"
                : undefined,
              borderRadius: "0.5rem",
              padding: "0.5rem",
            })}
          >
            <span
              style=${styleMap({
                fontSize: "var(--sl-font-size-small)",
                color: isCurrentVerse
                  ? "var(--sl-color-primary-600)"
                  : "var(--sl-color-neutral-600)",
                marginRight: "var(--sl-spacing-2x-small)",
                display: "inline-block",
                transform: "translate(0, -0.5rem)",
                cursor: "pointer",
                borderBottom: isCurrentVerse
                  ? "0.1rem solid var(--sl-color-primary-600)"
                  : "0.1rem solid",
              })}
              @click=${() => {
                // @handled
                try {
                  const _activeViewId = activeViewId();
                  if (_activeViewId) {
                    updateView(_activeViewId, {
                      verseNumber: verse.verseNumber,
                      scrollTopPercent: null,
                    });
                  }
                } catch (error) {
                  console.error(error);
                  notifyWithErrorMessageAndReloadButton();
                }
              }}
              >${index + 1}</span
            >
            ${verse.text
              .replaceAll("\u00b6", "")
              .replaceAll("\u2039", "")
              .replaceAll("\u203a", "")}
            <sl-icon-button
              src=${chatDotsIcon}
              title="References"
              @click=${() => {
                // @handled
                try {
                } catch (error) {
                  console.error(error);
                  notifyWithErrorMessageAndReloadButton();
                }
              }}
            ></sl-icon-button>
          </div>
        `;
      })}
    </div>`;
  };
}
