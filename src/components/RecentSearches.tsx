import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { responsive } from '../constants/responsive';

const RecentSearches = ({
  recentSearches,
  onSearchPress,
  onRemoveSearch,
  onClearAll,
}) => {
  if (!recentSearches?.length) return null;

  return (
    <>
      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <TouchableOpacity onPress={onClearAll}>
          <Image 
            source={require('../assets/images/icon_trash.png')} 
            style={styles.trashIcon} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chipContainer}>
        {recentSearches.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.chip} 
            onPress={() => onSearchPress(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
            <TouchableOpacity onPress={() => onRemoveSearch(item)}>
              <Image 
                source={require('../assets/images/icon_close.png')} 
                style={styles.closeIcon} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = {
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    marginTop: responsive.spacing.xs,
  },
  sectionTitle: { 
    color: "#fff", 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }), 
    fontWeight: "600", 
    paddingVertical: responsive.spacing.sm 
  },
  trashIcon: {
    width: responsive.getResponsiveValue(18, { tablet: 20 }),
    height: responsive.getResponsiveValue(18, { tablet: 20 }),
    tintColor: '#8e8e93',
    resizeMode: 'contain',
  },
  chipContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: responsive.verticalScale(20), 
    marginLeft: responsive.getResponsiveValue(23, {
      tablet: 30,
    }) 
  },
  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#262A35', 
    paddingVertical: responsive.getResponsiveValue(10, { tablet: 12 }),
    paddingHorizontal: responsive.getResponsiveValue(16, { tablet: 20 }),
    borderRadius: responsive.scale(10), 
    marginRight: responsive.spacing.sm, 
    marginBottom: responsive.spacing.sm 
  },
  chipText: { 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 15,
    }), 
    marginRight: responsive.spacing.xs 
  },
  closeIcon: {
    width: responsive.getResponsiveValue(12, { tablet: 14 }),
    height: responsive.getResponsiveValue(12, { tablet: 14 }),
    tintColor: '#8e8e93',
    resizeMode: 'contain',
  },
};

export default RecentSearches;