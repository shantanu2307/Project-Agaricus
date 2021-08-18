const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const farmerRoute = require("./routes/farmer");
const sellerRoute = require("./routes/seller");
const listingRoute = require("./routes/listing");
const marketRoute = require("./routes/market");
require("dotenv").config();
const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 8080;
const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
var sessionStore = new RedisStore({ client: redisClient });


app.use(
  session({
    store: sessionStore,
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(farmerRoute);
app.use(sellerRoute);
app.use(listingRoute);
app.use(marketRoute)
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: "true",
});

mongoose.set("useUnifiedTopology", true);

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

redisClient.on("connect", function () {
  console.log("Connected to redis!");
});


app.listen(port, () => {
  console.log(`Running at Port ${port}`);
});

module.exports=redisClient;
