import {FC} from "react";
import {NewsArticle} from "../../features/news/newsSlice";
import {Grid, GridItem, ListItem} from "@chakra-ui/react";

interface NewsItemProps {
    article: NewsArticle;
    index: number;
}
export const NewsItem: FC<NewsItemProps> = ({index, article}) => {
    const {title, time, saved, url, score, by} = article;
    return <ListItem>
        <Grid>
            <GridItem>{index}</GridItem>
            <GridItem>{title}</GridItem>
        </Grid>
    </ListItem>
}