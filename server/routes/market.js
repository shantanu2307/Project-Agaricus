const Market = require("../Models/market.model");
const axios =require('axios');
const router = require("express").Router();
const redis=require('redis');
const client = redis.createClient();

async function cache(req, res, next) {
  const { market, date } = req.body;
  const key = String(market) + String(date);
  client.get(key, async(err, data) => {
    if (err) throw err;
    if (data !== null) {
      await res.send(data);
    } else {
      next();
    }
  });
}

router.post('/market', async(req,res)=>
{
    try{
     const market = await new Market(req.body)
     await market.save();
     res.send();
    }
    catch(e)
    {
     console.log(e);
     res.send(e);
    }
})
router.post('/getMarket',async (req, res)=>{
    try{
        const market = await Market.find({})
        market.sort();
        res.send(market);
    }
    catch(e){
        console.log(e)
        res.send(e)
    }

})
router.post('/price',cache,async(req, res,next) => {
    let {market,date} = req.body;
    const data={market,date};
    const value = await axios.post("https://pricepredml.herokuapp.com/", {
        market,date
    });
    console.log(value.data[0])
    const key = String(market) + String(date);
    await client.set(key, value.data[0]);
    res.send(String(value.data[0]));
    
});
module.exports = router;