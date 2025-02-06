// storage.js
export const actions = [];
export const values = [];

import { CALCULATOR_ACTIONS } from "./calculation.js";

// Save functions for actions and values
export function saveAction(clickedButton) {
  const actionKey = clickedButton.dataset.action;
  actions.push(CALCULATOR_ACTIONS[actionKey]); 
  console.log('Action clicked:', actions);
}

export function saveValue(currentValue) {
   values.push(currentValue);
   console.log('Values:', values);
}