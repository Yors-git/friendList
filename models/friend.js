const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      required: false
    },
    gender: {
      type: String,
      required: true
    },
    marital: {
      type: Boolean,
      required: true,
      default: false
    },
    phone1: {
      type: Number,
      required: true
    },
    phone2: {
      type: Number,
      required: false
    },
    phone3: {
      type: Number,
      required: false
    },
    phoneType1: {
      type: String,
      required: true
    },
    phoneType2: {
      type: String,
      required: false
    },
    phoneType3: {
      type: String,
      required: false
    },
})

module.exports = mongoose.model('Friend', friendSchema)