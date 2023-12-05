import React, { useRef, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const strokeWidth = 13;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset = ((progress / 100) * circumference) / 100; 

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, progress]);

  const { left, top } = progress < 10 ? { left: 165, top: 41 } : progress >= 100 ? { left: 156, top: 41 } : { left: 159, top: 41 };
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="110" width="110" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#0F4D3F"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke="#43A573"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [circumference, progressStrokeDashoffset],
          })}   
          strokeLinecap="round"
          fill="transparent"
          transform="rotate(-90 50 50)"
        />
      </Svg>
      <Text style={{ position: 'absolute', top: top, left: left, zIndex: 2, fontSize: 20 }}>
        {`${progress}%`}
      </Text>
    </View>
  );
};

export default CircleProgress;

//style={{ position: 'absolute', top: top, left: left, zIndex: 2, fontSize: 15 }}