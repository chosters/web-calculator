// CalculatorActions.js
export const CALCULATOR_ACTIONS = {
  // Operators
  'add': {
      displaySymbol: '+',
      calculationSymbol: '+',
      type: 'operator',
      priority: 1,
      validate: function(leftValue, rightValue) {
        return Number(leftValue) + Number(rightValue) <=Number.MAX_SAFE_INTEGER;
      }
  },
  'subtract': {
    displaySymbol: '−',
    calculationSymbol: '-',
    type: 'operator',
    priority: 1,
    validate: function(leftValue, rightValue) {
      return Number(leftValue) - Number(rightValue) <=Number.MAX_SAFE_INTEGER;
    }
  },
  'divide': {
      displaySymbol: '÷',
      calculationSymbol: '/',
      type: 'operator',
      priority: 2,
      validate: function(leftValue, rightValue) {
        return Number(rightValue) !== 0;
      }
  },
  'multiply': {
      displaySymbol: '×',
      calculationSymbol: '*',
      type: 'operator',
      priority: 2,
      validate: function(leftValue, rightValue) {
        return Number(leftValue) * Number(rightValue) <=Number.MAX_SAFE_INTEGER;
      }
  },
  'percent': {
    displaySymbol: '%',
    calculationSymbol: '%', // For modulus
    divideSymbol: '/100', // For percentage
    type: 'operator',
    priority: 2,
    validate: function(leftValue, rightValue) {
      if (rightValue) {
        return rightValue !== '0' && !isNaN(Number(leftValue)) && 
        !isNaN(Number(rightValue));
      } else {
        return Number(leftValue) / 100 <= Number.MAX_SAFE_INTEGER;
      }
    }
  },

  // Functions
  'sign': {
    displaySymbol: '±',
    calculationSymbol: '-',

    type: 'function',
    validate: function(leftValue) {
      return leftValue !== '' && !isNaN(leftValue);
    }
  }, 

  // Commands
  'clear': {
    displaySymbol: 'AC',
    alternateSymbol: '⌫',    // For when numbers are entered
    type: 'command',
    shouldShowAlternate: function(leftValue) {
      // Show alternate symbol if there is a value, AC otherwise
      return leftValue !== '0';
    }
  },
  'equals': {
      displaySymbol: '=',
      calculationSymbol: '=',
      type: 'command',
  },  
}   