const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/verifyToken')

// CREATE POST
router.post("/create", verifyToken, async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            photo: req.body.photo,
            username: req.user.username,
            userId: req.user.id,
            categories: req.body.categories
        })

        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET POST BY ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json("Post not found!")
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET USER POSTS
router.get("/user/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE POST
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json("Post not found!")
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json("You can update only your posts!")
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json("Post not found!")
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json("You can delete only your posts!")
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Post has been deleted!")
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET POSTS BY CATEGORY
router.get("/category/:category", async (req, res) => {
    try {
        // Convert category to title case for consistent matching
        const category = req.params.category
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        const posts = await Post.find({
            categories: { 
                $in: [
                    category,
                    category.toLowerCase(),
                    category.toUpperCase()
                ]
            }
        }).sort({ createdAt: -1 });

        // Get unique categories for suggestions
        const allCategories = await Post.distinct('categories');
        const suggestedCategories = allCategories
            .filter(cat => cat.toLowerCase().includes(category.toLowerCase()))
            .slice(0, 5);

        res.status(200).json({
            posts,
            suggestedCategories: suggestedCategories.length > 0 ? suggestedCategories : null
        });
    } catch (err) {
        console.error('Category search error:', err);
        res.status(500).json({
            message: "Error searching posts by category",
            error: err.message
        });
    }
});

// GET ALL CATEGORIES
router.get("/categories/all", async (req, res) => {
    try {
        const categories = await Post.distinct('categories');
        res.status(200).json(categories);
    } catch (err) {
        console.error('Get categories error:', err);
        res.status(500).json({
            message: "Error fetching categories",
            error: err.message
        });
    }
});

module.exports = router 