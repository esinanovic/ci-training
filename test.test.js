const { addition, multiplication } = require('./math');

describe("Math functions", () => {
  
  test("addition function works correctly", () => {
    expect(addition(3, 2)).toBe(5);
    expect(addition(0, 0)).toBe(0);
    expect(addition(-1, 1)).toBe(0);
    expect(addition(10, -5)).toBe(5);
  });

  test("multiplication function works correctly", () => {
    expect(multiplication(4, 5)).toBe(20);
    expect(multiplication(0, 10)).toBe(0);
    expect(multiplication(-3, 3)).toBe(-9);
  });

  test("addition with decimals", () => {
    expect(addition(1.5, 2.5)).toBe(4);
    expect(addition(0.1, 0.2)).toBeCloseTo(0.3);
  });
});