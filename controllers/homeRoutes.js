const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth');

// Serve up existing posts on homepage before user login, make 
// sure to include associated name from user model
router.get('/', async (req,res) => {
  try{
    const postData = await Posts.findAll({
      include: [{
        model: User,
        attributes: ['name'],
      }],
    });
    const posts = postData.map((post) => post.get({plain:true}));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  }catch(err) {
    res.status(500).json(err);
  }
});

// Render the specific post based on it's id, make sure to include
// the name data from the User model
router.get('/post/:id', async (req,res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['name'],
      }],
    });

    const post = postData.get({plain:true});

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
    
  }catch(err) {
    res.status(500).json(err);
  }
});

// Only render dashboard page if user is logged in using withAuth middleware
router.get('/dashboard', withAuth, async (req,res) => {
  try {
    // Find the user info based on login info provided by user
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{model: Posts}],
    });

    const user = userData.get({plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true
    });

  }catch(err){
    res.status(500).json(err);
  }
});

// Redirect to homepage when user is already logged in
router.get('/login', (req,res) => {
  if(req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

