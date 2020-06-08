const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// routes
app.use(express.static("public"));
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
