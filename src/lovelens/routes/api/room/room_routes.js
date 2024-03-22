const roomRoutes = (app) => {
    app.use('/api/room/', require('./create'));
    app.use('/api/room/', require('./get'));
};

module.exports = { roomRoutes };
