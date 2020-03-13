import React from 'react';
import ReactDOM from 'react-dom';
import { datePicker } from '@storybook/react/demo';
import DatePicker from '../../components/Datepicker/index';
import {getSelectedValue} from '../../components/Datepicker/index';
//import {getSelectedValue} from '../../components/Datepicker/datepickerrender';
import '../../components/Datepicker/date-picker.scss';
import {
  isUndefinedOrNull
} from "../../utils/utils";
import {
  resetOptions,
  formatOptions,
  CURRENT_MONTH,
  CURRENT_YEAR
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
    '<date-picker id="datepicker" data-options=\'{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }],"calendarLocation": "down"}\'></date-picker>',
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

  let options =  {};
  options         = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options         = formatOptions(options);

return  <div className="div-demo">
          <div>
            <h4>Default Date Picker</h4>
            <p><small>Date picker.</small></p>
            <p><small>data-options = '&#123; &#125;'</small></p>
            <DatePicker options={options}></DatePicker>
          </div>
        </div> 
}

export const selectQuarter = () =>{
  let options   = {'displayFormat': 'QQ/YYYY'};
  options       = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options       = formatOptions(options);
  
return <div className="div-demo">
          <div>
            <h4>Select Quarter</h4>
            <p><small>Quarter picker.</small></p>
            <p><small>data-options = '{"{\"displayFormat\": \"QQ/YYYY\"}"}'</small></p>
            <DatePicker id="quarterDatepicker" options={options}></DatePicker>
          </div>
      </div>
}


export const selectMonth = () =>{
  let options   = {'displayFormat': 'MM/YYYY'};
  options       = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options       = formatOptions(options);
 
return <div className="div-demo">
          <div>
            <h4>Select Month</h4>
            <p><small>Month picker.</small></p>
            <p><small>data-options = '{"{\"displayFormat\": \"MM/YYYY\"}"}'</small></p>

            <DatePicker options={options}></DatePicker>
          </div>
       </div>
}

export const selectYear = () =>{
  let options = {'displayFormat': 'YYYY'}
  options     = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options     = formatOptions(options);

  return <div className="div-demo">
            <div>
              <h4>Select Year</h4>
              <p><small>Year picker.</small></p>
              <p><small>data-options = '{"{\"displayFormat\": \"YYYY\"}"}'</small></p>

              <DatePicker options={options}></DatePicker>
            </div>
         </div>
}

export const showButtons = () =>{
let options  = {'showButtons': true, 'dateButtonPrimary': 'MY BUTTON'};
options      = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
return <div className="div-demo">
         <div>
           <h4>Show Buttons</h4>
           <p><small>Displays buttons.</small></p>
           <p><small>data-options = '{"{\"showButtons\": true, \"dateButtonPrimary\": \"My Button\"}"}'</small></p>

           <DatePicker options={options}></DatePicker>
         </div>
       </div>
}
 

