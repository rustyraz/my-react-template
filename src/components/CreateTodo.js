import React from 'react';
import { Render } from 'react-dom';

export default class CreateTodo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error : false
    };
  }
  renderError(){
    if(!this.state.error){ return null };

    return (
      <div style={{ color: "red" }}>{this.state.error}</div>
    );
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleCreateTask.bind(this)} class="col s12">
          <div class="row">
            <div class="input-field col s12">
            <input ref="createInput" type='text' id="todo_task"  />
            <label for="todo_task" >Todo Task Name</label>
            <button class="btn wave-effect wave-light">Create</button>
            {this.renderError()}
            </div>
          </div>

        </form>
      </div>

    );
  }

  handleCreateTask(e){
    e.preventDefault();
    //prevent duplicates

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if(validateInput){
      this.setState({error : validateInput});
      return ;
    }
    this.setState({ error : null });
    this.props.createTask(task);
    this.refs.createInput.value = "";
  }

  validateInput(task){
    if(!task){
      return 'Please enter a task';
    }else if(_.find(this.props.todos, todo => todo.task == task)){
      return 'Task already exists'
    }else{
      return null;
    }
  }

}
