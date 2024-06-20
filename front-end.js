const process = async function () {
    const ELEMENT = document.getElementById('image-holder');

    const DATA = await fetch('http://localhost:8080/get-data');

    const JSON_DATA = await DATA.json();

    alert('DATA Fetched');

    for (let image of JSON_DATA.photos) {
        const IMAGE_ELEMENT = document.createElement('img');
        IMAGE_ELEMENT.src = image.url;

        IMAGE_ELEMENT.width = 500;
        IMAGE_ELEMENT.height = 500;

        ELEMENT.appendChild(IMAGE_ELEMENT);
    }
}

process();