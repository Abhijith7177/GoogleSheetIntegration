// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const passportSetup = require('./Utils/GoogleAuth');
const _g = require('./Utils/GlobalFunctions');
const cookieParser = require('cookie-parser');
const googleSheets = require('./Utils/GoogleSheet');

app.use(cookieParser());

// Configs
env.config();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


// Middlewares
app.use(express.json());



// Use cors middleware and allow requests from all origins
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(session({
  secret: 'your_secret_key_google%sdds32@3',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// DB connectivity
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected successfully...');
}).catch((err) => {
  console.log('DB connected with some issues..');
})

// Google authentication route
app.get('/auth/google',

  passport.authenticate('google', {
    scope: ['profile', 'email'], prompt: 'select_account',
  }));



app.get('/auth/google/callback',
  passport.authenticate('google'),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      const token = _g.generateToken(JSON.stringify(req.user));
      res.cookie('token', token, {
        // httpOnly: true,
        maxAge: 3600000
      });
      res.redirect('http://localhost:3000');

    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });



// Api
const userRouter = require('./Routers/userRouter');
const accessRouter = require('./Routers/accessRouter');
const sheetRouter = require('./Routers/sheetRouter');
const User = require('./Models/userSchema');

app.use('/api', userRouter);
app.use('/api', accessRouter);
app.use('/api', sheetRouter);

// Server listen port
app.listen(process.env.PORT, (() => {
  console.log(`Server connected with port : ${process.env.PORT}`);
}));
