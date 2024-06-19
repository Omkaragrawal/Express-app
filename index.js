const express = require('express');

const app = express();

const PORT = 8080;

const middleWareWrapper = (callback) => 
    (request, response, next) => {
        Promise.resolve(callback(request, response, next)).catch((err) => next(err));
};

app.get('/', (req, res, next) => {
    res.send('WELCOME TO TCET WORKSHOP!')
  });

app.get('/get-data', middleWareWrapper(async (req, res) => {
    const TEMP_DATA = await fetch('https://jsonplaceholder.typicode.com/posts');

    const USER_DATA = await TEMP_DATA.json()

    console.log(USER_DATA.length);

    res.json(USER_DATA);

}));

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });