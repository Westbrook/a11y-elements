import { LitElement, html } from 'lit-element';
import { styles } from './index.css.js';

class A11yAlert extends LitElement {
  static get styles() {
      return [styles];
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
  firstUpdated() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'alert');
    }
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'assertive');
    }
    if (!this.hasAttribute('aria-atomic')) {
      this.setAttribute('aria-atomic', 'true');
    }
  }
}

customElements.define('a11y-alert', A11yAlert);