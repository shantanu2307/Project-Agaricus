const Market = require("../Models/market.model");
const router = require("express").Router();
const redis=require('redis');
const client=redis.createClient();
const {PythonShell} = require('python-shell');



function cache(req, res, next) {
  const { market, date } = req.body;
  const x={market,date};
  const t=JSON.stringify(x);
  console.log(t);
  client.get(t, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
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
    // console.log(client);
    let {market,date} = req.body;
    console.log(req.body)
    let data = {market,date};
    let pyshell = await new PythonShell('./server/python-script/connect.py');

    // sends a message to the Python script via stdin
    await pyshell.send(JSON.stringify(data));

    var result;
    await pyshell.on('message', function (message) {
        console.log(message);
        result = {
            item: message
        };
        console.log(result);
    });
    const m=JSON.stringify(result);
    await client.set(data, m);
    await pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.send(result);
    });
});
module.exports = router;