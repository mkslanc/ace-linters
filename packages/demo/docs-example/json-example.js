export var jsonContent =  `{
       "name": 12
       "country": "Ireland"
    }`;

export var jsonSchema = `{
    "type": "object",
    "description": "a very special object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Some name"
        },
        "country": {
            "type": "string",
            "enum": ["Ireland", "Iceland"],
            "description": "Country name"
        },
        "age": {
            "type": "number",
            "description": "Age of object"
        }
    }
}`;