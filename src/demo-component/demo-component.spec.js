import DemoComponent from './demo-component'
const tagName = DemoComponent.HTMLTagName(); 

describe('DemoComponent', () => {
  let component = null;
  beforeAll( ()=> {
    window.customElements.define(tagName, DemoComponent);
  })
  beforeEach(() => {
    component = document.createElement(tagName);
    document.body.appendChild(component);
  })
  afterEach(() => {
    component.remove();
  })

  it('exists', ()=>{
    expect(component).not.toBeNull();
  })

  it('contains a calendar component', ()=>{
    expect(component.shadowRoot.innerHTML).toEqual('This is a demo component');
  })
})