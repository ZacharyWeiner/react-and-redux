import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseApp} from '../firebase.js';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';

class App extends Component{

  signOut(){
    firebaseApp.auth().signOut();
  }


  render(){
    return(
    <div style={{margin: '5px'}}>
      <h3 className='title'>Goal List App </h3>
      <div className='title'><AddGoal /></div>
      <hr/>
      <h4> Goals </h4>
      <div className='title'><GoalList /></div>
      <hr/>
      <h4> Completed Goals </h4>
      <CompleteGoalList />
      <hr/>
      <button
        className='btn btn-danger'
        onClick={() => this.signOut()}>
        Sign Out
      </button>
    </div>
  )}
}

function mapStateToProps(state){
  //console.log('state from mapToProps', state);
  return {}
}

export default connect(mapStateToProps, null)(App);
