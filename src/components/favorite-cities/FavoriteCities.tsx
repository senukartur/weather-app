import * as React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
import Paper from 'material-ui/Paper';
import FavoriteCityViewContainer from '../favorit-city-view';

export interface Props {
    favoriteCities: number[];
}

const FavoriteCities: React.SFC<Props> = ({ favoriteCities }) => {
    return(
        <div>
            {
                favoriteCities.length ?
                    favoriteCities.map(
                        cityId => <FavoriteCityViewContainer key={cityId} cityId={cityId}/>
                    ) : (
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-10">
                            <Paper className="text-center" >
                                <p>
                                    You should chose favorite cities.
                                </p>
                                <p>
                                    Go to the <Link to="/">weather</Link> page and
                                    use <span className="font-weight-light">Like </span>
                                    <FavoriteBorder viewBox="0 0 24 24" /> button.
                                </p>
                            </Paper>
                        </div>
                    </div>
                )
            }
        </div>
    );

};

export default FavoriteCities;