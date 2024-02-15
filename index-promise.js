const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
   return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
         // when readFile is not successful, reject comes into play and then send this string
         // data ('I could not find that file!') to the .catch() below!
         if (err) reject('I could not find that file!');
         // when readFile is successful, resolve comes into play and then send the data to the
         // .then() below!
         resolve(data);
      });
   });
};

readFilePromise(`${__dirname}/dog.txt`).then((result) => {
   console.log(`Breed: ${result}`);

   superagent
      .get(`https://dog.ceo/api/breed/${result}/images/random`) // This line return a promise for us!
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
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {});
