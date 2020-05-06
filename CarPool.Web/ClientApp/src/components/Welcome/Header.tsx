import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

class Header extends Component {
    render() {
        return (
            <Row className = "header-row">
                <Col sm="1" xs="1" md="1" lg="1">
                </Col>
                <Col sm="1" xs="1" md="1" lg="1" className="logo-img">
                    <img src={require('../../assests/Images/UI5.png')} alt="logo" />
                </Col>
                <Col sm="7" xs="7" md="7" lg="7">
                </Col>
                <Col sm="1" xs="1" md="1" lg="1" className="name">
                    <p>Technovert</p>
                </Col>
                <Col sm="1" xs="1" md="1" lg="1" className="logo-img">
                    <img src={require('../../assests/Images/profileImg.png')} alt="profilePic" className="avatar" />
                </Col>
            </Row>
        );
    }
}

export default Header;