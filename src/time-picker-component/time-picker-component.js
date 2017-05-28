import styles from './time-picker-component.scss';

const clockIcon = '<svg enable-background="new 0 0 141.732 141.732" height="141.732px" id="Livello_1" version="1.1" viewBox="0 0 141.732 141.732" width="141.732px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Livello_5"><path d="M113.326,70.191c0-2.97-2.377-5.376-5.307-5.376H75.543V32.387v-0.001c0-2.98-2.418-5.397-5.396-5.397   c-2.98,0-5.398,2.417-5.398,5.397V70.17c0,2.981,2.418,5.398,5.398,5.398h37.875C110.949,75.568,113.326,73.161,113.326,70.191    M129.533,70.157c0,32.798-26.584,59.386-59.375,59.386c-32.793,0-59.375-26.588-59.375-59.386s26.582-59.386,59.375-59.386   C102.949,10.771,129.533,37.359,129.533,70.157 M140.314,70.157C140.314,31.41,108.904,0,70.158,0C31.41,0,0,31.41,0,70.157   s31.41,70.157,70.158,70.157C108.904,140.314,140.314,108.904,140.314,70.157"/></g><g id="Livello_1_1_"/></svg>'
const template = () => {
  return `
    <style>${styles}</style> 
    <div>
      <div class="control-group">
        <div class="control"> 
          <select>
          </select>
        </div>
        <div class="icon"> 
          ${clockIcon}
        </div>
      </div>
    </div>
  `
}

export default class TimePickerComponent extends HTMLElement {
  static HTMLTagName () { return 'time-picker-component'};
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = template()
  }
}