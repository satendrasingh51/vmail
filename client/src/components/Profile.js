import React, { Component } from 'react'
import Axios from 'axios';
import Mypost from './Mypost';

export class Profile extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false
        this.state = {
            userData: {},
            msg: {},
            loggedIn
        }
    }

    async componentDidMount() {
        try {

            // Get token from localStorage
            const token = localStorage.getItem('token')
            // Headers
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            if (token) {
                config.headers['x-auth-token'] = token;
            }

            await Axios.get(`/api/profile`, config)
                .then(res => {
                    this.setState({ userData: res.data })
                })
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                this.setState({
                    loggedIn: false
                })
                localStorage.removeItem('token')
                this.props.history.push('/login')
            }
        }
    }
    render() {
        const { userData } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    {
                        userData ?
                            <div className="card-group col-md-3 my-5 ">
                                <div className="card mt-3 position-fixed">
                                    <img className="card-img-top" src={`/images/${userData.image}`} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Profile</h5>
                                        <hr />
                                        <p className="card-text"><b>Username</b><span className="float-right">{userData.username}</span></p>
                                        <p className="card-text"><b>Name </b> <span className="float-right"> {userData.name} </span></p>
                                        <p className="card-text"><b>Mobile </b> <span className="float-right"> {userData.mobile} </span></p>
                                        <p className="card-text"><b>Date of Birth </b> <span className="float-right"> {userData.dob} </span></p>
                                        <p className="card-text"><b>Gender </b> <span className="float-right"> {userData.gender} </span></p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{userData.date} </small>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    <div className="col-md-8 m-auto">
                        <div className="card-group my-5">
                            <Mypost />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Profile
