const http = require('http');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Deal with incoming data
const parseBody = (request, response) => {
  const data = [];
  // Upload unfinished
  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });
  // Push data as it arrives
  request.on('data', (chunk) => {
    data.push(chunk);
  });
  // Data gotten
  request.on('end', () => {
    // Put data into string and check type
    const dataString = Buffer.concat(data).toString();
    const dataType = request.headers['content-type'];
    // Parse
    if(dataType === 'application/x-www-form-urlencoded') {
      request.body = query.parse(dataString);
    } else if (dataType === 'application/json') {
      request.body = JSON.parse(dataString);
    } else {
      // Do something, 404
      return;
    }
    // From here, do something!
  });
};

const onRequest = (request, response) => {
  // Setup parse URL
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  // Get accepted types frin request
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  // Depending on pathname and parameters, handle the response
  if(request.method === 'POST') {
    switch (parsedUrl.pathname) {
      default:
        responseHandler.notFound(request, response);
        break;
    }
  }
  else {
    switch (parsedUrl.pathname) {
      case '/':
        responseHandler.getIndex(request, response);
        break;
      case '/style.css':
        responseHandler.getCSS(request, response);
        break;
      default:
        responseHandler.notFound(request, response);
        break;
    }
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
  responseHandler.parseJSONFile();
});