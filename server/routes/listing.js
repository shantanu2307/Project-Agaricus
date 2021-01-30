const Listing = require("../Models/listings.model");
const Seller = require("../Models/sellers.model");
const router = require("express").Router();

router.post("/listing", async (req, res) => {
  try {
    const seller = await Seller.findOne({uid:req.body.uid});
    const obj = {
        uid: seller._id,
        district: req.body.district,
        state: req.body.state,
        description: req.body.description,
        pincode: req.body.pincode,
        sellerName: seller.name,
        certificate: req.body.certificate,
        pics: req.body.pics
    }
    let user = await new Listing(obj);
    console.log(user);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});
router.get("/listing", async(req,res)=>{
    try{
    const seller = await Seller.findOne({uid:req.body.uid});
    if(seller)
    {const listing = await Listing.findOne({uid:seller._id})
    res.send(listing);}
    else{
        res.send({}
    }

    }
    catch(e){
    console.log(e);
    }
})
module.exports = router;