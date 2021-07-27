import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1,// all:-1, active:1,deactive:0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
        //console.log(this.state);
    }

    render() {
        //console.log(this.props.todos);
        var { taskList, filterTable, keyword, sort } = this.props;// var tasks =this.props.tasks
        //console.log(filterTable);

        //filter on table
        if (filterTable.name) {
            taskList = taskList.filter((task) => {
                //console.log(task);
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            });
            taskList = taskList.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }
        // !== null, !== undefined, !== 0
        taskList = taskList.filter((task) => {
            if (filterTable.status === -1) {
                return task;
            } else {
                return task.status === (parseInt(filterTable.status, 10) === 1 ? true : false);
            }
        });

        //search
        //console.log(this.props.keyword);
        taskList = taskList.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        //console.log(sortBy, '-', sortValue);
        if (sort.By === 'name') {
            taskList.sort((a, b) => {
                if (a.name > b.name) return sort.value;//so sanh index cua bang chu so
                else if (a.name < b.name) return -sort.value;
                else return 0;
            });
        } else {
            taskList.sort((a, b) => {
                if (a.status > b.status) return -sort.value;// so sanh gia tri cua status
                else if (a.status < b.status) return sort.value;
                else return 0;
            });
        }

        // // Kiem tra elmTaskForm neu isDisplayForm bang true thi do ra TaskForm ko thi do ra rong
        var elmTasks = taskList.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index + 1}
                />
            )
        });

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={this.onChange}
                                        value={this.state.filerName}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={this.onChange}
                                        value={this.state.filterStatus}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {/* TaskItem  */}
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskList: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            //console.log(filter);
            dispatch(actions.filterTask(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
