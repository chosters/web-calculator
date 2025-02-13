// dom.js
import { saveAction, saveValue, getSavedActions, getSavedValues } from "./storage.js";

function getElements() {
  return {
    displayExpression: document.querySelector('.display.expression'),
    displayPrimary: document.querySelector('.display.primary'),
    buttons: document.querySelectorAll('.button'),
  }
}

const { displayPrimary } = getElements();
displayPrimary.textContent = "0";

// Attach event listeners to all buttons and save actions and values
export function attachEventListeners() {
  const { buttons } = getElements();
  let currentValue = "";
  let currentAction = "";
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {        
      const clickedButton = event.target; 
      const clickedButtonValue = clickedButton.dataset.value;
      const clickedButtonAction = clickedButton.dataset.action;
      
      // if (clickedButtonValue) {
      //   currentValue += clickedButtonValue;
      //   if (currentAction !== "") {
      //     saveAction(currentAction);
      //     currentAction = "";
      //   }
      // } 
      
      // if (clickedButtonAction && clickedButtonAction !== "equal") {
      //   currentAction = clickedButtonAction;
      //   if (currentValue !== "") {
      //     saveValue(currentValue);
      //     currentValue = "";
      //   }
      //   if (getSavedValues().length === 0 && getSavedActions().length === 0) {
      //     saveValue("0");
      //     currentValue = "";
      //   } 
      // }

      // if (clickedButtonAction === "equal") {
      //   if (getSavedValues().length === 0 && getSavedActions().length === 0) return;
      //   else {
      //     saveValue(currentValue);
      //     triggerCalcEvent();
      //     currentValue = "";
      //     currentAction = "";
      //   }
      // }

      // console.log('current value: ', currentValue); 
      // console.log('current action: ', currentAction);
      // console.log('saved values: ', getSavedValues());
      // console.log('saved actions: ', getSavedActions());
    });
  });
}

// function triggerCalcEvent() {
//   const savedActions = getSavedActions();
//   const savedValues = getSavedValues();

//   const calcEvent = new CustomEvent('calc', {
//     detail: {
//       savedActions: savedActions,
//       savedValues: savedValues
//     }
//   });
//   document.dispatchEvent(calcEvent);
// }


// Helper functions
function handleAction(clickedButton, currentAction) {
  if (currentAction !== "") {
    saveAction(clickedButton);
    return "";
  } else return currentAction;
}

function handleValue(currentValue) {
  if (currentValue !== "") {
    saveValue(currentValue);
    return "";
  } else return ""; 
}