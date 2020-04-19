module.exports = function(fs) {

    // Returned object
    var result = {};

    // Directory listing utility function
    result.getDirs = require('./misc/list_directories.js')(fs);

    // Return results
    return result;

};
