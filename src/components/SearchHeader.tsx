import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const COLORS = {
  textPrimary: '#FCFCFD',
};

const SearchHeader = ({
  navigation,
  searchText,
  setSearchText,
  onSubmit,
  onClear,
  onFilterPress,
  activeFilters,
}) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Image
            source={require('../assets/images/Group.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Stylinx</Text>

        <TouchableOpacity style={styles.bellContainer}>
          <Image
            source={require('../assets/images/Bell_pin.png')}
            style={styles.headerIcon}
          />
          <View style={styles.redDot} /> 
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Image 
            source={require('../assets/images/icon_search.png')} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#8e8e93"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={onSubmit}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              onPress={onClear}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={responsive.getResponsiveValue(20, { tablet: 24 })} color="#8e8e93" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={onFilterPress}
        >
          <Image 
            source={require('../assets/images/icon_filter.png')} 
            style={styles.filterIcon} 
          />
          {(activeFilters.hasCategory || activeFilters.hasPriceFilter || activeFilters.hasRating || 
            activeFilters.hasColor || activeFilters.hasDiscount) && (
            <View style={styles.filterRedDot} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    paddingVertical: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
  },
  headerIcon: {
    width: responsive.getResponsiveValue(27, {
      small: 25,
      tablet: 29,
    }),
    height: responsive.getResponsiveValue(27, {
      small: 25,
      tablet: 29,
    }),
    resizeMode: 'contain',
    tintColor: '#FFF',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 24,
      landscape: 18,
    }),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bellContainer: {
    position: 'relative',
    padding: responsive.spacing.xs,
  },
  redDot: {
    position: 'absolute',
    top: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    right: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    width: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    height: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    borderRadius: responsive.scale(4),
    backgroundColor: '#FF4D4D',
    borderWidth: 1,
    borderColor: '#44565C',
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    marginBottom: responsive.spacing.sm,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262A35",
    borderRadius: responsive.scale(12),
    paddingHorizontal: responsive.spacing.md,
    height: responsive.verticalScale(50),
    marginRight: responsive.spacing.md,
  },
  input: { 
    flex: 1, 
    color: "#fff", 
    fontSize: responsive.getResponsiveFont(15, {
      small: 14,
      tablet: 16,
    }) 
  },
  searchIcon: {
    width: responsive.getResponsiveValue(20, { tablet: 22 }),
    height: responsive.getResponsiveValue(20, { tablet: 22 }),
    marginRight: responsive.spacing.sm,
    tintColor: '#8e8e93',
    resizeMode: 'contain',
  },
  filterIcon: {
    width: responsive.getResponsiveValue(20, { tablet: 22 }),
    height: responsive.getResponsiveValue(20, { tablet: 22 }),
    tintColor: '#FFF',
    resizeMode: 'contain',
  },
  filterBtn: {
    width: responsive.scale(50),
    height: responsive.verticalScale(50),
    borderRadius: responsive.scale(12),
    backgroundColor: "#262A35",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  clearButton: {
    padding: responsive.spacing.xs,
    marginLeft: responsive.spacing.sm,
  },
  filterRedDot: {
    position: 'absolute',
    top: responsive.getResponsiveValue(10, { tablet: 12 }),
    right: responsive.getResponsiveValue(10, { tablet: 12 }),
    width: responsive.getResponsiveValue(8, { tablet: 10 }),
    height: responsive.getResponsiveValue(8, { tablet: 10 }),
    borderRadius: responsive.scale(4),
    backgroundColor: '#FF4C4C',
  },
};

export default SearchHeader;