define({ "api": [
  {
    "type": "get",
    "url": "/initiatives/depth-description/:impactIndicatorId",
    "title": "Get Depth Description.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetDepthDescription",
    "group": "Initiatives",
    "description": "<p>Show validations (Green Checks)</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/depth-description/1",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/depth-description/1"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"depthScale\": [\n            {\n                \"id\": 21,\n                \"impactIndicatorId\": 6,\n                \"name\": \"Not applicable\",\n                \"active\": 1,\n                \"created_at\": \"2021-09-08T19:38:14.000Z\",\n                \"updated_at\": \"2021-09-08T19:38:14.000Z\"\n            }\n        ]\n    },\n    \"title\": \"Get Depth Description.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Get Depth Description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Depth Description.\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "get",
    "url": "/initiatives/depth-scale/:impactIndicatorId",
    "title": "Get Depth Scale.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetDepthScale",
    "group": "Initiatives",
    "description": "<p>Show validations (Green Checks)</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/depth-scale/1",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/depth-scale/1"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"depthScale\": [\n            {\n                \"id\": 21,\n                \"impactIndicatorId\": 6,\n                \"name\": \"Not applicable\",\n                \"active\": 1,\n                \"created_at\": \"2021-09-08T19:38:14.000Z\",\n                \"updated_at\": \"2021-09-08T19:38:14.000Z\"\n            }\n        ]\n    },\n    \"title\": \"Get Depth Scale.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Get Depth Scale..</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Depth Scale.\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "get",
    "url": "/:initiativeId/summary/:stageId",
    "title": "Summary - Request Initiative summary",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetInitiativeSummary",
    "group": "Initiatives",
    "description": "<p>Shows summary data from initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "generalInformation",
            "description": "<p>general information data from initiatives.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "geoScope",
            "description": "<p>regions and countries from initiatives.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n     \"getLinks\": [\n         {\n             \"created_at\": \"2021-07-28T02:27:29.000Z\",\n             \"updated_at\": \"2021-07-28T02:27:29.000Z\",\n             \"generalInformation\": \"{}\",\n             \"geoScope\": \"{}\",\n         }\n     ]\n },\n \"title\": \"Initiatives:Get summary.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get summary.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Summary not found in stage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "get",
    "url": "/initiatives",
    "title": "Initiatives - Request all Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetInitiatives",
    "group": "Initiatives",
    "description": "<p>Shows all initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"initiatives\": [\n            {\n                \"initvStgId\": 35,\n                \"id\": 2,\n                \"name\": \"Accelerated Crop Improvement through Precision Genetic Technologies\",\n                \"oficial_code\":\"INIT-2\"\n                \"status\": \"Editing\",\n                \"action_area_id\": \"1\",\n                \"action_area_description\": \"Systems Transformation\",\n                \"active\": 1,\n                \"stageId\": 3,\n                \"description\": \"Stage 3: Full Proposal\",\n                \"stages\": [\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 2,\n                        \"stageId\": 2,\n                        \"active\": 0\n                    },\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 35,\n                        \"stageId\": 3,\n                        \"active\": 1\n                    }\n                ]\n            }\n\t\t\t\n\t\t\t        ]\n    },\n    \"title\": \"All Initiatives.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get Initiatives.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Initiatives:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "patch",
    "url": "initiatives/add-budget/:initiativeId/:stageId",
    "title": "Budget - Create and update budget",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchBudget",
    "group": "Initiatives",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/add-budget/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/add-budget/2/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "value",
            "description": "<p>budget value</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>table name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>column name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "budgetId",
            "description": "<p>This field will be used to update a budget.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\"value\": 2352, \n\"table_name\": \"context\", \n\"col_name\": \"priority_setting\", \n\"citationId\": null,\n\"active\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>budget id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "value",
            "description": "<p>budget value.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>Table to which the budget belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>Colum to which the budget belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  response: {\n    addedBudget: {\n      initvStg: '35',\n      value: '1234',\n      table_name: 'general-information',\n      col_name: 'budget',\n      active: '1',\n      updated_at: '2021-08-12T20:39:05.000Z',\n      created_at: '2021-08-12T20:39:05.000Z',\n      id: 3\n    }\n  },\n  title: 'Initiatives:Add Budget.'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>PatchBudget-Add budget</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Add budget: Error:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "patch",
    "url": "initiatives/add-link/:initiativeId/:stageId",
    "title": "Citations - Create and update citations",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchCitations",
    "group": "Initiatives",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/add-link/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/add-link/2/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>citation title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>citation link</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>table name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>column name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "citationId",
            "description": "<p>This field will be used to update a citation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\"title\": \"test4\", \n\"link\": \"test4\", \n\"table_name\": \"context\", \n\"col_name\": \"priority_setting\", \n\"citationId\": null,\n\"active\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>citation id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>citation title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>citation link.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>Table to which the citation belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>Colum to which the citation belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"addedLink\": {\n            \"initvStg\": \"35\",\n            \"title\": \"test4\",\n            \"link\": \"test4\",\n            \"table_name\": \"context\",\n            \"col_name\": \"priority_setting\",\n            \"active\": true,\n            \"updated_at\": \"2021-07-29T14:09:16.000Z\",\n            \"created_at\": \"2021-07-29T14:09:16.000Z\",\n            \"id\": 7\n        }\n    },\n    \"title\": \"Initiatives:Add link.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>PatchCitations-Add link</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Initiative not found in stage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "patch",
    "url": "/:initiativeId/summary/:stageId",
    "title": "Summary - Upserts Initiative summary",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchInitiativeSummary",
    "group": "Initiatives",
    "description": "<p>Upserts summary data from initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/1/summary/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "generalInformation",
            "description": "<p>general information data from initiatives.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "geoScope",
            "description": "<p>regions and countries from initiatives.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n     \"getLinks\": [\n         {\n             \"created_at\": \"2021-07-28T02:27:29.000Z\",\n             \"updated_at\": \"2021-07-28T02:27:29.000Z\",\n             \"generalInformation\": \"{}\",\n             \"geoScope\": \"{}\",\n         }\n     ]\n },\n \"title\": \"Initiatives:Upsert summary.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Upsert summary.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Summary not found in stage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "post",
    "url": "initiatives/get-budget/:initiativeId/:stageId",
    "title": "Budget - Read data of Budget.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PostBudget",
    "group": "Initiatives",
    "description": "<p>Shows budget filtered by initiative id, estage id and status</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/get-budget/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/get-budget/2/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>table name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>column name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"table_name\": \"general-information\", \n\"col_name\": \"budget\", \n\"active\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  response: {\n    getBudget: {\n      created_at: '2021-08-12T20:30:22.000Z',\n      updated_at: '2021-08-12T20:30:22.000Z',\n      id: 1,\n      value: '123.1200',\n      table_name: 'general-information',\n      col_name: 'budget',\n      active: 0\n    }\n  },\n  title: 'Initiatives:Get budget.'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>PostCitations-Get Budget.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Initiative not found in stage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "post",
    "url": "initiatives/get-link/:initiativeId/:stageId",
    "title": "Citations - Read data of citations.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PostCitations",
    "group": "Initiatives",
    "description": "<p>Shows all cititations filtered by initiative id, estage id and status</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/initiatives/get-link/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/initiatives/get-link/2/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stageId",
            "description": "<p>Id stage.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>table name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>column name - Metadata.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"table_name\": \"context\", \n\"col_name\": \"priority_setting\", \n\"active\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Creation date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>citation id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>citation title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>citation link.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>Table to which the citation belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "col_name",
            "description": "<p>Colum to which the citation belongs.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n     \"getLinks\": [\n         {\n             \"created_at\": \"2021-07-28T02:27:29.000Z\",\n             \"updated_at\": \"2021-07-28T02:27:29.000Z\",\n             \"id\": 6,\n             \"title\": \"test3\",\n             \"link\": \"test3\",\n             \"table_name\": \"context\",\n             \"col_name\": \"priority_setting\",\n             \"active\": 0\n         }\n     ]\n },\n \"title\": \"Initiatives:Get link.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>PostCitations-Get link.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Initiative not found in stage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Initiatives"
  },
  {
    "type": "get",
    "url": "initiatives/initiativeId([0-9]+)/users/",
    "title": "Users by initiative - Request users by initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "all"
      }
    ],
    "name": "GetUserInitiative",
    "group": "Manage_Access",
    "description": "<p>Shows users by initiative data</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/intiatives/2/users/",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/intiatives/2/users/"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"users\": [\n            {\n                \"userId\": 41,\n                \"first_name\": \"First Name\",\n                \"last_name\": \"Last Name\",\n                \"email\": \"e.mail@mail.org\",\n                \"role_name\": \"Science Group Directors/Designated (SGD) / Initiative Design Team\",\n                \"role_acronym\": \"SGD\",\n                \"roleId\": 1\n            },\n             ...\n\t\t\t\n\t\t\t     ]\n    },\n    \"title\": \"Users by Initiative\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get users by initiative.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get users by initiative:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/Initiatives.ts",
    "groupTitle": "Manage_Access"
  },
  {
    "type": "get",
    "url": "meta/menu/:initiativeId",
    "title": "Get Menu.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetMenu",
    "group": "Metadata",
    "description": "<p>Show metadata from stages,sections and subsections</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/meta/menu/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/meta/menu/2"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n   \"stages\": [\n         {\n             \"stageId\": 2,\n             \"description\": \"Concept\",\n             \"active\": 0,\n             \"start_date\": \"2021-02-15T19:22:33.000Z\",\n             \"end_date\": \"2021-02-15T19:22:33.000Z\",\n             \"sections\": [\n                 {\n                     \"sectionId\": 3,\n                     \"stage\": \"Concept\",\n                     \"description\": \"context\",\n                     \"display_name\": \"Context\",\n                     \"active\": 1,\n                     \"visible\": 1,\n                     \"orderSection\": 2,\n                     \"stageId\": 2,\n                     \"subsections\": []\n                 }\n             ]\n         }\n     ]\n },\n \"title\": \"Initiatives:Get link.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>GetMenu.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Metadata:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/MetaDataRoutes.ts",
    "groupTitle": "Metadata"
  },
  {
    "type": "get",
    "url": "/meta/validations/menu/:initiativeId/:stageId",
    "title": "Get Validations.",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetValidations",
    "group": "Metadata",
    "description": "<p>Show validations (Green Checks)</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/meta/validations/menu/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/meta/validations/menu/2/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"validationGI\": [\n            {\n                \"sectionId\": 2,\n                \"description\": \"general-information\",\n                \"ValidateGI\": \"1\"\n            }\n        ]\n    },\n    \"title\": \"Validations General Information:Menu\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Get validations GI.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get validations GI\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/MetaDataRoutes.ts",
    "groupTitle": "Metadata"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/financial-resources/:initiativeId/:ubication/:stageId",
    "title": "10.Financial Resources - Request Financial Resources",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetFinancialResources",
    "group": "Proposal",
    "description": "<p>Shows Financial Resources</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/budget",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/budget"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n  \"response\": {\n      \"financialResourcesData\": {\n          \"id\": 2,\n          \"initvStgId\": 35,\n          \"detailed_budget\": \"new detail\",\n          \"active\": 1,\n          \"created_at\": \"2021-09-20T17:06:53.000Z\",\n          \"updated_at\": \"2021-09-20T17:06:53.000Z\",\n          \"files\": [\n              {\n                  \"id\": 69,\n                  \"tocsId\": null,\n                  \"url\": \"http://localhost:3000/uploads/INIT-2/financial-resources/stage-3/1632157613540-Book1.xlsx\",\n                  \"name\": \"Book1.xlsx\",\n                  \"active\": 1,\n                  \"created_at\": \"2021-09-20T17:06:53.000Z\",\n                  \"updated_at\": \"2021-09-20T17:06:53.000Z\",\n                  \"meliaId\": null,\n                  \"manage_plan_risk_id\": null,\n                  \"humanId\": null,\n                  \"financial_resources_id\": 2,\n                  \"section\": \"budget\"\n              }\n          ]\n      }\n  },\n  \"title\": \"Full Proposal:financial resources and files.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get financial resources and files: Full proposal.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get financial resources and files: Full proposal.\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/human-resources/:initiativeId/:ubication/:stageId",
    "title": "9.Human Resources - Request Human Resources",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetHumanResources",
    "group": "Proposal",
    "description": "<p>Shows Human Resources</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/initiative-team",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/initiative-team"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n     \"humanResourcesData\": {\n         \"id\": 1,\n         \"initvStgId\": 35,\n         \"gender_diversity_inclusion\": \"\",\n         \"capacity_development\": \"\",\n         \"active\": 1,\n         \"created_at\": \"2021-09-20T19:43:28.000Z\",\n         \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n         \"files\": [\n             {\n                 \"id\": 72,\n                 \"tocsId\": null,\n                 \"url\": \"http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx\",\n                 \"name\": \"Book1.xlsx\",\n                 \"active\": 1,\n                 \"created_at\": \"2021-09-20T19:43:28.000Z\",\n                 \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n                 \"meliaId\": null,\n                 \"manage_plan_risk_id\": null,\n                 \"humanId\": 1,\n                 \"financial_resources_id\": null,\n                 \"section\": \"initiative-team\"\n             }\n         ]\n     }\n },\n \"title\": \"Full Proposal:human resources and files.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get human resources and files: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get human resources and files: Full proposal\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/packages/:initiativeId",
    "title": "3.Work package - Request workpackage",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetWorkPackage",
    "group": "Proposal",
    "description": "<p>Shows work packages data from initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages/2"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"workpackage\": [\n            {\n                \"created_at\": \"2021-05-21T19:14:34.000Z\",\n                \"updated_at\": \"2021-05-21T19:14:34.000Z\",\n                \"id\": 41,\n                \"active\": 1,\n                \"name\": \"Market intelligence\",\n                \"acronym\": \"Work Package 1\",\n                \"results\": \"CGIAR GI initiatives and public and private sector partners collaboratively share, access and use a shared digital infrastructure for global and local market intelligence to build and prioritize investment cases, develop product profiles and address stage gate decision making.\",\n                \"pathway_content\": \"Design and implement market intelligence that characterizes current and future needs and perceptions of improved value across crops, varieties and traits in key regions. Approaches will consider priorities and needs of different actors (e.g., processors, seed businesses, consumers, women and men farmers) and potential mediating factors (e.g., policies, trade, technology, market structure, culture).\",\n                \"is_global\": null\n            }\n\t\t\t\n\t\t\t     ]\n    },\n    \"title\": \"Full Proposal: Workpackage.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get workpackage.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get workpackage:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/package/:wrkPkgId",
    "title": "3.Work package - Request workpackage for id",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetWorkPackageId",
    "group": "Proposal",
    "description": "<p>Shows work package data from initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/177",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/177"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "wrkPkgId",
            "description": "<p>Id WP</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"workpackage\": [\n            {\n                \"created_at\": \"2021-08-31T16:39:08.000Z\",\n                \"updated_at\": \"2021-08-31T16:39:08.000Z\",\n                \"id\": 177,\n                \"active\": 1,\n                \"name\": \"One CGIAR nodes of excellence for utilization of state-of-the-art precision genetics\",\n                \"acronym\": \"Work Package 1\",\n                \"results\": null,\n                \"pathway_content\": \"Gain access and develop state-of-the-art precision genetic technologies  and associated enabling technologies such as allele replacement, DNA-free editing, double haploid; establish three nodes of excellence (LAC, Africa, Asia) with One CGIAR focus crop specialization and linked phenotyping facilities in relevant locations.\",\n                \"is_global\": null,\n                \"regions\": [\n                    {\n                        \"id\": 2007,\n                        \"region_id\": 5,\n                        \"initvStgId\": 35,\n                        \"wrkPkgId\": 177\n                    },\n                    {\n                        \"id\": 2008,\n                        \"region_id\": 34,\n                        \"initvStgId\": 35,\n                        \"wrkPkgId\": 177\n                    }\n\n                ],\n                \"countries\": []\n            }\n        ]\n    },\n    \"title\": \"Full Proposal: Workpackage id.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>: Get workpackage id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get workpackage id:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/financial-resources/:initiativeId/:ubication/:stageId",
    "title": "10.Financial Resources - Create and update FR",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchFinancialResources",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/10.financial-resources/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/financial-resources/2/10.financial-resources/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator Financial Resources</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detailed_budget",
            "description": "<p>description budget.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "section",
            "description": "<p>section location.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "updateFiles",
            "description": "<p>file to updtate.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>template Financial Resources</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "data: [\n{   \"id\":null,\n  \"detailed_budget\": \"new detail\",\n  \"active\": true,\n  \"section\":\"budget\",\n  \"updateFiles\":[]\n}\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n  \"response\": {\n      \"financialResources\": {\n          \"upsertedFinancialResources\": {\n              \"id\": 6,\n              \"detailed_budget\": \"new detail\",\n               \"active\": true,\n               \"initvStgId\": 35,\n               \"updated_at\": \"2021-09-20T17:21:59.000Z\",\n               \"created_at\": \"2021-09-20T17:21:59.000Z\"\n           },\n           \"upsertedFile\": {\n               \"id\": 71,\n               \"active\": true,\n               \"financial_resources_id\": 6,\n               \"section\": \"budget\",\n               \"url\": \"http://localhost:3000/uploads/INIT-2/10.financial-resources/stage-3/1632158519519-Book1.xlsx\",\n               \"name\": \"Book1.xlsx\",\n               \"updated_at\": \"2021-09-20T17:21:59.000Z\",\n               \"created_at\": \"2021-09-20T17:21:59.000Z\"\n           }\n       },\n       \"files\": [\n           {\n               \"fieldname\": \"file\",\n               \"originalname\": \"Book1.xlsx\",\n               \"encoding\": \"7bit\",\n               \"mimetype\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n               \"destination\": \"./public/uploads/INIT-2/10.financial-resources/stage-3\",\n               \"filename\": \"1632158519519-Book1.xlsx\",\n               \"path\": \"public\\\\uploads\\\\INIT-2\\\\10.financial-resources\\\\stage-3\\\\1632158519519-Book1.xlsx\",\n               \"size\": 22386\n           }\n       ]\n   },\n   \"title\": \"Full Proposal: Patch financial resources\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Full Proposal: Patch financial resources</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert financial Resources: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/human-resources/:initiativeId/:ubication/:stageId",
    "title": "9.Human Resources - Create and update HR",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchHumanResources",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/9.human-resources/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/human-resources/2/9.human-resources/3"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator Human Resources</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender_diversity_inclusion",
            "description": "<p>description gender diversity inclusion.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "capacity_development",
            "description": "<p>description capacity development.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "section",
            "description": "<p>section location.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "updateFiles",
            "description": "<p>file to updtate.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>template Financial Resources</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "data: [\n{   \"id\":null,\n   \"gender_diversity_inclusion\": \"\",\n  \"capacity_development\": \"\",\n   \"active\": true,\n   \"section\":\"initiative-team\",\n   \"updateFiles\":[]\n}\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n  {\n \"response\": {\n     \"humanResources\": {\n         \"upsertedHumanResources\": {\n             \"id\": 1,\n             \"gender_diversity_inclusion\": \"\",\n             \"capacity_development\": \"\",\n             \"active\": true,\n             \"initvStgId\": 35,\n             \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n             \"created_at\": \"2021-09-20T19:43:28.000Z\"\n         },\n         \"upsertedFile\": {\n             \"id\": 72,\n             \"active\": true,\n             \"humanId\": 1,\n             \"section\": \"initiative-team\",\n             \"url\": \"http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx\",\n             \"name\": \"Book1.xlsx\",\n             \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n             \"created_at\": \"2021-09-20T19:43:28.000Z\"\n         }\n     },\n     \"files\": [\n         {\n             \"fieldname\": \"file\",\n             \"originalname\": \"Book1.xlsx\",\n             \"encoding\": \"7bit\",\n             \"mimetype\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n             \"destination\": \"./public/uploads/INIT-2/9.human-resources/stage-3\",\n             \"filename\": \"1632167008334-Book1.xlsx\",\n             \"path\": \"public\\\\uploads\\\\INIT-2\\\\9.human-resources\\\\stage-3\\\\1632167008334-Book1.xlsx\",\n             \"size\": 22386\n         }\n     ]\n },\n \"title\": \"Full Proposal: Patch human resources.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Full Proposal: Patch human resources.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert human Resources: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/package/:wrkPkgId",
    "title": "3.Work Package - Create and update WP",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchWorkPackage",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/package/2"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator wp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "acronym",
            "description": "<p>short description wp.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name wp.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pathway_content",
            "description": "<p>narrative wp.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_global",
            "description": "<p>indicator if wp is global.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>status.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "regions",
            "description": "<p>regions wp.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "countries",
            "description": "<p>countries wp.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"acronym\": \"Work Package 6\",\n    \"name\": \"khe waza? nuevo 1235411 test\",\n    \"pathway_content\": \"Esta es una humilde prueba\",\n    \"is_global\": true,\n    \"id\": 256,\n    \"regions\": [\n           {\n            \"name\": \"Eastern Africa\",\n            \"parentRegion\": {\n                \"name\": \"Sub-Saharan Africa\",\n                \"um49Code\": 202\n            },\n            \"um49Code\": 14,\n            \"region_id\": 14,\n            \"selected\": true,\n            \"wrkPkg\": 256\n        }\n    ],\n    \"countries\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"response\": {\n       \"workpackage\": {\n           \"id\": 256,\n           \"active\": true,\n           \"name\": \"khe waza? nuevo 1235411 test\",\n           \"results\": null,\n           \"pathway_content\": \"Esta es una humilde prueba a\",\n           \"is_global\": true,\n           \"initvStgId\": 35,\n           \"created_at\": \"2021-09-01T22:54:54.000Z\",\n           \"updated_at\": \"2021-09-01T22:54:54.000Z\",\n           \"acronym\": \"Work Package 7\"\n       },\n       \"upsertedGeoScope\": {\n           \"regions\": [\n               {\n                   \"name\": \"Eastern Africa\",\n                   \"parentRegion\": {\n                       \"name\": \"Sub-Saharan Africa\",\n                       \"um49Code\": 202\n                   },\n                   \"um49Code\": 14,\n                   \"region_id\": 14,\n                   \"selected\": true,\n                   \"wrkPkg\": 256,\n                   \"initvStg\": 35,\n                   \"updated_at\": \"2021-09-10T21:28:44.000Z\",\n                   \"created_at\": \"2021-09-10T21:28:44.000Z\",\n                   \"id\": 2272\n               }\n           ],\n           \"countries\": []\n       }\n   },\n    \"title\": \"Full Proposal: Patch Workpackage.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Work Package: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Work Package: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  }
] });
