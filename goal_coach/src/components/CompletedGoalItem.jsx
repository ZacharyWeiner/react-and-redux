import React, {Component} from 'react';
import {connect} from 'react-redux';


class CompletedGoalItem extends Component{
  const
  render(){
    let {email, title, serverKey} = this.props.completedGoal;
    return(
    <div style={{margin: '5px'}} key={serverKey}>
      <strong> {title} </strong>
      <span style={{marginRight: '5px'}}> Completed By <em>{email} </em></span>
    </div>
    )
  }
}


export default CompletedGoalItem;
