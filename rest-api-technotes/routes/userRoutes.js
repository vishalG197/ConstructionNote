const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");


router.route("/")
.get(controller.getAllUsers)
.post(controller.createUsers)
.patch(controller.updateUsers)
.delete(controller.deleteUsers)

module.exports = router;
