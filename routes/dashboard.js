const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../utils/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    let userTokenFind = getUserToken(req.headers['authorization'] || req.query['token'])

    if(!userTokenFind) return res.sendStatus(401)

    let user = await findUserByUsername(userTokenFind.username)

    if(user.privilege == "admin") {
      res.render('dashboard');
    }

  } catch (error) {
    console.log(error)
  }

  return res.sendStatus(401)
});

module.exports = router;