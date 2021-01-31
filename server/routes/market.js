const Market = require("../Models/market.model");
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
router.post('/price', async(req,res)=>{
try{


}
catch(e)
{
    console.log(e)
   res.send(e);
}
})
module.exports = router;