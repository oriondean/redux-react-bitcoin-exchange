import { connect } from 'react-redux';
import * as ActionCreators from '../actions/index';
import React from 'react'

// Components
import AccountSelector from '../components/account-selector/account-selector';
import Header from '../components/header/header';
import OrderAction from '../constants/order-action';
import OrderBook from '../components/order-book/order-book';
import OrderDepth from '../components/order-depth/order-depth';
import OrderDepthChart from '../components/order-depth-chart/order-depth-chart';
import OrderEntry from '../components/order-entry/order-entry';
import TradeHistory from '../components/trade-history/trade-history';

class App extends React.Component {
    render() {
        return <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <OrderDepth side={OrderAction.ASK} depth={this.props.askDepth} subscribe={this.props.subscribeOrderDepth} />
                        <OrderDepth side={OrderAction.BID} depth={this.props.bidDepth} subscribe={this.props.subscribeOrderDepth} />
                    </div>
                    <div className="col-lg-7 main">
                        <div className="row">
                            <div className="col-lg-9">
                                <OrderEntry account={this.props.selectedAccount} submitOrder={this.props.submitOrder} />
                            </div>
                            <div className="col-lg-3">
                                <AccountSelector selected={this.props.selectedAccount} accounts={this.props.accounts}
                                    changeAccount={this.props.changeAccount} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <OrderDepthChart bidDepth={this.props.bidDepth} askDepth={this.props.askDepth} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <TradeHistory trades={this.props.trades} subscribe={this.props.subscribeTradeHistory} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <OrderBook orders={this.props.orders} account={this.props.selectedAccount}
                            subscribe={this.props.subscribeOrderBook} />
                    </div>
                </div>
            </div>
        </div>
    }
}

App.propTypes = {
    bidDepth: React.PropTypes.object.isRequired,
    askDepth: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        orders: state.orderBook,
        bidDepth: state.orderDepth.bid,
        askDepth: state.orderDepth.ask,
        selectedAccount: state.accounts.selected,
        accounts: state.accounts.available,
        trades: state.trades
    };
};

const mapDispatchToProps = dispatch => {
    return {
        subscribeOrderBook: account => dispatch(ActionCreators.subscribeOrderBook(account)),
        subscribeOrderDepth: () => dispatch(ActionCreators.subscribeOrderDepth()),
        subscribeTradeHistory: () => dispatch(ActionCreators.subscribeTradeHistory()),
        changeAccount: account => dispatch(ActionCreators.changeAccount(account)),
        submitOrder: order => ActionCreators.submitOrder(order)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);