const express = require('express');
const router = express.Router();
const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByUsername } = require('../utils/db')

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/', authenticateToken, async (req, res) => {
    console.log("[POST] Home Create Dashboard Edit Menu")

    try {
        let userTokenFind = getUserToken(req.headers['authorization'] || req.query['token'])

        if(!userTokenFind) return res.sendStatus(401)

        let user = await findUserByUsername(userTokenFind.username)

        if(user.privilege == "admin") {
            return res.send(`<a class="nav-link" href="/dashboard?token=${req.headers['authorization']}"><i class="fas fa-code"></i></a>`)
        }

    } catch (error) {
        console.log(error)
    }
    
    return res.sendStatus(401)
});

module.exports = router;