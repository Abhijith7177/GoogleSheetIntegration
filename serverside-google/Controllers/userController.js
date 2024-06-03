const passport = require('passport');
const User = require('../Models/userSchema');
const _g = require('../Utils/GlobalFunctions');
const { googleAuthStrategy } = require('../Utils/GoogleAuth');

passport.use(googleAuthStrategy);

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password, googleId } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(403).json({ Message: "Email or Username already exists." });
        }

        if (googleId) {
            const user = await User.create({ username, email, googleId });
            return res.status(201).json({ Message: "User registered successfully.", user });
        } else {
            const hashPassword = await _g.passwordEncrypt(password);
            const user = await User.create({ username, email, password: hashPassword });
            return res.status(201).json({ Message: "User registered successfully.", user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Internal server issues." });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password, googleId } = req.body;
        let user;

        if (googleId) {
            user = await User.findOne({ googleId });
        } else {
            const username = email;
            user = await User.findOne({ $or: [{ email }, { username }] });
        }

        if (!user) {
            return res.status(404).json({ Message: "User not found." });
        }

        if (!googleId) {
            const validPassword = await _g.passwordDecrypt(user.password, password);
            if (!validPassword) {
                return res.status(400).json({ Message: "Entered password is incorrect." });
            }
        }

        const token = _g.generateToken(JSON.stringify(user));

        res.cookie('token', token, {
            maxAge: 3600000
        });


        return res.status(200).json({ Message: "Login successfully.", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Internal server issues." });
    }
};

