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

// Get elements of a given pokemon
const getElements = (request, response, parsedUrl) => {
  const name = parsedUrl.searchParams.get('name');
  const types = parsedUrl.searchParams.get('types');
  const weaknesses = parsedUrl.searchParams.get('weaknesses');
  const pokemon = data[getIndexByName(name)];
  // Check if pokemon exists, also checks for no name and an invalid name
  if (!pokemon) {
    return respond(request, response, JSON.stringify({
      message: 'Invalid name query parameter', id: 'badRequest'
    }), 'application/json', 400);
  }
  // Ensure at least 1 parameter is true
  if (types == 'false' && weaknesses == 'false') {
    return respond(request, response, JSON.stringify({
      message: 'At least 1 query parameter must be true', id: 'badRequest'
    }), 'application/json', 400);
  }
  // Create and give results
  const results = {}
  if (types == 'true') {
    results.types = pokemon.type;
  }
  if (weaknesses == 'true') {
    results.weaknesses = pokemon.weaknesses;
  }
  return respond(request, response, JSON.stringify(results), 'application/json', 200);
}

// Find pokemon based on name
const getEvolutions = (request, response, parsedUrl) => {
  const name = parsedUrl.searchParams.get('baseName');
  const pokemon = data[getIndexByName(name)];
  // Check if pokemon exists, also checks for no name and an invalid name
  if (!pokemon) {
    return respond(request, response, JSON.stringify({
      message: 'Invalid name query parameter', id: 'badRequest'
    }), 'application/json', 400);
  }
  const count = parsedUrl.searchParams.get('count');
  // Ensure count is valid
  if (count < 1) {
    return respond(request, response, JSON.stringify({
      message: 'Count parameter is too low', id: 'badRequest'
    }), 'application/json', 400);
  }
  const results = [];
  for (let i = 0; i < count; i++) {
    if (i >= pokemon.next_evolution.length) {
      break;
    }
    results.push(data[getIndexByName(pokemon.next_evolution[i].name)]);
  }
  return respond(request, response, JSON.stringify(results), 'application/json', 200);
}

// Add a pokemon
const addPokemon = (request, response) => {
  return respond(request, response, JSON.stringify({message: 'addPokemon'}), 'application/json', 200);
}

// Add an evolution
const addEvolution = (request, response) => {
  return respond(request, response, JSON.stringify({message: 'addEvolution'}), 'application/json', 200);
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
    getElements,
    getEvolutions,
    addPokemon,
    addEvolution,
    getIndex,
    getCSS,
    notFound,
    getBundle,
}