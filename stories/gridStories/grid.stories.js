import React from 'react';
import { grid } from '@storybook/react/demo';
import FxGrid from "../components/grid/fx-grid";
import '../components/grid/fx-grid.scss';
import imageUrl from '../assets/Capture.PNG';
import groupColumnUrl from '../assets/groupColumn.PNG';
import sortColumnUrl from '../assets/sortColumn.PNG';
import showHideColumnUrl from '../assets/showHideColumns.png';
import selectUnselectUrl from '../assets/selectUnselect.png';
import paginationUrl from '../assets/pagination.png';
import cellUrl from '../assets/cell.png';
import aggregateRowUrl from '../assets/aggregaterow.png';
import stickyHeaderUrl from '../assets/stickyHeader.png';
import stripedPatternUrl from '../assets/stripedPattern.png';
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

export const searchAcrossGrid = () => 
{
   return <div>
        <h4>Search Across Grid</h4>
        <img src={imageUrl}></img>
    </div>

}

export const groupColumn = () => 
{
return <div>
        <h4>Group columns</h4>
        <img src={groupColumnUrl}></img>
    </div>
}
export const sortColumn = () =>{
return <div>
        <h4>Sort column</h4>
        <img src={sortColumnUrl}></img>
    </div>
} 
export const showOrHideMoreColumns = () =>{
return <div>
        <h4>Show/Hide more Columns</h4>
        <img src={showHideColumnUrl}></img>
    </div>
} 
export const selectAndUnselect = () =>{
return <div>
        <h4>Select and Unselect</h4>
        <img src={selectUnselectUrl}></img>
    </div>
} 
export const pagination = () =>{
return <div>
        <h4>Pagination</h4>
        <img src={paginationUrl}></img>
    </div>
}
export const cellWithAnyUiComponents = () =>
{
    return <div>
        <h4>Cell with Any UI components</h4>
        <img src={cellUrl}></img>
    </div>
} 
export const aggregateRow = () =>{
    return <div>
         <h4>Aggregate Row</h4>
         <img src={aggregateRowUrl}></img>
    </div>
}
export const stripedPattern = () =>{
    return <div>
        <h4>Striped pattern</h4>
        <img src={stripedPatternUrl}></img>
    </div>
} 
export const stickyHeader = () =>{
    return <div>
        <h4>Sticky Header</h4>
        <img src={stickyHeaderUrl}></img>
    </div>
} 
