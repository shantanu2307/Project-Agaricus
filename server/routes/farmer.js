const Farmer = require("../Models/farmer.model");
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

module.exports = router;
