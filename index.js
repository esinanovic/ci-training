// Importe le module math
const { addition, multiplication } = require('./math');

console.log(`Addition: 3 + 2 = ${addition(3, 2)}`);
console.log(`Multiplication: 4 * 5 = ${multiplication(4, 5)}`);



module.exports = {
  addition,
  multiplication
};
