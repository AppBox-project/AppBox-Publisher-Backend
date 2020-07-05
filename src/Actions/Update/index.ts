var shell = require("shelljs");
var fs = require("fs");

module.exports = async (args, models) => {
  console.log(`Updating from source for ${args.id}.`);
  shell.cd(`/AppBox/Files/Sites/Source/${args.id}`);
  shell.exec(`git pull`);
  shell.exec(`yarn install`);

  // Update entry
  var contents = JSON.parse(
    fs.readFileSync(
      `/AppBox/Files/Sites/Source/${args.id}/manifest.json`,
      "utf8"
    )
  );

  const site = await models.entries.findOne({ "data.id": args.id });
  site.data.design_settings = contents.siteSettings;
  site.data.supported_menus = contents.supportedMenus;
  site.markModified("data");
  site.save();
};
