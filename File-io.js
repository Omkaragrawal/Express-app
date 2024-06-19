const fs = require('fs/promises');
const path = require('path');

// async function readFile () {
//     console.log('inside async function');
//     const file = await fs.readFile('./temp.txt', 'utf-8');
//     console.log(file);
// }

// readFile();

const FILE_NAME = 'TemporaryFile.txt';

const FILE_PATH = path.join(__dirname, FILE_NAME);

async function fileOperations() {
    const DATA = `Name: OMKAR AGRAWAL
    Job Description: NodeJS Developer`;

    console.log('Writing file');
    await fs.writeFile(FILE_PATH, DATA);
    
    console.log('Write file completed');
    console.log('Reading file');

    const FILE_DATA = await fs.readFile(FILE_PATH, 'utf8');
    console.log('Read file completed');

    console.log(FILE_DATA);
}

fileOperations();
