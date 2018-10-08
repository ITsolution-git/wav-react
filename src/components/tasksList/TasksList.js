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
import routes from '../../constants/Routes';
import Dialog from '../shared/Dialog';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showTipsModal: false
        };
    }

    goToTask = (task, taskRoute) => {
        const { state } = task.voter_metaData || {};
        this.props.actions.getStateInfo(state);
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
        const { showTipsDialog } = this.state;
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
                                    <div className="tile" onClick={() => this.setState({ showTipsDialog: true })}>
                                        <div className={viewProps.tileClass}>
                                            Tips for talking <br />
                                            to your friends
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} xs={6} id="tile-div" onClick={() => this.onLink(routes.faq)}>
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
                <Dialog show={showTipsDialog} closeButton onClose={() => this.setState({ showTipsDialog: false })}>
                    <div id="btw-tips-dialog">
                        <div id="title" className="title-24-light-blue">
                            Tips on Talking to Friends Voting
                        </div>
                        <div className="text-15-dark-blue-bold">
                            So you want to help friends vote! Congratulations! You are now a shepherd
                            of democracy! <br />
                            <br />
                            Luckily, lots of folks done studies about what works best when trying to
                            register a new voter. We've boiled this stuff down to a few handy tips! <br />
                            <br />
                            So! Here are the 4 things you want to keep in mind when talking to your friends
                            about voting: <br />
                            <br />
                            Be clear with your friends about how long stuff will take.
                            A big psychological hurdle to first time voters is the mistaken assumption that registering or voting takes hours and involves lots of red tape.
                            Making it clear to your friends that they can hop on vote.org and register in 2 minutes (literally) helps to overcome this barrier. <br />
                            { this.isDesktop() &&
                             <span>
                                Know which issues your friends care about and talk about those in the context of voting. Most young voters don’t associate voting with their everyday lives.
                                But linking voting with things that affect your friends all the time makes it more likely that they’ll view voting as salient to their lives.
                                If you know your friend works for minimum wage, talk about ballot measures that would increase the minimum wage!
                                If you know your friend is frustrated about her health care, make it clear that voting for officials with good healthcare policies would make a positive impact on her life.
                             </span> }
                        </div>
                    </div>
                </Dialog>
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