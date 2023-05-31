const { default: mongoose, Schema } = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    comment: {
      type: String,
      maxLength: 50,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
