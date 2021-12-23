/* eslint-disable func-names */
const mongoose = require('mongoose');
const shortid = require('shortid');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const talkSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },
    uuid: {
      type: String,
      trim: true,
      default: shortid.generate,
    },
    url: {
      type: String,
      trim: true,
      default: uuidv4,
    },
    creator: {
      type: Object,
      required: true,
    },
    attandees: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('talk', talkSchema);
