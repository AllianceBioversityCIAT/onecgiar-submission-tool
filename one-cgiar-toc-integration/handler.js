const serverless = require("serverless-http");
const app = require('./dist/function');

module.exports.handler = serverless(app);