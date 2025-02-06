import { CALCULATOR_ACTIONS } from "./src/js/calculation";

function getElements() {
  return {
    displayExpression: document.querySelector('.display.expression'),
    displayPrimary: document.querySelector('.display.primary'),
    buttons: document.querySelectorAll('.button'),
  }
}

// Set up event listeners for all buttons
export function initializeEventListeners() {
  const { buttons } = getElements();
  const values = [];
  const actions = [];
  let currentValue = "";
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {        
      const clickedButton = event.target; 
      
      if (clickedButton.dataset.value) {
        currentValue += clickedButton.dataset.value;
        console.log('Input value:', currentValue);
      } else if (clickedButton.dataset.action) {
        const action = clickedButton.dataset.action;
        console.log(CALCULATOR_ACTIONS[action].calculationSymbol);

        
        actions.push(clickedButton.dataset.action);
        values.push(currentValue);
        currentValue = "";
        console.log('Action clicked:', actions);
        console.log('Values:', values);
      }
    });
  });
}

// Call only if in a browser environment
if (typeof window !== 'undefined') {
    initializeEventListeners();
  }