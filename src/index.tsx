import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { appReducers, ApplicationState } from './ducks';
import AppContainer from './components/app';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import './index.css';

let store = createStore(combineReducers<ApplicationState>(appReducers), applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
