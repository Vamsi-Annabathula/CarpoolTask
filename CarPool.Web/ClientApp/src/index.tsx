import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import OfferContextProvider from './Providers/OfferProvider';
import RideContextProvider from './Providers/RideProvider';
import UserContextProvider from './Providers/UserProvider';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

ReactDOM.render(
    <OfferContextProvider>
        <RideContextProvider>
            <UserContextProvider>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </UserContextProvider>
        </RideContextProvider>
    </OfferContextProvider>,
    document.getElementById('root'));

registerServiceWorker();
