import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { responsive } from '../constants/responsive'; // Adjust path as needed

const COLORS = {
  background: '#44565C',
  cardBg: '#1E232B',
  textPrimary: '#FCFCFD',
  textSecondary: '#8E94A4',
  accent: '#FCFCFD',
  activeIcon: '#000000',
};

const App = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselData = [
    { id: '1', image: require('../assets/images/banner_autumn.png') },
    { id: '2', image: require('../assets/images/banner_autumn.png') },
    { id: '3', image: require('../assets/images/banner_autumn.png') },
  ];

  const { isTablet, isSmallDevice, isLandscape } = responsive.layout;
  const screenWidth = responsive.layout.window.width;

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode={isTablet ? 'cover' : 'stretch'}
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>Autumn{'\n'}Collection{'\n'}2021</Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {carouselData.map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.pageDot, 
            { backgroundColor: index === currentIndex ? '#FFF' : 'rgba(255,255,255,0.4)' }
          ]} 
        />
      ))}
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const getCarouselWidth = () => {
    return isTablet ? screenWidth - 80 : screenWidth - 40;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >

        {/* 1. Header Section */}
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

        {/* 2. Categories Section */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryItem}>
            <View style={styles.activeCategoryCircle}>
              <Image 
                source={require('../assets/images/women.png')} 
                style={styles.categoryIcon} 
              />
            </View>
            <Text style={styles.categoryTextActive}>Women</Text>
          </View>

          <View style={styles.categoryItem}>
            <View style={styles.inactiveCategoryCircle}>
              <Image 
                source={require('../assets/images/Men.png')} 
                style={styles.categoryIcon} 
              />
            </View>
            <Text style={styles.categoryText}>Men</Text>
          </View>

          <View style={styles.categoryItem}>
            <View style={styles.inactiveCategoryCircle}>
              <Image 
                source={require('../assets/images/Accessories.png')} 
                style={styles.categoryIcon} 
              />
            </View>
            <Text style={styles.categoryText}>Accessories</Text>
          </View>

          <View style={styles.categoryItem}>
            <View style={styles.inactiveCategoryCircle}>
              <Image 
                source={require('../assets/images/Beauty.png')} 
                style={styles.categoryIcon} 
              />
            </View>
            <Text style={styles.categoryText}>Beauty</Text>
          </View>
        </View>

        {/* 3. Main Hero Banner Carousel */}
        <View style={styles.heroBannerContainer}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: getCarouselWidth(),
              offset: getCarouselWidth() * index,
              index,
            })}
          />
          {renderPagination()}
        </View>

        {/* 4. Feature Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Feature Products</Text>
          <Text style={styles.showAllText}>Show all</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll}
        >
          <View style={styles.productCard}>
            <Image source={require('../assets/images/prod_sweater.png')} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={1}>Turtleneck Sweater</Text>
            <Text style={styles.productPrice}>$ 39.99</Text>
          </View>

          <View style={styles.productCard}>
            <Image source={require('../assets/images/prod_dress.png')} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={1}>Long Sleeve Dress</Text>
            <Text style={styles.productPrice}>$ 45.00</Text>
          </View>

          <View style={styles.productCard}>
            <Image source={require('../assets/images/prod_sport.png')} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={1}>Sportswear</Text>
            <Text style={styles.productPrice}>$ 80.00</Text>
          </View>
        </ScrollView>

        {/* 5. Middle Banner (Hang Out & Party) */}
        <View style={styles.middleBanner}>
          <View style={styles.middleBannerTextContainer}>
            <Text style={styles.tagText}>| NEW COLLECTION</Text>
            <Text style={styles.bannerTitle}>HANG OUT{'\n'}& PARTY</Text>
          </View>
          <View style={styles.circleImageContainer}>
             <Image
               source={require('../assets/images/banner_party.png')}
               style={styles.circleImage}
             />
          </View>
        </View>

        {/* 6. Recommended Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <Text style={styles.showAllText}>Show all</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll}
        >
          <View style={styles.recCard}>
            <Image source={require('../assets/images/rec_hoodie.png')} style={styles.recImage} />
            <View style={styles.recInfo}>
              <Text style={styles.recName}>White fashion hoodie</Text>
              <Text style={styles.recPrice}>$ 29.00</Text>
            </View>
          </View>

          <View style={styles.recCard}>
            <Image source={require('../assets/images/rec_shirt.png')} style={styles.recImage} />
            <View style={styles.recInfo}>
              <Text style={styles.recName}>Cotton T-Shirt</Text>
              <Text style={styles.recPrice}>$ 30.00</Text>
            </View>
          </View>
        </ScrollView>

        {/* 7. Top Collection Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Collection</Text>
          <Text style={styles.showAllText}>Show all</Text>
        </View>

        {/* Large Banner 1 */}
        <View style={styles.largeBannerCard}>
           <View style={styles.largeBannerText}>
             <Text style={styles.tagText}>| Sale up to 40%</Text>
             <Text style={styles.bannerTitle}>FOR SLIM{'\n'}& BEAUTY</Text>
           </View>
           <Image source={require('../assets/images/banner_slim.png')} style={styles.largeBannerImage} resizeMode="contain" />
        </View>

        {/* Large Banner 2 */}
        <View style={styles.largeBannerCard}>
           <View style={styles.largeBannerText}>
             <Text style={styles.tagText}>| Summer Collection 2021</Text>
             <Text style={styles.bannerTitle}>Most sexy{'\n'}& fabulous{'\n'}design</Text>
           </View>
           <Image source={require('../assets/images/banner_summer.png')} style={styles.largeBannerImage} resizeMode="contain" />
        </View>

        {/* 8. Split Row (Office Life & Elegant Design) */}
        <View style={styles.splitRow}>
          <View style={styles.splitCard}>
            <View style={[styles.splitTextContainer, { alignItems: 'flex-end', right: responsive.scale(27) }]}>
              <Text style={styles.splitTag}>T-Shirts</Text>
              <Text style={[styles.splitTitle, { textAlign: 'right' }]}>The{'\n'}Office{'\n'}Life</Text>
            </View>
            <Image 
              source={require('../assets/images/card_office.png')} 
              style={[styles.splitImage, { left: responsive.scale(-10) }]}
              resizeMode="contain" 
            />
          </View>

          <TouchableOpacity onPress={() => navigation?.navigate("DressesScreen")} style={styles.splitCard}>
             <View style={[styles.splitTextContainer, { alignItems: 'flex-start', left: responsive.scale(27) }]}>
              <Text style={styles.splitTag}>Dresses</Text>
              <Text style={[styles.splitTitle, { textAlign: 'left' }]}>Elegant{'\n'}Design</Text>
            </View>
            <Image 
              source={require('../assets/images/card_elegant.png')} 
              style={[styles.splitImage, { right: responsive.scale(-10) }]} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: responsive.verticalScale(20),
  },
  // --- Header ---
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
    borderColor: COLORS.background,
  },

  // --- Categories ---
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.getResponsiveValue(25, {
      small: 20,
      tablet: 40,
    }),
    marginVertical: responsive.getResponsiveValue(20, {
      small: 15,
      tablet: 30,
      landscape: 15,
    }),
  },
  categoryItem: {
    alignItems: 'center',
  },
  activeCategoryCircle: {
    width: responsive.getResponsiveValue(55, {
      small: 50,
      tablet: 70,
      landscape: 50,
    }),
    height: responsive.getResponsiveValue(55, {
      small: 50,
      tablet: 70,
      landscape: 50,
    }),
    borderRadius: responsive.scale(27.5),
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing.xs,
    shadowColor: "#000",
    borderWidth: 2,
    borderColor: "#23262F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inactiveCategoryCircle: {
    width: responsive.getResponsiveValue(55, {
      small: 50,
      tablet: 70,
      landscape: 50,
    }),
    height: responsive.getResponsiveValue(55, {
      small: 50,
      tablet: 70,
      landscape: 50,
    }),
    borderRadius: responsive.scale(27.5),
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.spacing.xs,
    backgroundColor: '#23262F'
  },
  categoryIcon: {
    width: responsive.getResponsiveValue(44, {
      small: 40,
      tablet: 55,
      landscape: 40,
    }),
    height: responsive.getResponsiveValue(44, {
      small: 40,
      tablet: 55,
      landscape: 40,
    }),
    resizeMode: 'contain',
  },
  categoryTextActive: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
    fontWeight: '600',
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
  },

  // --- Hero Banner Carousel ---
  heroBannerContainer: {
    marginHorizontal: responsive.getResponsiveValue(20, {
      tablet: 40,
    }),
    height: responsive.getResponsiveValue(190, {
      small: 170,
      tablet: 250,
      landscape: 160,
    }),
    borderRadius: responsive.scale(18),
    overflow: 'hidden',
    position: 'relative',
    marginBottom: responsive.getResponsiveValue(30, {
      tablet: 40,
      landscape: 25,
    }),
    marginTop: responsive.spacing.sm,
  },
  carouselItem: {
    width: responsive.layout.window.width - responsive.getResponsiveValue(40, {
      tablet: 80,
    }),
    height: responsive.getResponsiveValue(190, {
      small: 170,
      tablet: 250,
      landscape: 160,
    }),
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: responsive.getResponsiveValue(35, {
      tablet: 50,
      landscape: 25,
    }),
    right: responsive.getResponsiveValue(25, {
      tablet: 40,
      landscape: 20,
    }),
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(26, {
      small: 22,
      tablet: 32,
      landscape: 22,
    }),
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: responsive.getResponsiveValue(32, {
      small: 28,
      tablet: 40,
      landscape: 28,
    }),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsive.getResponsiveValue(6, {
      tablet: 8,
    }),
  },
  pageDot: {
    width: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    height: responsive.getResponsiveValue(8, {
      tablet: 10,
    }),
    borderRadius: responsive.scale(4),
  },

  // --- Section Headers ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    marginBottom: responsive.getResponsiveValue(25, {
      small: 20,
      tablet: 30,
      landscape: 20,
    }),
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 22,
      landscape: 16,
    }),
    fontWeight: '700',
  },
  showAllText: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
      landscape: 11,
    }),
    paddingRight: responsive.getResponsiveValue(20, {
      tablet: 30,
    }),
  },
  horizontalScroll: {
    paddingLeft: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    marginBottom: responsive.getResponsiveValue(25, {
      small: 20,
      tablet: 30,
      landscape: 20,
    }),
  },

  // --- Feature Products ---
  productCard: {
    width: responsive.getResponsiveValue(140, {
      small: 130,
      tablet: 180,
      landscape: 150,
    }),
    marginRight: responsive.getResponsiveValue(30, {
      small: 25,
      tablet: 35,
      landscape: 25,
    }),
  },
  productImage: {
    width: responsive.getResponsiveValue(140, {
      small: 130,
      tablet: 180,
      landscape: 150,
    }),
    height: responsive.getResponsiveValue(190, {
      small: 170,
      tablet: 240,
      landscape: 170,
    }),
    borderRadius: responsive.scale(15),
    marginBottom: responsive.spacing.sm,
    backgroundColor: COLORS.cardBg,
  },
  productName: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(13, {
      small: 12,
      tablet: 15,
      landscape: 12,
    }),
    marginBottom: responsive.spacing.xs,
  },
  productPrice: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
      landscape: 13,
    }),
    fontWeight: '700',
  },

  // --- Middle Banner ---
  middleBanner: {
    backgroundColor: '#23262F',
    height: responsive.getResponsiveValue(150, {
      small: 140,
      tablet: 180,
      landscape: 130,
    }),
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: responsive.getResponsiveValue(25, {
      tablet: 30,
      landscape: 20,
    }),
    alignItems: 'center',
    paddingLeft: responsive.getResponsiveValue(20, {
      tablet: 30,
    }),
    justifyContent: 'space-between'
  },
  middleBannerTextContainer: {
    justifyContent: 'center',
    paddingLeft: responsive.getResponsiveValue(30, {
      tablet: 40,
    }),
    gap: responsive.spacing.sm,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: responsive.getResponsiveFont(10, {
      small: 9,
      tablet: 12,
      landscape: 9,
    }),
    marginBottom: responsive.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(22, {
      small: 20,
      tablet: 26,
      landscape: 20,
    }),
    fontWeight: '400',
    lineHeight: responsive.getResponsiveValue(28, {
      small: 26,
      tablet: 32,
      landscape: 26,
    }),
  },
  circleImageContainer: {
    width: responsive.getResponsiveValue(140, {
      small: 130,
      tablet: 180,
      landscape: 120,
    }),
    height: responsive.getResponsiveValue(150, {
      small: 140,
      tablet: 180,
      landscape: 130,
    }),
    borderTopLeftRadius: responsive.scale(65),
    borderBottomLeftRadius: responsive.scale(65),
    overflow: 'hidden',
    marginRight: 0,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // --- Recommended ---
  recCard: {
    flexDirection: 'row',
    backgroundColor: '#1E232B',
    borderRadius: responsive.scale(12),
    width: responsive.getResponsiveValue(240, {
      small: 220,
      tablet: 300,
      landscape: 220,
    }),
    height: responsive.getResponsiveValue(70, {
      small: 65,
      tablet: 85,
      landscape: 65,
    }),
    alignItems: 'center',
    marginRight: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
  },
  recImage: {
    width: responsive.getResponsiveValue(70, {
      small: 65,
      tablet: 85,
      landscape: 65,
    }),
    height: responsive.getResponsiveValue(70, {
      small: 65,
      tablet: 85,
      landscape: 65,
    }),
    borderRadius: responsive.scale(10),
    marginRight: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
    backgroundColor: '#2A2E36',
  },
  recInfo: {
    flex: 1,
  },
  recName: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(13, {
      small: 12,
      tablet: 15,
      landscape: 12,
    }),
    marginBottom: responsive.spacing.xs,
  },
  recPrice: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
      landscape: 13,
    }),
    fontWeight: '700',
  },

  // --- Large Banners ---
  largeBannerCard: {
    marginHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    backgroundColor: '#1E232B',
    borderRadius: responsive.scale(18),
    height: responsive.getResponsiveValue(160, {
      small: 150,
      tablet: 200,
      landscape: 140,
    }),
    marginBottom: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: responsive.getResponsiveValue(20, {
      tablet: 30,
    }),
  },
  largeBannerText: {
    flex: 1,
    zIndex: 1,
    gap: responsive.spacing.sm,
    paddingLeft: responsive.getResponsiveValue(20, {
      tablet: 30,
    }),
  },
  largeBannerImage: {
    width: responsive.getResponsiveValue(160, {
      small: 150,
      tablet: 200,
      landscape: 140,
    }),
    height: responsive.getResponsiveValue(180, {
      small: 170,
      tablet: 220,
      landscape: 160,
    }),
    marginTop: responsive.getResponsiveValue(20, {
      tablet: 25,
    }),
    marginRight: responsive.scale(-10),
  },

  // --- Split Row ---
  splitRow: {
    flexDirection: 'row',
    marginHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    justifyContent: 'space-between',
    gap: responsive.getResponsiveValue(15, {
      tablet: 20,
    }),
  },
  splitCard: {
    width: (responsive.layout.window.width - 
      responsive.getResponsiveValue(55, {
        tablet: 80,
      })) / 2,
    backgroundColor: '#1E232B',
    borderRadius: responsive.scale(18),
    height: responsive.getResponsiveValue(220, {
      small: 200,
      tablet: 280,
      landscape: 180,
    }),
    overflow: 'hidden',
    position: 'relative',
  },
  splitTextContainer: {
    position: 'absolute',
    top: responsive.getResponsiveValue(55, {
      small: 50,
      tablet: 70,
      landscape: 40,
    }),
    zIndex: 10,
    gap: responsive.getResponsiveValue(16, {
      tablet: 20,
    }),
  },
  splitTag: {
    color: COLORS.textSecondary,
    fontSize: responsive.getResponsiveFont(11, {
      small: 10,
      tablet: 13,
      landscape: 10,
    }),
    marginBottom: responsive.spacing.xs,
  },
  splitTitle: {
    color: COLORS.textPrimary,
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 22,
      landscape: 16,
    }),
    lineHeight: responsive.getResponsiveValue(24, {
      small: 22,
      tablet: 28,
      landscape: 22,
    }),
    fontWeight: '400',
  },
  splitImage: {
    width: responsive.getResponsiveValue(130, {
      small: 120,
      tablet: 170,
      landscape: 110,
    }),
    height: responsive.getResponsiveValue(219, {
      small: 200,
      tablet: 280,
      landscape: 180,
    }),
    position: 'absolute',
    bottom: 0,
  },
  bottomSpacing: {
    height: responsive.verticalScale(30),
  },
});

export default App;