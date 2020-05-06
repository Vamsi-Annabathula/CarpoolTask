import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';
import Header from '../Header';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Row, Col, Card, CardTitle, Button, CustomInput } from 'reactstrap';
import { Stage, Layer, Circle } from 'react-konva';
import Ride from './Ride/Index';
import './Index.scss';

class BookRide extends Component {
    state = {
        disabled: false,
    };

    toggle = () => {
        const { disabled } = this.state;
        this.setState({
            disabled: !disabled,
        });
    };
    render() {
        return (
            <React.Fragment>
                <Container>
                    < Header />
                    <Row className="book-a-ride-mainRow">
                        <Col sm="1" xs="1" md="1" lg="1">
                        </Col>
                        <Col sm="3" xs="3" md="3" lg="3">
                            <Card className="bookcard">
                                <Row>
                                    <Col sm="8" xs="8" md="8" lg="8">
                                        <p className="tag-bookaride">Book a Ride</p>
                                    </Col>
                                    <Col sm="1" xs="2" md="2" lg="1">
                                    </Col>
                                    <Col sm="2" xs="2" md="2" lg="3" className="toggle-col">
                                        {/* <button type="button" className="btn btn-xs btn-toggle active" data-toggle="button" aria-pressed="true" >
                                            <div className="handle"></div>
                                        </button> */}
                                        <Toggle
                                            className="toggle-button"
                                            defaultChecked
                                            //onText="On"
                                            //offText="Off"
                                            //onChange={_onChange}
                                            role="checkbox"
                                        />
                                        {/* <CustomInput type="customSwitch" id="exampleCustomSwitch" name="customSwitch" label="Turn on this custom switch" /> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="8" xs="8" md="8" lg="8">
                                        <p className="subtag-bookaride">we get you the matches asap !</p>
                                    </Col>
                                </Row>
                                <Row className="form-row">
                                    <Col sm="11" xs="11" md="11" lg="11">
                                        <Row>
                                            <Col>
                                                <p className="from">From</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <input type="textfield" className="from-textfield" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="to">To</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <input type="textfield" className="to-textfield" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="date">Date</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <input type="textfield" placeholder="dd/mm/yyyy" className="date-textfield" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="time">Time</p>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>5am-9am</Button>
                                            </Col>
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>9am-12pm</Button>
                                            </Col>
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>12pm-3pm</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>3pm-6pm</Button>
                                            </Col>
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>6pm-9pm</Button>
                                            </Col>
                                            <Col sm="4" xs="4" md="4" lg="4">
                                                <Button>9pm-12am</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button className="submit">Submit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm="1" xs="1" md="1" lg="1" className="row-circle">
                                        <Row className="circle-row1">
                                            <Stage width={30} height={25} className="Circle">
                                                <Layer>
                                                    <Circle
                                                        x={10} y={10}
                                                        radius={8}
                                                        fill={'#9319ff'}
                                                    />
                                                </Layer>
                                            </Stage>
                                        </Row>
                                        <Row className="circle-row2">
                                            <Stage width={10} height={15} className="Circle">
                                                <Layer>
                                                    <Circle
                                                        x={5} y={10}
                                                        radius={5}
                                                        fill={'#c2c3c3'}
                                                    />
                                                </Layer>
                                            </Stage>
                                        </Row>
                                        <Row className="circle-row3">
                                            <Stage width={10} height={15} className="Circle">
                                                <Layer>
                                                    <Circle
                                                        x={5} y={10}
                                                        radius={5}
                                                        fill={'#c2c3c3'}
                                                    />
                                                </Layer>
                                            </Stage>
                                        </Row>
                                        <Row className="circle-row4">
                                            <Stage width={10} height={15} className="Circle">
                                                <Layer>
                                                    <Circle
                                                        x={5} y={10}
                                                        radius={5}
                                                        fill={'#c2c3c3'}
                                                    />
                                                </Layer>
                                            </Stage>
                                        </Row>
                                        <Row className="circle-row5">
                                            <Stage width={10} height={15} className="Circle">
                                                <Layer>
                                                    <Circle
                                                        x={5} y={10}
                                                        radius={5}
                                                        fill={'#c2c3c3'}
                                                    />
                                                </Layer>
                                            </Stage>
                                        </Row>
                                        <Row className="location-row">
                                            <img src={require("../../../assests/Icons/location-24px.svg")} alt="icon" className="location-icon" />
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col sm="7" xs="7" md="7" lg="7">
                            <Row>
                                <h1 className="matches-mainrow">
                                    Your Matches
                                </h1>
                            </Row>
                            <Row>
                                <Ride />
                                <Ride />
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </React.Fragment>
        );
    }
}

export default BookRide;