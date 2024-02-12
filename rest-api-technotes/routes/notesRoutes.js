const express = require("express");
const router = express.Router();
const controller = require("../controllers/notesController");


router.route("/")
.get(controller.getAllNotes)
.post(controller.createNewNote)
.patch(controller.updateNote)
.delete(controller.deleteNote)

module.exports = router;
