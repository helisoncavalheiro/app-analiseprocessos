import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../../services/LoginService.js';
import Loader from '../Loader.js';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            error: "",
            loading: false
        }
        this.login = login.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.onLogin = this.props.onLogin;
    }

    handleLogin(evt) {
        evt.preventDefault();
        this.setState({ loading: true });
        this.login(this.state.user, this.state.password)
            .then(res => {
                
                if (res.statusCode >= 200 && res.statusCode <= 300) {
                    sessionStorage.setItem("token", res.data.token);
                    this.setState({ loading: false });
                    this.onLogin();
                }

            }).catch(err => {
                this.setState({ loading: false, error: "Houve um problema ao fazer login. Verifique seus dados e tente novamente" });
            })
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <div className="row">
                            <div className="col-sm-6 offset-sm-3">
                                <h4>Login</h4>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleLogin}>
                            <Form.Group controlId="login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Digite seu login" onChange={evt => this.setState({ user: evt.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite sua senha" onChange={evt => this.setState({ password: evt.target.value })} />
                            </Form.Group>
                            <div className="row">
                                <div className="col-sm-12 col-md-4 offset-md-4">
                                    <Button variant="primary" type="submit" className="justify-content-center">
                                        Entrar
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Card.Body>
                    {(this.state.error != "") ? (
                        <Card.Footer>
                            <Alert variant="danger">{this.state.error}</Alert>
                        </Card.Footer>
                    )
                        : ""}

                </Card>
                {this.state.loading ? (<Loader />) : ""}
            </div>
        )
    }
}