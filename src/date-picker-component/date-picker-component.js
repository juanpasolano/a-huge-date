import styles from './date-picker-component.scss';
import { CALENDAR_EVENTS} from 'calendar-component/calendar-component';

const calendarIcon = '<svg enable-background="new 0 0 32 32" height="22px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="22px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="calendar_1_"><path d="M29.334,3H25V1c0-0.553-0.447-1-1-1s-1,0.447-1,1v2h-6V1c0-0.553-0.448-1-1-1s-1,0.447-1,1v2H9V1   c0-0.553-0.448-1-1-1S7,0.447,7,1v2H2.667C1.194,3,0,4.193,0,5.666v23.667C0,30.806,1.194,32,2.667,32h26.667   C30.807,32,32,30.806,32,29.333V5.666C32,4.193,30.807,3,29.334,3z M30,29.333C30,29.701,29.701,30,29.334,30H2.667   C2.299,30,2,29.701,2,29.333V5.666C2,5.299,2.299,5,2.667,5H7v2c0,0.553,0.448,1,1,1s1-0.447,1-1V5h6v2c0,0.553,0.448,1,1,1   s1-0.447,1-1V5h6v2c0,0.553,0.447,1,1,1s1-0.447,1-1V5h4.334C29.701,5,30,5.299,30,5.666V29.333z" fill="#333332"/><rect fill="#333332" height="3" width="4" x="7" y="12"/><rect fill="#333332" height="3" width="4" x="7" y="17"/><rect fill="#333332" height="3" width="4" x="7" y="22"/><rect fill="#333332" height="3" width="4" x="14" y="22"/><rect fill="#333332" height="3" width="4" x="14" y="17"/><rect fill="#333332" height="3" width="4" x="14" y="12"/><rect fill="#333332" height="3" width="4" x="21" y="22"/><rect fill="#333332" height="3" width="4" x="21" y="17"/><rect fill="#333332" height="3" width="4" x="21" y="12"/></g></svg>'
const template = () => {
  return `
    <style>${styles}</style> 
    <div>
      <div class="control-group">
        <div class="control"> 
          <input type="text" placeholder="Choose a date..." disabled/>
        </div>
        <div class="icon"> 
          ${calendarIcon}
        </div>
      </div>
      <calendar-component/>
    </div>
  `
}

export default class DatePickerComponent extends HTMLElement {
  static HTMLTagName () { return 'date-picker-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.isOpen = false;
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = template();
    this.$input = this.shadowRoot.querySelector('input');
    this.$control = this.shadowRoot.querySelector('.control-group').addEventListener('click', this.onInputClicked.bind(this));
    this.$calendar = this.shadowRoot.querySelector('calendar-component');
    this.$calendar.addEventListener(CALENDAR_EVENTS.SELECTED_DAY, this.onSelectedDay.bind(this))
  }
  toLeadingZero(n){
    return n > 9 ? n : `0${n}`
  }
  toDate(date){
    const day = this.toLeadingZero(date.getDate())
    const month = this.toLeadingZero(date.getMonth())
    return `${day}/${month}/${date.getFullYear()}`
  }
  onSelectedDay(e){
    const date = e.detail;
    this.$input.value = this.toDate(date);
  }
  onInputClicked() {
    if(this.isOpen){
      this.isOpen = false;
      this.$calendar.classList = ''
    }else {
      this.isOpen = true;
      this.$calendar.classList = 'visible'
    }
  }
}