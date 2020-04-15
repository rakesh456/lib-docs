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
    
    "dataOperations": {
      "primaryKey": "ProductID",
      "dataUrl":"https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
      "addUrl": "http://localhost:8089/add",
      "updateUrl": "http://localhost:8089/update",
      "deleteUrl": "http://localhost:8089/remove"
    },
    
    "showColumns":[
      {
        "field": "ProductID",
        "title": "ProductID",
        "filter": "numeric",
        "width": "100px",
        "locked": true 
      },
      {
        "field": "Discontinued",
        "title": "Discontinued",
        "filter": "boolean",
        "width": "100px"
      },
      {
        "field": "ProductName",
        "title": "Product Name",
        "filter": "text",
        "width": "220px"
      },
      {
        "field": "UnitPrice",
        "title": "Unit Price",
        "filter": "numeric",
        "width": "250"
      },
      {
        "field": "HtmlField",
        "title": "HtmlField",
        "width": "220px"
      },
      {
        "field": "UnitsInStock",
        "title": "Units In Stock",
        "editable": false,
        "filter": "numeric",
        "width": "250"
      },
      {
        "field": "UnitsOnOrder",
        "title": "UnitsOnOrder",
        "editable": false,
        "filter": "numeric",
        "width": "250"
      }
    ]}
return <div>
          <p><small>data-options = &#123;"dataOperations": &#123;  "primaryKey": "ProductID","dataUrl":"https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&","addUrl": "http:/localhost:8089/add",
      "updateUrl": "http://localhost:8089/update",
      "deleteUrl": "http://localhost:8089/remove"
    &#125;,
    
    "showColumns":[
      &#123;
        "field": "ProductID",
        "title": "ProductID",
        "filter": "numeric",
        "width": "100px",
        "locked": true 
      &#125;,
      &#123;
        "field": "Discontinued",
        "title": "Discontinued",
        "filter": "boolean",
        "width": "100px"
      &#125;,
      &#123;
        "field": "ProductName",
        "title": "Product Name",
        "filter": "text",
        "width": "220px"
      &#125;,
      &#123;
        "field": "UnitPrice",
        "title": "Unit Price",
        "filter": "numeric",
        "width": "250"
      &#125;,
      &#123;
        "field": "HtmlField",
        "title": "HtmlField",
        "width": "220px"
      &#125;,
      &#123;
        "field": "UnitsInStock",
        "title": "Units In Stock",
        "editable": false,
        "filter": "numeric",
        "width": "250"
      &#125;,
      &#123;
        "field": "UnitsOnOrder",
        "title": "UnitsOnOrder",
        "editable": false,
        "filter": "numeric",
        "width": "250"
      &#125;
    ]&#125; </small></p>
          <FxGrid options={options}></FxGrid>
      </div>
}