export const disabledList = () =>{
  let month   =  CURRENT_MONTH.toString()
  let year    = CURRENT_YEAR.toString();
  let quarter =  (Math.ceil(CURRENT_MONTH / 3)); 
  let Year    = CURRENT_YEAR + 1;
  Year        = Year.toString();
  let m       = CURRENT_MONTH + 1;
  let date1,date2,date3,date4,Month,Quarter,q;
  if(quarter===4)
  {
    q = 1
    year = CURRENT_YEAR + 1
    year = year.toString()
    Quarter = "Q"+q+"/"+year; 
  }
  else
  {
    q = quarter + 1
    Quarter = "Q"+q+"/"+year;
  }

  if(CURRENT_MONTH<10)
  {
  Month = "0"+m+"/"+year;
  date1 = "0"+month+"/"+"01"+"/"+year;
  date2 = "0"+month+"/"+"08"+"/"+year;
  date3 = "0"+month+"/"+"15"+"/"+year;
  date4 = "0"+month+"/"+"22"+"/"+year;
  }
  else
  {
    if(CURRENT_MONTH===12)
    {
      m = "01"
      year = CURRENT_YEAR + 1
      year = year.toString()
      Month = m+"/"+year;
    }
 
  date1 = month+"/"+"01"+"/"+year;
  date2 = month+"/"+"08"+"/"+year;
  date3 = month+"/"+"15"+"/"+year;
  date4 = month+"/"+"22"+"/"+year;
  }
  
  let options1 = {'disabledList': [date1,date2,date3,date4]};
  let options2 = {'displayFormat': 'QQ/YYYY','disabledList': [Quarter]};
  let options3 = {'displayFormat': 'MM/YYYY','disabledList': [Month]};
  let options4 = {'displayFormat': 'YYYY','disabledList': [Year]};
  options1 = (isUndefinedOrNull(options1))? resetOptions({}) : resetOptions(options1);
  options1 = formatOptions(options1);
  options2 = (isUndefinedOrNull(options2))? resetOptions({}) : resetOptions(options2);
  options2 = formatOptions(options2);
  options3 = (isUndefinedOrNull(options3))? resetOptions({}) : resetOptions(options3);
  options3 = formatOptions(options3);
  options4 = (isUndefinedOrNull(options4))? resetOptions({}) : resetOptions(options4);
  options4 = formatOptions(options4);
  return <div className="div-demo">
            <div>
                <h4>Disabled List</h4>
                <p><small>Date picker with disabled dates.</small></p>
                <p><small>data-options = '&#123;disabledList": ["{date1}", "{date2}", "{date3}", "{date4}"]&#125;'</small></p>
                <DatePicker options={options1}></DatePicker>
                <br/>
                <p><small>Date picker with disabled quarter.</small></p>
                <p><small>data-options = '&#123;disabledList": ["{Quarter}"]&#125;'</small></p>
                <DatePicker options={options2}></DatePicker>
                <br/>
                <p><small>Date picker with disabled month.</small></p>
                <p><small>data-options = '&#123;disabledList": ["{Month}"]&#125;'</small></p>
                <DatePicker options={options3}></DatePicker>
                <br/>
                <p><small>Date picker with disabled year.</small></p>
                <p><small>data-options = '&#123;disabledList": ["{Year}"]&#125;'</small></p>
                <DatePicker options={options4}></DatePicker>
            </div>         
         </div>
}
  
export const indicatorList = () =>{
  let currentMonth = new Date().getMonth() + 1;
  let currentYear  = new Date().getFullYear();
  let date1        = "0"+currentMonth+"/"+"10"+"/"+currentYear;
  let date2        = "0"+currentMonth+"/"+"20"+"/"+currentYear;
  let options      = {'indicatorList': [{ 'dates': [date1], 'color': 'red' },{ 'dates': [date2], 'color': 'blue' }]};
  options          = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
  options          = formatOptions(options);

  return <div className="div-demo">
            <div>
              <h4>Indicator List</h4>
              <p><small>Displays indicators for the given dates.</small></p>
              <p><small>data-options = ' &#123;"indicatorList": [ &#123;"dates": ["{date1}"], "color": "red" },  &#123; "dates": ["{date2}"], "color": "blue" }] &#125;'</small></p>

              <DatePicker options={options}></DatePicker>
            </div>
         </div>
}

