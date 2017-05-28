import DemoComponent from './time-picker-component'
const tagName = DemoComponent.HTMLTagName(); 

describe('TimePickerComponent', () => {
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
})