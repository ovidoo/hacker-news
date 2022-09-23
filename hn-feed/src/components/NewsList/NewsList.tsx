import {FC, memo, useCallback, useEffect} from "react";
import {loadAllLatestAsync, NewsArticle, statusSelector} from "../../features/news/newsSlice";
import {Center, List} from "@chakra-ui/react";
import {NewsItem} from "./NewsItem";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";

interface NewsListProps {
    isLoading: boolean;
    list?: NewsArticle[];
}

export const NewsList: FC<NewsListProps> = memo(({list, isLoading}) => {
    const status = useNewsSelector(statusSelector);
    const fetchAllStories = useFetchAllStories(status);

    useEffect(() => {
        fetchAllStories();
    }, []);

    console.log('render | NewsList');

    if (list && !list.length && !isLoading) {
        return <Center>No Articles</Center>
    }
    return <List spacing='26px'>
        {list && list.map((d, i) => <NewsItem isLoading={isLoading} index={i + 1} article={d} key={d.title + i}/>)}
    </List>
})

const useFetchAllStories = (status: string) => {
    const dispatch = useNewsDispatch();

    const fetch = useCallback(() => {
        dispatch(loadAllLatestAsync(status))
    }, [status]);

    return fetch;
}