const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

// This object stores the JSON data
let data = {};

// Parse the JSON file and put its contents into the data object
const parseJSONFile = () => {
    data = JSON.parse(fs.readFileSync('./src/pokedex.json', 'utf8'));
}

// Write response (if not HEAD) with parameters
const respond = (request, response, message, dataType, statusCode) => {
  response.writeHead(statusCode, {
    'Content-Type': dataType,
    'Content-Length': Buffer.byteLength(message, 'utf8')
  });
  if(request.method !== 'HEAD') {
    response.write(message);
  }
  response.end();
};

// Give all of the data
const getAllPokemon = (request, response) => {
  respond(request, response, JSON.stringify(data), 'application/json', 200);
}

// Find pokemon based on name
const getPokemon = (request, response, parsedUrl) => {
  const name = parsedUrl.searchParams.get('name');
  const pokemon = data[getIndexByName(name)];
  if (pokemon) {
    return respond(request, response, JSON.stringify(pokemon), 'application/json', 200);
  }
  notFound(request, response);
}

// Helper methods
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
}

const notFound = (request, response) => {
    const message = JSON.stringify(
    {
      message: 'The page you are looking for was not found.',
      id: 'notFound'
    });
    respond(request, response, message, 'application/json', 404);
}

const getBundle = (request, response) => {
  respond(request, response, bundle, 'application/javascript', 200);
};

// Get the index of a Pokemon's name, return -1 if it doesn't exist
const getIndexByName = (name) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      return i;
    }
  }
  return -1;
}

module.exports = {
    parseJSONFile,
    getAllPokemon,
    getPokemon,
    getIndex,
    getCSS,
    notFound,
    getBundle,
}