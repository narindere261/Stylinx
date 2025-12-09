import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { responsive } from '../constants/responsive';

const { width } = Dimensions.get("window");

const DualThumbSlider = ({ min, max, values, onValuesChange }) => {
  const sliderRef = useRef(null);
  const [localValues, setLocalValues] = useState(values);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null);
  const [sliderLayout, setSliderLayout] = useState({ 
    x: 0, 
    width: responsive.getResponsiveValue(width * 0.7, {
      tablet: width * 0.8,
      landscape: width * 0.6
    }) 
  });
  
  const thumbSize = responsive.getResponsiveValue(24, {
    small: 20,
    tablet: 28,
  });

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleLayout = (event) => {
    const { x, width: sliderWidth } = event.nativeEvent.layout;
    setSliderLayout({ x, width: sliderWidth });
  };

  const handleTouchStart = (event) => {
    const touchX = event.nativeEvent.locationX;
    
    const minPos = ((localValues[0] - min) / (max - min)) * sliderLayout.width;
    const maxPos = ((localValues[1] - min) / (max - min)) * sliderLayout.width;
    
    const distToMin = Math.abs(touchX - minPos);
    const distToMax = Math.abs(touchX - maxPos);
    
    if (distToMin <= 30 || distToMax <= 30) {
      const thumb = distToMin < distToMax ? 'min' : 'max';
      setActiveThumb(thumb);
      setIsDragging(true);
      return thumb;
    }
    
    if (touchX > minPos && touchX < maxPos) {
      const thumb = distToMin < distToMax ? 'min' : 'max';
      setActiveThumb(thumb);
      setIsDragging(true);
      return thumb;
    }
    
    return null;
  };

  const handleTouchMove = (event) => {
    if (!activeThumb || !isDragging) return;
    
    const touchX = event.nativeEvent.locationX;
    const percentage = Math.max(0, Math.min(1, touchX / sliderLayout.width));
    const newValue = Math.round(min + percentage * (max - min));
    
    if (activeThumb === 'min') {
      const cappedValue = Math.min(Math.max(min, newValue), localValues[1] - 1);
      const newValues = [cappedValue, localValues[1]];
      setLocalValues(newValues);
      onValuesChange(newValues);
    } else if (activeThumb === 'max') {
      const cappedValue = Math.max(Math.min(max, newValue), localValues[0] + 1);
      const newValues = [localValues[0], cappedValue];
      setLocalValues(newValues);
      onValuesChange(newValues);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setActiveThumb(null);
  };

  const handleTouchStartHandler = (event) => handleTouchStart(event);
  const handleTouchMoveHandler = (event) => handleTouchMove(event);
  const handleTouchEndHandler = () => handleTouchEnd();

  const minThumbPosition = ((localValues[0] - min) / (max - min)) * sliderLayout.width;
  const maxThumbPosition = ((localValues[1] - min) / (max - min)) * sliderLayout.width;
  const trackWidth = Math.max(0, maxThumbPosition - minThumbPosition);

  return (
    <View style={sliderStyles.container}>
      <View 
        ref={sliderRef}
        style={sliderStyles.trackArea}
        onLayout={handleLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleTouchStartHandler}
        onResponderMove={handleTouchMoveHandler}
        onResponderRelease={handleTouchEndHandler}
        onResponderTerminate={handleTouchEndHandler}
      >
        <View style={sliderStyles.track} />
        
        <View 
          style={[
            sliderStyles.trackFilled, 
            { 
              left: minThumbPosition,
              width: trackWidth 
            }
          ]} 
        />
        
        <TouchableOpacity
          style={[
            sliderStyles.thumb,
            { left: minThumbPosition - thumbSize/2, width: thumbSize, height: thumbSize },
            activeThumb === 'min' && sliderStyles.thumbActive
          ]}
          activeOpacity={1}
          onPressIn={() => {
            setActiveThumb('min');
            setIsDragging(true);
          }}
        >
          <View style={[sliderStyles.thumbInner, {
            width: responsive.getResponsiveValue(8, { tablet: 10 }),
            height: responsive.getResponsiveValue(8, { tablet: 10 }),
          }]} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            sliderStyles.thumb,
            { left: maxThumbPosition - thumbSize/2, width: thumbSize, height: thumbSize },
            activeThumb === 'max' && sliderStyles.thumbActive
          ]}
          activeOpacity={1}
          onPressIn={() => {
            setActiveThumb('max');
            setIsDragging(true);
          }}
        >
          <View style={[sliderStyles.thumbInner, {
            width: responsive.getResponsiveValue(8, { tablet: 10 }),
            height: responsive.getResponsiveValue(8, { tablet: 10 }),
          }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const sliderStyles = StyleSheet.create({
  container: { 
    width: '100%', 
    paddingVertical: responsive.getResponsiveValue(20, { tablet: 25 }),
  },
  trackArea: {
    width: '100%',
    height: responsive.getResponsiveValue(50, { tablet: 60 }),
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    height: responsive.getResponsiveValue(4, { tablet: 5 }),
    backgroundColor: '#3A3A3A',
    borderRadius: responsive.scale(2),
  },
  trackFilled: {
    position: 'absolute',
    height: responsive.getResponsiveValue(4, { tablet: 5 }),
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.scale(2),
    top: responsive.getResponsiveValue(23, { tablet: 27.5 }),
  },
  thumb: {
    position: 'absolute',
    borderRadius: responsive.scale(12),
    backgroundColor: '#FFFFFF',
    top: responsive.getResponsiveValue(12, { tablet: 15 }),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  thumbInner: {
    borderRadius: responsive.scale(4),
    backgroundColor: '#3A3A3A',
  },
  thumbActive: {
    transform: [{ scale: 1.2 }],
    elevation: 8,
    zIndex: 20,
  },
});

export default DualThumbSlider;