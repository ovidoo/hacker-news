import {FC} from "react";
import {NewsArticle} from "../../features/news/newsSlice";
import {Box, List, ListIcon, ListItem} from "@chakra-ui/react";
import {NewsItem} from "./NewsItem";

interface NewsListProps {
    list: NewsArticle[];
}
export const NewsList: FC<NewsListProps> = ({list}) => {
    return <List spacing='26px'>
        {list.map((d, i) => <NewsItem index={i} article={d} key={d.title} />)}
    </List>
}