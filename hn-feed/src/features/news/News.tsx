import {FC} from "react";
import {Provider} from "react-redux";
import {useNewsDispatch, useNewsSelector} from "../../app/hooks";
import {getNewsAsync, isLoadingSelector} from "./newsSlice";
import {Box, Button, Divider, Grid, GridItem, Progress, StackDivider, VStack} from "@chakra-ui/react";
import {NewsList} from "../../components/NewsList/NewsList";
import {theme} from "../../styles/theme";

export const News: FC = () => {
    const isLoading = useNewsSelector(isLoadingSelector);
    const newsList = useNewsSelector(state => state.news.list);
    const dispatch = useNewsDispatch();
    return <main>
        <Progress height='4px' colorScheme='orange' value={100} isIndeterminate={isLoading}/>
        <h1>Hacker News</h1>
        <NewsList list={newsList} />
        <Divider />
        <Button onClick={() => dispatch(getNewsAsync())}>show more</Button>
    </main>
}