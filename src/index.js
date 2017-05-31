import DemoComponent from 'demo-component/demo-component'
import DatePickerComponet from 'date-picker-component/date-picker-component'
import CalendarComponent from 'calendar-component/calendar-component'
import TimePickerComponent from 'time-picker-component/time-picker-component'
import AppointmentComponent from 'appointment-component/appointment-component'
import CalendarFilterComponent from 'calendar-filter-component/calendar-filter-component'

window.customElements.define(DemoComponent.HTMLTagName(), DemoComponent);
window.customElements.define(DatePickerComponet.HTMLTagName(), DatePickerComponet);
window.customElements.define(CalendarComponent.HTMLTagName(), CalendarComponent);
window.customElements.define(TimePickerComponent.HTMLTagName(), TimePickerComponent);
window.customElements.define(AppointmentComponent.HTMLTagName(), AppointmentComponent);
window.customElements.define(CalendarFilterComponent.HTMLTagName(), CalendarFilterComponent);
