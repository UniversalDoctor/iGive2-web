import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import RecoverPassword from './pages/public/RecoverPassword';
import RecoverPasswordConfirm from './pages/public/RecoverPasswordConfirm';
import VerifyAccount from './pages/public/VerifyAccount';

import Profile from './pages/Profile';
import Login from './pages/public/Login';
import StudiesList from './pages/studies/List';
import CreateNewStudy from './pages/studies/Create';
import StudiesDashboard from './pages/studies/Dashboard';
import CreateForm from './pages/forms/Create';

const App = () => {
  const authToken = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={() => {
          if (authToken) return <Redirect to="/studies" />;
          return <Redirect to="/signin" />;
        }}
      />
      <Route path="/signin" exact component={Login} />
      <Route path="/recover-password" exact component={RecoverPassword} />
      <Route path="/recover-password-confirm" exact component={RecoverPasswordConfirm} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/verify-account" exact component={VerifyAccount} />
      <Route path="/studies" exact component={StudiesList} />
      <Switch>
        <Route path="/studies/new" component={CreateNewStudy} />
        <Route path="/studies/:id" exact component={StudiesDashboard} />
        <Route path="/studies/:id/forms/:formId" component={CreateForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
