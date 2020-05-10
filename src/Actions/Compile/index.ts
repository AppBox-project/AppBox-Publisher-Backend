var shell = require("shelljs");

module.exports = async (args, models) => {
  console.log(`Compiling gatsby site based on ${args.siteId}`);

  // Get site metadata
  const site = await models.entries.findOne({
    objectId: "publish-sites",
    "data.id": args.siteId,
  });

  // Create temporary workdirectory and clone appbox-gatsby-theme
  shell.mkdir("-p", `/AppBox/System/Backends/tmp/publisher/`);
  shell.cd(`/AppBox/System/Backends/tmp/publisher/`);
  shell.exec(`git clone ${site.data.template} ${args.siteId}`);
  shell.cd(`${args.siteId}`);

  // Install dependencies and run the gatsby build
  shell.exec("git pull");
  shell.exec("yarn install");
  shell.exec("gatsby build");

  // Publish
  shell.mkdir("-p", `/AppBox/Files/Sites/${args.siteId}`);
  shell.cp("-r", "public/*", `/AppBox/Files/Sites/${args.siteId}/`);
};
