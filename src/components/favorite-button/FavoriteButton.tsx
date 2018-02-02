import * as React from 'react';
import Favorite from 'material-ui-icons/Favorite';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';

export interface Props {
    className?: string;
    isFavorite: boolean;
    onAddToFavorite: () => void;
    onRemoveFromFavorite: () => void;
}

const FavoriteButton: React.SFC<Props> = ({ isFavorite, onAddToFavorite, onRemoveFromFavorite, className }) => {
    return (
        <div className={className ? className : ''}>
            {isFavorite ? <Favorite onClick={onRemoveFromFavorite}/> : <FavoriteBorder onClick={onAddToFavorite}/>}
        </div>
    );
};

export default FavoriteButton;