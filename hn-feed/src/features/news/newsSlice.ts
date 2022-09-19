import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchNews, FetchOptions, loadLatestStories} from "./newsApi";
import {NewsRootState} from "../../app/store";
import {useNewsSelector} from "../../app/hooks";
import {keyBy, values} from "lodash";

/*
* {
  "by" : "jensgk",
  "descendants" : 215,
  "id" : 32830916,
  "kids" : [ 32832662, 32834838, 32833802, 32831763, 32832555, 32831741, 32832006, 32834987, 32835007, 32832430, 32831972, 32832952, 32834412, 32833179, 32832486, 32833710, 32832184, 32832523, 32832520, 32832685, 32832610, 32834855, 32834063, 32832607, 32832544, 32832499, 32832622, 32833667, 32833007, 32832235, 32832549, 32832675, 32832269 ],
  "score" : 430,
  "time" : 1663107682,
  "title" : "“Secrets” about the consumer audio business you may find interesting",
  "type" : "story",
  "url" : "https://www.audiosciencereview.com/forum/index.php?threads%2Fsecrets-about-the-consumer-audio-business-you-may-find-interesting.37344%2F"
}
* */
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
}

interface NewsState {
    list: NewsArticle[];
    status: 'busy' | 'complete' | 'rejected' | 'initial';
    allStories: number[];
    articlesMap: Record<number, NewsArticle>;
}

const initialState: NewsState = {
    list: [],
    status: 'initial',
    allStories: [],
    articlesMap: {},
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
    async () => {
        const response = await loadLatestStories();
        const latestNews = await fetchNews({latestStories: response, startFrom: 0});
        return {allStories: response, list: latestNews};
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        saveById: (state, action: PayloadAction<NewsArticle>) => {
            const id = action.payload.id;
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
                const { allStories, list } = action.payload;
                state.allStories = allStories;
                state.list = list;
                // state.articlesMap = new Map(state.list.map(d => [d.id, d]));
                state.articlesMap = keyBy(list, 'id');
                state.status = 'complete';
            })
            .addCase(loadAllLatestAsync.pending, (state) => {
                state.status = 'busy';
            })
            .addCase(getNewsAsync.fulfilled, (state, action) => {
                const { list, status } = state;
                state.list = status === 'initial' ? action.payload.data : [...list, ...action.payload.data];
                // state.articlesMap = new Map(state.list.map(d => [d.id, d]));
                state.articlesMap = keyBy(state.list, 'id');
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

export const isLoadingSelector = (state: NewsRootState) => {
    return state.news.status === 'busy';
};

export const storiesListSelector = (state: NewsRootState): NewsArticle[] => values(state.news.articlesMap);

export const {saveById} = newsSlice.actions

export default newsSlice.reducer;