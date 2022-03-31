const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const farmerRoute = require("./server/routes/farmer");
const sellerRoute = require("./server/routes/seller");
const listingRoute = require("./server/routes/listing");
const marketRoute = require("./server/routes/market");
require("dotenv").config();
const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 8080;
const path = require("path");


app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(farmerRoute);
app.use(sellerRoute);
app.use(listingRoute);
app.use(marketRoute)
app.use(cors());
app.use(express.static(path.join(__dirname,"build")));

mongoose.connect(uri, {
  useNewUrlParser: "true",
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
});

app.listen(port, () => {
  console.log(`Running at Port ${port}`);
});