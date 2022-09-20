import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {EnhancedStore} from "@reduxjs/toolkit";
import {NewsArticle, NewsState} from "../features/news/newsSlice";
import {keyBy, values} from "lodash";

dayjs.extend(relativeTime);

const regexPattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
export const urlExtractor = (url: string) => new RegExp(regexPattern).exec(url) as string[];
export const formatTimeStamp = (time: number) => dayjs.unix(time + 1000).fromNow();
export enum Pages {
    latest = 'latest',
    starred = 'starred',
}
export const mapArticles = (articles: NewsArticle[], offset: number = 0) => articles
    .map((d, i) => ({...d, order: d.order || (i + offset)}));

const appStoreKey = 'newsStore';

export const handleStoreChange = (state: EnhancedStore) => {
    const currentState = state.getState();
    localStorage.setItem('newsStore', JSON.stringify(currentState.news))
}
export const getStoredState = (enableStorage: boolean = false): NewsState | undefined => {
    if(!enableStorage) {
        return undefined;
    }
    const storedState = localStorage.getItem(appStoreKey);
    const parsedStore: NewsState = storedState ? JSON.parse(storedState) : undefined
    const { articlesMap } = parsedStore;
    const filteredArticles = values(articlesMap).filter(d => d.saved);
    return {...parsedStore, articlesMap: keyBy(filteredArticles, 'id')};
};