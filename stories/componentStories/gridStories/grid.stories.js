import React from 'react';
import { grid } from '@storybook/react/demo';
import FxGrid from "../../components/grid/fx-grid";
import '../../components/grid/fx-grid.scss';
import imageUrl from '../../assets/Capture.png';
import groupColumnUrl from '../../assets/groupColumn.PNG';
import sortColumnUrl from '../../assets/sortColumn.PNG';
import showHideColumnUrl from '../../assets/showHideColumns.png';
import selectUnselectUrl from '../../assets/selectUnselect.png';
import paginationUrl from '../../assets/pagination.png';
import cellUrl from '../../assets/cell.png';
import aggregateRowUrl from '../../assets/aggregaterow.png';
import stickyHeaderUrl from '../../assets/stickyHeader.png';
import stripedPatternUrl from '../../assets/stripedPattern.png';
import exportOptionsUrl from '../../assets/exportOptions.png';
import frontBackPaginationUrl from '../../assets/frontBackPagination.png';
import nestedPaginationUrl from '../../assets/nestedPagination.png';
import rowDetailingUrl from '../../assets/rowDetailing.png';
import lockedColumnsUrl from '../../assets/lockedColumns.png';
import resizableColumnsUrl from '../../assets/resizableColumns.png';
import reorderColumnsUrl from '../../assets/reorderColumns.png';
import infiniteScrollUrl from '../../assets/infiniteScroll.png';
import rowSelectedUrl from '../../assets/rowSelected.png';
import reorderRowUrl from '../../assets/reorderRow.png';
import rowStylingUrl from '../../assets/rowStyling.png';
import filterMenuUrl from '../../assets/filterMenu.png';
import filterSingleUrl from '../../assets/filterSingle.png';
import filterMultipleUrl from '../../assets/filterMultiple.png';
import filterSearchUrl from '../../assets/filterSearch.png';
import clearFilterUrl from '../../assets/clearFilter.png';
import cellLevelUrl from '../../assets/cellLevel.png';
import multiColumnUrl from '../../assets/multiColumn.png';
import addRowUrl from '../../assets/addRow.png';
import editcellUrl from '../../assets/editCell.png';
import externalFormUrl from '../../assets/externalForm.png';
import inCellUrl from '../../assets/inCell.png';
import disableCellUrl from '../../assets/disableCell.png';
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

