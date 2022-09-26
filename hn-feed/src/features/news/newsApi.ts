import {ArticleComment, NewsArticle} from "./newsSlice";
import {getStoredState} from "../../app/utils";
import {keys, values} from "lodash";
import {concatMap, finalize, from, map, mergeMap, observable, Observable, of, switchMap} from "rxjs";

export interface FetchOptions {
    latestStories: number[];
    storiesPerPage?: number;
    startFrom?: number;
}

const baseApiPath = 'https://hacker-news.firebaseio.com/';
const apiVersion = 'v0/';
const params = 'print=pretty';
const storyUrl = (id: number) => `${baseApiPath}${apiVersion}item/${id}.json?${params}`;
const allStoriesUrl = `${baseApiPath}${apiVersion}topstories.json?${params}`;

export async function loadLatestStories(): Promise<number[]> {
    const data = await (await fetch(allStoriesUrl)).json() as number[];
    console.log('loadLatestStories | data=', data);
    return data;
}
export async function fetchNews(options: FetchOptions): Promise<NewsArticle[]> {
    let { latestStories, storiesPerPage = 12, startFrom = 0 } = options;
    const savedStories = values(getStoredState(true)?.articlesMap);
    const savedStoriesKeys: number[] = savedStories.map(d => d.id);
    const data = latestStories.slice(startFrom, startFrom + storiesPerPage).filter(d => !savedStoriesKeys.includes(d));
    const allNews = await Promise.all(data.map(async (d) => await fetchStory(d)))
    console.log('fetchNews | data=', data);
    return [...savedStories, ...allNews];
}

export async function fetchStory(id: number): Promise<any> {
    const res = await fetch(storyUrl(id));
    return res.json();
}

export function fetchNewsObs(options: FetchOptions): Observable<any> {
    let { latestStories, storiesPerPage = 12, startFrom = 0 } = options;
    const savedStories = values(getStoredState(true)?.articlesMap);
    const savedStoriesKeys: number[] = savedStories.map(d => d.id);
    const data = latestStories.slice(startFrom, startFrom + storiesPerPage).filter(d => !savedStoriesKeys.includes(d));
    const sub = from(data)
        .pipe(
            mergeMap(async (d) => await fetchStory(d))
        )
        // .subscribe((val) => console.log('subscribtion >>> ', allNews = [...allNews, val]));
    console.log('fetchNews | data=', data);
    return sub;
}
