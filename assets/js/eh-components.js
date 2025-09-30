// Tiny Web Components that render inside Shadow DOM so extensions can't clobber styles

// Gradient text wrapper
class EhGText extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display:inline-block; }
        .g {
          background: linear-gradient(90deg, #34d399, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font: inherit;
        }
      </style>
      <span class="g"><slot></slot></span>
    `;
  }
}
customElements.define('eh-gtext', EhGText);

// Primary CTA button
class EhBtn extends HTMLElement {
  static get observedAttributes() { return ['href','download','target']; }
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `
      <style>
        :host { display:inline-block; }
        a {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.75rem 1.25rem; border-radius:.75rem;
          background: linear-gradient(90deg,#22c55e,#3b82f6);
          color:#0b1220; font-weight:700; text-decoration:none;
          box-shadow:0 10px 25px -5px rgba(34,197,94,.25);
          transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        a:hover { transform: translateY(-1px); filter:brightness(1.03); }
        a:active { transform: translateY(0); }
        .ico {
          display:inline-block; width:1.1rem; height:1.1rem;
          background: currentColor; -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>') center/contain no-repeat;
                  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>') center/contain no-repeat;
        }
      </style>
      <a part="a"><span class="ico" aria-hidden="true"></span><slot></slot></a>
    `;
    this.anchor = this.root.querySelector('a');
  }
  connectedCallback() { this.#sync(); }
  attributeChangedCallback() { this.#sync(); }
  #sync() {
    const href = this.getAttribute('href') || '#';
    this.anchor.setAttribute('href', href);
    for (const name of ['download','target','rel']) {
      const val = this.getAttribute(name);
      if (val != null) this.anchor.setAttribute(name, val);
      else this.anchor.removeAttribute(name);
    }
    // Security: default rel for target=_blank
    if (this.anchor.getAttribute('target') === '_blank' && !this.anchor.hasAttribute('rel')) {
      this.anchor.setAttribute('rel','noopener noreferrer');
    }
  }
}
customElements.define('eh-btn', EhBtn);
