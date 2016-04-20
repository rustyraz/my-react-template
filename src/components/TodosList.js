import React from 'react';
import { Render } from 'react-dom';
import _ from 'lodash';
import TodosListHeader from './TodosListHeader';
import TodosListItem from './TodosListItem';


export default class TodoList extends React.Component {

  renderItems(){
    //we do not need to pass all the props
    const props = _.omit(this.props, 'todos');
    const todos = this.props.todos;
    return _.map(todos, (todo,index) => <TodosListItem key={index} {...todo} {...props} />);
  }

  render(){
    return (
      <div>
        <table>
          <TodosListHeader />
          <tbody>
              {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
}
