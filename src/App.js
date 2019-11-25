import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import RecipeDetails from './containers/RecipeDetails/RecipeDetails';
import RecipesList from './containers/RecipesList/RecipesList';
import NewRecipe from './containers/NewRecipe/NewRecipe';
import Layout from './components/Layout/Layout';
import ShoppingList from './containers/ShoppingList/ShoppingList';
import NoMatch from './components/NoMatch/404';

function App() {
  return (
    <BrowserRouter basename="/quick-shopping/">
      <Layout>
        <Switch>
          <Route exact path='/' component={RecipesList} />
          <Route exact path='/recipes' component={RecipesList} />
          <Route exact path='/new_recipe' component={NewRecipe} />
          <Route exact path='/recipes/:id' component={RecipeDetails} />
          <Route exact path='/shopping_list' component={ShoppingList} />
          <Route path='/404' component={NoMatch} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
