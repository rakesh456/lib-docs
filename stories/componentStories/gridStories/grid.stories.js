import React from 'react';
import { grid } from '@storybook/react/demo';
import FxGrid from "../../components/grid/fx-grid";
import '../../components/grid/fx-grid.scss';
import '../../style.css';

export default {
    title: 'Grid',
    component: grid,
}

export const demo = () => {
let options = {
  "advanced1": {
    "masterDetail": "Order_Details",
    "detailRows": {
      "type": "column",
      "columns": [
        {
          "label": "ReorderLevel",
          "field": "UnitPrice"
        }
      ]
    },
    "rowReordering": false
  },
 
  "aggregates1": [
    {
      "field": "UnitPrice",
      "style": {
        "color": "#55ff90"
      }
    },
    {
      "field": "UnitsInStock",
      "style": {
        "color": "#55ff90"
      }
    }
  ],

  "cells": {
    "showToolTip": false
  },
  
  "columns": {
    "lockedColumns": [
  "UnitsInStock"
   ],
   
    "reorderable": true,
    "resizable": true,
    "groupable": true,
    "show": [
      {
        "field": "ProductID",
        "title": "ProductID",
        "filter": "numeric",
        "width": "100px"
      },
      {
        "field": "Discontinued",
        "title": "Discontinued",
        "filter": "boolean",
        "width": "220px"
      },
      {
        "field": "ProductName",
        "title": "Product Name",
        "filter": "text",
        "width": "220px"
      },
      {
        "field": "HtmlField",
        "title": "HtmlField",
        "width": "220px"
      },
      {
        "field": "UnitPrice",
        "title": "Unit Price",
        "filter": "numeric",
        "width": "250"
      },
      {
        "field": "UnitsInStock",
        "title": "Units In Stock",
        "filter": "numeric",
        "width": "250"
      },
      {
        "field": "UnitsOnOrder",
        "title": "UnitsOnOrder",
        "filter": "numeric",
        "width": "250"
      }
    ]
  },
  "dataOperations": {
    "loadOnce": true,
    "primaryKey": "ProductID",
    "dataUrl": "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
    "addUrl": "http://localhost:8089/addProduct",
    "updateUrl": "http://localhost:8089/updateProduct/",
    "deleteUrl": "http://localhost:8089/removeProduct/"
  },
  "editing": {
    "allEditable": false,
    "externalForm": true
  },
  "exportOptions1": {
    "toExcel": false,
    "toPDF": false,
    "allPages": false
  },
  "filtering": {
    "global": false,
    "filterable": false,
    "filterMode": "menu",
    "multiValue": false
  },
  "grouping": {
    "defaultColumns": [],
    "expandField": false
  },
  "htmlColumns": [
    "HtmlField"
  ],
  "paging": {
    "buttonCount": 5,
    "type": "checkbox",
    "previousNext": true,
    "pageSizes": true
  },
  "rows": {
    "selectedRowPrimaryKey": -1,
    "rowInEditMode": true,
    "allowNewRow": true
  },
  "scrollModes": {
    "infinite": false
  },
  "selection": {
    "showButton": true
  },
  "sorting": {
    "allowed":true ,
    "mode": "multiple",
    "allowUnsort": true
  },
  "styling": {
    "gridStyle": {
      "height": "700px"
    },
    "customizedRow": {
      "field": "UnitPrice",
      "value": "22",
      "operator": "<",
      "style": {
        "backgroundColor": "rgb(55, 180, 0,0.32)"
      }
    },
    "stripedPattern": false
  }
}
  return <div>
   
      <p><small>data-options = {`{
                "advanced1": {
                  "masterDetail": "Order_Details",
                  "detailRows": {
                    "type": "column",
                    "columns": [
                      {
                        "label": "ReorderLevel",
                        "field": "UnitPrice"
                      }
                    ]
                  },
                  "rowReordering": false
                },
              
                "aggregates1": [
                  {
                    "field": "UnitPrice",
                    "style": {
                      "color": "#55ff90"
                    }
                  },
                  {
                    "field": "UnitsInStock",
                    "style": {
                      "color": "#55ff90"
                    }
                  }
                ],

                "cells": {
                  "showToolTip": false
                },
                
                "columns": {
                  "lockedColumns": [
                "UnitsInStock"
                ],
                
                  "reorderable": true,
                  "resizable": true,
                  "groupable": true,
                  "show": [
                    {
                      "field": "ProductID",
                      "title": "ProductID",
                      "filter": "numeric",
                      "width": "100px"
                    },
                    {
                      "field": "Discontinued",
                      "title": "Discontinued",
                      "filter": "boolean",
                      "width": "220px"
                    },
                    {
                      "field": "ProductName",
                      "title": "Product Name",
                      "filter": "text",
                      "width": "220px"
                    },
                    {
                      "field": "HtmlField",
                      "title": "HtmlField",
                      "width": "220px"
                    },
                    {
                      "field": "UnitPrice",
                      "title": "Unit Price",
                      "filter": "numeric",
                      "width": "250"
                    },
                    {
                      "field": "UnitsInStock",
                      "title": "Units In Stock",
                      "filter": "numeric",
                      "width": "250"
                    },
                    {
                      "field": "UnitsOnOrder",
                      "title": "UnitsOnOrder",
                      "filter": "numeric",
                      "width": "250"
                    }
                  ]
                },
                "dataOperations": {
                  "loadOnce": true,
                  "primaryKey": "ProductID",
                  "dataUrl": "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
                  "addUrl": "http://localhost:8089/addProduct",
                  "updateUrl": "http://localhost:8089/updateProduct/",
                  "deleteUrl": "http://localhost:8089/removeProduct/"
                },
                "editing": {
                  "allEditable": false,
                  "externalForm": true
                },
                "exportOptions1": {
                  "toExcel": false,
                  "toPDF": false,
                  "allPages": false
                },
                "filtering": {
                  "global": false,
                  "filterable": false,
                  "filterMode": "menu",
                  "multiValue": false
                },
                "grouping": {
                  "defaultColumns": [],
                  "expandField": false
                },
                "htmlColumns": [
                  "HtmlField"
                ],
                "paging": {
                  "buttonCount": 5,
                  "type": "checkbox",
                  "previousNext": true,
                  "pageSizes": true
                },
                "rows": {
                  "selectedRowPrimaryKey": -1,
                  "rowInEditMode": true,
                  "allowNewRow": true
                },
                "scrollModes": {
                  "infinite": false
                },
                "selection": {
                  "showButton": true
                },
                "sorting": {
                  "allowed":true ,
                  "mode": "multiple",
                  "allowUnsort": true
                },
                "styling": {
                  "gridStyle": {
                    "height": "700px"
                  },
                  "customizedRow": {
                    "field": "UnitPrice",
                    "value": "22",
                    "operator": "<",
                    "style": {
                      "backgroundColor": "rgb(55, 180, 0,0.32)"
                    }
                  },
                  "stripedPattern": false
                }}`}
                </small></p>

        <FxGrid options={options}></FxGrid>
  </div>
}
