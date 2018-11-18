const express = require('express');
const port = 5000;
const app = express();
const news = require("./getnews.js");

app.get('/news',news.handleGetNews);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
