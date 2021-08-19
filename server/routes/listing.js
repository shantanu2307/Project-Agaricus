const Listing = require("../Models/listings.model");
const Seller = require("../Models/sellers.model");
const router = require("express").Router();
const redis=require('redis');
const client = redis.createClient();

router.post("/listing", async (req, res) => {
  try {
    const id=req.body.uid;
    const key=String(id);
    client.get(key, async(err, data)=>{
      if(err)
      throw err;
      if(data==null || data==="")
      {
        const seller = await Seller.findOne({ uid: id });
        var type= "Stubble"
        if(seller.type==="Horticulture")
        type = "Horticulture"
        const obj = {
          uid: seller._id,
          district: req.body.district,
          state: req.body.state,
          details: req.body.details,
          pincode: req.body.pincode,
          sellerName: seller.name,
          certificate: req.body.certificate,
          pics: req.body.pics,
          type: type
        };
        let user = await new Listing(obj);
        console.log(user);
        await user.save();
       
        const temp=JSON.stringify(user);
        await client.set(key, temp);
        res.send(user);
      }
      else
      {console.log(data);
        res.send({});}
    })
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
    const id=req.body.uid;
    const key=String(id);
    const seller = await Seller.findOne({ uid: id });
    const listing = await Listing.findOneAndDelete({ uid: seller._id });
    await client.set(key, "");
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
   var listingA = await Listing.find({pincode: req.body.pincode, type: req.body.type});
   console.log(listingA);
   if(listingA.length>10)
   {
      await res.send(listingA);
   }
   var requiredListings = 10 - listingA.length;
   const listingB =await  Listing.find({district:req.body.district, type: req.body.type,pincode:{$ne: req.body.pincode}}).limit(requiredListings);

   if(listingA.length+listingB.length>10)
   {
      const combined = listingA.concat(listingB);
      await res.send(combined);
   }
    requiredListings = 10 - listingA.length - listingB.length;
    const listingC = await Listing.find({state:req.body.state, type: req.body.type,pincode : { $ne: req.body.pincode},district:{$ne: req.body.district} }).limit(requiredListings);
    const combined = listingA.concat(listingB).concat(listingC)
    console.log(listingC)
    await res.send(combined)
  }
  catch(e)
  {
  console.log(e)
  await res.send(e)
  }
})
module.exports = router;
