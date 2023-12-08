import { useUser } from '@/contexts/UserContext';
import { ITask } from '@/interfaces/ITask';
import { getTaskProgress } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircleProgressProps = {
  task: ITask;
};

const CircleProgress = ({ task }: CircleProgressProps) => {
  const { user } = useUser();

  const { isLoading, error, data: progress, refetch } = useQuery({
    queryKey: ['fetchTaskProgress', task?.id],
    queryFn: () => getTaskProgress(user?.id, task?.id)
  });

  const animatedValue = useRef(new Animated.Value(0)).current;
  const strokeWidth = 13;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [progressStrokeDashoffset, setProgressStrokeDashoffset] = useState(0);

  useEffect(() => {

    const offset = ((progress.progress / 100) * circumference) / 100;
    setProgressStrokeDashoffset(offset);

    Animated?.timing(animatedValue, {
      toValue: progress?.progress ? progress?.progress : 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, [animatedValue, progress?.progress]);

  const { left, top } =
    progress?.progress ? progress?.progress : 0 < 10
      ? { left: 165, top: 41 }
      : progress?.progress ? progress?.progress : 0 < 100
        ? { left: 156, top: 41 }
        : { left: 159, top: 41 };

  console.log('[home screen] Progress:', progress);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="70" width="70" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#0F4D3F"
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
            outputRange: [circumference, progressStrokeDashoffset ? progressStrokeDashoffset : 0]
          })}
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 50 50)"
        />
      </Svg>
      <Text
        style={{
          position: 'absolute',
          top: 28,
          left: 20,
          zIndex: 2,
          fontSize: 15
        }}
      >
        {progress?.progress}%
      </Text>
    </View>
  );
};

export default CircleProgress;
