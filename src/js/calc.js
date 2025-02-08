// calc.js
document.addEventListener('calc', (event) => {
  const savedActions = event.detail.savedActions;
  const calculationSymbols = savedActions.map(action => action.calculationSymbol);
  const savedValues = event.detail.savedValues;
  
  let expressionArray = [];
  expressionArray.push(savedValues[0]);

  for (let i = 0; i < calculationSymbols.length; i++) {
    expressionArray.push(calculationSymbols[i]);
    expressionArray.push(savedValues[i + 1]);
    if (calculationSymbols[i] === '=') break;
  }

  console.log('expressionArray: ', expressionArray);
});


export const CALCULATOR_ACTIONS = {
  'add': {
      displaySymbol: '+',
      calculationSymbol: '+',
      type: 'operator',
      priority: 1,
      validate: function(currentValue, nextValue) {
        return Number(currentValue) + Number(nextValue) <=Number.MAX_SAFE_INTEGER;
      }
  },
  'clear': {
      displaySymbol: 'AC',
      alternateSymbol: '⌫',    // For when numbers are entered
      type: 'function',
      shouldShowAlternate: function(currentValue) {
        // Show alternate symbol if there is a value, AC otherwise
        return currentValue !== '0';
      }
  },
  'sign': {
      displaySymbol: '±',
      calculationSymbol: '-',
      type: 'function',
      validate: function(currentValue) {
        return currentValue !== '' && !isNaN(currentValue);
      }
  }, 
  'percent': {
      displaySymbol: '%',
      calculationSymbol: '/100',
      type: 'function',
      priority: 2,
      validate: function(currentValue, nextValue) {
        return Number(currentValue) / 100 <=Number.MAX_SAFE_INTEGER;
      }
  },
  'divide': {
      displaySymbol: '÷',
      calculationSymbol: '/',
      type: 'operator',
      priority: 2,
      validate: function(currentValue, nextValue) {
        return Number(nextValue) !== 0;
      }
  },
  'multiply': {
      displaySymbol: '×',
      calculationSymbol: '*',
      type: 'operator',
      priority: 2,
      validate: function(currentValue, nextValue) {
        return Number(currentValue) * Number(nextValue) <=Number.MAX_SAFE_INTEGER;
      }
  },
  'subtract': {
      displaySymbol: '−',
      calculationSymbol: '-',
      type: 'operator',
      priority: 1,
      validate: function(currentValue, nextValue) {
        return Number(currentValue) - Number(nextValue) <=Number.MAX_SAFE_INTEGER;
      }
  },
  'dot': {
      displaySymbol: '.',
      calculationSymbol: '.',
      type: 'function',
      validate: function(currentValue) {
        return !currentValue.includes('.');
      }
  },
  'equal': {
      displaySymbol: '=',
      calculationSymbol: '=',
      type: 'function',
  },  
} 