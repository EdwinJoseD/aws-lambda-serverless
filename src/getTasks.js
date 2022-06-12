const AWS = require("aws-sdk");
require("dotenv").config();

const getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.TASKS_TABLE,
  };

  const tasks = await (await dynamodb.scan(params).promise()).Items;

  return {
    status: 200,
    body: { tasks },
  };
};

module.exports = {
  getTasks,
};
