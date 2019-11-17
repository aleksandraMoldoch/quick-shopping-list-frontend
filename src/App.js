import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import RecepieDetails from './containers/RecepieDetails/RecepieDetails';
import RecepiesList from './containers/RecepiesList/RecepiesList';
import NewRecepie from './containers/NewRecepie/NewRecepie';
import Layout from './components/Layout/Layout';
import ShoppingList from './containers/ShoppingList/ShoppingList';
import NoMatch from './components/NoMatch/404';

function App() {
  return (
    <BrowserRouter basename="/quick-shopping/">
      <Layout>
        <Switch>
          <Route exact path='/' component={RecepiesList} />
          <Route exact path='/recepies' component={RecepiesList} />
          <Route exact path='/new_recepie' component={NewRecepie} />
          <Route exact path='/recepies/:id' component={RecepieDetails} />
          <Route exact path='/shopping_list' component={ShoppingList} />
          <Route path='/404' component={NoMatch} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
