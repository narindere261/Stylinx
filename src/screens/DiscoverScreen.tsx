import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StatusBar,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts, fetchCategories, fetchProducts } from "../redux/slices/productsSlice";
import { responsive } from '../constants/responsive';
import SearchHeader from "../components/SearchHeader";
import RecentSearches from "../components/RecentSearches";
import ProductsGrid from "../components/ProductsGrid";
import FilterModal from "../components/FilterModal";
import { SafeAreaView } from "react-native-safe-area-context";

const DiscoverScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: products, categories, loading, error } = useSelector((state) => state.products);

  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState(["Sunglasses", "Sweater", "Hoodie"]);
  const [refreshing, setRefreshing] = useState(false);

  // Filter state
  const [categoryId, setCategoryId] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 80]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  
  const [activeFilters, setActiveFilters] = useState({
    hasSearch: false,
    hasCategory: false,
    hasPriceFilter: false,
    hasColor: false,
    hasRating: false,
    hasDiscount: false,
  });

  // Initial data fetch
  useEffect(() => {
    loadInitialData();
  }, [dispatch]);

  const loadInitialData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(fetchCategories()),
        dispatch(fetchProducts())
      ]);
    } catch (err) {
      console.error("Failed to load initial data:", err);
    }
  }, [dispatch]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setSearchText('')
      resetFilters()
      await loadInitialData();
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, [loadInitialData]);

  const openFilter = () => {
    setFilterVisible(true);
  };

  const closeFilter = () => {
    setFilterVisible(false);
  };

  const resetFilters = () => {
    setCategoryId(null);
    setPriceRange([10, 80]);
    setSelectedColor(null);
    setSelectedStar(null);
    setSelectedDiscounts([]);
    setSearchText("");
    
    setActiveFilters({
      hasSearch: false,
      hasCategory: false,
      hasPriceFilter: false,
      hasColor: false,
      hasRating: false,
      hasDiscount: false,
    });
    
    dispatch(fetchProducts());
  };

  const applyFilters = () => {
    const params = {};
    let hasAnyFilter = false;
    const newActiveFilters = {
      hasSearch: false,
      hasCategory: false,
      hasPriceFilter: false,
      hasColor: false,
      hasRating: false,
      hasDiscount: false,
    };

    if (searchText?.trim()) {
      params.title = searchText.trim();
      newActiveFilters.hasSearch = true;
      hasAnyFilter = true;
    }

    if (categoryId) {
      params.categoryId = categoryId;
      newActiveFilters.hasCategory = true;
      hasAnyFilter = true;
    }

    if (priceRange[0] !== 10 || priceRange[1] !== 80) {
      params.price_min = priceRange[0];
      params.price_max = priceRange[1];
      newActiveFilters.hasPriceFilter = true;
      hasAnyFilter = true;
    }

    if (selectedColor) {
      newActiveFilters.hasColor = true;
      hasAnyFilter = true;
    }

    if (selectedStar) {
      params.rating = selectedStar;
      newActiveFilters.hasRating = true;
      hasAnyFilter = true;
    }

    if (selectedDiscounts.length > 0) {
      newActiveFilters.hasDiscount = true;
      hasAnyFilter = true;
    }

    setActiveFilters(newActiveFilters);

    if (hasAnyFilter) {
      dispatch(fetchFilteredProducts(params));
    } else {
      dispatch(fetchProducts());
    }

    closeFilter();
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchText.trim())) {
        setRecentSearches(prev => [searchText.trim(), ...prev.slice(0, 4)]); // Keep only 5 recent searches
      }
    }

    const params = {};
    
    if (searchText?.trim()) {
      params.title = searchText.trim();
      setActiveFilters(prev => ({ ...prev, hasSearch: true }));
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }
    if (priceRange[0] !== 10 || priceRange[1] !== 80) {
      params.price_min = priceRange[0];
      params.price_max = priceRange[1];
    }
    if (selectedStar) {
      params.rating = selectedStar;
    }

    const hasFilters = Object.keys(params).length > 0;
    
    if (hasFilters) {
      dispatch(fetchFilteredProducts(params));
    } else {
      dispatch(fetchProducts());
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setActiveFilters(prev => ({ ...prev, hasSearch: false }));
    
    const params = {};
    
    if (categoryId) params.categoryId = categoryId;
    if (priceRange[0] !== 10 || priceRange[1] !== 80) {
      params.price_min = priceRange[0];
      params.price_max = priceRange[1];
    }
    if (selectedStar) params.rating = selectedStar;
    
    const hasOtherFilters = Object.keys(params).length > 0;
    
    if (hasOtherFilters) {
      dispatch(fetchFilteredProducts(params));
    } else {
      dispatch(fetchProducts());
    }
  };

  const handleRecentSearchPress = (item) => {
    setSearchText(item);
    
    // Add to top of recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(i => i !== item);
      return [item, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
    
    const params = { title: item };
    
    if (categoryId) params.categoryId = categoryId;
    if (priceRange[0] !== 10 || priceRange[1] !== 80) {
      params.price_min = priceRange[0];
      params.price_max = priceRange[1];
    }
    if (selectedStar) params.rating = selectedStar;
    
    setActiveFilters(prev => ({ ...prev, hasSearch: true }));
    
    dispatch(fetchFilteredProducts(params));
  };

  const toggleDiscount = (discount) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  // Handle screen focus to refresh data
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refresh data when screen comes into focus
      loadInitialData();
    });

    return unsubscribe;
  }, [navigation, loadInitialData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <FilterModal
        isVisible={isFilterVisible}
        onClose={closeFilter}
        onApply={applyFilters}
        onReset={resetFilters}
        categories={categories}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedStar={selectedStar}
        setSelectedStar={setSelectedStar}
        selectedDiscounts={selectedDiscounts}
        toggleDiscount={toggleDiscount}
      />

      <SearchHeader
        navigation={navigation}
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleSearchSubmit}
        onClear={handleClearSearch}
        onFilterPress={openFilter}
        activeFilters={activeFilters}
      />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#508A7B"]}
            tintColor="#508A7B"
            title="Pull to refresh"
            titleColor="#A0A0A0"
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <RecentSearches
          recentSearches={recentSearches}
          onSearchPress={handleRecentSearchPress}
          onRemoveSearch={(item) => setRecentSearches(prev => prev.filter(i => i !== item))}
          onClearAll={() => setRecentSearches([])}
        />

        <ProductsGrid
          products={products}
          loading={loading && !refreshing} // Don't show loading indicator during pull-to-refresh
          error={error}
          navigation={navigation}
          categoryId={categoryId}
          onRefresh={onRefresh}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: { 
    flex: 1, 
    backgroundColor: "#121212" 
  },
  scrollView: {
    flex: 1,
  },
};

export default DiscoverScreen;