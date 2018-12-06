const lib = require('./include.js');

// var admin = require('firebase-admin');
const serviceAccount = require('./pahala-pervasive-firebase-adminsdk-tbi8j-447d5aa8f2.json');
// const pgp = require("pg-promise")();
// const cn = {
// 	host: 'localhost',
//         port: 5432,
//         database: 'pahaladb',
//         user: 'postgres',
//         password: ''
// };
// const db = pgp(cn);

// var str2json = require('string-to-json');

lib.firebaseAdmin.initializeApp({
  credential: lib.firebaseAdmin.credential.cert({
    projectId: serviceAccount['project_id'],
    clientEmail: serviceAccount['client_email'],
    privateKey: serviceAccount['private_key'],
  })
});

function listAllUsers(nextPageToken) {
  lib.firebaseAdmin.auth().listUsers(1000, nextPageToken)
  .then(function(listUsersResult) {
    listUsersResult.users.forEach(function(userRecord) {
      console.log("user", userRecord.toJSON());
    });
    if (listUsersResult.pageToken) listAllUsers(listUsersResult.pageToken);
  }).catch(lib.errs);
}

exports.handleSignUp =function(req, res) {
  var idToken = req.body.idToken;
  lib.firebaseAdmin.auth().verifyIdToken(idToken).then(function(decodedToken) {
    var uid = decodedToken.uid;
    lib.DB.one('SELECT uuid FROM public.temp_user WHERE uuid= $1 AND status = $2',[uid,0]).then(data => {
      if (data.rowCount > 0){
        lib.firebaseAdmin.auth().getUser(uid).then(function(userRecord) {
          console.log("Successfully fetched user data:", userRecord.toJSON());
          var userData = userRecord.toJSON();
          var u = [
            req.body.height,
            req.body.gender,
            req.body.dateofbirth,
            req.body.title,
            req.body.nick_name,
            uid,
            idToken,
            lib.jsonPath.query(data,'$.displayName'),
            lib.jsonPath.query(data,'$.email'),
            lib.jsonPath.query(data,'$.photoURL'),
          ];
          lib.DB.none('INSERT INTO public.user(height,gender,day_of_birth,title_name,nick_name,uuid,token,fullname,email,photoUrl) VALUES ($1,$2,$3,$4,S5,$6,$7,$8,$9,$10)',u)
          .then(()=>{
            res.status(201);
            lib.DB.tx(t => t.batch([ t.none('UPDATE public.temp_user SET status = $1 WHERE uid = $2',1,uid) ]))
            .then(() => res.status(201)).catch(() => res.status(401));
          }).catch(() => res.status(401));
        }).catch(() => res.status(400));
      }
    })
  }).catch(() => res.status(400));
}

exports.handleSetToken = function(req, res) {
  var uid = req.body.uid;
  lib.firebaseAdmin.auth().createCustomToken(uid).then(function(customToken) {
    db.one('SELECT uuid FROM public.temp_user WHERE uuid = $1 and status = $2',[uid,'1'])
    .then(data=> {
      var token = str2json.convert({"token":customToken});
      db.tx(t => t.batch([ t.none('UPDATE public.user SET token = $1 WHERE uuid = $2',customToken,uid) ]))
      .then(() => { res.status(201).send(token); })
      .catch(error => { res.status(401); console.log('ERROR:', error); });
    }).catch(function(error){
      console.log(error, customToken);
      lib.DB.none('INSERT INTO public.temp_user(uuid,token,status) VALUES ($1,$2,$3)',[uid,customToken,'0']).then(() => {
        console.log("berhasil masuk");
        var token = lib.stringToJson.convert({"token":customToken});
        res.status(303).send(token);
        //res.status(201).send("status sign up not yet complete");
      }).catch(() => res.status(401));
    })
  }).catch(lib.errs);
}

exports.handleToken = function(req, res) {
  var idToken = req.body.idToken;
  lib.firebaseAdmin.auth().verifyIdToken(idToken).then(function(decodedToken) {
    var uid = decodedToken.uid;
    console.log(uid);
  }).catch(lib.errs);
}

exports.handleGetUser = function(req,res){
  listAllUsers();
}
