// Calculator.js
import { CALCULATOR_ACTIONS } from "./CalculatorActions.js";

export class Calculator {
  constructor() {
    this.savedValues = [];
    this.savedActions = [];
    this.currentValue = "";
    this.currentAction = "";
    this.result = "";
    this.expressionBeforeCalculation = "";
  }

  // Handle when a number button is pressed
  appendValue(clickedButtonValue) {
    this.saveCurrentAction();
    if (this.currentValue === "0") {
      this.currentValue = clickedButtonValue;
    } else {    
      this.currentValue += clickedButtonValue;
    }
  }

  addAction(clickedButtonAction) {
    this.result = ""; // Reset result when adding an action

    // Handle equals button separately
    if (clickedButtonAction === 'equals') {
      if (this.savedValues.length === 0 && this.savedActions.length === 0) return;
      else {
        this.saveCurrentValue();
        this.calculate();
        this.currentValue = "";
        this.currentAction = "";
        // Excludes 'return;' to allow continuous calculation
      }
    }

    // For all other actions
    const actionType = CALCULATOR_ACTIONS[clickedButtonAction].type;

    switch (actionType) {
      case 'operator':
        this.currentAction = clickedButtonAction;
        if (this.currentValue !== "") {
          this.saveCurrentValue();
          this.currentValue = "";
        } else if (this.savedValues.length === 0 && this.savedActions.length === 0) {
          this.currentValue = "0";
          this.saveCurrentValue();
          this.currentValue = "";
        }
        break;
      case 'function':
        if (clickedButtonAction === 'sign') {
          if (this.currentValue !== "") {
            this.currentValue = (Number(this.currentValue) * -1).toString();
          }
        } else if (clickedButtonAction === 'percent') {
          this.currentValue = (Number(this.currentValue) / 100).toString();
        }
        break;
      case 'command':
        if (clickedButtonAction === 'clear') {
          // AC (All Clear) - when current inputs are empty and result is not empty
          if ((this.currentValue === "" && this.currentAction === "") ||
            this.result !== "") {
            this.clearAll();
            return;
          }
          // Shows alternate delete symbol (⌫)
          else {
            // If there's a current value, delete each character
            if (this.currentValue !== "") {
              this.currentValue = this.currentValue.slice(0, -1);
              if (this.currentValue === "") {
                this.currentValue = "";
              }
            }
            // Then delete current action if it exists
            else if (this.currentAction !== "") {
              this.currentAction = "";
            }
            // Then delete last saved action if it exists
            else if (this.savedActions.length > 0) {
              this.savedActions.pop();
            }
            // Then delete last saved value
            else if (this.savedValues.length > 0) {
              this.savedValues.pop();
            }
          }
        }
        break;
    }
  }

  // Calculation Logic
  calculate() {
    // Step 1: Build initial expression array
    let expressionArray = [];
    expressionArray.push(this.savedValues[0]);

    for (let i = 0; i < this.savedActions.length; i++) {
      expressionArray.push(this.savedActions[i].calculationSymbol);
      expressionArray.push(this.savedValues[i + 1]);
    }

    // Step 1.5: Set the expression before calculation
    this.expressionBeforeCalculation = this.savedValues[0];
    for (let i = 0; i < this.savedActions.length; i++) {
      this.expressionBeforeCalculation += this.savedActions[i].displaySymbol;
      this.expressionBeforeCalculation += this.savedValues[i + 1];
    }

    // Step 2: Process priority 2 operations (×, ÷, %)
    let i = 1;  // Start at 1 since first element is always a number
    while (i < expressionArray.length) {
      const currentAction = this.savedActions.find(
        action => action.calculationSymbol === expressionArray[i]
      );

      if (currentAction && currentAction.priority === 2) {
        const leftValue = Number(expressionArray[i - 1]);
        const rightValue = Number(expressionArray[i + 1]);
        let result;

        // Handle each priority 2 operation
        switch (expressionArray[i]) {
          case '*':
            if (!currentAction.validate(leftValue, rightValue)) {
              return "UNDEFINED";
            }
            result = leftValue * rightValue;
            break;

          case '/':
            if (!currentAction.validate(leftValue, rightValue)) {
              return "UNDEFINED";
            }
            result = leftValue / rightValue;
            break;

          case '%':
            if (rightValue !== undefined) {
              if (!currentAction.validate(leftValue, rightValue)) {
                return "UNDEFINED";
              }
              result = leftValue % rightValue;
            } else {
              if (!currentAction.validate(leftValue)) {
                return "UNDEFINED";
              }
              result = leftValue / 100;
            }
            break;
        }

        expressionArray.splice(i - 1, 3, result.toString());
        i = 1;
      } else {
        i += 2;
      }
    }

    // Step 3: Process priority 1 operations (+, -)
    i = 1;
    while (i < expressionArray.length) {
      const currentAction = this.savedActions.find(
        action => action.calculationSymbol === expressionArray[i]
      );

      if (currentAction && currentAction.priority === 1) {
        const leftValue = Number(expressionArray[i - 1]);
        const rightValue = Number(expressionArray[i + 1]);
        let result;

        switch (expressionArray[i]) {
          case '+':
            if (!currentAction.validate(leftValue, rightValue)) {
              return "UNDEFINED";
            }
            result = leftValue + rightValue;
            break;
          case '-':
            if (!currentAction.validate(leftValue, rightValue)) {
              return "UNDEFINED";
            }
            result = leftValue - rightValue;
            break;
        }

        expressionArray.splice(i - 1, 3, result.toString());
        i = 1;
      } else {
        i += 2;
      }
    }

    // Return final result
    this.currentValue = expressionArray[0];
    this.result = expressionArray[0];

    // Update saved values and actions
    this.savedActions.length = 0;
    this.savedValues.length = 0;
    this.savedValues.push(expressionArray[0]);
  }

  // Helper functions
  saveCurrentAction() {
    if (this.currentAction !== "") {
      this.savedActions.push(CALCULATOR_ACTIONS[this.currentAction]);
      this.currentAction = "";
    }
  }

  saveCurrentValue() {
    if (this.currentValue !== "") {
      this.savedValues.push(this.currentValue);
    }
  }

  clearAll() {
    this.savedValues = [];
    this.savedActions = [];
    this.currentValue = "0";
    this.currentAction = "";
    this.result = "";
  }

  getState() {
    return {
      savedValues: this.savedValues,
      savedActions: this.savedActions,
      currentValue: this.currentValue,
      currentAction: this.currentAction,
      result: this.result,
      expressionBeforeCalculation: this.expressionBeforeCalculation,
      currentActionSymbol: CALCULATOR_ACTIONS[this.currentAction]?.displaySymbol || "",
    };
  }
} 