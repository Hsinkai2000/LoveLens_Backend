const imageRoutes = (app) => {
    app.use('/api/image/upload', require('./upload'));
    app.use('/api/image/', require('./get'));
    app.use('/api/image/', require('./delete'))
};

module.exports = { imageRoutes };
