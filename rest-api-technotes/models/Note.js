const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
username:{type:String, required:true},
password:{type:String, required:true},
roles:{type:String, default:"employee"},
active:{type:String, default:"true"},
})

module.exports = mongoose.model("Note",NotesSchema);
