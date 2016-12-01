import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Bitcoin Exchange</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header