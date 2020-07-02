const compile = require("./Actions/Compile");
const install = require("./Actions/Install");

require("./db/Models/Objects");
require("./db/Models/Entries");
require("./db/Models/AppPermissions");
require("./db/Models/UserSettings");

//@ts-ignore
var mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${
    process.env.DBURL ? process.env.DBURL : "192.168.0.2:27017"
  }/AppBox`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  const models = {
    objects: mongoose.model("Objects"),
    entries: mongoose.model("Entries"),
    apppermissions: mongoose.model("AppPermissions"),
    usersettings: mongoose.model("UserSettings"),
  };

  // Let server know we're ready to receive instructions
  process.send("ready");

  // On receive instructions
  process.on("message", (instruction) => {
    console.log(`Received instruction: ${instruction.action}`);
    switch (instruction.action) {
      case "publishSite":
        compile(instruction.args, models);
        break;
      case "installSite":
        install(instruction.args, models);
        break;
      default:
        console.log("Unknown action");
        break;
    }
  });
});
