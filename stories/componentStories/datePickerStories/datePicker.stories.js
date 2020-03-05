import React from 'react';
import { datePicker } from '@storybook/react/demo';
import DatePicker from '../../components/Datepicker';
import '../../components/Datepicker/date-picker.scss';
import {
  isUndefinedOrNull
} from "../../utils/utils";
import {
  resetOptions,
  formatOptions
} from "../../utils/calendar";
import '../../style.css'

  export default {
  title: 'Date Picker',
  component: datePicker,
  parameters: {
    html:["<html>",
    "<head>",
    "<title>Date Picker</title>",
    "<link rel='stylesheet' href='bundle.css'>",
    "</head>",
    "<body>",
    "<h2>Date Picker</h2>",
    " ",
    '<date-picker id="datepicker" data-options=\'{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}\'></date-picker>',
    " ",
    "<script src='bundle.js'></script>",
    "</body>",
    "</head>",
    "</html>"
]  ,
react:[
  "import React from 'react';",
  "import DatePicker from './components/Datepicker/index'",
  "import  './components/Datepicker/date-picker.scss';",
  " ",
  'let dataoptions =  {\'displayFormat\': \'DD/MM/YYYY\', \'iconAlignment\':\'left\', \'showErrorMessage\': true, \'dateStringAlignment\': \'left\', \'lowerLimit\': \'08/08/2015\', \'upperLimit\': \'30/09/2022\', \'validationMessages\': [{\'inValidFormat\': \'Invalid DOB\'}, { \'outsideRange\': \'\'}] , \'isDisabled\': false, \'showButtons\': true, \'dateButtonPrimary\': \'\', \'showClearIcon\': false, \'manualEntry\': true, \'disabledList\': [\'01/12/2019\', \'15/10/2020\', \'01/11/2020\', \'20/11/2019\'], \'indicatorList\': [{ \'dates\': [\'01/10/2019\',\'02/11/2019\'], \'color\': \'red\' }, { \'dates\': [\'02/09/2019\',\'01/08/2019\'], \'color\': \'blue\' }]}\';',
  " ",
  "options     = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options)",
  "options     = formatOptions(options);",
  " ",
  "function onFocusHandler() {}",
  "function onBlurHandler() {}",
  "function onSelectHandler() {}",
  " ",
  "function App() {",
  "return (",
  "<div className='App'>",
  "<DatePicker options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onSelect={onSelectHandler}></DatePicker>",
  "</div>",
  ");",
  "}",
  " ",
  "export default App;"
]},
        
};

export const Default = () =>{
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let date1 = "0"+currentMonth+"/"+"01"+"/"+currentYear;
  let date2 = "0"+currentMonth+"/"+"08"+"/"+currentYear;
  let date3 = "0"+currentMonth+"/"+"15"+"/"+currentYear;
  let date4 = "0"+currentMonth+"/"+"22"+"/"+currentYear;
  let date1_indicator = "0"+currentMonth+"/"+"10"+"/"+currentYear;
  let date2_indicator = "0"+currentMonth+"/"+"20"+"/"+currentYear;

  let options =  {'disabledList': [date1,date2,date3,date4],'indicatorList': [{ 'dates': [date1_indicator], 'color': 'red' },{ 'dates': [date2_indicator], 'color': 'blue' }]};
  options         = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options         = formatOptions(options);
  
return  <div className="div-demo">
          <div>
            <h4>Default Date Picker</h4>
            <p><small>Date picker with disabled dates and indicators.</small></p>
            <p><small>data-options = '&#123;disabledList": ["{date1}", "{date2}", "{date3}", "{date4}"],"indicatorList": [ &#123;"dates": ["{date1_indicator}"], "color": "red" },  &#123; "dates": ["{date2_indicator}"], "color": "blue" }]&#125;'</small></p>

            <DatePicker options={options}></DatePicker>
          </div>
        </div> 
}


export const selectQuarter = () =>{
  let options   = {'displayFormat': 'QQ/YYYY'};
  options     = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options     = formatOptions(options);
 
  
return <div className="div-demo">
          <div>
            <h4>Select Quarter</h4>
            <p><small>data-options = '{"{\"displayFormat\": \"QQ/YYYY\"}"}'</small></p>
            <DatePicker id="quarterDatepicker" options={options}></DatePicker>
          </div>
      </div>
}


export const selectMonth = () =>{
  let options   = {'displayFormat': 'MM/YYYY'};
  options     = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options     = formatOptions(options);

return <div className="div-demo">
          <div>
            <h4>Select Month</h4>
            <p><small>data-options = '{"{\"displayFormat\": \"MM/YYYY\"}"}'</small></p>

            <DatePicker options={options}></DatePicker>
          </div>
       </div>
}

export const selectYear = () =>{
  let options= {'displayFormat': 'YYYY'}
  options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options = formatOptions(options);

  return <div className="div-demo">
            <div>
              <h4>Select Year</h4>
              <p><small>data-options = '{"{\"displayFormat\": \"YYYY\"}"}'</small></p>

              <DatePicker options={options}></DatePicker>
            </div>
         </div>
}

export const showButtons = () =>{
let options = {'showButtons': true, 'dateButtonPrimary': 'My Button'};
options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);

return <div className="div-demo">
         <div>
           <h4>Show Buttons</h4>
           <p><small>data-options = '{"{\"showButtons\": true, \"dateButtonPrimary\": \"My Button\"}"}'</small></p>

           <DatePicker options={options}></DatePicker>
         </div>
       </div>
}
 
/* 
export const disabledList = () =>{
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let date1 = "0"+currentMonth+"/"+"01"+"/"+currentYear;
  let date2 = "0"+currentMonth+"/"+"08"+"/"+currentYear;
  let date3 = "0"+currentMonth+"/"+"15"+"/"+currentYear;
  let date4 = "0"+currentMonth+"/"+"22"+"/"+currentYear;

  let options = {'disabledList': [date1,date2,date3,date4]};
  options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options = formatOptions(options);
  
  return <div className="div-demo">
            <div>
                <h4>Disabled List</h4>
                <p><small>data-options = '&#123;disabledList": ["{date1}", "{date2}", "{date3}", "{date4}"]&#125;'</small></p>

                <DatePicker options={options}></DatePicker>
            </div>
         </div>
}
  
export const indicatorList = () =>{
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let date1 = "0"+currentMonth+"/"+"10"+"/"+currentYear;
  let date2 = "0"+currentMonth+"/"+"20"+"/"+currentYear;
  let options = {'indicatorList': [{ 'dates': [date1], 'color': 'red' },{ 'dates': [date2], 'color': 'blue' }]};
  options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options = formatOptions(options);

  return <div className="div-demo">
            <div>
              <h4>Indicator List</h4>
              <p><small>data-options = ' &#123;"indicatorList": [ &#123;"dates": ["{date1}"], "color": "red" },  &#123; "dates": ["{date2}"], "color": "blue" }] &#125;'</small></p>

              <DatePicker options={options}></DatePicker>
            </div>
         </div>
}

 */