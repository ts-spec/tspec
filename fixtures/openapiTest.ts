import { Tspec } from '../src/types/tspec';

export const mockSpec: Tspec.ParsedApiSpec = {
  operationId: 'GetSeries',
  url: 'GET /manta/v1/series/{id}',
  summary: 'Retrieve a series',
  description: 'Retrieve a series',
  tags: ['Series', 'Front'],
  auth: 'JWT',
  path: {
    "deprecated": false,
    "name": "path",
    "required": true,
    "type": {
      "typeName": "nestedObjectLiteral",
      "properties": [
        {
          "example": 1255,
          "description": "Series id",
          "deprecated": false,
          "name": "id",
          "required": true,
          "type": {
            "typeName": "number"
          }
        }
      ]
    }
  },
  query: {
    "deprecated": false,
    "name": "query",
    "required": true,
    "type": {
      "typeName": "nestedObjectLiteral",
      "properties": [
        {
          "deprecated": false,
          "name": "debug",
          "required": false,
          "type": {
            "typeName": "boolean"
          }
        }
      ]
    }
  },
  response: {
    "deprecated": false,
    "name": "response",
    "required": true,
    "type": {
      "typeName": "nestedObjectLiteral",
      "properties": [
        {
          "deprecated": false,
          "name": "id",
          "required": true,
          "type": {
            "typeName": "number"
          }
        },
        {
          "deprecated": false,
          "name": "thumbnail",
          "required": true,
          "type": {
            "typeName": "refAlias",
            "refName": "Thumbnail",
            "type": {
              "typeName": "nestedObjectLiteral",
              "properties": [
                {
                  "deprecated": false,
                  "name": "xlarge",
                  "required": true,
                  "type": {
                    "typeName": "string"
                  }
                }
              ]
            },
            "deprecated": false
          }
        }
      ]
    }
  }
};
