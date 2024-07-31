const router = require("express").Router();

const UserControllers = require("./../controllers/userControllers");

router.get("/nem", UserControllers.getAlldata);
router.delete("/nem/:id", UserControllers.getAlldelete);
router.post("/nem", UserControllers.getAllpost);

module.exports = router;
