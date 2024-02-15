const fs = require("fs");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
});
/* this is our callback function:(err, data) => {
  console.log(`The data is: ${data}`); which will be called as soon as
  our data reading is done! */
