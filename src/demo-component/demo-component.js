

export default class DemoComponent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'})
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = 'This is a demo component'
  }
}