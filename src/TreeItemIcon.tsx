import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";

export function TreeItemIcon(props: { icon: string }) {
  return () => {
    return html`
      <sl-icon
        name=${props.icon}
        style=${styleMap({
          width: "1.4rem",
          height: "1.4rem",
          marginRight: "0.8rem",
          borderRadius: "0.3rem",
        })}
      ></sl-icon>
    `;
  };
}
