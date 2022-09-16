import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const counterStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type CounterDispatch = typeof counterStore.dispatch;
export type CounterRootState = ReturnType<typeof counterStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  CounterRootState,
  unknown,
  Action<string>
>;
