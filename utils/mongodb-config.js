/* eslint-disable no-console */
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/futureafrica', options);
    console.log(':::> Connected to MongoDB database');
  } catch (error) {
    console.log("<::: Couldn't connect to database ", error);
  }
};
