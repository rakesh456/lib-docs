import React from 'react';
import { dateHierarchy } from '@storybook/react/demo';
import '../../components/DateHierarchy/date-hierarchy.scss';
import DateHierarchy from '../../components/DateHierarchy/datehierarchyView';
import '../../style.css';
import { isUndefinedOrNull } from "../../utils/utils";
import {
  resetDateHierarchyOptions
} from "../../utils/datehierarchyutils";

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


        export const  Default  = () => {
        let options = {}
        options     = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);
          return  <div className="div-demo">
                          <div>
                            <h4>Default</h4>
                            <p><small>data-options = &#123;  &#125;</small></p>
                            <p><small> Year, month and dates are always shown. Quarters and weeks can be configured to be shown/hidden. By default showQuarter is true and showWeeks is false.</small></p>
                            <DateHierarchy options={options} ></DateHierarchy>
              
                        </div>
                      </div>
        }


          export const  disabledList  = () => {
          let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": true, "height":"300","disabledList":["01/01/2000","q4/2000","w1/05/2000", "08/01/2000", "2002","01/2001"]}
          options     = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);
          
            return  <div className="div-demo">
                            <div>
                              <h4>Disabled List</h4>
                              <p><small>Disabled dates for the given list.</small></p>
                              <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2015", "showQuarters": true, "showWeeks": true,"height":"300" "disabledList":["01/01/2000","q4/2000","w1/05/2000", "08/01/2000", "2002","01/2001"] &#125;</small></p>
                             
                              <DateHierarchy options={options} ></DateHierarchy>
                
                          </div>
                        </div>
          } 

          export const showQuarters  = () => {
            let options = { "showQuarters": true }
            options     = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);
            
              return  <div className="div-demo">
                              <div>
                                <h4>Show quarters</h4>
                                <p><small>Show quarters.</small></p>
                                <p><small>data-options = &#123; "showQuarters": true &#125;</small></p>
                               
                                <DateHierarchy options={options} ></DateHierarchy>
                  
                            </div>
                          </div>
            }

            export const  showWeeks  = () => {
              let options = {"showQuarters":false,"showWeeks": true}
              options     = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);
              
                return  <div className="div-demo">
                                <div>
                                  <h4>Show weeks</h4>
                                  <p><small>Show weeks.</small></p>
                                  <p><small>data-options = &#123; "showWeeks": true, "showQuarters":false &#125;</small></p>
                                 
                                  <DateHierarchy options={options} ></DateHierarchy>
                    
                              </div>
                            </div>
              }
              export const  showWeeksAndShowQuarters  = () => {
                let options = { "showQuarters": true, "showWeeks": true}
                options     = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);
                
                  return  <div className="div-demo">
                                  <div>
                                    <h4>Show weeks and quarters</h4>
                                    <p><small>Show weeks and quarters.</small></p>
                                    <p><small>data-options = &#123;"showQuarters": true, "showWeeks": true&#125;</small></p>
                                   
                                    <DateHierarchy options={options} ></DateHierarchy>
                      
                                </div>
                              </div>
                }

               
                export const  examples  = () => {
                  let options_1 = { "showQuarters": true, "showWeeks": true,"lowerLimit": "2000", "upperLimit": "2025","height":550, "disabledList":["01/01/2001","02/04/2001","09/05/2001", "8/01/2001", "11/11/2004", "11/2001", "02/2002"]}
                  options_1     = (isUndefinedOrNull(options_1)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options_1);

                  let options_2 = { "showQuarters": false, "showWeeks": true,"lowerLimit": "2000", "upperLimit": "2025","height":600, "disabledList":["01/01/2001","02/04/2001","09/05/2001", "8/01/2001", "11/11/2004", "11/2001", "02/2002"]}
                  options_2     = (isUndefinedOrNull(options_2)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options_2);

                  let options_3 = { "showQuarters": true, "showWeeks": false,"lowerLimit": "2000", "upperLimit": "2025","height":200, "disabledList":["01/01/2001","02/04/2001","09/05/2001", "8/01/2001", "11/11/2004", "11/2001", "02/2002"]}
                  options_3     = (isUndefinedOrNull(options_3)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options_3);

                  let options_4 = { "showQuarters":false, "showWeeks":false,"lowerLimit": "2000", "upperLimit": "2025","height":500, "disabledList":["01/01/2001","02/04/2001","09/05/2001", "8/01/2001", "11/11/2004", "11/2001", "02/2002"]}
                  options_4     = (isUndefinedOrNull(options_4)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options_4);
                  
                    return  <div> <p><small>data-options = &#123; "lowerLimit": "2000", "upperLimit": "2025", "disabledList":["01/01/2001","02/04/2001","09/05/2001", "8/01/2001", "11/11/2004", "11/2001", "02/2002"] &#125;</small></p>
                    <div className="div-demo">
                      
                                    <div>
                                      <h4>ShowQuarters = true & showWeeks = true & height = 550px</h4>
                                     
                                      <DateHierarchy options={options_1} ></DateHierarchy>
                        
                                  </div>
                                  <div>
                                      <h4>ShowQuarters = false & showWeeks = true & height = 600px</h4>
                                     
                                     
                                      <DateHierarchy options={options_2} ></DateHierarchy>
                        
                                  </div>
                                  <div>
                                      <h4>ShowQuarters = true & showWeeks = false & height = 200px</h4>
                                     
                                     
                                      <DateHierarchy options={options_3} ></DateHierarchy>
                        
                                  </div>
                                  <div>
                                      <h4>ShowQuarters = false & showWeeks = false & height = 500px</h4>
                                     
                                     
                                      <DateHierarchy options={options_4} ></DateHierarchy>
                        
                                  </div>
                                </div>
                                </div>
                  }
            
