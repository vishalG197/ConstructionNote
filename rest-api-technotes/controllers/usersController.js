const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
   const users = await User.find().select("-password").lean();
   if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
   }
   res.json(users);
});

//@desc create new users
//@route POST /users
//@access Private
const createUsers = asyncHandler(async (req, res) => {
   const { username, password, roles } = req.body;

   // confirm data
   if (!username || !password || !Array.isArray(roles) || !roles.length) {
      return res.status(400).json({ message: "All fields are required" });
   }

   // check for duplicate
   const duplicate = await User.findOne({ username }).lean().exec();
   if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
   }

   // hash password
   const hashedpwd = await bcrypt.hash(password, 10); // salt round;
   const userObject = { username, password: hashedpwd, roles };

   // create user
   const user = await User.create(userObject);
   if (user) {
      res.status(201).json({ message: `New user ${user.username} created successfully` });
   } else {
      res.status(400).json({ message: "Invalid user data received" });
   }
});

//@desc update users
//@route PATCH /users
//@access Private
const updateUsers = asyncHandler(async (req, res) => {
   const { id, username, roles, active, password } = req.body;
   if (!id || !username || !roles || !active || !active) {
      return res.status(409).json({ message: "All field are required" });
   }

   const user = await User.findById(id).exec();

   if (!user) {
      return res.status(400).json({ message: "User not found" });
   }

   // duplicate
   const duplicate = await User.findOne({ username }).lean().exec();

   // allow update to the original user
   if (duplicate && duplicate._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate username" });
   }

   user.username = username;
   user.roles = roles;
   user.active = active;

   if (password) {
      user.password = await bcrypt.hash(password, 10);
   }

   const updatedUser = await user.save();
   res.json({ message: `${updatedUser.username} updated` });
});

//@desc delete users
//@route Delete /users
//@access Private
const deleteUsers = asyncHandler(async (req, res) => {
   const { id } = req.body;
   if (!id) {
      return res.status(400).json({ message: "User ID required" });
   }

   const note = await Note.findOne({ user: id }).lean().exec();
   if (note) {
      return res.status(400).json({ message: "User has assigned notes" });
   }

   const user = await User.findById(id).exec();
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }

   const result = await User.deleteOne();
   const reply = `User ${result.username} with ID ${result._id} deleted`;

   res.json(reply);
});

module.exports = {
   getAllUsers,
   createUsers,
   updateUsers,
   deleteUsers,
};
