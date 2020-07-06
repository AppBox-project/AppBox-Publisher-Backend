var shell = require("shelljs");
var fs = require("fs");

module.exports = async (args, models) => {
  console.log(`Compiling site: ${args.siteId}`);

  // Get site metadata
  const site = await models.entries.findOne({
    objectId: "publish-sites",
    "data.id": args.siteId,
  });

  // Get pages metadata
  const pageModel = await models.objects.findOne({ key: "publisher-pages" });

  const configData = {
    data: site.data.siteSettings,
    menus: site.data.menus,
    baseUrl: "https://appbox.vicvancooten.nl",
    objects: { "publisher-pages": pageModel.fields },
  };

  fs.writeFile(
    `/AppBox/Files/Sites/Source/${args.siteId}/siteData.json`,
    JSON.stringify(configData),
    "utf8",
    () => {
      console.log(
        "Written config file",
        `/AppBox/Files/Sites/Source/${args.siteId}/siteData.json`
      );
      shell.cd(`/AppBox/Files/Sites/Source/${args.siteId}`);
      shell.exec("yarn install");
      shell.exec("gatsby build");

      // Publish
      shell.mkdir("-p", `/AppBox/Files/Sites/${args.siteId}`);
      shell.cp("-r", "public/*", `/AppBox/Files/Sites/${args.siteId}/`);
    }
  );
};
