var express = require('express');
var indexRouter = require('./api/index');
var usersRouter = require('./api/users.js');
var loginRouter = require('./api/login.js');
var { roomRoutes } = require('./api/room/room_routes.js');
const { imageRoutes } = require('./api/image/image_routes.js');

const setRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/api/login', require('./api/login.js'));
    imageRoutes(app);
    roomRoutes(app);
};

module.exports = { setRoutes };
