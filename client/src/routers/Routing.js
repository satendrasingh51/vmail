import React from 'react'
import Login from '../components/Login'
import { Route, Switch, Redirect } from 'react-router-dom'
import Register from '../components/Register'
import Profile from '../components/Profile'
import NewPost from '../components/NewPost'
import Posts from '../components/Posts'
import Post from '../components/Post'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/" />
    }} />

}

const Routing = () => {
    return (
        <section>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Posts} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/post/:title" component={Post}/>
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/newpost" component={NewPost} />
                <Route component={Posts} />
            </Switch>
        </section>
    )
}

export default Routing
