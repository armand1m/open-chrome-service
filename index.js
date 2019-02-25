const exec = require('child_process').exec;
const http = require('http');
const url = require('url');

const whitelist = {
  'bitbucket': 'https://bitbucket.com/',
  'github': 'https://github.com/',
  'slack': 'https://travix.slack.com/',
  'wikipedia': 'https://wikipedia.com/',
  'netflix': 'https://netflix.com'
};

http.createServer(function (request, response) {
  try {
    console.log(request.url);

    const query = url.parse(request.url, true).query;
    const appUrl = whitelist[query.app && query.app.toLowerCase()];

    if (appUrl) {
      exec(`google-chrome ${appUrl}`);
    } else {
      exec('google-chrome');
    }

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Chrome is open now!');
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.write('Chrome could not be opened.');
    response.end();
  }
}).listen(3000, "0.0.0.0", () => {
  console.log("Server running at 3000");
});