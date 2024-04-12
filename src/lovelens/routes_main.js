var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.js');
var loginRouter = require('./routes/api/login.js');
var { roomRoutes } = require('./routes/api/room/room_routes.js');
const { imageRoutes } = require('./routes/api/image/image_routes.js');

const setRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/api/login', require('./routes/api/login.js'));
    imageRoutes(app);
    roomRoutes(app);
};

module.exports = { setRoutes };
