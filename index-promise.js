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

// to write our function using Async-Await insread of .then()-.catch()
const getDogPic = async () => {
   try {
      const result = await readFilePromise(`${__dirname}/doguuu.txt`);
      console.log(`Breed: ${result}`);

      const res = await superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
      console.log(res.body);

      await writeFilePromise(`${__dirname}/dog-written.txt`, res.body.message);
      console.log(`Random dog image saved to the file`);
   } catch (err) {
      console.log(err);
      // with throw err, it will mark the entire function as reject, that's why it goes out of
      // first function, then, it doesn't go to the try, rather, it goes directly to the
      // catch(err) section!
      throw err;
   }
   return '2: READY :)';
};
console.log('1:Will get dog pics!');
// at the end, we have to call our function to start to work!
// const readyValue = getDogPic();
// TO USE .THEN() TO GET THE RETURN VALUE FROM ASYNC FUNCTION:
// getDogPic().then((result) => {
//    console.log(result);
// }).catch(err => {
// console.log('ERROR!');
// });
// TO USE ASYNC AND AWAIT TO GET THE RETURN VALUE FROM ASYNC FUNCTION:
const x = async () => {
   try {
      const f = await getDogPic();
      console.log(f);
   } catch (err) {
      console.log('ERROR');
   }
};
x();
console.log('3:Done getting dog pics!');
// console.log(readyValue);
/*
readFilePromise(`${__dirname}/dog.txt`)
   // here we have Promise from readFilePromise, then we will go to the .then
   .then((result) => {
      console.log(`Breed: ${result}`);
      return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
      // here we have Promise f rom superagent, then we will go to the .then
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
   */
