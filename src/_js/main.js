// main.js
import { Calculator } from './Calculator.js';
import { attachEventListeners } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    attachEventListeners(calculator);
});