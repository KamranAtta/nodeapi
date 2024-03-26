const bodyParser = require('body-parser'),
    express = require('express'),
    passport = require('passport'),
    path = require('path');
const cors = require('cors');
const compression = require('compression');
const fileUpload = require('express-fileupload');
module.exports = () => {
    var app = express();
    app.use(compression())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(fileUpload({
        useTempFiles: true
    }));
    // routes
    require('../routes/index')(app);
    require('../routes/User.routes')(app);

    app.use("/", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept, Authorization");
        next();
    });
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
    return app;
};