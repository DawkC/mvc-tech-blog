const router = require('express').Router()
const { User, Blog, Comment } = require('../../models')

// get all blogs
router.get('/', (req, res) => {
    Blog.findAll({
        order: [['created_at', 'DESC']],
        attribute: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'blog_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// get one blog
router.get('/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attribute: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'blog_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id!' })
            return
        }
        res.json(dbBlogData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create blog
router.post('/', (req, res) => {
    // expects { title: "happy days", content: "thoughts and feelings", username: "username"}
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// update blog
router.put('/:id', (req, res) => {
    Blog.update({
        title: req.body.title,
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id!' })
            return
        }
        res.json(dbBlogData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// delete blog
router.delete('/:id', (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id!' })
            return
        }
        res.json(dbBlogData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router