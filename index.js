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
    const TEMP_DATA = await fetch('https://jsonplaceholder.typicode.com/albums');

    const ALBUM_DATA = await TEMP_DATA.json()

    let filteredAlbumData = ALBUM_DATA.filter((album, index) => index < 2)

    const PHOTOS_DATA = [];

    for (let album of filteredAlbumData) {
        const TEMP_PICTURE_DATA = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);

        const PICTURES_DATA = await TEMP_PICTURE_DATA.json();

        PHOTOS_DATA.push(
            ...PICTURES_DATA.reduce((previousValue, currentValue, index) => {
            if (index < 2) {
                previousValue.push(currentValue);
            }
            return previousValue;
        }, [])
    );
    }

    res.json ({
        albums: filteredAlbumData,
        photos: PHOTOS_DATA,
    });

}));

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });