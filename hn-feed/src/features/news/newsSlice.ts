import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchNews} from "./newsApi";
import {NewsRootState} from "../../app/store";
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
    time: Date;
    kids: number[];
    id: number;
    by: string;
    descendants: number;
    saved: boolean;
}

interface NewsState {
    list: NewsArticle[];
    status: 'busy' | 'complete' | 'rejected' | 'initial';
}

const initialState: NewsState = {
    list: [],
    status: 'complete',
}

export const getNewsAsync = createAsyncThunk(
    'news/fetchNews',
    async () => {
        const response = await fetchNews();
        return {data: response};
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNewsAsync.fulfilled, (state, action) => {
                state.status = 'complete';
                state.list = action.payload.data
            })
            .addCase(getNewsAsync.pending, (state, action) => {
                state.status = 'busy';
            })
            .addCase(getNewsAsync.rejected, (state, action) => {
                state.status = 'rejected';
            })
    }
})

export const isLoadingSelector = (state: NewsRootState) => {
    return state.news.status === 'busy';
};

export const {} = newsSlice.actions

export default newsSlice.reducer;