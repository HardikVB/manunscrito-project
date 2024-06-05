const express = require('express');
const router = express.Router();

const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByEmail } = require('../utils/db')

router.get('/', authenticateToken, async (req, res) => {
  try {
    let userTokenFind = getUserToken(req.headers['authorization'] || req.query['token'])

    if(!userTokenFind) return res.sendStatus(401)

    let user = await findUserByEmail(userTokenFind.email)

    if(user.privilege == "admin") {
      res.render('dashboard');
    }

  } catch (error) {
    console.log(error)
  }

  return
});

/**
 * Verify if user is admin and if it is it will provide a button for accessing the dashboard
 */
router.post('/verify', authenticateToken, async (req, res) => {
  console.log("[POST] Verify Admin Privilage Dashboard")

  try {
      let userTokenFind = getUserToken(req.headers['authorization'] || req.query['token'])

      if(!userTokenFind) return res.sendStatus(401)

      let user = await findUserByEmail(userTokenFind.email)

      if(user.privilege == "admin") {
        return res.send(`<a class="nav-link" href="/dashboard?token=${req.headers['authorization']}"><i class="fas fa-code"></i></a>`)
      }

  } catch (error) {
      console.log(error)
  }
  
  return res.sendStatus(401)
});
 
module.exports = router;