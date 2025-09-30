<script type="module">
/* Shadow-DOM components to protect gradient text & buttons from extension CSS */

class EhGText extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display: inline; }
        .g {
          background-image: linear-gradient(to right, #34d399, #60a5fa);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          text-decoration: inherit !important;
          filter: none !important;
        }
      </style>
      <span class="g"><slot></slot></span>
    `;
  }
}
customElements.define('eh-gtext', EhGText);

class EhBtn extends HTMLElement {
  static get observedAttributes() { return ['href','target','download','rel']; }
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
      <style>
        :host { display: inline-block; }
        a {
          display:inline-flex; align-items:center; justify-content:center;
          padding:.75rem 1.25rem; border-radius:.75rem;
          color:#fff; text-decoration:none;
          background-image: linear-gradient(90deg, #22c55e, #2563eb);
          box-shadow: 0 8px 20px -8px rgba(37,99,235,.55);
          transition: filter .2s ease, transform .05s ease;
          filter:none !important;
        }
        a:hover { filter:brightness(1.07); }
        a:active { transform: translateY(1px); }
      </style>
      <a part="a"><slot></slot></a>
    `;
    this._a = this._root.querySelector('a');
  }
  attributeChangedCallback(name, _old, value) {
    if (!this._a) return;
    if (value == null) this._a.removeAttribute(name);
    else this._a.setAttribute(name, value);
  }
}
customElements.define('eh-btn', EhBtn);
</script>
