const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth')


//We'll hardcode the loggedIn property as true on this route, because
// a user won't even be able to get to the dashboard page unless they're logged in
//adding the withAuth here will redirect you to login
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/id:', withAuth, (req, res) => {
    const post = dbPostData.get({ plain: true });

    res.render('edit-post', {
        post,
        loggedIn: true
    });
});

module.exports = router;