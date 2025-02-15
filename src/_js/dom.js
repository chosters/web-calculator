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
          updateDisplayAll(calculator.getState());
      });
  });
}

function updateDisplayAll(state) { 

  updateDisplayExpression(state);
  updateDisplayPrimary(state, displayExpressionLogic);
}

function updateDisplayExpression(state) {
  const { displayExpression } = getElements();
  console.log('State: ', state);

  if (state.result) {
    displayExpression.textContent = state.expressionBeforeCalculation;
  } else {
    displayExpression.textContent = "";
  }
}

function updateDisplayPrimary(state, displayExpressionLogic) {
  const { displayPrimary } = getElements();
  displayPrimary.textContent = displayExpressionLogic(state);
}


function displayExpressionLogic(state) {
  let expressionString = "";

  if (state.savedValues.length > 0) {
    expressionString = state.savedValues[0];

    for (let i = 0; i < state.savedActions.length; i++) {
      expressionString += state.savedActions[i].displaySymbol;
      if (state.savedValues[i + 1]) {
        expressionString += state.savedValues[i + 1];
      }
    }
    expressionString += state.currentActionSymbol;
    expressionString += state.currentValue;
  } else {
    expressionString = state.currentValue;
  }
  return expressionString;
}