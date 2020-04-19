// Checks the provided gamesDir for games not listed in the json file at jsonPath,
//      returning array of objects of new and stored games

module.exports = function(fs, gamesDir, jsonPath) {


    var current = {games: []};
    // var dirs = [];

    if (fs.existsSync(jsonPath)) {
        current = JSON.parse(fs.readFileSync(jsonPath));
    }

    fs.readdirSync(gamesDir)
        .filter(fileName => (fileName[0] !== '.'))
        .forEach((found) => {
            var unique = true;
            current.games.forEach(curr => {
                if (curr.gameTitle === found) {
                    unique = false;
                }
            });

            if (unique === true) {
                console.log(`~= Registering new game ${found}`);
                current.games.push({
                    gameTitle: found,
                    gameDirName: found
                });
            }
        });

    // fs.readdir(gamesDir, function (err, files) {
    //     for (var index = 0; index < files.length; ++index) {
    //         var file = files[index];
    //         if (file[0] !== '.') {
    //             var filePath = gamesDir + '/' + file;
    //             fs.stat(filePath, function (err, stat) {
    //                 if (stat.isDirectory()) {
    //                     dirs.push(this.file);
    //                 }
    //                 if (files.length === (this.index + 1)) {
    //                     return dirs;
    //                 }
    //             }.bind({
    //                 index: index,
    //                 file: file
    //             }));
    //         }
    //     }
    // });

    // dirs.forEach(found => {
    //     var unique = true;

    //     current.games.forEach(curr => {
    //         if (curr.gameTitle === found) {
    //             unique = false;
    //         }
    //     });

    //     if (unique === true) {
    //         console.log(`~= Registering new game \'{}\'`, found);
    //         current.games.push({
    //             gameTitle: found,
    //             gameDirName: found
    //         });
    //     }
    // });

    fs.writeFileSync(jsonPath, JSON.stringify(current));

    return current.games;
}