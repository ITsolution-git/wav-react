import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import { loadTaskList } from '../../actions/TaskListAction';
import Spinner from '../shared/Spinner';
import { resolveTaskData } from '../../helpers/TaskHelper';
import BaseComponent from '../shared/BaseComponent';
import { getStateInfo } from '../../actions/TaskAction';
import ContentLayout from '../layout/ContentLayout';
import Icon from '../shared/Icon';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    goToTask = (task, taskRoute) => {
        this.props.actions.getStateInfo(task.voter_metaData.state);
        this.onLink(`${taskRoute}?taskId=${task._id}`);
    };

    componentWillMount() {
        this.props.actions.loadTaskList();
    }

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                titleClass: 'title-32-blue',
                taskName: 'text-18-dark-blue-bold',
                tileClass: 'title-20-light-blue'
            }
        }
        return {
            titleClass: 'title-32-light-blue',
            taskName: 'title-16-blue',
            tileClass: 'title-16-white'
        }
    };

    render() {
        const { taskList: {
            tasks = [],
            isFetching
        }} = this.props;

        const viewProps = this.getViewProps();

        return (
            <ContentLayout>
                <div className='bwt-task-list container'>
                    <Spinner height={300} loading={isFetching} />
                    <div id="title" className={viewProps.titleClass}>My Actions</div>
                    <Row>
                        <Col md={7}>
                            <div className='task-list'>
                                { !tasks.length && <h2 style={{color:"black"}}>You have no new tasks.</h2>}
                                { tasks.map((task, i) => {
                                    const taskData = resolveTaskData(task);
                                    return (
                                        <Row key={i} className='task no-margin'>
                                            <Col md={9} xs={10}>
                                                <div className={viewProps.taskName}>{ taskData.description }</div>
                                            </Col>
                                            <Col md={3} xs={2} className='link' onClick={() => this.goToTask(taskData, taskData.route)}>
                                                { this.isDesktop()
                                                    ? <div>
                                                        <span className="link-medium-dark-blue">Get Started</span>
                                                        <Icon name="arrow-right-black" width="25px" height="25px" />
                                                      </div>
                                                    : <div className="arrow-mobile">
                                                        <Icon name="arrow-right" width="20px" height="20px" />
                                                      </div>
                                                }
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col md={5} xs={12}>
                            <Row>
                                <Col md={12} xs={6} id="tile-div">
                                    <div className="tile">
                                        <div className={viewProps.tileClass}>
                                            Tips for talking <br />
                                            to your friends
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} xs={6} id="tile-div">
                                    <div className="tile">
                                        <div className={viewProps.tileClass}>
                                            Voting FAQs
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadTaskList, getStateInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskList));