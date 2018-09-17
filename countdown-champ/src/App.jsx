import React, {Component} from 'react';
import Clock from './clock.jsx'
import './app.css'

import {Form, FormControl, Button} from 'react-bootstrap';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      deadline: 'October 1, 2018',
      newDeadline: ''
    };
  }

  render(){
    return (
      <div className='App'>
        <div className="app-title">
          Countdown To {this.state.deadline}
        </div>
        <Clock
          deadline={this.state.deadline}
        />
        <Form inline >
          <FormControl
            className='Dealine-input'
            placeholder='new date'
            onChange={event => this.setState({newDeadline: event.target.value})}
            ></FormControl>
          <Button onClick={() => this.changeDeadline()}>
            Submit
          </Button>
      </Form>
    </div>
    )
  }

 changeDeadline(){
  this.setState({deadline: this.state.newDeadline});
 }
}


export default App;
