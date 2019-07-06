const jq = require("node-jq");
const client = require("./twitter-client");

if (process.argv.length !== 3) {
  console.error("require username");
  process.exit(1);
}

const username = process.argv[2];

client
  .get("lists/list", { screen_name: username })
  .then(lists => {
    const filter = "[ .[] | { id_str, slug } ]";
    jq.run(filter, lists, { input: "json" })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });
