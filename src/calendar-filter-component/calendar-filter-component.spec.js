import CalendarFilterComponent, { FILTER_EVENTS } from './calendar-filter-component'
const tagName = CalendarFilterComponent.HTMLTagName(); 

describe('CalendarFilterComponent', () => {
  let component, root;
  beforeAll( ()=> {
    window.customElements.define(tagName, CalendarFilterComponent);
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

  it('renders 3 radio buttons', ()=> {
    const elems = root.querySelectorAll('input').length
    expect(elems).toEqual(3)
  })
  it('dispatches a function on radio clicked', ()=> {
    const handlerSpy = jasmine.createSpy('click');
    component.addEventListener(FILTER_EVENTS.SELECTED_FILTER, handlerSpy);
    root.querySelectorAll('input')[1].click();
    expect(handlerSpy).toHaveBeenCalled()
  })
})