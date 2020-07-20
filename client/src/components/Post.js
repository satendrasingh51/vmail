import React, { Component } from 'react';
import Axios from 'axios';
// import Moment from 'react-moment'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'; // ES6

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            post: [],
            msg: {}
        }

    }


    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
        ],
    }

    formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet',
        'link', 'image'
    ]

    changeHandle = e => {
        this.setState({ comment: e })
    }

    submitHandle = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                comment: this.state.comment,
            }
            // Get token from localStorage
            const token = localStorage.getItem('token')
            // Headers
            const config = {
                headers: {
                    "Content-type": "Application/json"
                }
            };

            if (token) {
                config.headers['x-auth-token'] = token;
            }
            const res = await Axios.post(`/api/comment/${this.props.match.params.title}`, newData, config)
            if (res.data) {
                this.setState({ comment: '' })
            }
        } catch (error) {
            if (error) {
                this.setState({ msg: error.response.data.msg })
            }
        }
    }

    /** Like code */
    likeHeandle = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                comment: this.state.comment,
            }
            // Get token from localStorage
            const token = localStorage.getItem('token')
            // Headers
            const config = {
                headers: {
                    "Content-type": "Application/json"
                }
            };

            if (token) {
                config.headers['x-auth-token'] = token;
            }
            const res = await Axios.put(`/api/like/${this.props.match.params.title}`, newData, config)
            if (res.data) {
                this.setState(res.data)
            }
        } catch (error) {
            if (error) {
                this.setState({ msg: error.response.data.msg })
            }
        }
    }

    async componentDidMount() {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            await Axios.get(`/api/post/${this.props.match.params.title}`, config)
                .then(res => {
                    this.setState({ post: res.data })
                })
        } catch (error) {
            if (error) {
                this.props.history.push('/')
            }
        }
    }
    render() {
        const { post } = this.state;
        const comments = this.state.post.comment;
        const likes = this.state.post.likes
        return (
            <div>
                <div className="col-md-6 m-auto" style={{ paddingTop: '6rem' }}>
                    {
                        post ?
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={`/images/${post.image}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} className="card-img-top" alt="..." />
                                </div>
                                <div className="col-md-11">
                                    <div className="card my-2 shadow">
                                        <div className="card-header">
                                            <h3 >{post.title} </h3> &nbsp;&nbsp;
                                        {/* <Moment format='DD/MM/YYYY'> */}
                                            <p>{post.date}</p>
                                            {/* </Moment> */}
                                        </div>
                                        <div id="textarea" className="card-body">
                                            <div className="card-text" dangerouslySetInnerHTML={{ __html: post.textarea }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    {
                        comments ? comments.map((comment, index) => {
                            return (
                                <div key={index} className="row my-2">
                                    <div className="col-md-1">
                                        <img src={`/images/${comment.image}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} className="card-img-top" alt="..." />
                                        <div className="mt-5" onClick={this.likeHeandle}> 
                                            {likes ? <div>{likes.length}<i style={{fontSize: '50px', color: 'gray'}} className="fa fa-gratipay"></i></div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-11">
                                        <div className="card shadow">
                                            <div className="card-header">
                                                <p>{comment.name}</p>
                                                <p>{comment.date}</p>
                                            </div>
                                            <div className="card-body">
                                                <div dangerouslySetInnerHTML={{ __html: comment.comment }} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                    }

                    <div className="card shadow my-5">
                        <div className="card-header">Answer/Reply</div>
                        <div className="card-body">
                            <form onSubmit={this.submitHandle}>
                                <div className="form-group">
                                    <ReactQuill value={this.state.comment}
                                        onChange={this.changeHandle}
                                        name="comment"
                                        theme="snow"
                                        modules={this.modules}
                                        formats={this.formats}
                                    />
                                </div>
                                <input type="submit" name="btn" id="btn" className="btn btn-danger" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post
