import React from 'react';

import './account-selector.scss';

export default class AccountSelector extends React.Component {
    render() {
        const options = [];

        this.props.accounts.forEach(account => {
            options.push(<option key={account}>{account}</option>)
        });

        return <div className="account-selector-container panel-container">
            <h5 className="header">ACCOUNT SELECTOR</h5>
            <select name="account-selector"
                    className="form-control"
                    value={this.props.selected}
                    onChange={event => this.props.changeAccount(event.target.value)}>
                {options}
            </select>
        </div>
    }
}

AccountSelector.propTypes = {
    selected: React.PropTypes.string.isRequired,
    accounts: React.PropTypes.object.isRequired,
    changeAccount: React.PropTypes.func.isRequired
};