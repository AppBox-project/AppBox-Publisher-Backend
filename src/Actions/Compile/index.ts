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

  const otherObjects = {};

  await (site.data.data || []).reduce(async (previousPromise, dataBlock) => {
    let newData = await previousPromise;

    const model = await models.objects.findOne({ key: dataBlock });
    otherObjects[dataBlock] = model.fields;

    return model;
  }, Promise.resolve([]));

  const configData = {
    data: site.data.siteSettings,
    menus: site.data.menus,
    baseUrl: "http://localhost:8600",
    objects: { "publisher-pages": pageModel.fields, ...otherObjects },
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

      shell.exec("gatsby build");

      // Publish
      shell.mkdir("-p", `/AppBox/Files/Sites/${args.siteId}`);
      shell.cp("-r", "public/*", `/AppBox/Files/Sites/${args.siteId}/`);
    }
  );
};
