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
router.post('/price', (req, res) => {
    let {market,date} = req.body;
    console.log(req.body)
    let data = {market,date};
    let pyshell = new PythonShell('./server/python-script/connect.py');

    // sends a message to the Python script via stdin
    pyshell.send(JSON.stringify(data));

    var result;
    pyshell.on('message', function (message) {
        console.log(message);
        result = {
            item: message
        };
        console.log(result);
    });
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
        res.send(result);
    });
});
module.exports = router;