// dom.js
import { saveAction, saveValue, getSavedActions, getSavedValues } from "./storage.js";

function getElements() {
  return {
    displayExpression: document.querySelector('.display.expression'),
    displayPrimary: document.querySelector('.display.primary'),
    buttons: document.querySelectorAll('.button'),
  }
}

// Attach event listeners to all buttons and save actions and values
export function attachEventListeners() {
  const { buttons } = getElements();
  let currentValue = "";
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {        
      const clickedButton = event.target; 
      
      if (clickedButton.dataset.value) {
        currentValue += clickedButton.dataset.value;
      } 
      
      if (clickedButton.dataset.action) {
        currentValue = handleAction(clickedButton, currentValue);
      } 
    });
  });
}

// Helper functions
function handleAction(clickedButton, currentValue) {
  const actionKey = saveAction(clickedButton);
  if (currentValue !== "") saveValue(currentValue);  
  if (actionKey === "equal") triggerCalcEvent();
  return "";
}

function triggerCalcEvent() {
  const savedActions = getSavedActions();
  const savedValues = getSavedValues();

  const calcEvent = new CustomEvent('calc', {
    detail: {
      savedActions,
      savedValues,
    }
  });
  document.dispatchEvent(calcEvent);

  console.log('calcEvent:', calcEvent);
  console.log('savedActions:', savedActions);
  console.log('savedValues:', savedValues);
}