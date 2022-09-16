import {FC} from "react";
import {isLoadingSelector, NewsArticle} from "../../features/news/newsSlice";
import {List} from "@chakra-ui/react";
import {NewsItem} from "./NewsItem";
import {useNewsSelector} from "../../app/hooks";

interface NewsListProps {
    list: NewsArticle[];
}
export const NewsList: FC<NewsListProps> = ({list}) => {
    const isLoading = useNewsSelector(isLoadingSelector);

    console.log('render | NewsList');
    return <List spacing='26px'>
        {list.map((d, i) => <NewsItem isLoading={isLoading} index={i + 1} article={d} key={d.title + i} />)}
    </List>
}