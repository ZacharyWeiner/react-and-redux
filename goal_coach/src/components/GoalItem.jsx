import React, {Component} from 'react';
import {connect} from 'react-redux';
import {completeGoalRef, goalRef} from '../firebase';


class GoalItem extends Component{
  // constructor(props){
  //   super(props);
  //   const {key, goal} = props;
  // }

  completeGoal(){
    //add to complete goals
    // remove from goals records
    console.log('this.props.user', this.props.user);
    const {email} = this.props.user;
    const {title, serverKey} = this.props.goal;
    completeGoalRef.push({email, title, serverKey});
    goalRef.child(serverKey).remove();
  }

  render(){
    let {email, title} = this.props.goal;
    return(
    <div style={{margin: '5px'}} key={this.key}>
      <strong> {title} </strong>
      <span style={{marginRight: '5px'}}> Submitted By <em>{email} </em></span>
      <button
        className='btn btn-sm btn-primary'
        onClick={() => this.completeGoal()}
      >
      Complete
      </button>
    </div>
    )
  }
}

function mapStateToProps(state){
  const {user} = state;
  return {user};
}

export default connect(mapStateToProps, null)(GoalItem);
