import React, { Fragment, Component } from 'react'
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagename: 'Choose File',
            image: '',
            sig: '',
            signame: 'Choose Fiel',
            pdf: '',
            pdfname: 'Choose File',
            firstname: '',
            email: '',
            mobile: '',
            data: {},
            msg: {}
        }
        this.changePhoto = this.changePhoto.bind(this)
        this.changeSig = this.changeSig.bind(this)
        this.changePdf = this.changePdf.bind(this)
        this.changeHendle = this.changeHendle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changePhoto = e => {
        this.setState({ image: e.target.files[0] });
        this.setState({ imagename: e.target.files[0].name });
    }
    changeSig = e => {
        this.setState({ sig: e.target.files[0] });
        this.setState({ signame: e.target.files[0].name });
    }
    changePdf = e => {
        this.setState({ pdf: e.target.files[0] });
        this.setState({ pdfname: e.target.files[0].name });
    }

    changeHendle = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        e.preventDefault();

        formData.append('image', this.state.image)
        formData.append('sig', this.state.sig)
        formData.append('pdf', this.state.pdf)
        formData.append('firstname', this.state.firstname)
        formData.append('mobile', this.state.mobile)
        formData.append('email', this.state.email)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'enctype': 'multipart/form-data'
            }
        }

        try {
            const res = await axios.post('/user/upload', formData, config);
            this.setState({ data: res.data })
        } catch (error) {
            if (error) {
                this.setState({ msg: error.response.data.msg })
            }
        }
    }

    render() {
        return (
            <Fragment>
                <div className="container mt-5">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.changeHendle} placeholder="Enter name" />
                            <small id="emailHelp" className="form-text text-muted">Fill this is Field without space.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" className="form-control" name="mobile" value={this.state.mobile} onChange={this.changeHendle} placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.changeHendle} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="image" id="customFile" onChange={this.changePhoto} />
                                <label className="custom-file-label" htmlFor="customFile">{this.state.imagename}</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="sig" id="customFile" onChange={this.changeSig} />
                                <label className="custom-file-label" htmlFor="customFile">{this.state.signame}</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="pdf" id="customFile" onChange={this.changePdf} />
                                <label className="custom-file-label" htmlFor="customFile">{this.state.pdfname}</label>
                            </div>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-danger btn-block" />
                    </form>
                </div>
            </Fragment>
        )
    }

}

export default Users
