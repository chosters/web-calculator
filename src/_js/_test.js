// _test.js
import { Calculator } from "./Calculator.js";

function testCalculator() {
  const calculator = new Calculator();
  
  // Test initial state
  console.log("Truly initial state:", JSON.stringify(calculator.getState()));

  // Test single number input
  calculator.appendValue("5");
  console.log("After entering 5:", calculator.getState());

  // Test action input
  calculator.addAction("add");
  console.log("After pressing +:", calculator.getState());

  // Test second number
  calculator.appendValue("3");
  console.log("After entering 3:", calculator.getState());

  // Test equals
  calculator.addAction("equals");
  console.log("After pressing =:", calculator.getState());
}

testCalculator();