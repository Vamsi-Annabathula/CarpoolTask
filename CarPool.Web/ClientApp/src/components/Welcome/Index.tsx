import React, { Component } from 'react';
import { Container, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import './Index.scss';
import { Link, Route } from 'react-router-dom';
import DashBoard from '../Welcome/Dashboard/index';
import Header from './Header';

class WelcomeIndex extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Header />
                    <DashBoard />
                </Container>
            </React.Fragment>
        );
    }
}

export default WelcomeIndex;