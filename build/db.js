var mongoose = require("mongoose");
var objects = require("/AppBox/System/Server/src/Utils/Models/Objects.ts");
var entries = require("/AppBox/System/Server/src/Utils/Models/Entries.ts");
var apppermissions = require("/AppBox/System/Server/src/Utils/Models/AppPermissions.ts");
var usersettings = require("/AppBox/System/Server/src/Utils/Models/UserSettings.ts");
module.exports = new Promise(function (resolve) {
    mongoose.connect("mongodb://" + (process.env.DBURL ? process.env.DBURL : "192.168.0.2:27017") + "/AppBox", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", function () {
        // Models
        resolve({
            objects: mongoose.model("Objects"),
            entries: mongoose.model("Entries"),
            apppermissions: mongoose.model("AppPermissions"),
            usersettings: mongoose.model("UserSettings"),
        });
    });
});
