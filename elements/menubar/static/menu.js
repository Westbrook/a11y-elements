import { LitElement, html, css } from 'https://cdn.pika.dev/lit-element/v2';
import { styles } from './menu.css.js';

class A11yMenu extends LitElement {
  static get styles() {
    return [styles]
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
    const currentItem = e.target;
    const currentIndex = topLevelItems.indexOf(currentItem);
    switch (code) {
      case 'ArrowDown': {
        e.stopPropagation();
        const nextIndex = (topLevelItems.length + currentIndex + 1) % topLevelItems.length;
        topLevelItems[nextIndex].focus();
        break;
      }
      case 'ArrowUp': {
        e.stopPropagation();
        const nextIndex = (topLevelItems.length + currentIndex - 1) % topLevelItems.length;
        topLevelItems[nextIndex].focus();
        break;
      }
      case 'Home': {
        e.stopPropagation();
        topLevelItems[0].focus();
        break;
      }
      case 'End': {
        e.stopPropagation();
        topLevelItems[topLevelItems.length - 1].focus();
        break;
      }
    }
    const indexByChar = this.firstChars.indexOf(code.toLowerCase().replace('key',''));
    if (indexByChar > -1) {
      e.stopPropagation();
      topLevelItems[indexByChar].focus();
    }
  }
  focus() {
    this.childElements[0].focus();
  }
  handleSlotchange(e) {
    const {target: slot} = e;
    const nodes = slot.assignedNodes();
    const childElements = nodes.filter(node => typeof node.tagName !== 'undefined').filter(el => el.getAttribute('role') !== 'separator').map(el => el.querySelector('a'));
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
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menu');
    }
    const tabbableChildren = this.querySelector('[tabindex="0"]');
    if (!tabbableChildren) {
      this.querySelector('a').setAttribute('tabindex', '0');
    }
    this.addEventListener('focusin', this.handleFocusin);
    this.addEventListener('focusout', this.handleFocusout);
  }
}

customElements.define('a11y-menu', A11yMenu);