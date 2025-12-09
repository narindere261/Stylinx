import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Dimensions, Platform } from 'react-native';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { responsive } from '../constants/responsive'; 

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const THEME_COLORS = {
  background: '#121212',
  activeIcon: '#FFFFFF',
  inactiveIcon: '#666666',
};

const icons = {
  Home: {
    focused: require('../assets/images/home-focused.png'),
    unfocused: require('../assets/images/home.png'),
  },
  Discover: {
    focused: require('../assets/images/discover-focused.png'),
    unfocused: require('../assets/images/discover.png'),
  },
  Cart: {
    focused: require('../assets/images/cart.png'),
    unfocused: require('../assets/images/cart.png'),
  },
  Profile: {
    focused: require('../assets/images/profile-focused.png'),
    unfocused: require('../assets/images/profile.png'),
  },
};

const TabNavigator = () => {
  const { isTablet, isLandscape } = responsive.layout;
  
  const getTabBarHeight = () => {
    if (isTablet) {
      return responsive.verticalScale(80);
    }
    if (isLandscape) {
      return responsive.verticalScale(60);
    }
    return responsive.verticalScale(68);
  };

  const getTabBarHorizontalPadding = () => {
    if (isTablet) {
      return responsive.scale(60);
    }
    if (isLandscape) {
      return responsive.scale(40);
    }
    return responsive.scale(16);
  };

  const getIconSize = () => {
    if (isTablet) {
      return responsive.scale(28);
    }
    if (isLandscape) {
      return responsive.scale(22);
    }
    return responsive.scale(24);
  };

  const getActiveIconWrapperSize = () => {
    if (isTablet) {
      return responsive.scale(40);
    }
    return responsive.scale(32);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          
          tabBarStyle: {
            height: getTabBarHeight(),
            backgroundColor: THEME_COLORS.background,
            borderTopWidth: 0,
            elevation: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: responsive.scale(4),
            },
            shadowOpacity: 0.25,
            shadowRadius: responsive.scale(12),
            paddingTop: responsive.verticalScale(8),
            paddingBottom: Platform.OS === 'ios' ? responsive.verticalScale(8) : responsive.verticalScale(8),
            borderTopRightRadius: responsive.scale(16),
            borderTopLeftRadius: responsive.scale(16),
            position: 'absolute',
            bottom: 0,
            left: getTabBarHorizontalPadding(),
            right: getTabBarHorizontalPadding(),
            width: SCREEN_WIDTH,
            maxWidth: responsive.scale(500),
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 100,
          },
          
          tabBarIcon: ({ focused }) => {
            const { focused: focusedIcon, unfocused: unfocusedIcon } = icons[route.name];
            const iconSize = getIconSize();
            const activeWrapperSize = getActiveIconWrapperSize();
            
            return (
              <View style={styles.iconContainer}>
                <View style={[
                  styles.iconWrapper,
                  focused && styles.activeIconWrapper,
                  focused && { 
                    width: activeWrapperSize,
                    height: activeWrapperSize,
                    borderRadius: responsive.scale(10),
                  },
                  isTablet && focused && styles.activeIconWrapperTablet,
                ]}>
                  <Image
                    source={focused ? focusedIcon : unfocusedIcon}
                    style={[
                      styles.icon,
                      { 
                        width: iconSize,
                        height: iconSize,
                        tintColor: focused ? THEME_COLORS.activeIcon : THEME_COLORS.inactiveIcon,
                        transform: [{ scale: focused ? 1.05 : 1 }]
                      }
                    ]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  iconWrapper: {
    padding: responsive.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeIconWrapperTablet: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  icon: {
    // Size controlled dynamically
  },
});

export default TabNavigator;