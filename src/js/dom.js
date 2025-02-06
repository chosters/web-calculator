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
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {        
      const clickedButton = event.target; 
      
      if (clickedButton.dataset.value) {
        values.push(clickedButton.dataset.value);
        console.log('Number clicked:', values);
      } else if (clickedButton.dataset.action) {
        actions.push(clickedButton.dataset.action);
        console.log('Action clicked:', actions);
      }
    });
  });
}

// Call only if in a browser environment
if (typeof window !== 'undefined') {
    initializeEventListeners();
  }