import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import Weather from './containers/Weather';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'weathericons/css/weather-icons.css';

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Weather />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
