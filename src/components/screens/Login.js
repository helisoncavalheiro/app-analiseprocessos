import React from 'react';
import { Card, Form, Button, Alert, Container, Row } from 'react-bootstrap';
import { login } from '../../services/LoginService.js';
import Loader from '../Loader.js';
//import "../../css/sb-admin-2/sb-admin-2.min.css";

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
            <div className="bg-gradient-primary" style={{position: 'absolute', width: '100%', height: '100%'}}>
                <Container>
                    <Row className="justify-content-center">
                        <div class="col-sm-12 col-md-6">

                            <Card className="o-hidden border-0 shadow-lg my-5">
                                <Card.Body className="p-0">
                                    <Row>
                                        <div class="col-lg-12">
                                            <div className="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                                </div>
                                                <Form className="user" onSubmit={this.handleLogin}>
                                                    <Form.Group controlId="login">
                                                        <Form.Control className="form-control-user" type="text" placeholder="Digite seu login" onChange={evt => this.setState({ user: evt.target.value })} />
                                                    </Form.Group>

                                                    <Form.Group controlId="senha">
                                                        <Form.Control className="form-control-user" type="password" placeholder="Digite sua senha" onChange={evt => this.setState({ password: evt.target.value })} />
                                                    </Form.Group>
                                                    <div className="row">
                                                        <div className="col-sm-12 col-md-4 offset-md-4">
                                                            <Button variant="primary" type="submit" className="btn btn-primary btn-user btn-block">
                                                                Entrar
                                                    </Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </Row>
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
                    </Row>
                </Container>
            </div>
        )
    }
}