const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
   console.log(`Breed: ${data}`);
   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((res) => {
      if (err) return console.log(err.message);
      console.log(res.body);
      fs.writeFile(`${__dirname}/dog-written.txt`, `${res.body.message}`, 'utf-8', (err) => {
         if (err) return console.log(err.message);
         console.log(`Random dog image saved to the file: ${res.body.message}`);
      });
   });
});
