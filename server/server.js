const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
requireDir = require('require-dir'),
routes = requireDir('./routes'),
redis = require("redis"),
path = require('path'),
session = require('express-session'),
compression = require('compression'),
redisStore = require('connect-redis')(session),
helmet = require('helmet'),
cookieParser = require('cookie-parser');
// const redisClient = redis.createClient(process.env.REDIS_URL);
//
//
// redisClient.on('connect', function () {
//     console.log('Connected to Redis');
//
//     redisClient.set('string key', 'string val', redis.print);
// });
//
// redisClient.on('error', function (err) {
//     console.log('Redis error occurred: ' + err);
// });


app.use(compression());
app.use(helmet());

app.use('/', express.static(path.join(__dirname, '../build/')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '../build'));

app.use(session({
  // store: new redisStore({
  //       client: redisClient
  // }),
  secret: 'asdjf;ypiubuwqer987dsuyeb374',
  resave: false,
  saveUninitialized:false,
  maxAge: 30 * 60 * 1000
}))

app.use(cookieParser("secretSign#143_!223"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next() // otherwise continue
})

for (var i in routes) app.use('/', routes[i]);



// app.get('/store/:key', async (req, res) => {
//   const { key } = req.params;
//   const value = req.query;
//   await client.setAsync(key, JSON.stringify(value));
//   return res.send('Success');
// });
//
// app.get('/:key', async (req, res) => {
//   const { key } = req.params;
//   const rawData = await client.getAsync(key);
//   return res.json(JSON.parse(rawData));
// });


app.listen(3008);
