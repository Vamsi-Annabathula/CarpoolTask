import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Stage, Layer, Rect } from 'react-konva';
import { InputGroup, Input, InputGroupAddon, InputGroupText, Button, Container } from 'reactstrap';
import Fontawesome from 'react-fontawesome';
import './LogIn.scss';
import { Link } from 'react-router-dom';

class LogIn extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="AuthMainRow">
                        <Col xs="0" sm="6" md="8" lg="8">
                            <Row>
                                <Col sm="1" md="1" lg="1">
                                </Col>
                                <Col className="LogoImg">
                                    <img src={require('../../../assests/Images/UI5.png')} alt="Logo" />
                                </Col>
                            </Row>
                            <Row className="TagLineRow1">
                                <Col sm="1" md="1" lg="1">
                                </Col>
                                <Col className="TagLine1">
                                    <span className="Tag1">
                                        TURN
                                     </span>
                                    <span className="Tag2">
                                        MILES
                                     </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="1" md="1" lg="1">
                                </Col>
                                <Col className="TagLine2">
                                    <span className="Tag3">
                                        INTO
                                     </span>
                                    <span className="Tag4">
                                        MONEY
                                     </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="1" md="1" lg="1">
                                </Col>
                                <Col className="TagLine2">
                                    <span className="Tag5">
                                        RIDES
                                     </span>
                                    <span className="Tag6">
                                        ON
                                     </span>
                                    <span className="Tag7">
                                        TAP
                                     </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img src={require('../../../assests/Images/UI4.png')} alt="BGImageMain" className="BGImageMain" />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="6" xs="12" md="4" lg="4" className="login-main-col">
                            <Row className="login-main-row">
                                <Col sm="6" xs="6" md="6" lg="5">
                                </Col>
                                <Col sm="6" xs="6" md="6" lg="7" className="login-col">
                                    <span className="login">
                                        Log In
                                    </span>
                                    <Stage width={700} height={13} className="rectangle">
                                        <Layer>
                                            <Rect
                                                x={20} y={10} width={65} height={50}
                                                fill={'white'}
                                            />
                                        </Layer>
                                    </Stage>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="1" xs="1" md="1" lg="1">
                                </Col>
                                <Col sm="10" xs="10" md="10" lg="10">
                                    {/* <div>
                          <input type="email" className="inputText1" required/>
                          <span className="floating-label1">Enter Email Id</span>
                    </div>*/}
                                    <InputGroup>
                                        <Input placeholder="Enter Phone Number" />
                                    </InputGroup>
                                    <InputGroup>
                                        <Input placeholder="Enter Password" />
                                        <InputGroupAddon addonType="prepend" >
                                            <InputGroupText className="bg-white eye-button">
                                                <Fontawesome name="eye" className="eye-icon" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4" xs="4" md="4" lg="4">
                                </Col>
                                <Col className="submit-col">
                                    <Button className="submit-button">Log In</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="3" xs="3" md="3" lg="3">
                                </Col>
                                <Col className="want-to-signin-col">
                                    <p className="want-to-signin">Not a member yet? <Link to="/signup" className="signin-ancher">Sign Up</Link></p>
                                </Col>
                                <Stage width={700} height={13} className="rectangle">
                                    <Layer>
                                        <Rect
                                            x={345} y={10} width={40} height={50}
                                            fill={'white'}
                                        />
                                    </Layer>
                                </Stage>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default LogIn;