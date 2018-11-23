import path from "path";
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/Home';

const app = express();

app.use(
  express.static(path.resolve(__dirname, '../public/client'))
);

app.get('/*', (req, res) => {
  const reactDom = renderToString(<Home />);
  const templateString = htmlTemplate(reactDom);

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end(templateString);
});

app.listen(8888, () => {
  console.log('server is listening on port 8888');
});


function htmlTemplate( reactDom ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script type="text/jsx" src="./client.js"></script>
      </body>
      </html>
  `;
}