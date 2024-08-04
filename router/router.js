const router = require("express").Router();

const UserControllers = require("./../controllers/userControllers");

router.get("/nem", UserControllers.getAllUser);
router.delete("/nem/:id", UserControllers.getAlldelete);
router.post("/nem", UserControllers.getAllpost);
router.post("/login", UserControllers.login);
router.get("/nem/:id", UserControllers.getUserById);

module.exports = router;
