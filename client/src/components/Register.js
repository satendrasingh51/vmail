import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {

    constructor(props) {
        super(props);
        let token = localStorage.getItem('token')
        if (token) {
            this.props.history.push('/profile')
        }
        this.state = {
            username: '',
            name: '',
            password: '',
            mobile: '',
            dob: '',
            gender: '',
            token: null,
            imagename: 'Choose File',
            image: '',
            msg: {},
            successMsg: ''
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.changePhoto = this.changePhoto.bind(this)

    }

    changePhoto = e => {
        this.setState({ image: e.target.files[0] });
        this.setState({ imagename: e.target.files[0].name });
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        e.preventDefault();

        formData.append('image', this.state.image)
        formData.append('username', this.state.username)
        formData.append('name', this.state.name)
        formData.append('password', this.state.password)
        formData.append('mobile', this.state.mobile)
        formData.append('gender', this.state.gender)
        formData.append('dob', this.state.dob)


        try {
            const res = await axios.post('/user/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'enctype': 'multipart/form-data'
                }
            });
            this.setState({ token: res.data })
            this.setState({ successMsg: res.data.msg })
            if (res.data) {
                this.props.history.push('/');
            }
        } catch (error) {
            // console.log(error.response);

            if (error.response.data.msg) {
                this.setState({ msg: error.response.data.msg })
            } else {
                this.setState({ msg: error.response.data.errors })
            }
        }
    }

    render() {
        const { msg } = this.state
        return (
            <Fragment>
                <div className="container">
                    <div style={{ paddingTop: '6rem' }} className="row col-md-6 m-auto">
                        <div className="card mb-5 shadow">
                            <h3 className="card-header bg-danger text-center text-light">Create Account</h3>
                            <div className="card-body">
                                {msg.length ? msg.map(errMsg =>
                                    <div key={errMsg.msg} className="alert alert-danger" role="alert" aria-live="polite" aria-atomic="true" data-delay="100">
                                        <div role="alert" aria-live="assertive" aria-atomic="true">{errMsg.msg}
                                        </div>
                                    </div>) : null
                                }
                                {
                                    this.state.successMsg ?
                                        toast.success(this.state.successMsg, {
                                            position: toast.POSITION.TOP_CENTER
                                        }) : null
                                }
                                <ToastContainer />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" value={this.state.name} id="name" onChange={this.changeHandler} placeholder="Enter Name" className="form-control" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="username">UserName</label>
                                            <input type="text" name="username" value={this.state.username} id="username" onChange={this.changeHandler} placeholder="Enter User Name" className="form-control" />
                                            <small id="emailHelp" className="form-text text-muted">User Name Fill without space.</small>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" value={this.state.password} id="password" onChange={this.changeHandler} placeholder="Enter Password" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile">Mobile</label>
                                        <input type="text" name="mobile" id="mobile" value={this.state.mobile} onChange={this.changeHandler} placeholder="Enter Mobile" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dob">Date of Birth</label>
                                        <input type="date" name="dob" id="dob" value={this.state.dob} onChange={this.changeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group" onChange={this.changeHandler}>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="customRadio1" value="Male" name="gender" className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="customRadio1">Male</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="customRadio2" value="Female" name="gender" className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="customRadio2">Female</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" name="image" id="customFile" onChange={this.changePhoto} />
                                            <label className="custom-file-label" htmlFor="customFile">{this.state.imagename}</label>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        <input type="submit" className="btn btn-danger float-right" />
                                        <Link to="/login">Sign in instead</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Register;
