import { Tspec } from '../types/tspec';

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
      "typeName": "intersection",
      "types": [
        {
          "typeName": "refAlias",
          "refName": "Series",
          "type": {
            "typeName": "intersection",
            "types": [
              {
                "typeName": "refAlias",
                "description": "Construct a type with the properties of T except for those in type K.",
                "refName": "Omit_SeriesEntity.data-or-image_",
                "type": {
                  "typeName": "refAlias",
                  "description": "From T, pick a set of properties whose keys are in the union K",
                  "refName": "Pick_T.Exclude_keyofT.K__",
                  "type": {
                    "typeName": "nestedObjectLiteral",
                    "properties": []
                  },
                  "deprecated": false
                },
                "deprecated": false
              },
              {
                "typeName": "nestedObjectLiteral",
                "properties": [
                  {
                    "deprecated": false,
                    "name": "data",
                    "required": true,
                    "type": {
                      "typeName": "intersection",
                      "types": [
                        {
                          "typeName": "refAlias",
                          "description": "Construct a type with the properties of T except for those in type K.",
                          "refName": "Omit_SeriesData.relatedSeriesList-or-tags_",
                          "type": {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_T.Exclude_keyofT.K__",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": []
                            },
                            "deprecated": false
                          },
                          "deprecated": false
                        },
                        {
                          "typeName": "nestedObjectLiteral",
                          "properties": [
                            {
                              "deprecated": false,
                              "name": "relatedSeriesList",
                              "required": false,
                              "type": {
                                "typeName": "array",
                                "itemType": {
                                  "typeName": "refObject",
                                  "properties": [
                                    {
                                      "deprecated": false,
                                      "name": "data",
                                      "required": true,
                                      "type": {
                                        "typeName": "refAlias",
                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                        "refName": "Pick_SeriesData.freePassBeginAt-or-freePassEndAt-or-isCompleted-or-title_",
                                        "type": {
                                          "typeName": "nestedObjectLiteral",
                                          "properties": [
                                            {
                                              "deprecated": false,
                                              "name": "freePassBeginAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freePassEndAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isCompleted",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "title",
                                              "required": false,
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "en",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  }
                                                ]
                                              }
                                            }
                                          ]
                                        },
                                        "deprecated": false
                                      }
                                    },
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
                                      "name": "image",
                                      "required": true,
                                      "type": {
                                        "typeName": "refAlias",
                                        "refName": "SeriesImageDieted",
                                        "type": {
                                          "typeName": "refAlias",
                                          "description": "Make all properties in T optional",
                                          "refName": "Partial_Record_SeriesImageKey.SeriesImageDietedData__",
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "name": "1440x1440",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840-2",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840b",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840bt",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1440x3072a",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1440x1440_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840-2_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840b_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840bt_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1440x3072a_720",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1440x1440_480",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840_480",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1280x1840-2_480",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              },
                                              {
                                                "name": "1440x3072a_480",
                                                "required": false,
                                                "deprecated": false,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "SeriesImageDietedData",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "description": "From T, pick a set of properties whose keys are in the union K",
                                                        "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                                              "name": "downloadUrl",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "data",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "blurhash",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "height",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "key",
                                                                  "required": true,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "width",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "number"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              }
                                            ]
                                          },
                                          "deprecated": false
                                        },
                                        "deprecated": false
                                      }
                                    },
                                    {
                                      "deprecated": false,
                                      "name": "derived",
                                      "required": false,
                                      "type": {
                                        "typeName": "refObject",
                                        "properties": [
                                          {
                                            "description": "Note(yeonjoon): Release Text and Color for Series Home",
                                            "deprecated": false,
                                            "name": "releaseSchedule1",
                                            "required": true,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): DEPRECATED. Release Text and Color for Series Home for free user",
                                            "deprecated": false,
                                            "name": "releaseSchedule2",
                                            "required": false,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Release Text and Color for Series Home to notate hiatus schedule",
                                            "deprecated": false,
                                            "name": "releaseSchedule3",
                                            "required": false,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Release Text and Color for Search Result",
                                            "deprecated": false,
                                            "name": "releaseSchedule4",
                                            "required": true,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Text and Color Title for the bottom of Episode Viewer",
                                            "deprecated": false,
                                            "name": "nextSchedule1",
                                            "required": false,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Text and Color for the bottom text of Episode Viewer",
                                            "deprecated": false,
                                            "name": "nextSchedule2",
                                            "required": false,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): [Not Implemented] Season or series Open Date display at Coming Soon\nReference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4",
                                            "deprecated": false,
                                            "name": "comingSoonSchedule1",
                                            "required": false,
                                            "type": {
                                              "typeName": "nestedObjectLiteral",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "openAt",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ]
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): [Not Implemented] Season or Series Open Date display at Coming Soon\nReference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4",
                                            "deprecated": false,
                                            "name": "comingSoonSchedule2",
                                            "required": false,
                                            "type": {
                                              "typeName": "refObject",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "color",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "text",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "string"
                                                  }
                                                }
                                              ],
                                              "refName": "ReleaseSchedule",
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Override notice with series schedule notice",
                                            "deprecated": false,
                                            "name": "scheduleNotice",
                                            "required": false,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          },
                                          {
                                            "deprecated": false,
                                            "name": "lockType",
                                            "required": true,
                                            "type": {
                                              "typeName": "refAlias",
                                              "refName": "ValueOf_typeofSERIES_LOCK_TYPE_",
                                              "type": {
                                                "typeName": "number"
                                              },
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "deprecated": false,
                                            "name": "billboardSubText",
                                            "required": false,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          },
                                          {
                                            "deprecated": false,
                                            "name": "freePassPlan",
                                            "required": false,
                                            "type": {
                                              "typeName": "nestedObjectLiteral",
                                              "properties": [
                                                {
                                                  "deprecated": false,
                                                  "name": "renewCycle",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "number"
                                                  }
                                                },
                                                {
                                                  "deprecated": false,
                                                  "name": "rentalPeriod",
                                                  "required": true,
                                                  "type": {
                                                    "typeName": "number"
                                                  }
                                                }
                                              ]
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Series Home Banner from comic to novel or vice versa",
                                            "deprecated": false,
                                            "name": "linkedSeries1",
                                            "required": false,
                                            "type": {
                                              "typeName": "refAlias",
                                              "description": "From T, pick a set of properties whose keys are in the union K",
                                              "refName": "Pick_LinkedSeries.targetSeriesId-or-eventType-or-badgeText-or-text_",
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "targetSeriesId",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "number"
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "eventType",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "union",
                                                      "types": [
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "to_comic"
                                                          ]
                                                        },
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "to_novel"
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "badgeText",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "union",
                                                      "types": [
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "COMIC"
                                                          ]
                                                        },
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "NOVEL"
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "text",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  }
                                                ]
                                              },
                                              "deprecated": false
                                            }
                                          },
                                          {
                                            "description": "Note(yeonjoon): Episode Viewer and Series Detail Banner from comic to novel or vice versa",
                                            "deprecated": false,
                                            "name": "linkedSeries2",
                                            "required": false,
                                            "type": {
                                              "typeName": "refAlias",
                                              "description": "From T, pick a set of properties whose keys are in the union K",
                                              "refName": "Pick_LinkedSeries.targetSeriesId-or-eventType-or-text_",
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "targetSeriesId",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "number"
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "eventType",
                                                    "required": true,
                                                    "type": {
                                                      "typeName": "union",
                                                      "types": [
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "to_comic"
                                                          ]
                                                        },
                                                        {
                                                          "typeName": "enum",
                                                          "enums": [
                                                            "to_novel"
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "text",
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
                                        ],
                                        "refName": "SeriesDerived",
                                        "deprecated": false
                                      }
                                    }
                                  ],
                                  "refName": "RelatedSeries",
                                  "deprecated": false
                                }
                              }
                            },
                            {
                              "deprecated": false,
                              "name": "tags",
                              "required": false,
                              "type": {
                                "typeName": "array",
                                "itemType": {
                                  "typeName": "refAlias",
                                  "refName": "SeriesTag",
                                  "type": {
                                    "typeName": "refAlias",
                                    "description": "From T, pick a set of properties whose keys are in the union K",
                                    "refName": "Pick_TagEntity.id-or-name_",
                                    "type": {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "example": 1,
                                          "deprecated": false,
                                          "name": "id",
                                          "required": true,
                                          "type": {
                                            "typeName": "number"
                                          }
                                        },
                                        {
                                          "deprecated": false,
                                          "name": "name",
                                          "required": true,
                                          "type": {
                                            "typeName": "refAlias",
                                            "refName": "Nullable_Name_",
                                            "type": {
                                              "typeName": "union",
                                              "types": [
                                                {
                                                  "typeName": "refAlias",
                                                  "refName": "Name",
                                                  "type": {
                                                    "typeName": "nestedObjectLiteral",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "en",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "ko",
                                                        "required": false,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                },
                                                {
                                                  "typeName": "enum",
                                                  "enums": [
                                                    null
                                                  ]
                                                }
                                              ]
                                            },
                                            "deprecated": false
                                          }
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  },
                                  "deprecated": false
                                }
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "derived",
                    "required": false,
                    "type": {
                      "typeName": "refObject",
                      "properties": [
                        {
                          "description": "Note(yeonjoon): Release Text and Color for Series Home",
                          "deprecated": false,
                          "name": "releaseSchedule1",
                          "required": true,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): DEPRECATED. Release Text and Color for Series Home for free user",
                          "deprecated": false,
                          "name": "releaseSchedule2",
                          "required": false,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Release Text and Color for Series Home to notate hiatus schedule",
                          "deprecated": false,
                          "name": "releaseSchedule3",
                          "required": false,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Release Text and Color for Search Result",
                          "deprecated": false,
                          "name": "releaseSchedule4",
                          "required": true,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Text and Color Title for the bottom of Episode Viewer",
                          "deprecated": false,
                          "name": "nextSchedule1",
                          "required": false,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Text and Color for the bottom text of Episode Viewer",
                          "deprecated": false,
                          "name": "nextSchedule2",
                          "required": false,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): [Not Implemented] Season or series Open Date display at Coming Soon\nReference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4",
                          "deprecated": false,
                          "name": "comingSoonSchedule1",
                          "required": false,
                          "type": {
                            "typeName": "nestedObjectLiteral",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "openAt",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ]
                          }
                        },
                        {
                          "description": "Note(yeonjoon): [Not Implemented] Season or Series Open Date display at Coming Soon\nReference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4",
                          "deprecated": false,
                          "name": "comingSoonSchedule2",
                          "required": false,
                          "type": {
                            "typeName": "refObject",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "color",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "text",
                                "required": true,
                                "type": {
                                  "typeName": "string"
                                }
                              }
                            ],
                            "refName": "ReleaseSchedule",
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Override notice with series schedule notice",
                          "deprecated": false,
                          "name": "scheduleNotice",
                          "required": false,
                          "type": {
                            "typeName": "string"
                          }
                        },
                        {
                          "deprecated": false,
                          "name": "lockType",
                          "required": true,
                          "type": {
                            "typeName": "refAlias",
                            "refName": "ValueOf_typeofSERIES_LOCK_TYPE_",
                            "type": {
                              "typeName": "number"
                            },
                            "deprecated": false
                          }
                        },
                        {
                          "deprecated": false,
                          "name": "billboardSubText",
                          "required": false,
                          "type": {
                            "typeName": "string"
                          }
                        },
                        {
                          "deprecated": false,
                          "name": "freePassPlan",
                          "required": false,
                          "type": {
                            "typeName": "nestedObjectLiteral",
                            "properties": [
                              {
                                "deprecated": false,
                                "name": "renewCycle",
                                "required": true,
                                "type": {
                                  "typeName": "number"
                                }
                              },
                              {
                                "deprecated": false,
                                "name": "rentalPeriod",
                                "required": true,
                                "type": {
                                  "typeName": "number"
                                }
                              }
                            ]
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Series Home Banner from comic to novel or vice versa",
                          "deprecated": false,
                          "name": "linkedSeries1",
                          "required": false,
                          "type": {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_LinkedSeries.targetSeriesId-or-eventType-or-badgeText-or-text_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "deprecated": false,
                                  "name": "targetSeriesId",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "eventType",
                                  "required": true,
                                  "type": {
                                    "typeName": "union",
                                    "types": [
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "to_comic"
                                        ]
                                      },
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "to_novel"
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "badgeText",
                                  "required": true,
                                  "type": {
                                    "typeName": "union",
                                    "types": [
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "COMIC"
                                        ]
                                      },
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "NOVEL"
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "text",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                }
                              ]
                            },
                            "deprecated": false
                          }
                        },
                        {
                          "description": "Note(yeonjoon): Episode Viewer and Series Detail Banner from comic to novel or vice versa",
                          "deprecated": false,
                          "name": "linkedSeries2",
                          "required": false,
                          "type": {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_LinkedSeries.targetSeriesId-or-eventType-or-text_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "deprecated": false,
                                  "name": "targetSeriesId",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "eventType",
                                  "required": true,
                                  "type": {
                                    "typeName": "union",
                                    "types": [
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "to_comic"
                                        ]
                                      },
                                      {
                                        "typeName": "enum",
                                        "enums": [
                                          "to_novel"
                                        ]
                                      }
                                    ]
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "text",
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
                      ],
                      "refName": "SeriesDerived",
                      "deprecated": false
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "image",
                    "required": true,
                    "type": {
                      "typeName": "refAlias",
                      "refName": "SeriesImageDieted",
                      "type": {
                        "typeName": "refAlias",
                        "description": "Make all properties in T optional",
                        "refName": "Partial_Record_SeriesImageKey.SeriesImageDietedData__",
                        "type": {
                          "typeName": "nestedObjectLiteral",
                          "properties": [
                            {
                              "name": "1440x1440",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840-2",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840b",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840bt",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1440x3072a",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1440x1440_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840-2_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840b_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840bt_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1440x3072a_720",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1440x1440_480",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840_480",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1280x1840-2_480",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            },
                            {
                              "name": "1440x3072a_480",
                              "required": false,
                              "deprecated": false,
                              "type": {
                                "typeName": "refAlias",
                                "refName": "SeriesImageDietedData",
                                "type": {
                                  "typeName": "intersection",
                                  "types": [
                                    {
                                      "typeName": "refAlias",
                                      "description": "From T, pick a set of properties whose keys are in the union K",
                                      "refName": "Pick_SeriesImageThumbnail.id-or-downloadUrl_",
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
                                            "name": "downloadUrl",
                                            "required": true,
                                            "type": {
                                              "typeName": "string"
                                            }
                                          }
                                        ]
                                      },
                                      "deprecated": false
                                    },
                                    {
                                      "typeName": "nestedObjectLiteral",
                                      "properties": [
                                        {
                                          "deprecated": false,
                                          "name": "data",
                                          "required": true,
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blurhash",
                                                "required": false,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "height",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "key",
                                                "required": true,
                                                "type": {
                                                  "typeName": "string"
                                                }
                                              },
                                              {
                                                "deprecated": false,
                                                "name": "width",
                                                "required": false,
                                                "type": {
                                                  "typeName": "number"
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "deprecated": false
                              }
                            }
                          ]
                        },
                        "deprecated": false
                      },
                      "deprecated": false
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "seriesSchedules",
                    "required": false,
                    "type": {
                      "typeName": "array",
                      "itemType": {
                        "typeName": "refObject",
                        "properties": [
                          {
                            "example": "2021-01-01T12:34:56.789Z",
                            "deprecated": false,
                            "name": "createdAt",
                            "required": true,
                            "type": {
                              "typeName": "string"
                            }
                          },
                          {
                            "example": 1,
                            "deprecated": false,
                            "name": "id",
                            "required": true,
                            "type": {
                              "typeName": "number"
                            }
                          },
                          {
                            "example": "2021-01-01T12:34:56.789Z",
                            "deprecated": false,
                            "name": "updatedAt",
                            "required": true,
                            "type": {
                              "typeName": "string"
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "data",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_SeriesScheduleData_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "refObject",
                                    "properties": [
                                      {
                                        "deprecated": false,
                                        "name": "closeOrd",
                                        "required": false,
                                        "type": {
                                          "typeName": "number"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "isOnHiatus",
                                        "required": true,
                                        "type": {
                                          "typeName": "boolean"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "isSeason",
                                        "required": true,
                                        "type": {
                                          "typeName": "boolean"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "isSeriesCompleted",
                                        "required": true,
                                        "type": {
                                          "typeName": "boolean"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "openOrd",
                                        "required": true,
                                        "type": {
                                          "typeName": "number"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "releaseScheduleText",
                                        "required": true,
                                        "type": {
                                          "typeName": "string"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "scheduleNotice",
                                        "required": false,
                                        "type": {
                                          "typeName": "string"
                                        }
                                      },
                                      {
                                        "deprecated": false,
                                        "name": "scheduleSubtext",
                                        "required": false,
                                        "type": {
                                          "typeName": "string"
                                        }
                                      }
                                    ],
                                    "refName": "SeriesScheduleData",
                                    "deprecated": false
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "seriesId",
                            "required": true,
                            "type": {
                              "typeName": "union",
                              "types": [
                                {
                                  "typeName": "number"
                                },
                                {
                                  "typeName": "string"
                                }
                              ]
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "state",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_ValueOf_typeofSERIES_SCHEDULE_STATE__",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "refAlias",
                                    "refName": "ValueOf_typeofSERIES_SCHEDULE_STATE_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            100
                                          ]
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            500
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "title",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "type",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_ValueOf_typeofSERIES_SCHEDULE_TYPE__",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "refAlias",
                                    "refName": "ValueOf_typeofSERIES_SCHEDULE_TYPE_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            10
                                          ]
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            20
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "openAt",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "closeAt",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          }
                        ],
                        "refName": "SeriesSchedule",
                        "deprecated": false
                      }
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "variationKey",
                    "required": false,
                    "type": {
                      "typeName": "string"
                    }
                  }
                ]
              }
            ]
          },
          "deprecated": false
        },
        {
          "typeName": "nestedObjectLiteral",
          "properties": [
            {
              "deprecated": false,
              "name": "episodes",
              "required": false,
              "type": {
                "typeName": "array",
                "itemType": {
                  "typeName": "refAlias",
                  "refName": "SeriesEpisode",
                  "type": {
                    "typeName": "intersection",
                    "types": [
                      {
                        "typeName": "refObject",
                        "properties": [
                          {
                            "example": "2021-01-01T12:34:56.789Z",
                            "deprecated": false,
                            "name": "createdAt",
                            "required": true,
                            "type": {
                              "typeName": "string"
                            }
                          },
                          {
                            "example": 1,
                            "deprecated": false,
                            "name": "id",
                            "required": true,
                            "type": {
                              "typeName": "number"
                            }
                          },
                          {
                            "example": "2021-01-01T12:34:56.789Z",
                            "deprecated": false,
                            "name": "updatedAt",
                            "required": true,
                            "type": {
                              "typeName": "string"
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "cachedAt",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "closeAt",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "data",
                            "required": true,
                            "type": {
                              "typeName": "refObject",
                              "properties": [
                                {
                                  "deprecated": false,
                                  "name": "freeAt",
                                  "required": false,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "isDisableOpenPush",
                                  "required": false,
                                  "type": {
                                    "typeName": "boolean"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "isFree",
                                  "required": false,
                                  "type": {
                                    "typeName": "boolean"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "title",
                                  "required": false,
                                  "type": {
                                    "typeName": "string"
                                  }
                                }
                              ],
                              "refName": "EpisodeData",
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "image",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable__%5Bkey-string%5D%3Aany__",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "additionalProperties": {
                                      "typeName": "any"
                                    },
                                    "typeName": "nestedObjectLiteral",
                                    "properties": []
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "ord",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_number_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "number"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "openAt",
                            "required": true,
                            "type": {
                              "typeName": "refAlias",
                              "refName": "Nullable_string_",
                              "type": {
                                "typeName": "union",
                                "types": [
                                  {
                                    "typeName": "string"
                                  },
                                  {
                                    "typeName": "enum",
                                    "enums": [
                                      null
                                    ]
                                  }
                                ]
                              },
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "state",
                            "required": true,
                            "type": {
                              "typeName": "number"
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "seriesId",
                            "required": true,
                            "type": {
                              "typeName": "number"
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "series",
                            "required": false,
                            "type": {
                              "typeName": "refObject",
                              "properties": [
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "createdAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "example": 1,
                                  "deprecated": false,
                                  "name": "id",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "updatedAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "cachedAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "closeAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "data",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_SeriesData_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "refObject",
                                          "properties": [
                                            {
                                              "deprecated": false,
                                              "name": "billboardBadge",
                                              "required": false,
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "text",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "bgColor",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "bgGradient",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "array",
                                                      "itemType": {
                                                        "typeName": "string"
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "billboardSubText",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "billboardTitle",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "categories",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "string"
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "contentId",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "contentWarning",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "creators",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "refObject",
                                                  "properties": [
                                                    {
                                                      "deprecated": false,
                                                      "name": "name",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "role",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    }
                                                  ],
                                                  "refName": "SeriesCreator",
                                                  "deprecated": false
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "description",
                                              "required": false,
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "long",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "short",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  }
                                                ]
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freeEpisodeCount",
                                              "required": false,
                                              "type": {
                                                "typeName": "number"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freePassBeginAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freePassEndAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freePassLockCount",
                                              "required": false,
                                              "type": {
                                                "typeName": "number"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freePassRenewCycle",
                                              "required": false,
                                              "type": {
                                                "typeName": "number"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "freeUserNotice",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "episodeDecos",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "refAlias",
                                                  "refName": "EpisodeDeco",
                                                  "type": {
                                                    "typeName": "intersection",
                                                    "types": [
                                                      {
                                                        "typeName": "refAlias",
                                                        "refName": "EpisodeDecoImage",
                                                        "type": {
                                                          "typeName": "refAlias",
                                                          "description": "Make all properties in T optional",
                                                          "refName": "Partial_Record_EpisodeDecoImageOriginalKey.SeriesImageOriginal_-and-Record_EpisodeDecoImageResizedKey.SeriesImageThumbnail__",
                                                          "type": {
                                                            "typeName": "nestedObjectLiteral",
                                                            "properties": [
                                                              {
                                                                "name": "header",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "footer",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "footer2",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "header_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "footer_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "footer2_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              }
                                                            ]
                                                          },
                                                          "deprecated": false
                                                        },
                                                        "deprecated": false
                                                      },
                                                      {
                                                        "typeName": "nestedObjectLiteral",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "ords",
                                                            "required": true,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "deprecated": false
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isCompleted",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isCreatedByManta",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isExclusive",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isHorizontalView",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isOriginal",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isRewardPassSeries",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "isRTL",
                                              "required": false,
                                              "type": {
                                                "typeName": "boolean"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "latestEpisodeToLock",
                                              "required": false,
                                              "type": {
                                                "typeName": "number"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "linkedSeriesList",
                                              "required": false,
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "comic",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "array",
                                                      "itemType": {
                                                        "typeName": "number"
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "deprecated": false,
                                                    "name": "novel",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "array",
                                                      "itemType": {
                                                        "typeName": "number"
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "localization",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "refObject",
                                                  "properties": [
                                                    {
                                                      "deprecated": false,
                                                      "name": "name",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "role",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    }
                                                  ],
                                                  "refName": "SeriesCreator",
                                                  "deprecated": false
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "notice",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "relatedSeriesList",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "number"
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "releaseSchedule",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "scheduleSubText",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "seasonText",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "subscriberNotice",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "tags",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "number"
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "title",
                                              "required": false,
                                              "type": {
                                                "typeName": "nestedObjectLiteral",
                                                "properties": [
                                                  {
                                                    "deprecated": false,
                                                    "name": "en",
                                                    "required": false,
                                                    "type": {
                                                      "typeName": "string"
                                                    }
                                                  }
                                                ]
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "totalEpisodeCount",
                                              "required": false,
                                              "type": {
                                                "typeName": "number"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "videoList",
                                              "required": false,
                                              "type": {
                                                "typeName": "array",
                                                "itemType": {
                                                  "typeName": "nestedObjectLiteral",
                                                  "properties": [
                                                    {
                                                      "deprecated": false,
                                                      "name": "url",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "wtfBeginAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            },
                                            {
                                              "deprecated": false,
                                              "name": "wtfEndAt",
                                              "required": false,
                                              "type": {
                                                "typeName": "string"
                                              }
                                            }
                                          ],
                                          "refName": "SeriesData",
                                          "deprecated": false
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "i18n",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_I18n_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "refAlias",
                                          "refName": "I18n",
                                          "type": {
                                            "typeName": "nestedObjectLiteral",
                                            "properties": [
                                              {
                                                "deprecated": false,
                                                "name": "blockRegions",
                                                "required": true,
                                                "type": {
                                                  "typeName": "refAlias",
                                                  "refName": "BlockRegions",
                                                  "type": {
                                                    "typeName": "refAlias",
                                                    "description": "Make all properties in T optional",
                                                    "refName": "Partial_Record_RegionKey._blockAt-string___",
                                                    "type": {
                                                      "typeName": "nestedObjectLiteral",
                                                      "properties": [
                                                        {
                                                          "name": "us",
                                                          "required": false,
                                                          "deprecated": false,
                                                          "type": {
                                                            "typeName": "nestedObjectLiteral",
                                                            "properties": [
                                                              {
                                                                "deprecated": false,
                                                                "name": "blockAt",
                                                                "required": true,
                                                                "type": {
                                                                  "typeName": "string"
                                                                }
                                                              }
                                                            ]
                                                          }
                                                        },
                                                        {
                                                          "name": "ph",
                                                          "required": false,
                                                          "deprecated": false,
                                                          "type": {
                                                            "typeName": "nestedObjectLiteral",
                                                            "properties": [
                                                              {
                                                                "deprecated": false,
                                                                "name": "blockAt",
                                                                "required": true,
                                                                "type": {
                                                                  "typeName": "string"
                                                                }
                                                              }
                                                            ]
                                                          }
                                                        }
                                                      ]
                                                    },
                                                    "deprecated": false
                                                  },
                                                  "deprecated": false
                                                }
                                              }
                                            ]
                                          },
                                          "deprecated": false
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "image",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_SeriesImage_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "refAlias",
                                          "refName": "SeriesImage",
                                          "type": {
                                            "typeName": "refAlias",
                                            "description": "Make all properties in T optional",
                                            "refName": "Partial_Record_SeriesImageOriginalKey.SeriesImageOriginal_-and-Record_SeriesImageThumbnailKey.SeriesImageThumbnail__",
                                            "type": {
                                              "typeName": "nestedObjectLiteral",
                                              "properties": [
                                                {
                                                  "name": "1440x1440",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840-2",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840b",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840bt",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1440x3072a",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "encoding",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "fieldname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "mimetype",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "originalname",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "updatedAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageOriginal",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1440x1440_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840-2_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840b_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840bt_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1440x3072a_720",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1440x1440_480",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840_480",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1280x1840-2_480",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                },
                                                {
                                                  "name": "1440x3072a_480",
                                                  "required": false,
                                                  "deprecated": false,
                                                  "type": {
                                                    "typeName": "refObject",
                                                    "properties": [
                                                      {
                                                        "deprecated": false,
                                                        "name": "createdAt",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "union",
                                                          "types": [
                                                            {
                                                              "typeName": "string",
                                                              "format": "date-time"
                                                            },
                                                            {
                                                              "typeName": "string"
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "data",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "nestedObjectLiteral",
                                                          "properties": [
                                                            {
                                                              "deprecated": false,
                                                              "name": "blurhash",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "format",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "height",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "key",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "size",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "type",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "string"
                                                              }
                                                            },
                                                            {
                                                              "deprecated": false,
                                                              "name": "width",
                                                              "required": true,
                                                              "type": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      },
                                                      {
                                                        "deprecated": false,
                                                        "name": "downloadUrl",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "string"
                                                        }
                                                      },
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
                                                        "name": "parentId",
                                                        "required": true,
                                                        "type": {
                                                          "typeName": "number"
                                                        }
                                                      }
                                                    ],
                                                    "refName": "SeriesImageThumbnail",
                                                    "deprecated": false
                                                  }
                                                }
                                              ]
                                            },
                                            "deprecated": false
                                          },
                                          "deprecated": false
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "lang",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "locale",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "openAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "state",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "scoreData",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_never_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "never"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "type",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "variation",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_SeriesVariation_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "additionalProperties": {
                                            "typeName": "refAlias",
                                            "refName": "Optional__mod%3F%3A%5Bnumber.number%5D.data%3F%3ASeriesData.note%3F%3Astring.image%3F%3ASeriesImage.endTime%3F%3Astring.startTime%3F%3Astring.__",
                                            "type": {
                                              "typeName": "union",
                                              "types": [
                                                {
                                                  "typeName": "nestedObjectLiteral",
                                                  "properties": [
                                                    {
                                                      "deprecated": false,
                                                      "name": "mod",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "tuple",
                                                        "types": [
                                                          {
                                                            "typeName": "number"
                                                          },
                                                          {
                                                            "typeName": "number"
                                                          }
                                                        ]
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "data",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "refObject",
                                                        "properties": [
                                                          {
                                                            "deprecated": false,
                                                            "name": "billboardBadge",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "text",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "bgColor",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "bgGradient",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "array",
                                                                    "itemType": {
                                                                      "typeName": "string"
                                                                    }
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "billboardSubText",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "billboardTitle",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "categories",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "string"
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "contentId",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "contentWarning",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "creators",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "refObject",
                                                                "properties": [
                                                                  {
                                                                    "deprecated": false,
                                                                    "name": "name",
                                                                    "required": false,
                                                                    "type": {
                                                                      "typeName": "string"
                                                                    }
                                                                  },
                                                                  {
                                                                    "deprecated": false,
                                                                    "name": "role",
                                                                    "required": false,
                                                                    "type": {
                                                                      "typeName": "string"
                                                                    }
                                                                  }
                                                                ],
                                                                "refName": "SeriesCreator",
                                                                "deprecated": false
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "description",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "long",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "short",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freeEpisodeCount",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "number"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freePassBeginAt",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freePassEndAt",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freePassLockCount",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "number"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freePassRenewCycle",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "number"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "freeUserNotice",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "episodeDecos",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "refAlias",
                                                                "refName": "EpisodeDeco",
                                                                "type": {
                                                                  "typeName": "intersection",
                                                                  "types": [
                                                                    {
                                                                      "typeName": "refAlias",
                                                                      "refName": "EpisodeDecoImage",
                                                                      "type": {
                                                                        "typeName": "refAlias",
                                                                        "description": "Make all properties in T optional",
                                                                        "refName": "Partial_Record_EpisodeDecoImageOriginalKey.SeriesImageOriginal_-and-Record_EpisodeDecoImageResizedKey.SeriesImageThumbnail__",
                                                                        "type": {
                                                                          "typeName": "nestedObjectLiteral",
                                                                          "properties": [
                                                                            {
                                                                              "name": "header",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "encoding",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "fieldname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "mimetype",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "originalname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "updatedAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageOriginal",
                                                                                "deprecated": false
                                                                              }
                                                                            },
                                                                            {
                                                                              "name": "footer",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "encoding",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "fieldname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "mimetype",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "originalname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "updatedAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageOriginal",
                                                                                "deprecated": false
                                                                              }
                                                                            },
                                                                            {
                                                                              "name": "footer2",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "encoding",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "fieldname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "mimetype",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "originalname",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "updatedAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageOriginal",
                                                                                "deprecated": false
                                                                              }
                                                                            },
                                                                            {
                                                                              "name": "header_720",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "union",
                                                                                      "types": [
                                                                                        {
                                                                                          "typeName": "string",
                                                                                          "format": "date-time"
                                                                                        },
                                                                                        {
                                                                                          "typeName": "string"
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "blurhash",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "format",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "height",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "width",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "parentId",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "number"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageThumbnail",
                                                                                "deprecated": false
                                                                              }
                                                                            },
                                                                            {
                                                                              "name": "footer_720",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "union",
                                                                                      "types": [
                                                                                        {
                                                                                          "typeName": "string",
                                                                                          "format": "date-time"
                                                                                        },
                                                                                        {
                                                                                          "typeName": "string"
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "blurhash",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "format",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "height",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "width",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "parentId",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "number"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageThumbnail",
                                                                                "deprecated": false
                                                                              }
                                                                            },
                                                                            {
                                                                              "name": "footer2_720",
                                                                              "required": false,
                                                                              "deprecated": false,
                                                                              "type": {
                                                                                "typeName": "refObject",
                                                                                "properties": [
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "createdAt",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "union",
                                                                                      "types": [
                                                                                        {
                                                                                          "typeName": "string",
                                                                                          "format": "date-time"
                                                                                        },
                                                                                        {
                                                                                          "typeName": "string"
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "data",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "nestedObjectLiteral",
                                                                                      "properties": [
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "blurhash",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "format",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "height",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "key",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "size",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "type",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "string"
                                                                                          }
                                                                                        },
                                                                                        {
                                                                                          "deprecated": false,
                                                                                          "name": "width",
                                                                                          "required": true,
                                                                                          "type": {
                                                                                            "typeName": "number"
                                                                                          }
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  {
                                                                                    "deprecated": false,
                                                                                    "name": "downloadUrl",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "string"
                                                                                    }
                                                                                  },
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
                                                                                    "name": "parentId",
                                                                                    "required": true,
                                                                                    "type": {
                                                                                      "typeName": "number"
                                                                                    }
                                                                                  }
                                                                                ],
                                                                                "refName": "SeriesImageThumbnail",
                                                                                "deprecated": false
                                                                              }
                                                                            }
                                                                          ]
                                                                        },
                                                                        "deprecated": false
                                                                      },
                                                                      "deprecated": false
                                                                    },
                                                                    {
                                                                      "typeName": "nestedObjectLiteral",
                                                                      "properties": [
                                                                        {
                                                                          "deprecated": false,
                                                                          "name": "ords",
                                                                          "required": true,
                                                                          "type": {
                                                                            "typeName": "array",
                                                                            "itemType": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                },
                                                                "deprecated": false
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isCompleted",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isCreatedByManta",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isExclusive",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isHorizontalView",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isOriginal",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isRewardPassSeries",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "isRTL",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "boolean"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "latestEpisodeToLock",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "number"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "linkedSeriesList",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "comic",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "array",
                                                                    "itemType": {
                                                                      "typeName": "number"
                                                                    }
                                                                  }
                                                                },
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "novel",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "array",
                                                                    "itemType": {
                                                                      "typeName": "number"
                                                                    }
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "localization",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "refObject",
                                                                "properties": [
                                                                  {
                                                                    "deprecated": false,
                                                                    "name": "name",
                                                                    "required": false,
                                                                    "type": {
                                                                      "typeName": "string"
                                                                    }
                                                                  },
                                                                  {
                                                                    "deprecated": false,
                                                                    "name": "role",
                                                                    "required": false,
                                                                    "type": {
                                                                      "typeName": "string"
                                                                    }
                                                                  }
                                                                ],
                                                                "refName": "SeriesCreator",
                                                                "deprecated": false
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "notice",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "relatedSeriesList",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "releaseSchedule",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "scheduleSubText",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "seasonText",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "subscriberNotice",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "tags",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "number"
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "title",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "nestedObjectLiteral",
                                                              "properties": [
                                                                {
                                                                  "deprecated": false,
                                                                  "name": "en",
                                                                  "required": false,
                                                                  "type": {
                                                                    "typeName": "string"
                                                                  }
                                                                }
                                                              ]
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "totalEpisodeCount",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "number"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "videoList",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "array",
                                                              "itemType": {
                                                                "typeName": "nestedObjectLiteral",
                                                                "properties": [
                                                                  {
                                                                    "deprecated": false,
                                                                    "name": "url",
                                                                    "required": false,
                                                                    "type": {
                                                                      "typeName": "string"
                                                                    }
                                                                  }
                                                                ]
                                                              }
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "wtfBeginAt",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          },
                                                          {
                                                            "deprecated": false,
                                                            "name": "wtfEndAt",
                                                            "required": false,
                                                            "type": {
                                                              "typeName": "string"
                                                            }
                                                          }
                                                        ],
                                                        "refName": "SeriesData",
                                                        "deprecated": false
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "note",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "image",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "refAlias",
                                                        "refName": "SeriesImage",
                                                        "type": {
                                                          "typeName": "refAlias",
                                                          "description": "Make all properties in T optional",
                                                          "refName": "Partial_Record_SeriesImageOriginalKey.SeriesImageOriginal_-and-Record_SeriesImageThumbnailKey.SeriesImageThumbnail__",
                                                          "type": {
                                                            "typeName": "nestedObjectLiteral",
                                                            "properties": [
                                                              {
                                                                "name": "1440x1440",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840-2",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840b",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840bt",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1440x3072a",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "encoding",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "fieldname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "mimetype",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "originalname",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "updatedAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageOriginal",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1440x1440_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840-2_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840b_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840bt_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1440x3072a_720",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1440x1440_480",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840_480",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1280x1840-2_480",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              },
                                                              {
                                                                "name": "1440x3072a_480",
                                                                "required": false,
                                                                "deprecated": false,
                                                                "type": {
                                                                  "typeName": "refObject",
                                                                  "properties": [
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "createdAt",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "union",
                                                                        "types": [
                                                                          {
                                                                            "typeName": "string",
                                                                            "format": "date-time"
                                                                          },
                                                                          {
                                                                            "typeName": "string"
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "data",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "nestedObjectLiteral",
                                                                        "properties": [
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "blurhash",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "format",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "height",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "key",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "size",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "type",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "string"
                                                                            }
                                                                          },
                                                                          {
                                                                            "deprecated": false,
                                                                            "name": "width",
                                                                            "required": true,
                                                                            "type": {
                                                                              "typeName": "number"
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    },
                                                                    {
                                                                      "deprecated": false,
                                                                      "name": "downloadUrl",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "string"
                                                                      }
                                                                    },
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
                                                                      "name": "parentId",
                                                                      "required": true,
                                                                      "type": {
                                                                        "typeName": "number"
                                                                      }
                                                                    }
                                                                  ],
                                                                  "refName": "SeriesImageThumbnail",
                                                                  "deprecated": false
                                                                }
                                                              }
                                                            ]
                                                          },
                                                          "deprecated": false
                                                        },
                                                        "deprecated": false
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "endTime",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    },
                                                    {
                                                      "deprecated": false,
                                                      "name": "startTime",
                                                      "required": false,
                                                      "type": {
                                                        "typeName": "string"
                                                      }
                                                    }
                                                  ]
                                                },
                                                {
                                                  "typeName": "undefined"
                                                }
                                              ]
                                            },
                                            "deprecated": false
                                          },
                                          "typeName": "refObject",
                                          "properties": [],
                                          "refName": "SeriesVariation",
                                          "deprecated": false
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "webtoonId",
                                  "required": true,
                                  "type": {
                                    "typeName": "union",
                                    "types": [
                                      {
                                        "typeName": "number"
                                      },
                                      {
                                        "typeName": "string"
                                      }
                                    ]
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "episodes",
                                  "required": false,
                                  "type": {
                                    "typeName": "array",
                                    "itemType": {
                                      "typeName": "refObject",
                                      "refName": "EpisodeEntity"
                                    } as any
                                  }
                                }
                              ],
                              "refName": "SeriesEntity",
                              "deprecated": false
                            }
                          },
                          {
                            "deprecated": false,
                            "name": "episodeBuild",
                            "required": false,
                            "type": {
                              "typeName": "refObject",
                              "properties": [
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "createdAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "example": 1,
                                  "deprecated": false,
                                  "name": "id",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "updatedAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "episodeId",
                                  "required": true,
                                  "type": {
                                    "typeName": "union",
                                    "types": [
                                      {
                                        "typeName": "number"
                                      },
                                      {
                                        "typeName": "string"
                                      }
                                    ]
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "inputData",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_any_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "any"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "outputData",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_any_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "any"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "state",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_ValueOf_typeofBUILD_STATE__",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "refAlias",
                                          "refName": "ValueOf_typeofBUILD_STATE_",
                                          "type": {
                                            "typeName": "union",
                                            "types": [
                                              {
                                                "typeName": "enum",
                                                "enums": [
                                                  0
                                                ]
                                              },
                                              {
                                                "typeName": "enum",
                                                "enums": [
                                                  100
                                                ]
                                              },
                                              {
                                                "typeName": "enum",
                                                "enums": [
                                                  200
                                                ]
                                              },
                                              {
                                                "typeName": "enum",
                                                "enums": [
                                                  900
                                                ]
                                              }
                                            ]
                                          },
                                          "deprecated": false
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "workExpireAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "workerId",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_string_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "string"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                }
                              ],
                              "refName": "EpisodeBuildEntity",
                              "deprecated": false
                            }
                          }
                        ],
                        "refName": "EpisodeEntity",
                        "deprecated": false
                      },
                      {
                        "typeName": "refAlias",
                        "description": "From T, pick a set of properties whose keys are in the union K",
                        "refName": "Pick_Episode.lockData-or-purchaseHistory-or-viewHistory_",
                        "type": {
                          "typeName": "nestedObjectLiteral",
                          "properties": [
                            {
                              "deprecated": false,
                              "name": "lockData",
                              "required": false,
                              "type": {
                                "additionalProperties": {
                                  "typeName": "any"
                                },
                                "typeName": "nestedObjectLiteral",
                                "properties": []
                              }
                            },
                            {
                              "deprecated": false,
                              "name": "purchaseHistory",
                              "required": false,
                              "type": {
                                "additionalProperties": {
                                  "typeName": "any"
                                },
                                "typeName": "nestedObjectLiteral",
                                "properties": []
                              }
                            },
                            {
                              "deprecated": false,
                              "name": "viewHistory",
                              "required": false,
                              "type": {
                                "additionalProperties": {
                                  "typeName": "any"
                                },
                                "typeName": "nestedObjectLiteral",
                                "properties": []
                              }
                            }
                          ]
                        },
                        "deprecated": false
                      }
                    ]
                  },
                  "deprecated": false
                }
              }
            },
            {
              "deprecated": false,
              "name": "freePass",
              "required": false,
              "type": {
                "typeName": "refObject",
                "properties": [
                  {
                    "deprecated": false,
                    "name": "isAvailable",
                    "required": true,
                    "type": {
                      "typeName": "boolean"
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "remaining",
                    "required": true,
                    "type": {
                      "typeName": "number"
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "renewCycle",
                    "required": true,
                    "type": {
                      "typeName": "number"
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "rewardMax",
                    "required": true,
                    "type": {
                      "typeName": "number"
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "rewardUsed",
                    "required": true,
                    "type": {
                      "typeName": "number"
                    }
                  }
                ],
                "refName": "FreePass",
                "deprecated": false
              }
            },
            {
              "deprecated": false,
              "name": "my",
              "required": false,
              "type": {
                "typeName": "refObject",
                "properties": [
                  {
                    "deprecated": false,
                    "name": "favorite",
                    "required": false,
                    "type": {
                      "typeName": "refAlias",
                      "refName": "FavoriteEntity",
                      "type": {
                        "typeName": "intersection",
                        "types": [
                          {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_FavoriteGroupEntity.userId-or-key_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "deprecated": false,
                                  "name": "userId",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "key",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                }
                              ]
                            },
                            "deprecated": false
                          },
                          {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_FavoriteSeriesEntity.createdAt-or-id-or-ord-or-seriesId_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "example": 1,
                                  "deprecated": false,
                                  "name": "id",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "createdAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "ord",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "seriesId",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                }
                              ]
                            },
                            "deprecated": false
                          }
                        ]
                      },
                      "deprecated": false
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "notification",
                    "required": false,
                    "type": {
                      "typeName": "refAlias",
                      "refName": "FavoriteEntity",
                      "type": {
                        "typeName": "intersection",
                        "types": [
                          {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_FavoriteGroupEntity.userId-or-key_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "deprecated": false,
                                  "name": "userId",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "key",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                }
                              ]
                            },
                            "deprecated": false
                          },
                          {
                            "typeName": "refAlias",
                            "description": "From T, pick a set of properties whose keys are in the union K",
                            "refName": "Pick_FavoriteSeriesEntity.createdAt-or-id-or-ord-or-seriesId_",
                            "type": {
                              "typeName": "nestedObjectLiteral",
                              "properties": [
                                {
                                  "example": 1,
                                  "deprecated": false,
                                  "name": "id",
                                  "required": true,
                                  "type": {
                                    "typeName": "number"
                                  }
                                },
                                {
                                  "example": "2021-01-01T12:34:56.789Z",
                                  "deprecated": false,
                                  "name": "createdAt",
                                  "required": true,
                                  "type": {
                                    "typeName": "string"
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "ord",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                },
                                {
                                  "deprecated": false,
                                  "name": "seriesId",
                                  "required": true,
                                  "type": {
                                    "typeName": "refAlias",
                                    "refName": "Nullable_number_",
                                    "type": {
                                      "typeName": "union",
                                      "types": [
                                        {
                                          "typeName": "number"
                                        },
                                        {
                                          "typeName": "enum",
                                          "enums": [
                                            null
                                          ]
                                        }
                                      ]
                                    },
                                    "deprecated": false
                                  }
                                }
                              ]
                            },
                            "deprecated": false
                          }
                        ]
                      },
                      "deprecated": false
                    }
                  },
                  {
                    "deprecated": false,
                    "name": "rating",
                    "required": false,
                    "type": {
                      "typeName": "refAlias",
                      "refName": "ValueOf_typeofSERIES_RATING_",
                      "type": {
                        "typeName": "number"
                      },
                      "deprecated": false
                    }
                  }
                ],
                "refName": "MySeriesData",
                "deprecated": false
              }
            },
            {
              "deprecated": false,
              "name": "sort",
              "required": false,
              "type": {
                "typeName": "union",
                "types": [
                  {
                    "typeName": "enum",
                    "enums": [
                      "asc"
                    ]
                  },
                  {
                    "typeName": "enum",
                    "enums": [
                      "desc"
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }
};
