module.exports = new Promise(function (resolve) {
    //@ts-ignore
    var mongoose = require("mongoose");
    require("./Models/Objects");
    require("./Models/Entries");
    require("./Models/AppPermissions");
    require("./Models/UserSettings");
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
