import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext, Router, Route} from 'react-router';
import routes from '../client/routes/root';

var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var methodOverride = require('method-override');
var path = require('path');

const app = express();
const server = require('http').Server(app);

const data = [
  {
    id: 1,
    data: "data_1"
  },
  {
    id: 2,
    data: "data_2"
  }
];

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({}));
app.use(methodOverride());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/')));



app.get('/api/data', (req, res) => {
  res.send(data);
});

app.get('/', (req, res) => {
  res.render('index', {
        markup: ""
      });
});


// app.get('*', (req, res) => {  
//   match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {    
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       res.render('index', {
//         markup: renderToString(<RoutingContext {...renderProps} />)
//       });
//     } else {      
//       res.status(404).send('Not found')
//     }
//   })
// });

server.listen(8080, function() {
  console.log('server started');
});