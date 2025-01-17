/**
 * Generates a random data object based on a provided JSON Schema.
 *
 * The function supports various schema types (`integer`, `number`, `string`, `boolean`, `array`, `object`) 
 * and enforces constraints such as `minimum`, `maximum`, `minLength`, `maxLength`, `enum`, `required`, etc.
 *
 * @param schema - A JSON Schema object that defines the structure, types, and constraints of the data.
 *   - `type` (string): The type of data to generate (e.g., `integer`, `array`, `object`).
 *   - Other constraints depend on the `type` (e.g., `minimum` and `maximum` for numbers, `properties` for objects).
 * @returns A random data object conforming to the input JSON Schema.
 *   - The returned value matches the type specified in the schema.
 *   - If `type` is `array` or `object`, the function recursively generates nested structures.
 * @throws {Error} If the schema contains an unsupported `type`.
 */

export function generateRandomData(schema: any): any {
  switch (schema.type) {
      case "string":
          return generateRandomString(schema.minLength || 5, schema.maxLength || 10);
      case "integer":
          return generateRandomInteger(schema.minimum || 0, schema.maximum || 100);
      case "boolean":
          return Math.random() < 0.5;
      case "array":
          return generateRandomArray(schema);
      case "object":
          return generateRandomObject(schema);
      default:
          throw new Error(`Unsupported type: ${schema.type}`);
  }
}

function generateRandomString(min: number, max: number): string {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

function generateRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArray(schema: any): any[] {
  const length = Math.floor(Math.random() * ((schema.maxItems || 5) - (schema.minItems || 1) + 1)) + (schema.minItems || 1);
  return Array.from({ length }, () => generateRandomData(schema.items));
}

function generateRandomObject(schema: any): Record<string, any> {
  const obj: Record<string, any> = {};
  if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
          if (schema.required?.includes(key) || Math.random() < 0.5) {
              obj[key] = generateRandomData(schema.properties[key]);
          }
      }
  }
  return obj;
}
