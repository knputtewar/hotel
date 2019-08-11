const express = require('express');
const db = require('./db');
const utils =  require('./utils')
const multer = require('multer');
const upload = multer({dest: 'images/'});

const router = express.Router();

router.get('/room', (request, response) => {
    const connection = db.connect();
    const statement = `select roomno, roomtype, price, status, imagename from Room`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});

router.get('/room/:roomno', (request, response) => {
    const roomno = request.params.roomno;
    const connection = db.connect();
    const statement = `select roomno, roomtype, price, status, imagename from Room where roomno = ${roomno}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result[1]));
    })
});

router.post('/room', upload.single('imagename'), (request, response) => {
    const {roomno,roomtype, price, status} = request.body;
    console.log(request.body);
    
    const connection = db.connect();
    
    const statement = `insert into Room(roomno, roomtype, price, status, imagename) values (${roomno}, '${roomtype}', ${price}, '${status}', '${request.file.filename}')`;
    connection.query(statement, (error, result) => {
        connection.end();
        console.log(result);
        response.send(utils.createResponse(error, result));
    })
});

router.put('/room/:roomno', (request, response) => {
    const roomno = request.params.roomno;
    const {roomtype, price, status, imagename} = request.body;
    const connection = db.connect();
    const statement = `update Room
        set
            roomtype = '${roomtype}',
            price = ${price},
            status = '${status}',
            imagename = '${imagename}'
         where roomno = ${roomno}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});

router.delete('/room/:roomno', (request, response) => {
    const roomno = request.params.roomno;
    const connection = db.connect();
    const statement = `delete from Room where roomno = ${roomno}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});


module.exports = router;
