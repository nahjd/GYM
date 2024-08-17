const router = require("express").Router();

const adminControllers = require("./../controllers/adminController");

router.get("/stella", adminControllers.getAllUser);
router.get("/stella/:id", adminControllers.getUserById);
// router.delete("/login/:id", adminControllers.deleteUser);
router.patch("/stella/:id", adminControllers.patchUser);
router.put("/stella/:id", adminControllers.putUser);

// router.post("/stella", adminControllers.postUser);
router.post("/stella", adminControllers.stella);

module.exports = router;
