import {NewsArticle} from "./newsSlice";

export interface FetchOptions {
    latestStories: number[];
    storiesPerPage?: number;
    startFrom?: number;
}

const baseApiPath = 'https://hacker-news.firebaseio.com/';
const apiVersion = 'v0/';
const params = 'print=pretty';
const storyUrl = (id: number) => `${baseApiPath}${apiVersion}item/${id}.json?${params}`;
const allStoriesUrl = `${baseApiPath}${apiVersion}topstories.json?${params}`
const defaultFetchOptions: FetchOptions = {latestStories: [], startFrom: 0, storiesPerPage: 12};

export async function loadLatestStories(): Promise<number[]> {
    return await (await fetch(allStoriesUrl)).json() as number[];
}
export async function fetchNews(options: FetchOptions = defaultFetchOptions): Promise<NewsArticle[]> {
    let {latestStories, storiesPerPage = 12, startFrom = 0} = options;
    const data = latestStories.slice(startFrom, startFrom + storiesPerPage);
    console.log('data length', data);
    const allNews = await Promise.all(data.map(async (d) => await (await fetchStory(d)).json()))
    return allNews;
}

export async function fetchStory(id: number): Promise<any> {
    return fetch(storyUrl(id));
}



