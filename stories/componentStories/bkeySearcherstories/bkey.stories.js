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
      return <div className="row">
     
         
           <div className="column"><Bkey options={options} onAddItem={onAddItemHandler} onRemoveItem={onRemoveItemHandler}></Bkey>     </div> 
           <div className="column"> <pre>{`data-options = '{ "dataUrl": "https://demos.telerik.com/kendo-ui/
                 service-v4/odata/Products?$count=true&",
                "primaryKey": "ProductID",
                "showColumns": [
                  {
                    "field": "ProductID",
                    "title": "ProductID",
                    "filter": "numeric"
                  },
                  {;
                    "field": "ProductName",
                    "title": "Product Name",
                    "filter": "text"
                  }
                ] }'`}</pre></div>   
      </div>
  }  
