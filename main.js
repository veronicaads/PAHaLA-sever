const lib     = require('./include.js');
const user    = require('./user.js');
const weather = require('./weather.js');
const quote   = require('./quote.js');
const news    = require('./news.js');
const menu    = require('./menu.js');
const lamp    = require('./lamp.js');
const sleep   = require('./sleep.js')
const alarm   = require('./alarm.js')
const scale   = require('./scale.js');
const theday  = require('./theday.js');

lib.APP.use (lib.bodyParser.json()); 
lib.APP.use (lib.bodyParser.urlencoded({extended: false}));
lib.APP.post('/user/wakeup'    , scale.handleSetScale);5566
lib.APP.post('/user/height'    , user.handleSetHeight);
lib.APP.post('/user/data'      , user.handleGetData);
lib.APP.post('/user/statistics', user.handleGetStatistik);
lib.APP.post('/user/availstats', user.handleGetMonthYear);
lib.APP.post('/user/nextalarm' , theday.handleGetNextAlarm);
lib.APP.post('/user/signup'    , user.handleSignUp);
lib.APP.post('/user/alarm'     , alarm.handleSetAlarm);
lib.APP.post('/weather'        , weather.handleGetWeather);
lib.APP.post('/quote'          , quote.handleGetQuote);
lib.APP.post('/news'           , news.handleGetNews);
lib.APP.post('/menu'           , menu.handleGetMenu);
lib.APP.post('/node/lamp'      , lamp.handleSetLampFlag);
lib.APP.post('/user/lamp'      , lamp.handleGetLampFlag);
lib.APP.post('/node/sleep'     , sleep.handleSetLampSleep);
lib.APP.listen(lib.PORT, () => console.log(`PAHaLA server is now listening on port ${lib.PORT}!`));
