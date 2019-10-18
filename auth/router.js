const {
    Router
} = require('express')
const {
    toJWT,
    toData
} = require('./jwt')

const router = new Router()

// define endpoints here
router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }

    // normally we would check the password and find the correct user in the database
    res.send({
        jwt: toJWT({
            userId: 1
        })
    })
})

module.exports = router