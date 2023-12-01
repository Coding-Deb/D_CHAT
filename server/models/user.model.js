const { Schema, mongoose } = require('mongoose');


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgurl: { type: String, },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;