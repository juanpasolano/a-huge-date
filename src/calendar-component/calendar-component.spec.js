import CalendarComponent, { getMonthDaysArray, isLeapYear, CALENDAR_EVENTS } from './calendar-component'
const tagName = CalendarComponent.HTMLTagName(); 

describe('CalendarComponent', () => {
  beforeAll( ()=> {
    window.customElements.define(tagName, CalendarComponent);
  })
  describe('default', () => {
    let component = null;
    beforeEach(() => {
      component = document.createElement(tagName);
      document.body.appendChild(component);
    })
    afterEach(() => {
      component.remove();
    })

    it('exists', () => {
      expect(component).not.toBeNull();
    })
  })

  describe('with attributes', () => {
    let component, root;
    const year = 2017;
    const month = 2;
    
    beforeEach(() => {
      component = document.createElement(tagName);
      component.setAttribute('year', year);
      component.setAttribute('month', month);
      root = component.shadowRoot;
      document.body.appendChild(component);
    })
    afterEach(() => {
      component.remove();
    })

    describe('going to the next month', ()=> {
      beforeEach(()=> {
        root.querySelector('span.next').click();
      })
      it('should change attribute', ()=> {
        const nextMonth = `${month + 1}`
        expect(component.getAttribute('month')).toEqual(nextMonth)
      })
      it('should update days grid', ()=> {
        const firstBtnContent = root.querySelector('.grid').firstChild.textContent;
        expect(firstBtnContent.trim()).toEqual("26")
      })
      it('should change the title', ()=> {
        const title = root.querySelector('.title').textContent
        expect(title).toEqual("Apr 2017")
      })
    })

    describe('going to the prev month', ()=> {
      beforeEach(()=> {
        root.querySelector('span.prev').click();
      })
      it('should change attribute', ()=> {
        const prevMonth = `${month - 1}`
        expect(component.getAttribute('month')).toEqual(prevMonth)
      })
      it('should update days grid', ()=> {
        const firstBtnContent = root.querySelector('.grid').firstChild.textContent;
        expect(firstBtnContent.trim()).toEqual("29")
      })
      it('should change the title', ()=> {
        const title = root.querySelector('.title').textContent
        expect(title).toEqual("Feb 2017")
      })
    })
    
    it('has 35 elements in the grid', () => {
      const children = root.querySelector('.grid').children.length;
      expect(children).toEqual(35)
    })

    describe('when clicking a day', ()=> {
      it('emits an event on day click', () => {
        const handlerSpy = jasmine.createSpy('click');
        component.addEventListener(CALENDAR_EVENTS.SELECTED_DAY, handlerSpy);
        root.querySelector('.grid button').click();
        expect(handlerSpy).toHaveBeenCalled()
      })
      describe('changes the class', ()=> {
        beforeEach(()=>{
          root.querySelector('.grid button').click();
        })
        it('of the clicked day', ()=>{
          const classList = root.querySelector('.grid button').classList;
          expect(classList.contains('selected')).toEqual(true);
        })
        it('and removes it when another day is selected', ()=> {
          const classList = root.querySelector('.grid button').classList;
          root.querySelectorAll('.grid button')[1].click();
          expect(classList.contains('selected')).toEqual(false);
        }) 
      })
    })
  }) 


  describe('getMonthDaysArray', () =>{
    it('creates an array of dates that represent the calendar grid', ()=>{
      const getDate = i => (i.date.getDate());
      expect(getMonthDaysArray(2017, 1).map(getDate)).toEqual([ 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 1, 2, 3, 4 ]);
      expect(getMonthDaysArray(2017, 2).map(getDate)).toEqual([ 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1]);
      expect(getMonthDaysArray(2017, 4).map(getDate)).toEqual([ 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3 ]);
    })
  })

  describe('isLeapYear', ()=> {
    it('returns true if leap year', ()=> {
      const leapYears = [1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020]
      leapYears.forEach(year => {
        expect(isLeapYear(year)).toEqual(true)
      })
    })
    it('returns false if not leap year', ()=> {
      const leapYears = [1977, 1983, 1985, 1989, 1991, 1997, 2002, 2003, 2006, 2011, 2017, 2022]
      leapYears.forEach(year => {
        expect(isLeapYear(year)).toEqual(false)
      })
    })
  })
}) 