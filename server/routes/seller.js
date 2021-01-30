const Seller = require("../Models/sellers.model");
const router = require("express").Router();

router.post("/seller", async (req, res) => {
  try {
    let user = await new Seller(req.body);
    console.log(user);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.get("/seller-details", async (req, res)=>{
    try{
      console.log(req.body.uid)
     const seller = await Seller.findOne({uid:req.body.uid})
     console.log(seller)
     console.log(seller.type);
     const obj = {
         "name": seller.name,
         "type": seller.type
     }
     res.send(obj);
    }
    catch(e){
  console.log(e);
    }
  });
  
module.exports = router;
