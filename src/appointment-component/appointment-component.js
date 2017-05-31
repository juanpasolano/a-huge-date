
import { CALENDAR_EVENTS } from 'calendar-component/calendar-component';
import { toDate } from 'date-picker-component/date-picker-component';
import { TIMEPICKER_EVENTS } from 'time-picker-component/time-picker-component';

const template = () => {
  return `
    <date-picker-component></date-picker-component>
    <time-picker-component></time-picker-component>
    <button class="save">Save</button>
    <button class="cancel">Cancel</button>
    <div class="selected"></div>
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
    this.$cancel = this.shadowRoot.querySelector('button.cancel')
    this.$selected = this.shadowRoot.querySelector('.selected')
    this.$date.addEventListener(CALENDAR_EVENTS.SELECTED_DAY, this.onSelectedDay.bind(this))
    this.$time.addEventListener(TIMEPICKER_EVENTS.SELECTED_TIME, this.onSelectedTime.bind(this))
    this.$save.addEventListener('click', this.onSaveClick.bind(this))
    this.$cancel.addEventListener('click', this.onCancelClick.bind(this))

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
  onCancelClick(e){
    this.render();
  }
}