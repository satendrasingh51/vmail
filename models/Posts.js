const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const NewPostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    textarea: {
        type: String
    },
    image: {
        type: String
    },
    postBy: {
        type: ObjectId,
        ref: 'users'
    },
    comment: [
        {
            user: {
                type: ObjectId,
                ref: 'users'
            },
            comment: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            image: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    user: {
                        type: ObjectId,
                        ref: 'users'
                    }
                }
            ],
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = NewPost = mongoose.model('newpost', NewPostSchema);
