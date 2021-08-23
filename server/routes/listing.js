const Listing = require("../Models/listings.model");
const Seller = require("../Models/sellers.model");
const router = require("express").Router();
const redis =require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
router.post("/listing", async (req, res) => {
    const id=req.body.uid;
    const seller = await Seller.findOne({ uid: id }).cache({ expire: 10,key:id });
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
    let listing = await new Listing(obj);
    await listing.save();   
    res.send(listing);
});

router.post("/listings", async (req, res) => {
  const id=req.body.uid;
  const seller = await Seller.findOne({ uid: req.body.uid }).cache({ expire: 10,key:id });
  console.log(seller);
  if (seller) {
    const key =String(id)+String('Listing');
    const listing = await Listing.findOne({ uid: seller._id }).cache({expire:10,key:key});
    res.send(listing);
  } 
  else {
      res.send({ sellerName: "false" });
  }
});

router.post("/delListing", async (req, res) => {
    const id=req.body.uid;
    const seller = await Seller.findOne({ uid: id }).cache({expire:10,key:id});
    const key = String(id) + String("Listing");
    const listing = await Listing.findOneAndDelete({ uid: seller._id});
    if (listing!=null) {
      await client.del(key, function (err, reply) {
        console.log(reply); // 1
      });
      console.log(listing);
      res.send({ flag: true });
    }
    else{
      res.send({flag:false});
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
