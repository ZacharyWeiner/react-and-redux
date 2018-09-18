import React, {Component} from 'react';
import {completeGoalRef} from '../firebase';
import {connect} from 'react-redux';
import {setCompleted} from '../actions';
import CompletedGoalItem from './CompletedGoalItem'


class CompleteGoalList extends Component{

  componentDidMount(){
    completeGoalRef.on('value', snap => {
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const {email, title} = completeGoal.val();
        const serverKey = completeGoal.key;
        completeGoals.push({email, title, serverKey});
      })
      console.log('completed goals', completeGoals);
      this.props.setCompleted(completeGoals);
    })
  }
  handleChange(event){
    console.log('event', event);
  }
  render(){
    return(
      <div>
        <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
        {
          this.props.completeGoals.map(goal => {
            return(
             <CompletedGoalItem key={goal.serverKey} completedGoal={goal} />
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  const {completeGoals} = state;
  return {completeGoals};
}
export default connect(mapStateToProps, {setCompleted}) (CompleteGoalList);
