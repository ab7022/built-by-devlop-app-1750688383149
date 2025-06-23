import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { colors } from '../design/tokens';

const colorOptions = [
  colors.primary,
  colors.secondary,
  colors.success,
  colors.warning,
  colors.danger
];

const ColorPicker = ({ selectedColor, onSelect }) => {
  return (
    <View style={tw`flex-row justify-between mb-6`}>
      {colorOptions.map(color => (
        <TouchableOpacity
          key={color}
          onPress={() => onSelect(color)}
          style={[
            tw`w-10 h-10 rounded-full border-2`,
            { backgroundColor: color },
            selectedColor === color ? tw`border-black` : tw`border-transparent`
          ]}
        />
      ))}
    </View>
  );
};

export default ColorPicker;