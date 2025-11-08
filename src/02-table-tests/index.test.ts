import { simpleCalculator, Action } from './index';

const validTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: -5, b: 3, action: Action.Add, expected: -2 },
  { a: 2.5, b: 1.5, action: Action.Add, expected: 4 },
];

const invalidActionTestCases = [
  { a: 5, b: 3, action: '%', expected: null },
  { a: 5, b: 3, action: undefined, expected: null },
];

const invalidArgumentsTestCases = [
  { a: '5', b: 3, action: Action.Add, expected: null },
  { a: 5, b: '3', action: Action.Add, expected: null },
  { a: true, b: false, action: Action.Add, expected: null },
  { a: [1, 2], b: 3, action: Action.Add, expected: null },
  { a: undefined, b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  describe('valid operations', () => {
    test.each(validTestCases)(
      'should calculate $a $action $b = $expected',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid actions', () => {
    test.each(invalidActionTestCases)(
      'should return null for invalid action: $action',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });

  describe('invalid arguments', () => {
    test.each(invalidArgumentsTestCases)(
      'should return null for invalid arguments: a=$a (type: ${typeof a}), b=$b (type: ${typeof b})',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });
});
