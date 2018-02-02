import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header/Header';
import FavoriteCitiesContainer from '../favorite-cities/FavoriteCitiesContainer';
import WeatherContainer from '../weather/WeatherContainer';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

export interface Props {
    errorMessage: string;
}

export interface State {
    open: boolean;
}

class App extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.errorMessage !== nextProps.errorMessage) {
            this.setState({
                open: !!nextProps.errorMessage
            });
        }
    }

    handleClose = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ open: false });
    }

    render() {
        const { errorMessage } = this.props;

        return (
            <Router>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                    </div>
                    <Route path="/" component={WeatherContainer} exact={true} />
                    <Route path="/favorites" component={FavoriteCitiesContainer} />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open}
                        message={<span>{errorMessage}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            </Router>
        );
    }
}

export default App;