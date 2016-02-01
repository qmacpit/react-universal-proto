import React from 'react';
import { Router, Route} from 'react-router/umd/ReactRouter';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

var history = typeof(window) !== 'undefined'
              ? createBrowserHistory()
              //This kind of history is needed for server-side rendering.
              : createMemoryHistory() 

import App from '../components/app';
import DetailsComponent from '../components/detailsComponent';

var routes = (
    <Router history={history}>
        <Route path="/" component={App}>            
        </Route> 
        <Route path="/details/:id" component={DetailsComponent}>            
        </Route>        
    </Router>
);

export default routes;