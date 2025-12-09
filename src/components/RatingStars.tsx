import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const RatingStars = ({ rating, size = 16, color = "#508A7B", starOutlineColor = "#508A7B", isTablet = false }) => {
  const iconSize = isTablet ? size * 1.2 : size;
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={
            star <= Math.floor(roundedRating)
              ? "star"
              : star === Math.ceil(roundedRating) && roundedRating % 1 !== 0
              ? "star-half"
              : "star-outline"
          }
          size={iconSize}
          color={star <= roundedRating ? color : starOutlineColor}
          style={{ marginRight: responsive.scale(2) }}
        />
      ))}
    </View>
  );
};

export default RatingStars;