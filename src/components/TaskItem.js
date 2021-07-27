import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {

    showStatusElement() {
        return (
            <span
                className={this.props.task.status ? 'label label-danger cur' : 'label label-info cur'}
                onClick={this.onUpdateStatus}
            >{this.props.task.status === true ? 'Kích Hoạt' : 'Ẩn'}</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);// dispatch(actions.deleteItem)
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm(); // dispatch(actions.openForm)
        this.props.onEditTask(this.props.task);
    }

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.task.name}</td>
                <td className="text-center">
                    {this.showStatusElement()}
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning " onClick={this.onEditTask}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger " onClick={this.onDeleteItem}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        //tra ve tasks moi de tu dong cap nhat lai
        //tasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.onDeleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);

