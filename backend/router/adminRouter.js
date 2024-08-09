const router = require("express").Router();

const adminControllers = require("./../controllers/adminController");

router.get("/login", adminControllers.getAllUser);
router.get("/login/:id", adminControllers.getUserById);
router.delete("/login/:id", adminControllers.deleteUser);
router.patch("/login/:id", adminControllers.patchUser);
router.put("/login/:id", adminControllers.putUser);

router.post("/register", adminControllers.postUser);
router.post("/login", adminControllers.login);

module.exports = router;
