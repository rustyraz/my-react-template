import React from 'react';
import { Render } from 'react-dom';

export default class TodosListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isEditing : false
    };
  }

  renderDefaultActionSection(){
    if(this.state.isEditing){
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this)} class="btn waves-light waves-effect green">Save</button>
          <button onClick={this.onCancelClick.bind(this)} class="btn waves-light waves-effect deep-orange accent-4">Cancel</button>
        </td>
      );
    }

    return (
      <td>
        <button onClick={this.onEditClick.bind(this)} class="btn waves-light waves-effect">Edit</button>
        <button onClick={this.props.deleteTask.bind(this, this.props.task)} class="btn waves-light waves-effect red accent-4">Delete</button>
      </td>
    );
  }

  renderTaskSection(){
    const { task, isComplete } = this.props;

    const taskStyle = {
      color : isComplete ? 'green' : "red",
      cursor : "pointer"
    };

    //render an input box
    if(this.state.isEditing){
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput" />
          </form>
        </td>
      );
    }

    return (
      <td
        style={taskStyle}
        onClick={this.props.toggleTask.bind(this, task)}
        >
        {task}
      </td>
    );
  }

  render(){
    return (
      <tr>
        {this.renderTaskSection()}
        {this.renderDefaultActionSection()}
      </tr>
    );
  }

  onSaveClick(e){
    e.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({ isEditing : false })
  }

  onEditClick(){
    this.setState({ isEditing : true });
  }

  onCancelClick(){
    this.setState({ isEditing : false });
  }
}
