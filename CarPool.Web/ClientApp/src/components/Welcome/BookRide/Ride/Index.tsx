import React, { Component } from 'react';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import Row from 'reactstrap/lib/Row';
import { Stage, Layer, Circle } from 'react-konva';
import './Index.scss';

class Ride extends Component {
    render() {
        return (
            <React.Fragment>
                <Col sm="6" xs="6" md="6" lg="6" className="ride-card">
                    <Card>
                        <Row>
                            <Col sm="6" xs="6" md="6" lg="6">
                                <p className="name">Clint Barton</p>
                            </Col>
                            <Col sm="3" xs="3" md="3" lg="3">
                            </Col>
                            <Col sm="3" xs="3" md="3" lg="3" className="logo-img">
                                <img src={require('../../../../assests/Images/profileImg.png')} alt="profilePic" className="avatar" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" xs="6" md="6" lg="6" >
                                <p className="from-ride">From</p>
                            </Col>
                            <Col sm="6" xs="6" md="6" lg="6" >
                                <p className="to-ride">To</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="boarding-ride">Madhapur</p>
                            </Col>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <Row className="circle-icon-row">
                                    <Col sm="1" xs="1" md="1" lg="1" className="circle-row1">
                                        <Stage width={16} height={20} className="Circle">
                                            <Layer>
                                                <Circle
                                                    x={8} y={8}
                                                    radius={8}
                                                    fill={'#9319ff'}
                                                />
                                            </Layer>
                                        </Stage>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="circle-row2">
                                        <Stage width={10} height={15} className="Circle">
                                            <Layer>
                                                <Circle
                                                    x={5} y={8}
                                                    radius={5}
                                                    fill={'#c2c3c3'}
                                                />
                                            </Layer>
                                        </Stage>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="circle-row3">
                                        <Stage width={10} height={15} className="Circle">
                                            <Layer>
                                                <Circle
                                                    x={5} y={8}
                                                    radius={5}
                                                    fill={'#c2c3c3'}
                                                />
                                            </Layer>
                                        </Stage>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="circle-row4">
                                        <Stage width={10} height={15} className="Circle">
                                            <Layer>
                                                <Circle
                                                    x={5} y={8}
                                                    radius={5}
                                                    fill={'#c2c3c3'}
                                                />
                                            </Layer>
                                        </Stage>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="circle-row5">
                                        <Stage width={10} height={15} className="Circle">
                                            <Layer>
                                                <Circle
                                                    x={5} y={8}
                                                    radius={5}
                                                    fill={'#c2c3c3'}
                                                />
                                            </Layer>
                                        </Stage>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="location-row">
                                        <img src={require("../../../../assests/Icons/location-24px.svg")} alt="icon" className="location-icon" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="destination-ride">Gachibowli</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" xs="6" md="6" lg="6">
                                <p className="date-ride">Date</p>
                            </Col>
                            <Col sm="6" xs="6" md="6" lg="6">
                                <p className="time-ride">Time</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="date-value">dd/mm/yyyy</p>
                            </Col>
                            <Col sm="4" xs="4" md="4" lg="4"></Col>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="time-value">5am-9pm</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" xs="6" md="6" lg="6">
                                <p className="price-ride">Price</p>
                            </Col>
                            <Col sm="6" xs="6" md="6" lg="6">
                                <p className="seat-availability">Seat availability</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="price-amount">180$</p>
                            </Col>
                            <Col sm="4" xs="4" md="4" lg="4"></Col>
                            <Col sm="4" xs="4" md="4" lg="4">
                                <p className="available-seat-count">02</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default Ride;