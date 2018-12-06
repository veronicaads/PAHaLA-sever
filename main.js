const lib     = require('./include.js');
const user    = require('./user.js');
const weather = require('./weather.js');
const quote   = require('./quote.js');
const news    = require('./news.js');
const menu    = require('./menu.js');
const test    = require('./test.js');

lib.APP.use(lib.bodyParser.json()); 
lib.APP.use(lib.bodyParser.urlencoded({extended: false}));

lib.APP.get ('/user'           , user.handleGetUser);
lib.APP.post('/user/fetch'     , user.handleSetToken);
lib.APP.post('/user/signup'    , user.handleSignUp);
lib.APP.post('/user/token_test', user.handleToken);
lib.APP.post('/weather'        , weather.handleGetWeather); // refactor done
lib.APP.get ('/quote'          , quote.handleGetQuote);     // refactor done
lib.APP.get ('/news'           , news.handleGetNews);       // refactor done
lib.APP.get ('/menu'           , menu.handleGetMenu);       // refactor done
lib.APP.post('/test'           , test.handleTest);          // refactor done

lib.APP.listen(lib.PORT, () => console.log(`PAHaLA server is now listening on port ${lib.PORT}!`));
