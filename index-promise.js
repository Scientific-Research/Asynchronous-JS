const fs = require('fs');
const superagent = require('superagent');

// A Promise function for readFile() function
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

// A Promise function for writeFile() function
const writeFilePromise = (file, data) => {
   return new Promise((resolve, reject) => {
      fs.writeFile(file, data, (err) => {
         if (err) reject('Could not write file :(');
         resolve('success');
      });
   });
};

readFilePromise(`${__dirname}/dog.txt`)
   // here we have Promise from readFilePromise, then we will go to the .then
   .then((result) => {
      console.log(`Breed: ${result}`);
      return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
      // here we have Promise from superagent, then we will go to the .then
   })
   .then((res) => {
      console.log(res.body);
      return writeFilePromise(`${__dirname}/dog-written.txt`, res.body.message);
      // here we have Promise from writeFilePromise, then we will go to the .then
   })
   .then(() => {
      console.log(`Random dog image saved to the file`);
      // here we don't have Promise anymore, that's why there is no .then too!
   })
   .catch((err) => {
      console.log(err.message);
   });
