import React from 'react';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import Homepage from './pages/homepage';
import Catalog from './pages/catalog';
import NavBar from './components/NavBar';
import ErrorPage from './components/error';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/cart';
import ProfilePage from './pages/profile';
import CategoryPage from './pages/category';
import CategoriesPage from './pages/categories';
import SearchPage from './pages/search';
import AdminPage from './pages/admin';

import OAuthLoginFlow from './pages/oauthlogin';

import LoginForm from './pages/login';
import ResetForm from './pages/reset';
import ResetSubmitForm from './pages/resetSubmit';
import RegisterForm from './pages/register';

export default function router() {
  return <Router>
    <NavBar />
    <Switch>
      <Route path='/catalog'>
        <Catalog />
      </Route>
      <Route path='/item/:id' component={ItemPage} />
      <Route path='/category' exact component={CategoriesPage} />
      <Route path='/category/:id' component={CategoryPage} />
      <Route path='/cart' component={CartPage} />
      <Route path='/admin' component={AdminPage} />
      <Route path='/search' component={SearchPage} />
      <Route path='/login' exact component={LoginForm} />
      <Route path='/login/:code' exact component={OAuthLoginFlow} />
      <Route path='/register' component={RegisterForm} />
      <Route path='/reset' exact component={ResetForm} />
      <Route path='/reset/:email/:code' component={ResetSubmitForm} />
      <Route path='/profile' component={ProfilePage} />
      <Route exact path='/'>
        <Homepage />
      </Route>
      {/* ERROR PAGE*/}
      <Route component={ErrorPage} path='/' />
    </Switch>
  </Router>;
}
