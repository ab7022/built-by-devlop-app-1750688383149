import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { colors } from '../design/tokens';
import ProgressBar from './ProgressBar';

const HabitCard = ({ habit }) => {
  const navigation = useNavigation();
  
  const completionPercentage = Math.round(
    (habit.progress.filter(Boolean).length / habit.progress.length) * 100
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HabitDetail', { habitId: habit.id })}
      style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm`}
      activeOpacity={0.8}
    >
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <View style={tw`flex-row items-center`}>
          <View style={[tw`w-3 h-3 rounded-full mr-2`, { backgroundColor: habit.color }]} />
          <Text style={tw`font-semibold`}>{habit.name}</Text>
        </View>
        <Text style={tw`text-gray-500 text-sm`}>
          {habit.progress.filter(Boolean).length}/{habit.progress.length} days
        </Text>
      </View>
      
      <ProgressBar percentage={completionPercentage} color={habit.color} />
      
      <View style={tw`flex-row items-center mt-2`}>
        <Text style={tw`text-xs text-gray-500`}>🔥 {habit.streak} day streak</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HabitCard;