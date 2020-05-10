//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("AppPermissions", new Schema({
    appId: String,
    objectId: String,
    permissions: [String],
}));
