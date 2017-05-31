import DatePickerComponent from './date-picker-component'
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
})