export const examples = () =>{
  let lowerlmt = CURRENT_YEAR - 2;
  let upperlmt = CURRENT_YEAR + 3;
  
  let lowerlmtYear = lowerlmt.toString();
  let upperlmtYear = upperlmt.toString();
  let lowerlmtMonth = "01"+"/"+lowerlmtYear;
  let upperlmtMonth = "12"+"/"+upperlmtYear;
  let currentMonth = CURRENT_MONTH;
  let currentYear = CURRENT_YEAR;
  let month   =  CURRENT_MONTH.toString();
  let year=CURRENT_YEAR.toString();
  let m       = CURRENT_MONTH + 1;
  let date1,date2,date3,date4,date1_indicator,date2_indicator,Month,lowerlmtDate,upperlmtDate;
  if(currentMonth<10){
    lowerlmtDate = "01"+"/"+"0"+month+"/"+lowerlmt;
    upperlmtDate = "30"+"/"+"0"+month+"/"+upperlmt;
    Month = "0"+m+"/"+year;
   date1 = "01"+"/"+"0"+currentMonth+"/"+currentYear;
   date2 = "08"+"/"+"0"+currentMonth+"/"+currentYear;
   date3 = "15"+"/"+"0"+currentMonth+"/"+currentYear;
   date4 = "22"+"/"+"0"+currentMonth+"/"+currentYear;
   date1_indicator = "10"+"/"+"0"+currentMonth+"/"+currentYear;
   date2_indicator = "20"+"/"+"0"+currentMonth+"/"+currentYear;
  }
  else{
   
    if(CURRENT_MONTH===12)
    {
      m = "01"
      year = CURRENT_YEAR + 1
      year = year.toString()
      Month = m+"/"+year;
    }
    lowerlmtDate = "01"+"/"+month+"/"+lowerlmt;
    upperlmtDate = "30"+"/"+month+"/"+upperlmt;
    date1 = "01"+"/"+currentMonth+"/"+currentYear;
    date2 = "08"+"/"+currentMonth+"/"+currentYear;
    date3 = "15"+"/"+currentMonth+"/"+currentYear;
    date4 = "22"+"/"+currentMonth+"/"+currentYear;
    date1_indicator = "10"+"/"+currentMonth+"/"+currentYear;
    date2_indicator = "20"+"/"+currentMonth+"/"+currentYear;
  }

  let quarter = (Math.ceil(CURRENT_MONTH / 3)),q,Quarter;
  let lowerlmtQuarter= "Q1"+"/"+lowerlmtYear;
    let upperlmtQuarter= "Q4"+"/"+upperlmtYear;
  if(quarter===4)
  {
    q = 1
    year = CURRENT_YEAR + 1
    year = year.toString()
    Quarter = "Q"+q+"/"+year; 
  }
  else
  {
    q = quarter + 1
    Quarter = "Q"+q+"/"+year;
  }
  

  let options_1 = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": lowerlmtDate, "upperLimit": upperlmtDate, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": [date1, date2, date3, date4], "indicatorList": [{ "dates": [date1_indicator], "color": "#333" }, { "dates": [date2_indicator], "color": "#ff0000" }]}
  options_1          = (isUndefinedOrNull(options_1))? resetOptions({}) : resetOptions(options_1);
  options_1          = formatOptions(options_1);

  let options_2 = {"displayFormat": "QQ/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": lowerlmtQuarter, "upperLimit": upperlmtQuarter, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": [Quarter]}
  options_2          = (isUndefinedOrNull(options_2))? resetOptions({}) : resetOptions(options_2);
  options_2          = formatOptions(options_2);

  let options_3 = {"displayFormat": "MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": lowerlmtMonth, "upperLimit": upperlmtMonth, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": [Month]}
  options_3          = (isUndefinedOrNull(options_3))? resetOptions({}) : resetOptions(options_3);
  options_3          = formatOptions(options_3);

  
  let options_4 = {"displayFormat": "YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": lowerlmtYear, "upperLimit": upperlmtYear, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": [CURRENT_YEAR]}
  options_4          = (isUndefinedOrNull(options_4))? resetOptions({}) : resetOptions(options_4);
  options_4          = formatOptions(options_4);

  return <div>
            <p>Common data options:</p>
            <p><small>{`data-options = {"iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left",  "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true}`}</small></p>
            <div className="row">
             <div className="column">
              <h4>Select Date : DD/MM/YYYY</h4>
              
              <p><small>additional data-options = '&#123;"displayFormat": "YYYY", "lowerLimit": "{lowerlmtDate}", "upperLimit": "{upperlmtDate}", "disabledList": ["{date1}","{date2}","{date3}","{date4}"], "indicatorList": [&#123; "dates": ["{date1_indicator}"], "color": "#333" &#125;, &#123; "dates": ["{date2_indicator}"], "color": "#ff0000" &#125;] &#125;'</small></p>

              <DatePicker options={options_1}></DatePicker>
            </div>
            <div className="column">
              <h4>Select Quarter : QQ/YYYY</h4>

              <p className="p-margin"><small>additional data-options = '&#123;"displayFormat": "QQ/YYYY", "lowerLimit": "{lowerlmtQuarter}", "upperLimit": "{upperlmtQuarter}", "disabledList": ["{Quarter}"], &#125;'</small></p>

              <DatePicker options={options_2}></DatePicker>
            </div>
            </div>
            <div className="row">
            <div className="column">
              <h4>Select Month : MM/YYYY</h4>
              
              <p><small>additional data-options = '&#123;"displayFormat": "MM/YYYY", "lowerLimit": "{lowerlmtMonth}", "upperLimit": "{upperlmtMonth}", "disabledList": ["{Month}"] &#125;'</small></p>

              <DatePicker options={options_3}></DatePicker>
            </div>
            <div className="column"> 
              <h4>Select Year : YYYY</h4>
              
              <p><small>additional data-options = '&#123;"displayFormat": "YYYY","lowerLimit": "{lowerlmtYear}", "upperLimit": "{upperlmtYear}", "disabledList": ["{CURRENT_YEAR}"] &#125;'</small></p>

              <DatePicker options={options_4}></DatePicker>
            </div>
            </div>
         </div>
}

