const lib            = require('./include.js');
const serviceAccount = require('./pahala-pervasive-firebase-adminsdk-tbi8j-447d5aa8f2.json');

lib.firebaseAdmin.initializeApp({
  credential: lib.firebaseAdmin.credential.cert({
    projectId  : serviceAccount['project_id'],
    clientEmail: serviceAccount['client_email'],
    privateKey : serviceAccount['private_key'],
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

exports.handleSignUp = async function(req, res) {
  if(uid = await lib.verifyToken(req,res)){
    lib.DB.one('SELECT signup_status FROM public.user WHERE uuid= $1', [uid]).then(data => {
      if (data.signup_status === 'f') {
        lib.firebaseAdmin.auth().getUser(uid).then(function(userRecord) {
          console.log("Successfully fetched user data:", userRecord.toJSON());
          var userData = userRecord.toJSON();
          var u        = [
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
          lib.DB.none('INSERT INTO public.user(gender,day_of_birth,title_name,nick_name,uuid,token,fullname,email,photoUrl) VALUES ($1,$2,$3,$4,S5,$6,$7,$8,$9,$10)',u)
          .then(()=>{
              lib.DB.none('UPDATE public.user SET signup_status = $1 WHERE uuid = $2',['t',uid])
              .then(()=>{lib.formatResponse(res, {status : 'OK'});})
              .catch(() => lib.formatResponse(res, {}, 401));
          }).catch(() => lib.formatResponse(res, {}, 401));
        }).catch(() => lib.formatResponse(res, {}, 400));                
      }}).catch(() => lib.formatResponse(res, {}, 400)); 
    }
  else lib.formatResponse(res, {}, 401);
}

exports.handleSetHeight = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    var height = req.body.height;
    lib.DB.none('UPDATE public.user SET height = $1 WHERE uuid = $2',[height,uid])
    .then(data => {
      console.log("update success");
      lib.formatResponse(res, {status: 'OK'});
    }).catch(() => lib.formatResponse(res, {}, 400));
  } else lib.formatResponse(res, {}, 401);
};

exports.handleGetData = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk status user verify");
    lib.DB.one('SELECT height,schedule FROM public.user WHERE uuid = $1', [uid])
    .then(data => lib.formatResponse(res, data))
    .catch(error => lib.formatResponse(res, {}, 400));
  } else lib.formatResponse(res, {}, 401);
};

exports.handleGetStatistik = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    var month = req.body.month;
    var year  = req.body.year;
    console.log("masuk status statistik verify",req.body);
    console.log(uid,month,year);
    lib.DB.any('SELECT sleep,wakeup,height,weight FROM public.statistik WHERE uuid = $1 AND extract(month from date_history) = $2 AND extract(year from date_history) = $3',[uid,month,year])
    .then(data => {
      console.log("select success");
      lib.formatResponse(res, data);})
    .catch(error => {lib.formatResponse(res, {}, 400)});

  } else lib.formatResponse(res, {}, 401);
};

exports.handleGetMonthYear = async function(req,res) {
  if(uid = await lib.verifyToken(req,res)){
    console.log("masuk bulan verify",req.body);
    lib.DB.one('SELECT MIN(EXTRACT(MONTH FROM date_history)) AS min_month,MIN(EXTRACT(YEAR FROM date_history)) AS min_year,MAX(EXTRACT(MONTH FROM date_history)) AS max_month,MAX(EXTRACT(YEAR FROM date_history)) AS max_year FROM public.statistik')
    .then(data => {
      console.log("select success");
      lib.formatResponse(res, data);})
    .catch(error => {lib.formatResponse(res, {}, 400)});
  } else lib.formatResponse(res, {}, 401);
};


exports.handleGetUser = function(req,res){
  listAllUsers();
}
