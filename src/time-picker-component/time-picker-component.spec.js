import TimePickerComponent, { TIMEPICKER_EVENTS, getTimes } from './time-picker-component';
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

  describe('getTimes', () => {
    it('returns an array of 95 hours', ()=>{
      const possibleTimes = 24*4;
      const times = getTimes();
      expect(times.length).toEqual(possibleTimes); 
    })
    it('returns an array depending on the start hour', ()=>{
      const possibleTimes = (12*4)-1;
      const times = getTimes(12, 10);
      const options = times.map(i => new Date(i).toLocaleTimeString(i).replace(':00 ', ' '))
      expect(times.length).toEqual(possibleTimes); 
      expect(options[0]).toEqual("12:15 PM"); 
      expect(options[1]).toEqual("12:30 PM"); 
      expect(options[2]).toEqual("12:45 PM"); 
      expect(options[3]).toEqual("1:00 PM"); 
    })
    it('returns an array depending on the start hour', ()=>{
      const possibleTimes = (12*3)-3;
      const times = getTimes(15, 35);
      const options = times.map(i => new Date(i).toLocaleTimeString(i).replace(':00 ', ' '))
      expect(times.length).toEqual(possibleTimes); 
      expect(options[0]).toEqual("3:45 PM"); 
      expect(options[1]).toEqual("4:00 PM"); 
      expect(options[2]).toEqual("4:15 PM"); 
      expect(options[3]).toEqual("4:30 PM"); 
    })
  })
})