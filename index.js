const fs = require('fs');
const superagent = require('superagent');
// const http = require("http");
// const server = http.createServer((req, res) => {
// we have now tow call back function nested together!
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
        // res.end(data);
        // Return word here is very important to prevent the compiler to go further. Just Return!
        if (err) return console.log(err.message);
        // because of the Retuen, the Compiler will stop in this line and will back to the parent
        // function(fs.readFile), that's why we will not have another error down again!
        console.log(res.body);
        // res.end(res.body.message);
        // console.log(res.body.message);
        // console.log(res.body.status);
        fs.writeFile(`${__dirname}/dog-written.txt`, `${res.body.message}`, 'utf-8', (err) => {
            if (err) return console.log(err.message);
            console.log(`Random dog image saved to the file: ${res.body.message}`);
        });
    });
});
/* this is our callback function:(err, data) => {
    console.log(`The data is: ${data}`); which will be called as soon as
    our data reading is done! */
// });
// const PORT = 8000;
// server.listen(PORT, "127.0.0.1", () => {
//   console.log(`Server is listening to the PORT ${PORT}`);
// });
