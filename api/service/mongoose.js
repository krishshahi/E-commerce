const mongoose = require("mongoose");
const config = require("../config/constants");
const url = config.DB_URL+"/"+config.DB_NAME;

mongoose.connect(url)
.then((ack) => {
    console.log("DB connected successfully.");
})
.catch((error) => {
    console.log("Error while db connection...")
})