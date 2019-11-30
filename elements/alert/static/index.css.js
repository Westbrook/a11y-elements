import { css } from 'https://cdn.pika.dev/lit-element/v2';

export const styles = css`
:host {
  display: block;
  padding: 10px;
  border: 2px solid hsl(206, 74%, 54%);
  border-radius: 4px;
  background: hsl(206, 74%, 90%);
}

:host(:empty) {
  display: none;
}
`;