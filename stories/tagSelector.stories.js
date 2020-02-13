import React from 'react';
import { action } from '@storybook/addon-actions';
import { tagSelector } from '@storybook/react/demo';
import TagSelector from "./components/TagSelector/tag-selector";


import {
    isUndefinedOrNull
} from "./utils/utils";

import {
    resetTagSelectorOptions
} from "./utils/tagselectorutils";

import './components/TagSelector/tag-selector.scss';
import * as c from './utils/countries';

import ItemsList from './components/TagSelector/tag-items-list';

export default {
   title: 'Tag Selector',
    component: tagSelector,
}

function onFocusHandler() {
    var ev = new CustomEvent('focus');
   //dispatchEvent(ev);
  
  }

  
function onBlurHandler() {
    var ev = new CustomEvent('blur');
   // el.dispatchEvent(ev);
  }

  
  function onKeyDownHandler() {
    let ev = new CustomEvent('keydown');
    //el.dispatchEvent(ev);

  }



let dataoptions=  '{"placeholder": "Select country", "maxItemCounter": 2, "showHelper": true, "canRemoveAll": true, "allowNewValue": true, "showHierarchy": false}';

let options = JSON.parse(dataoptions);


export const Demo = () => <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}></TagSelector>


