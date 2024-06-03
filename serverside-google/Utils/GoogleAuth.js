const passport = require('passport');
const env = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const _g = require('./GlobalFunctions');

const User = require('../Models/userSchema');
env.config();

const googleAuthStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await User.create({ googleId: profile.id, email: profile.emails[0].value, isLoggedIn: true });
            } else {
                user.googleId = profile.id;
                user.isLoggedIn = true;
                await user.save();
            }
            const token = _g.generateToken(JSON.stringify(user));
            return cb(null, user);
        } catch (err) {
            return cb(err, null);
        }
    });

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});


module.exports = {
    googleAuthStrategy
};
