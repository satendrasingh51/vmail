import React, { Component } from 'react'
import Axios from 'axios';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'; // ES6



export class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            textarea: '',
            msg: {},
            successmsg: ''
        }
        this.submitHandle = this.submitHandle.bind(this)
    }

    changeHandle = e => {
        this.setState({ textarea: e })
    }
    quilleditor = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandle = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                title: this.state.title,
                textarea: this.state.textarea
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
            const res = await Axios.post(`/api/newpost`, newData, config)
            if (res.data) {
                this.setState({ successmsg: res.data })
                this.props.history.push('/');
            }
        } catch (error) {
            if (error) {
                this.setState({ msg: error.response.data.msg })
            }
        }
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video']
        ],
    }

    formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet',
        'link', 'image', 'video'
    ]


    render() {
        const { msg, successmsg } = this.state;
        return (
            <div className="container-fluid">
                <div style={{ paddingTop: '6rem' }} className="m-auto col-md-6">
                    <div className="card shadow">
                        <div className="card-header">
                            <h4 className="text-center">Add Post</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.submitHandle}>
                                {
                                    msg.length ? msg.map(errMsg =>
                                        <div key={errMsg.msg} className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {errMsg.msg}
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>) : null
                                }

                                {
                                    successmsg ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        {successmsg.msg}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div> : null
                                }
                                <div className="form-group">
                                    <label htmlFor="title">Question</label>
                                    <textarea value={this.state.title} onChange={this.quilleditor} name="title" id="title" className="form-control" cols="30" rows="2"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="textarea">Body</label>
                                    <ReactQuill value={this.state.textarea}
                                        onChange={this.changeHandle}
                                        name="textarea"
                                        theme="snow"
                                        modules={this.modules}
                                        formats={this.formats}
                                    />
                                </div>
                                <input type="submit" className="btn btn-danger" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPost