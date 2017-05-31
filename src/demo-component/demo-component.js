

export default class DemoComponent extends HTMLElement {
  static HTMLTagName () { return 'demo-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = 'This is a demo component'
  }
}