const Market = require("../Models/market.model");
const router = require("express").Router();
const {PythonShell} = require('python-shell');
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
router.post('/price',(req,res)=>{
    console.log(req.body);
    let pyshell = new PythonShell('.././connect.py');

    // sends a message to the Python script via stdin
    pyshell.send(JSON.stringify(req.body));
    pyshell.on('message', function (message) {
        console.log(message);
    });
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.json({data: message});
    });
})
module.exports = router;