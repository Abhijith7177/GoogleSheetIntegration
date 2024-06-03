// Imports
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('dotenv');
const crypto = require('crypto');
const User = require('../Models/userSchema');

// Config
env.config();

// JWT token generate
exports.generateToken = function (payload) {
   return JWT.sign(payload, process.env.JWT_SECRETKEY);
}

// Password encrypt
exports.passwordEncrypt = function (payload) {
   const salt = 10;
   return bcrypt.hashSync(payload, salt);
}

// Password decrypt
exports.passwordDecrypt = function (hashPassword, password) {
   return bcrypt.compareSync(password, hashPassword);
}

// Authentication Middleware
exports.authMiddleware = function (req, res, next) {
   const token = req.headers.authorization;
   if (token) {
      const isAuth = token.split(" ")[1];
      JWT.verify(isAuth, process.env.JWT_SECRETKEY, function (error, decoded) {
         if (error) {
            res.status(400).json({ Message: "Invaild token entered." })
         } else {
            req.user = decoded;
            next();
         }
      })
   } else {
      res.status(404).json({ Message: 'Authentication required.' })
   }
}


exports.generateTokenForSheet = (userId) => {
   const token = `${userId}-${Date.now()}`;
   const encryptedToken = crypto.createHash('sha256').update(token + process.env.JWT_SECRETKEY).digest('hex');
   return encryptedToken;
}



exports.verifyToken = async (req, res, next) => {
   const userToken = req.headers.authorization;

   try {
      if (userToken) {
         const isAuth = userToken.split(" ")[1];
         const user = await User.findOne({ accessSheetToken: isAuth });

         if (!user) {
            return res.status(404).json({ message: "Invalid access token sent." });
         } else if (user.accessSheetToken.toString() === isAuth.toString()) {
            next();
         } else {
            return res.status(403).json({ message: "Unauthorized. Token mismatch." });
         }
      } else {
         return res.status(400).json({ message: 'Access token required.' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
   }
}