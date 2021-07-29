/**
 * @api {post} initiatives/get-link/:initiativeId/:stageId Show all citations per initiative,stage and status
 * @apiVersion 1.0.1
 * @apiPermission all
 * @apiName PostCitations
 * @apiGroup Citations
 *
 * @apiHeader {Number} initiativeId Id initiative
 * @apiHeader {Number} stageId Id stage.
 * 
 * @apiParam {String} table_name table name - Metadata.
 * @apiParam {String} col_name column name - Metadata.
 * @apiParam {Boolean} active status.
 * 
 * 
 * @apiSuccess {Date} created_at Creation date.
 * @apiSuccess {Date} updated_at  Update date.
 * @apiSuccess {Number} id  citation id.
 * @apiSuccess {String} title  citation title.
 * @apiSuccess {String} link  citation link.
 * @apiSuccess {String} table_name Table to which the citation belongs.
 * @apiSuccess {String} col_name Colum to which the citation belongs.
 * @apiSuccess {Number} active status.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "response": {
 *       "getLinks": [
 *           {
 *               "created_at": "2021-07-28T02:27:29.000Z",
 *               "updated_at": "2021-07-28T02:27:29.000Z",
 *               "id": 6,
 *               "title": "test3",
 *               "link": "test3",
 *               "table_name": "context",
 *               "col_name": "priority_setting",
 *               "active": 0
 *           }
 *       ]
 *   },
 *   "title": "Initiatives:Get link."
 *  }
 *
 * @apiError Error PostCitations-Get link.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     { message: "Initiative not found in stage:", error }
 */