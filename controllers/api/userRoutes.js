const router = require('express').Router();
const { User } = require('../../models');

// Will create new user and log them in
router.post('/', async (req,res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;

      res.status(200).json(userData);
  });
  } catch(err) {
    res.status(400).json(err);
  }
});

// Login route will validate username and password and log user in and
// give them an error if their login info is incorrect
router.post('/login', async (req,res) => {
  try {
    const userData = await User.findOne({ 
      where: {
        username: req.body.name,
      },
    });

    if (!userData){
      res
        .status(400)
        .json({message: 'Incorrect username or password, please try again.'});
        return;
    }

    const validPassword =  userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({message: 'Incorrect username or password, please try again.'});
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;

      res.json({userData, message: 'Successfully logged in!'});
    });
  } catch(err) {
    res.status(400).json({message: 'No account under this username!'});
  }
});

// If user is logged in, log them out
router.post('/logout', (req,res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;