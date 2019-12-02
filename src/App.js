import React, { useState } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import PrivatRoute from './PrivateRoutes/PrivateRoutes';
import RecipeDetails from './containers/RecipeDetails/RecipeDetails';
import RecipesList from './containers/RecipesList/RecipesList';
import NewRecipe from './containers/NewRecipe/NewRecipe';
import Layout from './components/Layout/Layout';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import Singup from './containers/Auth/SingUp';
import ShoppingList from './containers/ShoppingList/ShoppingList';
import NoMatch from './components/NoMatch/404';
import { AuthContext } from './context/auth';

function App() {
    let [authTokens, setAuthTokens] = useState();

    const setTokens = (data) => {
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <BrowserRouter basename="/quick-shopping/">
                <Layout>
                    <Switch>
                        <Route exact path='/' component={RecipesList} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/singup' component={Singup} />
                        <Route exact path='/recipes' component={RecipesList} />
                        <PrivatRoute exact path='/new_recipe' component={NewRecipe} />
                        <Route exact path='/recipes/:id' component={RecipeDetails} />
                        <PrivatRoute exact path='/shopping_list' component={ShoppingList} />
                        <Route path='/404' component={NoMatch} />
                        <Route component={NoMatch} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
