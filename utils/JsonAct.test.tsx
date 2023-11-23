import { cleanup } from '@testing-library/react';
import safeJsonParse from './JsonActions';

afterEach(() => {
  cleanup();
});
test('safeJsonParse should parse valid JSON', () => {
  const validJSON = '{"key": "value"}';
  expect(safeJsonParse(validJSON)).toEqual({ key: 'value' });
});

test('safeJsonParse should return null for invalid JSON', () => {
  const invalidJSON = 'not a valid JSON';
  expect(safeJsonParse(invalidJSON)).toBeNull();
});
