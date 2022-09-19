import {FC} from "react";
import {NewsArticle} from "../../features/news/newsSlice";
import {List} from "@chakra-ui/react";
import {NewsItem} from "./NewsItem";

interface NewsListProps {
    list: NewsArticle[];
    isLoading: boolean;
}
export const NewsList: FC<NewsListProps> = ({list, isLoading}) => {
    console.log('render | NewsList');

    return <List spacing='26px'>
        {list.map((d, i) => <NewsItem isLoading={isLoading} index={i + 1} article={d} key={d.title + i} />)}
    </List>
}