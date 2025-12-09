import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { responsive } from '../constants/responsive';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomDualThumbSlider = ({
  min = 10,
  max = 80,
  values = [10, 80],
  onValuesChange,
  onSlidingStart,
  onSlidingComplete,
  step = 1,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeThumb, setActiveThumb] = useState(null);
  const [localValues, setLocalValues] = useState(values);
  
  // Initialize with prop values
  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      setContainerWidth(width);
    }
  };

  const calculatePositionToValue = (position) => {
    if (containerWidth === 0) return min;
    
    const percentage = Math.max(0, Math.min(1, position / containerWidth));
    let value = min + percentage * (max - min);
    
    // Apply step
    if (step > 0) {
      value = Math.round(value / step) * step;
    }
    
    return Math.max(min, Math.min(max, value));
  };

  const calculateValueToPosition = (value) => {
    if (containerWidth === 0) return 0;
    
    const percentage = (value - min) / (max - min);
    return percentage * containerWidth;
  };

  const updateThumbValue = (thumbIndex, newValue) => {
    const newValues = [...localValues];
    
    // Ensure thumbs don't cross each other
    if (thumbIndex === 0) {
      newValues[0] = Math.min(newValue, localValues[1] - step);
    } else {
      newValues[1] = Math.max(newValue, localValues[0] + step);
    }
    
    setLocalValues(newValues);
    
    // Callback for real-time updates
    if (onValuesChange) {
      onValuesChange(newValues);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: (evt, gestureState) => {
        if (!containerWidth) return;
        
        const touchX = evt.nativeEvent.locationX;
        const leftThumbPos = calculateValueToPosition(localValues[0]);
        const rightThumbPos = calculateValueToPosition(localValues[1]);
        
        // Determine which thumb is closer to the touch
        const leftDistance = Math.abs(touchX - leftThumbPos);
        const rightDistance = Math.abs(touchX - rightThumbPos);
        
        const thumbToMove = leftDistance < rightDistance ? 0 : 1;
        setActiveThumb(thumbToMove);
        
        // Notify sliding start
        if (onSlidingStart) {
          onSlidingStart();
        }
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (activeThumb === null || !containerWidth) return;
        
        const touchX = Math.max(0, Math.min(containerWidth, evt.nativeEvent.locationX));
        const newValue = calculatePositionToValue(touchX);
        
        updateThumbValue(activeThumb, newValue);
      },
      
      onPanResponderRelease: () => {
        if (activeThumb !== null) {
          // Notify sliding complete
          if (onSlidingComplete) {
            onSlidingComplete();
          }
        }
        setActiveThumb(null);
      },
      
      onPanResponderTerminate: () => {
        setActiveThumb(null);
      },
    })
  ).current;

  // Calculate positions for rendering
  const leftThumbPosition = calculateValueToPosition(localValues[0]);
  const rightThumbPosition = calculateValueToPosition(localValues[1]);
  const trackWidth = rightThumbPosition - leftThumbPosition;

  return (
    <View 
      style={styles.container}
      onLayout={handleContainerLayout}
      ref={containerRef}
    >
      {/* Full track background */}
      <View style={styles.fullTrack} />
      
      {/* Selected range track */}
      {containerWidth > 0 && (
        <View 
          style={[
            styles.selectedTrack,
            {
              left: leftThumbPosition,
              width: trackWidth,
            }
          ]} 
        />
      )}
      
      {/* Left thumb */}
      {containerWidth > 0 && (
        <View 
          style={[
            styles.thumb,
            styles.leftThumb,
            {
              left: leftThumbPosition - 16,
              zIndex: activeThumb === 0 ? 10 : 2,
              transform: [{ scale: activeThumb === 0 ? 1.1 : 1 }],
            }
          ]}
        />
      )}
      
      {/* Right thumb */}
      {containerWidth > 0 && (
        <View 
          style={[
            styles.thumb,
            styles.rightThumb,
            {
              left: rightThumbPosition - 16,
              zIndex: activeThumb === 1 ? 10 : 2,
              transform: [{ scale: activeThumb === 1 ? 1.1 : 1 }],
            }
          ]}
        />
      )}
      
      {/* Touchable area */}
      <View 
        style={styles.touchArea}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  fullTrack: {
    height: 4,
    backgroundColor: '#2C2C2E',
    borderRadius: 2,
    marginHorizontal: 16,
  },
  selectedTrack: {
    height: 4,
    backgroundColor: '#4DB6AC',
    borderRadius: 2,
    position: 'absolute',
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
  },
  leftThumb: {
    borderColor: '#4DB6AC',
  },
  rightThumb: {
    borderColor: '#4DB6AC',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CustomDualThumbSlider;