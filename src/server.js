const http = require('http');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Parse incoming data
const parseBody = (request, response) => {
  const bodyData = [];
  // Upload unfinished
  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });
  // Push data as it arrives
  request.on('data', (chunk) => {
    bodyData.push(chunk);
  });
  // Data gotten
  request.on('end', () => {
    // Put data into string and check type
    const dataString = Buffer.concat(bodyData).toString();
    const dataType = request.headers['content-type'];
    // Parse
    if(dataType === 'application/x-www-form-urlencoded') {
      request.body = query.parse(dataString);
    } else if (dataType === 'application/json') {
      request.body = JSON.parse(dataString);
    } else {
      // 404
      return responseHandler.notFound(request, response);
    }
    // Do something!
  });
};

// Different path names call different functions (only those who only need request, response)
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/bundle.js': responseHandler.getBundle,
  '/api/getAllPokemon': responseHandler.getAllPokemon,
  default: responseHandler.notFound
};

// Handle a request and figure out where it goes
const onRequest = (request, response) => {
  // Setup parse URL
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  // Get accepted types in request
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  // Depending on pathname, handle the response
  const handlerFunction = urlStruct[parsedUrl.pathname];
  if (parsedUrl.pathname == '/api/getPokemon') {
    responseHandler.getPokemon(request, response, parsedUrl);
  } else if (handlerFunction) {
    handlerFunction(request, response);
  } else {
    urlStruct.default(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
  responseHandler.parseJSONFile();
});