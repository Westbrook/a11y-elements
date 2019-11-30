import { css } from 'https://cdn.pika.dev/lit-element/v2';

export const styles = css`
:host {
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 100%;
}
::slotted(a11y-menuitem) {
  width: 10em;
}
::slotted([role="separator"]) {
  padding: 0.25em;
  border: 2px solid #eee;
  padding-top: 0.15em;
  background-color: #eee;
  background-image: var(--separator);
  background-position: center;
  background-repeat: repeat-x;
}
`;