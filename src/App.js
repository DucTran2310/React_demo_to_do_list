import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            missions: [], //id :unique,name,status State
            isDisplayForm: false,
            keyword: '',
            filterName: '',
            filterStatus: '-1',
            itemEditing: null,
            sortBy: 'name',
            sortValue: 1
        };
    }

    // Sử dụng componentDidmount để refresh để gắn vào missions
    componentDidMount() {
        if (localStorage && localStorage.getItem('missions')) {
            var mission_change = JSON.parse(localStorage.getItem('missions'));
            this.setState({
                missions: mission_change
            });
        }
    }

    generateID() {
        var randomstring = require("randomstring");
        return randomstring.generate(10);
    }

    findIndex = (id) => {
        var { missions } = this.state;
        var result = -1;
        missions.forEach((missions, index) => {
            if (missions.id === id) {
                result = index;
            }
        });
        return result;
    }

    onUpdateStatus = (id) => {
        // console.log(id);
        var { missions } = this.state;
        // var index = this.findIndex(id);
        var index = this.findIndex(id);
        missions[index].status = !missions[index].status;
        this.setState({
            missions: missions
        });
        localStorage.setItem('missions', JSON.stringify(missions));
    }

    onSave = (data) => {
        var { missions } = this.state;
        data.status = data.status === 'true' ? true : false;
        if (data.id === '') {
            data.id = this.generateID();
            missions.push(data);
        } else {
            //Edit
            var index = this.findIndex(data.id);
            missions[index] = data;
        }
        this.setState({
            missions: missions
        });
        localStorage.setItem('missions', JSON.stringify(missions));
    }

    onToggleForm = () => {
        if (this.state.itemEditing !== null) {
            this.setState({
                itemEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm
            });
        }
    }

    onExitForm = () => {
        this.setState({
            isDisplayForm: false,
            itemEditing: null
        });
    }

    onDeleteTask = (id) => {
        var { missions } = this.state;
        var index = this.findIndex(id);
        missions.splice(index, 1);
        this.setState({
            missions: missions
        });
        localStorage.setItem('missions', JSON.stringify(missions));
        this.onExitForm();
    }

    onSearch = (keyword) => {
        //console.log(keyword);
        this.setState({
            keyword: keyword
        });
    }

    onFilter = (filterName, filterStatus) => {
        //console.log(filterName, '-', filterStatus);
        //filterStatus = parseInt(filterStatus, 10);
        //filterStatus = +filterStatus;
        //console.log(typeof filterStatus);
        this.setState({
            filterName: filterName,
            filterStatus: filterStatus
        });
    }

    onSelectedItem = (item) => {
        this.setState({
            itemEditing: item,
            isDisplayForm: true
        })
    }

    onSort = (sortBy, sortValue) => {
        //console.log(sortBy, '-', sortValue);
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }

    render() {
        var {
            missions,
            isDisplayForm,
            keyword,
            filterName,
            filterStatus,
            itemEditing,
            sortBy,
            sortValue
        } = this.state;

        missions = missions.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        if (filterName) {
            // missions = missions.filter((task) => {
            //     //console.log(task);
            //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
            // });
            missions = missions.filter((task) => {
                return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
            });
        }
        // !== null, !== undefined, !== 0
        if (filterStatus) {
            missions = missions.filter((task) => {
                if (filterStatus === '-1' || filterStatus === -1) {
                    return task;
                } else {
                    return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
                }
            });
        }
        //console.log(sortBy, '-', sortValue);
        if (sortBy === 'name') {
            missions.sort((a, b) => {
                if (a.name > b.name) return sortValue;//so sanh index cua bang chu so
                else if (a.name < b.name) return -sortValue;
                else return 0;
            });
        } else {
            missions.sort((a, b) => {
                if (a.status > b.status) return -sortValue;// so sanh gia tri cua status
                else if (a.status < b.status) return sortValue;
                else return 0;
            });
        }
        // Kiem tra elmTaskForm neu isDisplayForm bang true thi do ra TaskForm ko thi do ra rong
        var elmForm = isDisplayForm === true ? <TaskForm
            onSave={this.onSave}
            onExitForm={this.onExitForm}
            itemEditing={itemEditing}
        /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/* TaskForm  */}
                        {elmForm}
                    </div>
                    <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        {/* Seach-Sort */}
                        <TaskControl
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        {/* TaskList  */}
                        <TaskList
                            taskList={missions}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            filterName={filterName}
                            filterStatus={filterStatus}
                            onFilter={this.onFilter}
                            onSelectedItem={this.onSelectedItem}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
