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
            likes: [
                {
                    user: {
                        type: ObjectId,
                        ref: 'users'
                    }
                }
            ],
            image: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = NewPost = mongoose.model('newpost', NewPostSchema);
