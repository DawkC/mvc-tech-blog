const router = require('express').Router()
const { User, Blog, Comment } = require('../models')

// find all blogs from logged in user
router.get('/', (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
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
        const blogs = dbBlogData.map(blog => blog.get({ plain: true}))
        res.render('dashboard', {
            blogs,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/edit/:id', (req, res) => {
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
        const blog = dbBlogData.get({ plain: true })
        res.render('edit-blog', {
            blog,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router