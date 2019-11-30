import { LitElement, html } from 'https://cdn.pika.dev/lit-element/v2';
import { styles } from './menuitem.css.js';

class A11yMenuitem extends LitElement {
  static get styles() {
    return [styles];
  }
  static get properties() {
    return {
      open: {type: Boolean},
      direction: {type: String}
    }
  }
  constructor() {
    super();
    this.open = false;
    this.direction = '';
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
    switch (code) {
      case 'ArrowDown': {
        const gate = this.direction === 'down' && !this.open;
        this.shouldOpen(gate, e);
        break;
      }
      case 'ArrowRight': {
        const gate = this.direction === 'right' && !this.open;
        this.shouldOpen(gate, e);
        break;
      }
      case 'Space':
      case 'Enter': {
        const gate = this.direction !== '' && !this.open;
        this.shouldOpen(gate, e);
        break;
      }
      case 'ArrowLeft': {
        const gate = this.direction === 'right' && this.open;
        this.shouldClose(gate, e);
        break;
      }
      case 'Escape': {
        const gate = this.open;
        this.shouldClose(gate, e);
        break;
      }
    }
  }
  shouldOpen(gate, e) {
    if (!gate) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    this.open = true;
    this.enter();
  }
  shouldClose(gate, e) {
    if (!gate) {
      return;
    }
    e.stopPropagation();
    this.open = false;
    this.querySelector('[role="menuitem"]').focus();
  }
  enter() {
    requestAnimationFrame(() => {
      const children = this.querySelector('[slot="children"]');
      children.focus();
    });
  }
  handleSlotchange(e) {
    const nodes = e.target.assignedNodes();
    const elements = nodes.filter(node => typeof node.tagName !== 'undefined');
    elements.map(element => {
      if (!element.hasAttribute('role')) {
        element.setAttribute('role', 'menuitem');
      }
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      if (this.querySelector('[slot="children"]')) {
        element.setAttribute('aria-haspopup', 'true');
        element.setAttribute('aria-expanded', 'false');
      }
    });
  }
  render() {
    return html`
      <slot
        @slotchange=${this.handleSlotchange}
      ></slot>
      ${this.open
        ? html`<slot name="children"></slot>`
        : html``
      }
    `;
  }
  firstUpdated() {
    if (this.hasAttribute('role')) {
      this.removeeAttribute('role');
    }
    this.addEventListener('mouseover', e => this.open = true);
    this.addEventListener('mouseleave', e => this.open = false);
    this.addEventListener('focusout', e => this.open = false);
    this.addEventListener('focusin', e => {
      if (e.target !== this.querySelector('a')) {
        this.open = true;
      }
    });
    this.addEventListener('focusin', this.handleFocusin);
    this.addEventListener('focusout', this.handleFocusout);
  }
  updated(changes) {
    if (this.direction && changes.has('open')) {
      const link = this.querySelector('[aria-expanded]')
      if (link) {
        link.setAttribute('aria-expanded', this.open ? 'true' : 'false');
      }
    }
  }
}

customElements.define('a11y-menuitem', A11yMenuitem);