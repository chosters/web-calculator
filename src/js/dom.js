// dom.js
import { saveAction, saveValue } from "./storage.js";

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
  let currentValue = "";
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {        
      const clickedButton = event.target; 
      
      if (clickedButton.dataset.value) {
        currentValue += clickedButton.dataset.value;
        console.log('Input value:', currentValue);
      } else if (clickedButton.dataset.action) {
        saveAction(clickedButton);
        
        if (currentValue !== "") {
          saveValue(currentValue);  
          currentValue = "";
        } 
      }
    });
  });
}