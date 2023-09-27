const mongoose = require("mongoose");

const url = "mongodb://0.0.0.0:27017/e-comm?directConnection=true";
mongoose.connect(url);
