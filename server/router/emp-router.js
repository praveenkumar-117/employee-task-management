const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employee-controllers");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");

router.post("/emptask", authMiddleware, roleMiddleware('Employee'), employeeController.getEmployeeTask);
router.post("/updatestatus", authMiddleware, roleMiddleware('Employee'), employeeController.setTaskStatus);

module.exports = router;
