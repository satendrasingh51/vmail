import React, { Component } from 'react'
import Axios from 'axios';


export class Mypost extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false
        this.state = {
            mypost: {},
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

            await Axios.get(`/api/mypost/user`, config)
                .then(res => {
                    const post = res.data.myPost.reverse()
                    this.setState({ mypost: post })
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
        const { mypost } = this.state;
        return (
            <div className="container-fluid">

                {
                    mypost.length ? mypost.map((post, index) =>
                        <div key={index}>
                            <div className="card mt-5 shadow">
                                <div className="card-header">
                                    <p className="card-text"><b className="d-flax">N. &nbsp;</b> {index + 1}</p>
                                    <div className="card-text" dangerouslySetInnerHTML={{ __html: post.title }} />
                                </div>
                                <div className="card-body">
                                    <div className="card-text" dangerouslySetInnerHTML={{ __html: post.textarea }} />
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{post.date} </small>
                                </div>

                            </div>
                            <br />
                        </div>
                    )
                        : <h4 className="text text-center">No post yet</h4>
                }
            </div>
        )
    }
}


export default Mypost
