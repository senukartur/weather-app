import { connect } from 'react-redux';
import App , { Props } from './App';
import { ApplicationState } from '../../interfaces';
import { getErrorMessage } from '../../reducers';

type StateProps = Pick<Props, 'errorMessage'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        errorMessage: getErrorMessage(state)
    };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;