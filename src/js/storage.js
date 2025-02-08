// storage.js
import { CALCULATOR_ACTIONS } from "./calc.js";

export const actions = [];
export const values = [];

// Save functions for actions and values
export function saveAction(currentAction) {
  actions.push(CALCULATOR_ACTIONS[currentAction]); 
  return currentAction;
}

export function saveValue(currentValue) {
   values.push(currentValue);
}

export function getSavedActions() {
  return actions;
}

export function getSavedValues() {
  return values;
}
