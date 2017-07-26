const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentModel = new Schema({
  edit: [{
    text: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      default: new Date()
    }
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Comment', CommentModel)
