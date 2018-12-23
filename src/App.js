import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as UserActions from "./actions/UserActions";
import Header from "./components/Header";
import Table from "./components/Table";
import Footer from "./components/Footer";
import PageNav from "./components/PageNav";

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

    goOnPage = (page) => {
        if(page >= 0 && page <= this.props.user.maxPages - 1){
            this.setState({page: page});
            this.props.actions.fetchTableForPage(page, this.state.count);
        }
    };

    onSearchChange = (event) => {
        this.props.actions.searchInTable(event.target.value);
    };

    render() {
        return (
            <div className="App">
                <Header onCountChange={this.onCountChange} onSearchChange={this.onSearchChange}/>
                <Table
                    headings={UserActions.getTableCols(this.props.user.table)}
                    data={this.props.user.sortedTable}
                />
                <div className={'app-footer'}>
                    <Footer
                        count={this.state.count}
                        page={this.state.page}
                        rowsCount={this.props.user.table.length}
                        rowsFilteredCount={this.props.user.filteredTable.length}
                        filtered={this.props.user.filtered}
                    />
                    <PageNav
                        maxPages={this.props.user.maxPages}
                        currentPage={this.state.page}
                        goOnPage={this.goOnPage}
                    />
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
