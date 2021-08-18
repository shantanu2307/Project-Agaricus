const Market = require("../Models/market.model");
const router = require("express").Router();
const redis=require('redis');
const client = redis.createClient();
const {PythonShell} = require('python-shell');

async function cache(req, res, next) {
  const { market, date } = req.body;
  const key = String(market) + String(date);
  // console.log(key);
  client.get(key, async(err, data) => {
    if (err) throw err;
    if (data !== null) {
      const rest={item:data};
      await res.send(rest);
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
    // console.log(req.body)
    let pyshell = await new PythonShell('../server/python-script/connect.py');
    await pyshell.send(JSON.stringify(data));

    var result;
    await pyshell.on('message', function (message) {
        console.log(message);
        result = {
            item: message
        };
        console.log(result);
    }); 
    
    await pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        const key = String(market) + String(date);
        client.set(key, result.item);
        res.send(result);
    });
    
});
module.exports = router;