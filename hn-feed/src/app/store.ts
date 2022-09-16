import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";

export const store = configureStore({
        reducer: {
            news: newsReducer
        }
    }
)

export type NewsDispatch = typeof store.dispatch;
export type NewsRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    NewsRootState,
    unknown,
    Action<string>>;
