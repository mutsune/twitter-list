const jq = require("node-jq");
const client = require("./twitter-client");

if (process.argv.length !== 4) {
  console.error("require list id and slug");
  process.exit(1);
}

const id = process.argv[2];
const slug = process.argv[3];

function printMembers(next_cursor) {
  const params = {
    list_id: id,
    slug: slug,
    count: 50,
    cursor: next_cursor,
    include_entities: false
  };

  return client
    .get("lists/members", params)
    .then(users => {
      const filter = ".users | .[] | { id, screen_name, description }";
      jq.run(filter, users, { input: "json" })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
      next_cursor = users.next_cursor;
      if (next_cursor > 0) {
        return printMembers(next_cursor);
      }
    })
    .catch(error => {
      console.error(error);
      return 0;
    });
}

printMembers(-1);
