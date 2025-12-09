import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { logout } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { responsive } from '../constants/responsive';

const COLORS = {
  background: '#141416',
  cardBg: '#141416',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  iconColor: '#E1E1E1',
  buttonConfirm: '#FF3D00',
  buttonCancel: '#333333',
};

const MenuItem = ({ iconImage, title, onPress, isLast, isPaymentMethod }) => {
  return (
    <TouchableOpacity 
      style={[styles.menuItem, isLast && styles.menuItemNoBorder]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <Image 
          source={iconImage} 
          style={[
            styles.menuIcon,
            isPaymentMethod && styles.paymentMethodIcon // Apply smaller size for payment method
          ]} 
          resizeMode='contain' 
        />
      </View>

      <Text style={styles.menuTitle}>{title}</Text>

      <Image
        source={require('../assets/images/Stroke.png')}
        style={styles.chevron}
        resizeMode='contain'
      />
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { isTablet, isLandscape } = responsive.layout;

  const handleLogout = () => {
    dispatch(logout());
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Logout cancelled'),
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: handleLogout,
        },
      ],
      { cancelable: true }
    );
  };

  const handlePress = (title) => {
    if (title === 'Log out') {
      showLogoutConfirmation();
    } else {
      console.log(`${title} pressed`);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Address',
      iconImage: require('../assets/images/Location.png'),
      isPaymentMethod: false,
    },
    {
      id: 2,
      title: 'Payment method',
      iconImage: require('../assets/images/Wallet.png'),
      isPaymentMethod: true, // Flag for payment method
    },
    {
      id: 3,
      title: 'Voucher',
      iconImage: require('../assets/images/Ticket.png'),
      isPaymentMethod: false,
    },
    {
      id: 4,
      title: 'My Wishlist',
      iconImage: require('../assets/images/Favorite_fill.png'),
      isPaymentMethod: false,
    },
    {
      id: 5,
      title: 'Rate this app',
      iconImage: require('../assets/images/Star_fill.png'),
      isPaymentMethod: false,
    },
    {
      id: 6,
      title: 'Log out',
      iconImage: require('../assets/images/Logout.png'),
      isPaymentMethod: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Image
          source={require("../assets/images/profileImage.jpg")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || "Manisha Saini"}</Text>
          <Text style={styles.userEmail}>{user?.email || "manisha@gmail.com"}</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            iconImage={item.iconImage}
            title={item.title}
            onPress={() => handlePress(item.title)}
            isLast={index === menuItems.length - 1}
            isPaymentMethod={item.isPaymentMethod}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 40,
      landscape: 30,
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive.verticalScale(70),
    paddingLeft: responsive.getResponsiveValue(20, {
      tablet: 30,
      landscape: 0,
    }),
    marginTop: responsive.getResponsiveValue(70, {
      small: 50,
      tablet: 90,
      landscape: 40,
    }),
    marginBottom: responsive.getResponsiveValue(70, {
      small: 50,
      tablet: 90,
      landscape: 40,
    }),
  },
  avatar: {
    width: responsive.getResponsiveValue(70, {
      small: 60,
      tablet: 90,
      landscape: 60,
    }),
    height: responsive.getResponsiveValue(70, {
      small: 60,
      tablet: 90,
      landscape: 60,
    }),
    borderRadius: responsive.scale(35),
    marginRight: responsive.getResponsiveValue(20, {
      tablet: 30,
      landscape: 15,
    }),
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: responsive.getResponsiveFont(19, {
      small: 17,
      tablet: 24,
      landscape: 18,
    }),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: responsive.spacing.xs,
  },
  userEmail: {
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
      landscape: 13,
    }),
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  menuContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: responsive.scale(16),
    paddingVertical: responsive.getResponsiveValue(10, {
      tablet: 15,
    }),
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
      landscape: 25,
    }),
    borderWidth: 1,
    borderColor: "#262626",
    marginHorizontal: responsive.getResponsiveValue(0, {
      tablet: responsive.spacing.lg,
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.getResponsiveValue(24, {
      small: 20,
      tablet: 28,
      landscape: 20,
    }),
    minHeight: responsive.verticalScale(60),
  },
  menuItemNoBorder: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: responsive.getResponsiveValue(30, {
      tablet: 35,
    }),
    alignItems: 'flex-start',
    marginRight: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
  },
  menuIcon: {
    width: responsive.getResponsiveValue(22, {
      small: 20,
      tablet: 26,
      landscape: 20,
    }),
    height: responsive.getResponsiveValue(22, {
      small: 20,
      tablet: 26,
      landscape: 20,
    }),
    tintColor: COLORS.iconColor,
  },
  // Specific style for Payment Method icon (smaller size)
  paymentMethodIcon: {
    width: responsive.getResponsiveValue(18, { // Smaller width
      small: 16,
      tablet: 22,
      landscape: 16,
    }),
    height: responsive.getResponsiveValue(18, { // Smaller height
      small: 16,
      tablet: 22,
      landscape: 16,
    }),
  },
  menuTitle: {
    flex: 1,
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
      landscape: 15,
    }),
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  chevron: {
    width: responsive.getResponsiveValue(16, {
      small: 14,
      tablet: 18,
      landscape: 14,
    }),
    height: responsive.getResponsiveValue(16, {
      small: 14,
      tablet: 18,
      landscape: 14,
    }),
    tintColor: COLORS.iconColor,
  },
});

export default ProfileScreen;