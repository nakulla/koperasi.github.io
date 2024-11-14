import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginSuccess: false,
            errorMessage: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleLogin = () => {
        const {email, password} = this.state;

        if (email === 'user@gmail.com' && password === '12345') {
            this.setState({loginSuccess: true});
        } else {
            this.setState(
                {loginSuccess: false, errorMessage: 'Email atau kata sandi salah.'}
            );
        }
    };

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to="/Home"/>;
        }

        return (
            <div className="login-pages">
                <div className="login">
                    <h2 className='text-center fw-bold judul'>Login</h2>
                    <Form className='form-login'>
                        <Form.Group controlId="formBasicEmail" className='text-center'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='text-center'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </Form.Group>

                        {
                            this.state.errorMessage && (
                                <div className="error-message">{this.state.errorMessage}</div>
                            )
                        }

                        <Button variant="primary" className='login-btn' onClick={this.handleLogin}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
