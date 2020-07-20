import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

export class Header extends Component {
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/');
    }


    render() {

        const loginLink = (
            <div style={{ width: '100%', zIndex: 99 }} className="position-fixed m-auto">
                <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                    <Link to="/" className="navbar-brand">Vmail</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
        const userLink = (
            <nav style={{ width: '100%', zIndex: 99 }} className="navbar navbar-expand-lg position-fixed navbar-dark bg-danger">
                <Link className="navbar-brand" to="/">Vmail</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/profile">Profile <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/newpost">Ask Question <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" onClick={this.logOut.bind(this)} to="#">
                                Logout
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );

        return (
            <div>
                {localStorage.token ? userLink : loginLink}
            </div>
        );
    }
}

export default withRouter(Header);
