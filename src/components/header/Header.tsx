import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import './header.css';

interface State {
    isOpen: boolean;
    anchorEl: React.ReactNode | null;
}

class Header extends React.Component<RouteComponentProps<{}>, State> {
    state = {
        isOpen: false,
        anchorEl: null
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    getRouteName = (): string => { switch (this.props.location.pathname) {
            case '/':
                return 'Weather';
            case '/favorites':
                return 'Favorite Cities';
            default:
                return 'Weather';
        }
    }

    render() {
        return (
            <AppBar className="col-lg-6 col-sm-10 justify-content-start app-header" position="static" color="primary">
                <div className="row">
                    <Button
                        className="col-sm-1"
                        aria-owns={this.state.anchorEl ? 'app-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <i className="fa fa-bars" />
                    </Button>
                    <div className="col-sm-4 route-name">
                        <Typography
                            className="text-center"
                            type="title"
                            color="secondary"
                        >
                            {this.getRouteName()}
                        </Typography>
                    </div>
                </div>
                <Menu
                    className="app-menu"
                    id="app-menu"
                    anchorEl={this.state.anchorEl || undefined}
                    open={!!this.state.anchorEl}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <NavLink to="/">Weather</NavLink>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <NavLink to="/favorites">Favorites</NavLink>
                    </MenuItem>
                </Menu>
            </AppBar>
        );
    }
}

export default withRouter(Header);