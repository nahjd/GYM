const router = require("express").Router();

const UserControllers = require("./../controllers/userControllers");

router.get("/nem", UserControllers.getAllUser);
router.get("/nem/:id", UserControllers.getUserById);
router.delete("/nem/:id", UserControllers.deleteUser);
router.patch("/nem/:id", UserControllers.patchUser);
router.put("/nem/:id", UserControllers.putUser);
router.post("/nem", UserControllers.postUser);

router.get("/login", UserControllers.getAllUser);
router.get("/login/:id", UserControllers.getUserById);
router.delete("/login/:id", UserControllers.deleteUser);

router.patch("/login/:id", UserControllers.patchUser);
router.put("/login/:id", UserControllers.putUser);

router.post("/nem", UserControllers.postUser);
router.post("/nem", UserControllers.login);

module.exports = router;
