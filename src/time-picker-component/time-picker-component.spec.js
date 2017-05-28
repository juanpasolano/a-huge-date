import TimePickerComponent, { TIMEPICKER_EVENTS } from './time-picker-component';
const tagName = TimePickerComponent.HTMLTagName(); 

describe('TimePickerComponent', () => {
  let component, root;
  beforeAll( ()=> {
    window.customElements.define(tagName, TimePickerComponent);
  })

  beforeEach(() => {
    component = document.createElement(tagName);
    root = component.shadowRoot;
    document.body.appendChild(component);
  })
  
  afterEach(() => {
    component.remove();
  })

  it('exists', ()=>{
    expect(component).not.toBeNull();
  })

  it('should render a select with (24*4)+1 options', function(){
    const expectedLentgh = (24*4)+1; 
    const options = component.shadowRoot.querySelectorAll('select option').length;
    expect(options).toEqual(expectedLentgh)
  })

  it(`should fire event "${TIMEPICKER_EVENTS.SELECTED_TIME}" when an option is selected`, ()=>{
      const handlerSpy = jasmine.createSpy('click');
      const changeTimeTo = '01:30 AM'
      component.addEventListener(TIMEPICKER_EVENTS.SELECTED_TIME, handlerSpy);
      root.querySelector('select').value = changeTimeTo;
      root.querySelector('select').dispatchEvent(new Event('change'))
      expect(handlerSpy).toHaveBeenCalled()
  })
})