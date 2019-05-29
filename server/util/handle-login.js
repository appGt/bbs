const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        resp.session.user = {
          accessToken: resp.body.accessToken,
          loginName: resp.data.loginname,
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
