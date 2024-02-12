require("dotenv").config();
const express = require("express");
const { logger,logEvents } = require("./middleware/logger");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

// console.log(process.env.NODE_ENV);
connectDB();

const app = express();
const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users",require("./routes/userRoutes"));
app.use("/notes", require("./routes/notesRoutes"))


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});


app.use(errorHandler);

mongoose.connection.once("open",()=>{
   console.log("Connection to MongoDB")
   app.listen(PORT, () => console.log("listening on port 3500"));
})
mongoose.connections.concat("error",err=>{
console.log(err);
logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.syscall}\t${err.hostname}`,"mongoErrLog.log");
})

