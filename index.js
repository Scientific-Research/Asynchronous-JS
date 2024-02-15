const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    res.end(data);
  });
  /* this is our callback function:(err, data) => {
    console.log(`The data is: ${data}`); which will be called as soon as
    our data reading is done! */
});

const PORT = 8000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is listening to the PORT ${PORT}`);
});
