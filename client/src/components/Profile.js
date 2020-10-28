import React, { Component } from 'react'
import Axios from 'axios';
import Mypost from './Mypost';
import Moment from 'react-moment'

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
                    <div className="col-md-3">
                        <div className="card shadow" style={{marginTop: '4rem'}}>
                            <img src={`/images/${userData.image}`} height="300px" className="card-img-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">Profile</h5>
                                <hr />
                                <p className="card-text"><b>Username</b><span className="float-right">{userData.username}</span></p>
                                <p className="card-text"><b>Name </b> <span className="float-right"> {userData.name} </span></p>
                                <p className="card-text"><b>Mobile </b> <span className="float-right"> {userData.mobile} </span></p>
                                <p className="card-text"><b>Date of Birth </b> <span className="float-right">
                                    <Moment format="lll">
                                {userData.dob}
                                    </Moment>  </span></p>
                                <p className="card-text"><b>Gender </b> <span className="float-right"> {userData.gender} </span></p>
                            </div>
                            <div className="card-footer">
                                <p className="text-muted"> <Moment format="lll">{userData.date}</Moment></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="my-5">
                            <Mypost/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile