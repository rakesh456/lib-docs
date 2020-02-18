import React from 'react';
import { datePicker } from '@storybook/react/demo';
import DatePicker from './components/Datepicker';
import './components/Datepicker/date-picker.scss';
//import './style.css'
import {
  isUndefinedOrNull
} from "./utils/utils";

import {
  resetOptions,
  formatOptions
} from "./utils/calendar";
//import alignCenter from 'react-icons/lib/fa/align-center';


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
  'let dataoptions =  \'{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}\';',
  " ",
  "let options = JSON.parse(dataoptions);",
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
]         
},
 options: { 
  selectedBarPanel: 'storybook/docs', // switch to by default
  uniqueBarPanel: 'storybook/docs', // switch & hide all other barPanels
} 
};
  

//datepicker 1
let dataoptions=  '{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}';

let options = JSON.parse(dataoptions);
options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
options = formatOptions(options);

//datepicker for display financial year
let paramFinancialYear =  '{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "01/04/2020", "upperLimit": "31/03/2021", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}';
let optionsFinancialYear = JSON.parse(paramFinancialYear);
optionsFinancialYear = (isUndefinedOrNull(optionsFinancialYear))? resetOptions({}) : resetOptions(optionsFinancialYear);
optionsFinancialYear = formatOptions(optionsFinancialYear);

//datepicker for display quarters


//datepicker select month
let paramMonths='{"displayFormat": "MM/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2011", "upperLimit": "12/2014", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2011", "12/2011", "11/2013", "10/2024"]}';
let optionsMonths = JSON.parse(paramMonths);
optionsMonths = (isUndefinedOrNull(optionsMonths))? resetOptions({}) : resetOptions(optionsMonths);
optionsMonths = formatOptions(optionsMonths);

//datepicker select year
let paramYears='{"displayFormat": "YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2018", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true}';
let optionsYears = JSON.parse(paramYears);
optionsYears = (isUndefinedOrNull(optionsYears))? resetOptions({}) : resetOptions(optionsYears);
optionsYears = formatOptions(optionsYears);

//datepicker show buttons
let paramButtons = '{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/07/2017", "upperLimit": "30/12/2018", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true}';
let optionsButtons = JSON.parse(paramButtons);
optionsButtons = (isUndefinedOrNull(optionsButtons))? resetOptions({}) : resetOptions(optionsButtons);
optionsButtons = formatOptions(optionsButtons);

//datepicker disabled list
let paramDL = '{"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/25/2000", "upperLimit": "11/29/2001", "showErrorMessage": true, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": "Date is out of range"}] , "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/25/2000", "11/29/2000", "11/13/2019", "11/14/2019"]}';
let optionsDL = JSON.parse(paramDL);
optionsDL = (isUndefinedOrNull(optionsDL))? resetOptions({}) : resetOptions(optionsDL);
optionsDL = formatOptions(optionsDL);

//datepicker indicator list
let paramIL = '{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/07/2017", "upperLimit": "30/12/2018", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": ["08/07/2017", "09/07/2017", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}';
let optionsIL = JSON.parse(paramIL);
optionsIL = (isUndefinedOrNull(optionsIL))? resetOptions({}) : resetOptions(optionsIL);
optionsIL = formatOptions(optionsIL);



export const Default = () =>{
let dataOptions =  '{}';
let options     = JSON.parse(dataOptions);
options         = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
options         = formatOptions(options);
  
return  <div  style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <div><h5>Default Date Picker</h5>
  <div><DatePicker options={options}></DatePicker></div>  </div>

</div> 
}

// export const DisplayFinancialYear = () =>{
//   return <div  style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//   <div><h5>Display Fnancial Year</h5>
//   <DatePicker options={optionsFinancialYear} ></DatePicker>
//   </div>
//   </div>
// }

export const selectQuarter = () =>{
let paramQuarters   = '{"displayFormat": "QQ/YYYY"}';
let optionsQuarters = JSON.parse(paramQuarters);
optionsQuarters     = (isUndefinedOrNull(optionsQuarters))? resetOptions({}) : resetOptions(optionsQuarters);
optionsQuarters     = formatOptions(optionsQuarters);
  
return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div><h5>Select Quarter</h5>
          <DatePicker options={optionsQuarters}></DatePicker>
        </div>
      </div>
}

export const selectMonth = () =>{
let paramMonths   ='{"displayFormat": "MM/YYYY"}';
let optionsMonths = JSON.parse(paramMonths);
optionsMonths     = (isUndefinedOrNull(optionsMonths))? resetOptions({}) : resetOptions(optionsMonths);
optionsMonths     = formatOptions(optionsMonths);

return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div><h5>Select Month</h5>
        <DatePicker options={optionsMonths}></DatePicker>
        </div>
       </div>
}

export const selectYear = () =>{
  return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div><h5>Select Year</h5>
<DatePicker options={optionsYears}></DatePicker>
</div>
</div>
}

export const showButtons = () =>{
let paramButtons = '{"showButtons": true, "dateButtonPrimary": "My Button"}';
let optionsButtons = JSON.parse(paramButtons);
optionsButtons = (isUndefinedOrNull(optionsButtons))? resetOptions({}) : resetOptions(optionsButtons);

return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
     <div><h5>Show Buttons</h5>
<DatePicker options={optionsButtons}></DatePicker>
</div>
</div>
}
 

export const disabledList = () =>{
let paramDL = '{"disabledList": ["11/25/2000", "11/29/2000", "11/13/2019", "11/14/2019"]}';
let optionsDL = JSON.parse(paramDL);
optionsDL = (isUndefinedOrNull(optionsDL))? resetOptions({}) : resetOptions(optionsDL);
optionsDL = formatOptions(optionsDL);
  
  return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
     <div><h5>Disabled List</h5>
<DatePicker options={optionsDL}></DatePicker>
</div>
</div>
}
  
export const indicatorList = () =>{
  return <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
     <div><h5>Enabled List</h5>
<DatePicker options={optionsIL}></DatePicker>
</div>
</div>
}
