module.exports = function (fs) {

    var getDirs = function(rootDir) {
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
                            return dirs;
                        }
                    }.bind({index: index, file: file}));
                }
            }
        });
    }

    return getDirs;

}
