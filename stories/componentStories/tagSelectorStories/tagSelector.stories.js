import React from 'react';
import { tagSelector } from '@storybook/react/demo';
import TagSelector from "../../components/TagSelector/tag-selector";
import '../../components/TagSelector/tag-selector.scss';
import {
  isUndefinedOrNull
} from "../../utils/utils";
import {
  resetTagSelectorOptions
} from "../../utils/tagselectorutils";
import * as c from '../../utils/cities';
import * as co from '../../utils/countries';
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


let options = {};
options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options); 

  return <div>
            <div>
              <h4>Default</h4>
              <p><small>data-options =  &#123;  &#125;</small></p>
              <p><small></small></p>
              <TagSelector options={options} onFocus={onFocusHandler}></TagSelector>
            </div>
        </div>
}

export const withoutHierarchy = () => {
  
  function onFocusHandler() { }
  
  let options = {"showHierarchy": false,"readOnly":false,"canRemoveAll":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
  options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
 
    return <div>
              <div>
                <h4>Without hierarchy</h4>
                <p><small>Displays data without hierarchy.</small></p>
                <p><small>data-options = &#123; 'showHierarchy':false , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125;] &#125;</small></p>
               
                <TagSelector  options={options} onFocus={onFocusHandler}></TagSelector>
  
            </div>
          </div>
  }
  
  export const withHierarchy = () => {
    
    function onFocusHandler() { }
    
    
    let options = { 'data':[{ "Bihar": [{ "key": "Arwal", "value": "Arwal" },{ "key": "Nawada", "value": "Nawada" },{ "key": "Gopalganj", "value": "Gopalganj" }] }, { "Andhra Pradesh": [{ "key": "Adoni", "value": "Adoni" },{ "key": "Bapatla", "value": "Bapatla" }, { "key": "Anantapur", "value": "Anantapur" } ]}, ], 'showHierarchy': true};
    options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
 
    return <div>
              <div>
                  <h4>With hierarchy</h4>
                  <p><small>Displays hierarchical data.</small></p>
                  <p><small>{`data-options =  {'data':[{ "Bihar": [{ "key": "Arwal", "value": "Arwal" },{ "key": "Nawada", "value": "Nawada" },{ "key": "Gopalganj", "value": "Gopalganj" }] }, { "Andhra Pradesh": [{ "key": "Adoni", "value": "Adoni" },{ "key": "Bapatla", "value": "Bapatla" }, { "key": "Anantapur", "value": "Anantapur" } ]}, ], 'showHierarchy': true}`}</small></p>
                  
                   <TagSelector options={options} onFocus={onFocusHandler}></TagSelector>
    
              </div>
            </div>
    }
    
    export const maxItemCounter = () => {
      function onFocusHandler() { }
      
      
      let options = {"maxItemCounter":3,"canRemoveAll":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div>
                  <div>
                    <h4>Max item counter</h4>
                    <p><small>Start grouping after "maxItemCounter" value.</small></p>
                    <p><small>data-options = &#123; 
                      "maxItemCounter":3 , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125;] &#125;</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler}></TagSelector>
      
                </div>
              </div>
    }

    export const allowNewValue = () => {
      function onFocusHandler() { }
      
      let options = {"allowNewValue":true, "data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div>
                  <div>
                    <h4>Allow new value</h4>
                    <p><small>Allow user to add new value.</small></p>
                    <p><small>data-options = &#123; "allowNewValue":true , "data": [&#123; "value": "Javascript", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125;] &#125;</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler}></TagSelector>
      
                </div>
              </div>
    }

    
    export const showHelper = () => {
      function onFocusHandler() { }
      
      let options = {"showHelper":true, "searchWithHelper":true, "data": [{ "value": "JS", "key": "Javascript" }, { "value": "CS", "key": "CSS" }, { "value": "JQ", "key": "JQuery" }, { "value": "ANG", "key": "Angular" }, { "value": "MDB", "key": "MongoDB" },{ "value": "NJs", "key": "NodeJs" }]};
      options     = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);
     
        return <div>
                  <div>
                    <h4>Show Helper</h4>
                    <p><small>Show "key" as helper text with each item. Set "searchWithHelper" as true to search in helper text also.</small></p>
                    <p><small>{`data-options = {"showHelper":true, "searchWithHelper":true, "data": [{ "value": "JS", "key": "Javascript" }, { "value": "CS", "key": "CSS" }, { "value": "JQ", "key": "JQuery" }, { "value": "ANG", "key": "Angular" }, { "value": "MDB", "key": "MongoDB" },{ "value": "NJs", "key": "NodeJs" }]}`}</small></p>
                   
                    <TagSelector  options={options} onFocus={onFocusHandler}></TagSelector>
      
                </div>
              </div>
    }

    export const examples = () =>{
      function onFocusHandler() { }
     
      
      let options_1 = {"placeholder":"Select countries", "data": [ {"key": "Afghanistan", "value": "AF"},  {"key": "Albania", "value": "AL"},  {"key": "Algeria", "value": "DZ"}, {"key": "Bahamas", "value": "BS"},{"key": "United Kingdom", "value": "GB"},  {"key": "United States", "value": "US"},{"key": "Vanuatu", "value": "VU"}, {"key": "Yemen", "value": "YE"},  {"key": "Zimbabwe", "value": "ZW"}],"showHelper":true,"maxItemCounter": 8, "searchWithHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false};
      options_1    = (isUndefinedOrNull(options_1)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options_1);

      
      let options_2 = {"maxItemCounter": 4, "searchWithHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false,"placeholder":"Select skills","data": [{ "value": "Javascript", "key": "Javascript" }, { "value": "CSS", "key": "CSS" }, { "value": "JQuery", "key": "JQuery" }, { "value": "Angular", "key": "Angular" }, { "value": "MonogDB", "key": "MonogDB" },{ "value": "NodeJs", "key": "NodeJs" }]};
      options_2    = (isUndefinedOrNull(options_2)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options_2);

      let options_3 = {"maxItemCounter": 2, "searchWithHelper": false, "canRemoveAll": false,"showHierarchy":true, "placeholder":"Select states", "data": [{
        "Bihar": [
            { "key": "Arwal", "value": "Arwal" },
            { "key": "Nawada", "value": "Nawada" },
            { "key": "Gopalganj", "value": "Gopalganj" }
        ]
    },
    {
        "Andhra Pradesh": [
            { "key": "Adoni", "value": "Adoni" },
            { "key": "Bapatla", "value": "Bapatla" },
            { "key": "Anantapur", "value": "Anantapur" }
        ]
    },
    {
        "Gujarat": [
            { "key": "Adalaj", "value": "Adalaj" },
            { "key": "Surat", "value": "Surat" },
            { "key": "Amreli", "value": "Amreli" }
        ]
    }]};
      options_3    = (isUndefinedOrNull(options_3)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options_3);

      return <div>
               <div>
                    <h4>Select Countries</h4>
                    <p><small>{`data-options ={"placeholder":"Select countries", "data": [ {"key": "Afghanistan", "value": "AF"}, {"key": "Albania", "value": "AL"}, {"key": "Algeria", "value": "DZ"}, {"key": "Bahamas", "value": "BS"},{"key": "United Kingdom", "value": "GB"}, {"key": "United States", "value": "US"},{"key": "Vanuatu", "value": "VU"}, {"key": "Yemen", "value": "YE"},  {"key": "Zimbabwe", "value": "ZW"}],"showHelper":true,"maxItemCounter": 3, "searchWithHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false}`}</small></p>
                   
                    <TagSelector  options={options_1} onFocus={onFocusHandler}></TagSelector>
      
                </div>
                <div>
                    <h4>Select Skills</h4>
                    <p><small>data-options = &#123; "maxItemCounter": 4, "searchWithHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false, "data": [&#123; "value": "JV", "key": "Javascript" &#125;, &#123;"value": "CSS", "key": "CSS" &#125;, &#123; "value": "JQuery", "key": "JQuery" &#125;, &#123; "value": "Angular", "key": "Angular" &#125;, &#123; "value": "MonogDB", "key": "MonogDB" &#125;,&#123; "value": "NodeJs", "key": "NodeJs" &#125; &#125;</small></p>
                   
                    <TagSelector  options={options_2} onFocus={onFocusHandler}></TagSelector>
      
                </div>
                <div>
                    <h4>Select States</h4>
                    <p><small>{`data-options = {"maxItemCounter": 2, "searchWithHelper": false, "canRemoveAll": false,"showHierarchy":true, "placeholder":"Select states", "data": [{
                          "Bihar": [
                              { "key": "Arwal", "value": "Arwal" },
                              { "key": "Nawada", "value": "Nawada" },
                              { "key": "Gopalganj", "value": "Gopalganj" }
                          ]
                      },
                      {
                          "Andhra Pradesh": [
                              { "key": "Adoni", "value": "Adoni" },
                              { "key": "Bapatla", "value": "Bapatla" },
                              { "key": "Anantapur", "value": "Anantapur" }
                          ]
                      },
                      {
                          "Gujarat": [
                              { "key": "Adalaj", "value": "Adalaj" },
                              { "key": "Surat", "value": "Surat" },
                              { "key": "Amreli", "value": "Amreli" }
                          ]
                      }]}`}</small></p>
                   
                    <TagSelector  options={options_3} onFocus={onFocusHandler}></TagSelector>
      
                </div>
             </div>
    }