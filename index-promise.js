const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
   console.log(`Breed: ${data}`);
   superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`) // This line return a promise for us!
      // when the promise is successful, then .then() will be called and the promise is resolved!
      // if the promise is not successful,then .then() will not be called and the promise is failed!
      // in this case, it will go directly to the .catch() section and will not go here
      // to the .then() section.
      .then((res) => {
         //  if (err) return console.log(err.message); // error is below using .catch()
         console.log(res.body);
         fs.writeFile(`${__dirname}/dog-written.txt`, `${res.body.message}`, 'utf-8', (err) => {
            if (err) return console.log(err.message);
            console.log(`Random dog image saved to the file: ${res.body.message}`);
         });
      })
      .catch((err) => {
         console.log(err.message);
      });
});
