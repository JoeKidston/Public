import React, {Component} from 'react';
import bcrypt from 'bcrypt-nodejs';
import {Form, Label, Input, Button} from 'reactstrap'; 
import '../login.css';
import AuthHandler from '../Authorise'; 
import BrandComponent from './BrandComponent';

class AddForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {} 
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this) 
        this.Auth = new AuthHandler('/'); 
    }

    componentWillMount() { // Don't let logged-in users see this screen  
        if(this.Auth.loggedIn()) {
          this.props.history.replace('/') // Go back to main page 
        }
      }

    handleChange(event) { 
        this.setState({error:null}) // Reset any previous error displays
        this.setState({[event.target.name]: event.target.value}) // Overwrite the target
    }

    handleSubmit(event) { // 'preventDefault' because we only want the page to load once
        event.preventDefault() // This stops the 'Sign in' button from POSTing (and refreshing the page)
        this.Auth.addEmployee(this.state.name, this.state.email, bcrypt.hashSync(this.state.password)) 
        .then((res, err) => {
            if(res.message) this.setState({error:res.message})  
            else this.props.history.replace('/login') // Allow through to log-in screen :)  
        })
    };

    displayErrorMessages() { // Will only return a red error box if, in fact, 'this.state.error' exists
        return this.state.error && <div className="alert alert-danger">{this.state.error}</div>
    }

    render() {
        return (
            <div>
                <BrandComponent />
                <Form className="form-signin" onSubmit={this.handleSubmit}> 
                    <h1 className="h3 mb-3 font-weight-normal">Register :</h1>
                    <Label htmlFor="inputName" className="sr-only" >Name</Label>
                    <Input type="text" id="inputName" name="name" placeholder="Name" onChange={this.handleChange} required autoFocus/>
                    <Label htmlFor="inputEmail" className="sr-only">Email</Label>
                    <Input type="email" id="inputEmail" name="email" placeholder="Email" onChange={this.handleChange} required />
                    <Label htmlFor="inputPassword" className="sr-only" >Password</Label>
                    <Input type="password" id="inputPassword" name="password" placeholder="Password" onChange={this.handleChange} required />
                    {this.displayErrorMessages()}
                    <Button color="primary" size="lg" block type="submit" >Register!</Button><br/>
                </Form>
                <a className="extraOptions" href="/">Cancel</a>
            </div>
        );
    }
}

export default AddForm;