const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    post: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userInfo: Object
})

module.exports = model('Post', postSchema);