import DatePickerComponent, { toDate } from './date-picker-component'
import { CALENDAR_EVENTS} from 'calendar-component/calendar-component';
const tagName = DatePickerComponent.HTMLTagName(); 

describe('DatePickerComponent', () => {
  let component, root;
  beforeAll( ()=> {
    window.customElements.define(tagName, DatePickerComponent);
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

  it('has a calendar component', ()=>{
    expect(root.querySelector('calendar-component'))
  })

  describe('toDate', ()=>{
    it('returns a readable date', ()=>{
      const d1 = toDate(new Date(2017, 2, 1))
      expect(d1).toEqual("01/03/2017")
      const d2 = toDate(new Date(2086, 11, 4), '-')
      expect(d2).toEqual("04-12-2086")
      const d3 = toDate(new Date(2350, 5, 10), ' ')
      expect(d3).toEqual("10 06 2350")
    })
  })
})