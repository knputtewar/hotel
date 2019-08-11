const express = require('express');
const bodyParser = require('body-parser');
const roomRouter = require('./room');
const userRouter = require('./user');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('images'));

app.use(roomRouter);
app.use(userRouter);


app.listen(3000, '0.0.0.0', () => {
    console.log(`Server started on 3000`);
});