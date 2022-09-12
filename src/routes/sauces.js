const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

//************************** End of save DB code ****************************

//Code to show an array with all of the sauces  in the DB

router.get("/", saucesCtrl.getAllSauces);
router.post("/", saucesCtrl.createThing);
router.get("/:id", saucesCtrl.getOneThing);
router.put("/:id", saucesCtrl.ModifyThing);
//router.delete("/:id", saucesCtrl.DeleteThing);

//exports.createThing = (req, res) => {

//res.json(data.sauces);

//********* end array sauces

//Code to get un item form the DB

//get a sauce from
/*router.get("/:id", (req, res, next) => {
    const sauce = data.sauces.find((s) => s.id === req.params.id);
  
    if (!sauce) return res.status(404).json({ error: "Sauce not found" });
  
    res.json(sauce);
  });*/

module.exports = router;
