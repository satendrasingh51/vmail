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
            <div className="container">
                <div className="row">
                    {
                        userData ?
                            <div className="card-group col-md-4 my-5">
                                <div className="card mt-5" style={{ height: "600px" }}>
                                    <img src={`/images/${userData.image}`} style={{ borderRadius: '50%', width: '45%', height: '35%' }} className="card-img-top m-auto" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Profile</h5>
                                        <hr />
                                        <p className="card-text"><b>Vmail &nbsp; &nbsp;</b> {userData.username} </p>
                                        <p className="card-text"><b>Name &nbsp; &nbsp;</b> {userData.name} </p>
                                        <p className="card-text"><b>Mobile &nbsp; &nbsp;</b> {userData.mobile} </p>
                                        <p className="card-text"><b>Date of Birth &nbsp; &nbsp; </b> {userData.dob} </p>
                                        <p className="card-text"><b>Gender &nbsp; &nbsp;</b> {userData.gender} </p>
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
