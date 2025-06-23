import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { colors } from '../design/tokens';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WeekView = ({ habit }) => {
  const dispatch = useDispatch();

  return (
    <View style={tw`flex-row justify-between`}>
      {days.map((day, index) => (
        <View key={index} style={tw`items-center`}>
          <Text style={tw`text-gray-500 mb-2`}>{day}</Text>
          <TouchableOpacity
            onPress={() => dispatch(toggleDay({ habitId: habit.id, dayIndex: index }))}
            style={[
              tw`w-10 h-10 rounded-full justify-center items-center`,
              habit.progress[index] 
                ? { backgroundColor: habit.color }
                : tw`bg-gray-200`
            ]}
          >
            <Text style={habit.progress[index] ? tw`text-white` : tw`text-gray-500`}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default WeekView;