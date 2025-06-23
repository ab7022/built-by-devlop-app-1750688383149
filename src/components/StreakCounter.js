import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Svg, Circle } from 'react-native-svg';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import { colors } from '../design/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const StreakCounter = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(percentage / 100, { duration: 1000 });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value)
  }));

  return (
    <View style={tw`items-center mb-6`}>
      <View style={tw`relative`}>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - 4}
            stroke={colors.light}
            strokeWidth={8}
            fill="transparent"
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={radius - 4}
            stroke={colors.primary}
            strokeWidth={8}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="transparent"
            rotation={-90}
            originX={radius}
            originY={radius}
          />
        </Svg>
        <View style={tw`absolute inset-0 justify-center items-center`}>
          <Text style={tw`text-2xl font-bold`}>{percentage}%</Text>
          <Text style={tw`text-gray-500 text-sm`}>Completion</Text>
        </View>
      </View>
    </View>
  );
};

export default StreakCounter;