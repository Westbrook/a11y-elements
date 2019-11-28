import { css } from 'lit-element';

export const style = css`
:host {
  padding: 10px;
  border: 2px solid hsl(206, 74%, 54%);
  border-radius: 4px;
  background: hsl(206, 74%, 90%);
}

:host(:empty) {
  display: none;
}
`;