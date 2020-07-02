var shell = require("shelljs");
var fs = require("fs");

module.exports = async (args, models) => {
  console.log(`Installing compilable website from ${args.design}.`);

  // Create temporary workdirectory and clone appbox-gatsby-theme
  shell.mkdir("-p", "/AppBox/Files/Sites/Source");
  shell.cd("/AppBox/Files/Sites/Source");
  shell.exec(`git clone ${args.design} ${args.key}`);
  shell.cd(`${args.key}`);

  // Install dependencies
  shell.exec("yarn install");

  var contents = JSON.parse(
    fs.readFileSync(
      `/AppBox/Files/Sites/Source/${args.key}/manifest.json`,
      "utf8"
    )
  );
  const siteSettings = contents.siteSettings;
  const newSite = new models.entries({
    objectId: "publish-sites",
    data: {
      id: args.key,
      name: args.name,
      design: args.design,
      url: args.URL,
      design_settings: siteSettings,
    },
  });
  newSite.save();
};
