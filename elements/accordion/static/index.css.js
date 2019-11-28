import { css } from 'https://cdn.pika.dev/lit-element/v2';

export const styles = css`
:host {
  display: block;
  margin: 0;
  padding: 0;
  border: 2px solid hsl(0, 0%, 82%);
  border-radius: 7px;
  width: 20em;
}

:host(:focus-within) {
  border-color: hsl(216, 94%, 73%);
}

:host(:focus-within) .Accordion-trigger {
  background-color: hsl(0, 0%, 97%);
}

:host > * + * {
  border-top: 1px solid hsl(0, 0%, 82%);
}

.Accordion-trigger {
  background: none;
  color: hsl(0, 0%, 13%);
  display: block;
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
  padding: 1em 1.5em;
  position: relative;
  text-align: left;
  width: 100%;
  outline: none;
}

:host(:focus-within) .Accordion-trigger:focus,
.Accordion-trigger:hover,
:host(:focus-within) .Accordion-trigger:hover {
  background: hsl(216, 94%, 94%);
}

:host *:first-child .Accordion-trigger {
  border-radius: 5px 5px 0 0;
}

button {
  border-style: none;
}

:host button::-moz-focus-inner {
  border: 0;
}

.Accordion-title {
  display: block;
  pointer-events: none;
  border: transparent 2px solid;
  border-radius: 5px;
  padding: 0.25em;
  outline: none;
}

.Accordion-trigger:focus .Accordion-title {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-icon {
  border: solid hsl(0, 0%, 62%);
  border-width: 0 2px 2px 0;
  height: 0.5rem;
  pointer-events: none;
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  width: 0.5rem;
}

.Accordion-trigger:focus .Accordion-icon,
.Accordion-trigger:hover .Accordion-icon {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-trigger[aria-expanded="true"] .Accordion-icon {
  transform: translateY(-50%) rotate(-135deg);
}

.Accordion-panel {
  margin: 0;
  padding: 1em 1.5em;
}

/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */
.Accordion-panel[hidden] {
  display: none;
}

::slotted([slot^="trigger"]) {
  pointer-events: none;
  margin: 0;
  padding: 0;
}
`;