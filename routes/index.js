module.exports = function(app, indexContext, defaultDest, getDirs) {

    // // // // // // // // // // // // // // //
    // // //       EXPRESS ROUTES       // // //
    // // // // // // // // // // // // // // //

    // Index Route
    app.get('/', function (req, res) {
        res.redirect(defaultDest);
    });

    // Home Route Middleware
    require('./home.js')(app, indexContext);

    // Games Route Middleware
    require('./games.js')(app, indexContext, getDirs);

    // 404 Route Middleware (MUST COME LAST)
    require('./404.js')(app, indexContext);

};
