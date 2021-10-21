const jwt = require("jsonwebtoken")
const config = require("config")

const auth =  (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).json({message : "Not authorized"})
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtsecret"))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg : "Token Invalid"})
        
    }

}

module.exports =  auth