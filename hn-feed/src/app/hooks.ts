import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { NewsRootState, NewsDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useNewsDispatch = () => useDispatch<NewsDispatch>();
export const useNewsSelector: TypedUseSelectorHook<NewsRootState> = useSelector;