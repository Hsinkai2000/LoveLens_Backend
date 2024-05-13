const roomRoutes = (app) => {
    app.use('/api/room/', require('./create'));
    app.use('/api/room/', require('./get'));
    app.use('/api/room/', require('./delete'));
};

module.exports = { roomRoutes };
