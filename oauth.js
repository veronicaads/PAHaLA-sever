var passport = require('passport');
var GoogleAuthCodeStrategy = require('passport-google-authcode').Strategy;
var express = require('express');
const app = express();
const port = 80;


passport.use(new GoogleAuthCodeStrategy({
		clientID: 925452584723-h8a5h2rsofo1m2rir104l0721n512u45.apps.googleusercontent.com
		clientSecret: dcd81sshe16tN9yVrsyFHYO7
		},
	function(accessToken, refreshToken,profile,done){
		User.findOrCreate({ googleId: profile.id },	
	function (err,user){
		return done(err,user);
	});
	}
	));

app.post('/auth/google/authcode', passport.authenticate('google-authcode'),
	function (req,res){
		consolde.log('sukses!');
		res.send(req.user? 200 : 401);
	}
);



	

