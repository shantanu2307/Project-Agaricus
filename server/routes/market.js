const Market = require("../Models/market.model");
const axios =require('axios');
const router = require("express").Router();

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
router.post('/price',async(req, res,next) => {
    let { market, date } = req.body;
    const value = await axios.post("https://pricepredml.herokuapp.com/", {
      market,
      date,
    });
    await res.send(value.data[0]);
});
module.exports = router;