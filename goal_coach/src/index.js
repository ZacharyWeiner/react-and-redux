import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {firebaseApp} from './firebase';
import {logUser} from './actions';
import reducer from './reducers';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import App from './components/app.jsx';


const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user){
    console.log('user has signed in or up', user);
    const {email} = user;
    store.dispatch(logUser(email));
    browserHistory.push('/app');
  }else{
    console.log('user has signed out or needs to sign in');
    browserHistory.replace('/signin');
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router path='/' history={browserHistory}>
      <Route path='/app' components={App} />
      <Route path='/signin' components={SignIn} />
      <Route path='/signup' components={SignUp} />
    </Router>
  </Provider>,
   document.getElementById('root')
)
