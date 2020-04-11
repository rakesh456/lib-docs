import React from 'react';
import { form } from '@storybook/react/demo';
import FormGen from '../../components/FormGenerator/form-generator';
import '../../components/FormGenerator/css/vs.scss';

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
            "handler": "SubmitForm"
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
                     "event": "focus",
                     "handler": "onFocusHandler"
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
                     "event": "focus",
                     "handler": "onFocusHandler"
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
                     "event": "focus",
                     "handler": "onFocusHandler"
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
                     "event": "focus",
                     "handler": "onFocusHandler"
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
                     "event": "focus",
                     "handler": "onFocusHandler"
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
                  "handler": "onChangeHandler"
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
                  "handler": "onChangeHandler"
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
      },
      {
       "rowElements":[
          {
             "elementType":"button",
             "props":{
                "type":"submit",
                "id":"submitID",
                "className":" vs-primary-one-outline",
                "title":"Submit",
                "name":"Submit"
             },
             "eventHandlers":[
                {
                   "event":"submit",
                   "handler":"submitForm"
                }
             ]
          }
       ]  
    } 
   ]}
return <div className="row">
        <div className="column">
            <pre>data-options = {`  { 
     "form":{ 
        "props":{ 
           "id": "form1",
           "action":"https://www.fintellix.com",
           "method":"get"               
        },
        "eventHandlers": [{
           "event": "submit",
           "handler": "SubmitForm"
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
                    "event": "focus",
                    "handler": "onFocusHandler"
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
                    "event": "focus",
                    "handler": "onFocusHandler"
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
                    "event": "focus",
                    "handler": "onFocusHandler"
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
                    "event": "focus",
                    "handler": "onFocusHandler"
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
                    "event": "focus",
                    "handler": "onFocusHandler"
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
                 "handler": "onChangeHandler"
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
                 "handler": "onChangeHandler"
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
     },
     {
      "rowElements":[
         {
            "elementType":"button",
            "props":{
               "type":"submit",
               "id":"submitID",
               "className":" vs-primary-one-outline",
               "title":"Submit",
               "name":"Submit"
            },
            "eventHandlers":[
               {
                  "event":"submit",
                  "handler":"submitForm"
               }
            ]
         }
      ]  
   } 
  ]}`}</pre> 
  </div>
  <div className="column">
         <FormGen options={options}></FormGen>
  </div>
           
      </div>
}
