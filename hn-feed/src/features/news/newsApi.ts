import {NewsArticle} from "./newsSlice";

interface FetchOptions {
    storiesPerPage: number;
    startFrom?: number;
}

const baseApiPath = 'https://hacker-news.firebaseio.com/';
const apiVersion = 'v0/';
const params = 'print=pretty';
const storyUrl = (id: number) => `${baseApiPath}${apiVersion}item/${id}.json?${params}`;
const allStoriesUrl = `${baseApiPath}${apiVersion}topstories.json?${params}`
const defaultFetchOptions: FetchOptions = {startFrom: 0, storiesPerPage: 12};

export async function fetchNews(options: FetchOptions = defaultFetchOptions): Promise<NewsArticle[]> {
    let {storiesPerPage, startFrom} = options
    const data = (await (await fetch(allStoriesUrl)).json()).slice(startFrom, storiesPerPage) as number[];
    console.log('data length', data);
    const allNews = await Promise.all(data.map(async (d) => await (await fetchStory(d)).json()))
    return allNews;
}

export async function fetchStory(id: number): Promise<any> {
    return fetch(storyUrl(id));
}



