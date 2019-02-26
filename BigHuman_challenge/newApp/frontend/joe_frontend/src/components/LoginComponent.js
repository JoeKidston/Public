import React, {Component} from 'react';
import {Form, Label, Input, Button} from 'reactstrap'; 
import '../login.css';
import AuthHandler from '../Authorise'; 
import BrandComponent from './BrandComponent';
import RegistrationComponent from './RegistrationComponent';
import {Link} from 'react-router-dom';
import bcrypt from 'bcrypt-nodejs';

class Login extends Component {
    constructor(props) {
        super(props) 
        this.state = {} 
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this) 
        this.Auth = new AuthHandler('/api'); 
    }

    componentWillMount() { // Don't let logged-in users revisit the log-in screen  
        if(this.Auth.loggedIn()) {
          this.props.history.replace('/api/plants') // Go back to main page  
        }
      }

    handleChange(event) { 
        this.setState({error:null}) 
        this.setState({[event.target.name]: event.target.value}) 
    }

    handleSubmit(event) {
        event.preventDefault() // Stops the 'Sign in' button from POSTing (and refreshing the page)
        this.Auth.fetchHash(this.state.email, this.state.password)
            .then((res, err) => {
                if(res.message) this.setState({error:res.message}) // Error text
                else if(bcrypt.compareSync(this.state.password, res.password)) { // Compare the hashes
                    this.Auth.login(this.state.email, this.state.password) 
                        .then((res, err) => {
                            if(res.message) this.setState({error:res.message}) // Error text 
                            else this.props.history.replace('/') // Allow through to main screen :)  
                        })
                } else this.setState({error:"Email and/or password incorrect. Try again!"})
            })
    };

    displayErrorMessages() { // Returns a red error box if, in fact, 'this.state.error' exists
        return this.state.error && <div className="alert alert-danger">{this.state.error}</div>
    }

    render() {
        return (
            <div>
                <BrandComponent />
                <Form className="form-signin" onSubmit={this.handleSubmit}> 
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <Label htmlFor="inputEmail" className="sr-only">Email</Label>
                    <Input type="email" id="inputEmail" name="email" placeholder="Email" onChange={this.handleChange} required autoFocus />
                    <Label htmlFor="inputPassword" className="sr-only" >Password</Label>
                    <Input type="password" id="inputPassword" name="password" placeholder="Password" onChange={this.handleChange} required />
                    {this.displayErrorMessages()}
                    <Button color="primary" size="lg" block type="submit" >Sign in</Button><br/>
                </Form>
                <Link to="/api/register">Sign Up</Link>        
            </div>
        );
    }
}

export default Login;