import { LitElement, html } from 'https://cdn.pika.dev/lit-element/v2';
import './menu.js';
import './menuitem.js';
import { styles } from './menubar.css.js';

class A11yMenubar extends LitElement {
  static get styles() {
    return [styles];
  }
  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusin = this.handleFocusin.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  handleFocusin() {
    this.addEventListener('keydown', this.handleKeydown);
  }
  handleFocusout() {
    this.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown(e) {
    const { code } = e;
    const topLevelItems = this.childElements;
    const currentItem = e.composedPath().find(el => el.matches && el.matches('a11y-menubar > *')).querySelector('a');
    const currentIndex = topLevelItems.indexOf(currentItem);
    switch (code) {
      case 'ArrowRight': {
        const nextIndex = (topLevelItems.length + currentIndex + 1) % topLevelItems.length;
        topLevelItems[nextIndex].focus();
        return;
      }
      case 'ArrowLeft': {
        const nextIndex = (topLevelItems.length + currentIndex - 1) % topLevelItems.length;
        topLevelItems[nextIndex].focus();
        return;
      }
      case 'Home': {
        e.stopPropagation();
        topLevelItems[0].focus();
        return;
      }
      case 'End': {
        e.stopPropagation();
        topLevelItems[topLevelItems.length - 1].focus();
        return;
      }
    }
    const indexByChar = this.firstChars.indexOf(code.toLowerCase().replace('key',''));
    if (indexByChar > -1) {
      topLevelItems[indexByChar].focus();
    }
  }
  handleSlotchange(e) {
    const {target: slot} = e;
    const nodes = slot.assignedNodes();
    const childElements = nodes.filter(node => typeof node.tagName !== 'undefined').map(el => el.querySelector('a'));
    this.childElements = childElements;
    this.firstChars = childElements.map(el => el.textContent.trim()[0].toLowerCase());
  }
  render() {
    return html`
      <slot
        @slotchange=${this.handleSlotchange}
      ></slot>
    `;
  }
  firstUpdated() {
    this.querySelector('a11y-menuitem > a').setAttribute('tabindex','0');
    this.addEventListener('focusin', this.handleFocusin);
    this.addEventListener('focusout', this.handleFocusout);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menubar');
    }
  }
}

customElements.define('a11y-menubar', A11yMenubar);
