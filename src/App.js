import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as UserActions from "./actions/UserActions";

const initialState = {
    page: 0,
    count: 5
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.props.actions.fetchTable();
        this.props.actions.sortTable('ID');
        this.props.actions.fetchTableForPage(this.state.page, this.state.count);
    }

    onCountChange = (event) => {
        this.setState({page: 0, count: event.target.value});
        this.props.actions.fetchTableForPage(0, event.target.value);
    };

    render() {
        console.log(this.props.user.sortedTable);
        const cols = UserActions.getTableCols(this.props.user.table);
        const tableCols = cols.map(item => {
        return(
            <th>{item}</th>
        )
        });
        let tableRows = this.props.user.sortedTable.map(item => {
            return (
                <tr>
                    {cols.map(col => {
                        return <td>{item[col]}</td>
                    })}
                </tr>)
        })
        return (
            <div className="App">
                <div className={'app-header'}>
                    <div>Show
                        <select onChange={this.onCountChange.bind(this)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                        </select>
                        entries per page
                    </div>
                    <div className={'search-items'}>
                        Search:
                        <input type={'search'}/>
                    </div>
                </div>
                <table>
                    <thead>{tableCols}</thead>
                    <tbody>{tableRows}</tbody>
                </table>
                <div className={'app-footer'}>
                    <div>Showing {this.state.count * this.state.page + 1} to {this.state.count * this.state.page + this.state.count} of {this.props.user.table.length} entries</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...UserActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
