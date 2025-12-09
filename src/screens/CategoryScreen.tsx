import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Modal,
  Dimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { responsive } from '../constants/responsive'; // Adjust path as needed

const { width, height } = Dimensions.get('window');

const CategoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(width)).current;

  const [selectedColor, setSelectedColor] = useState('orange');
  const [selectedStar, setSelectedStar] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('Crop Tops');
  const [selectedDiscount, setSelectedDiscount] = useState('50% off');

  const { isTablet, isLandscape, isSmallDevice } = responsive.layout;

  const DRAWER_WIDTH = responsive.getResponsiveValue(width * 0.85, {
    tablet: width * 0.7,
    landscape: width * 0.6,
  });

  const openFilter = () => {
    setFilterVisible(true);
    Animated.timing(slideAnim, {
      toValue: width - DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      setFilterVisible(false);
    });
  };

  const [recentSearches, setRecentSearches] = useState(['Sunglasses', 'Sweater', 'Hoodie']);
  const CATEGORIES = [
    {
      id: 1,
      title: 'CLOTHING',
      image: require('../assets/images/cat_clothing.png'), 
      color: '#AAB3A5'
    },
    {
      id: 2,
      title: 'ACCESSORIES',
      image: require('../assets/images/cat_accessories.png'), 
      color: '#8D8684'
    },
    {
      id: 3,
      title: 'SHOES',
      image: require('../assets/images/cat_shoes.png'), 
      color: '#4F636F'
    },
  ];

  const removeSearch = (itemToRemove: string) => {
    setRecentSearches(prev => prev.filter(item => item !== itemToRemove));
  };

  const FilterDrawer = () => {
    const thumbSize = responsive.getResponsiveValue(24, { tablet: 28 });
    
    return (
      <Modal
        transparent={true}
        visible={isFilterVisible}
        onRequestClose={closeFilter}
        animationType="none"
      >
        <View style={filterStyles.modalContainer}>
          <TouchableOpacity 
            style={filterStyles.overlay} 
            onPress={closeFilter} 
            activeOpacity={1} 
          />

          <Animated.View 
            style={[
              filterStyles.drawer, 
              { 
                transform: [{ translateX: slideAnim }],
                width: DRAWER_WIDTH,
              }
            ]}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View style={[
                filterStyles.headerRow,
                isTablet && filterStyles.headerRowTablet,
              ]}>
                <TouchableOpacity 
                  onPress={closeFilter} 
                  style={filterStyles.backButton}
                >
                  <Ionicons 
                    name="chevron-back" 
                    size={responsive.getResponsiveValue(24, { tablet: 28 })} 
                    color="#A0A0A0" 
                  />
                </TouchableOpacity>
                <Text style={[
                  filterStyles.modalTitle,
                  isTablet && filterStyles.modalTitleTablet,
                ]}>Filter</Text>
                <TouchableOpacity>
                  <Ionicons 
                    name="options-outline" 
                    size={responsive.getResponsiveValue(24, { tablet: 28 })} 
                    color="#FFF" 
                  />
                </TouchableOpacity>
              </View>

              <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={[
                  filterStyles.scrollContent,
                  isTablet && filterStyles.scrollContentTablet,
                ]}
              >
                <Text style={[
                  filterStyles.sectionLabel,
                  isTablet && filterStyles.sectionLabelTablet,
                ]}>Price</Text>
                <View style={[
                  filterStyles.sliderContainer,
                  isTablet && filterStyles.sliderContainerTablet,
                ]}>
                  <View style={filterStyles.sliderTrackBg}>
                    <View style={[
                      filterStyles.sliderTrackActive,
                      { width: '60%' }
                    ]} />
                  </View>
                  <View style={[
                    filterStyles.thumb, 
                    { 
                      left: '0%',
                      width: thumbSize,
                      height: thumbSize,
                      borderRadius: thumbSize / 2,
                      top: (responsive.getResponsiveValue(30, { tablet: 35 }) - thumbSize) / 2,
                    }
                  ]} />
                  <View style={[
                    filterStyles.thumb, 
                    { 
                      left: '60%',
                      width: thumbSize,
                      height: thumbSize,
                      borderRadius: thumbSize / 2,
                      top: (responsive.getResponsiveValue(30, { tablet: 35 }) - thumbSize) / 2,
                    }
                  ]} />
                </View>
                <View style={filterStyles.priceLabels}>
                  <Text style={[
                    filterStyles.priceText,
                    isTablet && filterStyles.priceTextTablet,
                  ]}>$10</Text>
                  <Text style={[
                    filterStyles.priceText,
                    isTablet && filterStyles.priceTextTablet,
                  ]}>$80</Text>
                </View>

                <Text style={[
                  filterStyles.sectionLabel,
                  isTablet && filterStyles.sectionLabelTablet,
                ]}>Color</Text>
                <View style={[
                  filterStyles.colorsRow,
                  isTablet && filterStyles.colorsRowTablet,
                ]}>
                  {['#D39E36', '#D64646', '#1A1C25', '#3E555C', '#E6E6E6', '#6C5046', '#EFA8A8'].map((color, idx) => {
                    const colorSize = responsive.getResponsiveValue(32, { tablet: 40 });
                    return (
                      <TouchableOpacity 
                        key={idx} 
                        style={[
                          filterStyles.colorCircle, 
                          { 
                            backgroundColor: color,
                            width: colorSize,
                            height: colorSize,
                            borderRadius: colorSize / 2,
                          },
                          selectedColor === color && filterStyles.colorCircleActive
                        ]}
                        onPress={() => setSelectedColor(color)}
                      />
                    );
                  })}
                </View>

                <Text style={[
                  filterStyles.sectionLabel,
                  isTablet && filterStyles.sectionLabelTablet,
                ]}>Star Rating</Text>
                <View style={[
                  filterStyles.starsRow,
                  isTablet && filterStyles.starsRowTablet,
                ]}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isSelected = selectedStar === star;
                    const starBtnSize = responsive.getResponsiveValue(48, { tablet: 56 });
                    return (
                      <TouchableOpacity 
                        key={star} 
                        style={[
                          filterStyles.starBtn, 
                          { 
                            width: starBtnSize,
                            height: starBtnSize,
                            borderRadius: starBtnSize / 2,
                          },
                          isSelected && filterStyles.starBtnActive
                        ]}
                        onPress={() => setSelectedStar(star)}
                      >
                        <Ionicons 
                          name="star" 
                          size={responsive.getResponsiveValue(14, { tablet: 16 })} 
                          color={isSelected ? '#000' : '#FFF'} 
                        />
                        <Text style={[
                          filterStyles.starText,
                          isSelected && filterStyles.starTextActive,
                          isTablet && filterStyles.starTextTablet,
                        ]}> {star}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text style={[
                  filterStyles.sectionLabel,
                  isTablet && filterStyles.sectionLabelTablet,
                ]}>Category</Text>
                <TouchableOpacity style={[
                  filterStyles.dropdownBtn,
                  isTablet && filterStyles.dropdownBtnTablet,
                ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons 
                      name="shirt-outline" 
                      size={responsive.getResponsiveValue(20, { tablet: 24 })} 
                      color="#FFF" 
                      style={{ marginRight: responsive.spacing.sm }} 
                    />
                    <Text style={[
                      filterStyles.dropdownText,
                      isTablet && filterStyles.dropdownTextTablet,
                    ]}>{selectedCategory}</Text>
                  </View>
                  <Ionicons 
                    name="caret-down" 
                    size={responsive.getResponsiveValue(16, { tablet: 20 })} 
                    color="#FFF" 
                  />
                </TouchableOpacity>

                <Text style={[
                  filterStyles.sectionLabel,
                  isTablet && filterStyles.sectionLabelTablet,
                ]}>Discount</Text>
                <View style={[
                  filterStyles.discountRow,
                  isTablet && filterStyles.discountRowTablet,
                ]}>
                  {['50% off', '40% off', '30% off', '25% off'].map((disc) => {
                    const isSelected = selectedDiscount === disc;
                    return (
                      <TouchableOpacity 
                        key={disc} 
                        style={[
                          filterStyles.discountChip, 
                          isTablet && filterStyles.discountChipTablet,
                          isSelected && filterStyles.discountChipActive
                        ]}
                        onPress={() => setSelectedDiscount(disc)}
                      >
                        <Text style={[
                          filterStyles.discountText,
                          isTablet && filterStyles.discountTextTablet,
                        ]}>{disc}</Text>
                        <Ionicons 
                          name="close" 
                          size={responsive.getResponsiveValue(16, { tablet: 18 })} 
                          color="#FFF" 
                          style={{ marginLeft: responsive.spacing.xs }} 
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

              </ScrollView>

              <View style={[
                filterStyles.footer,
                isTablet && filterStyles.footerTablet,
              ]}>
                <TouchableOpacity 
                  style={[
                    filterStyles.applyButton,
                    isTablet && filterStyles.applyButtonTablet,
                  ]} 
                  onPress={closeFilter}
                >
                  <Text style={[
                    filterStyles.applyButtonText,
                    isTablet && filterStyles.applyButtonTextTablet,
                  ]}>Apply</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <FilterDrawer />
      
      <View style={[
        styles.header,
        isTablet && styles.headerTablet,
        isLandscape && styles.headerLandscape,
      ]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image 
            source={require('../assets/images/Group.png')} 
            style={[
              styles.headerIcon,
            ]} 
          />
        </TouchableOpacity>

        <Text style={[
          styles.headerTitle,
          isTablet && styles.headerTitleTablet,
          isLandscape && styles.headerTitleLandscape,
        ]}>Stylinx</Text>

        <TouchableOpacity style={styles.bellContainer}>
          <Image 
            source={require('../assets/images/Bell_pin.png')} 
            style={[
              styles.headerIcon,
              isTablet && styles.headerIconTablet,
            ]} 
          />
          <Image 
            source={require('../assets/images/Ellipse.png')} 
            style={[
              styles.redDot,
              isTablet && styles.redDotTablet,
            ]} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
      >
        <View style={[
          styles.searchRow,
          isTablet && styles.searchRowTablet,
        ]}>
          <View style={[
            styles.searchContainer,
            isTablet && styles.searchContainerTablet,
          ]}>
            <Image 
              source={require('../assets/images/icon_search.png')} 
              style={[
                styles.searchIcon,
                isTablet && styles.searchIconTablet,
              ]} 
            />
            <TextInput
              style={[
                styles.input,
                isTablet && styles.inputTablet,
                isLandscape && styles.inputLandscape,
              ]}
              placeholder="Search"
              placeholderTextColor="#8e8e93"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <TouchableOpacity
            style={[
              styles.filterBtn,
              isTablet && styles.filterBtnTablet,
            ]}
            onPress={openFilter}
          >
            <Image 
              source={require('../assets/images/icon_filter.png')} 
              style={[
                styles.filterIcon,
                isTablet && styles.filterIconTablet,
              ]} 
            />
          </TouchableOpacity>
        </View>

        {recentSearches?.length > 0 && (
          <View style={[
            styles.recentHeader,
            isTablet && styles.recentHeaderTablet,
          ]}>
            <Text style={[
              styles.sectionTitle,
              isTablet && styles.sectionTitleTablet,
              isLandscape && styles.sectionTitleLandscape,
            ]}>Recent Searches</Text>
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Image 
                source={require('../assets/images/icon_trash.png')} 
                style={[
                  styles.trashIcon,
                  isTablet && styles.trashIconTablet,
                ]} 
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={[
          styles.chipContainer,
          isTablet && styles.chipContainerTablet,
        ]}>
          {recentSearches.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.chip,
                isTablet && styles.chipTablet,
              ]} 
              onPress={() => removeSearch(item)}
            >
              <Text style={[
                styles.chipText,
                isTablet && styles.chipTextTablet,
                isLandscape && styles.chipTextLandscape,
              ]}>{item}</Text>
              <Image 
                source={require('../assets/images/icon_close.png')} 
                style={[
                  styles.closeIcon,
                  isTablet && styles.closeIconTablet,
                ]} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[
          styles.cardsContainer,
          isTablet && styles.cardsContainerTablet,
          isLandscape && styles.cardsContainerLandscape,
        ]}>
          {CATEGORIES.map((cat) => {
            const cardHeight = responsive.getResponsiveValue(150, {
              tablet: 180,
              landscape: 120,
            });
            
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.card, 
                  { 
                    backgroundColor: cat.color,
                    height: cardHeight,
                  },
                  isTablet && styles.cardTablet,
                  isLandscape && styles.cardLandscape,
                ]}
                onPress={() => console.log(cat.title)}
              >
                <View style={[
                  styles.cardContent,
                  isTablet && styles.cardContentTablet,
                ]}>
                  <Text style={[
                    styles.cardTitle,
                    isTablet && styles.cardTitleTablet,
                    isLandscape && styles.cardTitleLandscape,
                  ]}>{cat.title}</Text>
                </View>

                <View style={[
                  styles.imageContainer,
                  { width: responsive.getResponsiveValue(140, { tablet: 180, landscape: 120 }) },
                  isTablet && styles.imageContainerTablet,
                ]}>
                  <View style={[
                    styles.circleBg,
                    { 
                      width: responsive.getResponsiveValue(120, { tablet: 150, landscape: 100 }),
                      height: responsive.getResponsiveValue(120, { tablet: 150, landscape: 100 }),
                      borderRadius: responsive.scale(60),
                    }
                  ]} />
                  <Image 
                    source={cat.image} 
                    style={[
                      styles.cardImage,
                      isTablet && styles.cardImageTablet,
                      isLandscape && styles.cardImageLandscape,
                    ]} 
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212',
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
      landscape: 25,
    }),
  },
  scrollContent: {
    paddingBottom: responsive.verticalScale(20),
  },
  scrollContentTablet: {
    paddingBottom: responsive.verticalScale(30),
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: responsive.getResponsiveValue(15, { tablet: 20 }),
    marginBottom: responsive.spacing.sm,
  },
  headerTablet: {
    paddingVertical: responsive.verticalScale(20),
    marginBottom: responsive.spacing.md,
  },
  headerLandscape: {
    paddingVertical: responsive.verticalScale(10),
    marginBottom: responsive.spacing.xs,
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 24,
      landscape: 20,
    }), 
    fontWeight: 'bold' 
  },
  headerTitleTablet: {
    fontSize: 24,
  },
  headerTitleLandscape: {
    fontSize: 20,
  },
  bellContainer: { 
    position: 'relative' 
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
  },
  redDotTablet: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  searchRow: { 
    flexDirection: 'row', 
    marginBottom: responsive.verticalScale(30) 
  },
  searchRowTablet: {
    marginBottom: responsive.verticalScale(40),
  },
  searchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#262A35', 
    borderRadius: responsive.scale(15), 
    paddingHorizontal: responsive.spacing.md, 
    height: responsive.verticalScale(55), 
    marginRight: responsive.spacing.md 
  },
  searchContainerTablet: {
    borderRadius: 20,
    paddingHorizontal: responsive.spacing.lg,
    height: responsive.verticalScale(65),
    marginRight: responsive.spacing.lg,
  },
  input: { 
    flex: 1, 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
      landscape: 16,
    }) 
  },
  inputTablet: {
    fontSize: 18,
  },
  inputLandscape: {
    fontSize: 16,
  },
  filterBtn: { 
    width: responsive.scale(55), 
    height: responsive.verticalScale(55), 
    backgroundColor: '#262A35', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: responsive.scale(15) 
  },
  filterBtnTablet: {
    width: responsive.scale(65),
    height: responsive.verticalScale(65),
    borderRadius: 20,
  },
  recentHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: responsive.verticalScale(15) 
  },
  recentHeaderTablet: {
    marginBottom: responsive.verticalScale(20),
  },
  sectionTitle: { 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
      landscape: 16,
    }), 
    fontWeight: '500' 
  },
  sectionTitleTablet: {
    fontSize: 18,
  },
  sectionTitleLandscape: {
    fontSize: 16,
  },
  chipContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: responsive.verticalScale(20) 
  },
  chipContainerTablet: {
    marginBottom: responsive.verticalScale(30),
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
  chipTablet: {
    borderRadius: 12,
    marginRight: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
  },
  chipText: { 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
      landscape: 14,
    }), 
    marginRight: responsive.spacing.xs 
  },
  chipTextTablet: {
    fontSize: 16,
  },
  chipTextLandscape: {
    fontSize: 14,
  },
  cardsContainer: { 
    marginTop: responsive.verticalScale(10) 
  },
  cardsContainerTablet: {
    marginTop: responsive.verticalScale(20),
  },
  cardsContainerLandscape: {
    marginTop: responsive.verticalScale(5),
  },
  card: { 
    borderRadius: responsive.scale(16), 
    marginBottom: responsive.verticalScale(20), 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingLeft: responsive.getResponsiveValue(25, { tablet: 35 }),
    overflow: 'hidden' 
  },
  cardTablet: {
    borderRadius: 20,
    marginBottom: responsive.verticalScale(25),
    paddingLeft: 35,
  },
  cardLandscape: {
    marginBottom: responsive.verticalScale(15),
    paddingLeft: responsive.spacing.lg,
  },
  cardContent: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  cardContentTablet: {
    paddingRight: responsive.spacing.md,
  },
  cardTitle: { 
    color: '#fff', 
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 26,
      landscape: 18,
    }), 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    textTransform: 'uppercase' 
  },
  cardTitleTablet: {
    fontSize: 26,
  },
  cardTitleLandscape: {
    fontSize: 18,
  },
  imageContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative' 
  },
  imageContainerTablet: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  circleBg: { 
    position: 'absolute', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
  },
  cardImage: { 
    resizeMode: 'contain', 
    zIndex: 1,
    right: responsive.scale(-10),
    width: responsive.getResponsiveValue(130, { tablet: 160, landscape: 110 }),
    height: responsive.getResponsiveValue(140, { tablet: 170, landscape: 120 }),
  },
  cardImageTablet: {
    width: 160,
    height: 170,
    right: -15,
  },
  cardImageLandscape: {
    width: 110,
    height: 120,
    right: -5,
  },
  // Icon styles
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
  searchIcon: {
    width: responsive.getResponsiveValue(20, { tablet: 24 }),
    height: responsive.getResponsiveValue(20, { tablet: 24 }),
    resizeMode: 'contain',
    tintColor: '#8e8e93',
    marginRight: responsive.spacing.sm,
  },
  searchIconTablet: {
    width: 24,
    height: 24,
  },
  filterIcon: {
    width: responsive.getResponsiveValue(20, { tablet: 24 }),
    height: responsive.getResponsiveValue(20, { tablet: 24 }),
    resizeMode: 'contain',
    tintColor: '#FFF',
  },
  filterIconTablet: {
    width: 24,
    height: 24,
  },
  trashIcon: {
    width: responsive.getResponsiveValue(18, { tablet: 22 }),
    height: responsive.getResponsiveValue(18, { tablet: 22 }),
    resizeMode: 'contain',
    tintColor: '#8e8e93',
  },
  trashIconTablet: {
    width: 22,
    height: 22,
  },
  closeIcon: {
    width: responsive.getResponsiveValue(16, { tablet: 18 }),
    height: responsive.getResponsiveValue(16, { tablet: 18 }),
    resizeMode: 'contain',
    tintColor: '#8e8e93',
  },
  closeIconTablet: {
    width: 18,
    height: 18,
  },
});

const filterStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    height: '100%',
    backgroundColor: '#111111',
    borderTopLeftRadius: responsive.scale(35),
    borderBottomLeftRadius: responsive.scale(35),
    paddingHorizontal: responsive.getResponsiveValue(25, { tablet: 35 }),
    paddingTop: responsive.verticalScale(20),
    position: 'absolute',
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: responsive.scale(10),
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: responsive.verticalScale(100),
  },
  scrollContentTablet: {
    paddingBottom: responsive.verticalScale(120),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.verticalScale(30),
    marginTop: responsive.verticalScale(10),
  },
  headerRowTablet: {
    marginBottom: responsive.verticalScale(40),
    marginTop: responsive.verticalScale(15),
  },
  backButton: {
    width: responsive.scale(40),
    height: responsive.scale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: responsive.getResponsiveFont(20, { tablet: 24 }),
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalTitleTablet: {
    fontSize: 24,
  },
  sectionLabel: {
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    fontWeight: '600',
    color: '#FFF',
    marginTop: responsive.verticalScale(20),
    marginBottom: responsive.verticalScale(15),
  },
  sectionLabelTablet: {
    fontSize: 18,
    marginTop: responsive.verticalScale(25),
    marginBottom: responsive.verticalScale(20),
  },
  sliderContainer: {
    height: responsive.getResponsiveValue(30, { tablet: 35 }),
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 0,
  },
  sliderContainerTablet: {
    height: 35,
  },
  sliderTrackBg: {
    height: responsive.getResponsiveValue(2, { tablet: 3 }),
    backgroundColor: '#333',
    width: '100%',
    borderRadius: responsive.scale(1),
  },
  sliderTrackActive: {
    position: 'absolute',
    height: responsive.getResponsiveValue(2, { tablet: 3 }),
    backgroundColor: '#FFF',
    borderRadius: responsive.scale(1),
  },
  thumb: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderWidth: 0,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsive.spacing.xs,
    marginBottom: responsive.spacing.sm,
  },
  priceText: {
    color: '#A0A0A0',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
  priceTextTablet: {
    fontSize: 16,
  },
  colorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing.sm,
  },
  colorsRowTablet: {
    marginBottom: responsive.spacing.md,
  },
  colorCircle: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleActive: {
    borderColor: '#FFF',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive.verticalScale(15),
  },
  starsRowTablet: {
    marginBottom: responsive.verticalScale(20),
  },
  starBtn: {
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  starBtnActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  starText: {
    color: '#FFF',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    fontWeight: 'bold',
    marginLeft: responsive.spacing.xs,
  },
  starTextTablet: {
    fontSize: 18,
  },
  starTextActive: {
    color: '#000',
  },
  dropdownBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingVertical: responsive.verticalScale(18),
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 25 }),
    borderRadius: responsive.scale(30),
    marginBottom: responsive.spacing.sm,
  },
  dropdownBtnTablet: {
    paddingVertical: responsive.verticalScale(20),
    paddingHorizontal: 25,
    borderRadius: 35,
    marginBottom: responsive.spacing.md,
  },
  dropdownText: {
    color: '#FFF',
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }),
    fontWeight: '500',
  },
  dropdownTextTablet: {
    fontSize: 17,
  },
  discountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: responsive.verticalScale(20),
  },
  discountRowTablet: {
    marginBottom: responsive.verticalScale(25),
  },
  discountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.getResponsiveValue(12, { tablet: 14 }),
    paddingHorizontal: responsive.getResponsiveValue(18, { tablet: 22 }),
    borderRadius: responsive.scale(30),
    borderWidth: 1,
    borderColor: '#333',
    marginRight: responsive.spacing.sm,
    marginBottom: responsive.spacing.sm,
  },
  discountChipTablet: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 35,
    marginRight: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
  },
  discountChipActive: {
    borderColor: '#FFF',
  },
  discountText: {
    color: '#FFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '500',
  },
  discountTextTablet: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: responsive.verticalScale(30),
    left: responsive.getResponsiveValue(25, { tablet: 35 }),
    right: responsive.getResponsiveValue(25, { tablet: 35 }),
  },
  footerTablet: {
    bottom: responsive.verticalScale(40),
    left: 35,
    right: 35,
  },
  applyButton: {
    backgroundColor: '#FFF',
    paddingVertical: responsive.verticalScale(18),
    borderRadius: responsive.scale(30),
    alignItems: 'center',
    width: '100%',
  },
  applyButtonTablet: {
    paddingVertical: responsive.verticalScale(20),
    borderRadius: 35,
  },
  applyButtonText: {
    color: '#000',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    fontWeight: 'bold',
  },
  applyButtonTextTablet: {
    fontSize: 18,
  },
});

export default CategoryScreen;