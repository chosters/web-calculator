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
    // Handle equals button separately
    if (clickedButtonAction === 'equals') {
      if (this.savedValues.length === 0 && this.savedActions.length === 0) return;
      else {
        this.saveCurrentValue();
        this.calculate(); // To be implemented later
        this.currentValue = "";
        this.currentAction = "";
        // Excludes 'return;' to allow continuous calculation
      }
    }

    // For all other actions
    const actionType = CALCULATOR_ACTIONS[clickedButtonAction].type;
    
    switch(actionType) {
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
      case 'command': // WIP!!
        if (clickedButtonAction === 'clear') {
          // AC (all Clear) - when no current inputs and showing AC symbol
          if (this.currentValue === "" && this.savedValues.length === 0) {
            this.clearAll();
            return;
          }

          // Check if we're in a state that shows alternate symbol (⌫)
          if (this.currentValue !== "" || this.savedActions.length > 0) {
              // If there's a current value, delete that first
              if (this.currentValue !== "") {
                  this.currentValue = "";
              } 
              // Then delete last saved action if it exists
              else if (this.savedActions.length > 0) {
                  this.savedActions.pop();
              }
              // Then delete last saved value
              else if (this.savedValues.length > 0) {
                  this.savedValues.pop();
              }
  
              // If everything is cleared, set to initial state
              if (this.savedValues.length === 0) {
                  this.currentValue = "0";
              }
          } else {
              // AC - Clear everything
              this.savedValues = [];
              this.savedActions = [];
              this.currentValue = "0";
              this.currentAction = "";
          }
      }
      break;
    }
  }

  // Calculation Logic
  calculate() {
    if (this.savedValues.length === 0 && this.savedActions.length === 0) return;

    const calculationActions = this.savedActions.map(action => ({
      calculationSymbol: action.calculationSymbol,
      divideSymbol: action.divideSymbol, // For percentage ('1/100')
      validate: action.validate
    }));

    let expressionArray = [];
    expressionArray.push(this.savedValues[0]);
    for (let i = 0; i < calculationActions.length; i++) {
      expressionArray.push(calculationActions[i].calculationSymbol);
      expressionArray.push(this.savedValues[i + 1]);
      if (calculationActions[i].calculationSymbol === '=') break;
    }

    // First, handle priority 2 operations (x, ÷, %)
    for (let i = 0; i < expressionArray.length; i++) {
      const operatorAction = calculationActions.find(action => 
        action.calculationSymbol === expressionArray[i] && 
        CALCULATOR_ACTIONS[action.calculationSymbol].priority === 2
      )

      if (operatorAction) {
        const operator = expressionArray[i];
        const leftValue = Number(expressionArray[i - 1]);
        const rightValue = Number(expressionArray[i + 1]);

        // Validate before calculating
        if (!operatorAction.validate(leftValue, rightValue)) {
          console.log(`Invalid operation: ${leftValue} ${operator} ${rightValue}`);
          return; // Stop caclulation if validation fails
        }

        let result;
        switch (operator) {
          case '*':
            result = Number(leftValue) * Number(rightValue);
            break;
          case '/':
            result = Number(leftValue) / Number(rightValue);
            break;
          case '%':
            result = Number(leftValue) % Number(rightValue);
            break; 
        }
      }

      // Replace the operator and values with the result
      expressionArray.splice(i - 1, 3, result.toString());
      i--; // Adjust index after replacing
    }

    // Then handle priority 1 operations (+, -)


    // Convert string values to number for calculation

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