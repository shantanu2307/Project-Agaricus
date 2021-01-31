const Listing = require("../Models/listings.model");
const Seller = require("../Models/sellers.model");
const router = require("express").Router();

router.post("/listing", async (req, res) => {
  try {
    const seller = await Seller.findOne({ uid: req.body.uid });
    const obj = {
      uid: seller._id,
      district: req.body.district.toLowerCase(),
      state: req.body.state.toLowerCase(),
      details: req.body.details,
      pincode: req.body.pincode.toLowerCase(),
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
router.post("/delListing", async (req, res) => {
  try {
    const seller = await Seller.findOne({ uid: req.body.uid });
    const listing = await Listing.findOneAndDelete({ uid: seller._id });
    if (listing!=null) {
      console.log(listing);
      res.send({ flag: true });
    }
    else{
      res.send({flag:false});
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
router.post('/allListings', async(req,res)=>{
  try{
   const listingA = Listing;
   console.log(listingA);
   const listingB = listingA.find({state:req.body.state.toLowerCase()})
   console.log(listingB)
   const listingC = listingB.find({district:req.body.district.toLowerCase()})
   console.log(listingC)
   res.send(listingB)
  }
  catch(e)
  {
  console.log(e)
  res.send(e)
  }
})
module.exports = router;
