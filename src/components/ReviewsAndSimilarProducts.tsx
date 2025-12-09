import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';
import RatingStars from '../components/RatingStars';
import RatingBar from '../components/RatingBar';

const DUMMY_REVIEWS = [
  { id: 1, name: "Jennifer Rose", rating: 5, text: "I love it. Awesome customer service!! Helped me out with adding an additional item to my order. Thanks again!" },
  { id: 2, name: "Kelly Rihana", rating: 5, text: "I'm very happy with order, it was delivered on and good quality. Recommended!" },
];

const DUMMY_SIMILAR_PRODUCTS = [
  { id: 101, title: "Rises Crop Hoodie", price: 43.00, image: require('../assets/images/prod_sport.png') },
  { id: 102, title: "Gym Crop Top", price: 39.99, image:require('../assets/images/prod_dress.png')  },
  { id: 103, title: "Sweet Sweatshirt", price: 47.99, image: require('../assets/images/prod_sweater.png') },
];

const ReviewsAndSimilarProducts = ({ rating, reviewCount, navigation, isTablet, isLandscape }) => {
  const screenWidth = responsive.layout.window.width;
  
  // Add default values to prevent undefined errors
  const safeRating = rating || 0;
  const safeReviewCount = reviewCount || 0;
  
  const renderSimilarProduct = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.similarProductCard,
        isTablet && styles.similarProductCardTablet,
        isLandscape && styles.similarProductCardLandscape,
      ]}
      onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
    >
      <Image 
        source={item.image } 
        style={[
          styles.similarProductImage,
          isTablet && styles.similarProductImageTablet,
        ]} 
      />
      <Text style={[
        styles.similarProductTitle,
        isTablet && styles.similarProductTitleTablet,
      ]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[
        styles.similarProductPrice,
        isTablet && styles.similarProductPriceTablet,
      ]}>
        $ {item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={[
        styles.sectionHeader, 
        { marginTop: responsive.verticalScale(20) },
        isTablet && styles.sectionHeaderTablet,
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet,
        ]}>
          Reviews
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={responsive.getResponsiveValue(24, { tablet: 28 })} 
          color="#A0A0A0" 
        />
      </View>
      
      <View style={[
        styles.reviewsSummary,
        isTablet && styles.reviewsSummaryTablet,
      ]}>
        <Text style={[
          styles.overallRating,
          isTablet && styles.overallRatingTablet,
        ]}>
          {safeRating.toFixed(1)} <Text style={{marginBottom:20, fontSize: responsive.getResponsiveFont(11, { tablet: 14 })}}>
            OUT OF 5
          </Text>
        </Text>
        <RatingStars 
          rating={safeRating} 
          size={responsive.getResponsiveValue(18, { tablet: 20 })} 
          color="#508A7B" 
          starOutlineColor="#508A7B" 
          isTablet={isTablet}
        />
        <Text style={[
          styles.totalRatingsCount,
          isTablet && styles.totalRatingsCountTablet,
        ]}>
          {safeReviewCount} ratings
        </Text>
      </View>

      <View style={[
        styles.ratingBreakdown,
        isTablet && styles.ratingBreakdownTablet,
      ]}>
        <RatingBar value={5} total={safeReviewCount} count={Math.round(safeReviewCount * 0.80)} isTablet={isTablet} />
        <RatingBar value={4} total={safeReviewCount} count={Math.round(safeReviewCount * 0.12)} isTablet={isTablet} />
        <RatingBar value={3} total={safeReviewCount} count={Math.round(safeReviewCount * 0.06)} isTablet={isTablet} />
        <RatingBar value={2} total={safeReviewCount} count={Math.round(safeReviewCount * 0.02)} isTablet={isTablet} />
        <RatingBar value={1} total={safeReviewCount} count={Math.round(safeReviewCount * 0.00)} isTablet={isTablet} />
        
        <View style={[
          styles.writeReviewRow,
          isTablet && styles.writeReviewRowTablet,
        ]}>
          <Text style={[
            styles.reviewCountLabel,
            isTablet && styles.reviewCountLabelTablet,
          ]}>
            47 Reviews
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[
              styles.writeReviewText,
              isTablet && styles.writeReviewTextTablet,
            ]}>
              WRITE A REVIEW
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[
        styles.reviewList,
        isTablet && styles.reviewListTablet,
      ]}>
        {DUMMY_REVIEWS.map((review) => (
          <View key={review.id} style={[
            styles.reviewItem,
            isTablet && styles.reviewItemTablet,
          ]}>
            <View style={[
              styles.reviewerHeader,
              isTablet && styles.reviewerHeaderTablet,
            ]}>
              <Image 
                source={{uri: `https://i.pravatar.cc/150?img=${review.id + 10}`}} 
                style={[
                  styles.reviewerAvatar,
                  isTablet && styles.reviewerAvatarTablet,
                ]} 
              />
              <View>
                <Text style={[
                  styles.reviewerName,
                  isTablet && styles.reviewerNameTablet,
                ]}>
                  {review.name}
                </Text>
                <RatingStars 
                  rating={review.rating} 
                  size={responsive.getResponsiveValue(14, { tablet: 16 })} 
                  color="#508A7B" 
                  starOutlineColor="#508A7B" 
                  isTablet={isTablet}
                />
              </View>
            </View>
            <Text style={[
              styles.reviewBody,
              isTablet && styles.reviewBodyTablet,
            ]}>
              {review.text}
            </Text>
          </View>
        ))}
      </View>

      <View style={[
        styles.sectionHeader, 
        { 
          marginTop: responsive.verticalScale(20), 
          marginBottom: responsive.verticalScale(10) 
        },
        isTablet && styles.sectionHeaderTablet,
      ]}>
        <Text style={[
          styles.sectionTitle,
          isTablet && styles.sectionTitleTablet,
        ]}>
          Similar Product
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={responsive.getResponsiveValue(24, { tablet: 28 })} 
          color="#A0A0A0" 
        />
      </View>
      
      <FlatList
        horizontal
        data={DUMMY_SIMILAR_PRODUCTS}
        renderItem={renderSimilarProduct}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.similarProductListContent,
          isTablet && styles.similarProductListContentTablet,
        ]}
      />
    </View>
  );
};

