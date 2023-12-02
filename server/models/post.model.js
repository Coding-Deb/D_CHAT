const { Schema, mongoose } = require('mongoose');


const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
      },
      postText: {
        type: String,
        required: true,
      },
      // post_img_url:{
      //   type: String,
      // },
      timestamp: {
        type: Date,
        default: Date.now,
      },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;