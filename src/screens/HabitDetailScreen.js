import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../design/tokens';
import { toggleDay, deleteHabit } from '../store/habitsSlice';
import WeekView from '../components/WeekView';
import ProgressBar from '../components/ProgressBar';

const HabitDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { habitId } = route.params;
  const dispatch = useDispatch();
  
  const habit = useSelector(state => 
    state.habits.habits.find(h => h.id === habitId)
  );

  if (!habit) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Habit not found</Text>
      </View>
    );
  }

  const completionPercentage = Math.round(
    (habit.progress.filter(Boolean).length / habit.progress.length * 100
  );

  const handleDelete = () => {
    dispatch(deleteHabit(habit.id));
    navigation.goBack();
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={[tw`w-4 h-4 rounded-full`, { backgroundColor: habit.color }]} />
          <Text style={tw`ml-2 text-xl font-bold`}>{habit.name}</Text>
        </View>
        <Text style={tw`text-gray-500`}>
          {habit.frequency === 'daily' ? 'Daily' : `${habit.goal}x/week`} habit
        </Text>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Current Streak</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-2xl font-bold mr-2`}>{habit.streak} days</Text>
          <Text style={tw`text-gray-500`}>(Best: {habit.bestStreak})</Text>
        </View>
      </View>

      <ProgressBar percentage={completionPercentage} color={habit.color} />

      <Text style={tw`text-lg font-semibold mt-8 mb-4`}>This Week</Text>
      <WeekView habit={habit} />

      <Text style={tw`text-gray-500 text-sm mt-4`}>
        Created on {new Date(habit.createdAt).toLocaleDateString()}
      </Text>
    </ScrollView>
  );
};

export default HabitDetailScreen;