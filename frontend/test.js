const App = require('./src/App');

console.log('Test frontend:');
console.log(App() === 'Hello from Frontend Docker' ? '✅ Test passed' : '❌ Test failed');
