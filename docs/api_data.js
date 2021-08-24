define({ "api": [
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
        "content": "http://localhost:3000/api/initiatives/1/summary/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/1/summary/3"
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
        "content": "http://localhost:3000/api/initiatives/",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/"
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
          "content": "    HTTP/1.1 200 OK\n{\n    \"response\": {\n        \"initiatives\": [\n            {\n                \"initvStgId\": 35,\n                \"id\": 2,\n                \"name\": \"Accelerated Crop Improvement through Precision Genetic Technologies\",\n                \"status\": \"Editing\",\n                \"action_area_id\": \"1\",\n                \"action_area_description\": \"Systems Transformation\",\n                \"active\": 1,\n                \"stageId\": 3,\n                \"description\": \"Stage 3: Full Proposal\",\n                \"stages\": [\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 2,\n                        \"stageId\": 2,\n                        \"active\": 0\n                    },\n                    {\n                        \"id\": 2,\n                        \"initvStgId\": 35,\n                        \"stageId\": 3,\n                        \"active\": 1\n                    }\n                ]\n            }\n\t\t\t\n\t\t\t        ]\n    },\n    \"title\": \"All Initiatives.\"\n}",
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
        "content": "http://localhost:3000/api/initiatives/add-budget/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/add-budget/2/3"
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
        "content": "http://localhost:3000/api/initiatives/add-link/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/add-link/2/3"
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
        "content": "http://localhost:3000/api/initiatives/1/summary/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/1/summary/3"
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
        "content": "http://localhost:3000/api/initiatives/get-budget/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/get-budget/2/3"
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
        "content": "http://localhost:3000/api/initiatives/get-link/2/3",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/initiatives/get-link/2/3"
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
        "content": "http://localhost:3000/api/meta/menu/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/meta/menu/2"
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
    "url": "stages-control/proposal/packages/:initiativeId",
    "title": "Workpackage - Request workpackage",
    "version": "1.0.2",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetWorkPackage",
    "group": "Proposal",
    "description": "<p>Shows workpackage data from initiatives</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:3000/api/stages-control/proposal/packages/2",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/stages-control/proposal/packages/2"
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
  }
] });
