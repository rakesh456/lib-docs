import React from 'react';
import { action } from '@storybook/addon-actions';
import { dateHierarchy } from '@storybook/react/demo';
import './components/DateHierarchy/date-hierarchy.scss';
import DatehierarchyView from './components/DateHierarchy/datehierarchyView';

export default {
    title: 'Date Hierarchy',
     component: dateHierarchy,
 }

  

let dataoptions = '{"lowerLimit": "2000", "upperLimit": "2025", "showQuarters": false, "showWeeks": true, "height": "300", "disabledList":["01/01/2000","02/04/2000","09/05/2000", "8/01/2000", "11/11/2025"]}'

let options = JSON.parse(dataoptions)
export const  Demo  = () => <DatehierarchyView options={options} ></DatehierarchyView>