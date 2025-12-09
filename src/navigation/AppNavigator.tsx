import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens (Create placeholders if not made yet)
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DrawerNavigator from './DrawerNavigator';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Home Stack (For navigating from List -> Details)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

// 2. Cart Stack (Cart -> Checkout)
function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

// 3. Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ tabBarIcon: ({color}) => <Icon name="home-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Discover" 
        component={HomeScreen} // Placeholder
        options={{ tabBarIcon: ({color}) => <Icon name="search-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStack} 
        options={{ tabBarIcon: ({color}) => <Icon name="cart-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={HomeScreen} // Placeholder
        options={{ tabBarIcon: ({color}) => <Icon name="person-outline" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// 4. Root Navigation (Auth -> Drawer)
export default function AppNavigator() {
  const isLoggedIn = true; // Replace with Redux selector later
    const token = useSelector((state: any) => state.auth.token);

  return (
    <NavigationContainer>
          {token ? <DrawerNavigator /> : <AuthStack />}
    
    </NavigationContainer>
  );
}

function DrawerNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Homepage" component={MainTabs} />
      <Drawer.Screen name="My Orders" component={CartStack} />
    </Drawer.Navigator>
  );
}