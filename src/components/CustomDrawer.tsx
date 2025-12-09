import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { responsive } from '../constants/responsive';

const CustomDrawer = (props) => {
  const { isTablet, isLandscape } = responsive.layout;
  
  const DrawerRow = ({ label, imageSource, isFocused, onPress }) => (
    <DrawerItem
      label={label}
      onPress={onPress}
      focused={isFocused}
      icon={({ color }) => (
        <Image 
          source={imageSource}
          style={[
            styles.iconImage, 
            isTablet && styles.iconImageTablet,
            { tintColor: color }
          ]} 
          resizeMode="contain"
        />
      )}
      labelStyle={[
        styles.label,
        isTablet && styles.labelTablet,
        isFocused && styles.activeLabel,
      ]}
      style={[
        styles.drawerItem,
        isFocused && styles.activeDrawerItem,
        isTablet && styles.drawerItemTablet,
      ]}
      activeBackgroundColor="#2D303E"
      activeTintColor="#fff"
      inactiveTintColor="#A0A3B1"
    />
  );
  
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={[
          styles.profileSection,
          isTablet && styles.profileSectionTablet,
          isLandscape && styles.profileSectionLandscape,
        ]}>
          <Image 
            source={require("../assets/images/profileImage.jpg")}
            style={[
              styles.avatar,
              isTablet && styles.avatarTablet,
              isLandscape && styles.avatarLandscape,
            ]} 
          />
          <View style={[
            styles.profileInfo,
            isTablet && styles.profileInfoTablet,
          ]}>
            <Text style={[
              styles.name,
              isTablet && styles.nameTablet,
              isLandscape && styles.nameLandscape,
            ]}>
              {user?.name || "Manisha Saini"}
            </Text>
            <Text style={[
              styles.email,
              isTablet && styles.emailTablet,
              isLandscape && styles.emailLandscape,
            ]}>
              {user?.email || "manisha@gmail.com"}
            </Text>
          </View>
        </View>

        <View style={[
          styles.menuSection,
          isTablet && styles.menuSectionTablet,
        ]}>
          <DrawerRow 
            label="Homepage" 
            imageSource={require('../assets/images/home.png')} 
            isFocused={true} 
            onPress={() => props.navigation.navigate('HomeTabs', {
              screen: 'Home',
            })} 
          />
          <DrawerRow 
            label="Discover" 
            imageSource={require('../assets/images/discover.png')} 
            onPress={() => props.navigation.navigate('HomeTabs', {
              screen: 'Discover',
            })} 
          />
          <DrawerRow 
            label="My Order" 
            imageSource={require('../assets/images/cart.png')} 
            onPress={() => props.navigation.navigate('CategoryScreen')} 
          />
          <DrawerRow 
            label="My profile" 
            imageSource={require('../assets/images/profile.png')} 
            onPress={() => props.navigation.navigate('HomeTabs', {
              screen: 'Profile',
            })} 
          />
        </View>

        <View style={[
          styles.dividerSection,
          isTablet && styles.dividerSectionTablet,
        ]}>
          <Text style={[
            styles.sectionTitle,
            isTablet && styles.sectionTitleTablet,
          ]}>
            OTHER
          </Text>
        </View>

        <View style={[
          styles.menuSection,
          isTablet && styles.menuSectionTablet,
        ]}>
          <DrawerRow 
            label="Setting" 
            imageSource={require('../assets/images/setting.png')} 
            onPress={() => props.navigation.navigate('CategoryScreen')}  
          />
          <DrawerRow 
            label="Support" 
            imageSource={require('../assets/images/mail.png')} 
            onPress={() => props.navigation.navigate('CategoryScreen')}  
          />
          <DrawerRow 
            label="About us" 
            imageSource={require('../assets/images/info.png')} 
            onPress={() => props.navigation.navigate('CategoryScreen')}  
          />
        </View>

        {/* Bottom spacing for better scrolling */}
        <View style={styles.bottomSpacing} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  scrollContent: {
    paddingTop: 0,
  },
  
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    paddingTop: responsive.verticalScale(70),
    marginBottom: responsive.verticalScale(70),
  },
  profileSectionTablet: {
    paddingTop: responsive.verticalScale(90),
    marginBottom: responsive.verticalScale(90),
    paddingHorizontal: 35,
  },
  profileSectionLandscape: {
    paddingTop: responsive.verticalScale(40),
    marginBottom: responsive.verticalScale(50),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: responsive.getResponsiveValue(60, {
      small: 55,
      tablet: 80,
      landscape: 65,
    }),
    height: responsive.getResponsiveValue(60, {
      small: 55,
      tablet: 80,
      landscape: 65,
    }),
    borderRadius: responsive.scale(50),
    backgroundColor: '#ccc',
  },
  avatarTablet: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarLandscape: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  profileInfo: {
    marginLeft: responsive.getResponsiveValue(15, {
      tablet: 20,
      landscape: 12,
    }),
  },
  profileInfoTablet: {
    marginLeft: 20,
  },
  name: {
    color: '#fff',
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 20,
      landscape: 16,
    }),
    fontWeight: 'bold',
    marginBottom: responsive.getResponsiveValue(4, { tablet: 6 }),
  },
  nameTablet: {
    fontSize: 20,
    marginBottom: 6,
  },
  nameLandscape: {
    fontSize: 16,
  },
  email: {
    color: '#8e8e93',
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
      landscape: 12,
    }),
  },
  emailTablet: {
    fontSize: 14,
  },
  emailLandscape: {
    fontSize: 12,
  },

  menuSection: {
    paddingHorizontal: responsive.getResponsiveValue(8, {
      tablet: 12,
    }),
  },
  menuSectionTablet: {
    paddingHorizontal: 15,
  },
  drawerItem: {
    borderRadius: responsive.scale(12),
    marginVertical: responsive.getResponsiveValue(4, { tablet: 6 }),
    paddingVertical: responsive.getResponsiveValue(3, { tablet: 5 }),
    minHeight: responsive.verticalScale(48),
  },
  drawerItemTablet: {
    borderRadius: 15,
    marginVertical: 6,
    paddingVertical: 8,
    minHeight: 55,
  },
  activeDrawerItem: {
    backgroundColor: '#23262F',
  },
  iconImage: {
    width: responsive.getResponsiveValue(24, {
      small: 22,
      tablet: 28,
      landscape: 22,
    }),
    height: responsive.getResponsiveValue(24, {
      small: 22,
      tablet: 28,
      landscape: 22,
    }),
  },
  iconImageTablet: {
    width: 28,
    height: 28,
  },
  label: {
    fontSize: responsive.getResponsiveFont(15, {
      small: 14,
      tablet: 17,
      landscape: 14,
    }),
    fontWeight: '500',
    marginLeft: responsive.getResponsiveValue(15, { tablet: 20 }),
  },
  labelTablet: {
    fontSize: 17,
    marginLeft: 20,
  },
  activeLabel: {
    fontWeight: '600',
  },

  dividerSection: {
    paddingHorizontal: responsive.getResponsiveValue(25, {
      tablet: 35,
    }),
    marginVertical: responsive.getResponsiveValue(15, { tablet: 20 }),
  },
  dividerSectionTablet: {
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#8e8e93',
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
    letterSpacing: responsive.getResponsiveValue(1.5, { tablet: 2 }),
    fontWeight: '600',
  },
  sectionTitleTablet: {
    fontSize: 14,
    letterSpacing: 2,
  },
  
  bottomSpacing: {
    height: responsive.verticalScale(20),
  },
});

export default CustomDrawer;