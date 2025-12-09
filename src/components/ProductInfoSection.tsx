import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';
import RatingStars from '../components/RatingStars';

const DUMMY_COLORS = [
  { id: "light-pink", hex: "#E0B0A8" },
  { id: "black", hex: "#000000" },
  { id: "red", hex: "#FF4C4C" },
];

const DUMMY_SIZES = ["S", "M", "L", "XL"];

const ProductInfoSection = ({ 
  title, 
  price, 
  rating, 
  reviewCount, 
  description,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
  isTablet,
  isLandscape 
}) => {
  return (
    <View style={[
      styles.bodyContainer,
      isTablet && styles.bodyContainerTablet,
      isLandscape && styles.bodyContainerLandscape,
    ]}>
      <View style={[
        styles.titlePriceRow,
        isTablet && styles.titlePriceRowTablet,
      ]}>
        <Text style={[
          styles.productTitle,
          isTablet && styles.productTitleTablet,
          isLandscape && styles.productTitleLandscape,
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.productPrice,
          isTablet && styles.productPriceTablet,
          isLandscape && styles.productPriceLandscape,
        ]}>
          $ {price.toFixed(2)}
        </Text>
      </View>

      <View style={[
        styles.ratingSummaryRow,
        isTablet && styles.ratingSummaryRowTablet,
      ]}>
        <RatingStars 
          rating={rating} 
          size={responsive.getResponsiveValue(18, { tablet: 20 })} 
          color="#508A7B" 
          starOutlineColor="#508A7B" 
          isTablet={isTablet}
        />
        <Text style={[
          styles.reviewCountText,
          isTablet && styles.reviewCountTextTablet,
        ]}>
          ( {reviewCount} )
        </Text>
      </View>

      <View style={[
        styles.selectorRow,
        isTablet && styles.selectorRowTablet,
      ]}>
        <View>
          <Text style={[
            styles.selectorLabel,
            isTablet && styles.selectorLabelTablet,
          ]}>
            Color
          </Text>
          <View style={[
            styles.colorOptions,
            isTablet && styles.colorOptionsTablet,
          ]}>
            {DUMMY_COLORS.map((color) => (
              <TouchableOpacity
                key={color.id}
                onPress={() => onColorSelect(color.id)}
                style={[
                  styles.colorButton,
                  isTablet && styles.colorButtonTablet,
                  selectedColor === color.id && styles.colorButtonActive,
                ]}
              >
                <View style={[
                  styles.colorSwatch,
                  isTablet && styles.colorSwatchTablet,
                  { backgroundColor: color.hex }
                ]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={[
            styles.selectorLabel,
            isTablet && styles.selectorLabelTablet,
          ]}>
            Size
          </Text>
          <View style={[
            styles.sizeOptions,
            isTablet && styles.sizeOptionsTablet,
          ]}>
            {DUMMY_SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => onSizeSelect(size)}
                style={[
                  styles.sizeButton,
                  isTablet && styles.sizeButtonTablet,
                  selectedSize === size && styles.sizeButtonActive,
                ]}
              >
                <Text style={[
                  styles.sizeText,
                  isTablet && styles.sizeTextTablet,
                  selectedSize === size && styles.sizeTextActive
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={[
        styles.sectionHeader,
        isTablet && styles.sectionHeaderTablet,
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet,
        ]}>
          Description
        </Text>
        <Ionicons 
          name="chevron-up" 
          size={responsive.getResponsiveValue(24, { tablet: 28 })} 
          color="#A0A0A0" 
        />
      </View>
      
      <Text style={[
        styles.descriptionText,
        isTablet && styles.descriptionTextTablet,
        isLandscape && styles.descriptionTextLandscape,
      ]} numberOfLines={3}>
        {description}
      </Text>
      
      <TouchableOpacity onPress={() => {}}>
        <Text style={[
          styles.readMoreText,
          isTablet && styles.readMoreTextTablet,
        ]}>
          Read More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  bodyContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    marginTop: responsive.getResponsiveValue(-30, { tablet: -40 }),
  },
  bodyContainerTablet: {
    marginTop: -40,
  },
  bodyContainerLandscape: {
    marginTop: -20,
  },
  titlePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginTop: responsive.verticalScale(20),
    marginBottom: responsive.spacing.xs,
  },
  titlePriceRowTablet: {
    paddingHorizontal: 40,
    marginTop: responsive.verticalScale(30),
    marginBottom: responsive.spacing.sm,
  },
  productTitle: {
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 26,
      landscape: 20,
    }),
    fontWeight: "700",
    color: '#FFFFFF',
    flex: 1,
    marginRight: responsive.spacing.sm,
  },
  productTitleTablet: {
    fontSize: 26,
  },
  productTitleLandscape: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: responsive.getResponsiveFont(24, {
      small: 22,
      tablet: 30,
      landscape: 24,
    }),
    fontWeight: "700",
    color: '#FFFFFF',
  },
  productPriceTablet: {
    fontSize: 30,
  },
  productPriceLandscape: {
    fontSize: 24,
  },
  ratingSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginBottom: responsive.verticalScale(20),
  },
  ratingSummaryRowTablet: {
    paddingHorizontal: 40,
    marginBottom: responsive.verticalScale(25),
  },
  reviewCountText: {
    color: '#A0A0A0',
    marginLeft: responsive.spacing.xs,
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
  },
  reviewCountTextTablet: {
    fontSize: 18,
  },
  selectorRow: {
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginBottom: responsive.verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
    paddingBottom: 5
  },
  selectorRowTablet: {
    paddingHorizontal: 40,
    marginBottom: responsive.verticalScale(20),
  },
  selectorLabel: {
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 22,
    }),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectorLabelTablet: {
    fontSize: 22,
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: responsive.getResponsiveValue(12, { tablet: 16 }),
  },
  colorOptionsTablet: {
    gap: 20,
  },
  colorButton: {
    width: responsive.getResponsiveValue(35, { tablet: 40 }),
    height: responsive.getResponsiveValue(35, { tablet: 40 }),
    borderRadius: responsive.scale(16),
    borderWidth: 5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButtonTablet: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorButtonActive: {
    borderColor: '#FFFFFF',
  },
  colorSwatch: {
    width: responsive.getResponsiveValue(28, { tablet: 36 }),
    height: responsive.getResponsiveValue(28, { tablet: 36 }),
    borderRadius: responsive.scale(14),
  },
  colorSwatchTablet: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: responsive.getResponsiveValue(12, { tablet: 16 }),
    marginTop: 12
  },
  sizeOptionsTablet: {
    gap: 16,
  },
  sizeButton: {
    width: responsive.getResponsiveValue(40, { tablet: 48 }),
    height: responsive.getResponsiveValue(40, { tablet: 48 }),
    borderRadius: responsive.scale(20),
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonTablet: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sizeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  sizeText: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '600',
  },
  sizeTextTablet: {
    fontSize: 16,
  },
  sizeTextActive: {
    color: '#1E1E1E',
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    paddingVertical: responsive.verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionHeaderTablet: {
    paddingHorizontal: 40,
    paddingVertical: responsive.verticalScale(20),
  },
  sectionTitle: {
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 22,
    }),
    fontWeight: "600",
    color: '#FFFFFF',
  },
  sectionTitleTablet: {
    fontSize: 22,
  },
  descriptionText: {
    color: '#A0A0A0',
    lineHeight: responsive.getResponsiveValue(22, { tablet: 26 }),
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginBottom: responsive.spacing.sm,
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }),
  },
  descriptionTextTablet: {
    lineHeight: 26,
    paddingHorizontal: 40,
    fontSize: 17,
  },
  descriptionTextLandscape: {
    fontSize: 14,
    lineHeight: 22,
  },
  readMoreText: {
    color: '#A0A0A0',
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '700',
  },
  readMoreTextTablet: {
    paddingHorizontal: 40,
    fontSize: 16,
  },
};

export default ProductInfoSection;