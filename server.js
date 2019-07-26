const next = require('next');
const http = require('http');
const url = require('url');
const path = require('path');

const port = process.env.PORT || 4000;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    http.createServer((req, res) => {
      // parse request url to get its pathname
      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      // If a serviceWorker is requested, serve it as a static file
      if (pathname === '/service-worker.js') {
        const filepath = path.join(__dirname, '.next', pathname);

        app.serveStatic(req, res, filepath);
      } else {
        // otherwise, let next take care of it
        handle(req, res, parsedUrl);
      }
    })
      .listen(port, () => {
        console.log('Server listening at PORT', port);
      });
  });
