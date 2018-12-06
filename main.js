const lib     = require('./include.js');
const user    = require('./user.js');
const weather = require('./weather.js');
const quote   = require('./quote.js');
const news    = require('./news.js');
const menu    = require('./menu.js');
const lamp    = require('./lamp.js');
const sleep   = require('./sleep.js')

lib.APP.use(lib.bodyParser.json()); 
lib.APP.use(lib.bodyParser.urlencoded({extended: false}));

lib.APP.get ('/user'           , user.handleGetUser);
lib.APP.post('/user/fetch'     , user.handleSetToken);
lib.APP.post('/user/signup'    , user.handleSignUp);
lib.APP.post('/user/token_test', user.handleToken);
lib.APP.post('/weather'        , weather.handleGetWeather);
lib.APP.post('/quote'          , quote.handleGetQuote);
lib.APP.post('/news'           , news.handleGetNews);
lib.APP.post('/menu'           , menu.handleGetMenu);
lib.APP.post('/node/lamp'      , lamp.handleSetLampFlag);          // refactor done
lib.APP.post('/node/sleep'     , sleep.handleSetLampSleep);
lib.APP.listen(lib.PORT, () => console.log(`PAHaLA server is now listening on port ${lib.PORT}!`));
