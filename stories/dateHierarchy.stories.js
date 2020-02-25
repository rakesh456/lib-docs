import React from 'react';
import { dateHierarchy } from '@storybook/react/demo';
import './components/DateHierarchy/date-hierarchy.scss';
import DateHierarchy from './components/DateHierarchy/datehierarchyView';
export default {
    title: 'Date Hierarchy',
     component: dateHierarchy,
     parameters: {
        html:["<html>",
        "<head>",
        "<title>Date Hierarchy</title>",
        "<link rel='stylesheet' href='bundle.css'>",
        "</head>",
        "<body>",
        "<h2>Date Hierarchy</h2>",
        " ",
        '<date-hierarchy id="datehierarchy" data-options=\'{"lowerLimit": "2000", "upperLimit": "2025", "showQuarters": false, "showWeeks": true, "height": "300", "disabledList":["01/01/2000","02/04/2000","09/05/2000", "8/01/2000", "11/11/2025"]}\'></date-hierarchy>',
        " ",
        "<script src='bundle.js'></script>",
        " ",
        "</body>",
        "</head>",
        "</html>"
    ] ,
    react:[
        "import React from 'react';",
        "import DateHierarchy from './components/DateHierarchy/datehierarchyView'",
        "import  './components/DateHierarchy/date-hierarchy.scss';",
        " ",
        'let dataoptions =  \'{"lowerLimit": "2000", "upperLimit": "2025", "showQuarters": false, "showWeeks": false, "height": "300", "disabledList":["01/01/2000","02/04/2000","09/05/2000", "08/01/2000", "11/11/2025"]}\';',
        " ",
        "let options = JSON.parse(dataoptions);",
        " ",
        "function onFocusHandler() {}",
        "function onBlurHandler() {}",
        "function onSelectHandler() {}",
        " ",
        " ",
        "function App() {",
        "return (",
        "<div className='App'>",
        " ",
        "<DateHierarchy options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onSelect={onSelectHandler}></DateHierarchy>",
        " ",
        "</div>",
        ");",
        "}",
        " ",
        "export default App;"
    ]          
 },
 }

let dataoptions = '{"lowerLimit": "2000", "upperLimit": "2025", "showQuarters": false, "showWeeks": false, "height": "300", "disabledList":["01/01/2000","02/04/2000","09/05/2000", "08/01/2000", "11/11/2025"]}'

let options = JSON.parse(dataoptions)
export const  Demo  = () => <DateHierarchy options={options} ></DateHierarchy>