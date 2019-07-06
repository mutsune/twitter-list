const fs = require("fs");
const client = require("./twitter-client");

if (process.argv.length !== 4) {
  console.error("require list id and slug");
  process.exit(1);
}

const id = process.argv[2];
const slug = process.argv[3];
const usernames = fs.readFileSync("/dev/stdin", "utf8");

const params = {
  list_id: id,
  slug: slug,
  screen_name: usernames
};

console.log(params);

client
  .post("lists/members/create_all", params)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
