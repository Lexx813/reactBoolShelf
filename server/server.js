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
const {
  User
} = require('./models/user');
const {
  Book
} = require('./models/book');

app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static('client/build'))

// ROUTES //
require("./routes/bookRoutes")(app);
require("./routes/authRoutes")(app);







// SERVER SETUP //
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`SERVER STARTED AT PORT ${port}`);

});