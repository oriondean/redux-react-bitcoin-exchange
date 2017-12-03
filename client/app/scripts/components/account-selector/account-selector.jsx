import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

import './account-selector.scss';

const AccountSelector = ({ accounts, selected, changeAccount }) => {
  const options = accounts.map(account => <option key={account}>{account}</option>);

  return (
    <div className="account-selector-container panel-container">
      <h5 className="header">ACCOUNT SELECTOR</h5>
      <select
        name="account-selector"
        className="form-control"
        value={selected}
        onChange={event => changeAccount(event.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

AccountSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  accounts: PropTypes.instanceOf(Immutable.Set).isRequired,
  changeAccount: PropTypes.func.isRequired,
};

export default AccountSelector;
