import DemoComponent from './demo-component'

describe('DemoComponent', () => {
  let component = null;
  beforeAll( ()=> {
    window.customElements.define(DemoComponent.HTMLTagName(), DemoComponent);
  })
  beforeEach(() => {
    component = document.createElement(DemoComponent.HTMLTagName());
    document.body.appendChild(component);
  })
  afterEach(() => {
    component.remove();
  })

  it('exists', ()=>{
    expect(component).not.toBeNull();
  })

  it('has correct text', ()=>{
    expect(component.shadowRoot.innerHTML).toEqual('This is a demo component');
  })
})