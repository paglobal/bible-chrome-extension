import { html } from "lit";
import { Ref, ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import { SlDialog } from "@shoelace-style/shoelace";
import { PromethiumNode } from "promethium-js";
import { notifyWithErrorMessageAndReloadButton } from "./utils";

export function Dialog(props: {
  label: string;
  children: PromethiumNode;
  ref: Ref<SlDialog>;
  fullWidth?: boolean;
  noTopBodyMargin?: boolean;
}) {
  const bodyMargins = {
    top: props.noTopBodyMargin ? "0" : "1rem",
    right: props.fullWidth ? "1rem" : "2rem",
    left: props.fullWidth ? "1rem" : "2rem",
    bottom: "1rem",
  };
  setTimeout(
    () =>
      props.ref.value?.shadowRoot?.addEventListener(
        "scroll",
        (e: Event) => console.log((e.target as HTMLElement).scrollTop),
        true,
      ),
  );

  return () => html`
    <sl-dialog
      label=${props.label}
      ${ref(props.ref)}
      style=${styleMap({
        fontSize: "1rem",
        color: "var(--sl-color-neutral-800)",
        "--header-spacing": "1rem",
        "--body-spacing": `${bodyMargins.top} ${bodyMargins.right} ${bodyMargins.bottom} ${bodyMargins.left}`,
      })}
      @sl-hide=${() => {
        // @handled
        try {
          const dialogBody =
            props.ref.value?.shadowRoot?.querySelector('[part="body"]');
          dialogBody?.scrollTo({ top: 0, behavior: "instant" });
        } catch (error) {
          console.error(error);
          notifyWithErrorMessageAndReloadButton();
        }
      }}
    >
      <div
        style=${styleMap({
          paddingBottom: "0.8rem",
        })}
      >
        ${props.children}
      </div>
    </sl-dialog>
  `;
}
