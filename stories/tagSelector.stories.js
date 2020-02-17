import React from 'react';
import { tagSelector } from '@storybook/react/demo';
import TagSelector from "./components/TagSelector/tag-selector";
import './components/TagSelector/tag-selector.scss';
import {
  isUndefinedOrNull
} from "./utils/utils";
import {
  resetTagSelectorOptions
} from "./utils/tagselectorutils";
export default {
   title: 'Tag Selector',
    component: tagSelector,
    parameters: {
      html:["<html>",
      "<head>",
      "<title>Tag Selector</title>",
      "<link rel='stylesheet' href='bundle.css'>",
      "</head>",
      "<body>",
      "<h2>Tag Selector</h2>",
      " ",
      '<tag-selector id="tagselector" data-options=\'{"placeholder": "Select country", "maxItemCounter": 2, "showHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false}\'></tag-selector>',
      " ",
      "<script src='bundle.js'></script>",
      "</body>",
      "</head>",
      "</html>"
  ]   ,
  react:[
    "import React from 'react';",
    "import TagSelector from './components/TagSelector/tag-selector'",
    "import  './components/TagSelector/tag-selector.scss';",
    " ",
    'let dataoptions =  \'{"placeholder": "Select country", "maxItemCounter": 2, "showHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": true}\';',
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
    "<TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onSelect={onSelectHandler}></TagSelector>",
    "</div>",
    ");",
    "}",
    " ",
    "export default App;"
  ]        
},
}

function onFocusHandler() { }

function onBlurHandler() { }

function onKeyDownHandler() { }

let dataoptions=  '{"placeholder": "Select country", "maxItemCounter": 2, "showHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false}';

let options = JSON.parse(dataoptions);
options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);

export const Demo = () => <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>


