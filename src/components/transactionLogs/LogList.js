import React from 'react'
import { Link } from 'react-router-dom'
import Table, { TableBody, TableCell, TableHead, TableRow, TablePagination } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import { Button } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent'

import { getLogList } from '../../actions/TransactionAction';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class LogList extends BaseComponent {

    constructor(props, context) {
        super(props, context);
    
        this.state = {
            data: [],
            searchFilter: '',
            page: 0,
            rowsPerPage: 10,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.transaction.isFetching && nextProps.transaction.isSuccess) {
            this.setState({
                data: nextProps.transaction.logs
            })
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    updateSearchFilter = (e) => {

        this.setState({
            searchFilter: e.target.value
        })
    }

    onSearch = () => {
        if (this.state.searchFilter !== '') {
            console.log('test')
            this.props.actions.getLogList(this.state.searchFilter)
        }
    }

    render() {

        const { rowsPerPage, page, data } = this.state;

        const tableData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

        return (
            <div className="container btw-logs">

                <div className="row">
                    <h2>Transaction Logs</h2>

                    <div className="search-box">
                        <input 
                            type="text" 
                            className="form-control" 
                            width="100" 
                            placeholder="Input username or email"
                            onChange={this.updateSearchFilter} />
                        <Button onClick={this.onSearch}>Search</Button>
                    </div>
                </div>
                <br />

                <Paper>
                    <div style={{overflowX:"auto"}}>
                        <Table>
                            <TableHead className="header">
                                <TableRow>
                                    <TableCell className="header-cell">Date and Time</TableCell>
                                    <TableCell numeric className="header-cell">Transaction Type</TableCell>
                                    <TableCell numeric className="header-cell">Result</TableCell>
                                    <TableCell numeric className="header-cell">Reason</TableCell>
                                    <TableCell numeric className="header-cell">Channel</TableCell>
                                    <TableCell numeric className="header-cell">First Name</TableCell>
                                    <TableCell numeric className="header-cell">Last Name</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    tableData.map( (n,index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Link to={{ pathname: '/transactionLogs/detail', query: n}}>
                                                    {n.timestamp || ''}
                                                </Link>
                                                </TableCell>
                                            <TableCell numeric>{n.transaction_type || ''}</TableCell>
                                            <TableCell numeric>{n.result || ''}</TableCell>
                                            <TableCell numeric>{typeof n.reason === 'string' ? n.reason : n.reason.statusCode}</TableCell>
                                            <TableCell numeric>{n.chanel || ''}</TableCell>
                                            <TableCell numeric>{n.firstname || ''}</TableCell>
                                            <TableCell numeric>{n.lastname || ''}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transaction: state.transaction
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ getLogList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogList));