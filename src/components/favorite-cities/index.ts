import { connect } from 'react-redux';
import FavoriteCities, { Props } from './FavoriteCities';
import { ApplicationState } from '../../ducks';
import { getFavoriteCities } from '../../selectors';

type StateProps = Pick<Props, 'favoriteCities'>;

function mapStateToProps(state: ApplicationState): StateProps {
    return {
        favoriteCities: getFavoriteCities(state)
    };
}

const FavoriteCitiesContainer = connect(mapStateToProps)(FavoriteCities);

export default FavoriteCitiesContainer;