import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import React from 'react'



function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
    </Router>
  );
}

export default App;
