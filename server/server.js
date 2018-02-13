const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();


// DB //
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);


// MODELS //
const { User } = require('./models/user');
const { Book } = require('./models/book');

app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES //
require("./routes/bookRoutes")(app);
require("./routes/authRoutes")(app);




// SERVER SETUP //
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT ${port}`);
  
});