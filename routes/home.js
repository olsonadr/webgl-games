module.exports = function (app, context) {

    app.get('/home', function (req, res) {
        context.siteTitle = "Home";
        res.render('home', context);
        context.initMessage = "";
    });

}