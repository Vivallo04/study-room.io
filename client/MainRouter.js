import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './core/Home';
import Users from "./user/User";


/**
 *
 * @returns {JSX.Element}
 * @constructor None
 */
const MainRouter = () => {
  return ( <div>
      <Routes>
          <Route exact path="/" component={ Home }/>
          <Route path="/users" component={ Users }/>
      </Routes>
  </div>)
}

export default MainRouter;