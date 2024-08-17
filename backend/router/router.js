const router = require("express").Router();

const UserControllers = require("./../controllers/userControllers");

router.get("/bloom", UserControllers.getAllUser);
router.get("/bloom/:id", UserControllers.getUserById);
router.delete("/bloom/:id", UserControllers.deleteUser);
router.patch("/bloom/:id", UserControllers.patchUser);
router.put("/bloom/:id", UserControllers.putUser);
router.post("/bloom", UserControllers.postUser);

module.exports = router;
