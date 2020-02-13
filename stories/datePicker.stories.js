import React from 'react';
import { action } from '@storybook/addon-actions';
import { datePicker } from '@storybook/react/demo';
import DatePicker from './components/Datepicker';
import './components/Datepicker/date-picker.scss';
import { withInfo } from '@storybook/addon-info';


  export default {
  title: 'Date Picker',
  component: datePicker,
  decorators:[withInfo],
  parameters: {
    info: {text: `
    description or documentation about my component, supports markdown

    ~~~js
    <Button>Click Here</Button>
    ~~~
  `,
  propTablesExclude: [DatePicker],
},
 
  },
};
  


let dataoptions=  '{"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}';

let options = JSON.parse(dataoptions);

export const Demo = () => <DatePicker options={options}></DatePicker>






   
  

