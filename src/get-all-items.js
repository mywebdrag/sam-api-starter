const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;
const rh  = (process.env.TEST_RUN) ? require('../clients/response-handler') : require('/opt/response-handler');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.getAllItemsHandler = async (event, context) => {
  var params = {
    TableName: tableName
  };

  try {
    const data = await docClient.scan(params).promise();
    const items = data.Items;
    return rh.success(items);
  } catch (err) {
    return rh.fail(err)
  }
}