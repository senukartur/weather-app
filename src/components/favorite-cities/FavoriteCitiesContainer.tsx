import { connect } from 'react-redux';
import FavoriteCities, { Props } from './FavoriteCities';
import { ApplicationState } from '../../interfaces';
import { getFavoriteCities } from '../../reducers';

type StateProps = Pick<Props, 'favoriteCities'>;

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        favoriteCities: getFavoriteCities(state)
    };
}

const FavoriteCitiesContainer = connect(mapStateToProps)(FavoriteCities);

export default FavoriteCitiesContainer;