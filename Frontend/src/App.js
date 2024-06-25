import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import store from './store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' Component={Login}/>
          <Route path='/' Component={Register}/>
          <Route path='/register' Component={Register}/>
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
