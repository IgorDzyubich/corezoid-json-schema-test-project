# JSON Schema Random Data Generator

## Overview
This project provides a utility function to generate random data objects based on a given JSON Schema. It supports various schema types and constraints, ensuring compliance with the schema specifications.

## Features
- **Primitive Types**: `integer`, `number`, `string`, `boolean`
- **Complex Types**: `array`, `object`
- **Constraints**: 
  - `minimum`, `maximum` for numbers
  - `minLength`, `maxLength` for strings
  - `required` properties for objects
  - `minItems`, `maxItems` for arrays

## Installation
Clone the repository and install dependencies:
```bash
npm install
```

## Testing
```bash
npm test
```
## Test Coverage
```bash
npm run coverage
Open the HTML report at coverage/lcov-report/index.html
```

## CI Pipeline
Open [github actions](https://github.com/IgorDzyubich/corezoid-json-schema-test-project/actions)

## Example Schemas
-Integer Schema:
```bash
{ 
  "type": "integer", 
  "minimum": 1, 
  "maximum": 100 
}
```

-String Schema:
```bash
{ 
  type: "string", 
  minLength: 5, 
  maxLength: 10 
}
```

-Boolean Schema:
```bash
{ 
  type: "boolean"
}
```

-Array Schema:
```bash
{
  "type": "array",
  "items": { "type": "string", "minLength": 3, "maxLength": 5 },
  "minItems": 2,
  "maxItems": 4
}
```

-Object Schema:
```bash
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 3 },
    "age": { "type": "integer", "minimum": 18, "maximum": 99 }
  },
  "required": ["name", "age"]
}
```