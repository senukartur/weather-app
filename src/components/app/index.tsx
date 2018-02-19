import { connect } from 'react-redux';
import App , { Props } from './App';
import { ApplicationState } from '../../ducks';
import { getErrorMessage } from '../../selectors';

type StateProps = Pick<Props, 'errorMessage'>;

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        errorMessage: getErrorMessage(state)
    };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;