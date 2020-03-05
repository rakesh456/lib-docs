import React from 'react';
import { form } from '@storybook/react/demo';
import FormGen from '../../components/FormGenerator/form-generator';

export default {
    title: 'Form Generator',
     component: form,
}

export const demo = () => {
    let options = 
    { 
     "form":{ 
        "props":{ 
           "id": "form1",
           "action":"https://www.fintellix.com",
           "method":"get"               
        },
        "eventHandlers": [{
           "event": "submit",
           "handler": "skundSubmitForm"
       }]
     },
     "rows":[ 
     { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"text",
                    "id":"firstname",
                    "className":"my-firstname-class",
                    "title":"Firstname",
                    "placeholder": "Your input",
                    "required": "required"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Firstname",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
         { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"text",
                    "id":"lastname",
                    "className":"lastname-class",
                    "title":"Lastname",
                    "placeholder": "Your input",
                    "required": "required"
                 }
              }
           ],
           "rowLabel":{ 
              "name":"Lastname",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"email",
                    "id":"email",
                    "className" : "email-class",
                    "title":"Email",
                    "placeholder": "Your input"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Email",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"password",
                    "id":"password",
                    "className":"password-class",
                    "title":"Password",
                    "placeholder": "Your input"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Password",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"file",
                    "id":"file",
                    "className":"file-class",
                    "title":"Upload File",
                    "placeholder": "Select File"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Upload Your File",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"radio",
                    "id":"male",
                    "name":"gender",
                    "className": "male-class"
                 },
                 "elementLabel":{ 
                    "name":"male",
                    "props":{ 
                       "className":"vs-radiobutton1"
                    }
                 },
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              },
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"radio",
                    "id":"female",
                    "name":"gender",
                    "required" : "required"
                 },
                 "elementLabel":{ 
                    "name":"female",
                    "props":{ 
                       "className":"vs-radiobutton2"
                    }
                 },
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Gender",
              "props":{ 
                 "className":"vs-label"
              }
           }
        },
  
  
  
        { 
         "rowElements":[ 
            { 
               "elementType":"select",
               "props":{ 
                  "id":"countries",
                  "className":"vs-dropdown",
                  "required":"required",
                  "defaultValue":"IN"
               },
               "eventHandlers": [{
                 "event": "change",
                 "handler": "submitForm"
             }],
               "options":[ 
                 { 
                     "props":{ 
                         "value":""
                     },
                     "optionLabel":"Select One"
                 },
                  { 
                     "props":{ 
                        "value":"IN"
                     },
                     "optionLabel":"India"
                  },
                  { 
                     "props":{ 
                        "value":"US" 
                     },
                     "optionLabel":"USA"
                  },
                  { 
                     "props":{ 
                        "value":"CA"
                     },
                     "optionLabel":"Canada"
                  }
               ]
            }
         ],
         
         "rowLabel":{ 
            "name":"Select Country",
            "props":{ 
               "className":"vs-body-regular-primary"
            }
         }
      },
  
      { 
         "rowElements":[ 
            { 
               "elementType":"textarea",
               "props":{ 
                  "id":"story",
                  "name":"story",
                  "rows":"5",
                  "cols":"33",
                  "maxLength":"500",
                  "required" : "required",
                  "className":"my-textarea",
                  "placeholder": "Your input"
               },
               "eventHandlers": [{
                 "event": "change",
                 "handler": "submitForm"
             }]
            }
         ],
         "rowLabel":{ 
            "name":"Your Story:",
            "props":{ 
               "className":"vs-body-regular-primary"
            }
         }
      },
  
      { 
        "rowElements":[ 
           { 
              "elementType":"datepicker",
              "props":{ 
                 "id":"id",
                 "name":"datepicker",
                 "data-options":"{\"displayFormat\": \"DD/MM/YYYY\", \"iconAlignment\":\"left\", \"showErrorMessage\": true, \"dateStringAlignment\": \"left\", \"lowerLimit\": \"08/07/2017\", \"upperLimit\": \"30/12/2018\", \"validationMessages\": [{\"inValidFormat\": \"Invalid DOB\"}, { \"outsideRange\": \"\"}] , \"isDisabled\": false, \"showButtons\": false, \"dateButtonPrimary\": \"Ok\", \"showClearIcon\": false, \"manualEntry\": true, \"disabledList\": [\"08/07/2017\", \"09/07/2017\", \"01/11/2020\", \"20/11/2019\"], \"indicatorList\": [{ \"dates\": [\"01/10/2019\",\"02/11/2019\"], \"color\": \"#333\" }, { \"dates\": [\"02/09/2019\",\"01/08/2019\"], \"color\": \"#ff0000\" }]}",
                 "className": "my-datepicker-class"
              }
           }
        ],
        "rowLabel":{ 
           "name":"Select Date:",
           "props":{ 
              "className":"vs-body-regular-primary"
           }
        }
     },
  
  
  
  {
        "rowElements": [{
           "elementType": "tagselector",
           "props": {
              "id": "tagselectorID",
              "name": "tagselector",
              "data-options": "{\"placeholder\": \"Select skills\", \"maxItemCounter\": 2, \"searchWithHelper\": true, \"canRemoveAll\": true, \"allowNewValue\": true, \"showHierarchy\": false, \"data\": [{ \"value\": \"Javascript\", \"key\": \"Javascript\" }, { \"value\": \"CSS\", \"key\": \"CSS\" }, { \"value\": \"JQuery\", \"key\": \"JQuery\" }, { \"value\": \"Angular\", \"key\": \"Angular\" }, { \"value\": \"MonogDB\", \"key\": \"MonogDB\" },{ \"value\": \"NodeJs\", \"key\": \"NodeJs\" }]}"                  
           }
        }],
        "rowLabel": {
           "name": "Select a Tag:",
           "props": {
              "className": "vs-body-regular-primary"
           }
        }
     },
  
  
  {
        "rowElements": [{
           "elementType": "datehierarchy",
           "props": {
              "id": "datehierarchyID",
              "name": "datehierarchy",
              "data-options": "{\"lowerLimit\":\"2000\",\"upperLimit\":\"2025\",\"disabledList\":[\"01/01/2000\",\"02/04/2000\",\"09/05/2000\", \"8/01/2000\", \"11/11/2025\"]}"                  
           }
        }],
        "rowLabel": {
           "name": "Select Date(s):",
           "props": {
              "className": "vs-body-regular-primary"
           }
        }
     },

     {
        "rowElements": [{
           "elementType": "img",
           "props": {
              "id": "imgID",
              "name": "profileImage",
              "src": "https://www.prlog.org/12405743-fintellix-logo.png", 
              "alt": "Smiley face", 
              "width": "100px", 
              "height": "50px",
              "className": "myImageClass"
           }
        }],
        "rowLabel": {
           "name": "Image:",
           "props": {
              "class": "vs-body-regular-primary"
           }
        }
     }   
  
  
  ]}
