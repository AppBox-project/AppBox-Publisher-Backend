//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("UserSettings", new Schema({
    username: String,
    key: String,
    value: mongoose.Mixed,
}));
