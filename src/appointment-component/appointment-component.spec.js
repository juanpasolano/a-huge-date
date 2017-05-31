import AppointmentComponent from './appointment-component'
const tagName = AppointmentComponent.HTMLTagName(); 

describe('AppointmentComponent', () => {
  let component = null;
  beforeAll( ()=> {
    window.customElements.define(tagName, AppointmentComponent);
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