import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const RatingBar = ({ value, total, count, isTablet = false }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <View style={[styles.barRow, isTablet && styles.barRowTablet]}>
      <Text style={[styles.barValue, isTablet && styles.barValueTablet]}>{value}</Text>
      <Ionicons 
        name="star" 
        size={responsive.getResponsiveValue(14, { tablet: 16 })} 
        color="#508A7B" 
        style={{ marginRight: responsive.spacing.xs }} 
      />
      <View style={[styles.barContainer, isTablet && styles.barContainerTablet]}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={[styles.barCount, isTablet && styles.barCountTablet]}>{percentage.toFixed(0)}%</Text>
    </View>
  );
};

const styles = {
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.getResponsiveValue(6, { tablet: 8 }),
  },
  barRowTablet: {
    marginBottom: 8,
  },
  barValue: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    width: responsive.scale(10),
    marginRight: responsive.spacing.xs,
  },
  barValueTablet: {
    fontSize: 16,
    width: 12,
  },
  barContainer: {
    flex: 1,
    height: responsive.getResponsiveValue(8, { tablet: 10 }),
    backgroundColor: '#333333',
    borderRadius: responsive.scale(4),
    marginHorizontal: responsive.spacing.sm,
  },
  barContainerTablet: {
    height: 10,
    borderRadius: 5,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#00C853',
    borderRadius: responsive.scale(4),
  },
  barCount: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    width: responsive.scale(40),
    textAlign: 'right',
  },
  barCountTablet: {
    fontSize: 16,
    width: 45,
  },
};

export default RatingBar;