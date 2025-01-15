const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin-controllers");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");

router.get("/employee", authMiddleware, roleMiddleware('Admin'), adminController.getEmployee);
router.post("/createtask", authMiddleware, roleMiddleware('Admin'), adminController.createTask);
router.get("/gettask", authMiddleware, roleMiddleware('Admin'), adminController.getTask);
router.delete("/delete/:userId", authMiddleware, roleMiddleware('Admin'), adminController.deleteUser);

module.exports = router;
