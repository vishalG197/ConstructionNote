const express = require("express");
const router = express.Router();
const controller = require("../controllers/notesController");

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route("/")
.get(controller.getAllNotes)
.post(controller.createNewNote)
.patch(controller.updateNote)
.delete(controller.deleteNote)

module.exports = router;
