import { formatJson, isValidJson } from '@/src/utils/formatJson';

describe('JSON Utils', () => {
  describe('formatJson', () => {
    it('should format valid JSON string correctly', () => {
      const input = '{"key":"value","number":123,"array":[1,2,3]}';
      const formatted = formatJson(input);

      const expectedOutput = `{
    "key": "value",
    "number": 123,
    "array": [1, 2, 3]
}`;

      expect(formatted).toBe(expectedOutput);
    });

    it('should return null for invalid JSON string', () => {
      const input = '{"key": value,}';
      const formatted = formatJson(input);

      expect(formatted).toBeNull();
    });
  });

  describe('isValidJson', () => {
    it('should return true for a valid JSON string', () => {
      const input = '{"key": "value", "number": 123, "array": [1, 2, 3]}';
      const isValid = isValidJson(input);

      expect(isValid).toBe(true);
    });

    it('should return false for an invalid JSON string', () => {
      const input = '{"key": value,}';
      const isValid = isValidJson(input);

      expect(isValid).toBe(false);
    });

    it('should return false for an empty string', () => {
      const input = '';
      const isValid = isValidJson(input);

      expect(isValid).toBe(false);
    });

    it('should return false for a non-JSON string', () => {
      const input = 'Hello, World!';
      const isValid = isValidJson(input);

      expect(isValid).toBe(false);
    });
  });
});
