// Importe le module math
const { addition, multiplication } = require('./math');

// Utilisation des fonctions
console.log("CI/CD Training - Math Operations");
console.log("================================");
console.log(`Addition: 3 + 2 = ${addition(3, 2)}`);
console.log(`Multiplication: 4 * 5 = ${multiplication(4, 5)}`);
console.log("================================");

// Export pour les tests (optionnel)
module.exports = {
  addition,
  multiplication
};
