const { Schema, mongoose } = require('mongoose');


const chatSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
      },
      post_text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
});

const Post = mongoose.model('Post', chatSchema);

module.exports = Post;