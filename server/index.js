const app = require("express")();
const bodyParser = require('body-parser');
const router = require('./routes/http');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redis = require('socket.io-redis')({host: 'localhost', port: '6379'});
const emitter = require('socket.io-emitter')({host: '127.0.0.1', port: '6379'});

//DB Connection
mongoose.connect('mongodb://localhost/omingle', {useNewUrlParser: true})
    .then(() => console.log('Connection To DB Successful'))
    .catch(err => console.log(err));

http.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`);
});

app.use(bodyParser.urlencoded({extended: true}));

//Transport Layer
app.use('/', function (req, res, next) {
    req.io = io;
    next();
}, router);
const websockets = require('./routes/websocket')(io, redis, emitter);
