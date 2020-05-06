import * as React from 'react';
import { Route, Router } from 'react-router';
import Welcome from './components/Welcome/Index';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './components/Authentication/SignUp/SignUp';
import LogIn from './components/Authentication/LogIn/LogIn';
import BookRide from './components/Welcome/BookRide/Index';
import OfferRide from './components/Welcome/OfferRide';

export default () => (
        <React.Fragment>
                <Route exact path="/" component={SignUp} />
                <Route path = "/signup" component = {SignUp} />
                <Route path = "/login" component = {LogIn} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/bookaride" component={BookRide} />
                <Route path="/offeraride" component={OfferRide} />
        </React.Fragment>
);
