//#region packages/demo/docs-example/json5-example.js
var json5Content = `{
       "name": 12,
       "country": "Ireland", //trailing comma + comment
    }`;
var json5Schema = `{
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
//#endregion
export { json5Schema as n, json5Content as t };
