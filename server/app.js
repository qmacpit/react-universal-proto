import React from 'react';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import { match, RoutingContext, Router, Route} from 'react-router';
import routes from '../client/routes/root';
import configureStore from '../client/store/dataStore';

var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var methodOverride = require('method-override');
var path = require('path');
var urlMatcher= require('./urlMatcher');

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

const details = {
  1: {
    id: 1,
    data: "data_1"
  },
  2: {
    id: 2,
    data: "data_2"
  },
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({}));
app.use(methodOverride());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/')));



app.get('/api/data', (req, res) => {
  res.send(data);
});

app.get('/api/details/:id', (req, res) => {
  let id = parseInt(req.params.id); 
  return res.send(details[id]); 
});

// app.get('/', (req, res) => {
//   res.render('index', {
//         markup: ""
//       });
// });

urlMatcher.define(
  '/details(/:id)',
  function(params) {
    // console.log('match found')
    // console.log(params)
    let currentStore = [];
    let id = parseInt(params.id);
    let current;
    for (current of data) {
      current = JSON.parse(JSON.stringify(current));    
      if (current.id === id)  
        current.details = details[id];      
      currentStore.push(current);
    }
    return currentStore;
  }
);

app.get('/', render);
app.get('/details/:id', render);

function render(req, res) {  
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {    
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let initialState = data;
      urlMatcher.match(req.url, (store) => {        
        if (!store)
          store = data;
        store = configureStore({ 
          loadData: {
            data: store
          }
        });
        res.render('index', {
          markup: renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          ),
          initialState: store.getState()
        });
      });  
    } else {      
      res.status(404).send('Not found')
    }
  })
}
server.listen(8080, function() {
  console.log('server started');
});