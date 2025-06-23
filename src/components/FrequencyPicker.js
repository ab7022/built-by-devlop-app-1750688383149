import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { colors } from '../design/tokens';

const FrequencyPicker = ({ selected, onSelect }) => {
  return (
    <View style={tw`flex-row border border-gray-200 rounded-lg mb-6`}>
      <TouchableOpacity
        onPress={() => onSelect('daily')}
        style={[
          tw`flex-1 py-2 items-center`,
          selected === 'daily' ? tw`bg-${colors.primary}` : tw`bg-white`
        ]}
      >
        <Text style={selected === 'daily' ? tw`text-white` : tw`text-gray-700`}>
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect('weekly')}
        style={[
          tw`flex-1 py-2 items-center`,
          selected === 'weekly' ? tw`bg-${colors.primary}` : tw`bg-white`
        ]}
      >
        <Text style={selected === 'weekly' ? tw`text-white` : tw`text-gray-700`}>
          Weekly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FrequencyPicker;