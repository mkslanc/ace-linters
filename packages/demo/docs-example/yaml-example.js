export var yamlContent = `
---
product_name: Super Mobile Phone
manufacturer: Somewhere
price: 1
color: 
camera:
  resolution: 12MP
  zoom: 3x optical
    features: [Dual SIM, Night mode, Deep Fusion]
display:
  size: 6.1 inches
  resolution: 2778 x 1284
  technology: OLED
battery:
  capacity: 2815mAh
  fast_charge: Yes
operating_system: Perpertum 14
`;

export var yamlSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "product_name": {
      "type": "string",
      "description": "The name of the product"
    },
    "manufacturer": {
      "type": "string",
      "description": "The company that manufactures the product"
    },
    "price": {
      "type": "number",
      "description": "The price of the product in USD"
    },
    "color": {
      "type": "string",
      "description": "The color of the product",
      "enum": [
        "Gold",
        "Silver",
        "Space Gray",
        "Pacific Blue",
        "Graphite"
      ]
    },
    "storage": {
      "type": "string",
      "description": "The storage capacity of the product",
      "enum": [
        "64GB",
        "128GB",
        "256GB",
        "512GB",
        "1TB"
      ]
    },
    "camera": {
      "type": "object",
      "properties": {
        "resolution": {
          "type": "string",
          "description": "The camera resolution in megapixels"
        },
        "zoom": {
          "type": "string",
          "description": "The camera zoom capabilities"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Additional camera features"
        }
      },
      "required": [
        "resolution",
        "zoom",
        "features"
      ],
      "description": "Details about the camera"
    },
    "display": {
      "type": "object",
      "properties": {
        "size": {
          "type": "string",
          "description": "The size of the display in inches"
        },
        "resolution": {
          "type": "string",
          "description": "The resolution of the display"
        },
        "technology": {
          "type": "string",
          "description": "The display technology used",
          "enum": [
            "OLED",
            "LCD",
            "AMOLED"
          ]
        }
      },
      "required": [
        "size",
        "resolution",
        "technology"
      ],
      "description": "Details about the display"
    },
    "battery": {
      "type": "object",
      "properties": {
        "capacity": {
          "type": "string",
          "description": "The battery capacity in mAh"
        },
        "fast_charge": {
          "type": "string",
          "description": "Whether the device supports fast charging or not",
          "enum": [
            "Yes",
            "No"
          ]
        }
      },
      "required": [
        "capacity",
        "fast_charge"
      ],
      "description": "Details about the battery"
    },
    "operating_system": {
      "type": "string",
      "description": "The operating system of the device",
      "enum": [
        "iOS",
        "Android",
        "Windows"
      ]
    }
  },
  "required": [
    "product_name",
    "manufacturer",
    "price",
    "color",
    "storage",
    "camera",
    "display",
    "battery",
    "operating_system"
  ],
  "description": "A product listing object"
}
`
