import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goalRef} from '../firebase.js';
class AddGoal extends Component{
  constructor(props){
    super(props);

    this.state = {
      title: '',

    }
  }

  addGoal(){
    console.log('this', this);
    const {email} = this.props.user;
    const {title} = this.state;
    goalRef.push({email, title});
  }

  render(){
    return(
      <div className='form-inline'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Add Goal'
            className='form-control'
            style={{marginRight: '5px'}}
            onChange ={event => this.setState({title: event.target.value })} />

          <button
            className='btn btn-success'
            type='button'
            onClick={()=> this.addGoal()}
          > Submit
          </button>

        </div>
      </div>
  )}
}

function mapStateToProps(state){
  const {user} = state;
  //console.log('state in add goal ', state);
  return({user});
}
export default connect(mapStateToProps, null) (AddGoal);
