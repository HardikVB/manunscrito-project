const express = require('express');
const router = express.Router();

const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByEmail } = require('../utils/db')


router.get('/', (req, res) => {
  res.render('store');
});

router.post('/verify', authenticateToken, async (req, res) => {
  console.log(`[POST] Verify Admin Privilage Store`)
  try {
    let userTokenFind = getUserToken(req.headers['authorization'] || req.query['token'])

    if(!userTokenFind) return res.sendStatus(401)

    let user = await findUserByEmail(userTokenFind.email)

    if(user.privilege == "admin") {
      return res.send(`<div class="col-lg-4"><div class="custom-card add-product"><h1>+</h1><h5>Adicionar Produto</h5></div></div>`)
    }

} catch (error) {
    console.log(error)
}
})

module.exports = router