return <div className="row">
        <div className="column">
            <pre>data-options = {` { 
     "form":{ 
        "props":{ 
           "id": "form1",
           "action":"https://www.fintellix.com",
           "method":"get"               
        },
        "eventHandlers": [{
           "event": "submit",
           "handler": "skundSubmitForm"
       }]
     },
     "rows":[ 
     { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"text",
                    "id":"firstname",
                    "className":"my-firstname-class",
                    "title":"Firstname",
                    "placeholder": "Your input",
                    "required": "required"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Firstname",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"text",
                    "id":"lastname",
                    "className":"lastname-class",
                    "title":"Lastname",
                    "placeholder": "Your input",
                    "required": "required"
                 }
              }
           ],
           "rowLabel":{ 
              "name":"Lastname",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"email",
                    "id":"email",
                    "className" : "email-class",
                    "title":"Email",
                    "placeholder": "Your input"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Email",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"password",
                    "id":"password",
                    "className":"password-class",
                    "title":"Password",
                    "placeholder": "Your input"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Password",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"file",
                    "id":"file",
                    "className":"file-class",
                    "title":"Upload File",
                    "placeholder": "Select File"
                 },
  
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Upload Your File",
              "props":{ 
                 "className":"vs-body-regular-primary"
              }
           }
        },
        { 
           "rowElements":[ 
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"radio",
                    "id":"male",
                    "name":"gender",
                    "className": "male-class"
                 },
                 "elementLabel":{ 
                    "name":"male",
                    "props":{ 
                       "className":"vs-radiobutton1"
                    }
                 },
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              },
              { 
                 "elementType":"input",
                 "props":{ 
                    "type":"radio",
                    "id":"female",
                    "name":"gender",
                    "required" : "required"
                 },
                 "elementLabel":{ 
                    "name":"female",
                    "props":{ 
                       "className":"vs-radiobutton2"
                    }
                 },
                 "eventHandlers": [{
                    "event": "change",
                    "handler": "submitForm"
                }]
              }
           ],
           "rowLabel":{ 
              "name":"Gender",
              "props":{ 
                 "className":"vs-label"
              }
           }
        },
  
  
  
        { 
         "rowElements":[ 
            { 
               "elementType":"select",
               "props":{ 
                  "id":"countries",
                  "className":"vs-dropdown",
                  "required":"required",
                  "defaultValue":"IN"
               },
               "eventHandlers": [{
                 "event": "change",
                 "handler": "submitForm"
             }],
               "options":[ 
                 { 
                     "props":{ 
                         "value":""
                     },
                     "optionLabel":"Select One"
                 },
                  { 
                     "props":{ 
                        "value":"IN"
                     },
                     "optionLabel":"India"
                  },
                  { 
                     "props":{ 
                        "value":"US" 
                     },
                     "optionLabel":"USA"
                  },
                  { 
                     "props":{ 
                        "value":"CA"
                     },
                     "optionLabel":"Canada"
                  }
               ]
            }
         ],
         
         "rowLabel":{ 
            "name":"Select Country",
            "props":{ 
               "className":"vs-body-regular-primary"
            }
         }
      },
  
      { 
         "rowElements":[ 
            { 
               "elementType":"textarea",
               "props":{ 
                  "id":"story",
                  "name":"story",
                  "rows":"5",
                  "cols":"33",
                  "maxLength":"500",
                  "required" : "required",
                  "className":"my-textarea",
                  "placeholder": "Your input"
               },
               "eventHandlers": [{
                 "event": "change",
                 "handler": "submitForm"
             }]
            }
         ],
         "rowLabel":{ 
            "name":"Your Story:",
            "props":{ 
               "className":"vs-body-regular-primary"
            }
         }
      },
  
      { 
        "rowElements":[ 
           { 
              "elementType":"datepicker",
              "props":{ 
                 "id":"id",
                 "name":"datepicker",
                 "data-options":"{\"displayFormat\": \"DD/MM/YYYY\", \"iconAlignment\":\"left\", \"showErrorMessage\": true, \"dateStringAlignment\": \"left\", \"lowerLimit\": \"08/07/2017\", \"upperLimit\": \"30/12/2018\", \"validationMessages\": [{\"inValidFormat\": \"Invalid DOB\"}, { \"outsideRange\": \"\"}] , \"isDisabled\": false, \"showButtons\": false, \"dateButtonPrimary\": \"Ok\", \"showClearIcon\": false, \"manualEntry\": true, \"disabledList\": [\"08/07/2017\", \"09/07/2017\", \"01/11/2020\", \"20/11/2019\"], \"indicatorList\": [{ \"dates\": [\"01/10/2019\",\"02/11/2019\"], \"color\": \"#333\" }, { \"dates\": [\"02/09/2019\",\"01/08/2019\"], \"color\": \"#ff0000\" }]}",
                 "className": "my-datepicker-class"
              }
           }
        ],
        "rowLabel":{ 
           "name":"Select Date:",
           "props":{ 
              "className":"vs-body-regular-primary"
           }
        }
     },
  
  
  
  {
        "rowElements": [{
           "elementType": "tagselector",
           "props": {
              "id": "tagselectorID",
              "name": "tagselector",
              "data-options": "{\"placeholder\": \"Select skills\", \"maxItemCounter\": 2, \"searchWithHelper\": true, \"canRemoveAll\": true, \"allowNewValue\": true, \"showHierarchy\": false, \"data\": [{ \"value\": \"Javascript\", \"key\": \"Javascript\" }, { \"value\": \"CSS\", \"key\": \"CSS\" }, { \"value\": \"JQuery\", \"key\": \"JQuery\" }, { \"value\": \"Angular\", \"key\": \"Angular\" }, { \"value\": \"MonogDB\", \"key\": \"MonogDB\" },{ \"value\": \"NodeJs\", \"key\": \"NodeJs\" }]}"                  
           }
        }],
        "rowLabel": {
           "name": "Select a Tag:",
           "props": {
              "className": "vs-body-regular-primary"
           }
        }
     },
  
  
  {
        "rowElements": [{
           "elementType": "datehierarchy",
           "props": {
              "id": "datehierarchyID",
              "name": "datehierarchy",
              "data-options": "{\"lowerLimit\":\"2000\",\"upperLimit\":\"2025\",\"disabledList\":[\"01/01/2000\",\"02/04/2000\",\"09/05/2000\", \"8/01/2000\", \"11/11/2025\"]}"                  
           }
        }],
        "rowLabel": {
           "name": "Select Date(s):",
           "props": {
              "className": "vs-body-regular-primary"
           }
        }
     },

     {
        "rowElements": [{
           "elementType": "img",
           "props": {
              "id": "imgID",
              "name": "profileImage",
              "src": "https://www.prlog.org/12405743-fintellix-logo.png", 
              "alt": "Smiley face", 
              "width": "100px", 
              "height": "50px",
              "className": "myImageClass"
           }
        }],
        "rowLabel": {
           "name": "Image:",
           "props": {
              "class": "vs-body-regular-primary"
           }
        }
     }  
  
  
  ]}`}</pre> 
  </div>
  <div className="column">
         <FormGen options={options}></FormGen>
  </div>
           
      </div>
}
