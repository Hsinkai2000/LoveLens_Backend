const imageRoutes = (app) => {
    app.use('/api/image/upload', require('./upload'));
    app.use('/api/image/', require('./get'));
};

module.exports = { imageRoutes };
