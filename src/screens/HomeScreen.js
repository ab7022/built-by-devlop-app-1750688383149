import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../design/tokens';
import HabitCard from '../components/HabitCard';
import StreakCounter from '../components/StreakCounter';

const HomeScreen = () => {
  const navigation = useNavigation();
  const habits = useSelector(state => state.habits.habits);

  const totalCompletion = habits.reduce((total, habit) => {
    return total + (habit.progress.filter(Boolean).length / habit.progress.length;
  }, 0);
  
  const averageCompletion = habits.length > 0 
    ? Math.round((totalCompletion / habits.length) * 100) 
    : 0;

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <Text style={tw`text-2xl font-bold`}>Habit Tracker</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddHabit')}
          style={tw`bg-${colors.primary} p-2 rounded-full`}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <StreakCounter percentage={averageCompletion} />

      <Text style={tw`text-lg font-semibold mt-6 mb-4`}>
        Your Habits ({habits.length})
      </Text>

      {habits.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Feather name="list" size={48} color={colors.gray} />
          <Text style={tw`text-gray-500 mt-4 text-center`}>
            No habits yet. Tap the + button to add your first habit!
          </Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <HabitCard habit={item} />}
          contentContainerStyle={tw`pb-20`}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Upsell banner */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-${colors.primary} p-4`}>
        <Text style={tw`text-white text-center`}>
          Using free version of Devlop.app. Upgrade for more features!
        </Text>
        <TouchableOpacity 
          style={tw`mt-2 bg-white py-2 px-4 rounded-full self-center`}
          onPress={() => Linking.openURL('https://devlop.app/pricing')}
        >
          <Text style={tw`text-${colors.primary} font-bold`}>Upgrade Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;