//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("Entries", new Schema({
    key: String,
    objectId: String,
    data: Schema.Types.Mixed,
}));