const styles = {
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
  reviewsSummary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginBottom: responsive.verticalScale(15),
    paddingTop: responsive.spacing.sm,
  },
  reviewsSummaryTablet: {
    paddingHorizontal: 40,
    marginBottom: responsive.verticalScale(20),
  },
  overallRating: {
    fontSize: responsive.getResponsiveFont(32, { tablet: 40 }),
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: responsive.spacing.sm,
  },
  overallRatingTablet: {
    fontSize: 40,
    marginRight: responsive.spacing.md,
  },
  totalRatingsCount: {
    color: '#A0A0A0',
    marginLeft: responsive.spacing.sm,
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
  totalRatingsCountTablet: {
    fontSize: 16,
  },
  ratingBreakdown: {
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    marginBottom: responsive.verticalScale(15),
  },
  ratingBreakdownTablet: {
    paddingHorizontal: 40,
    marginBottom: responsive.verticalScale(20),
  },
  writeReviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsive.verticalScale(15),
  },
  writeReviewRowTablet: {
    marginTop: responsive.verticalScale(20),
  },
  reviewCountLabel: {
    color: '#A0A0A0',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '600',
  },
  reviewCountLabelTablet: {
    fontSize: 16,
  },
  writeReviewText: {
    color: '#A0A0A0',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  writeReviewTextTablet: {
    fontSize: 16,
  },
  reviewList: {
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
  },
  reviewListTablet: {
    paddingHorizontal: 40,
  },
  reviewItem: {
    backgroundColor: '#262A35',
    borderRadius: responsive.scale(12),
    padding: responsive.getResponsiveValue(15, { tablet: 20 }),
    marginBottom: responsive.verticalScale(15),
  },
  reviewItemTablet: {
    borderRadius: 16,
    padding: 20,
    marginBottom: responsive.verticalScale(20),
  },
  reviewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
  },
  reviewerHeaderTablet: {
    marginBottom: responsive.spacing.md,
  },
  reviewerAvatar: {
    width: responsive.getResponsiveValue(40, { tablet: 50 }),
    height: responsive.getResponsiveValue(40, { tablet: 50 }),
    borderRadius: responsive.scale(20),
    marginRight: responsive.spacing.sm,
    backgroundColor: '#555',
  },
  reviewerAvatarTablet: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: responsive.spacing.md,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    marginBottom: responsive.spacing.xs,
  },
  reviewerNameTablet: {
    fontSize: 18,
    marginBottom: responsive.spacing.sm,
  },
  reviewBody: {
    color: '#A0A0A0',
    lineHeight: responsive.getResponsiveValue(20, { tablet: 24 }),
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
  reviewBodyTablet: {
    lineHeight: 24,
    fontSize: 16,
  },
  similarProductCard: {
    width: responsive.scale(130),
    marginRight: responsive.spacing.md,
    backgroundColor: '#1E1E1E',
    borderRadius: responsive.scale(12),
    overflow: 'hidden',
  },
  similarProductCardTablet: {
    width: (responsive.layout.window.width - responsive.spacing.xxl) / 3.5,
    borderRadius: 16,
    marginRight: responsive.spacing.lg,
  },
  similarProductCardLandscape: {
    width: (responsive.layout.window.width - responsive.spacing.xxl) / 3,
  },
  similarProductImage: {
    width: '100%',
    height: responsive.verticalScale(150),
    resizeMode: 'cover',
  },
  similarProductImageTablet: {
    height: responsive.verticalScale(180),
  },
  similarProductTitle: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '600',
    padding: responsive.spacing.sm,
    minHeight: responsive.verticalScale(40),
  },
  similarProductTitleTablet: {
    fontSize: 16,
    padding: responsive.spacing.md,
    minHeight: responsive.verticalScale(50),
  },
  similarProductPrice: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '700',
    paddingHorizontal: responsive.spacing.sm,
    paddingBottom: responsive.verticalScale(10),
  },
  similarProductPriceTablet: {
    fontSize: 16,
    paddingHorizontal: responsive.spacing.md,
    paddingBottom: responsive.verticalScale(12),
  },
  similarProductListContent: {
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    paddingBottom: responsive.verticalScale(30),
  },
  similarProductListContentTablet: {
    paddingHorizontal: 40,
    paddingBottom: responsive.verticalScale(40),
  },
};

export default ReviewsAndSimilarProducts;