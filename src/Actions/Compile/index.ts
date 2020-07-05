var shell = require("shelljs");

module.exports = async (args, models) => {
  console.log(`Compiling gatsby site based on ${args.siteId}`);

  // Get site metadata
  const site = await models.entries.findOne({
    objectId: "publish-sites",
    "data.id": args.siteId,
  });

  console.log(site);

  const configData = {};
};
