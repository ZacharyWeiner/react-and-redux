import React, {Component} from 'react';
import {goalRef} from '../firebase.js';
import {setGoals} from '../actions';
import {connect} from 'react-redux';
import GoalItem from './GoalItem.jsx';



class GoalList extends Component{
  componentDidMount(){

    goalRef.on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        const {email, title} = goal.val();
        const serverKey = goal.key;
        goals.push({email, title, serverKey});
      })
      console.log('goals', goals);
      this.props.setGoals(goals);
    })
  }

  render(){
    console.log('this.props.goals', this.props.goals);
    return(
    <div>
      {
        this.props.goals.map((goal, k) => {
          return(
            <GoalItem key={k} goal={goal} />
            // <div key={k}>
            //   <div > {goal.email}</div>
            //   <div> {goal.title}</div>
            // </div>
          )
        })
      }
    </div>
  )}
}

function mapStateToProps(state){
  const {goals} = state;
  return({goals});
}

export default connect(mapStateToProps, {setGoals})(GoalList);
