import { generateRandomData } from "../src/index";

describe("generateRandomData", () => {
    // Primitive types
    it("should generate an integer within the specified range", () => {
        const schema = { type: "integer", minimum: 0, maximum: 10 };
        const result = generateRandomData(schema);
        expect(typeof result).toBe("number");
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(10);
    });

    it("should generate a string with specified length constraints", () => {
        const schema = { type: "string", minLength: 5, maxLength: 10 };
        const result = generateRandomData(schema);
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThanOrEqual(5);
        expect(result.length).toBeLessThanOrEqual(10);
    });

    it("should generate a random boolean", () => {
        const schema = { type: "boolean" };
        const result = generateRandomData(schema);
        expect(typeof result).toBe('boolean');
    });

    // Arrays
    it("should generate an array with items matching the schema", () => {
        const schema = {
            type: "array",
            items: { type: "integer", minimum: 0, maximum: 5 },
            minItems: 3,
            maxItems: 5,
        };
        const result = generateRandomData(schema);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(3);
        expect(result.length).toBeLessThanOrEqual(5);
        result.forEach((item: number) => {
            expect(item).toBeGreaterThanOrEqual(0);
            expect(item).toBeLessThanOrEqual(5);
        });
    });

    // Objects
    it("should generate an object with required properties", () => {
        const schema = {
            type: "object",
            properties: {
                name: { type: "string" },
                age: { type: "integer", minimum: 18, maximum: 100 },
            },
            required: ["name", "age"],
        };
        const result = generateRandomData(schema);
        expect(typeof result).toBe("object");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("age");
        expect(typeof result.name).toBe("string");
        expect(result.age).toBeGreaterThanOrEqual(18);
        expect(result.age).toBeLessThanOrEqual(100);
    });

    // Error handling
    it("should throw an error for unsupported schema type", () => {
        const schema = { type: "unsupportedType" };
        expect(() => generateRandomData(schema)).toThrowError(
            "Unsupported type: unsupportedType"
        );
    });

    // Randomness
    it("should generate different values for the same schema", () => {
        const schema = { type: "integer", minimum: 0, maximum: 10 };
        const result1 = generateRandomData(schema);
        const result2 = generateRandomData(schema);
        expect(result1).not.toBe(result2);
    });
});
