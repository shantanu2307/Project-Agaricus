const Farmer = require("../Models/farmer.model");
const Seller = require("../Models/sellers.model")
const router = require("express").Router();

router.post("/farmer", async (req, res) => {
  try {
    let user = await new Farmer(req.body);
    console.log(user);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.get("/farmer", async (req, res)=>{
  try{

  }
  catch(e){

  }
});

router.get("/role", async(req,res) =>{
  try{
  const farmer = await Farmer.find({uid:req.body.uid});
  if(farmer.length!==0)
  {console.log(farmer);
   res.send({"role":"farmer"});
  }
  else{
    const seller = await Seller.find({uid:req.body.uid});
    if(seller)
    res.send({"role":"seller"});
  }
  }
  catch(e){
    console.log(e);
  }
})

module.exports = router;
