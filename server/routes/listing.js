const Listing = require("../Models/listings.model");
const Seller = require("../Models/sellers.model");
const router = require("express").Router();

router.post("/listing", async (req, res) => {
  try {
    const seller = await Seller.findOne({ uid: req.body.uid });
    const obj = {
      uid: seller._id,
      district: req.body.district,
      state: req.body.state,
      description: req.body.description,
      pincode: req.body.pincode,
      sellerName: seller.name,
      certificate: req.body.certificate,
      pics: req.body.pics,
    };
    let user = await new Listing(obj);
    console.log(user);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});
router.post("/listings", async (req, res) => {
  try {
    console.log(req.body);
    const seller = await Seller.findOne({ uid: req.body.uid });
    console.log(seller);
    if (seller) {
      const listing = await Listing.findOne({ uid: seller._id });
      res.send(listing);
    } else {
      res.send({ sellerName: "false" });
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("/delListing", async(req,res)=>{
  try{
  const seller = await Seller.findOne({uid: req.body.uid})
  await Listing.findOneAndDelete({uid: seller._id});
  res.send();}
  catch(e)
  {res.send(e);
    console.log(e)
  }
})
module.exports = router;
