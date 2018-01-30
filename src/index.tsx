import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './reducers';

import WeatherViewContainer from './components/weather-view/WeatherViewContainer';
import WeatherFinderContainer from './components/weather-finder/WeatherFinderContainer';
import ForecastViewContainer from './components/forecast-view/ForecastViewContainer';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import './index.css';

let store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <div className="container">
            <div className="row justify-content-center">
                <WeatherViewContainer />
            </div>
            <div className="row justify-content-center">
                <ForecastViewContainer />
            </div>
            <div className="row justify-content-center">
                <WeatherFinderContainer />
            </div>
        </div>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
