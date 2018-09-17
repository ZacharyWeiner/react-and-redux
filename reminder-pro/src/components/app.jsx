import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {addReminder, deleteReminder, clearReminders} from '../actions'

import {bindActionCreators} from 'redux';
import moment from 'moment';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    console.log('this.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    console.log('deleting in application', id);
    console.log('this.props', this.props);
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const {reminders} = this.props;
    return(
      <ul className='list-group col-md-4'>
        {
          reminders.map(reminder => {
            return(
              <li key={reminder.id} className='list-group-item'>
                <div className='list-item'>
                 <div className=''> {reminder.text} </div>
                 <div className=''> <em>{moment(new Date(reminder.dueDate)).fromNow()}</em> </div>
                </div>

                <div
                  className='list-item delete-button'
                  onClick = {() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render(){
    console.log('this.state', this.state);
    return(
      <div className='app'>
        <div className='title'> Reminder App </div>
        <div className='form-inline reminder-form'>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='I have to ... '
              onChange={event => this.setState({text: event.target.value})}/>
            <input
              className='form-control'
              type = 'datetime-local'
              placeholder='deadline '
              onChange={event => this.setState({dueDate: event.target.value})}/>
            <button
              type='button'
              className='btn btn-success'
              onClick={()=> this.addReminder()}>Add Reminder </button>
          </div>
        </div>
        {this.renderReminders()}
         <button
              type='button'
              className='btn btn-danger'
              onClick={()=> this.props.clearReminders()}>Clear Reminders </button>
      </div>
  )}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

function mapStateToProps(state){
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
