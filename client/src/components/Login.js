import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false
        const token = localStorage.getItem('token')
        if (token) {
            loggedIn = true
        }
        this.state = {
            username: '',
            password: '',
            msg: {},
            loggedIn
        }
        this.changeHandle = this.changeHandle.bind(this);
        this.submitHendel = this.submitHendel.bind(this)

    }

    changeHandle = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHendel = async (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        const token = () => {
            localStorage.setItem('token', token)
        }
        try {
            const res = await axios.post('/api/login', user, {
                headers: {
                    'Content-type': 'Application/json'
                }
            });
            this.setState({ token: res.data })
            localStorage.setItem('token', res.data.token)
            // console.log('token', res.data.token)
            this.setState({
                loggedIn: true
            })
        } catch (error) {
            if (error.response.data.msg) {
                this.setState({ msg: error.response.data.msg })
            } else {
                this.setState({ msg: error.response.data.errors })
            }
        }

    }
    render() {
        const { msg } = this.state;
        if (this.state.loggedIn) {
            this.props.history.push('/')
        }
        return (
            <div className="container">
                <div style={{ paddingTop: '6rem' }} className="row col-md-6 m-auto">
                    <div className="card shadow">
                        <div className="card-header bg-danger">
                            <h3 className="text-center text-white">
                                Login
                            </h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.submitHendel}>
                                {msg.length ? msg.map(errMsg =>
                                    <div key={errMsg.msg} className="alert alert-danger" role="alert" aria-live="polite" aria-atomic="true" data-delay="100">
                                        <div role="alert" aria-live="assertive" aria-atomic="true">{errMsg.msg}
                                        </div>
                                    </div>) : null
                                }
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" onChange={this.changeHandle} value={this.state.username} name="username" id="username" className="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={this.changeHandle} value={this.state.password} name="password" id="password" className="form-control" placeholder="Enter password" />
                                </div>
                                <p>Not your computer? Use Guest mode to sign in privately. <Link to="/">Learn more</Link>
                                </p>
                                <input type="submit" className="btn btn-danger float-right" />
                                <Link to="/register">Create account</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login
