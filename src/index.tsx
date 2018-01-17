import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';

import WeatherViewContainer from './components/weather-view/WeatherViewContainer';
import WeatherFinderContainer from './components/weather-finder/WeatherFinderContainer';
import ForecastViewContainer from './components/forecast-view/ForecastViewContainer';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'weathericons/css/weather-icons.css';
import 'react-flags-select/css/react-flags-select.css';

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <div className={'container'}>
            <WeatherViewContainer />
            <ForecastViewContainer />
            <WeatherFinderContainer />
        </div>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
