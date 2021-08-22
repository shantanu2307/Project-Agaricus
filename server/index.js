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
const util =require('util')
const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: "QUCxSKxSUmgUX79FW3D2izFqMeFz4LtP",
});
client.hget = util.promisify(client.hget);
const path = require("path");


app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(farmerRoute);
app.use(sellerRoute);
app.use(listingRoute);
app.use(marketRoute)
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

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

client.on("connect", function () {
  console.log("Connected to redis!");
});

const exec = mongoose.Query.prototype.exec;

// create new cache function on prototype
mongoose.Query.prototype.cache = function (options = { expire: 60 }) {
  this.useCache = true;
  this.expire = options.expire;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  // get cached value from redis
  const cacheValue = await client.hget(this.hashKey, key);

  // if cache value is not found, fetch data from mongodb and cache it
  if (!cacheValue) {
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result));
    client.expire(this.hashKey, this.expire);

    console.log("Return data from MongoDB");
    return result;
  }

  // return found cachedValue
  const doc = JSON.parse(cacheValue);
  console.log("Return data from Redis");
  return Array.isArray(doc)
    ? doc.map((d) => new this.model(d))
    : new this.model(doc);
};

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Running at Port ${port}`);
});

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
