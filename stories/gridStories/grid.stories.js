import React from 'react';
import { grid } from '@storybook/react/demo';
import FxGrid from "../components/grid/fx-grid";
import '../components/grid/fx-grid.scss';
import imageUrl from '../assets/Capture.png';
import groupColumnUrl from '../assets/groupColumn.PNG';
import sortColumnUrl from '../assets/sortColumn.PNG';
import showHideColumnUrl from '../assets/showHideColumns.png';
import selectUnselectUrl from '../assets/selectUnselect.png';
import paginationUrl from '../assets/pagination.png';
import cellUrl from '../assets/cell.png';
import aggregateRowUrl from '../assets/aggregaterow.png';
import stickyHeaderUrl from '../assets/stickyHeader.png';
import stripedPatternUrl from '../assets/stripedPattern.png';
import exportOptionsUrl from '../assets/exportOptions.png';
import frontBackPaginationUrl from '../assets/frontBackPagination.png';
import nestedPaginationUrl from '../assets/nestedPagination.png';
import rowDetailingUrl from '../assets/rowDetailing.png';
import lockedColumnsUrl from '../assets/lockedColumns.png';
import resizableColumnsUrl from '../assets/resizableColumns.png';
import reorderColumnsUrl from '../assets/reorderColumns.png';
import infiniteScrollUrl from '../assets/infiniteScroll.png';
export default {
    title: 'Grid',
     component: grid,
}

