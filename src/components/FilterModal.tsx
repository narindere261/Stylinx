import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  Easing,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { responsive } from '../constants/responsive';

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.85;

const FilterModal = ({
  isVisible,
  onClose,
  onApply,
  onReset,
  categories,
  categoryId,
  setCategoryId,
  priceRange,
  setPriceRange,
  selectedColor,
  setSelectedColor,
  selectedStar,
  setSelectedStar,
  selectedDiscounts,
  toggleDiscount,
}) => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [isSliding, setIsSliding] = useState(false);
  const scrollViewRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const sliderValuesRef = useRef(priceRange);

  const colorOptions = [
    { id: 'orange', color: '#FF8C42' },
    { id: 'red', color: '#FF4C4C' },
    { id: 'blue', color: '#5B9BD5' },
    { id: 'white', color: '#FFFFFF' },
    { id: 'brown', color: '#8B7355' },
    { id: 'pink', color: '#FFB6C1' },
  ];

  const discountOptions = ['50% off', '40% off', '30% off', '25% off'];

  // Initialize local state with props
  useEffect(() => {
    if (isVisible) {
      setLocalPriceRange(priceRange);
      sliderValuesRef.current = priceRange;
    }
  }, [isVisible, priceRange]);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  }, [isVisible]);

  const closeFilter = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      onClose();
      setCategoryDropdownOpen(false);
      setIsSliding(false);
    });
  }, [slideAnim, onClose]);

  // Handle slider change
  const handleSliderChange = useCallback((values) => {
    setLocalPriceRange(values);
    sliderValuesRef.current = values;
  }, []);

  // Handle slider start
  const handleSliderStart = useCallback(() => {
    setIsSliding(true);
  }, []);

  // Handle slider completion
  const handleSliderComplete = useCallback((values) => {
    setIsSliding(false);
    setPriceRange(values);
  }, [setPriceRange]);

  const toggleCategoryDropdown = useCallback(() => {
    const newState = !categoryDropdownOpen;
    setCategoryDropdownOpen(newState);
    
    if (newState && scrollViewRef.current) {
      setTimeout(() => {
        categoryDropdownRef.current?.measure((fx, fy, width, height, px, py) => {
          scrollViewRef.current?.scrollTo({
            y: py - 100,
            animated: true
          });
        });
      }, 100);
    }
  }, [categoryDropdownOpen]);

  const handleApply = useCallback(() => {
    if (isSliding) {
      setPriceRange([...sliderValuesRef.current]);
    }
    
    onApply();
    closeFilter();
  }, [isSliding, setPriceRange, onApply, closeFilter]);

  const handleReset = useCallback(() => {
    const defaultRange = [10, 80];
    setLocalPriceRange(defaultRange);
    sliderValuesRef.current = defaultRange;
    onReset();
  }, [onReset]);

  // Custom marker component for better UI
  const customMarker = () => (
    <View style={styles.customMarker}>
      <View style={styles.markerInner} />
    </View>
  );

  return (
    <Modal transparent visible={isVisible} onRequestClose={closeFilter} animationType="none">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={closeFilter} activeOpacity={1} />
        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={closeFilter} style={styles.backButton}>
                <Ionicons name="chevron-back" size={responsive.getResponsiveValue(26, { tablet: 30 })} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={handleReset} style={styles.clearAllButton}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              style={styles.scrollContent}
              contentContainerStyle={{ paddingBottom: responsive.verticalScale(120) }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Price</Text>
                <View style={styles.sliderContainer}>
                  <MultiSlider
                    values={localPriceRange}
                    sliderLength={DRAWER_WIDTH - responsive.getResponsiveValue(40, { tablet: 50 })}
                    onValuesChange={handleSliderChange}
                    onValuesChangeStart={handleSliderStart}
                    onValuesChangeFinish={handleSliderComplete}
                    min={10}
                    max={80}
                    step={1}
                    allowOverlap={false}
                    snapped={true}
                    selectedStyle={{
                      backgroundColor: '#fff',
                      height: responsive.getResponsiveValue(4, { tablet: 6 }),
                      borderRadius: responsive.scale(2),
                    }}
                    unselectedStyle={{
                      backgroundColor: '#2C2C2E',
                      height: responsive.getResponsiveValue(4, { tablet: 6 }),
                      borderRadius: responsive.scale(2),
                    }}
                    markerStyle={styles.markerStyle}
                    trackStyle={styles.trackStyle}
                    pressedMarkerStyle={styles.pressedMarkerStyle}
                    customMarker={customMarker}
                  />
                </View>
                <View style={styles.priceLabels}>
                  <Text style={styles.priceLabel}>${localPriceRange[0]}</Text>
                  <Text style={styles.priceLabel}>${localPriceRange[1]}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Color</Text>
                <View style={styles.colorContainer}>
                  {colorOptions.map((colorItem) => (
                    <TouchableOpacity
                      key={colorItem.id}
                      onPress={() => setSelectedColor(colorItem.id === selectedColor ? null : colorItem.id)}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: colorItem.color },
                        selectedColor === colorItem.id && styles.colorCircleSelected,
                        colorItem.color === '#FFFFFF' && { borderWidth: 1, borderColor: '#3A3A3A' }
                      ]}
                    >
                      {selectedColor === colorItem.id && (
                        <Ionicons
                          name="checkmark"
                          size={responsive.getResponsiveValue(18, { tablet: 22 })}
                          color={colorItem.color === '#FFFFFF' ? '#000' : '#fff'}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Star Rating</Text>
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setSelectedStar(star === selectedStar ? null : star)}
                      style={[
                        styles.starButton,
                        selectedStar === star && styles.starButtonSelected,
                      ]}
                    >
                      <Ionicons
                        name="star"
                        size={responsive.getResponsiveValue(11, { tablet: 16 })}
                        color={selectedStar === star ? "#000" : "#fff"}
                      />
                      <Text style={[
                        styles.starText,
                        selectedStar === star && styles.starTextSelected
                      ]}>
                        {star}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View 
                ref={categoryDropdownRef}
                style={styles.section}
              >
                <Text style={styles.sectionLabel}>Category</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={toggleCategoryDropdown}
                  activeOpacity={0.8}
                >
                  <View style={styles.dropdownContent}>
                    <Ionicons name="shirt-outline" size={responsive.getResponsiveValue(18, { tablet: 22 })} color="#fff" />
                    <Text style={styles.dropdownText}>
                      {categoryId
                        ? categories.find(c => c.id === categoryId)?.name
                        : 'Crop Tops'}
                    </Text>
                  </View>
                  <Ionicons
                    name={categoryDropdownOpen ? "chevron-up" : "chevron-down"}
                    size={responsive.getResponsiveValue(20, { tablet: 24 })}
                    color="#fff"
                  />
                </TouchableOpacity>
                
                {categoryDropdownOpen && (
                  <View style={styles.categoryListContainer}>
                    <ScrollView 
                      style={styles.categoryScrollView}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                      scrollEnabled={true}
                    >
                      {(categories || []).slice(0, 8).map((c) => (
                        <TouchableOpacity
                          key={c.id}
                          onPress={() => {
                            setCategoryId(c.id === categoryId ? null : c.id);
                            setCategoryDropdownOpen(false);
                          }}
                          style={[
                            styles.categoryOption,
                            categoryId === c.id && styles.categoryOptionSelected
                          ]}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.categoryText,
                            categoryId === c.id && styles.categoryTextSelected
                          ]}>
                            {c.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Discount</Text>
                <View style={styles.discountContainer}>
                  {discountOptions?.length>0 && discountOptions.map((discount) => (
                    <TouchableOpacity
                      key={discount}
                      onPress={() => toggleDiscount(discount)}
                      style={[
                        styles.discountChip,
                        selectedDiscounts.includes(discount) && styles.discountChipSelected,
                      ]}
                    >
                      <Text style={[
                        styles.discountText,
                        selectedDiscounts.includes(discount) && styles.discountTextSelected
                      ]}>
                        {discount}
                      </Text>
                      {selectedDiscounts.includes(discount) && (
                        <Ionicons name="close" size={responsive.getResponsiveValue(14, { tablet: 16 })} color="#000" style={{ marginLeft: responsive.spacing.xs }} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  overlay: { flex: 1 },
  drawer: {
    width: responsive.getResponsiveValue(DRAWER_WIDTH, {
      tablet: width * 0.7,
      landscape: width * 0.6,
    }),
    height: "100%",
    backgroundColor: "#1C1C1E",
    position: "absolute",
    right: 0,
    borderTopLeftRadius: responsive.scale(24),
    borderBottomLeftRadius: responsive.scale(24),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 25 }),
    paddingVertical: responsive.getResponsiveValue(20, { tablet: 25 }),
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  backButton: { 
    width: responsive.scale(40), 
    height: responsive.scale(40), 
    justifyContent: "center", 
    alignItems: "flex-start" 
  },
  clearAllButton: {
    paddingHorizontal: responsive.getResponsiveValue(12, { tablet: 16 }),
    paddingVertical: responsive.getResponsiveValue(6, { tablet: 8 }),
    backgroundColor: 'rgba(255, 76, 76, 0.2)',
    borderRadius: responsive.scale(16),
  },
  clearAllText: {
    color: '#FF4C4C',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '600',
  },
  modalTitle: { 
    fontSize: responsive.getResponsiveFont(22, { tablet: 24 }), 
    fontWeight: "700", 
    color: "#fff" 
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 25 }),
    paddingTop: responsive.spacing.sm,
  },
  section: { 
    marginTop: responsive.getResponsiveValue(24, { tablet: 28 }), 
    marginBottom: responsive.spacing.sm 
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.getResponsiveValue(10, { tablet: 15 }),
  },
  sectionLabel: {
    fontSize: responsive.getResponsiveFont(17, { tablet: 19 }),
    fontWeight: "600",
    color: "#fff",
    marginBottom: responsive.getResponsiveValue(16, { tablet: 20 })
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsive.getResponsiveValue(10, { tablet: 12 }),
    paddingHorizontal: responsive.spacing.xs,
  },
  priceLabel: { 
    color: "#8E8E93", 
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }), 
    fontWeight: "500" 
  },
  customMarker: {
    height: responsive.getResponsiveValue(28, { tablet: 32 }),
    width: responsive.getResponsiveValue(28, { tablet: 32 }),
    borderRadius: responsive.scale(14),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  markerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1C1C1E',
  },
  markerStyle: {
    height: responsive.getResponsiveValue(28, { tablet: 32 }),
    width: responsive.getResponsiveValue(28, { tablet: 32 }),
    borderRadius: responsive.scale(14),
  },
  trackStyle: {
    height: responsive.getResponsiveValue(4, { tablet: 6 }),
    borderRadius: responsive.scale(2),
  },
  pressedMarkerStyle: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsive.getResponsiveValue(16, { tablet: 20 })
  },
  colorCircle: {
    width: responsive.getResponsiveValue(28, { tablet: 36 }),
    height: responsive.getResponsiveValue(28, { tablet: 36 }),
    borderRadius: responsive.scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  starContainer: {
    flexDirection: "row",
    gap: responsive.getResponsiveValue(12, { tablet: 16 }),
    flexWrap: "wrap",
  },
  starButton: {
    width: responsive.getResponsiveValue(42, { tablet: 60 }),
    height: responsive.getResponsiveValue(42, { tablet: 60 }),
    borderRadius: responsive.scale(26),
    backgroundColor: "#2C2C2E",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: responsive.spacing.xs,
    borderWidth: .5,
    borderColor: "#FCFCFD",
    padding:6
  },
  starButtonSelected: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  starText: {
    color: "#fff",
    fontSize: responsive.getResponsiveFont(13, { tablet: 15 }),
    fontWeight: "600",
    marginLeft: responsive.spacing.xs,
  },
  starTextSelected: { color: "#000" },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    paddingHorizontal: responsive.getResponsiveValue(16, { tablet: 20 }),
    paddingVertical: responsive.getResponsiveValue(16, { tablet: 18 }),
    borderRadius: responsive.scale(12),
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsive.getResponsiveValue(12, { tablet: 16 })
  },
  dropdownText: {
    color: "#fff",
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    fontWeight: "500",
  },
  categoryListContainer: {
    marginTop: responsive.spacing.sm,
    maxHeight: responsive.verticalScale(200),
    backgroundColor: '#1C1C1E',
    borderRadius: responsive.scale(12),
    borderWidth: 1,
    borderColor: '#2C2C2E',
    overflow: 'hidden',
  },
  categoryScrollView: {
    maxHeight: responsive.verticalScale(200),
  },
  categoryOption: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: responsive.getResponsiveValue(16, { tablet: 20 }),
    paddingVertical: responsive.getResponsiveValue(14, { tablet: 16 }),
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  categoryOptionSelected: {
    backgroundColor: "#fff"
  },
  categoryText: {
    color: "#fff",
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }),
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#000",
    fontWeight: "600",
  },
  discountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsive.getResponsiveValue(12, { tablet: 16 })
  },
  discountChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    paddingHorizontal: responsive.getResponsiveValue(18, { tablet: 22 }),
    paddingVertical: responsive.getResponsiveValue(12, { tablet: 14 }),
    borderRadius: responsive.scale(24),
    borderWidth: 1,
    borderColor: "#FCFCFD",
  },
  discountChipSelected: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  discountText: {
    color: "#fff",
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }),
    fontWeight: "500",
  },
  discountTextSelected: {
    color: "#000",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 25 }),
    paddingVertical: responsive.getResponsiveValue(24, { tablet: 28 }),
    backgroundColor: "#1C1C1E",
    borderTopWidth: 1,
    borderTopColor: "#2C2C2E",
    flexDirection:'row'
  },
  applyButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: responsive.scale(30),
    width:100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginLeft:100
  },
  applyButtonText: {
    color: "#000",
    fontSize: responsive.getResponsiveFont(17, { tablet: 19 }),
    fontWeight: "700"
  },
});

export default FilterModal;