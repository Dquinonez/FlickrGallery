import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import FlickrApp from './FlickrApp';
import NotFound from './NotFound';

const Main = () => (
    <BrowserRouter>
       <Switch>
         <Route exact path="/" component={App} />
         <Route exact path="/search" component={FlickrApp} />
         <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );

export default Main;