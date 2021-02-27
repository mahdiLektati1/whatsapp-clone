import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {  BrowserRouter as Router,
          Switch, 
          Route
        } 
from 'react-router-dom';
import {useStateValue} from '../store/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      { !user ? (
          <Login />
        ) : ( 
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )
      }
    </div>
  );
}

export default App;
