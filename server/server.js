

// // // // // // // // // // // // // // //
// // //        DEPENDENCIES        // // //
// // // // // // // // // // // // // // //

// External Requirements
var express      = require('express');
var hb           = require('express-handlebars');
var path         = require('path');
var bodyParser   = require('body-parser');
var fs           = require('fs');

// Create Express app
var app	         = express();

// Futher Requirements
var http         = require('http').Server(app);



// // // // // // // // // // // // // // //
// // //     PROGRAM PARAMETERS     // // //
// // // // // // // // // // // // // // //

// Express public directory for static delivery
const publicDir = path.join(__dirname, '../public');

// Port on which to listen for connections
const port = process.env.PORT || 3000;

// Default destination on site load
const defaultDest = "/home";

// Games json path
const jsonPath = path.join(__dirname, '../games.json');

// Games directory path
const gamesDir = path.join(publicDir, 'games');

// Handlebars context for html rendering
var indexContext = {
    helpers: { // handlebars helper functions
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        headerDropdownModeCheck: function(mode, required) {
            return (required == 'any') || (mode == required);
        }
    },
    gameData: require(path.join(__dirname, '../utils/detect_games.js'))(fs, gamesDir, jsonPath),//[],
    headerDropdownMenus: [ // dropdown menus in the header element
        // {
        //     id: "links-menu",
        //     iconSource: "/img/menu_icon.png",
        //     items: [ {label: "Posts",   href: "/posts",   mode: "any"},
        //              {label: "Search",  href: "/search",  mode: "any"},
        //              {label: "Chat",    href: "/chat",    mode: "any"} ]
        // },
        // {
        //     id: "profile-menu",
        //     iconSource: "/img/user_icon_small.png",
        //     items: [ {label: "Profile", href: "/profile", mode: "logged-in"},
        //              {label: "Logout",  href: "/logout",  mode: "logged-in"},
        //              {label: "Login",   href: "/login",   mode: "logged-out"},
        //              {label: "Signup",  href: "/signup",  mode: "logged-out"} ]
        // }
    ],
    // headerDropdownMode: "logged-out", // what set of options should be listed
    siteLogoSource:   "/img/Profile_Transparent.png", // site logo image source
    siteTitle:        "", // title on tab and on header
    initMessage:      "" //message to show on page load
};



// // // // // // // // // // // // // // //
// // //    MIDDLEWARE AND UTILS    // // //
// // // // // // // // // // // // // // //

// Setup misc and Socket.io middleware
var middleware = require('../middleware/')(fs);



// // // // // // // // // // // // // // //
// // //     SETUP EXPRESS APP      // // //
// // // // // // // // // // // // // // //

// Setup Express + Handlebars app engine
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'handlebars');
app.engine('handlebars', hb.engine());
app.enable('trust proxy');



// // // // // // // // // // // // // // //
// // //       EXPRESS ROUTES       // // //
// // // // // // // // // // // // // // //

// Static Public Directory Middleware
app.use(express.static(publicDir));

// All express route middleware
require('../routes/')(app, indexContext, defaultDest, middleware.getDirs);



// // // // // // // // // // // // // // //
// // //       START LISTENING      // // //
// // // // // // // // // // // // // // //

// Then listen on port
http.listen(port, '0.0.0.0', function() {
    console.log(` ~=> Server is a go!`);
});
