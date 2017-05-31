
import { CALENDAR_EVENTS } from 'calendar-component/calendar-component';
import { toDate } from 'date-picker-component/date-picker-component';
import { TIMEPICKER_EVENTS } from 'time-picker-component/time-picker-component';
import styles from './appointment-component.scss';

const template = () => {
  return `
    <style>
      ${styles}
    </style>
    <date-picker-component style="position:"></date-picker-component>
    <time-picker-component></time-picker-component>
    
    <div class="buttons">
      <button class="save primary">Save</button>
      <button class="reset">Reset</button>
    </div>
    <div class="selected">Good! your appointment is set for 10/11/2017 at 5:45 PM. Thanks</div>
  `;
}
export default class AppointmentComponent extends HTMLElement {
  static HTMLTagName () { return 'appointment-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.date = null;
    this.time = null;
  }
  connectedCallback(){
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = template();
    this.$date = this.shadowRoot.querySelector('date-picker-component')
    this.$time = this.shadowRoot.querySelector('time-picker-component')
    this.$save = this.shadowRoot.querySelector('button.save')
    this.$reset = this.shadowRoot.querySelector('button.reset')
    this.$selected = this.shadowRoot.querySelector('.selected')
    this.$date.addEventListener(CALENDAR_EVENTS.SELECTED_DAY, this.onSelectedDay.bind(this))
    this.$time.addEventListener(TIMEPICKER_EVENTS.SELECTED_TIME, this.onSelectedTime.bind(this))
    this.$save.addEventListener('click', this.onSaveClick.bind(this))
    this.$reset.addEventListener('click', this.onResetClick.bind(this))

    this.time = this.$time.selectedTime;
  }
  onSelectedDay(e){
    this.date = new Date(e.detail);
  }
  onSelectedTime(e){
    this.time = e.detail;
  }
  onSaveClick(e){
    if(this.date && this.time){
      this.$selected.innerHTML = `Good! your appointment is set for ${toDate(this.date)} at ${this.time}. Thanks`
    }
  }
  onResetClick(e){
    this.render();
  }
}