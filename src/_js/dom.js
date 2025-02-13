// dom.js
function getElements() {
  return {
      displayExpression: document.querySelector('.display.expression'),
      displayPrimary: document.querySelector('.display.primary'),
      buttons: document.querySelectorAll('.button'),
  }
}

export function attachEventListeners(calculator) {
  const { buttons } = getElements();
  
  buttons.forEach(button => {
      button.addEventListener('click', (event) => {
          const clickedButtonValue = event.target.dataset.value;
          const clickedButtonAction = event.target.dataset.action;
          
          if (clickedButtonValue) {
              calculator.appendValue(clickedButtonValue);
          }
          
          if (clickedButtonAction) {
              calculator.addAction(clickedButtonAction);
          }

          // Update display based on calculator state
          updateDisplay(calculator.getState());
      });
  });
}

function updateDisplay(state) {
  const { displayPrimary } = getElements();
  // We'll need to determine what to display based on calculator state
  // For now, just show currentValue if it exists, otherwise last savedValue
  displayPrimary.textContent = state.currentValue || 
  (state.savedValues.length > 0 ? state.savedValues[state.savedValues.length - 1] : "0");
}