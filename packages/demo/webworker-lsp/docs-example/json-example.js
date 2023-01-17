export var jsonContent =  `{
       "name": 12
       "country": "Ireland"
    }`;

export var jsonSchema = `{
  "definitions": {
    "color": {
      "type": "string",
      "enum": ["red", "orange", "yellow", "green", "blue", "purple", "pink"]
    }
  }
}
`;

export var jsonSchema2 = `  {"type": "object",
"description": "a very special object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "favoriteColor": {
    "description": "Favorite color",
      "$ref": "colors.schema.json#/definitions/color"
    }
  },
  "required": ["name", "age", "email", "favoriteColor"],
  "additionalProperties": false
  }
`
