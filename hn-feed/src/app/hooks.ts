import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { NewsRootState, NewsDispatch } from './store';
import { CounterRootState, CounterDispatch } from "./counterStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useNewsDispatch = () => useDispatch<NewsDispatch>();
export const useNewsSelector: TypedUseSelectorHook<NewsRootState> = useSelector;
export const useCounterDispatch = () => useDispatch<CounterDispatch>();
export const useCounterSelector: TypedUseSelectorHook<CounterRootState> = useSelector;
