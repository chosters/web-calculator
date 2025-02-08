// Calculator.js
import { CALCULATOR_ACTIONS } from "./CalculatorActions.js";

export class Calculator {
  constructor() {
    this.savedValues = [];
    this.savedActions = [];
    this.currentValue = "";
    this.currentAction = "";
  }

  // Handle when a number button is pressed
  appendValue(clickedButtonValue) {
    this.saveCurrentAction();
    this.currentValue += clickedButtonValue;
  }

  addAction(clickedButtonAction) {
    // Handle equals (=) button separately
    if (clickedButtonAction === 'equals') {
      if (this.savedValues.length === 0 && this.savedActions.length === 0) return;
      else {
        this.saveCurrentValue();
        this.calculate(); // To be implemented later
        this.currentValue = "";
        this.currentAction = "";
      }
    }

    // For all other actions
    this.currentAction = clickedButtonAction;
    if (this.currentValue !== "") {
      this.saveCurrentValue();
      this.currentValue = "";
    }

    // Handle first operation case
    if (this.savedValues.length === 0 && this.savedActions.length === 0) {
      this.currentValue = "0";
      this.saveCurrentValue();
      this.currentValue = "";
    }
  }

  saveCurrentAction() {
    if (this.currentAction !== "") {
      this.savedActions.push(CALCULATOR_ACTIONS[this.currentAction]);
      this.currentAction = "";
    }
  }

  saveCurrentValue() {
    if (this.currentValue !== "") {
      this.savedValues.push(this.currentValue);
      this.currentValue = "";
    }
  }

  getState() {
    return {
      savedValues: this.savedValues,
      savedActions: this.savedActions,
      currentValue: this.currentValue,
      currentAction: this.currentAction
    };
  }
}