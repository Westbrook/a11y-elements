import { css } from 'https://cdn.pika.dev/lit-element/v2';

export const styles = css`
:host {
  list-style: none;
  margin: 0;
  padding: 0;
}

:host {
  display: inline-flex;
  position: relative;
}

::slotted([aria-haspopup="true"])::after {
  content: var(--arrow-down);
  padding-left: 0.25em;
}

:host([direction="right"]) ::slotted([aria-haspopup="true"])::after {
  content: var(--arrow-right);
  padding-left: 0.25em;
}

::slotted([role="menuitem"]) {
  display: inline-block;
  padding: 0.25em;
  background-color: #eee;
  border: 2px solid #eee;
  width: 100%;
}

::slotted([role="menuitem"]:focus),
::slotted([role="menuitem"]:hover) {
  background-color: black;
  color: white;
  z-index: 1;
}

::slotted([role="menuitem"]) {
  text-decoration: none;
  color: black;
}

:host([direction="right"]) ::slotted([slot="children"]) {
  left: 100%;
  top: 0;
}
`;