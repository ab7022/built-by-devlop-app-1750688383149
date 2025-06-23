import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colors } from '../design/tokens';

type Habit = {
  id: string;
  name: string;
  color: string;
  frequency: 'daily' | 'weekly';
  goal: number;
  progress: number[];
  streak: number;
  bestStreak: number;
  createdAt: string;
};

type HabitsState = {
  habits: Habit[];
};

const initialState: HabitsState = {
  habits: [
    {
      id: '1',
      name: 'Drink Water',
      color: colors.primary,
      frequency: 'daily',
      goal: 8,
      progress: [1, 1, 1, 0, 1, 0, 1],
      streak: 3,
      bestStreak: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Exercise',
      color: colors.success,
      frequency: 'weekly',
      goal: 3,
      progress: [1, 0, 1, 0, 0, 0, 0],
      streak: 1,
      bestStreak: 2,
      createdAt: new Date().toISOString()
    }
  ]
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Omit<Habit, 'id' | 'createdAt' | 'progress' | 'streak' | 'bestStreak'>>) => {
      const newHabit: Habit = {
        ...action.payload,
        id: Date.now().toString(),
        progress: Array(7).fill(0),
        streak: 0,
        bestStreak: 0,
        createdAt: new Date().toISOString()
      };
      state.habits.push(newHabit);
    },
    toggleDay: (state, action: PayloadAction<{ habitId: string; dayIndex: number }>) => {
      const { habitId, dayIndex } = action.payload;
      const habit = state.habits.find(h => h.id === habitId);
      if (habit) {
        // Toggle completion status
        habit.progress[dayIndex] = habit.progress[dayIndex] ? 0 : 1;
        
        // Update streaks
        const today = new Date().getDay();
        if (dayIndex === today) {
          if (habit.progress[dayIndex]) {
            habit.streak += 1;
            if (habit.streak > habit.bestStreak) {
              habit.bestStreak = habit.streak;
            }
          } else {
            habit.streak = 0;
          }
        }
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
    }
  }
});

export const { addHabit, toggleDay, deleteHabit } = habitsSlice.actions;
export default habitsSlice.reducer;