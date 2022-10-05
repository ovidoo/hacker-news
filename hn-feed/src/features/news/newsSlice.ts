import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchNews, fetchNewsObs, FetchOptions, loadLatestStories} from "./newsApi";
import {NewsRootState} from "../../app/store";
import {keyBy, keys, values} from "lodash";
import {getStoredState, mapArticles, Pages} from "../../app/utils";

export interface NewsArticle {
    title: string;
    type: string;
    url: string;
    score: number;
    time: number;
    kids: number[];
    id: number;
    by: string;
    descendants: number;
    saved: boolean;
    order: number;
}

export interface ArticleComment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number
    type: "comment"
}

export interface NewsState {
    status: 'busy' | 'complete' | 'rejected' | 'initial';
    allStories: number[];
    articlesMap: Record<number, NewsArticle>;
    currentPage: Pages;
    darkMode: boolean;
}

const initialState: NewsState = {
    status: 'initial',
    allStories: [],
    articlesMap: {},
    currentPage: Pages.latest,
    darkMode: false,
}

export const getNewsAsync = createAsyncThunk(
    'news/fetchNews',
    async (options: FetchOptions) => {

        const response = await fetchNews({latestStories: options.latestStories, startFrom: options.startFrom});
        return {data: response};
    }
)

export const loadAllLatestAsync = createAsyncThunk(
    'news/loadStories',
    async (status: string) => {
        console.log('news | loadStories', status);
        if (status === 'initial') {
            const response = await loadLatestStories();
            const latestNews = await fetchNews({latestStories: response, startFrom: 0});
            /*const sub = fetchNewsObs({latestStories: response, startFrom: 0})
                .finally()
                .subscribe()*/
            return {allStories: response, list: latestNews};
        } else {
            return {allStories: [], list: []}
        }
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<Pages>) => {
            state.currentPage = action.payload;
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        saveById: (state, action: PayloadAction<NewsArticle>) => {
            const {id} = action.payload;
            console.log('saveById | newsSlice | id=', id);
            let {articlesMap} = state;
            const article = articlesMap[id];
            const isSaved = article.saved;
            const newArticle = {...article, saved: !isSaved};
            state.articlesMap = {
                ...articlesMap,
                [id]: newArticle,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllLatestAsync.fulfilled, (state, action) => {
                state.status = 'complete';
                const {allStories, list} = action.payload;
                state.allStories = allStories;
                state.articlesMap = keyBy(mapArticles(list), 'id');
            })
            .addCase(loadAllLatestAsync.pending, (state) => {
                state.status = 'busy';
            })
            .addCase(getNewsAsync.fulfilled, (state, action) => {
                const {articlesMap} = state;
                const existingArticlesLength = keys(articlesMap).length;
                state.articlesMap = {
                    ...articlesMap,
                    ...keyBy(mapArticles(action.payload.data, existingArticlesLength), 'id')
                };
                state.status = 'complete';
            })
            .addCase(getNewsAsync.pending, (state) => {
                state.status = 'busy';
            })
            .addCase(getNewsAsync.rejected, (state) => {
                state.status = 'rejected';
            })
    }
})

export const isLoadingSelector = (state: NewsRootState) => state.news.status === 'busy';

export const statusSelector = (state: NewsRootState) => state.news.status;

export const currentPageSelector = (state: NewsRootState) => state.news.currentPage;

export const isDarkModeSelector = (state: NewsRootState) => state.news.darkMode;

export const storiesListSelector = (state: NewsRootState): NewsArticle[] => values(state.news.articlesMap)
    .sort((a, b) => a.order - b.order);

export const {saveById, setCurrentPage, setDarkMode} = newsSlice.actions;

export default newsSlice.reducer;