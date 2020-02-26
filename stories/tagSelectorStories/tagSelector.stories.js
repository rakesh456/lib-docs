import React from 'react';
import { tagSelector } from '@storybook/react/demo';
import TagSelector from "../components/TagSelector/tag-selector";
import '../components/TagSelector/tag-selector.scss';
import {
  isUndefinedOrNull
} from "../utils/utils";
import {
  resetTagSelectorOptions
} from "../utils/tagselectorutils";
import * as c from '../utils/cities';
import * as co from '../utils/countries';
export default {
   title: 'Tag Selector',
    component: tagSelector,
    parameters: {
      html:["<html>",
      "<head>",
      "<title style=''>Tag Selector</title>",
      "<link rel='stylesheet' href='bundle.css'>",
      "<script>",
      'var element = document.getElementById("tagselector")',
      
      "</script>",
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
    "let options =  {\'placeholder\': \'Select country\', \'maxItemCounter\': 2, \'showHelper\': true, \'canRemoveAll\': true, \'allowNewValue\': true, \'showHierarchy\': true};",
    " ",
    "function onFocusHandler() {}",
    "function onBlurHandler() {}",
    "function onSelectHandler() {}",
    " ",
    "function App() {",
    "return (",
    "<div className='App'>",
    " ",
    "<TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onSelect={onSelectHandler}></TagSelector>",
    " ",
    "</div>",
    ");",
    "}",
    " ",
    "export default App;"
  ]        
},
}

export const Default = () => {

function onFocusHandler() { }
function onBlurHandler() { }
function onKeyDownHandler() { }

let options=  {};
options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options); 

  return <div className="div-demo">
            <div>
              <h4>Default</h4>
              <p><small>data-options =  &#123;  &#125;</small></p>

              <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>

          </div>
        </div>
}

export const withoutHierarchy = () => {
  
  function onFocusHandler() { }
  function onBlurHandler() { }
  function onKeyDownHandler() { }
  
  let options=   {"showHierarchy": false,"readOnly":false,"canRemoveAll":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
  options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
 
    return <div className="div-demo">
              <div>
                <h4>Without hierarchy</h4>
                <p><small>data-options = &#123; 'showHierarchy':false , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125;&#125;</small></p>
               
                <TagSelector  options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>
  
            </div>
          </div>
  }
  
  export const withHierarchy = () => {
    
    function onFocusHandler() { }
    function onBlurHandler() { }
    function onKeyDownHandler() { }
    
    let options= { 'data':[{ "Bihar": [{ "key": "Arwal", "value": "Arwal" },{ "key": "Nawada", "value": "Nawada" },{ "key": "Gopalganj", "value": "Gopalganj" }] }, { "Andhra Pradesh": [{ "key": "Adoni", "value": "Adoni" },{ "key": "Bapatla", "value": "Bapatla" }, { "key": "Anantapur", "value": "Anantapur" } ]}, ], 'showHierarchy': true};
    options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
 
    return <div class="div-demo">
              <div>
                  <h4>With hierarchy</h4>
                  <p><small>data-options = &#123; 'showHierarchy':true , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125;&#125;</small></p>
                  
                   <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>
    
              </div>
            </div>
    }
    
    export const maxItemCounter = () => {
      function onFocusHandler() { }
      function onBlurHandler() { }
      function onKeyDownHandler() { }
      
      let options=   {"maxItemCounter":3,"canRemoveAll":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div className="div-demo">
                  <div>
                    <h4>Max item counter</h4>
                    <p><small>data-options = &#123; 'maxItemCounter':3 , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125; &#125;</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>
      
                </div>
              </div>
    }

    export const allowNewValue = () => {
      function onFocusHandler() { }
      function onBlurHandler() { }
      function onKeyDownHandler() { }
      
      let options=   {"allowNewValue":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div class="div-demo">
                  <div>
                    <h4>Allow new value</h4>
                    <p><small>data-options = &#123; 'allowNewValue':true , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125; &#125;</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>
      
                </div>
              </div>
    }

    
    export const showHelper = () => {
      function onFocusHandler() { }
      function onBlurHandler() { }
      function onKeyDownHandler() { }
      
      let options=   {"showHelper":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div class="div-demo">
                  <div>
                    <h4>Allow new value</h4>
                    <p><small>data-options = &#123; 'showHelper':true , "data": [&#123; "value": "JV", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125; &#125;</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>
      
                </div>
              </div>
    }