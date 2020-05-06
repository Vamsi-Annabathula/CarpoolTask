import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import './../Index.scss';

class DashBoard extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col sm="3" xs="3" md="3" lg="3">
                    </Col>
                    <Col className="welcome-msg">
                        <p>Hey Technovert!</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm="3" xs="3" md="3" lg="3">
                    </Col>

                    <Col sm="3" xs="3" md="3" lg="3">
                        <Link to="/bookaride">
                            <Card body inverse style={{ backgroundColor: '#9319ff', borderColor: '#9319ff' }} className="welcome-card">
                                <CardTitle><p>Book a ride</p></CardTitle>
                            </Card>
                        </Link>
                    </Col>
                    <Col sm="3" xs="3" md="3" lg="3" className="last-col">
                        <Link to="/offeraride">
                            <Card body inverse style={{ backgroundColor: '#ffac19', borderColor: '#ffac19' }} className="welcome-card">
                                <CardTitle><p>Offer a ride</p></CardTitle>
                            </Card>
                            {/* <Button className = "offer-ride-button"><p>Offer a ride</p></Button> */}
                        </Link>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default DashBoard;