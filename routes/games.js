module.exports = function(app, context, getDirs) {

    var fs = require('fs');

    var dirsdirs = function(rootDir, cb) {
      fs.readdir(rootDir, function(err, files) {
          var dirs = [];
          for (var index = 0; index < files.length; ++index) {
              var file = files[index];
              if (file[0] !== '.') {
                  var filePath = rootDir + '/' + file;
                  fs.stat(filePath, function(err, stat) {
                      if (stat.isDirectory()) {
                          dirs.push(this.file);
                      }
                      if (files.length === (this.index + 1)) {
                          return cb(dirs);
                      }
                  }.bind({index: index, file: file}));
              }
          }
      });
    }

    // All Games Route Middleware
    app.get('/games', function(req, res) {

        // fill context
        // context.gameData = [];
        context.siteTitle = "All Games";
        // dirsdirs("./public/games", function(dirs) {
        //     dirs.forEach(function(dirName) {
        //         var data = {};
        //         data.gameDirName = dirName;
        //         data.gameTitle = dirName;
        //         context.gameData.push(data);
        //     });
        // });
        // console.log(getDirs("../public/games"));
        // getDirs("../public/games/").then(function(dirs) {
        //     dirs.forEach(function(dirName) {
        //         var data = {};
        //         data.gameDirName = dirName;
        //         data.gameTitle = dirName;
        //         context.gameData.push(data);
        //     });
        // });

        // render
        res.render('games', context);
        context.initMessage = "";
        return;

    });

    // Specifc Game Route Middleware
    app.get(/^\/games\/(.*)/, function(req, res) {

        // fill context
        var copy = {};
        Object.assign(copy, context);
        copy.gameData = [];
        copy.siteTitle = req.params[0].slice(0,-1);
        var data = {};
        data.gameDirName = req.params[0];
        data.gameTitle = req.params[0].slice(0,-1);
        copy.gameData.push(data);

        // render
        res.render('games', copy);
        copy.initMessage = "";
        return;

    });


};