export const demo = () => {
    let options = {"globalSearch": true,
"dataUrl":"https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
"otherGridOptions": { "exportToExcel": true, "exportToPdf": true, "reorderable": true, "resizable": true, "groupable": false, "expandField": false, "exportRecords": "all", "loadOnce": false, "allEditable": false, "rowInEditMode": true, "externalEditMode": true, "allowNewRow": false},
"sortable":{ "allowed": true,"mode":"single","allowUnsort":false },
"filterOptions": {"filterable": true, "filterMode": "row", "isMultiValueFilter": false},
"style": {"height": "600px"},
"infiniteScroll": true,
"advanced":{
  "masterDetail1":"Order_Details",
  "detailRows":{
    "columns":[{
      "label":"",
      "field":""
    },
    {
      "label":"",
      "field":""
    }]
  },
  "htmlAPI":""
},
"pageable": {"buttonCount": 7, "type": "numeric"},
"aggregates": [
],
"dataState": {
  "skip": 0,
  "take": 5,
  "sort": [
  ],
  "group": []
},
"selectedRowPrimaryKey": -1,
"dataOperations": {
  "primaryKey": "ProductID",
  "addUrl": "http://localhost:8089/add",
  "updateUrl": "http://localhost:8089/update",
  "deleteUrl": "http://localhost:8089/remove"
},
"reorderRows":true,
"uniqueUrl": "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
"lockedColumns":["UnitsOnOrder"],
"showColumns":[
{
  "field": "ProductID",
  "title": "ProductID",
  "filter": "numeric",
  "width": "250",
  "locked": true 
},
{
  "field": "ProductName",
  "title": "Product Name",
  "filter": "text",
  "width": "250px"
},
{
  "field": "UnitPrice",
  "title": "Unit Price",
  "filter": "numeric",
  "width": "250"
},
{
  "field": "ReorderLevel",
  "title": "ReorderLevel",
  "editable": false,
  "filter": "numeric",
  "width": "250"
},
{
  "field": "UnitsInStock",
  "title": "Units In Stock",
  "editable": false,
  "filter": "numeric",
  "width": "250"
},
{
  "field": "QuantityPerUnit",
  "title": "QuantityPerUnit",
  "editable": false,
  "filter": "text",
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
return <FxGrid options={options}></FxGrid>
}
export const aggregateRow = () =>{
    return <div>
         <img src={aggregateRowUrl} className="grid-img"></img>
    </div>
}
export const cellWithAnyUIComponents = () =>
{
    return <div>
        <p><small>No data-options required. If a column in JSON has HTML content it will be rendered as HTML.</small></p>
        <img className="grid-img" src={cellUrl}></img>
    </div>
}
export const exportOptions = () =>{
    return <div>
        <p><small>data-options = '&#123; "exportOptions": &#123; "toExcel": true, "toPDF": true, "allPages": true &#125; &#125;'</small></p>
        <img src={exportOptionsUrl} className="grid-img"></img>
    </div>
} 
export const frontendOrBackendPagination = () =>{
    return <div>
        <p><small>data-options = '&#123; "loadOnce": true &#125;'</small></p>
        <img src={frontBackPaginationUrl} className="grid-img"></img>
    </div>
} 
export const groupColumn = () => 
{
return <div>
        <p><small>data-options = '&#123; "otherGridOptions": &#123; "groupable": true, "expandField": true  &#125;,"dataState": &#123;  "group": [&#123;"field":"City"&#125;] &#125;  &#125;'</small></p>
        <img src={groupColumnUrl} className="grid-img"></img>
    </div>
}
export const infinteScroll = () => 
{
return <div>
        <p><small>No data-options required. If no value specified for any of pageable fields. </small></p>
        <img src={infiniteScrollUrl} className="grid-img"></img>
    </div>
}
export const lockedColumns = () =>{
    return <div>
        <p><small>data-options = '&#123; "lockedColumns":["Header6"] &#125;'</small></p>
        <img src={lockedColumnsUrl} className="grid-img"></img>
    </div>
} 
export const nestedGrid = () =>{
    return <div>
        <p><small>data-options = '&#123;  "advanced": &#123;"masterDetail":"columnName"&#125; &#125;'</small></p>
        <img src={nestedPaginationUrl} className="grid-img"></img>
    </div>
} 

export const pagination = () =>{
    return <div>
            <p><small>data-options = '&#123; "pageable": &#123; "buttonCount": 5, "type":"numeric", "info":true, "pageSizes":true, "previousNext":true &#125; &#125;'</small></p>
            <img src={paginationUrl} className="grid-img"></img>
        </div>
}
export const rowDetailingOnExpanding = () =>{
    return <div>
        <p><small>data-options = '&#123;  "advanced": &#123;"detailRows":&#123;"type": "column","columns":[&#123;"label":"Status","field":"Status"&#125;,&#123;"label":"Occurance","field":"Occurance"&#125;&#123;"label":"Comments","field":"Comments"&#125;]&#125; &#125; &#125;'</small></p>
        <img src={rowDetailingUrl} className="grid-img"></img>
    </div>
} 
export const resizableColumns = () =>{
    return <div>
        <p><small>data-options = '&#123; "otherGridOptions":&#123;"resizable":true&#125; &#125;'</small></p>
        <img src={resizableColumnsUrl} className="grid-img"></img>
    </div>
} 
export const reorderColumns = () =>{
    return <div>s
        <p><small>data-options = '&#123; "otherGridOptions":&#123;"reorderable":true&#125; &#125;'</small></p>
        <img src={reorderColumnsUrl} className="grid-img"></img>
    </div>
} 
export const searchAcrossGrid = () => 
{
   return <div>
        <p><small>data-options = '&#123; "globalSearch":true &#125;'</small></p>
        <img src={imageUrl} className="grid-img"></img>
    </div>

}
export const selectAndUnselect = () =>{
    return <div>
            <img src={selectUnselectUrl} className="grid-img"></img>
        </div>
}    
export const showOrHideMoreColumns = () =>{
    return <div>
            <p><small>data-options ='&#123; "filterOptions": &#123;"filterable": false, "filterMode": "menu"&#125; &#125;'</small></p>
            <img src={showHideColumnUrl} className="grid-img"></img>
        </div>
    } 
export const sortColumn = () =>{
return <div>
        <p><small>data-options = '&#123; "sortable": &#123; "allowed": true,"mode":"single","allowUnsort":true &#125;  &#125;'</small></p>
        <img src={sortColumnUrl} className="grid-img"></img>
    </div>
} 
export const stripedPattern = () =>{
    return <div>
        <p><small>data-options = '&#123; "style": &#123; "stripedPattern":true &#125; &#125;'</small></p>
        <img src={stripedPatternUrl} className="grid-img"></img>
    </div>
} 
export const stickyHeader = () =>{
    return <div>
        <img src={stickyHeaderUrl} className="grid-img"></img>
    </div>
} 

