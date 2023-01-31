export var xmlContent = `
<people>
   <person eyeColor="violet">
     <name>Daenerys Targaryen</name>
   </person>
</people>
`;

export var xmlSchema = `{
  "name": "people",
  "required": true,
  "cardinality": "single",
  "attributes": {},
  "elements": {
    "person": {
      "name": "person",
      "required": false,
      "cardinality": "many",
      "attributes": {
        "eyeColor": {
          "key": "eyeColor",
          "required": false,
          "value": ["grey", "blue", "green", "red"]
        }
      },
      "elements": {
        "name": {
          "cardinality": "single",
          "required": true,
          "name": "name",
          "attributes": {},
          "elements": {}
        }
      }
    }
  }
}
`;
