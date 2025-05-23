const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json("You are not authenticated!")
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json("Token is not valid!")
    }
}

module.exports = verifyToken 