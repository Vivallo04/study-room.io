import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home  from './core/Home';
import Users from "./user/User";
import SignUp  from "./user/SignUp";


/**
 *
 * @returns {JSX.Element}
 * @constructor None
 */
const MainRouter = () => {
  return (<div>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/users"  component={Users}/>
          <Route path="/signup" component={SignUp}/>
      </Switch>
  </div>);
};

export default MainRouter;