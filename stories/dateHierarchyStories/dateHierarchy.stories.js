import React from 'react';
import { dateHierarchy } from '@storybook/react/demo';
import '../components/DateHierarchy/date-hierarchy.scss';
import DateHierarchy from '../components/DateHierarchy/datehierarchyView';
import '../style.css';

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

  return  <div className="div-demo">
                  <div>
                    <h4>Default</h4>
                    <p><small>data-options = &#123;  &#125;</small></p>
                   
                    <DateHierarchy options={options} ></DateHierarchy>
      
                </div>
              </div>
}


        export const  disabledList  = () => {
          let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": true, "height":"300","disabledList":["01/01/2000","q4/2000","w1/05/2000", "08/01/2000", "2002","01/2001"]}
          
            return  <div className="div-demo">
                            <div>
                              <h4>Disabled List</h4>
                              <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2015", "showQuarters": true, "showWeeks": true,"height":"300" "disabledList":["01/01/2000","q4/2000","w1/05/2000", "08/01/2000", "2002","01/2001"] &#125;</small></p>
                             
                              <DateHierarchy options={options} ></DateHierarchy>
                
                          </div>
                        </div>
          }

          export const showQuartersAndWeeks  = () => {
            let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": true, "height":"300","disabledList":["01/01/2000","02/04/2000","q1/2001","w1/12/2002"]}
            
              return  <div className="div-demo">
                              <div>
                                <h4>Show quarters and weeks </h4>
                                <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": true,"height":"300" "disabledList":["01/01/2000","02/04/2000","q1/2001","w1/12/2002"] &#125;</small></p>
                               
                                <DateHierarchy options={options} ></DateHierarchy>
                  
                            </div>
                          </div>
            }

            export const  showQuartersAndHideWeeks  = () => {
              let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": false, "height":"300","disabledList":["01/01/2000","02/04/2000","q2/2001"]}
              
                return  <div className="div-demo">
                                <div>
                                  <h4>Show Quarters</h4>
                                  <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": true, "showWeeks": false,"height":"300" "disabledList":["01/01/2000","02/04/2000","q1/2001"] &#125;</small></p>
                                 
                                  <DateHierarchy options={options} ></DateHierarchy>
                    
                              </div>
                            </div>
              }
              export const  showWeeksAndHideQuarters  = () => {
                let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": false, "showWeeks": true, "height":"300","disabledList":["01/01/2000","02/04/2000","w1/04/2000","w2/11/2001"]}
                
                  return  <div className="div-demo">
                                  <div>
                                    <h4>Show Weeks</h4>
                                    <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": false, "showWeeks": true,"height":"300" "disabledList":["01/01/2000","02/04/2000","w1/04/2000","w2/11/2001"] &#125;</small></p>
                                   
                                    <DateHierarchy options={options} ></DateHierarchy>
                      
                                </div>
                              </div>
                }

                export const  HideQuartersAndWeek  = () => {
                  let options = {"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": false, "showWeeks": false, "height":"300","disabledList":["01/01/2000","02/04/2000"]}
                  
                    return  <div className="div-demo">
                                    <div>
                                      <h4>Disable quarter and week</h4>
                                      <p><small>data-options = &#123;"lowerLimit": "2000", "upperLimit": "2020", "showQuarters": false, "showWeeks": true,"height":"300" "disabledList":["01/01/2000","02/04/2000"] &#125;</small></p>
                                     
                                      <DateHierarchy options={options} ></DateHierarchy>
                        
                                  </div>
                                </div>
                  }

            
