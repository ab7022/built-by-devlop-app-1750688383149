import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ProgressBar = ({ percentage, color }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${percentage}%`, { duration: 800 })
  }));

  return (
    <View style={tw`w-full h-2 bg-gray-200 rounded-full overflow-hidden`}>
      <Animated.View 
        style={[
          tw`h-full rounded-full`,
          { backgroundColor: color },
          animatedStyle
        ]}
      />
    </View>
  );
};

export default ProgressBar;