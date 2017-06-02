import styles from './calendar-component.scss'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const DAYS_IN_WEEK = 7
const getDaysInMonth = year => [31, isLeapYear(year) ? 29 :28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const isLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

export const getMonthDaysArray = (year, month) => {
  const startDay = new Date(year, month).getDay();
  const daysInMonth = getDaysInMonth(year)

  const prevMonth = (month > 0) ? month -1 : 11;
  const prevMonthYear  = (month > 0) ? year: year -1; 
  const prevMonthDays = daysInMonth[prevMonth]

  const nextMonth = (month < 11) ? month +1 : 0;
  const nextMonthYear  = (month < 11) ? year: year +1; 

  const length = Math.ceil((daysInMonth[month]+startDay)/DAYS_IN_WEEK)*DAYS_IN_WEEK;
  const calendar = Array.apply(null, new Array(length)).map((i, idx) => {
    if(idx<startDay) {
      const day = (prevMonthDays+(idx-startDay))+1;
      return {
        date: new Date(prevMonthYear, prevMonth, day),
      };
    } else if(idx>=startDay && idx<daysInMonth[month]+startDay) {
      const day = idx-startDay+1;
      return {
        date: new Date(year, month, day),
      }
    } else {
      const day = idx-(daysInMonth[month]+startDay)+1;
      return {
        date: new Date(nextMonthYear, nextMonth, day),
      }
    }
  })
  return calendar
}

export const CALENDAR_EVENTS = {
  SELECTED_DAY: 'selected-day',
} 

const arrLeft = `<svg class="Polaris-Icon__Svg" viewBox="0 0 20 20"><path d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2" fill-rule="evenodd"></path></svg>`
const arrRight = `<svg class="Polaris-Icon__Svg" viewBox="0 0 20 20"><path d="M17.707 9.293l-5-5a.999.999 0 1 0-1.414 1.414L14.586 9H3a1 1 0 1 0 0 2h11.586l-3.293 3.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414" fill-rule="evenodd"></path></svg>`
const template = ({weekdays, currentYear, currentMonth}) => {
  return `
    <style>${styles}</style> 
    <div class="cal">
      <div class="header">
        <span class="prev">${arrLeft}</span>
        <span class="title">${MONTHS[currentMonth]} ${currentYear}</span>
        <span class="next">${arrRight}</span>
      </div> 
      <div class="weekdays">
        ${weekdays.map( day => `<span>${day}</span>`).join('')}
      </div>
      <div class="grid"></div>
    </div>
  `
}

export default class CalendarComponent extends HTMLElement {
  static HTMLTagName () { return 'calendar-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.selected = null; //ButtonDOMElement
  }
  connectedCallback(){
    this.rendered = true;
    this.shadowRoot.innerHTML = template({
      weekdays: WEEKDAYS,
      currentYear: this.getYear(),
      currentMonth: this.getMonth(),
    })
    this.shadowRoot.querySelector('.header span.next').addEventListener('click', this.onNextClick.bind(this))
    this.shadowRoot.querySelector('.header span.prev').addEventListener('click', this.onPrevClick.bind(this))
    this.$grid = this.shadowRoot.querySelector('.grid');
    this.$grid.addEventListener('click', this.onGridClick.bind(this))
    this.$title = this.shadowRoot.querySelector('.title');
    this.renderGrid();
  } 

  getYear () {
    return this.getAttribute('year') ? parseInt(this.getAttribute('year'), 10) : new Date().getFullYear()
  }
  getMonth () {
    return this.getAttribute('month') ? parseInt(this.getAttribute('month'), 10) : new Date().getMonth()
  }

  onNextClick(){
    const month = this.getMonth();
    if(month < 11){
      this.setAttribute('month', month +1)
    } else {
      this.setAttribute('month', 0)
      this.setAttribute('year', this.getYear() +1)
    }
  }

  onPrevClick(){
    const month = this.getMonth();
    if(month > 0){
      this.setAttribute('month', month -1)
    } else {
      this.setAttribute('month', 11)
      this.setAttribute('year', this.getYear() -1)
    }
  }
  onGridClick(e){
    // We delegate the button click to the grid so we dont have to keep adding it 
    // to the buttons each time they are re rendered
    if(e.target.tagName === "BUTTON") {
      this.shadowRoot.querySelectorAll('.grid button').forEach(el => el.className = "" )
      const btn = e.target;
      btn.className = "selected"; 
      this.selected = new Date(btn.getAttribute('date'));
      this.dispatchEvent(new CustomEvent(CALENDAR_EVENTS.SELECTED_DAY, {detail: this.selected}))
    }
  }
  renderTitle(){
    this.$title.innerHTML = `${MONTHS[this.getMonth()]} ${this.getYear()}`
  }
  isToday(date){
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    return today.getTime() === date.getTime();
  }
  isSelected(date){
    return new Date(date).getTime() === new Date(this.selected).getTime()
  }
  isDateBeforeToday(date){
    return new Date(date).getTime() < new Date().setHours(0, 0, 0, 0)
  }
  isDateWeekend(date){
    const day = new Date(date).getDay()
    return day === 6 || day === 0
  }
  renderGrid(){
    const filter = this.getAttribute('filter');
    const days = (days) => days.map(day => {
      const isPrev = this.isDateBeforeToday(day.date);
      const isWeekend = this.isDateWeekend(day.date);
      const isWeekday = !this.isDateWeekend(day.date);
      const isDisabled = isPrev || (isWeekend && filter === 'weekdays') || (isWeekday && filter === 'weekends')
      
      return `<button 
        ${isDisabled ? 'disabled ': ' '}
        ${this.isSelected(day.date)  ? 'class="selected"': ''} 
        ${this.isToday(day.date)  ? 'is-today': ''} 
        date="${day.date}">
        ${day.date.getDate()}
      </button>`
    })
    this.$grid.innerHTML = days(getMonthDaysArray(this.getYear(), this.getMonth())).join('')
    this.renderTitle()
  }

  static get observedAttributes() {
    return ['year', 'month', 'filter']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(this.rendered && ['year', 'month', 'filter'].includes(name)) {
      this.renderGrid();
    } 
  }
}