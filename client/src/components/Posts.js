import React, { Component } from 'react'
import Axios from 'axios';
// import Moment from 'react-moment';
import { Link } from 'react-router-dom'

export class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: {},
            msg: {},
        }
    }

    async componentDidMount() {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            await Axios.get(`/api/allposts`, config)
                .then(res => {
                    const reverseData = res.data.reverse()
                    this.setState({ posts: reverseData })
                })
        } catch (error) {
            if (error) {
                this.props.history.push('/')
            }
        }
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="container-fluid">
                <div className="col-md-8 m-auto" style={{ paddingTop: '6rem' }}>
                    {/* <h4 className="text text-center" >Posts</h4> */}
                    {
                        posts.length ? posts.map((post, index) =>
                            <div key={index}>
                                <div className="row">
                                    <div className="col-md-1 float-right">
                                        <img src={`/images/${post.image}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card my-2 shadow">
                                            <div className="card-header">
                                                <div className="row">
                                                    <p className="float-right">{post.postBy.username} </p> &nbsp; &nbsp; <br />
                                                    <p>
                                                        {/* <Moment format="YYYY/MM/DD"> */}
                                                        {post.date}
                                                        {/* </Moment> */} 
                                                    </p>
                                                </div>
                                            </div>
                                            <div id="textarea" className="card-body">
                                                <Link to={`/post/${post._id}`}>
                                                    <b className="card-text" > {post.title}</b>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                            : null
                    }
                </div>
            </div>
        )
    }
}


export default Posts
