import { LitElement, html } from 'https://cdn.pika.dev/lit-element/v2';
import { styles } from './index.css.js';

class A11yAccordion extends LitElement {
  static get styles() {
    return [styles];
  }
  static get properties() {
    return {
      current: {type: Number},
      sections: {type: Array}
    }
  }
  constructor() {
    super();
    this.focusIndex = 0;
    this.current = 0;
    this.sections = [0,1,2];
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  bindKeydown(e) {
    const { target } = e;
    target.addEventListener('keydown', this.handleKeydown);
  }
  unbindKeydown(e) {
    const { target } = e;
    target.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown(e) {
    const { code, target } = e;
    const triggers = this.shadowRoot.querySelectorAll('.Accordion-trigger');
    switch (code) {
      case 'ArrowDown': {
        const target = (triggers.length + this.focusIndex + 1) % triggers.length;
        triggers[target].focus();
        break;
      }
      case 'ArrowUp': {
        const target = (triggers.length + this.focusIndex - 1) % triggers.length;
        triggers[target].focus();
        break;
      }
      case 'Home':
        triggers[0].focus();
        break;
      case 'End':
        triggers[triggers.length - 1].focus();
        break;
      default:
        break;
    }
  }
  renderTrigger(index) {
    return html`
      <button
        class="Accordion-trigger"
        aria-controls=${`sect${index}`}
        aria-expanded=${this.current === index ? 'true' : 'false'}
        id=${`accordion${index}id`}
        @blur=${this.unbindKeydown}
        @click=${e => this.current = index}
        @focus=${(e) => {
          this.focusIndex = index;
          this.bindKeydown(e);
        }}
      >
        <slot name=${`trigger-${index}`}></slot>
        <span class="Accordion-icon"></span>
      </button>
    `;
  }
  renderContent(index) {
    return html`
      <div
        class="Accordion-panel"
        role="region"
        aria-labelledby=${`accordion${index}id`}
        id=${`sect${index}`}
        ?hidden=${this.current !== index}
      >
        <slot name=${`content-${index}`}></slot>
      </div>
    `;
  }
  renderSection(index) {
    return html`
      ${this.renderTrigger(index)}
      ${this.renderContent(index)}
    `;
  }
  render() {
    return html`${this.sections.map((section) => this.renderSection(section))}`;
  }
}

customElements.define('a11y-accordion', A11yAccordion);
