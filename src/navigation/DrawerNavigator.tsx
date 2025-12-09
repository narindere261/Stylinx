import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import TabNavigator from './TabNavigator';
import CustomDrawer from '../components/CustomDrawer';
import FilterScreen from '../screens/FilterScreen';
import ProductDetailsScreen from '../screens/ProductDetailScreen';
import MultiStepCheckoutScreen from '../screens/CheckoutScreen';
import CategoryScreen from '../screens/CategoryScreen';
import DressesScreen from '../screens/DressesScreen';

import { responsive } from '../constants/responsive'; // Adjust path as needed

const Drawer = createDrawerNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DrawerNavigator = () => {
  const { isTablet, isLandscape } = responsive.layout;
  
  const getDrawerWidth = () => {
    if (isTablet) {
      return responsive.scale(320); // Fixed width for tablets
    }
    if (isLandscape) {
      return SCREEN_WIDTH * 0.6; // 60% for landscape
    }
    return SCREEN_WIDTH * 0.85; // 85% for portrait phones
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: isTablet ? 'permanent' : 'slide', // Permanent drawer on tablets
        drawerStyle: {
          backgroundColor: '#181920',
          width: getDrawerWidth(),
          maxWidth: responsive.scale(400), // Maximum width for very large screens
        },
        overlayColor: 'rgba(0,0,0,0.7)',
        drawerHideStatusBarOnOpen: true,
        drawerStatusBarAnimation: 'slide',
        swipeEdgeWidth: responsive.getResponsiveValue(30, {
          tablet: 100, // Larger swipe area on tablets
        }),
        swipeEnabled: !isTablet, // Disable swipe on tablets since it's permanent
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen 
        name="HomeTabs" 
        component={TabNavigator}
        options={{
          // Different options for tablet vs phone
          drawerType: isTablet ? 'permanent' : 'slide',
        }}
      />
      <Drawer.Screen name="Filter" component={FilterScreen} />
      <Drawer.Screen name="DressesScreen" component={DressesScreen} />
      <Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Drawer.Screen name="CheckoutScreen" component={MultiStepCheckoutScreen} />
      <Drawer.Screen name="CategoryScreen" component={CategoryScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;