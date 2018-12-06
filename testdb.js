const pgp = require('pg-promise')(); const express = require('express'); const port = 1900; const app = 
express(); const cn = {
    host: 'localhost',
    port: 5432,
    database: 'pahaladb',
    user: 'postgres',
    password: ''
};
const db = pgp(cn); app.get('/database',function(req,res){
    db.one('SELECT * FROM public.user')
    .then(user => {
        console.log(user); // print user name;
        res.send(user);
    })
    .catch(error => {
        console.log(error); // print the error;
    });
    }
); app.get('/database/inner',function(req,res){
    db.one('SELECT first_name FROM public.user')
    .then(user => {
        console.log(user); // print user name;
        res.send(user);
    })
    .catch(error => {
        console.log(error); // print the error;
    });
    }
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
