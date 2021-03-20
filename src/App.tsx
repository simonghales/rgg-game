import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Game, GameWithEditor} from './game/Game';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/play">
            <Game/>
          </Route>
          <Route path="/">
            <GameWithEditor/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
