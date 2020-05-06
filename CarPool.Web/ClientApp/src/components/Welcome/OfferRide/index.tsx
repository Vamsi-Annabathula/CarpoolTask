import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';
import Header from '../Header';
import { CardTitle, Row, Col, Card } from 'reactstrap';

class OfferRide extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    < Header />
                    <Row>
                        <Col sm="4" xs="4" md="4" lg="4">
                            <Card className="card">
                                <CardTitle><p>Offer a ride</p></CardTitle>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default OfferRide;