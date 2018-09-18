import React, {Component} from 'react';
import {firebaseApp } from '../firebase.js'

import {Link} from 'react-router';
import '../app.css'

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }
  signUp(){
    console.log('this.state', this.state);
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);
      this.setState({error});
    });
  }

  render(){
    return(
    <div className="form-inline">
      <h2> SignUp </h2>
      <div className='form-group'>
        <input
          className='form-control'
          type='text'
          placeholder='email@email.com'
          onChange={event => this.setState({email: event.target.value})}
        />
        <input
          className='form-control'
          type='password'
          placeholder='password'
          onChange={event => this.setState({password: event.target.value})}
        />
        <button
          className='btn btn-primary'
          type='button'
          onClick={() => this.signUp()}>
          SignUp
        </button>
      <div>{this.state.error.message}</div>
      <div> <Link to={'/signin'}> Already a User? Sign In Instead </Link> </div>
    </div>
  </div>
  )}
}

export default SignUp;
