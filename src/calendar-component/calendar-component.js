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
      return new Date(prevMonthYear, prevMonth, day);
    } else if(idx>=startDay && idx<daysInMonth[month]+startDay) {
      const day = idx-startDay+1;
      return new Date(year, month, day);
    } else {
      const day = idx-(daysInMonth[month]+startDay)+1;
      return new Date(nextMonthYear, nextMonth, day);
    }
  })
  return calendar
}

const template = ({weekdays, currentYear, currentMonth}) => {
  return `
    <style>${styles}</style> 
    <div class="cal">
      <div class="header">
        <span class="prev">&lang;</span>
        <span class="title">${MONTHS[currentMonth]} ${currentYear}</span>
        <span class="next">&rang;</span>
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
  onDayClick(btn, e){
    btn.className = "selected";
    if(this.selected) this.selected.className = '';
    this.selected = btn;
    this.dispatchEvent(new CustomEvent('day-selected', {detail: btn.date}))
  }
  renderTitle(){
    this.$title.innerHTML = `${MONTHS[this.getMonth()]} ${this.getYear()}`
  }
  renderGrid(){
    this.$grid.innerHTML = '';
    const arr = getMonthDaysArray(this.getYear(), this.getMonth()).map(i => {
      const btn = document.createElement('button');
      btn.onclick =  this.onDayClick.bind(this, btn);
      btn.textContent = i.getDate();
      btn.date = i;
      this.$grid.appendChild(btn)
      return btn
    });
    this.renderTitle()
  }

  static get observedAttributes() {
    return ['year', 'month']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(this.rendered && ['year', 'month'].indexOf(name) > -1) {
      this.renderGrid();
    }
  }
}