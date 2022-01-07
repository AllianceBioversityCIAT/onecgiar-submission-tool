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
    "filename": "src/routes/InitiativesRoutes.ts",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"initiatives\": [\n            {\n                \"initvStgId\": 35,\n                \"id\": 2,\n                \"name\": \"Accelerated Crop Improvement through Precision Genetic Technologies\",\n                \"oficial_code\":\"INIT-2\"\n                \"status\": \"Editing\",\n                \"action_area_id\": \"1\",\n                \"action_area_description\": \"Systems Transformation\",\n                \"active\": 1,\n                \"stageId\": 3,\n                \"description\": \"Stage 3: Full Proposal\",\n                \"stages\": [\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 2,\n                        \"stageId\": 2,\n                        \"active\": 0\n                    },\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 35,\n                        \"stageId\": 3,\n                        \"active\": 1\n                    }\n                ]\n            }\n\n\t\t\t        ]\n    },\n    \"title\": \"All Initiatives.\"\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": " {\n\"value\": 2352,\n\"table_name\": \"context\",\n\"col_name\": \"priority_setting\",\n\"citationId\": null,\n\"active\":true\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": " {\n\"title\": \"test4\",\n\"link\": \"test4\",\n\"table_name\": \"context\",\n\"col_name\": \"priority_setting\",\n\"citationId\": null,\n\"active\":true\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": "{\n\"table_name\": \"general-information\",\n\"col_name\": \"budget\",\n\"active\":true\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": "{\n\"table_name\": \"context\",\n\"col_name\": \"priority_setting\",\n\"active\":true\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"users\": [\n            {\n                \"userId\": 41,\n                \"first_name\": \"First Name\",\n                \"last_name\": \"Last Name\",\n                \"email\": \"e.mail@mail.org\",\n                \"role_name\": \"Science Group Directors/Designated (SGD) / Initiative Design Team\",\n                \"role_acronym\": \"SGD\",\n                \"roleId\": 1\n            },\n             ...\n\n\t\t\t     ]\n    },\n    \"title\": \"Users by Initiative\"\n}",
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
    "filename": "src/routes/InitiativesRoutes.ts",
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"innovationPackages\": [\n            {\n                \"sectionId\": 2,\n                \"description\": \"general-information\",\n                \"ValidateGI\": \"1\"\n            }\n        ]\n    },\n    \"title\": \"Validations General Information:Menu\"\n}",
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
    "url": "previews/financial-resources/:initiativeId/:stageId",
    "title": "7. Get Financial Resources per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewFinancialResources",
    "group": "Previews",
    "description": "<p>Shows Preview Financial Resources per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/financial-resources/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/financial-resources/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewFinancialResources\": {\n            \"financialResources\": [\n                {\n                    \"description\": \"crosscutting_wokpackages\",\n                    \"year\": \"2022\",\n                    \"value\": \"100\"\n                },\n                {\n                    \"description\": \"innovation_packages\",\n                    \"year\": \"2022\",\n                    \"value\": \"100\"\n                },\n                {\n                    \"description\": \"Work Package 1\",\n                    \"year\": \"2022\",\n                    \"value\": \"100\"\n                },\n                {\n                    \"description\": \"Work Package 2\",\n                    \"year\": \"2022\",\n                    \"value\": \"100\"\n                }\n            ]\n        }\n    },\n    \"title\": \"Previews:Preview Financial Resources\"\n}",
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
            "field": "ERROR",
            "description": "<p>Get Preview Financial Resources: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Get Preview Financial Resources: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/geographic-scope/:initiativeId/:stageId",
    "title": "1. Get Geographic Scope per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewGeographicScope",
    "group": "Previews",
    "description": "<p>Shows Geographic Scope per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/geographic-scope/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/geographic-scope/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"response\": {\n        \"previewGeographicScope\": {\n            \"GeoScope\": {\n                \"regions\": [\n                    {\n                        \"clarisa_region_code\": 4,\n                        \"name\": \"East and Southern Africa\",\n                        \"acronym\": \"ESA\"\n                    },\n                    {\n                        \"clarisa_region_code\": 5,\n                        \"name\": \"South Asia\",\n                        \"acronym\": \"SA\"\n                    }\n                ],\n                \"countries\": [\n                    {\n                        \"clarisa_country_code\": 4,\n                        \"isoAlpha2\": \"AF\",\n                        \"name\": \"Afghanistan\"\n                    },\n                    {\n                        \"clarisa_code\": 8,\n                        \"isoAlpha2\": \"AL\",\n                        \"name\": \"Albania\"\n                    }\n                ]\n            }\n        }\n    },\n    \"title\": \"Previews:Get Geographic Scope per initiative\"\n}",
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
            "description": "<p>: ERROR Get Geographic Scope per initiative: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Get Geographic Scope per initiative: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/all-geographic-scope/:stageId",
    "title": "2. Get all Geographic Scope",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewGeographicScopeGeneral",
    "group": "Previews",
    "description": "<p>Shows Geographic Scope</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/all-geographic-scope/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/all-geographic-scope/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewGeographicScope\": {\n            \"GeoScope\": {\n                \"regions\": [\n                    {\n                        \"clarisa_region_code\": 4,\n                        \"name\": \"East and Southern Africa\",\n                        \"acronym\": \"ESA\",\n                        \"initiative_code\": \"INIT-1\"\n                    },\n                    {\n                        \"clarisa_region_code\": 5,\n                        \"name\": \"South Asia\",\n                        \"acronym\": \"SA\",\n                        \"initiative_code\": \"INIT-1\"\n                    },\n                    {\n                        \"clarisa_region_code\": 4,\n                        \"name\": \"East and Southern Africa\",\n                        \"acronym\": \"ESA\",\n                        \"initiative_code\": \"INIT-5\"\n                    },\n                    {\n                        \"clarisa_region_code\": 5,\n                        \"name\": \"South Asia\",\n                        \"acronym\": \"SA\",\n                        \"initiative_code\": \"INIT-5\"\n                    }\n                ],\n                \"countries\": [\n                    {\n                        \"clarisa_country_code\": 4,\n                        \"isoAlpha2\": \"AF\",\n                        \"name\": \"Afghanistan\",\n                        \"initiative_code\": \"INIT-1\"\n                    },\n                    {\n                        \"clarisa_country_code\": 8,\n                        \"isoAlpha2\": \"AL\",\n                        \"name\": \"Albania\",\n                        \"initiative_code\": \"INIT-1\"\n                    }\n                ]\n            }\n        }\n    },\n    \"title\": \"Previews:Get all Geographic Scope\"\n}",
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
            "description": "<p>: ERROR Get all Geographic Scope: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Get all Geographic Scope: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/human-resources/:initiativeId/:stageId",
    "title": "6. Get Human Resources per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewHumanResources",
    "group": "Previews",
    "description": "<p>Shows Preview Human Resources per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/human-resources/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/human-resources/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewHumanResources\": {\n            \"initiativeTeam\": [\n                {\n                    \"category\": \"Research\",\n                    \"area_expertise\": \"Research leadership and management\",\n                    \"key_accountabilities\": \"Provide leadership\"\n                }\n            ]\n        }\n    },\n    \"title\": \"Previews:Preview Human Resources\"\n}",
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
            "field": "ERROR",
            "description": "<p>Get Preview Human Resources: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Get Preview Human Resources: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/partners/:initiativeId/:stageId",
    "title": "3. Get Partners per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewPartners",
    "group": "Previews",
    "description": "<p>Shows Partners per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/partners/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/partners/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewPartners\": [\n            {\n                \"code\": 1,\n                \"acronym\": \"WUR\",\n                \"institution_type\": \"University\",\n                \"office_location\": \"NL\",\n                \"name\": \"Wageningen University and Research Centre\",\n                \"impact_area\": \"Poverty reduction, livelihoods and jobs\",\n                \"demand\": 0,\n                \"innovation\": 0,\n                \"scaling\": 0,\n                \"website\": \"http://www.wur.nl/en.htm\"\n            },\n            {\n                \"code\": 1,\n                \"acronym\": \"WUR\",\n                \"institution_type\": \"University\",\n                \"office_location\": \"NL\",\n                \"name\": \"Wageningen University and Research Centre\",\n                \"impact_area\": \"Nutrition, health and food security\",\n                \"demand\": 1,\n                \"innovation\": 0,\n                \"scaling\": 1,\n                \"website\": \"http://www.wur.nl/en.htm\"\n            }\n        ]\n    },\n    \"title\": \"Previews:Get Partners per initiative\"\n}",
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
            "description": "<p>: Get Partners per initiative: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Partners per initiative: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/preview-projected-benefits/:initiativeId/:stageId",
    "title": "4. Get Projected benefits per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewProjectedBenefits",
    "group": "Previews",
    "description": "<p>Shows Projected benefits per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/projected-benefits/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/projected-benefits/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewProjectedBenefits\": {\n            \"impactAreas\": [\n                {\n                    \"id\": 778,\n                    \"impact_area_id\": 1,\n                    \"impact_area_name\": \"Nutrition, health and food security\",\n                    \"impactIndicators\": {\n                        \"id\": 778,\n                        \"impact_area_indicator_id\": 4,\n                        \"impact_area_indicator_name\": \"#cases communicable and noncommunicable diseases\",\n                        \"depth_scale_id\": 2,\n                        \"depth_scale_name\": null,\n                        \"probability_id\": 2,\n                        \"probability_name\": null,\n                        \"dimensions\": [\n                            {\n                                \"projection_id\": 778,\n                                \"depth_description\": \"Life saving\",\n                                \"targetUnit\": \"Millions\",\n                                \"breadth_value\": \"100.00000000\"\n                            }\n                        ]\n                    }\n                }\n            ]\n        }\n    },\n    \"title\": \"Previews:Get Projected Benefits\"\n}",
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
            "field": "ERROR",
            "description": "<p>Get Projected Benefits: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Get Projected Benefits: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "previews/risk-assessment/:initiativeId/:stageId",
    "title": "5. Get Risk Assessment per Initiative",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPreviewRiskAssessment",
    "group": "Previews",
    "description": "<p>Shows Risk Assessment per Initiative</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/previews/risk-assessment/1/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/previews/risk-assessment/1/3"
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
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"previewRiskAssessment\": {\n            \"managePlan\": {\n                \"id\": 3,\n                \"initvStgId\": 34,\n                \"riskassessment\": [\n                    {\n                        \"id\": 61,\n                        \"risks_achieving_impact\": \"Business interruption or delays due to pandemic, war, natural disaster or other incident affecting the Initiative or key dependencies\",\n                        \"risks_theme\": \"Operational\",\n                        \"description_risk\": \"Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\\n\",\n                        \"likelihood\": 1,\n                        \"impact\": 5,\n                        \"risk_score\": 0,\n                        \"manage_plan_risk_id\": 3,\n                        \"active\": 1,\n                        \"opportinities\": [\n                            {\n                                \"id\": 29,\n                                \"opportunities_description\": \"test\",\n                                \"risk_assessment_id\": 61,\n                                \"active\": 1\n                            }\n                        ]\n                    },\n                    {\n                        \"id\": 62,\n                        \"risks_achieving_impact\": \"Capability, and capacity constraints within and across the regions may hinder the uptake of innovations\",\n                        \"risks_theme\": \"Fit for purpose partnerships\",\n                        \"description_risk\": \"Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\\n\",\n                        \"likelihood\": 0,\n                        \"impact\": 0,\n                        \"risk_score\": 0,\n                        \"manage_plan_risk_id\": 3,\n                        \"active\": 1,\n                        \"opportinities\": []\n                    },\n                    {\n                        \"id\": 63,\n                        \"risks_achieving_impact\": \"Conflicting intended or unintended consequences of technologies/innovations for natural resources, GHG emissions, and social and economic aspects impacting objectives and reputation\",\n                        \"risks_theme\": \"Cohesion\",\n                        \"description_risk\": \"Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\\n\",\n                        \"likelihood\": 1,\n                        \"impact\": 1,\n                        \"risk_score\": 0,\n                        \"manage_plan_risk_id\": 3,\n                        \"active\": 1,\n                        \"opportinities\": []\n                    },\n                    {\n                        \"id\": 64,\n                        \"risks_achieving_impact\": \"Data management and systems not fit for purpose or outdated affecting Initiative's efficiency\",\n                        \"risks_theme\": \"Operational\",\n                        \"description_risk\": \"Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\\n\",\n                        \"likelihood\": 1,\n                        \"impact\": 2,\n                        \"risk_score\": 0,\n                        \"manage_plan_risk_id\": 3,\n                        \"active\": 1,\n                        \"opportinities\": []\n                    },\n                    {\n                        \"id\": 65,\n                        \"risks_achieving_impact\": \"Ethical/behavioural (i.e. failure to protect children and vulnerable adults), financial irregularity, data privacy incident leading to reputational event affecting Initiative\",\n                        \"risks_theme\": \"Ethical\",\n                        \"description_risk\": \"Failure to articulate a value proposition for the Initiative that outlines clearly the pathway from research to impact\\n\",\n                        \"likelihood\": 1,\n                        \"impact\": 4,\n                        \"risk_score\": 0,\n                        \"manage_plan_risk_id\": 3,\n                        \"active\": 1,\n                        \"opportinities\": []\n                    }\n                ]\n            }\n        }\n    },\n    \"title\": \"Previews:Risk Assessment\"\n}",
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
            "description": "<p>: ERROR Preview Risk Assessment: Previews General</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"ERROR Preview Risk Assessment: Previews General\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/PreviewsRoutes.ts",
    "groupTitle": "Previews"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/packages",
    "title": "Work package - Request All work packages",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetAllWorkPackage",
    "group": "Proposal",
    "description": "<p>Shows all work packages for Clarisas</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/packages"
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"workpackage\": [\n            {\n                \"created_at\": \"2021-05-21T19:14:34.000Z\",\n                \"updated_at\": \"2021-05-21T19:14:34.000Z\",\n                \"id\": 41,\n                \"active\": 1,\n                \"name\": \"Market intelligence\",\n                \"acronym\": \"Work Package 1\",\n                \"results\": \"CGIAR GI initiatives and public and private sector partners collaboratively share, access and use a shared digital infrastructure for global and local market intelligence to build and prioritize investment cases, develop product profiles and address stage gate decision making.\",\n                \"pathway_content\": \"Design and implement market intelligence that characterizes current and future needs and perceptions of improved value across crops, varieties and traits in key regions. Approaches will consider priorities and needs of different actors (e.g., processors, seed businesses, consumers, women and men farmers) and potential mediating factors (e.g., policies, trade, technology, market structure, culture).\",\n                \"is_global\": null\n            }\n\n\t\t\t     ]\n    },\n    \"title\": \"Full Proposal: All Work Package.\"\n}",
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
            "description": "<p>: Get All work packages.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get All work packages:\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/financial-resources/:initiativeId/:ubication/:stageId",
    "title": "Financial Resources - Request Financial Resources",
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"financialResourcesData\": [\n            {\n                \"id\": 25,\n                \"initvStgId\": 60,\n                \"financial_type\": \"geographic_breakdown\",\n                \"active\": 1,\n                \"created_at\": \"2021-12-01T02:28:21.000Z\",\n                \"updated_at\": \"2021-12-01T02:28:21.000Z\",\n                \"financial_type_id\": null,\n                \"table_name\": \"financial_resources\",\n                \"col_name\": \"global\",\n                \"years\": \"2022;2023;2024\",\n                \"values_\": \"1.00;2.00;7.00\"\n            }\n        ]\n    },\n    \"title\": \"Full Proposal:financial resources.\"\n}",
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
            "description": "<p>: Get financial resources: Full proposal.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get financial resources: Full proposal.\", error }",
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
    "title": "Human Resources - Request Human Resources",
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
          "content": "   HTTP/1.1 200 OK\n{\n \"response\": {\n     \"humanResourcesData\": {\n         \"id\": 1,\n         \"initvStgId\": 35,\n         \"gender_diversity_inclusion\": \"\",\n         \"capacity_development\": \"\",\n         \"active\": 1,\n         \"created_at\": \"2021-09-20T19:43:28.000Z\",\n         \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n         \"files\": [\n             {\n                 \"id\": 72,\n                 \"tocsId\": null,\n                 \"url\": \"http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx\",\n                 \"name\": \"Book1.xlsx\",\n                 \"active\": 1,\n                 \"created_at\": \"2021-09-20T19:43:28.000Z\",\n                 \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n                 \"meliaId\": null,\n                 \"manage_plan_risk_id\": null,\n                 \"humanId\": 1,\n                 \"financial_resources_id\": null,\n                 \"section\": \"initiative-team\"\n             }\n         ],\n          \"initvTeam\": [\n             {\n                 \"id\": 4,\n                 \"category\": \"Research\",\n                 \"area_expertise\": \"Research leadership and management\",\n                 \"key_accountabilities\": \"Provide leadership\",\n                 \"human_resources_id\": 5,\n                 \"active\": 1,\n                 \"created_at\": \"2021-11-30T20:06:00.000Z\",\n                 \"updated_at\": \"2021-11-30T20:06:00.000Z\"\n             }\n         ]\n     }\n },\n \"title\": \"Full Proposal:human resources and files.\"\n}",
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
    "url": "stages-control/proposal/impact-strategies/:initiativeId/:impactAreaId",
    "title": "Impact Strategies - Request Impact Strategies",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetImpactStrategies",
    "group": "Proposal",
    "description": "<p>Shows Impact Strategies by impact area</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2/1",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2/1"
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"impactStrategies\": {\n            \"impactStrategies\": [\n                {\n                    \"id\": 2,\n                    \"initvStgId\": 42,\n                    \"active\": 1,\n                    \"challenge_priorization\": \"Test challenge\",\n                    \"research_questions\": \"\",\n                    \"component_work_package\": \"\",\n                    \"performance_results\": \"\",\n                    \"human_capacity\": \"\",\n                    \"created_at\": \"2021-09-21T21:32:15.000Z\",\n                    \"updated_at\": \"2021-09-21T21:32:15.000Z\",\n                    \"impact_area_id\": 1,\n                    \"impact_area_name\": \"Test impact Area\",\n                    \"partners\": [\n                        {\n                            \"id\": 3,\n                            \"impact_strategies_id\": 2,\n                            \"code\": 1,\n                            \"name\": \"Wageningen University and Research Centre\",\n                            \"tag_id\": 1,\n                            \"type_id\": 3,\n                            \"institutionType\": \"CGIAR Center\",\n                            \"active\": 1,\n                            \"created_at\": \"2021-09-21T21:32:15.000Z\",\n                            \"updated_at\": \"2021-09-21T21:32:15.000Z\"\n                        }\n                    ]\n                }\n            ]\n        }\n    },\n    \"title\": \"Full Proposal: Get Impact Stretegies.\"\n}",
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
            "description": "<p>: Get Impact Strategies: Full proposal.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get Impact Strategies: Full proposal.\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/innovation-packages/:initiativeId",
    "title": "Innovation Packages - Request PCO",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetInnovationPackages",
    "group": "Proposal",
    "description": "<p>Shows Innovation Packages</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2"
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
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": {\n      \"innovationPackagesData\": {\n          \"id\": 1,\n          \"initvStgId\": 35,\n          \"key_principles\": \"Test 1 innovation package\",\n          \"active\": 1,\n          \"created_at\": \"2021-09-22T16:09:07.000Z\",\n          \"updated_at\": \"2021-09-22T16:09:07.000Z\"\n      }\n  },\n  \"title\": \"Full Proposal:Innovation Packages\"\n}",
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
            "description": "<p>: Get InnovationPackages.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get InnovationPackages.\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/manage-plan/:initiativeId/:ubication/:stageId",
    "title": "Manage Plan and Risk - Request MPR",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetManagePlan",
    "group": "Proposal",
    "description": "<p>Shows Manage Plan and Risk</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/management-plan",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/management-plan"
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
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": {\n      \"managePlanData\": {\n          \"id\": 15,\n          \"initvStgId\": 44,\n          \"management_plan\": \"new plan\",\n          \"active\": 1,\n          \"created_at\": \"2021-11-17T21:15:38.000Z\",\n          \"updated_at\": \"2021-11-17T21:15:38.000Z\",\n          \"files\": [],\n          \"risk_assessment\": [\n              {\n                  \"id\": 4,\n                  \"risks_achieving_impact\": \"TEST TEST TEST\",\n                  \"description_risk\": \"TEST TEST\",\n                  \"likelihood\": 5,\n                  \"impact\": 1,\n                  \"risk_score\": 4,\n                  \"manage_plan_risk_id\": 15,\n                  \"active\": 1,\n                  \"opportinities\": [\n                      [\n                          {\n                              \"id\": 2,\n                              \"opportunities_description\": \"TEST\",\n                              \"risk_assessment_id\": 4,\n                              \"active\": 1\n                          }\n                      ]\n                  ]\n              }\n          ]\n      }\n  },\n  \"title\": \"Full Proposal: GET manage plan risk  and files.\"\n }",
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
            "description": "<p>: Get manage plan risk and files: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get manage plan risk and files: Full proposal\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "get",
    "url": "stages-control/proposal/policy-compliance/:initiativeId",
    "title": "Policy Compliance - Request PCO",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetPolicyCompliance",
    "group": "Proposal",
    "description": "<p>Shows Policy Compliance Oversight</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/10",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/10"
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"policyComplianceData\": {\n            \"id\": 3,\n            \"initvStgId\": 40,\n            \"research_governance_policy\": 1,\n            \"open_fair_data_policy\": 0,\n            \"open_fair_data_details\": \"Test 1 policy\",\n            \"active\": 1,\n            \"created_at\": \"2021-09-21T19:31:10.000Z\",\n            \"updated_at\": \"2021-09-21T19:31:10.000Z\"\n        }\n    },\n    \"title\": \"Full Proposal:policy compliance oversight\"\n}",
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
            "description": "<p>: Get policy compliance oversight.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get policy compliance oversight.\", error }",
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
    "title": "Work package - Request workpackage",
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"workpackage\": [\n            {\n                \"created_at\": \"2021-05-21T19:14:34.000Z\",\n                \"updated_at\": \"2021-05-21T19:14:34.000Z\",\n                \"id\": 41,\n                \"active\": 1,\n                \"name\": \"Market intelligence\",\n                \"acronym\": \"Work Package 1\",\n                \"results\": \"CGIAR GI initiatives and public and private sector partners collaboratively share, access and use a shared digital infrastructure for global and local market intelligence to build and prioritize investment cases, develop product profiles and address stage gate decision making.\",\n                \"pathway_content\": \"Design and implement market intelligence that characterizes current and future needs and perceptions of improved value across crops, varieties and traits in key regions. Approaches will consider priorities and needs of different actors (e.g., processors, seed businesses, consumers, women and men farmers) and potential mediating factors (e.g., policies, trade, technology, market structure, culture).\",\n                \"is_global\": null\n            }\n\n\t\t\t     ]\n    },\n    \"title\": \"Full Proposal: Workpackage.\"\n}",
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
    "title": "Work package - Request workpackage for id",
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
    "title": "Financial Resources - Create and update FR",
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
            "type": "String",
            "optional": false,
            "field": "sectionName",
            "description": "<p>'activity_breakdown'| 'geographic_breakdown.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "data: \n [\n    {\n        \"name\": \"Work package 1\",\n        \"active\": true,\n        \"col_name\": \"id\",\n        \"financial_type\": {sectionName},\n        \"financial_type_id\": {workpacgake.id},\n        \"table_name\": \"work_packages\",\n        \"id\": 25,\n        \"total\": 10,\n        \"valuesList\": {\n            \"2022\": \"1.00\",\n            \"2023\": \"2.00\",\n            \"2024\": \"7.00\"\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"financialResourcesData\": [\n            {\n                \"id\": 25,\n                \"initvStgId\": 60,\n                \"financial_type\": \"activity_breakdown\",\n                \"active\": 1,\n                \"created_at\": \"2021-12-01T02:28:21.000Z\",\n                \"updated_at\": \"2021-12-01T02:28:21.000Z\",\n                \"financial_type_id\": null,\n                \"table_name\": \"work_packages\",\n                \"col_name\": \"id\",\n                \"years\": \"2022;2023;2024\",\n                \"values_\": \"1.00;2.00;7.00\"\n            }\n        ]\n    },\n    \"title\": \"Full Proposal:financial resources.\"\n}",
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
    "title": "Human Resources - Create and update HR",
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
            "description": "<p>template Human Resources</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "initvTeam",
            "description": "<p>Initiative Team form</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "data: [\n{   \"id\":null,\n   \"gender_diversity_inclusion\": \"\",\n  \"capacity_development\": \"\",\n   \"active\": true,\n   \"section\":\"initiative-team\",\n   \"updateFiles\":[],\n   \"initvTeam\":[{\n      \"id\" : null,\n      \"category\": \"Research\",\n      \"area_expertise\": \"Research leadership and management\",\n      \"key_accountabilities\":\"Provide leadership\",\n      \"active\": true\n  }]\n}\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n  {\n \"response\": {\n     \"humanResources\": {\n         \"upsertedHumanResources\": {\n             \"id\": 1,\n             \"gender_diversity_inclusion\": \"\",\n             \"capacity_development\": \"\",\n             \"active\": true,\n             \"initvStgId\": 35,\n             \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n             \"created_at\": \"2021-09-20T19:43:28.000Z\"\n         },\n         \"upsertedFile\": {\n             \"id\": 72,\n             \"active\": true,\n             \"humanId\": 1,\n             \"section\": \"initiative-team\",\n             \"url\": \"http://localhost:3000/uploads/INIT-2/9.human-resources/stage-3/1632167008334-Book1.xlsx\",\n             \"name\": \"Book1.xlsx\",\n             \"updated_at\": \"2021-09-20T19:43:28.000Z\",\n             \"created_at\": \"2021-09-20T19:43:28.000Z\"\n         }\n     },\n     \"files\": [\n         {\n             \"fieldname\": \"file\",\n             \"originalname\": \"Book1.xlsx\",\n             \"encoding\": \"7bit\",\n             \"mimetype\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n             \"destination\": \"./public/uploads/INIT-2/9.human-resources/stage-3\",\n             \"filename\": \"1632167008334-Book1.xlsx\",\n             \"path\": \"public\\\\uploads\\\\INIT-2\\\\9.human-resources\\\\stage-3\\\\1632167008334-Book1.xlsx\",\n             \"size\": 22386\n         }\n     ]\n },\n \"initiativeTeam\": {\n         \"upsertedInitiativeTeam\": [\n             {\n                 \"id\": 4,\n                 \"category\": \"Research\",\n                 \"area_expertise\": \"Research leadership and management\",\n                 \"key_accountabilities\": \"Provide leadership\",\n                 \"human_resources_id\": 5,\n                 \"active\": true,\n                 \"updated_at\": \"2021-11-30T20:06:00.000Z\",\n                 \"created_at\": \"2021-11-30T20:06:00.000Z\"\n             }\n         ]\n     },\n \"title\": \"Full Proposal: Patch human resources.\"\n}",
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
    "url": "stages-control/proposal/impact-strategies/:initiativeId",
    "title": "Impact Strategies - Create and update",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchImpactStrategies",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/impact-strategies/2"
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
            "description": "<p>Id initiative.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator Impact Strategiese.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "challenge_priorization",
            "description": "<p>description challenge priorization.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "research_questions",
            "description": "<p>description research questions.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "component_work_package",
            "description": "<p>description component work package.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "performance_results",
            "description": "<p>description performance results.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "human_capacity",
            "description": "<p>description human capacity.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "impact_area_id",
            "description": "<p>impact area id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "impact_area_name",
            "description": "<p>impact area name.</p>"
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
            "field": "partners",
            "description": "<p>partners to updtate.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"id\": 1,\n    \"active\": true,\n    \"challenge_priorization\": \"Test challenge\",\n    \"research_questions\": \"\",\n    \"component_work_package\": \"\",\n    \"performance_results\": \"\",\n    \"human_capacity\": \"\",\n    \"impact_area_id\": 1,\n    \"impact_area_name\": \"Test impact Area\",\n    \"partners\": [\n        {\n            \"id\": null,\n            \"impact_strategies_id\": 1,\n            \"code\": 1,\n            \"name\": \"Wageningen University and Research Centre\",\n            \"tag_id\": 1,\n            \"institutionTypeId\":3,\n            \"institutionType\":\"CGIAR Center\",\n            \"active\": true\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"impactStrategies\": {\n            \"upsertedImpactStrategies\": {\n                \"created_at\": \"2021-09-21T21:13:33.000Z\",\n                \"updated_at\": \"2021-09-21T21:13:33.000Z\",\n                \"id\": 1,\n                \"initvStgId\": 35,\n                \"active\": true,\n                \"challenge_priorization\": \"Test challenge\",\n                \"research_questions\": \"\",\n                \"component_work_package\": \"\",\n                \"performance_results\": \"\",\n                \"human_capacity\": \"\",\n                \"impact_area_id\": 1,\n                \"impact_area_name\": \"Test impact Area\"\n            },\n            \"upsertedPartners\": {\n                \"id\": 1,\n                \"impact_strategies_id\": 1,\n                \"institutions_id\": 1,\n                \"institutions_name\": \"Wageningen University and Research Centre\",\n                \"tag_id\": 1,\n                \"institutionTypeId\": 3,\n                \"type_name\": \"CGIAR Center\",\n                \"active\": true,\n                \"updated_at\": \"2021-09-21T21:14:11.000Z\",\n                \"created_at\": \"2021-09-21T21:14:11.000Z\"\n            }\n        }\n    },\n    \"title\": \"Full Proposal: Patch Impact Strategies.\"\n}",
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
            "description": "<p>Upsert Impact Strategies: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert Impact Strategies: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/innovation-packages/:initiativeId/",
    "title": "Innovation Packages - Create and update IP",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchInnovationPackages",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/innovation-packages/2"
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
            "description": "<p>Id initiative.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator Policy Compliance.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key_principles",
            "description": "<p>description key principles.</p>"
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
          "content": "{\n \"id\": null,\n \"key_principles\": \"Test 1 policy\",\n \"active\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"response\": {\n      \"innovationPackages\": {\n          \"upsertedInnovationPackages\": {\n              \"id\": 1,\n              \"key_principles\": \"Test 1 innovation package\",\n              \"active\": true,\n              \"initvStgId\": 35,\n              \"updated_at\": \"2021-09-22T16:09:07.000Z\",\n              \"created_at\": \"2021-09-22T16:09:07.000Z\"\n          }\n      }\n  },\n  \"title\": \"Full Proposal: Innovation Packages.\"\n}",
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
            "description": "<p>Upsert Innovation Packages: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert Innovation Packages: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/melia/:initiativeId/",
    "title": "MELIA - Create and update MELIA",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchMELIA",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2"
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "initiativeId",
            "description": "<p>Id initiative.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "data: [\n   {\n       \"id\": null,\n       \"melia_plan\": \"new plan\",\n       \"active\": true,\n       \"result_framework\": {\n           \"result_framework_id\":1,\n           \"active\":true,\n           \"tableA\": {\n               \"impact_area\": [\n                   {\n                       \"impact_area_id\": 1,\n                       \"impact_area_name\": \"Nutrition, health and food security\",\n                       \"active\": true,\n                       \"impact_ara_indicators\": [\n                           {\n                               \"impact_indicator_id\": 1,\n                               \"impact_indicator_name\": \"#people benefiting from relevant CGIAR innovations\",\n                               \"active\": true,\n                           },\n                           {\n                               \"impact_indicator_id\": 2,\n                               \"impact_indicator_name\": \"#people meeting minimum dietary energy requirements\",\n                               \"active\": true,\n                           }\n                       ],\n                       \"global_targets\": [\n                           {\n                               \"global_target_id\": 1,\n                               \"global_target_name\": \"the 3 billion people who do not currently have access to safe and nutritious food.\",\n                               \"active\": true,\n                           }\n                       ],\n                       \"sdg_targets\": [\n                           {\n                               \"sdg_target_id\": 1,\n                               \"sdg_target_code\": \"1.1\",\n                               \"sdg_target\": \"By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day\",\n                               \"active\": true,\n                           }\n                       ]\n                   }\n               ]\n           },\n           \"tableB\": {\n               \"action_area\": [\n                   {\n                       \"action_area_id\": 1,\n                       \"action_area_name\": \"Systems Transformation\",\n                       \"active\": true,\n                       \"action_area_outcomes\": [\n                           {\n                               \"outcome_id\": 1,\n                               \"outocome_smo_code\": \"ST 1\",\n                               \"outcome_statement\": \"Farmers use technologies or practices that contribute to improved livelihoods, enhance environmental health and biodiversity, are apt in a context of climate change, and sustain natural resources.\",\n                               \"active\": true,\n                               \"outcomes_indicators\": [\n                                   {\n                                       \"outcome_indicator_id\": 1,\n                                       \"outocome_indicator_smo_code\": \"STi 1.1\",\n                                       \"outcome_indicator_statement\": \"Number of farmers using climate smart practices disaggregated by gender\",\n                                       \"active\": true,\n                                   }\n                               ]\n                           }\n                       ]\n                   }\n               ]\n           },\n           \"tableC\": {\n               \"init_wp_out_indicators\": [\n                   {\n                       \"init_wp_out_indicators_id\": 1,\n                       \"result_type\": \"Outcome\",\n                       \"result\": \"WP 1 Intermediate Outcome 1.1. Diverse users satisfactorily accessing disease-free, viable, documented germplasm\",\n                       \"is_global\": true,\n                       \"active\": true,\n                       \"indicators\": [\n                           {\n                               \"indicator_id\": 1,\n                               \"indicator_name\": \"At least 80% user survey responses satisfied or very satisfied\",\n                               \"unit_messurament\": \"Qualitative measure of satisfaction\",\n                               \"active\": true,\n                           },\n                           {\n                               \"indicator_id\": 2,\n                               \"indicator_name\": \"No. of external user requests annually by CGIAR genebanks\",\n                               \"unit_messurament\": \"Nos. of external requests according to specific categories (e.g. NARS. NGOs, Farmers, etc.)\",\n                               \"active\": true,\n                           }\n                       ],\n                       \"geo_scope\": {\n                           \"regions\": [\n                               {\n                                   \"id\":1,\n                                   \"active\":true,\n                                   \"region_id\":14,\n                                   \"region_name\":\"Eastern Africa\"\n\n                               }\n                           ],\n                           \"countries\": [\n                               {\n                                   \"id\":1,\n                                   \"active\":true,\n                                   \"country_id\":20,\n                                   \"country_name\":\"Andorra\"\n\n                               }\n                           ]\n                       },\n                       \"data_management\":[\n                           {\n                               \"id\":1,\n                               \"data_source\":\"Genebank users\",\n                               \"data_collection\":\"User surveys\",\n                               \"frequency_data_collection\":\"Ongoing\",\n                               \"active\":true,\n                           },\n                           {\n\n                               \"id\":2,\n                               \"data_source\":\"Annual reports on collection status gathered by Crop Trust/CGIAR.\",\n                               \"data_collection\":\"Online reporting tool\",\n                               \"frequency_data_collection\":\"Ongoing\",\n                               \"active\":true,\n\n                           }\n                       ],\n                       \"base_line\":[\n                           {\n                               \"id\":1,\n                               \"active\":true,\n                               \"base_line_value\":\"Customer satisfaction of 80% or higher\",\n                               \"base_line_year\":\"2017\"\n                           },\n                           {\n                               \"id\":2,\n                               \"active\":true,\n                               \"base_line_value\":\"601,811 accessions\",\n                               \"base_line_year\":\"2020\"\n\n                           }\n                       ],\n                       \"target\":[\n                           {\n                               \"id\":1,\n                               \"active\":true,\n                               \"target_value\":\"80% or higher\",\n                               \"target_year\":\"2024\"\n\n                           },\n                           {\n                               \"id\":2,\n                               \"active\":true,\n                               \"target_value\":\"650,000\",\n                               \"target_year\":\"2024\"\n\n                           }\n                       ]\n                   }\n               ]\n           }\n       },\n   }\n  ]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"melia\": {\n            \"upsertedMelia\": {\n                \"created_at\": \"2021-09-14T19:40:41.000Z\",\n                \"updated_at\": \"2021-09-14T19:40:41.000Z\",\n                \"id\": 5,\n                \"initvStgId\": 35,\n                \"melia_plan\": \"test melia 12\",\n                \"active\": true\n                \"result_framework\":{}\n            }\n        }\n    },\n    \"title\": \"Full Proposal: Patch melia.\"\n}",
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
            "description": "<p>Upsert melia: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert melia: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/manage-plan/:initiativeId/:ubication/:stageId",
    "title": "Manage Plan and Risk - Create and update MPR",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchManagePlan",
    "group": "Proposal",
    "description": "<p>Create and Update Melia</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/7.manage-plan/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/manage-plan/2/7.manage-plan/3"
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
            "description": "<p>identificator Manage Plan</p>"
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
            "description": "<p>template Manage Plan</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "riskAssessment",
            "description": "<p>Risk Assessment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"id\": null,\n   \"management_plan\": \"new plan\",\n   \"active\": true,\n   \"section\": \"management_plan\",\n   \"updateFiles\": [],\n   \"riskassessment\": [\n       {\n           \"id\": null,\n           \"risks_achieving_impact\": \"TEST TEST TEST\",\n           \"description_risk\": \"TEST TEST\",\n           \"likelihood\": 5,\n           \"impact\": 1,\n           \"risk_score\": 4,\n           \"active\": true,\n           \"manage_plan_risk_id\": null,\n           \"opportinities\": [\n               {\n                   \"id\": null,\n                   \"opportunities_description\": \"TEST\",\n                   \"risk_assessment_id\": null\n               }\n           ]\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n  \"response\": {\n      \"managePlanRisk\": {\n          \"upsertedManagePlan\": {\n              \"id\": 1,\n              \"management_plan\": \"new plan\",\n              \"active\": true,\n              \"initvStgId\": 35,\n              \"updated_at\": \"2021-09-20T20:03:51.000Z\",\n              \"created_at\": \"2021-09-20T20:03:51.000Z\"\n          },\n          \"upsertedFile\": {\n              \"id\": 73,\n              \"active\": true,\n              \"manage_plan_risk_id\": 1,\n              \"section\": \"management_plan\",\n              \"url\": \"http://localhost:3000/uploads/INIT-2/7.manage-plan/stage-3/1632168231799-Book1.xlsx\",\n              \"name\": \"Book1.xlsx\",\n              \"updated_at\": \"2021-09-20T20:03:51.000Z\",\n              \"created_at\": \"2021-09-20T20:03:51.000Z\"\n          }\n      },\n\"riskAssessment\": {\n          \"upsertedRiskAssessment\": [\n              {\n                  \"id\": 5,\n                  \"risks_achieving_impact\": \"TEST TEST TEST\",\n                  \"description_risk\": \"TEST TEST\",\n                  \"likelihood\": 5,\n                  \"impact\": 1,\n                  \"risk_score\": 4,\n                  \"active\": true,\n                  \"manage_plan_risk_id\": 16,\n                  \"updated_at\": \"2021-11-17T21:20:19.000Z\",\n                  \"created_at\": \"2021-11-17T21:20:19.000Z\",\n                  \"opportunities\": [\n                      {\n                          \"id\": 3,\n                          \"opportunities_description\": \"TEST\",\n                          \"risk_assessment_id\": 5,\n                          \"updated_at\": \"2021-11-17T21:20:19.000Z\",\n                          \"created_at\": \"2021-11-17T21:20:19.000Z\"\n                      }\n                  ]\n              }\n          ]\n      },\n      \"files\": [\n          {\n              \"fieldname\": \"file\",\n              \"originalname\": \"Book1.xlsx\",\n              \"encoding\": \"7bit\",\n              \"mimetype\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n              \"destination\": \"./public/uploads/INIT-2/7.manage-plan/stage-3\",\n              \"filename\": \"1632168231799-Book1.xlsx\",\n              \"path\": \"public\\\\uploads\\\\INIT-2\\\\7.manage-plan\\\\stage-3\\\\1632168231799-Book1.xlsx\",\n              \"size\": 22386\n          }\n      ]\n  },\n  \"title\": \"Full Proposal: Patch management plan and risk.\"\n  }",
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
            "description": "<p>Upsert management plan risk: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert management plan risk: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/policy-compliance/:initiativeId/",
    "title": "Policy Compliance - Create and update PCO",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchPolicyCompliance",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/policy-compliance/2"
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
            "description": "<p>Id initiative.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>identificator Policy Compliance.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "research_governance_policy",
            "description": "<p>Policy research governance.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "open_fair_data_policy",
            "description": "<p>Policy open fair data.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "open_fair_data_details",
            "description": "<p>description Open fair data.</p>"
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
          "content": "{\n \"id\": null,\n \"research_governance_policy\": true,\n \"open_fair_data_policy\": false,\n \"open_fair_data_details\": \"Test 1 policy\",\n \"active\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"response\": {\n        \"policyComplianceOversight\": {\n            \"upsertedPolicyCompliance\": {\n                \"id\": 3,\n                \"research_governance_policy\": true,\n                \"open_fair_data_policy\": false,\n                \"open_fair_data_details\": \"Test 1 policy\",\n                \"active\": true,\n                \"initvStgId\": 40,\n                \"updated_at\": \"2021-09-21T19:31:10.000Z\",\n                \"created_at\": \"2021-09-21T19:31:10.000Z\"\n            }\n        }\n    },\n    \"title\": \"Full Proposal: Patch policy compliance oversight.\"\n}",
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
            "description": "<p>Upsert policy compliance oversight: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert policy compliance oversight: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/toc/:initiativeId/",
    "title": "TOCS- Create and update TOC",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "PatchTOC",
    "group": "Proposal",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/toc/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/toc/2"
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
            "description": "<p>TOKEN</p>"
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
            "description": "<p>Id initiative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TocId",
            "description": "<p>identificator TOC.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "narrative",
            "description": "<p>description TOC.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "diagram",
            "description": "<p>url diagram.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "type",
            "description": "<p>0 is TOC into Work Package or 1 Full Initiative TOC.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "work_package",
            "description": "<p>acronym example WP1.</p>"
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
          "content": "[ {\n    \"id\": null,\n    \"tocId\": \"tsdgd9o3zc\",\n    \"narrative\":\"SeEdQUAL supports...\",\n    \"diagram\":\"https://dev-toc.s3.us-east-2.amazonaws.com/toc_tsdgd9o3zc/tsdgd9o3zc.png\",\n    \"type\": false,\n    \"work_package\":\"WP1\",\n    \"active\": true\n   },\n   {\n    \"id\": null,\n    \"tocId\": \"tsdgd9o4zc\",\n    \"narrative\":\"SeEdQUAL supports...\",\n    \"diagram\":\"https://dev-toc.s3.us-east-2.amazonaws.com/toc_tsdgd10o3zc/tsdgd10o3zc.png\",\n    \"type\": false,\n    \"work_package\":\"WP2\",\n    \"active\": true\n   },\n      {\n    \"id\": null,\n    \"tocId\": \"tsdgd9o5zc\",\n    \"narrative\":\"SeEdQUAL supports...\",\n    \"diagram\":\"https://dev-toc.s3.us-east-2.amazonaws.com/toc_tsdgd10o3zc/tsdgd10o3zc.png\",\n    \"type\": false,\n    \"work_package\":null,\n    \"active\": true\n   }\n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"response\": {\n        \"tocs\": {\n            \"savedToc\": [\n                {\n                    \"created_at\": \"2021-12-22T13:06:51.000Z\",\n                    \"updated_at\": \"2021-12-22T13:06:51.000Z\",\n                    \"id\": 3,\n                    \"narrative\": \"SeEdQUAL supports...\",\n                    \"diagram\": \"https://dev-toc.s3.us-east-2.amazonaws.com/toc_tsdgd9o3zc/tsdgd9o3zc.png\",\n                    \"type\": 1,\n                    \"active\": 1,\n                    \"toc_id\": \"tsdgd9o3zc\",\n                    \"initvStgId\": 33\n                }\n            ]\n        }\n    },\n    \"title\": \"Full Proposal:TOC\"\n}",
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
            "description": "<p>Upsert TOC: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\"name\": \"Upsert TOC: Full proposal\",\"httpCode\": 400,\"isOperational\": false}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  },
  {
    "type": "patch",
    "url": "stages-control/proposal/packages/:wrkPkgId",
    "title": "Work Package - Create and update WP",
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
  },
  {
    "type": "get",
    "url": "stages-control/proposal/melia/:initiativeId/:ubication/:stageId",
    "title": "MELIA - Request MELIA",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "getMELIA",
    "group": "Proposal",
    "description": "<p>Shows MELIA per initiativeId and section</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2/result_framework",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "https://initiativestest.ciat.cgiar.org/api/stages-control/proposal/melia/2/result_framework"
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"meliaData\": {\n            \"id\": 8,\n            \"initvStgId\": 44,\n            \"melia_plan\": \"test melia 14\",\n            \"active\": 1,\n            \"created_at\": \"2021-09-21T20:35:13.000Z\",\n            \"updated_at\": \"2021-09-21T20:35:13.000Z\",\n            \"files\": [\n                {\n                    \"id\": 85,\n                    \"tocsId\": null,\n                    \"url\": \"http://localhost:3000/uploads/INIT-14/6.melia/stage-3/1632256513858-depth_scale.xlsx\",\n                    \"name\": \"depth_scale.xlsx\",\n                    \"active\": 1,\n                    \"created_at\": \"2021-09-21T20:35:13.000Z\",\n                    \"updated_at\": \"2021-09-21T20:35:13.000Z\",\n                    \"meliaId\": 8,\n                    \"manage_plan_risk_id\": null,\n                    \"humanId\": null,\n                    \"financial_resources_id\": null,\n                    \"section\": \"result_framework\"\n                }\n            ]\n        }\n    },\n    \"title\": \"Full Proposal: melia and files.\"\n}",
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
            "description": "<p>: Get melia and files: Full proposal</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{ message: \"Get melia and files: Full proposal\", error }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/FullProposalRoutes.ts",
    "groupTitle": "Proposal"
  }
] });
