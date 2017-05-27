import styles from './date-picker-component.scss';
import { CALENDAR_EVENTS} from 'calendar-component/calendar-component';

const template = () => {
  return `
    <style>${styles}</style> 
    <div>
      <input type="text" placeholder="Choose a date..." />
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
    this.$calendar = this.shadowRoot.querySelector('calendar-component');
    this.$input.addEventListener('click', this.onInputClicked.bind(this))
    this.$calendar.addEventListener(CALENDAR_EVENTS.SELECTED_DAY, this.onSelectedDay.bind(this))
  }
  onSelectedDay(e){
    const date = e.detail.toString();
    this.$input.value = date;
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