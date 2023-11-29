import React, { useRef, useEffect } from 'react';
import { Animated, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset = circumference - (progress / 100) * circumference;

  // duration adjusts as progress changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: progress * 25,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, progress]);

  const { left, top } = progress < 10 ? { left: 26, top: 27 } : progress >= 100 ? { left: 17, top: 27 } : { left: 20, top: 27 };
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="70" width="70" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#EAEAEA"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="none"
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
          fill="none"
          transform="rotate(-90 50 50)"
        />
      </Svg>
      <Text style={{ position: 'absolute', top: top, left: left, zIndex: 2, fontSize: 15 }}>
        {`${progress}%`}
      </Text>
    </View>
  );
};

export default CircleProgress;
