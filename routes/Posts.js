const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const NewPost = require('../models/Posts');
const auth = require('../middlewares/auth')
const users = require('../models/users')


// @route    POST pan/amount/add
// @desc     Create a Payment
// @access   Private
router.post(
    '/newpost',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('textarea', 'Textarea is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        try {
            const user = await users.findById(req.user.id).select('-password');
            const { title, textarea } = req.body;
            const newPost = new NewPost({
                title,
                textarea,
                username: user.username,
                image: user.image,
                postBy: req.user.id
            });
            await newPost.save().then(resPost => {
                res.json({ resPost, msg: 'Post add Successfull' })
            })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET /post/:id
// @desc    Get Post by id
// @access  Public
router.get('/post/:id', async (req, res) => {
    try {
        const post = await NewPost.findById(req.params.id);
        /* // Check for Object id format and pan */
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
            return res.status(404).send({ msg: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// @route    GET /allposts
// @desc     Get all Posts
// @access   Public
router.get('/allposts', async (req, res) => {
    try {
        const allPosts = await NewPost.find().sort({ data: -1 })
            .populate("postBy", "_id username")
        res.json(allPosts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
});

// @route   GET /mypost/user
// @desc    Get user post
// @access  Private
router.get('/mypost/user', auth, async (req, res) => {
    try {
        await NewPost.find({ postBy: req.user.id })
            .populate('postBy', 'title textarea')
            .then(myPost => {
                res.json({ myPost })
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server Error')
    }
})


// @route    POST api/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('comment', 'Comment is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await users.findById(req.user.id).select('-password');
            const post = await NewPost.findById(req.params.id);
            const newComment = {
                comment: req.body.comment,
                name: user.name,
                image: user.image,
                user: req.user.id
            };
            post.comment.unshift(newComment);
            await post.save();
            res.json(post.comment);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    PUT api/posts / like /: id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await NewPost.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
