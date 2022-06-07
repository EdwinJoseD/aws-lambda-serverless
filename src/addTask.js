const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { tittle, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const newTask = {
    id,
    tittle,
    description,
    createdAt,
  };

  await dynamoDb
    .put({
      TableName: process.env.TASKS_TABLE,
      Item: newTask,
    })
    .promise(console.log(`Task ${id} added successfully`))
    .catch(console.error(`Error adding task ${id}`));

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};

module.exports = {
  addTask,
};
