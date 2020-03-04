import React from 'react';
import { bkeySearcher } from '@storybook/react/demo';
import '../../components/bkey/bKeySearcher.scss';
import Bkey from '../../components/bkey/bkey-searcher';
import '../../style.css';


export default {
    title: 'Bkey Searcher',
     component: bkeySearcher,
}
function onAddItemHandler(){
    console.log("add item called")
}

function onRemoveItemHandler()
{
    console.log("on remove called")
}

export const Default = () => {
    let options = {
        "dataUrl": "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
       
        
        "primaryKey": "ProductID",
        "showColumns": [
          {
            "field": "ProductID",
            "title": "ProductID",
            "filter": "numeric"
          },
          {
            "field": "ProductName",
            "title": "Product Name",
            "filter": "text"
          }
        ]
      }
      return <div>
          <p><small>data-options = '&#123;  "dataUrl": "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&",
   "primaryKey": "ProductID",
   "showColumns": [
    &#123;
       "field": "ProductID",
       "title": "ProductID",
       "filter": "numeric"
       &#125;,
     &#123;
       "field": "ProductName",
       "title": "Product Name",
       "filter": "text"
       &#125;
   ] &#125;'</small></p>
           <Bkey options={options} onAddItem={onAddItemHandler} onRemoveItem={onRemoveItemHandler}></Bkey>         
      </div>
  }  
