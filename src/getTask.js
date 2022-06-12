const AWS = require("aws-sdk");
require("dotenv").config();

const getTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const params = {
    TableName: process.env.TASKS_TABLE,
    Key: {
      id,
    },
  };

  const task = await (await dynamodb.get(params).promise()).Item;

  return {
    status: 200,
    body: task,
  };
};

module.exports = {
  getTask,
};
