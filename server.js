var express = require('express');
var morgan = require('morgan');
var app = express();
var sassMiddleware = require("node-sass-middleware");
app.use(sassMiddleware({
    src: __dirname + '/public',
    dest: '/tmp'
}));
      //'/tmp' folder holds temporary sass file
app.use(express.static('/tmp'));
app.use(morgan('dev'));


app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get("/:parser", function (request, response) {

    let IP = (request.headers['x-forwarded-for']
              ||request.connection.remoteAddress).split(',')[0];
    let lang = request.headers['accept-language'].split(',')[0];
    let OS = request.headers['user-agent'].split('(')[1].toString().split(';')[0];

    response.json(
      {
        "IP Address": IP,
        "Language": lang,
        "Operating System": OS
      });
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
