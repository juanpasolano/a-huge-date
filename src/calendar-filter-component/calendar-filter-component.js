
const template = ({selectedFilter, filters}) => {
  return `
    <div class="filters">
      ${filters.map(filter => {
        return `
          <input 
            type="radio" 
            name="filter" 
            ${selectedFilter === filter.value ? 'checked': ''}
            id="${filter.value}" 
            value="${filter.value}"> 
          <label for="${filter.value}">${filter.label}</label>
        `
      }).join('')}
    </div> 
  `
}
const FILTERS = [
  {
    label: 'Any date',
    value: 'any'
  },
  {
    label: 'Only weekends',
    value: 'weekends'
  },
  {
    label: 'Only weekdays',
    value: 'weekdays'
  }
]
export const FILTER_EVENTS = {
  SELECTED_FILTER: 'selected-filter'
}

export default class CalendarFilterComponent extends HTMLElement {
  static HTMLTagName () { return 'calendar-filter-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.selectedFilter = FILTERS[0].value;
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = template({
      selectedFilter: this.selectedFilter,
      filters: FILTERS,
    });
    this.shadowRoot.querySelectorAll('input').forEach(el => {
      el.addEventListener('change', this.onRadioChange.bind(this))
    })
  }
  onRadioChange(e){
    this.selectedFilter = e.target.value;
    this.dispatchEvent(new CustomEvent(FILTER_EVENTS.SELECTED_FILTER, {detail: this.selectedFilter}))
  }
}