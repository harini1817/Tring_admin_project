import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/login' Component={Login}/>
          <Route path='/' Component={Register}/>
          <Route path='/register' Component={Register}/>
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>
      </Router>
  );
}

export default App;
