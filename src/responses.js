const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// This object stores the JSON data
let data = [];

// Parse the JSON file and put its contents into the data object
const parseJSONFile = () => {
    data = JSON.parse(fs.readFileSync('./src/pokedex.json', 'utf8'));
}

module.exports = {
    parseJSONFile,
}