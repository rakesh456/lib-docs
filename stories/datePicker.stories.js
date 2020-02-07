import React from 'react';
import { action } from '@storybook/addon-actions';
import { datePicker } from '@storybook/react/demo';

 export default {
  title: 'Date Picker',
  component: datePicker,
};

export const text = () => <input type="date"></input>;

