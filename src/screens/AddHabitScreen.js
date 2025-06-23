import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { colors, spacing } from '../design/tokens';
import { Feather } from '@expo/vector-icons';
import { addHabit } from '../store/habitsSlice';
import ColorPicker from '../components/ColorPicker';
import FrequencyPicker from '../components/FrequencyPicker';

const AddHabitScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [color, setColor] = useState(colors.primary);
  const [frequency, setFrequency] = useState('daily');
  const [goal, setGoal] = useState(3);

  const handleSubmit = () => {
    if (!name.trim()) return;
    
    dispatch(addHabit({
      name: name.trim(),
      color,
      frequency,
      goal: frequency === 'daily' ? 1 : goal
    }));
    
    navigation.goBack();
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold`}>New Habit</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Feather name="check" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={tw`text-gray-500 mb-1`}>Habit Name</Text>
      <TextInput
        style={tw`border border-gray-200 rounded-lg p-3 mb-6`}
        placeholder="e.g. Drink Water"
        value={name}
        onChangeText={setName}
        autoFocus
      />

      <Text style={tw`text-gray-500 mb-1`}>Color</Text>
      <ColorPicker selectedColor={color} onSelect={setColor} />

      <Text style={tw`text-gray-500 mb-1 mt-6`}>Frequency</Text>
      <FrequencyPicker selected={frequency} onSelect={setFrequency} />

      {frequency === 'weekly' && (
        <>
          <Text style={tw`text-gray-500 mb-1 mt-6`}>Weekly Goal</Text>
          <View style={tw`flex-row justify-between items-center border border-gray-200 rounded-lg p-3 mb-6`}>
            <TouchableOpacity
              onPress={() => setGoal(prev => Math.max(1, prev - 1))}
              style={tw`p-2`}
            >
              <Feather name="minus" size={20} />
            </TouchableOpacity>
            <Text style={tw`text-lg font-bold`}>{goal} days</Text>
            <TouchableOpacity
              onPress={() => setGoal(prev => Math.min(7, prev + 1))}
              style={tw`p-2`}
            >
              <Feather name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default AddHabitScreen;